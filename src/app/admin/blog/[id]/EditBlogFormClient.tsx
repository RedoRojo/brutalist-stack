"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updatePost } from "../../actions";

interface Post {
  id: string;
  title: string;
  titleEs?: string | null;
  slug: string;
  summary: string;
  summaryEs?: string | null;
  content: string;
  contentEs?: string | null;
  tags?: string | null;
  published?: boolean;
  projectId?: string | null;
}

interface ProjectOption {
  id: string;
  title: string;
  [key: string]: unknown;
}

interface EditBlogFormClientProps {
  post: Post;
  projects?: ProjectOption[];
}

export default function EditBlogFormClient({ post, projects = [] }: EditBlogFormClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(post.title);
  const [titleEs, setTitleEs] = useState(post.titleEs || "");
  const [slug, setSlug] = useState(post.slug);
  const [summary, setSummary] = useState(post.summary);
  const [summaryEs, setSummaryEs] = useState(post.summaryEs || "");
  const [content, setContent] = useState(post.content);
  const [contentEs, setContentEs] = useState(post.contentEs || "");
  const [tags, setTags] = useState(post.tags || "");
  const [projectId, setProjectId] = useState(post.projectId || "");
  const [published, setPublished] = useState(post.published ?? true);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      title,
      titleEs,
      slug,
      summary,
      summaryEs,
      content,
      contentEs,
      tags: tags || undefined,
      projectId: projectId || null,
      published,
    };

    try {
      const res = await updatePost(post.id, payload);
      if (res.success) {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while updating the post."
      );
      setLoading(false);
    }
  }

  return (
    <div className="bg-grit border border-ash/40 p-6 space-y-6">
      <div className="border-b border-ash/15 pb-3 flex justify-between items-center">
        <h2 className="text-lg font-mono font-bold text-bone">
          Edit Blog Post
        </h2>
        <Link
          href="/admin"
          className="text-xs font-mono text-rust hover:underline"
        >
          Back to Dashboard
        </Link>
      </div>

      {error && (
        <div className="border border-rust/30 bg-rust/5 p-3 text-xs font-mono text-rust">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
        <div className="space-y-1">
          <label
            htmlFor="b-title"
            className="font-bold uppercase tracking-wider block text-bone/60"
          >
            Post Title (EN)
          </label>
          <input
            id="b-title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-sm text-bone font-sans"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="b-title-es"
            className="font-bold uppercase tracking-wider block text-bone/60"
          >
            Post Title (ES - Optional)
          </label>
          <input
            id="b-title-es"
            type="text"
            value={titleEs}
            onChange={(e) => setTitleEs(e.target.value)}
            disabled={loading}
            placeholder="ej. Título del artículo en español"
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-sm text-bone font-sans"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="b-slug"
            className="font-bold uppercase tracking-wider block text-bone/60"
          >
            Slug (URL path)
          </label>
          <input
            id="b-slug"
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-sm text-bone font-sans"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="b-summary"
            className="font-bold uppercase tracking-wider block text-bone/60"
          >
            Summary (EN)
          </label>
          <textarea
            id="b-summary"
            required
            rows={2}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-sm text-bone font-sans"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="b-summary-es"
            className="font-bold uppercase tracking-wider block text-bone/60"
          >
            Summary (ES - Optional)
          </label>
          <textarea
            id="b-summary-es"
            rows={2}
            value={summaryEs}
            onChange={(e) => setSummaryEs(e.target.value)}
            disabled={loading}
            placeholder="Resumen del artículo en español"
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-sm text-bone font-sans"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="b-content"
            className="font-bold uppercase tracking-wider block text-bone/60"
          >
            Post Body (EN - Markdown)
          </label>
          <textarea
            id="b-content"
            required
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-xs font-mono text-bone"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="b-content-es"
            className="font-bold uppercase tracking-wider block text-bone/60"
          >
            Post Body (ES - Markdown - Optional)
          </label>
          <textarea
            id="b-content-es"
            rows={10}
            value={contentEs}
            onChange={(e) => setContentEs(e.target.value)}
            disabled={loading}
            placeholder="# Contenido en español..."
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-xs font-mono text-bone"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="b-project"
            className="font-bold uppercase tracking-wider block text-bone/60"
          >
            Associated Project (Optional)
          </label>
          <select
            id="b-project"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-sm text-bone font-sans"
          >
            <option value="">-- Standalone Post (No Project) --</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
          <p className="text-[11px] font-sans text-ash/70">
            Link this article as a devlog, architecture breakdown, or update for a registered project.
          </p>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="b-tags"
            className="font-bold uppercase tracking-wider block text-bone/60"
          >
            Tags (Comma-separated - Optional)
          </label>
          <input
            id="b-tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            disabled={loading}
            placeholder="e.g. TypeScript, Performance, Architecture"
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-sm text-bone font-sans"
          />
        </div>

        <div className="flex items-center gap-2 pt-2 pb-1">
          <input
            id="b-published"
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            disabled={loading}
            className="h-4 w-4 rounded-none border-ash/40 text-rust focus:ring-0"
          />
          <label htmlFor="b-published" className="font-bold uppercase tracking-wider text-bone/80 text-xs">
            Published (Uncheck to save as draft)
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary px-4 py-2 font-bold uppercase tracking-wide disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Blog Post"}
        </button>
      </form>
    </div>
  );
}
