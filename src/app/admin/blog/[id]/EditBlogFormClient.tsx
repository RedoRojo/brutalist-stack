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
            Post Title
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
            Summary
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
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-xs font-mono text-bone"
          />
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
