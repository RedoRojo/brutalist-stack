"use client";

import React from "react";
import Button from "@/components/Button";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";

export default function ResumePage() {
  const { t } = useLanguage();

  function handlePrint() {
    window.print();
  }

  return (
    <div className="space-y-12 max-w-4xl mx-auto print:max-w-none print:px-0">
      {/* Print Action & Quick Info Header */}
      <AnimatedSection delay={0.1} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-sm print-hidden bg-[var(--bg-card)] p-5 rounded-2xl border border-[var(--border-subtle)] shadow-sm">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] text-xs font-mono font-medium rounded-md">
            {t.resume.cvBadge}
          </span>
          <span className="text-[var(--text-muted)] text-xs">• {t.resume.pdfReady}</span>
        </div>
        <Button onClick={handlePrint} variant="primary">
          {t.resume.printButton}
        </Button>
      </AnimatedSection>

      {/* Resume Document Paper Card */}
      <article className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-8 sm:p-14 space-y-10 shadow-sm print:bg-white print:border-none print:shadow-none print:p-0">
        {/* Header */}
        <AnimatedSection delay={0.2} className="text-center space-y-4 border-b border-[var(--border-subtle)] pb-8">
          <h1 className="text-4xl sm:text-5xl font-sans font-bold tracking-tight text-[var(--text-primary)] print:text-black">
            {t.resume.name}
          </h1>
          <p className="font-sans text-sm font-semibold text-[var(--accent)] tracking-wider uppercase">
            {t.resume.roleTitle}
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
            <span>{t.resume.contactLocation}</span>
          </div>
        </AnimatedSection>

        {/* Technical Profile */}
        <AnimatedSection delay={0.3} className="space-y-4">
          <h2 className="text-base font-sans font-bold border-b border-[var(--border-subtle)] pb-2 uppercase text-[var(--text-primary)] tracking-wider flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block" />
            {t.resume.summaryTitle}
          </h2>
          <p className="text-base font-sans leading-relaxed text-[var(--text-secondary)]">
            {t.resume.summaryText}
          </p>
        </AnimatedSection>

        {/* Technical Skills Matrix */}
        <AnimatedSection delay={0.4} className="space-y-4">
          <h2 className="text-base font-sans font-bold border-b border-[var(--border-subtle)] pb-2 uppercase text-[var(--text-primary)] tracking-wider flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block" />
            {t.resume.skillsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-sm">
            <div className="space-y-2 border-l-2 border-[var(--accent)] pl-4">
              <span className="font-bold font-sans text-[var(--text-primary)] block">
                {t.resume.skillsLanguages}
              </span>
              <p className="font-sans text-sm text-[var(--text-secondary)]">
                TypeScript, JavaScript (ES6+), Python 3, Java, C/C++
              </p>
            </div>
            <div className="space-y-2 border-l-2 border-[var(--border-subtle)] pl-4">
              <span className="font-bold font-sans text-[var(--text-primary)] block">
                {t.resume.skillsFrameworks}
              </span>
              <p className="font-sans text-sm text-[var(--text-secondary)]">
                React, Next.js (App Router), Node.js, Express, Tailwind CSS, Framer Motion
              </p>
            </div>
            <div className="space-y-2 border-l-2 border-[var(--border-subtle)] pl-4">
              <span className="font-bold font-sans text-[var(--text-primary)] block">
                {t.resume.skillsDatabases}
              </span>
              <p className="font-sans text-sm text-[var(--text-secondary)]">
                PostgreSQL, Prisma ORM, SQLite, Git, Linux, Docker
              </p>
            </div>
            <div className="space-y-2 border-l-2 border-[var(--accent)] pl-4">
              <span className="font-bold font-sans text-[var(--text-primary)] block">
                {t.resume.skillsQA}
              </span>
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
            {t.resume.experienceTitle}
          </h2>

          <div className="space-y-8">
            <div className="border-l-2 border-[var(--accent)] pl-5 space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h3 className="font-bold font-sans text-lg text-[var(--text-primary)]">
                    {t.resume.experienceRole}
                  </h3>
                  <p className="text-[var(--accent)] font-mono text-sm font-medium">
                    {t.resume.experienceCompany}
                  </p>
                </div>
                <span className="px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] text-xs font-mono font-medium rounded-md">
                  {t.resume.experienceDates}
                </span>
              </div>
              <ul className="list-disc pl-5 font-sans text-base text-[var(--text-secondary)] space-y-2 leading-relaxed">
                {t.resume.experienceBullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedSection>

        {/* Key Open Source Projects */}
        <AnimatedSection delay={0.6} className="space-y-4">
          <h2 className="text-base font-sans font-bold border-b border-[var(--border-subtle)] pb-2 uppercase text-[var(--text-primary)] tracking-wider flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block" />
            {t.resume.projectsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans text-base text-[var(--text-secondary)]">
            <div className="border border-[var(--border-subtle)] p-6 rounded-xl bg-[var(--bg-secondary)]/40 space-y-3">
              <p className="font-bold font-sans text-lg text-[var(--text-primary)] flex items-center gap-2">
                <span className="text-[var(--accent)]">&bull;</span> {t.resume.projectTitle}
              </p>
              <p className="leading-relaxed">
                {t.resume.projectDescription}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Education */}
        <AnimatedSection delay={0.7} className="space-y-4">
          <h2 className="text-base font-sans font-bold border-b border-[var(--border-subtle)] pb-2 uppercase text-[var(--text-primary)] tracking-wider flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block" />
            {t.resume.educationTitle}
          </h2>
          <div className="border-l-2 border-[var(--border-subtle)] pl-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h3 className="font-bold font-sans text-lg text-[var(--text-primary)]">
                  {t.resume.educationDegree}
                </h3>
                <p className="text-[var(--text-muted)] font-mono text-sm mt-1">
                  {t.resume.educationUniversity}
                </p>
              </div>
              <span className="px-3 py-1 border border-[var(--border-subtle)] text-[var(--text-secondary)] text-xs font-mono font-medium rounded-md bg-[var(--bg-secondary)]">
                {t.resume.educationDates}
              </span>
            </div>
          </div>
        </AnimatedSection>
      </article>
    </div>
  );
}
