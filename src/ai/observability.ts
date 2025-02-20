import { Langfuse } from 'langfuse';

const langfuse = new Langfuse({
  secretKey: process.env.LANGFUSE_SECRET_KEY!,
  publicKey: process.env.LANGFUSE_PUBLIC_KEY!,
  baseUrl: process.env.LANGFUSE_BASEURL || 'https://cloud.langfuse.com',
  release: process.env.LANGFUSE_RELEASE || 'dev-release',
  requestTimeout: 10000,
});

langfuse.on('error', (error) => {
  console.error('Langfuse error:', error);
});

export default langfuse; 