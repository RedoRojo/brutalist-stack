import "dotenv/config";
import prisma from "../src/lib/db";

async function main() {

  console.log("Seeding database...");

  // Clear existing data
  await prisma.project.deleteMany({});
  await prisma.post.deleteMany({});

  // Seed Projects
  const projects = [
    {
      title: "Real-Time EEG BCI Data Stream Pipeline",
      description:
        "A high-throughput, low-latency Python and React data pipeline streaming real-time EEG signals. Integrates PyTorch for inference and utilizes WebSockets for sub-150ms client visualization.",
      content: `# Real-Time EEG BCI Data Stream Pipeline

An end-to-end software architecture engineered to ingest, preprocess, and classify high-frequency electroencephalography (EEG) data streams, enabling real-time device control and low-latency visualization.

## System Architecture

The pipeline is split into three decoupled components to maintain high throughput:
1. **Ingestion & Buffering**: Ingests raw multi-channel signals at 250Hz using LSL (Lab Streaming Layer) protocol, applying spatial filters and downsampling in parallel worker processes.
2. **Deep Learning Inference**: A PyTorch microservice executing inference using an EEGNet convolutional neural network to classify imagined hand movements.
3. **WebSockets Gateway**: A Node.js socket server that broadcasts classification probabilities to front-end dashboards at sub-150ms latencies.

## Engineering Challenges

- **Buffer Overflows**: Handled high-frequency packet spikes by implementing a ring buffer in Python to prevent memory leaks.
- **Latency Budget**: Optimized thread execution and IPC serialization, reducing acquisition-to-render latency to **120ms**.

![BCI Data Pipeline Architecture](/bci_abstract.png)
`,
      techStack: "Python, WebSockets, PyTorch, Node.js, React, NumPy",
      repoUrl: "https://github.com/cristhian-rojas/bci-eeg-pipeline",
      liveUrl: "https://bci-eeg-demo.example.com",
    },
    {
      title: "TypeScript AST Mutation Testing Engine",
      description:
        "A developer tool that parses TypeScript source code into Abstract Syntax Trees, automatically injects logic mutants, and runs parallel Jest test suites to evaluate test coverage efficacy.",
      content: `# TypeScript AST Mutation Testing Engine

A CLI developer tool designed to verify the actual coverage strength of unit test suites by dynamically injecting logical bugs ("mutants") and checking if the test cases catch them.

## Tool Architecture

Unlike basic line-coverage utilities, this engine measures assertion strength:
- **AST Manipulation**: Uses \`ts-morph\` to parse TypeScript source files, traversing nodes to locate relational, arithmetic, and logical operators.
- **Parallel Test Runner**: Spawns a pool of Node.js child processes to execute Jest suites concurrently, preventing CPU bottlenecks.
- **Diff Reporter**: Generates terminal and HTML diff reports displaying surviving mutants and mutation scores.

## Code In-depth

The core engine matches binary expressions and swaps logic operators:

\`\`\`typescript
// Traverses the AST to locate logical nodes
if (node.getKind() === SyntaxKind.BinaryExpression) {
  const operator = node.getOperatorToken();
  if (operator.getText() === "===") {
    // Replace node operator text with !== to create mutant
  }
}
\`\`\`
`,
      techStack: "TypeScript, AST Parsing, Node.js, Jest, TS-Morph",
      repoUrl: "https://github.com/cristhian-rojas/mutation-testing-ts",
      liveUrl: "https://mutation-ts-docs.example.com",
    },
    {
      title: "Developer Brutalist Web CMS",
      description:
        "A Next.js 16 and SQLite template generator adopting a high-contrast, minimalist brutalist aesthetic, optimized for publication portfolios and rapid CV/Resume deployments.",
      content: `# Developer Brutalist Web CMS

A high-performance, developer-focused portfolio template built to showcase engineering projects and resume histories with zero client-side UI bloat.

## Engineering Highlights

- **Tailwind v4 Integration**: Uses CSS custom properties and inline variables to define styling tokens.
- **Pure React Markdown Compiler**: Compiles long-form project pages with a custom regex parser instead of downloading heavy third-party markdown packages.
- **Lighthouse Goals**: Reaches **100/100** scores on performance and SEO due to static pre-rendering and asset optimization.
`,
      techStack: "Next.js, React, Tailwind CSS, Prisma, SQLite",
      repoUrl: "https://github.com/cristhian-rojas/brutalist-stack",
      liveUrl: "https://brutalist-stack-demo.example.com",
    },
  ];

  for (const project of projects) {
    const created = await prisma.project.create({
      data: project,
    });
    console.log(`- Created project: ${created.title} (ID: ${created.id})`);
  }

  // Seed Blog Posts
  const posts = [
    {
      title: "Designing Low-Latency WebSockets for Real-Time Time Series Data",
      slug: "websockets-latency-time-series",
      summary:
        "An engineering post-mortem on designing a WebSocket server to pipe high-frequency EEG signals from a Python back-end to a React visualization client at sub-150ms speeds.",
      content: `# Designing Low-Latency WebSockets for Time Series Data

Piping high-throughput biological signal data (such as 250Hz EEG feeds) into web frontends presents unique challenges for web browsers and network sockets.

## The Bottleneck: Rendering Frequency vs. Packet Frequency

Sending 250 individual WebSocket messages per second quickly saturates the browser's main thread and triggers UI jank due to excessive React re-renders. 

## Architectural Solutions

### 1. Data Batching (Back-end)
Instead of broadcasting single samples immediately, the Python server collects samples in a window buffer and sends them in **batches of 25 samples** (representing 100ms of data) 10 times a second.

### 2. Message Structuring (Binary)
JSON serialization adds significant overhead to numeric arrays. By switching to a **binary array buffer format (Float32Array)**, we reduced payload size by **62%**.

### 3. React Canvas Rendering
To avoid React state overhead, the incoming coordinates bypass React state altogether and are written directly onto an HTML5 \`<canvas>\` reference using a high-performance rendering loop (\`requestAnimationFrame\`).

Implementing these optimizations kept our rendering loop stable at 60 FPS while keeping pipeline latency under **120ms**.
`,
    },
    {
      title: "Writing a Custom AST Parser for Code Mutation Testing",
      slug: "custom-ast-mutation-testing",
      summary:
        "A walkthrough on leveraging TypeScript compiler APIs to parse source files, manipulate logical syntax trees, and dynamically verify unit test assertions.",
      content: `# Writing a Custom AST Parser for Mutation Testing

Line coverage measures what lines were run, but not what was actually tested. Mutation testing ensures your assertions work by actively breaking your code.

## How the Compiler Sees Code

Before code is executed, compilers translate source text into an **Abstract Syntax Tree (AST)**. For example, the statement:
\`\`\`typescript
const isAdult = age >= 18;
\`\`\`
Is parsed into a variable declaration with a binary expression containing a identifier (\`age\`), a comparison operator (\`>=\`), and a numeric literal (\`18\`).

## Manipulating the Syntax Tree

Using the TypeScript Compiler API (via the excellent \`ts-morph\` wrapper), we can programmatically rewrite nodes:

1. **Locate Target Nodes**: Filter AST nodes for comparison expressions (\`>\`, \`<\`, \`===\`).
2. **Rewrite Operator**: Swap the comparison token (e.g., changing \`>=\` to \`<\`).
3. **Write to Disk**: Save the mutated file into a temporary scratch directory.
4. **Execute Tests**: Run unit tests against the mutated source file.

If tests pass, the mutant **survived** (assertion gap). If tests fail, the mutant is **killed** (strong tests).

Spawning these runs in parallel Node worker pools makes AST analysis highly efficient and practical for continuous integration pipelines.
`,
    },
  ];

  for (const post of posts) {
    const created = await prisma.post.create({
      data: post,
    });
    console.log(`- Created blog post: ${created.title} (Slug: ${created.slug})`);
  }

  console.log("Database seeded successfully!");
}

main().catch((e) => {
  console.error("Error during seed:", e);
  process.exit(1);
});
