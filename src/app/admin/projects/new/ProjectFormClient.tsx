"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createProject } from "../../actions";

export default function ProjectFormClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [titleEs, setTitleEs] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionEs, setDescriptionEs] = useState("");
  const [content, setContent] = useState("");
  const [contentEs, setContentEs] = useState("");
  const [techStack, setTechStack] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [status, setStatus] = useState("COMPLETED");
  const [featured, setFeatured] = useState(false);

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
      description,
      descriptionEs,
      content,
      contentEs,
      techStack,
      repoUrl: repoUrl || undefined,
      liveUrl: liveUrl || undefined,
      status,
      featured,
    };

    try {
      const res = await createProject(payload);
      if (res.success) {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while creating the project."
      );
      setLoading(false);
    }
  }

  return (
    <div className="bg-grit border border-ash/40 p-6 space-y-6">
      <div className="border-b border-ash/15 pb-3 flex justify-between items-center">
        <h2 className="text-lg font-mono font-bold text-bone">
          New Project
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
            Project Title (EN)
          </label>
          <input
            id="p-title"
            type="text"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            disabled={loading}
            placeholder="e.g. Real-Time Signal Classifier"
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-sm text-bone font-sans"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="p-title-es"
            className="font-bold uppercase tracking-wider block text-bone/60"
          >
            Project Title (ES - Optional)
          </label>
          <input
            id="p-title-es"
            type="text"
            value={titleEs}
            onChange={(e) => setTitleEs(e.target.value)}
            disabled={loading}
            placeholder="ej. Clasificador de Señales en Tiempo Real"
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-sm text-bone font-sans"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="p-slug"
            className="font-bold uppercase tracking-wider block text-bone/60"
          >
            Slug (URL path)
          </label>
          <input
            id="p-slug"
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            disabled={loading}
            placeholder="real-time-signal-classifier"
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-sm text-bone font-sans"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="p-desc"
            className="font-bold uppercase tracking-wider block text-bone/60"
          >
            Short Description (EN)
          </label>
          <textarea
            id="p-desc"
            required
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            placeholder="A short card summary of the project."
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-sm text-bone font-sans"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="p-desc-es"
            className="font-bold uppercase tracking-wider block text-bone/60"
          >
            Short Description (ES - Optional)
          </label>
          <textarea
            id="p-desc-es"
            rows={2}
            value={descriptionEs}
            onChange={(e) => setDescriptionEs(e.target.value)}
            disabled={loading}
            placeholder="Resumen corto del proyecto para tarjetas."
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-sm text-bone font-sans"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="p-content"
            className="font-bold uppercase tracking-wider block text-bone/60"
          >
            Detailed Content (EN - Markdown)
          </label>
          <span className="text-[10px] text-ash block mb-1">
            Supports `![alt](/path/to/img)` for images
          </span>
          <textarea
            id="p-content"
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
            placeholder="# Technical Architecture...&#10;&#10;Describe system pipelines here."
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-xs font-mono text-bone"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="p-content-es"
            className="font-bold uppercase tracking-wider block text-bone/60"
          >
            Detailed Content (ES - Markdown - Optional)
          </label>
          <textarea
            id="p-content-es"
            rows={8}
            value={contentEs}
            onChange={(e) => setContentEs(e.target.value)}
            disabled={loading}
            placeholder="# Arquitectura Técnica...&#10;&#10;Describe el sistema aquí."
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
            placeholder="TypeScript, Next.js, PostgreSQL, Prisma"
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
            placeholder="https://github.com/username/project"
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
            placeholder="https://project.live"
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-sm text-bone font-sans"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="p-status"
            className="font-bold uppercase tracking-wider block text-bone/60"
          >
            Project Status
          </label>
          <select
            id="p-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-sm text-bone font-sans"
          >
            <option value="COMPLETED">Completed</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        <div className="flex items-center gap-2 pt-2 pb-1">
          <input
            id="p-featured"
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            disabled={loading}
            className="h-4 w-4 rounded-none border-ash/40 text-rust focus:ring-0"
          />
          <label htmlFor="p-featured" className="font-bold uppercase tracking-wider text-bone/80 text-xs">
            Mark as Featured (display in hero/featured sections)
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary px-4 py-2 font-bold uppercase tracking-wide disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Project"}
        </button>
      </form>
    </div>
  );
}
