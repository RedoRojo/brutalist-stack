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
    } catch (err: any) {
      setError(err.message || "An error occurred while creating the post.");
      setLoading(false);
    }
  }

  return (
    <div className="border-brutal bg-[#fafafa] p-6 shadow-brutal space-y-6">
      <div className="border-b border-[#1a1a1a]/10 pb-3 flex justify-between items-center">
        <h2 className="text-lg font-bold font-mono uppercase text-[#1a1a1a]">
          [ Blog Post Form ]
        </h2>
        <Link
          href="/admin"
          className="text-xs font-mono text-[#c02b2b] hover:underline"
        >
          [Back to Dashboard]
        </Link>
      </div>

      {error && (
        <div className="border border-[#c02b2b]/30 bg-[#c02b2b]/5 p-3 text-xs font-mono text-[#c02b2b]">
          Error: {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
        <div className="space-y-1">
          <label htmlFor="b-title" className="font-bold uppercase tracking-wider block">
            Post Title:
          </label>
          <input
            id="b-title"
            type="text"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            disabled={loading}
            placeholder="e.g. Building Resilient Database Systems"
            className="w-full px-3 py-2 border border-[#1a1a1a] bg-white rounded-none focus:outline-none focus:ring-1 focus:ring-[#c02b2b] text-sm font-sans"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="b-slug" className="font-bold uppercase tracking-wider block">
            Slug (URL path):
          </label>
          <input
            id="b-slug"
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            disabled={loading}
            placeholder="building-resilient-database-systems"
            className="w-full px-3 py-2 border border-[#1a1a1a] bg-white rounded-none focus:outline-none focus:ring-1 focus:ring-[#c02b2b] text-sm font-sans"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="b-summary" className="font-bold uppercase tracking-wider block">
            Summary (Short Intro):
          </label>
          <textarea
            id="b-summary"
            required
            rows={2}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            disabled={loading}
            placeholder="A short snippet that appears in lists."
            className="w-full px-3 py-2 border border-[#1a1a1a] bg-white rounded-none focus:outline-none focus:ring-1 focus:ring-[#c02b2b] text-sm font-sans"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="b-content" className="font-bold uppercase tracking-wider block">
            Post Body (Markdown):
          </label>
          <textarea
            id="b-content"
            required
            rows={14}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
            placeholder="# Introduction...&#10;&#10;Write the content of your article in Markdown here."
            className="w-full px-3 py-2 border border-[#1a1a1a] bg-white rounded-none focus:outline-none focus:ring-1 focus:ring-[#c02b2b] text-xs font-mono"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 border border-[#1a1a1a] bg-[#c02b2b] text-[#fafafa] font-bold uppercase tracking-wide hover:bg-[#1a1a1a] transition-all cursor-pointer shadow-brutal disabled:opacity-50"
        >
          {loading ? "[Saving Post...]" : "[Save Blog Post]"}
        </button>
      </form>
    </div>
  );
}
