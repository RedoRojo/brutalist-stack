import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

async function main() {
  const dbPath = path.join(process.cwd(), "dev.db");
  const dbUrl = `file:${dbPath}`;
  const adapter = new PrismaBetterSqlite3({ url: dbUrl });
  const prisma = new PrismaClient({ adapter });

  console.log("Seeding database...");

  // Clear existing data
  await prisma.project.deleteMany({});
  await prisma.post.deleteMany({});

  // Seed Projects
  const projects = [
    {
      title: "Real-Time EEG BCI Signal Pipeline",
      description:
        "A Python-based real-time EEG signal processing pipeline using MNE-Python and PyTorch to classify motor imagery tasks. Includes WebSockets server for streaming classified states to web-based dashboards for neuro-rehabilitation.",
      content: `# Real-Time EEG BCI Signal Pipeline

This project develops an end-to-end framework for processing raw electroencephalography (EEG) signals and classifying motor imagery commands (e.g., imagining hand movements) to drive external hardware or virtual environments.

## System Architecture

The pipeline consists of three core components:
1. **Acquisition & Preprocessing**: Streams data from EEG amplifiers using LSL (Lab Streaming Layer) and applies spatial filters (e.g., Common Spatial Patterns - CSP) and bandpass filters.
2. **Deep Learning Classification**: A convolutional neural network (EEGNet variant) built on PyTorch that extracts temporal and spatial features.
3. **WebSockets Gateway**: Streams predicted class probabilities to interactive React dashboards in real-time.

## Key Research Outcomes

- Achieved an average classification accuracy of **84.5%** on the BCI Competition IV 2a dataset.
- Optimized latency down to **120ms** end-to-end (acquisition to web render).

![EEG Analysis Graph](/bci_abstract.png)
`,
      techStack: "Python, MNE-Python, PyTorch, WebSockets, NumPy",
      repoUrl: "https://github.com/cristhian-rojas/bci-eeg-pipeline",
      liveUrl: "https://bci-eeg-demo.example.com",
    },
    {
      title: "Automated Mutation Testing Framework for TypeScript",
      description:
        "A research project developing an automated mutation testing framework for TypeScript applications. Designed to evaluate test suite robustness by injecting artificial faults (mutants) and verifying detection rates on AST structures.",
      content: `# TS Mutation Testing Engine

A specialized mutation analysis tool for TypeScript programs, leveraging compiler AST (Abstract Syntax Tree) APIs to automatically evaluate test coverage strength.

## Background

Traditional line or branch coverage metrics do not guarantee that your tests actually verify correctness. Mutation testing addresses this by modifying source code in subtle ways (e.g., changing \`>\` to \`<\`) to see if existing test suites fail ("kill the mutant").

## Core Features

- **AST Mutation Engine**: Mutates arithmetic, relational, and logical nodes using \`ts-morph\`.
- **Parallel Runner**: Executes Jest test cases in parallel web worker threads, speeding up analysis.
- **Coverage Reports**: Generates interactive HTML dashboards highlighting "surviving" mutants.

## Code Sample

Here is a snippet showing how we detect target binary expressions:

\`\`\`typescript
// Mutates binary operators in TS Abstract Syntax Trees
if (node.getKind() === SyntaxKind.BinaryExpression) {
  const operator = node.getOperatorToken();
  if (operator.getText() === "===") {
    // Replace with !== mutant
  }
}
\`\`\`
`,
      techStack: "TypeScript, AST, Node.js, Jest, TS-Morph",
      repoUrl: "https://github.com/cristhian-rojas/mutation-testing-ts",
      liveUrl: "https://mutation-ts-docs.example.com",
    },
    {
      title: "Academic Brutalist Web CMS",
      description:
        "A Next.js 16 and SQLite template generator adopting a high-contrast academic, minimalist, and brutalist styling aesthetic, optimized for publication portfolios and rapid CV deployments.",
      content: `# Academic Brutalist Web CMS

A high-performance, minimalist CMS built for academics, computer scientists, and engineers who want to present papers, projects, and curriculum vitae without bloated web frameworks.

## Styling Principles

This project aligns with the Sci-Hub high-contrast interface aesthetic:
- **Sharp Spacing**: Thin dividers, no rounded borders.
- **Off-white Backgrounds**: High readability over long reading sessions.
- **Monospace Headers**: Accentuates the codebase-centric feel.

## Performance Metrics

- **100/100** Lighthouse Performance, SEO, and Accessibility scores.
- Zero client-side external UI library dependencies.
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
      title: "Introduction to EEG Motor Imagery Classification",
      slug: "eeg-motor-imagery-classification",
      summary:
        "An introductory guide on extracting spatial features and using convolutional neural networks to classify motor imagery tasks from electroencephalography signals.",
      content: `# EEG Motor Imagery Classification

Brain-Computer Interfaces (BCIs) translate neural patterns into commands. One of the most common paradigms is **Motor Imagery (MI)**, where a user imagines performing a movement (such as raising their left or right hand) without muscle activation.

## 1. Neurophysiology of Motor Imagery

When a user imagines movement, a phenomenon called **Event-Related Desynchronization (ERD)** occurs in the mu (8-12 Hz) and beta (13-30 Hz) frequency bands of the sensorimotor cortex. Imagining a right-hand movement decreases mu power on the contralateral (left) hemisphere of the brain.

## 2. Feature Extraction: Common Spatial Patterns (CSP)

To classify MI commands, we must extract spatial features that maximize differences in signal variance. **Common Spatial Patterns (CSP)** is a highly effective algorithm for this. It designs spatial filters that maximize the variance of one task while minimizing the variance of the other.

## 3. Deep Learning Classifier: EEGNet

While traditional pipelines use CSP followed by a Linear Discriminant Analysis (LDA) classifier, deep learning models like **EEGNet** combine feature extraction and classification:
- **Temporal Convolutions**: Extract frequency filters.
- **Depthwise Convolutions**: Extract spatial filters (analogous to CSP).
- **Pointwise Convolutions**: Combine spatial features to output class predictions.

We will explore a complete PyTorch implementation of EEGNet in the next post.
`,
    },
    {
      title: "Why Mutation Testing Matters for Software Quality",
      slug: "why-mutation-testing-matters",
      summary:
        "Code coverage metrics are often misleading. In this article, we explain how mutation testing evaluates the actual strength of your test cases by injecting faults.",
      content: `# Why Mutation Testing Matters

Most software engineering teams rely on **Code Coverage** (line, branch, or function coverage) as the primary indicator of test quality. However, high coverage does not necessarily mean high test quality.

## The "Assertionless Test" Problem

Consider a test case that runs a function, executes every line of code, but contains *no assertions*. It will report **100% line coverage**, yet it checks absolutely nothing. If a bug is introduced into that function, the test will still pass.

## Enter Mutation Testing

Mutation testing evaluates the **detecting power** of your test suite by modifying your source code in subtle ways to create "mutants." Examples of mutation operators include:
- **Arithmetic mutation**: Replacing \`+\` with \`-\`.
- **Conditional mutation**: Replacing \`if (x > y)\` with \`if (x >= y)\`.
- **Logical mutation**: Replacing \`&&\` with \`||\`.

If your test suite fails when executed against a mutant, the mutant is **killed** (good). If the tests still pass, the mutant **survives** (bad).

## The Mutation Score

The quality of your test suite is represented by the **Mutation Score**:

> **Mutation Score = (Killed Mutants / Total Mutants) * 100**

Aiming for a high mutation score (e.g., >80%) ensures that your assertions are active and that any functional change in code logic will be caught by your CI pipeline.
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
