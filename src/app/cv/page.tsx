"use client";

import React from "react";

export default function CVPage() {
  function handlePrint() {
    window.print();
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto print:max-w-none print:px-0">
      {/* Print Action / Document Header info */}
      <div className="flex justify-between items-center font-mono text-xs print:hidden">
        <span>[ DOCUMENT: CURRICULUM_VITAE.pdf ]</span>
        <button
          onClick={handlePrint}
          className="px-3 py-1.5 border border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#fafafa] transition-all cursor-pointer shadow-brutal active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#1a1a1a]"
        >
          [PRINT_CV]
        </button>
      </div>

      {/* Main CV Container */}
      <article className="border-brutal bg-[#fafafa] p-6 sm:p-10 shadow-brutal space-y-8 print:border-none print:shadow-none print:bg-transparent print:p-0">
        {/* Header section */}
        <section className="text-center space-y-3 border-b border-[#1a1a1a] pb-6">
          <h1 className="text-3xl font-bold font-mono uppercase tracking-tight">
            Cristhian Victor Rojas Marquez
          </h1>
          <p className="font-mono text-xs text-[#1a1a1a]/70">
            Software Engineer & Computer Science Researcher
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 font-mono text-xs text-[#1a1a1a]/60">
            <span>Email: cristhian.rojas@example.com</span>
            <span>•</span>
            <span>Github: github.com/cristhian-rojas</span>
            <span>•</span>
            <span>Location: Cochabamba, Bolivia</span>
          </div>
        </section>

        {/* Research Interests */}
        <section className="space-y-3">
          <h2 className="text-base font-bold font-mono border-b border-[#1a1a1a]/10 pb-1 uppercase text-[#c02b2b]">
            [01] Research Interests
          </h2>
          <p className="text-sm font-sans leading-relaxed text-[#1a1a1a]/85">
            Software Analysis and Verification, Automated Testing, Mutation Testing, Neural Signal Processing (EEG), Brain-Computer Interfaces (BCI), and Modern Web Architectures.
          </p>
        </section>

        {/* Education */}
        <section className="space-y-4">
          <h2 className="text-base font-bold font-mono border-b border-[#1a1a1a]/10 pb-1 uppercase text-[#c02b2b]">
            [02] Education
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
            <ul className="list-disc pl-5 font-sans text-xs text-[#1a1a1a]/80 space-y-1">
              <li>Focus Areas: Software Verification, Deep Learning, Signal Analysis.</li>
              <li>Honors: GPA 92/100 (Top 5% of class).</li>
            </ul>
          </div>
        </section>

        {/* Research & Projects Experience */}
        <section className="space-y-4">
          <h2 className="text-base font-bold font-mono border-b border-[#1a1a1a]/10 pb-1 uppercase text-[#c02b2b]">
            [03] Research & Engineering Internships
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between items-start font-mono text-xs">
              <div>
                <h3 className="font-bold text-sm text-[#1a1a1a]">
                  Research Intern - Neurotechnology Lab
                </h3>
                <p className="text-[#1a1a1a]/70">Academic Signal Lab</p>
              </div>
              <span className="text-right text-[#1a1a1a]/70">Jun 2025 — Oct 2025</span>
            </div>
            <ul className="list-disc pl-5 font-sans text-xs text-[#1a1a1a]/80 space-y-1">
              <li>Processed raw EEG datasets for motor imagery tasks using MNE-Python.</li>
              <li>Implemented deep learning models (PyTorch) to classify signal frequencies, improving classification accuracy by 8%.</li>
              <li>Developed a real-time visualization dashboard using WebSockets.</li>
            </ul>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-start font-mono text-xs">
              <div>
                <h3 className="font-bold text-sm text-[#1a1a1a]">
                  Software Engineer Intern (Quality Assurance)
                </h3>
                <p className="text-[#1a1a1a]/70">Bolivian Tech Solutions</p>
              </div>
              <span className="text-right text-[#1a1a1a]/70">Nov 2024 — Feb 2025</span>
            </div>
            <ul className="list-disc pl-5 font-sans text-xs text-[#1a1a1a]/80 space-y-1">
              <li>Designed automated regression test suites for complex web-based services.</li>
              <li>Analyzed mutation testing coverage to evaluate quality assessment tools.</li>
              <li>Reduced continuous integration feedback cycles by 15% through test optimization.</li>
            </ul>
          </div>
        </section>

        {/* Publications & Preprints */}
        <section className="space-y-4">
          <h2 className="text-base font-bold font-mono border-b border-[#1a1a1a]/10 pb-1 uppercase text-[#c02b2b]">
            [04] Publications & Preprints
          </h2>
          <div className="space-y-3 font-sans text-xs text-[#1a1a1a]/80">
            <div className="border-l border-[#1a1a1a]/20 pl-3">
              <p className="font-bold font-mono text-[11px]">
                [Under Review] Evaluation of Test Suite Strength via TypeScript Mutation Operators
              </p>
              <p className="mt-1">
                <strong>Cristhian Rojas Marquez</strong>, Advisor Name. (2026). Submitted to Conference on Software Analysis & Engineering.
              </p>
            </div>
            <div className="border-l border-[#1a1a1a]/20 pl-3 pt-1">
              <p className="font-bold font-mono text-[11px]">
                [Preprint] Real-time Motor Imagery Classification on Low-cost Wearable EEG
              </p>
              <p className="mt-1">
                Collaborator, <strong>Cristhian Rojas Marquez</strong>. (2025). bioRxiv preprint. doi: 10.1101/example.
              </p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="space-y-4">
          <h2 className="text-base font-bold font-mono border-b border-[#1a1a1a]/10 pb-1 uppercase text-[#c02b2b]">
            [05] Technical Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="space-y-1">
              <span className="font-bold text-[#2c5f4b]">[Programming Languages]</span>
              <p className="font-sans text-xs text-[#1a1a1a]/80">Python, TypeScript, JavaScript, Java, C/C++</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-[#2c5f4b]">[Frameworks & Tools]</span>
              <p className="font-sans text-xs text-[#1a1a1a]/80">React, Next.js, PyTorch, MNE-Python, Node.js, Git, Linux</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-[#2c5f4b]">[Database Systems]</span>
              <p className="font-sans text-xs text-[#1a1a1a]/80">SQLite, PostgreSQL, Prisma ORM</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-[#2c5f4b]">[Languages]</span>
              <p className="font-sans text-xs text-[#1a1a1a]/80">Spanish (Native), English (Professional Working)</p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
