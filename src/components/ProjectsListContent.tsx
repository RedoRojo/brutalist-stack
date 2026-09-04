"use client";

import { Project } from "@prisma/client";
import Link from "next/link";
import Card from "@/components/Card";
import Tag from "@/components/Tag";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectsListContentProps {
  projects: Project[];
}

export default function ProjectsListContent({ projects }: ProjectsListContentProps) {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <AnimatedSection delay={0.1} className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="black">{t.projectsPage.badge}</Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-[var(--text-primary)]">
          {t.projectsPage.title}
        </h1>
        <p className="text-base font-sans text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          {t.projectsPage.subtitle}
        </p>
      </AnimatedSection>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <AnimatedSection delay={0.2}>
          <Card className="p-12 text-center">
            <p className="font-mono text-sm text-[var(--text-muted)]">
              {t.projectsPage.empty}
            </p>
            <div className="mt-4">
              <Button href="/admin">{t.projectsPage.adminButton}</Button>
            </div>
          </Card>
        </AnimatedSection>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const displayTitle =
              language === "es" && project.titleEs ? project.titleEs : project.title;
            const displayDescription =
              language === "es" && project.descriptionEs
                ? project.descriptionEs
                : project.description;

            return (
              <Card
                key={project.id}
                delay={0.1 * index}
                className="flex flex-col justify-between hover:border-[var(--accent)] transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                      {project.status === "COMPLETED"
                        ? language === "es"
                          ? "Completado"
                          : "Completed"
                        : language === "es"
                        ? "En Progreso"
                        : "In Progress"}
                    </span>
                    {project.featured && (
                      <span className="font-mono text-[10px] text-[var(--accent)] font-semibold uppercase tracking-wider">
                        ★ {language === "es" ? "Destacado" : "Featured"}
                      </span>
                    )}
                  </div>
                  <h2 className="font-sans font-bold text-lg text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
                    <Link href={`/projects/${project.slug || project.id}`}>{displayTitle}</Link>
                  </h2>
                  <p className="text-sm font-sans leading-relaxed text-[var(--text-secondary)] min-h-[4rem]">
                    {displayDescription}
                  </p>
                  {project.techStack && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                        {t.projectsPage.techStackLabel}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.split(",").map((tech) => (
                          <Tag key={tech.trim()}>{tech.trim()}</Tag>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-4 pt-4 mt-6 border-t border-[var(--border-subtle)] font-mono text-xs">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent)] font-medium hover:underline"
                    >
                      {t.projectsPage.sourceCode}
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline"
                    >
                      {t.projectsPage.liveDemo}
                    </a>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
