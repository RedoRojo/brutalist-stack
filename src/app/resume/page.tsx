"use client";

import React from "react";
import Button from "@/components/Button";
import AnimatedSection from "@/components/AnimatedSection";

export default function ResumePage() {
  function handlePrint() {
    window.print();
  }

  return (
    <div className="space-y-12 max-w-4xl mx-auto print:max-w-none print:px-0">
      {/* Print Action & Quick Info Header */}
      <AnimatedSection delay={0.1} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-sm print-hidden bg-[var(--bg-card)] p-5 rounded-2xl border border-[var(--border-subtle)] shadow-sm">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] text-xs font-mono font-medium rounded-md">
            CURRICULUM VITAE
          </span>
          <span className="text-[var(--text-muted)] text-xs">• PDF Ready</span>
        </div>
        <Button onClick={handlePrint} variant="primary">
          Print / Download PDF
        </Button>
      </AnimatedSection>

      {/* Resume Document Paper Card */}
      <article className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-8 sm:p-14 space-y-10 shadow-sm print:bg-white print:border-none print:shadow-none print:p-0">
        {/* Header */}
        <AnimatedSection delay={0.2} className="text-center space-y-4 border-b border-[var(--border-subtle)] pb-8">
          <h1 className="text-4xl sm:text-5xl font-sans font-bold tracking-tight text-[var(--text-primary)] print:text-black">
            Cristhian Victor Rojas Marquez
          </h1>
          <p className="font-sans text-sm font-semibold text-[var(--accent)] tracking-wider uppercase">
            Full-Stack &amp; QA Automation Engineer
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 font-mono text-sm text-[var(--text-secondary)]">
            <a href="mailto:cristhian.rojas@example.com" className="hover:text-[var(--accent)] transition-colors">
              cristhian.rojas@example.com
            </a>
            <span className="text-[var(--border-subtle)]">&bull;</span>
            <a href="https://github.com/cristhian-rojas" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
              github.com/cristhian-rojas
            </a>
            <span className="text-[var(--border-subtle)]">&bull;</span>
            <span>Cochabamba, Bolivia</span>
          </div>
        </AnimatedSection>

        {/* Technical Profile */}
        <AnimatedSection delay={0.3} className="space-y-4">
          <h2 className="text-base font-sans font-bold border-b border-[var(--border-subtle)] pb-2 uppercase text-[var(--text-primary)] tracking-wider flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block" />
            Executive Summary
          </h2>
          <p className="text-base font-sans leading-relaxed text-[var(--text-secondary)]">
            Software Engineer specializing in full-stack web applications, scalable system architectures, and automated software analysis engines. Passionate about system reliability, continuous integration, test efficacy, and building seamless developer tooling.
          </p>
        </AnimatedSection>

        {/* Technical Skills Matrix */}
        <AnimatedSection delay={0.4} className="space-y-4">
          <h2 className="text-base font-sans font-bold border-b border-[var(--border-subtle)] pb-2 uppercase text-[var(--text-primary)] tracking-wider flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block" />
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-sm">
            <div className="space-y-2 border-l-2 border-[var(--accent)] pl-4">
              <span className="font-bold font-sans text-[var(--text-primary)] block">Languages</span>
              <p className="font-sans text-sm text-[var(--text-secondary)]">
                TypeScript, JavaScript (ES6+), Python 3, Java, C/C++
              </p>
            </div>
            <div className="space-y-2 border-l-2 border-[var(--border-subtle)] pl-4">
              <span className="font-bold font-sans text-[var(--text-primary)] block">Frameworks</span>
              <p className="font-sans text-sm text-[var(--text-secondary)]">
                React, Next.js (App Router), Node.js, Express, Tailwind CSS, Framer Motion
              </p>
            </div>
            <div className="space-y-2 border-l-2 border-[var(--border-subtle)] pl-4">
              <span className="font-bold font-sans text-[var(--text-primary)] block">Databases &amp; Systems</span>
              <p className="font-sans text-sm text-[var(--text-secondary)]">
                PostgreSQL, Prisma ORM, SQLite, Git, Linux, Docker
              </p>
            </div>
            <div className="space-y-2 border-l-2 border-[var(--accent)] pl-4">
              <span className="font-bold font-sans text-[var(--text-primary)] block">QA &amp; Automation</span>
              <p className="font-sans text-sm text-[var(--text-secondary)]">
                Mutation Testing, Jest, AST Analysis, CI/CD Pipelines
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Experience Timeline */}
        <AnimatedSection delay={0.5} className="space-y-6">
          <h2 className="text-base font-sans font-bold border-b border-[var(--border-subtle)] pb-2 uppercase text-[var(--text-primary)] tracking-wider flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block" />
            Professional Experience
          </h2>

          <div className="space-y-8">
            <div className="border-l-2 border-[var(--accent)] pl-5 space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h3 className="font-bold font-sans text-lg text-[var(--text-primary)]">
                    Software Engineer Intern (QA &amp; Automation)
                  </h3>
                  <p className="text-[var(--accent)] font-mono text-sm font-medium">Bolivian Tech Solutions</p>
                </div>
                <span className="px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] text-xs font-mono font-medium rounded-md">
                  Nov 2024 &mdash; Feb 2025
                </span>
              </div>
              <ul className="list-disc pl-5 font-sans text-base text-[var(--text-secondary)] space-y-2 leading-relaxed">
                <li>
                  Designed and executed automated regression test suites for high-traffic web services using TypeScript and Jest.
                </li>
                <li>
                  Integrated AST mutation testing analysis to measure test suite efficacy and eliminate silent test failures.
                </li>
                <li>
                  Reduced continuous integration build feedback times by 15% through test parallelization and container optimization.
                </li>
              </ul>
            </div>
          </div>
        </AnimatedSection>

        {/* Key Open Source Projects */}
        <AnimatedSection delay={0.6} className="space-y-4">
          <h2 className="text-base font-sans font-bold border-b border-[var(--border-subtle)] pb-2 uppercase text-[var(--text-primary)] tracking-wider flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block" />
            Open Source Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans text-base text-[var(--text-secondary)]">
            <div className="border border-[var(--border-subtle)] p-6 rounded-xl bg-[var(--bg-secondary)]/40 space-y-3">
              <p className="font-bold font-sans text-lg text-[var(--text-primary)] flex items-center gap-2">
                <span className="text-[var(--accent)]">&bull;</span> TS Mutation Testing Engine
              </p>
              <p className="leading-relaxed">
                Author of a static analysis testing utility for TypeScript. Evaluates test coverage quality by mutating AST nodes and running parallel worker threads.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Education */}
        <AnimatedSection delay={0.7} className="space-y-4">
          <h2 className="text-base font-sans font-bold border-b border-[var(--border-subtle)] pb-2 uppercase text-[var(--text-primary)] tracking-wider flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block" />
            Education
          </h2>
          <div className="border-l-2 border-[var(--border-subtle)] pl-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h3 className="font-bold font-sans text-lg text-[var(--text-primary)]">
                  B.S. in Computer Science
                </h3>
                <p className="text-[var(--text-muted)] font-mono text-sm mt-1">
                  Universidad Mayor de San Sim&oacute;n (UMSS)
                </p>
              </div>
              <span className="px-3 py-1 border border-[var(--border-subtle)] text-[var(--text-secondary)] text-xs font-mono font-medium rounded-md bg-[var(--bg-secondary)]">
                2022 &mdash; Present
              </span>
            </div>
          </div>
        </AnimatedSection>
      </article>
    </div>
  );
}

