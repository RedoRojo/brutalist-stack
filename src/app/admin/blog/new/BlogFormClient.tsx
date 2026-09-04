"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createPost } from "../../actions";

export default function BlogFormClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

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
      slug,
      summary,
      content,
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
            Post Title
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
            Summary
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
            htmlFor="b-content"
            className="font-bold uppercase tracking-wider block text-bone/60"
          >
            Post Body (Markdown)
          </label>
          <textarea
            id="b-content"
            required
            rows={14}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
            placeholder="# Introduction...&#10;&#10;Write your article in Markdown."
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-xs font-mono text-bone"
          />
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
