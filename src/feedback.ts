import { generateObject } from 'ai';
import { z } from 'zod';

import { getDefaultModel } from './ai/providers.js';
import type { LanguageModelV2 } from '@ai-sdk/provider';
import { systemPrompt } from './prompt.js';

export async function generateFeedback({
  query,
  numQuestions = 3,
  model,
}: {
  query: string;
  numQuestions?: number;
  model?: LanguageModelV2;
}) {
  const selectedModel = model ?? getDefaultModel();
  const userFeedback = await generateObject({
    model: selectedModel,
    system: systemPrompt(),
    prompt: `Given the following query from the user, ask some follow up questions to clarify the research direction. Return a maximum of ${numQuestions} questions, but feel free to return less if the original query is clear: <query>${query}</query>`,
    schema: z.object({
      questions: z
        .array(z.string())
        .describe(
          `Follow up questions to clarify the research direction, max of ${numQuestions}`,
        ),
    }),
  });

  return userFeedback.object.questions.slice(0, numQuestions);
}
