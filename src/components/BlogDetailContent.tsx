"use client";

import Link from "next/link";
import { Post } from "@prisma/client";
import Markdown from "@/components/Markdown";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";

interface BlogDetailContentProps {
  post: Post & {
    project?: {
      id: string;
      title: string;
      titleEs?: string | null;
      slug: string;
    } | null;
  };
}

export default function BlogDetailContent({ post }: BlogDetailContentProps) {
  const { language, t } = useLanguage();

  const locale = language === "es" ? "es-ES" : "en-US";
  const displayTitle =
    language === "es" && post.titleEs ? post.titleEs : post.title;
  const displaySummary =
    language === "es" && post.summaryEs ? post.summaryEs : post.summary;
  const displayContent =
    language === "es" && post.contentEs ? post.contentEs : post.content;

  const projectTitle =
    post.project &&
    (language === "es" && post.project.titleEs
      ? post.project.titleEs
      : post.project.title);

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Back link */}
      <div className="font-mono text-xs">
        <Link href="/blog" className="text-[var(--accent)] link-underline">
          {t.blogPage.backLink}
        </Link>
      </div>

      {/* Post Header */}
      <AnimatedSection delay={0.1}>
        <Card accent>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="black">
                {t.blogPage.publishedOn}{" "}
                {new Date(post.publishedAt).toLocaleDateString(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Badge>
              {post.project && (
                <Link
                  href={`/projects/${post.project.slug || post.project.id}`}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-mono bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent-border)] rounded-full hover:underline"
                >
                  <span>📌 {language === "es" ? "Proyecto:" : "Project:"}</span>
                  <span className="font-semibold">{projectTitle}</span>
                </Link>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight leading-snug text-[var(--text-primary)]">
              {displayTitle}
            </h1>
            <p className="text-sm font-sans text-[var(--text-secondary)] border-l-2 border-[var(--accent)] pl-4 leading-relaxed italic">
              {displaySummary}
            </p>

            {post.tags && (
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--border-subtle)]">
                {post.tags.split(",").map((tag) => (
                  <span
                    key={tag.trim()}
                    className="font-mono text-[11px] px-2 py-0.5 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-muted)] rounded"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Card>
      </AnimatedSection>

      {/* Post Content */}
      <AnimatedSection delay={0.2}>
        <Card>
          <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider border-b border-[var(--border-subtle)] pb-2 mb-4">
            {language === "es" ? "Artículo Técnico" : "Technical Article"}
          </div>
          <Markdown content={displayContent} />
        </Card>
      </AnimatedSection>
    </div>
  );
}
