"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updatePost } from "../../actions";

interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
}

interface EditBlogFormClientProps {
  post: Post;
}

export default function EditBlogFormClient({ post }: EditBlogFormClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(post.title);
  const [slug, setSlug] = useState(post.slug);
  const [summary, setSummary] = useState(post.summary);
  const [content, setContent] = useState(post.content);

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
      const res = await updatePost(post.id, payload);
      if (res.success) {
        router.push("/admin");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while updating the post.");
      setLoading(false);
    }
  }

  return (
    <div className="border-brutal bg-[#fafafa] p-6 shadow-brutal space-y-6">
      <div className="border-b border-[#1a1a1a]/10 pb-3 flex justify-between items-center">
        <h2 className="text-lg font-bold font-mono uppercase text-[#1a1a1a]">
          [ Edit Blog Post Details ]
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
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
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
            className="w-full px-3 py-2 border border-[#1a1a1a] bg-white rounded-none focus:outline-none focus:ring-1 focus:ring-[#c02b2b] text-xs font-mono"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 border border-[#1a1a1a] bg-[#c02b2b] text-[#fafafa] font-bold uppercase tracking-wide hover:bg-[#1a1a1a] transition-all cursor-pointer shadow-brutal disabled:opacity-50"
        >
          {loading ? "[Updating Post...]" : "[Update Blog Post]"}
        </button>
      </form>
    </div>
  );
}
