"use client";

import Link from "next/link";
import { Project, Post } from "@prisma/client";
import Markdown from "@/components/Markdown";
import Card from "@/components/Card";
import Tag from "@/components/Tag";
import Badge from "@/components/Badge";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectDetailContentProps {
  project: Project & {
    posts?: Post[];
  };
}

export default function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const { language, t } = useLanguage();

  const displayTitle =
    language === "es" && project.titleEs ? project.titleEs : project.title;
  const displayDescription =
    language === "es" && project.descriptionEs ? project.descriptionEs : project.description;
  const displayContent =
    language === "es" && project.contentEs ? project.contentEs : project.content;

  const locale = language === "es" ? "es-ES" : "en-US";

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Back link */}
      <div className="font-mono text-xs">
        <Link href="/projects" className="text-[var(--accent)] link-underline">
          {t.projectsPage.backLink}
        </Link>
      </div>

      {/* Project Header */}
      <AnimatedSection delay={0.1}>
        <Card accent>
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={project.status === "COMPLETED" ? "black" : "red"}>
                {project.status === "COMPLETED"
                  ? language === "es"
                    ? "COMPLETADO"
                    : "COMPLETED"
                  : language === "es"
                  ? "EN DESARROLLO"
                  : "IN PROGRESS"}
              </Badge>
              {project.featured && (
                <Badge variant="red">
                  {language === "es" ? "DESTACADO" : "FEATURED"}
                </Badge>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-[var(--text-primary)]">
              {displayTitle}
            </h1>
            <p className="text-sm font-sans text-[var(--text-secondary)] border-l-2 border-[var(--accent)] pl-4 leading-relaxed">
              {displayDescription}
            </p>
            {project.techStack && (
              <div className="space-y-2">
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
            <div className="flex flex-wrap gap-4 pt-3 font-mono text-xs border-t border-[var(--border-subtle)]">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:underline font-medium"
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
          </div>
        </Card>
      </AnimatedSection>

      {/* Related Blog Posts / Devlogs */}
      {project.posts && project.posts.length > 0 && (
        <AnimatedSection delay={0.15}>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
              <h2 className="font-sans font-bold text-lg text-[var(--text-primary)]">
                {language === "es"
                  ? "Entradas de Blog y Devlogs del Proyecto"
                  : "Project Devlogs & Blog Posts"}
              </h2>
              <span className="font-mono text-xs text-[var(--accent)] font-semibold">
                {project.posts.length}{" "}
                {language === "es"
                  ? project.posts.length === 1
                    ? "artículo"
                    : "artículos"
                  : project.posts.length === 1
                  ? "post"
                  : "posts"}
              </span>
            </div>
            <div className="space-y-3">
              {project.posts.map((post) => {
                const postTitle =
                  language === "es" && post.titleEs ? post.titleEs : post.title;
                const postSummary =
                  language === "es" && post.summaryEs ? post.summaryEs : post.summary;

                return (
                  <Card key={post.id} className="space-y-2 hover:border-[var(--accent)] transition-all">
                    <div className="flex items-center justify-between gap-2 border-b border-dotted border-[var(--border-subtle)] pb-1.5">
                      <span className="font-mono text-xs text-[var(--text-muted)]">
                        {new Date(post.publishedAt).toLocaleDateString(locale, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="font-mono text-xs text-[var(--accent)] font-medium hover:underline"
                      >
                        {language === "es" ? "Leer entrada →" : "Read entry →"}
                      </Link>
                    </div>
                    <h3 className="font-sans font-bold text-base text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
                      <Link href={`/blog/${post.slug}`}>{postTitle}</Link>
                    </h3>
                    <p className="text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
                      {postSummary}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Project Documentation */}
      <AnimatedSection delay={0.2}>
        <Card>
          <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider border-b border-[var(--border-subtle)] pb-2 mb-4">
            {language === "es" ? "Documentación del Proyecto" : "Project Documentation"}
          </div>
          {displayContent ? (
            <Markdown content={displayContent} />
          ) : (
            <div className="border border-dashed border-[var(--border-subtle)] p-6 text-center bg-[var(--bg-secondary)] font-mono text-xs text-[var(--text-muted)] rounded-lg">
              {language === "es"
                ? "No hay detalles adicionales disponibles para este proyecto."
                : "No further details available for this project."}
            </div>
          )}
        </Card>
      </AnimatedSection>
    </div>
  );
}
