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

export default function EditProjectFormClient({ project }: EditProjectFormClientProps) {
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
      setError(err instanceof Error ? err.message : "An error occurred while updating the project.");
      setLoading(false);
    }
  }

  return (
    <div className="border-brutal bg-[#fafafa] p-6 shadow-brutal space-y-6">
      <div className="border-b border-[#1a1a1a]/10 pb-3 flex justify-between items-center">
        <h2 className="text-lg font-bold font-mono uppercase text-[#1a1a1a]">
          [ Edit Project Details ]
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
          <label htmlFor="p-title" className="font-bold uppercase tracking-wider block">
            Project Title:
          </label>
          <input
            id="p-title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-[#1a1a1a] bg-white rounded-none focus:outline-none focus:ring-1 focus:ring-[#c02b2b] text-sm font-sans"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="p-desc" className="font-bold uppercase tracking-wider block">
            Short Description:
          </label>
          <textarea
            id="p-desc"
            required
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-[#1a1a1a] bg-white rounded-none focus:outline-none focus:ring-1 focus:ring-[#c02b2b] text-sm font-sans"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="p-content" className="font-bold uppercase tracking-wider block">
            Detailed Content (Markdown & images supported):
          </label>
          <span className="text-[10px] text-[#1a1a1a]/50 block mb-1">
            Describe the project architecture, features, and embed images using `![alt](/path/to/img)`
          </span>
          <textarea
            id="p-content"
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-[#1a1a1a] bg-white rounded-none focus:outline-none focus:ring-1 focus:ring-[#c02b2b] text-xs font-mono"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="p-tech" className="font-bold uppercase tracking-wider block">
            Tech Stack (comma separated):
          </label>
          <input
            id="p-tech"
            type="text"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-[#1a1a1a] bg-white rounded-none focus:outline-none focus:ring-1 focus:ring-[#c02b2b] text-sm font-sans"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="p-repo" className="font-bold uppercase tracking-wider block">
            GitHub URL:
          </label>
          <input
            id="p-repo"
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-[#1a1a1a] bg-white rounded-none focus:outline-none focus:ring-1 focus:ring-[#c02b2b] text-sm font-sans"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="p-live" className="font-bold uppercase tracking-wider block">
            Live URL:
          </label>
          <input
            id="p-live"
            type="url"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-[#1a1a1a] bg-white rounded-none focus:outline-none focus:ring-1 focus:ring-[#c02b2b] text-sm font-sans"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 border border-[#1a1a1a] bg-[#c02b2b] text-[#fafafa] font-bold uppercase tracking-wide hover:bg-[#1a1a1a] transition-all cursor-pointer shadow-brutal disabled:opacity-50"
        >
          {loading ? "[Updating Project...]" : "[Update Project]"}
        </button>
      </form>
    </div>
  );
}
