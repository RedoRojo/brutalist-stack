"use client";

import React from "react";

export default function ResumePage() {
  function handlePrint() {
    window.print();
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto print:max-w-none print:px-0">
      {/* Print Action / Document Header info */}
      <div className="flex justify-between items-center font-mono text-xs print:hidden">
        <span>[ DOCUMENT: RESUME_ENGINEER.pdf ]</span>
        <button
          onClick={handlePrint}
          className="px-3 py-1.5 border border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#fafafa] transition-all cursor-pointer shadow-brutal active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#1a1a1a]"
        >
          [PRINT_RESUME]
        </button>
      </div>

      {/* Main Resume Container */}
      <article className="border-brutal bg-[#fafafa] p-6 sm:p-10 shadow-brutal space-y-8 print:border-none print:shadow-none print:bg-transparent print:p-0">
        {/* Header section */}
        <section className="text-center space-y-3 border-b border-[#1a1a1a] pb-6">
          <h1 className="text-3xl font-bold font-mono uppercase tracking-tight">
            Cristhian Victor Rojas Marquez
          </h1>
          <p className="font-mono text-xs text-[#1a1a1a]/70">
            Full-Stack Software Engineer
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 font-mono text-xs text-[#1a1a1a]/60">
            <span>Email: cristhian.rojas@example.com</span>
            <span>•</span>
            <span>Github: github.com/cristhian-rojas</span>
            <span>•</span>
            <span>Location: Cochabamba, Bolivia</span>
          </div>
        </section>

        {/* Technical Profile */}
        <section className="space-y-3">
          <h2 className="text-base font-bold font-mono border-b border-[#1a1a1a]/10 pb-1 uppercase text-[#c02b2b]">
            [01] Technical Profile
          </h2>
          <p className="text-sm font-sans leading-relaxed text-[#1a1a1a]/85">
            Software Engineer specializing in automated software analysis/testing, building robust web applications, and designing real-time interfaces for signal processing pipelines. Passionate about system reliability, code quality, and developer tooling.
          </p>
        </section>

        {/* Technical Skills */}
        <section className="space-y-4">
          <h2 className="text-base font-bold font-mono border-b border-[#1a1a1a]/10 pb-1 uppercase text-[#c02b2b]">
            [02] Technical Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="space-y-1">
              <span className="font-bold text-[#2c5f4b]">[Programming Languages]</span>
              <p className="font-sans text-xs text-[#1a1a1a]/80">TypeScript, JavaScript, Python, Java, C/C++</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-[#2c5f4b]">[Frameworks & Libraries]</span>
              <p className="font-sans text-xs text-[#1a1a1a]/80">React, Next.js, Node.js, Express, PyTorch, MNE-Python</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-[#2c5f4b]">[Databases & Tools]</span>
              <p className="font-sans text-xs text-[#1a1a1a]/80">SQLite, PostgreSQL, Prisma ORM, WebSockets, Git, Arch Linux</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-[#2c5f4b]">[Quality Assurance]</span>
              <p className="font-sans text-xs text-[#1a1a1a]/80">Jest, Cypress, Mutation Testing, AST Analysis, CI/CD</p>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="space-y-4">
          <h2 className="text-base font-bold font-mono border-b border-[#1a1a1a]/10 pb-1 uppercase text-[#c02b2b]">
            [03] Professional Experience
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between items-start font-mono text-xs">
              <div>
                <h3 className="font-bold text-sm text-[#1a1a1a]">
                  Software Engineer Intern (QA & Automation)
                </h3>
                <p className="text-[#1a1a1a]/70">Bolivian Tech Solutions</p>
              </div>
              <span className="text-right text-[#1a1a1a]/70">Nov 2024 — Feb 2025</span>
            </div>
            <ul className="list-disc pl-5 font-sans text-xs text-[#1a1a1a]/80 space-y-1">
              <li>Designed and built automated regression test suites for high-traffic web services.</li>
              <li>Integrated mutation testing analysis to measure and improve test suite efficacy.</li>
              <li>Reduced continuous integration build feedback times by 15% through test parallelization.</li>
            </ul>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-start font-mono text-xs">
              <div>
                <h3 className="font-bold text-sm text-[#1a1a1a]">
                  Software Developer Intern (BCI Signal Processing)
                </h3>
                <p className="text-[#1a1a1a]/70">Academic Signal Lab</p>
              </div>
              <span className="text-right text-[#1a1a1a]/70">Jun 2025 — Oct 2025</span>
            </div>
            <ul className="list-disc pl-5 font-sans text-xs text-[#1a1a1a]/80 space-y-1">
              <li>Developed real-time Python pipelines to stream and preprocess electroencephalography (EEG) data.</li>
              <li>Built and optimized signal classification convolutional neural networks (CNNs) in PyTorch.</li>
              <li>Created a low-latency visualization dashboard using WebSockets and React.</li>
            </ul>
          </div>
        </section>

        {/* Key Open Source Projects & Contributions */}
        <section className="space-y-4">
          <h2 className="text-base font-bold font-mono border-b border-[#1a1a1a]/10 pb-1 uppercase text-[#c02b2b]">
            [04] Key Open Source Projects
          </h2>
          <div className="space-y-3 font-sans text-xs text-[#1a1a1a]/80">
            <div className="border-l border-[#1a1a1a]/20 pl-3">
              <p className="font-bold font-mono text-[11px] text-[#2c5f4b]">
                TS Mutation Testing Engine
              </p>
              <p className="mt-1">
                Author of a static analysis testing utility for TypeScript. Evaluates test coverage quality by mutating AST nodes and running parallel test runners.
              </p>
            </div>
            <div className="border-l border-[#1a1a1a]/20 pl-3 pt-1">
              <p className="font-bold font-mono text-[11px] text-[#2c5f4b]">
                EEG Motor Imagery Classifier
              </p>
              <p className="mt-1">
                Developer of a real-time signal classification tool. Translates motor imagery data streams into software commands using WebSockets and PyTorch.
              </p>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="space-y-4">
          <h2 className="text-base font-bold font-mono border-b border-[#1a1a1a]/10 pb-1 uppercase text-[#c02b2b]">
            [05] Education
          </h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-start font-mono text-xs">
              <div>
                <h3 className="font-bold text-sm text-[#1a1a1a]">
                  B.S. in Computer Science
                </h3>
                <p className="text-[#1a1a1a]/70">Universidad Mayor de San Simón (UMSS)</p>
              </div>
              <span className="text-right text-[#1a1a1a]/70">2022 — Present</span>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
