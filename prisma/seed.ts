import "dotenv/config";
import prisma from "../src/lib/db";

async function main() {
  console.log("Seeding database with bilingual data...");

  // Clear existing data
  await prisma.project.deleteMany({});
  await prisma.post.deleteMany({});

  // Seed Projects
  const projects = [
    {
      title: "TypeScript AST Mutation Testing Engine",
      titleEs: "Motor de Pruebas de Mutación AST en TypeScript",
      slug: "mutation-testing-ts",
      description:
        "A developer tool that parses TypeScript source code into Abstract Syntax Trees, automatically injects logic mutants, and runs parallel Jest test suites to evaluate test coverage efficacy.",
      descriptionEs:
        "Una herramienta para desarrolladores que analiza código fuente TypeScript en Árboles de Sintaxis Abstracta (AST), inyecta mutantes lógicos automáticamente y ejecuta suites Jest en paralelo para evaluar la eficacia de las pruebas.",
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
if (node.getKind() === SyntaxKind.BinaryExpression) {
  const operator = node.getOperatorToken();
  if (operator.getText() === "===") {
    // Replace node operator text with !== to create mutant
  }
}
\`\`\`
`,
      contentEs: `# Motor de Pruebas de Mutación AST en TypeScript

Una herramienta CLI diseñada para verificar la solidez real de las suites de pruebas unitarias mediante la inyección dinámica de errores lógicos ("mutantes") y la verificación de si las pruebas los detectan.

## Arquitectura de la Herramienta

A diferencia de las utilidades de cobertura de líneas, este motor mide la calidad de las aserciones:
- **Manipulación de AST**: Utiliza \`ts-morph\` para analizar archivos fuente de TypeScript, recorriendo nodos para identificar operadores relacionales, aritméticos y lógicos.
- **Ejecución en Paralelo**: Crea un grupo de subprocesos en Node.js para ejecutar suites de Jest de forma concurrente, evitando cuellos de botella de CPU.
- **Generador de Reportes**: Genera reportes de diferencias en consola y HTML que muestran los mutantes supervivientes y la puntuación de mutación.

## Implementación Técnica

El motor identifica expresiones binarias e intercambia operadores lógicos:

\`\`\`typescript
if (node.getKind() === SyntaxKind.BinaryExpression) {
  const operator = node.getOperatorToken();
  if (operator.getText() === "===") {
    // Reemplaza el operador con !== para generar el mutante
  }
}
\`\`\`
`,
      techStack: "TypeScript, AST Parsing, Node.js, Jest, TS-Morph",
      repoUrl: "https://github.com/cristhian-rojas/mutation-testing-ts",
      liveUrl: "https://mutation-ts-docs.example.com",
      featured: true,
      status: "COMPLETED",
    },
    {
      title: "Developer Portfolio & Minimalist CMS",
      titleEs: "Portafolio y CMS Minimalista para Desarrolladores",
      slug: "developer-portfolio-cms",
      description:
        "A high-performance Next.js 16 and PostgreSQL portfolio template featuring fluid animations, theme customization, and an integrated markdown publishing workflow.",
      descriptionEs:
        "Plantilla de portafolio de alto rendimiento con Next.js 16 y PostgreSQL, animaciones fluidas, selector de temas y flujo de publicación integrado en Markdown.",
      content: `# Developer Portfolio & Minimalist CMS

A lightweight, developer-focused portfolio platform built to showcase engineering projects, write technical posts, and present CV records with zero UI bloat.

## Key Features

- **Next.js 16 App Router**: Server components for data fetching and fluid client interactions with Framer Motion.
- **PostgreSQL & Prisma ORM**: Relational persistence with connection pooling on Neon serverless postgres.
- **Bilingual & Accessible**: Full English and Spanish localization, dark/light modes, and responsive design.
`,
      contentEs: `# Portafolio y CMS Minimalista para Desarrolladores

Una plataforma de portafolio ágil y centrada en desarrolladores, creada para exhibir proyectos de ingeniería, publicar artículos técnicos y presentar el CV sin sobrecarga de interfaz.

## Características Principales

- **Next.js 16 App Router**: Componentes de servidor para obtención de datos y transiciones fluidas en el cliente con Framer Motion.
- **PostgreSQL y Prisma ORM**: Persistencia relacional con agrupación de conexiones en Neon serverless postgres.
- **Bilingüe y Accesible**: Localización completa en inglés y español, modos claro/oscuro y diseño responsivo.
`,
      techStack: "Next.js, React, Tailwind CSS, Prisma, PostgreSQL, Framer Motion",
      repoUrl: "https://github.com/cristhian-rojas/portfolio-stack",
      liveUrl: "https://cristhian-rojas.example.com",
      featured: true,
      status: "COMPLETED",
    },
    {
      title: "Automated End-to-End Test Orchestrator",
      titleEs: "Orquestador Automatizado de Pruebas End-to-End",
      slug: "e2e-orchestrator",
      description:
        "A CI/CD automated testing pipeline that orchestrates parallel Playwright test executions across multiple browser engines, generating consolidated trace artifacts.",
      descriptionEs:
        "Un pipeline de pruebas automatizadas en CI/CD que orquesta ejecuciones paralelas en Playwright en múltiples navegadores, generando reportes y artefactos de traza consolidados.",
      content: `# Automated End-to-End Test Orchestrator

An automated regression testing pipeline built with TypeScript and Playwright, containerized via Docker and executed inside GitHub Actions workflows.

## Architecture

1. **Matrix Parallel Execution**: Shards test suites across multiple runner instances.
2. **Failure Trace Artifacts**: Automatically records video and network har logs on failure.
3. **Slack & GitHub Summary**: Posts interactive markdown summaries into pull requests.
`,
      contentEs: `# Orquestador Automatizado de Pruebas End-to-End

Un pipeline de pruebas de regresión automatizadas construido con TypeScript y Playwright, contenedorizado en Docker y ejecutado en flujos de GitHub Actions.

## Arquitectura

1. **Ejecución en Matriz Paralela**: Divide las suites de pruebas entre múltiples instancias de ejecución.
2. **Artefactos de Trazas ante Fallos**: Graba video y registros de red har automáticamente al detectar fallos.
3. **Resúmenes en Slack y GitHub**: Publica resúmenes interactivos en Markdown directamente en los pull requests.
`,
      techStack: "TypeScript, Playwright, Docker, GitHub Actions, CI/CD",
      repoUrl: "https://github.com/cristhian-rojas/e2e-orchestrator",
      liveUrl: "https://e2e-orchestrator-demo.example.com",
      featured: false,
      status: "IN_PROGRESS",
    },
  ];

  const createdProjects: Record<string, string> = {};
  for (const project of projects) {
    const created = await prisma.project.create({
      data: project,
    });
    createdProjects[project.slug] = created.id;
    console.log(`- Created project: ${created.title} / ${created.titleEs} (ID: ${created.id})`);
  }

  // Seed Blog Posts
  const posts = [
    {
      title: "Writing a Custom AST Parser for Code Mutation Testing",
      titleEs: "Escribiendo un Parser AST Personalizado para Pruebas de Mutación",
      slug: "custom-ast-mutation-testing",
      summary:
        "A walkthrough on leveraging TypeScript compiler APIs to parse source files, manipulate logical syntax trees, and dynamically verify unit test assertions.",
      summaryEs:
        "Una guía práctica sobre el uso de las APIs del compilador de TypeScript para analizar archivos fuente, manipular árboles de sintaxis lógica y verificar aserciones de pruebas.",
      content: `# Writing a Custom AST Parser for Mutation Testing

Line coverage measures what lines were run, but not what was actually tested. Mutation testing ensures your assertions work by actively breaking your code.

## How the Compiler Sees Code

Before code is executed, compilers translate source text into an **Abstract Syntax Tree (AST)**. For example, the statement:
\`\`\`typescript
const isAdult = age >= 18;
\`\`\`
Is parsed into a variable declaration with a binary expression containing an identifier (\`age\`), a comparison operator (\`>=\`), and a numeric literal (\`18\`).

## Manipulating the Syntax Tree

Using the TypeScript Compiler API (via \`ts-morph\`), we can programmatically rewrite nodes:

1. **Locate Target Nodes**: Filter AST nodes for comparison expressions (\`>\`, \`<\`, \`===\`).
2. **Rewrite Operator**: Swap the comparison token (e.g., changing \`>=\` to \`<\`).
3. **Execute Tests**: Run unit tests against the mutated source file.

If tests pass, the mutant **survived** (assertion gap). If tests fail, the mutant is **killed** (strong tests).
`,
      contentEs: `# Escribiendo un Parser AST Personalizado para Pruebas de Mutación

La cobertura de líneas mide qué líneas se ejecutaron, pero no qué se probó realmente. Las pruebas de mutación garantizan que las aserciones funcionen rompiendo deliberadamente el código.

## Cómo ve el código el compilador

Antes de que el código se ejecute, los compiladores traducen el texto fuente a un **Árbol de Sintaxis Abstracta (AST)**. Por ejemplo:
\`\`\`typescript
const isAdult = age >= 18;
\`\`\`
Se analiza como una declaración de variable con una expresión binaria compuesta por un identificador (\`age\`), un operador de comparación (\`>=\`) y un literal numérico (\`18\`).

## Manipulación del Árbol de Sintaxis

Usando la API del compilador de TypeScript (a través de \`ts-morph\`), podemos reescribir nodos programáticamente:

1. **Localizar Nodos Clave**: Filtrar nodos AST para operadores de comparación (\`>\`, \`<\`, \`===\`).
2. **Modificar el Operador**: Intercambiar el operador (por ejemplo, cambiar \`>=\` por \`<\`).
3. **Ejecutar Pruebas**: Correr las pruebas unitarias contra el archivo fuente mutado.

Si las pruebas pasan, el mutante **sobrevivió** (vacío de cobertura). Si fallan, el mutante fue **eliminado** (prueba sólida).
`,
      tags: "TypeScript, AST, Testing, Compilers",
      published: true,
      projectId: createdProjects["mutation-testing-ts"],
    },
    {
      title: "Building Scalable Test Automation Pipelines in Modern Web Apps",
      titleEs: "Construyendo Pipelines Escalables de Automatización de Pruebas en Aplicaciones Web",
      slug: "building-scalable-test-automation-pipelines",
      summary:
        "Key lessons learned from architecting automated regression suites, parallel test execution, and CI/CD feedback cycles in production environments.",
      summaryEs:
        "Lecciones clave aprendidas al diseñar suites de regresión automatizadas, ejecución paralela de pruebas y ciclos de retroalimentación en CI/CD para producción.",
      content: `# Building Scalable Test Automation Pipelines

Automated testing is the backbone of continuous delivery. Without robust automated checks, deployment speed eventually slows down as codebases grow.

## Principles of Resilient Test Architecture

1. **Deterministic Test Data**: Never rely on shared mutable state. Isolate database transactions per test worker.
2. **Fast Feedback Loops**: Keep unit and integration suites under 2 minutes, deferring slow end-to-end tests to post-merge or staged workflows.
3. **Flakiness Detection**: Automatically quarantine flaky tests to avoid eroding developer confidence in the pipeline.
`,
      contentEs: `# Construyendo Pipelines Escalables de Automatización de Pruebas

Las pruebas automatizadas son la columna vertebral del despliegue continuo. Sin verificaciones confiables, la velocidad de entrega disminuye a medida que la base de código crece.

## Principios para una Arquitectura de Pruebas Resiliente

1. **Datos de Prueba Deterministas**: Nunca depender de estados mutables compartidos. Aislar transacciones de base de datos por cada hilo de prueba.
2. **Ciclos Rápidos de Retroalimentación**: Mantener las suites unitarias y de integración por debajo de los 2 minutos, delegando pruebas E2E más pesadas a etapas posteriores.
3. **Detección de Intermitencias (Flaky Tests)**: Aislar de inmediato las pruebas inestables para preservar la confianza del equipo en los pipelines de CI/CD.
`,
      tags: "Testing, CI/CD, DevOps, Architecture",
      published: true,
      projectId: createdProjects["e2e-orchestrator"],
    },
    {
      title: "Brutalist Web Design & Monospace Aesthetics in Developer Portfolios",
      titleEs: "Diseño Web Brutalista y Estética Monoespaciada en Portafolios de Desarrolladores",
      slug: "brutalist-web-design-developer-portfolios",
      summary:
        "An exploration into why utilitarian brutalism, high contrast, and dense monospace layouts resonate so powerfully with software engineers.",
      summaryEs:
        "Una exploración sobre por qué el brutalismo utilitario, el alto contraste y los diseños densos monoespaciados resuenan tan fuertemente con los ingenieros de software.",
      content: `# Brutalist Web Design & Monospace Aesthetics

Modern web design has often converged toward homogenised SaaS templates filled with generic gradients and decorative bloat. Utilitarian brutalism strips away the fluff and returns to raw information density.

## The Principles of Utilitarian Brutalism

- **High Contrast Borders**: Hard, thick lines define boundaries clearly rather than subtle blurred shadows.
- **Monospace Typography**: Code and technical data are naturally consumed in fixed-width fonts.
- **Sub-second Latency**: Fewer heavy client-side JavaScript bundles mean blazing fast render speeds.
`,
      contentEs: `# Diseño Web Brutalista y Estética Monoespaciada

El diseño web moderno suele converger hacia plantillas SaaS homogéneas saturadas de degradados genéricos y elementos superfluos. El brutalismo utilitario elimina el exceso y rescata la densidad de información pura.

## Principios del Brutalismo Utilitario

- **Bordes de Alto Contraste**: Líneas nítidas y sólidas delimitan las secciones en lugar de sombras difuminadas.
- **Tipografía Monoespaciada**: El código y los datos técnicos se leen con mayor naturalidad en tipografías de ancho fijo.
- **Latencia Sub-segundo**: Menos paquetes pesados de JavaScript en el cliente se traducen en cargas ultrarrápidas.
`,
      tags: "Design, Brutalism, Frontend, Architecture",
      published: true,
      projectId: null,
    },
  ];

  for (const post of posts) {
    const created = await prisma.post.create({
      data: post,
    });
    console.log(`- Created blog post: ${created.title} / ${created.titleEs} (Slug: ${created.slug})`);
  }

  console.log("Database seeded successfully with bilingual data!");
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
