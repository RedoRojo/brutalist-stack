"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateProject } from "../../actions";

interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
  techStack: string;
  repoUrl: string;
  liveUrl: string;
}

interface EditProjectFormClientProps {
  project: Project;
}

export default function EditProjectFormClient({
  project,
}: EditProjectFormClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [content, setContent] = useState(project.content || "");
  const [techStack, setTechStack] = useState(project.techStack || "");
  const [repoUrl, setRepoUrl] = useState(project.repoUrl || "");
  const [liveUrl, setLiveUrl] = useState(project.liveUrl || "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      title,
      description,
      content,
      techStack,
      repoUrl,
      liveUrl,
    };

    try {
      const res = await updateProject(project.id, payload);
      if (res.success) {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while updating the project."
      );
      setLoading(false);
    }
  }

  return (
    <div className="bg-grit border border-ash/40 p-6 space-y-6">
      <div className="border-b border-ash/15 pb-3 flex justify-between items-center">
        <h2 className="text-lg font-mono font-bold text-bone">
          Edit Project
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
            htmlFor="p-title"
            className="font-bold uppercase tracking-wider block text-bone/60"
          >
            Project Title
          </label>
          <input
            id="p-title"
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
            htmlFor="p-desc"
            className="font-bold uppercase tracking-wider block text-bone/60"
          >
            Short Description
          </label>
          <textarea
            id="p-desc"
            required
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-sm text-bone font-sans"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="p-content"
            className="font-bold uppercase tracking-wider block text-bone/60"
          >
            Detailed Content (Markdown)
          </label>
          <span className="text-[10px] text-ash block mb-1">
            Supports `![alt](/path/to/img)` for images
          </span>
          <textarea
            id="p-content"
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-xs font-mono text-bone"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="p-tech"
            className="font-bold uppercase tracking-wider block text-bone/60"
          >
            Tech Stack (comma separated)
          </label>
          <input
            id="p-tech"
            type="text"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-sm text-bone font-sans"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="p-repo"
            className="font-bold uppercase tracking-wider block text-bone/60"
          >
            GitHub URL
          </label>
          <input
            id="p-repo"
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-sm text-bone font-sans"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="p-live"
            className="font-bold uppercase tracking-wider block text-bone/60"
          >
            Live URL
          </label>
          <input
            id="p-live"
            type="url"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-sm text-bone font-sans"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary px-4 py-2 font-bold uppercase tracking-wide disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Project"}
        </button>
      </form>
    </div>
  );
}
