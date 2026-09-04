"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createPost } from "../../actions";

interface ProjectOption {
  id: string;
  title: string;
  [key: string]: unknown;
}

interface BlogFormClientProps {
  projects?: ProjectOption[];
}

export default function BlogFormClient({ projects = [] }: BlogFormClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [titleEs, setTitleEs] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [summaryEs, setSummaryEs] = useState("");
  const [content, setContent] = useState("");
  const [contentEs, setContentEs] = useState("");
  const [tags, setTags] = useState("");
  const [projectId, setProjectId] = useState("");
  const [published, setPublished] = useState(true);

  function handleTitleChange(val: string) {
    setTitle(val);
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9\s-_]/g, "")
      .replace(/\s+/g, "-");
    setSlug(generatedSlug);
  }

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
      const res = await createPost(payload);
      if (res.success) {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while creating the post."
      );
      setLoading(false);
    }
  }

  return (
    <div className="bg-grit border border-ash/40 p-6 space-y-6">
      <div className="border-b border-ash/15 pb-3 flex justify-between items-center">
        <h2 className="text-lg font-mono font-bold text-bone">
          New Blog Post
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
            onChange={(e) => handleTitleChange(e.target.value)}
            disabled={loading}
            placeholder="e.g. Building Resilient Database Systems"
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
            placeholder="ej. Construyendo Sistemas de Bases de Datos Resilientes"
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
            placeholder="building-resilient-database-systems"
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
            placeholder="A short snippet that appears in lists."
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
            placeholder="Breve resumen del artículo en español."
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
            placeholder="# Introduction...&#10;&#10;Write your article in Markdown."
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
            placeholder="# Introducción...&#10;&#10;Escribe tu artículo en español."
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
          {loading ? "Saving..." : "Save Blog Post"}
        </button>
      </form>
    </div>
  );
}
