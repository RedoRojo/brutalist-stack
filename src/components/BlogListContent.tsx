"use client";

import Link from "next/link";
import { Post } from "@prisma/client";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";

interface BlogListContentProps {
  posts: (Post & {
    project?: {
      id: string;
      title: string;
      titleEs?: string | null;
      slug: string;
    } | null;
  })[];
}

export default function BlogListContent({ posts }: BlogListContentProps) {
  const { language, t } = useLanguage();

  const locale = language === "es" ? "es-ES" : "en-US";

  return (
    <div className="space-y-10 max-w-3xl mx-auto">
      {/* Page Header */}
      <AnimatedSection delay={0.1} className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="black">{t.blogPage.badge}</Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-[var(--text-primary)]">
          {t.blogPage.title}
        </h1>
        <p className="text-base font-sans text-[var(--text-secondary)] leading-relaxed">
          {t.blogPage.subtitle}
        </p>
      </AnimatedSection>

      {/* Posts List */}
      {posts.length === 0 ? (
        <AnimatedSection delay={0.2}>
          <Card className="p-12 text-center">
            <p className="font-mono text-sm text-[var(--text-muted)]">
              {t.blogPage.empty}
            </p>
            <div className="mt-4">
              <Button href="/admin">{t.blogPage.adminButton}</Button>
            </div>
          </Card>
        </AnimatedSection>
      ) : (
        <div className="space-y-4">
          {posts.map((post, index) => {
            const displayTitle =
              language === "es" && post.titleEs ? post.titleEs : post.title;
            const displaySummary =
              language === "es" && post.summaryEs ? post.summaryEs : post.summary;
            const projectTitle =
              post.project &&
              (language === "es" && post.project.titleEs
                ? post.project.titleEs
                : post.project.title);

            return (
              <Card
                key={post.id}
                delay={0.1 * index}
                className="hover:border-[var(--accent)] transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="black">
                      {new Date(post.publishedAt).toLocaleDateString(locale, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Badge>
                    {post.project && (
                      <Link
                        href={`/projects/${post.project.slug || post.project.id}`}
                        className="font-mono text-xs px-2 py-0.5 bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent-border)] rounded-full hover:underline"
                      >
                        📌 {projectTitle}
                      </Link>
                    )}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-mono text-xs text-[var(--accent)] font-medium hover:underline self-start sm:self-auto"
                  >
                    {t.blogPage.readArticle}
                  </Link>
                </div>
                <h2 className="font-sans font-bold text-lg text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`}>{displayTitle}</Link>
                </h2>
                <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
                  {displaySummary}
                </p>
                {post.tags && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {post.tags.split(",").map((tag) => (
                      <span
                        key={tag.trim()}
                        className="font-mono text-[10px] px-1.5 py-0.5 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-muted)] rounded"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
