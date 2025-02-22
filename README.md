# Open Deep Research MCP Server

An AI-powered research assistant that performs deep, iterative research on any topic. It combines search engines, web scraping, and AI to explore topics in depth and generate comprehensive reports. Available as a Model Context Protocol (MCP) tool or standalone CLI.

## Quick Start

1. Clone and install:
```bash
git clone https://github.com/Ozamatash/deep-research
cd deep-research
npm install
```

2. Set up environment in `.env.local`:
```bash
# Copy the example environment file
cp .env.example .env.local
```

3. Build:
```bash
# Build the server
npm run build
```

4. Run the cli version:
```bash
npm run start "Your research query here"
```
5. Test MCP Server with Claude Desktop:  
Follow the guide thats at the bottom of server quickstart to add the server to Claude Desktop:  
https://modelcontextprotocol.io/quickstart/server

## Features

- Performs deep, iterative research by generating targeted search queries
- Controls research scope with depth (how deep) and breadth (how wide) parameters
- Evaluates source reliability with detailed scoring (0-1) and reasoning
- Prioritizes high-reliability sources (≥0.7) and verifies less reliable information
- Generates follow-up questions to better understand research needs
- Produces detailed markdown reports with findings, sources, and reliability assessments
- Available as a Model Context Protocol (MCP) tool for AI agents
- For now MCP version doesn't ask follow up questions

## How It Works

```mermaid
flowchart TB
    subgraph Input
        Q[User Query]
        B[Breadth Parameter]
        D[Depth Parameter]
    end

    DR[Deep Research] -->
    SQ[SERP Queries] -->
    SR[Search Results]

    subgraph Processing[Result Processing]
        direction TB
        RE[Reliability Evaluation]
        VQ[Verification Queries]
        PR[Process Results]
    end

    SR --> RE
    RE -->|Low Reliability| VQ
    RE -->|High Reliability| PR
    VQ --> PR

    subgraph Results[Results]
        direction TB
        NL((Learnings))
        ND((Directions))
        RC((Reliability Context))
    end

    PR --> NL
    PR --> ND
    PR --> RC

    DP{depth > 0?}

    RD["Next Direction:
    - Prior Goals
    - New Questions
    - Learnings
    - Reliability Context"]

    MR[Markdown Report]

    %% Main Flow
    Q & B & D --> DR

    %% Results to Decision
    NL & ND & RC --> DP

    %% Circular Flow
    DP -->|Yes| RD
    RD -->|New Context| DR

    %% Final Output
    DP -->|No| MR

    %% Styling
    classDef input fill:#7bed9f,stroke:#2ed573,color:black
    classDef process fill:#70a1ff,stroke:#1e90ff,color:black
    classDef recursive fill:#ffa502,stroke:#ff7f50,color:black
    classDef output fill:#ff4757,stroke:#ff6b81,color:black
    classDef results fill:#a8e6cf,stroke:#3b7a57,color:black
    classDef reliability fill:#ff9ff3,stroke:#f368e0,color:black

    class Q,B,D input
    class DR,SQ,PR process
    class DP,RD recursive
    class MR output
    class NL,ND,RC results
    class RE,VQ reliability
```

## Advanced Setup

### Using Local Firecrawl (Free Option)

Instead of using the Firecrawl API, you can run a local instance. You can use the official repo or my fork which uses searXNG as the search backend to avoid using a searchapi key:

1. Set up local Firecrawl:
```bash
git clone https://github.com/Ozamatash/localfirecrawl
cd localfirecrawl
# Follow setup in localfirecrawl README
```

2. Update `.env.local`:
```bash
FIRECRAWL_BASE_URL="http://localhost:3002"
```

### Optional: Observability

Add observability to track research flows, queries, and results using Langfuse:

```bash
# Add to .env.local
LANGFUSE_PUBLIC_KEY="your_langfuse_public_key"
LANGFUSE_SECRET_KEY="your_langfuse_secret_key"
```

The app works normally without observability if no Langfuse keys are provided.

## License

MIT License