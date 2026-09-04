"use client";

import Link from "next/link";
import { Project } from "@prisma/client";
import Card from "@/components/Card";
import Tag from "@/components/Tag";
import Button from "@/components/Button";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";

interface HomeContentProps {
  featuredProjects: Project[];
}

export default function HomeContent({ featuredProjects }: HomeContentProps) {
  const { language, t } = useLanguage();

  const skillCategories = [
    {
      category: t.home.skills.frontendCategory,
      skills: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion", "JavaScript"],
    },
    {
      category: t.home.skills.backendCategory,
      skills: ["Python", "Java", "Node.js", "PostgreSQL", "Prisma ORM", "Docker"],
    },
    {
      category: t.home.skills.qaCategory,
      skills: ["Test Automation", "CI/CD", "Linux", "System Architecture", "Quality Assurance"],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-20">
      {/* Hero Section */}
      <AnimatedSection delay={0.1} className="space-y-6 pt-10">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent-border)] text-xs font-mono font-medium rounded-full">
            {t.home.roleBadge}
          </span>
          <span className="font-mono text-xs text-[var(--text-muted)]">• {t.home.location}</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-[var(--text-primary)] leading-tight whitespace-pre-line">
          {t.home.heroTitle}
        </h1>

        <p className="text-lg sm:text-xl font-sans text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          {t.home.heroDescription}
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Button href="/resume" variant="primary">
            {t.home.viewResume}
          </Button>
          <Button href="/projects" variant="secondary">
            {t.home.exploreProjects}
          </Button>
        </div>
      </AnimatedSection>

      {/* HR Recruiter Quick Snapshot Card */}
      <AnimatedSection delay={0.2}>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 md:p-8 space-y-6 shadow-xs transition-colors duration-200">
          <div className="flex flex-wrap justify-between items-center gap-3 border-b border-[var(--border-subtle)] pb-4">
            <h2 className="font-sans text-lg font-semibold text-[var(--text-primary)]">
              {t.home.recruiter.title}
            </h2>
            <span className="px-3 py-1 bg-[var(--accent-green-bg)] text-[var(--accent-green)] border border-[var(--accent-green-border)] text-xs font-mono font-medium rounded-full">
              {t.home.recruiter.badge}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-mono text-sm">
            <div className="space-y-1.5 border-l-2 border-[var(--accent)] pl-4">
              <span className="text-[var(--text-muted)] font-medium uppercase text-xs tracking-wider block">
                {t.home.recruiter.targetRolesLabel}
              </span>
              <p className="font-semibold text-[var(--text-primary)]">
                {t.home.recruiter.targetRolesValue}
              </p>
            </div>

            <div className="space-y-1.5 border-l-2 border-[var(--border-subtle)] pl-4">
              <span className="text-[var(--text-muted)] font-medium uppercase text-xs tracking-wider block">
                {t.home.recruiter.educationLabel}
              </span>
              <p className="font-semibold text-[var(--text-primary)]">
                {t.home.recruiter.educationDegree}
              </p>
              <p className="text-[var(--text-muted)] text-xs">
                {t.home.recruiter.educationSchool}
              </p>
            </div>

            <div className="space-y-1.5 border-l-2 border-[var(--border-subtle)] pl-4">
              <span className="text-[var(--text-muted)] font-medium uppercase text-xs tracking-wider block">
                {t.home.recruiter.locationLabel}
              </span>
              <p className="font-semibold text-[var(--text-primary)]">
                {t.home.recruiter.locationValue}
              </p>
              <p className="text-[var(--accent)] font-medium text-xs">
                {t.home.recruiter.locationModality}
              </p>
            </div>

            <div className="space-y-1.5 border-l-2 border-[var(--border-subtle)] pl-4">
              <span className="text-[var(--text-muted)] font-medium uppercase text-xs tracking-wider block">
                {t.home.recruiter.contactLabel}
              </span>
              <p className="font-semibold text-[var(--text-primary)]">
                {t.home.recruiter.contactLanguages}
              </p>
              <a
                href="mailto:cristhian.rojas@example.com"
                className="text-[var(--accent)] hover:underline text-xs"
              >
                {t.home.recruiter.contactAction}
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Categorized Technical Skills */}
      <AnimatedSection delay={0.3} className="space-y-8">
        <div>
          <h2 className="text-3xl font-sans font-bold text-[var(--text-primary)]">
            {t.home.skills.title}
          </h2>
          <p className="text-sm font-sans text-[var(--text-muted)] mt-2">
            {t.home.skills.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((group, index) => (
            <Card key={group.category} delay={0.1 * index} className="space-y-4">
              <h3 className="font-sans font-semibold text-[var(--text-primary)]">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </AnimatedSection>

      {/* Featured Projects */}
      <AnimatedSection delay={0.4} className="space-y-8">
        <div className="flex justify-between items-end border-b border-[var(--border-subtle)] pb-4">
          <h2 className="text-3xl font-sans font-bold text-[var(--text-primary)]">
            {t.home.featuredProjects.title}
          </h2>
          <Link
            href="/projects"
            className="font-mono text-sm text-[var(--accent)] font-medium hover:underline"
          >
            {t.home.featuredProjects.viewAll}
          </Link>
        </div>

        {featuredProjects.length === 0 ? (
          <Card className="p-12 text-center border border-dashed border-[var(--border-subtle)] shadow-none hover:shadow-none">
            <p className="font-sans text-[var(--text-muted)]">
              {t.home.featuredProjects.empty}
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => {
              const displayTitle =
                language === "es" && project.titleEs
                  ? project.titleEs
                  : project.title;
              const displayDescription =
                language === "es" && project.descriptionEs
                  ? project.descriptionEs
                  : project.description;

              return (
                <Card
                  key={project.id}
                  delay={0.1 * index}
                  className="flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <h3 className="font-sans font-bold text-lg text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
                      <Link href={`/projects/${project.slug || project.id}`}>{displayTitle}</Link>
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] font-sans line-clamp-3 leading-relaxed">
                      {displayDescription}
                    </p>
                    {project.techStack && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.techStack.split(",").map((tech) => (
                          <Tag key={tech.trim()}>{tech.trim()}</Tag>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-4 pt-6 mt-4 font-mono text-xs">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent)] font-medium hover:underline"
                      >
                        {t.home.featuredProjects.github}
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline"
                      >
                        {t.home.featuredProjects.liveDemo}
                      </a>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </AnimatedSection>
    </div>
  );
}
