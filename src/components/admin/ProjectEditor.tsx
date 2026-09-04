"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Code,
  FileCode,
  Quote,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Eye,
  Columns,
  Edit3,
  Save,
  ArrowLeft,
  ExternalLink,
  GitBranch,
  Plus,
  X,
  FileText,
  LayoutGrid,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Markdown from "@/components/Markdown";
import Card from "@/components/Card";
import Tag from "@/components/Tag";
import Badge from "@/components/Badge";

export interface ProjectFormData {
  title: string;
  titleEs?: string;
  slug?: string;
  description: string;
  descriptionEs?: string;
  content: string;
  contentEs?: string;
  techStack: string;
  repoUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  status?: string;
}

interface ProjectEditorProps {
  initialData?: Partial<ProjectFormData> & { id?: string };
  mode: "create" | "edit";
  onSubmit: (data: ProjectFormData) => Promise<{ success?: boolean; error?: string }>;
}

export default function ProjectEditor({ initialData, mode, onSubmit }: ProjectEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState(initialData?.title || "");
  const [titleEs, setTitleEs] = useState(initialData?.titleEs || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(Boolean(initialData?.slug));
  const [description, setDescription] = useState(initialData?.description || "");
  const [descriptionEs, setDescriptionEs] = useState(initialData?.descriptionEs || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [contentEs, setContentEs] = useState(initialData?.contentEs || "");
  
  // Tech stack pills
  const [techStackArray, setTechStackArray] = useState<string[]>(
    initialData?.techStack ? initialData.techStack.split(",").map((s) => s.trim()).filter(Boolean) : []
  );
  const [newTagInput, setNewTagInput] = useState("");

  const [repoUrl, setRepoUrl] = useState(initialData?.repoUrl || "");
  const [liveUrl, setLiveUrl] = useState(initialData?.liveUrl || "");
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [status, setStatus] = useState(initialData?.status || "COMPLETED");

  // UI state
  const [activeLang, setActiveLang] = useState<"en" | "es">("en");
  const [viewMode, setViewMode] = useState<"split" | "edit" | "preview">("split");
  const [previewStyle, setPreviewStyle] = useState<"detail" | "card">("detail");

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-slug generator
  function handleTitleChange(val: string) {
    setTitle(val);
    if (!isSlugManuallyEdited) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-_]/g, "")
        .replace(/\s+/g, "-");
      setSlug(generated);
    }
  }

  // Tag addition
  function handleAddTag() {
    const trimmed = newTagInput.trim();
    if (trimmed && !techStackArray.includes(trimmed)) {
      setTechStackArray([...techStackArray, trimmed]);
      setNewTagInput("");
    }
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddTag();
    }
  }

  function handleRemoveTag(tagToRemove: string) {
    setTechStackArray(techStackArray.filter((t) => t !== tagToRemove));
  }

  // Markdown Toolbar helper
  function insertMarkdown(prefix: string, suffix: string = "", defaultText: string = "") {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = activeLang === "en" ? content : contentEs;
    const selectedText = currentText.substring(start, end) || defaultText;

    const replacement = `${prefix}${selectedText}${suffix}`;
    const newText = currentText.substring(0, start) + replacement + currentText.substring(end);

    if (activeLang === "en") {
      setContent(newText);
    } else {
      setContentEs(newText);
    }

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 0);
  }

  // Quick Template Helpers
  function insertTemplate(templateType: "architecture" | "highlights" | "code") {
    let tpl = "";
    if (templateType === "architecture") {
      tpl = activeLang === "en"
        ? `\n## System Architecture\n\nThe software architecture is engineered with high throughput and low latency in mind:\n- **Ingestion**: Handles real-time events through worker threads.\n- **Processing**: Parallel pipeline executing business logic and AST verification.\n- **Delivery**: Broadcasts updates via WebSockets and HTTP APIs.\n`
        : `\n## Arquitectura del Sistema\n\nLa arquitectura de software está diseñada para alto rendimiento y baja latencia:\n- **Ingesta**: Maneja eventos en tiempo real mediante procesos worker.\n- **Procesamiento**: Pipeline paralelo que ejecuta lógica de negocio y verificación AST.\n- **Entrega**: Transmite actualizaciones mediante WebSockets y APIs HTTP.\n`;
    } else if (templateType === "highlights") {
      tpl = activeLang === "en"
        ? `\n## Key Engineering Highlights\n\n- **Zero Latency Budget**: Optimized execution pipelines to finish under 100ms.\n- **Strict Type Safety**: Complete TypeScript end-to-end typing.\n- **Automated Verification**: Comprehensive regression test coverage.\n`
        : `\n## Aspectos Técnicos Destacados\n\n- **Presupuesto de Cero Latencia**: Optimización de pipelines para ejecutar en menos de 100ms.\n- **Tipado Estricto**: Tipado completo de extremo a extremo con TypeScript.\n- **Verificación Automatizada**: Cobertura exhaustiva con pruebas de regresión.\n`;
    } else if (templateType === "code") {
      tpl = `\n\`\`\`typescript\n// Implementation example\nexport async function processPipeline(input: PipelineInput): Promise<PipelineResult> {\n  const sanitized = sanitize(input);\n  return await executeWorker(sanitized);\n}\n\`\`\`\n`;
    }

    insertMarkdown("", "", tpl);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const payload: ProjectFormData = {
      title,
      titleEs: titleEs.trim() || undefined,
      slug: slug.trim() || undefined,
      description,
      descriptionEs: descriptionEs.trim() || undefined,
      content,
      contentEs: contentEs.trim() || undefined,
      techStack: techStackArray.join(", "),
      repoUrl: repoUrl.trim() || undefined,
      liveUrl: liveUrl.trim() || undefined,
      featured,
      status,
    };

    try {
      const res = await onSubmit(payload);
      if (res.error) {
        setError(res.error);
        setLoading(false);
      } else {
        setSuccessMessage(mode === "create" ? "Project created successfully!" : "Project updated successfully!");
        setTimeout(() => {
          router.push("/admin");
          router.refresh();
        }, 800);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      setLoading(false);
    }
  }

  // Active values for preview
  const previewTitle = activeLang === "es" && titleEs.trim() ? titleEs : title || (activeLang === "es" ? "Título del Proyecto" : "Project Title");
  const previewDesc = activeLang === "es" && descriptionEs.trim() ? descriptionEs : description || (activeLang === "es" ? "Descripción del proyecto para previsualización en tiempo real." : "Project description for real-time frontend preview.");
  const previewContent = activeLang === "es" && contentEs.trim() ? contentEs : content;

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] p-4 rounded-2xl shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors px-2 py-1 rounded-md hover:bg-[var(--bg-secondary)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
          <span className="text-[var(--border-subtle)]">|</span>
          <h1 className="font-sans font-bold text-base text-[var(--text-primary)]">
            {mode === "create" ? "Create New Project" : `Editing: ${title || "Project"}`}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Language Switcher Tabs */}
          <div className="flex items-center p-1 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-subtle)] font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveLang("en")}
              className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                activeLang === "en"
                  ? "bg-[var(--bg-card)] text-[var(--text-primary)] font-semibold shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <span>EN</span>
              <span className="text-[10px] text-[var(--text-muted)]">English</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveLang("es")}
              className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                activeLang === "es"
                  ? "bg-[var(--bg-card)] text-[var(--text-primary)] font-semibold shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <span>ES</span>
              <span className="text-[10px] text-[var(--text-muted)]">Español</span>
              {titleEs.trim() && <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)]" />}
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="hidden lg:flex items-center p-1 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-subtle)] font-mono text-xs">
            <button
              type="button"
              onClick={() => setViewMode("edit")}
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                viewMode === "edit"
                  ? "bg-[var(--bg-card)] text-[var(--accent)] shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
              title="Editor Only"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("split")}
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                viewMode === "split"
                  ? "bg-[var(--bg-card)] text-[var(--accent)] shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
              title="Split View (Editor + Live Preview)"
            >
              <Columns className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("preview")}
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                viewMode === "preview"
                  ? "bg-[var(--bg-card)] text-[var(--accent)] shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
              title="Preview Only"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-1.5 bg-[var(--accent)] text-white text-xs font-mono font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{loading ? "Saving..." : mode === "create" ? "Publish Project" : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 p-3 rounded-xl text-xs font-mono">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 p-3 rounded-xl text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Dual-Pane Editor & Live Preview */}
      <div className={`grid gap-6 ${viewMode === "split" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
        {/* LEFT PANE: Editor & Controls */}
        {(viewMode === "split" || viewMode === "edit") && (
          <div className="space-y-6 bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 rounded-2xl shadow-xs">
            {/* Language active notice */}
            <div className="flex items-center justify-between text-xs font-mono border-b border-[var(--border-subtle)] pb-3 text-[var(--text-muted)]">
              <span className="flex items-center gap-2">
                <Edit3 className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Editing in: <strong className="text-[var(--text-primary)] uppercase">{activeLang === "en" ? "English" : "Español"}</strong></span>
              </span>
              <span>Markdown supported</span>
            </div>

            {/* Core Metadata Fields */}
            <div className="space-y-4">
              {/* Title Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] block">
                  {activeLang === "en" ? "Project Title (EN)" : "Project Title (ES - Español)"}
                </label>
                {activeLang === "en" ? (
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. TypeScript AST Mutation Testing Engine"
                    className="w-full px-3.5 py-2.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-sm font-sans text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                ) : (
                  <input
                    type="text"
                    value={titleEs}
                    onChange={(e) => setTitleEs(e.target.value)}
                    placeholder="ej. Motor de Pruebas de Mutación AST en TypeScript"
                    className="w-full px-3.5 py-2.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-sm font-sans text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                )}
              </div>

              {/* Slug Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] block">
                    URL Slug
                  </label>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    /projects/<strong>{slug || "project-slug"}</strong>
                  </span>
                </div>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setIsSlugManuallyEdited(true);
                  }}
                  placeholder="project-slug-format"
                  className="w-full px-3.5 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-xs font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>

              {/* Short Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] block">
                  {activeLang === "en" ? "Short Description (Card Summary - EN)" : "Short Description (Card Summary - ES)"}
                </label>
                {activeLang === "en" ? (
                  <textarea
                    rows={2}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Concise overview of what this project accomplishes..."
                    className="w-full px-3.5 py-2.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-sm font-sans text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                ) : (
                  <textarea
                    rows={2}
                    value={descriptionEs}
                    onChange={(e) => setDescriptionEs(e.target.value)}
                    placeholder="Resumen conciso del proyecto para tarjetas y encabezados..."
                    className="w-full px-3.5 py-2.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-sm font-sans text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                )}
              </div>

              {/* Interactive Tech Stack Tags */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] block">
                  Technologies / Tech Stack
                </label>
                <div className="flex flex-wrap items-center gap-2 p-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl min-h-[44px]">
                  {techStackArray.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-xs font-mono rounded-md shadow-2xs"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-[var(--text-muted)] hover:text-red-500 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <div className="flex items-center gap-1 flex-1 min-w-[140px]">
                    <input
                      type="text"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                      placeholder="Add tag (e.g. Next.js)..."
                      className="w-full bg-transparent px-2 py-1 text-xs font-mono text-[var(--text-primary)] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="p-1 hover:bg-[var(--bg-secondary)] rounded-md text-[var(--text-secondary)] hover:text-[var(--accent)] cursor-pointer"
                      title="Add Tag"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Links & Status Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] block">
                    GitHub Repo URL
                  </label>
                  <input
                    type="url"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-xs font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] block">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-xs font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] block">
                    Project Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-xs font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors cursor-pointer"
                  >
                    <option value="COMPLETED">COMPLETED (Terminado)</option>
                    <option value="IN_PROGRESS">IN_PROGRESS (En desarrollo)</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer font-mono text-xs text-[var(--text-primary)]">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="w-4 h-4 rounded border-[var(--border-subtle)] text-[var(--accent)] focus:ring-0 cursor-pointer"
                    />
                    <span>Feature on Homepage</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Markdown Documentation Editor with Rich Toolbar */}
            <div className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] block">
                  {activeLang === "en" ? "Detailed Documentation (Markdown - EN)" : "Detailed Documentation (Markdown - ES)"}
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    {(activeLang === "en" ? content : contentEs).length} characters
                  </span>
                </div>
              </div>

              {/* Formatting Toolbar */}
              <div className="flex flex-wrap items-center gap-1 p-1.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl">
                <button
                  type="button"
                  onClick={() => insertMarkdown("# ", "", "Heading 1")}
                  className="p-1.5 hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  title="Heading 1"
                >
                  <Heading1 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("## ", "", "Heading 2")}
                  className="p-1.5 hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  title="Heading 2"
                >
                  <Heading2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("### ", "", "Heading 3")}
                  className="p-1.5 hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  title="Heading 3"
                >
                  <Heading3 className="w-3.5 h-3.5" />
                </button>

                <span className="w-px h-4 bg-[var(--border-subtle)] mx-1" />

                <button
                  type="button"
                  onClick={() => insertMarkdown("**", "**", "bold text")}
                  className="p-1.5 hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  title="Bold"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("*", "*", "italic text")}
                  className="p-1.5 hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  title="Italic"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("~~", "~~", "strikethrough text")}
                  className="p-1.5 hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  title="Strikethrough"
                >
                  <Strikethrough className="w-3.5 h-3.5" />
                </button>

                <span className="w-px h-4 bg-[var(--border-subtle)] mx-1" />

                <button
                  type="button"
                  onClick={() => insertMarkdown("`", "`", "code")}
                  className="p-1.5 hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  title="Inline Code"
                >
                  <Code className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("```typescript\n", "\n```", "// code block here")}
                  className="p-1.5 hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  title="Code Block"
                >
                  <FileCode className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("> ", "", "Quoted text")}
                  className="p-1.5 hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  title="Blockquote"
                >
                  <Quote className="w-3.5 h-3.5" />
                </button>

                <span className="w-px h-4 bg-[var(--border-subtle)] mx-1" />

                <button
                  type="button"
                  onClick={() => insertMarkdown("- ", "", "List item")}
                  className="p-1.5 hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  title="Bullet List"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("1. ", "", "Ordered item")}
                  className="p-1.5 hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  title="Numbered List"
                >
                  <ListOrdered className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("[", "](https://example.com)", "Link title")}
                  className="p-1.5 hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  title="Link"
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("![", "](/image.png)", "Image description")}
                  className="p-1.5 hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  title="Image"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                </button>

                {/* Quick Templates Dropdown / Buttons */}
                <div className="ml-auto flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => insertTemplate("architecture")}
                    className="px-2 py-1 text-[10px] font-mono bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded text-[var(--text-secondary)] hover:text-[var(--accent)] cursor-pointer"
                    title="Insert Architecture Template"
                  >
                    + Architecture
                  </button>
                  <button
                    type="button"
                    onClick={() => insertTemplate("highlights")}
                    className="px-2 py-1 text-[10px] font-mono bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded text-[var(--text-secondary)] hover:text-[var(--accent)] cursor-pointer"
                    title="Insert Highlights Template"
                  >
                    + Highlights
                  </button>
                  <button
                    type="button"
                    onClick={() => insertTemplate("code")}
                    className="px-2 py-1 text-[10px] font-mono bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded text-[var(--text-secondary)] hover:text-[var(--accent)] cursor-pointer"
                    title="Insert Code Template"
                  >
                    + Code
                  </button>
                </div>
              </div>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                rows={16}
                value={activeLang === "en" ? content : contentEs}
                onChange={(e) => {
                  if (activeLang === "en") {
                    setContent(e.target.value);
                  } else {
                    setContentEs(e.target.value);
                  }
                }}
                placeholder={
                  activeLang === "en"
                    ? "# System Architecture\n\nWrite in-depth engineering breakdowns here..."
                    : "# Arquitectura del Sistema\n\nEscribe el desglose de ingeniería en español aquí..."
                }
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-[var(--text-primary)] leading-relaxed focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>
          </div>
        )}

        {/* RIGHT PANE: Live Frontend Preview */}
        {(viewMode === "split" || viewMode === "preview") && (
          <div className="space-y-4">
            {/* Live Preview Controller Header */}
            <div className="flex items-center justify-between bg-[var(--bg-card)] border border-[var(--border-subtle)] px-4 py-2.5 rounded-xl shadow-xs">
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)]">
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span className="font-semibold text-[var(--text-primary)]">Live Frontend Preview</span>
                <span className="text-[var(--border-subtle)]">•</span>
                <span className="text-[10px] text-[var(--text-muted)] uppercase">
                  Rendering: {activeLang === "en" ? "English" : "Español"}
                </span>
              </div>

              {/* Preview Style Switcher */}
              <div className="flex items-center p-0.5 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-subtle)] font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setPreviewStyle("detail")}
                  className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                    previewStyle === "detail"
                      ? "bg-[var(--bg-card)] text-[var(--text-primary)] font-semibold shadow-xs"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                  title="Detail Page Preview"
                >
                  <FileText className="w-3 h-3" />
                  <span className="text-[10px]">Detail Page</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewStyle("card")}
                  className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                    previewStyle === "card"
                      ? "bg-[var(--bg-card)] text-[var(--text-primary)] font-semibold shadow-xs"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                  title="Grid Card Preview"
                >
                  <LayoutGrid className="w-3 h-3" />
                  <span className="text-[10px]">Card View</span>
                </button>
              </div>
            </div>

            {/* LIVE PREVIEW CONTAINER */}
            <div className="p-4 sm:p-6 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-2xl min-h-[500px] overflow-y-auto max-h-[800px]">
              {previewStyle === "detail" ? (
                /* Detail Page Mockup */
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div className="font-mono text-xs text-[var(--accent)]">
                    &larr; {activeLang === "es" ? "Volver a Proyectos" : "Back to Projects"}
                  </div>

                  <Card accent>
                    <div className="space-y-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={status === "COMPLETED" ? "black" : "red"}>
                          {status === "COMPLETED"
                            ? activeLang === "es"
                              ? "COMPLETADO"
                              : "COMPLETED"
                            : activeLang === "es"
                            ? "EN DESARROLLO"
                            : "IN PROGRESS"}
                        </Badge>
                        {featured && (
                          <Badge variant="red">
                            {activeLang === "es" ? "DESTACADO" : "FEATURED"}
                          </Badge>
                        )}
                      </div>

                      <h1 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-[var(--text-primary)]">
                        {previewTitle}
                      </h1>

                      <p className="text-sm font-sans text-[var(--text-secondary)] border-l-2 border-[var(--accent)] pl-4 leading-relaxed">
                        {previewDesc}
                      </p>

                      {techStackArray.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                            {activeLang === "es" ? "Stack Tecnológico" : "Tech Stack"}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {techStackArray.map((tech) => (
                              <Tag key={tech}>{tech}</Tag>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-4 pt-3 font-mono text-xs border-t border-[var(--border-subtle)]">
                        {repoUrl ? (
                          <span className="text-[var(--accent)] font-medium flex items-center gap-1">
                            <GitBranch className="w-3.5 h-3.5" />
                            <span>{activeLang === "es" ? "Código Fuente" : "Source Code"}</span>
                          </span>
                        ) : (
                          <span className="text-[var(--text-muted)] text-[10px]">No repo URL</span>
                        )}
                        {liveUrl ? (
                          <span className="text-[var(--text-secondary)] font-medium flex items-center gap-1">
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>{activeLang === "es" ? "Ver Demo" : "Live Demo"}</span>
                          </span>
                        ) : (
                          <span className="text-[var(--text-muted)] text-[10px]">No live demo</span>
                        )}
                      </div>
                    </div>
                  </Card>

                  {/* Documentation Markdown Card */}
                  <Card>
                    <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider border-b border-[var(--border-subtle)] pb-2 mb-4">
                      {activeLang === "es" ? "Documentación del Proyecto" : "Project Documentation"}
                    </div>
                    {previewContent ? (
                      <Markdown content={previewContent} />
                    ) : (
                      <div className="border border-dashed border-[var(--border-subtle)] p-8 text-center bg-[var(--bg-secondary)] font-mono text-xs text-[var(--text-muted)] rounded-xl">
                        {activeLang === "es"
                          ? "Escribe Markdown en el editor de la izquierda para ver el resultado renderizado en vivo."
                          : "Type Markdown in the editor on the left to see live rendered documentation here."}
                      </div>
                    )}
                  </Card>
                </div>
              ) : (
                /* Card View Mockup */
                <div className="max-w-md mx-auto py-8">
                  <div className="text-xs font-mono text-[var(--text-muted)] mb-3">
                    Preview in Projects Grid (/projects):
                  </div>
                  <Card className="flex flex-col justify-between hover:border-[var(--accent)]">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="font-sans font-bold text-lg text-[var(--text-primary)]">
                          {previewTitle}
                        </h2>
                        {featured && (
                          <Badge variant="red">
                            {activeLang === "es" ? "DESTACADO" : "FEATURED"}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm font-sans leading-relaxed text-[var(--text-secondary)] min-h-[3rem]">
                        {previewDesc}
                      </p>
                      {techStackArray.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                            {activeLang === "es" ? "Stack Tecnológico" : "Tech Stack"}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {techStackArray.map((tech) => (
                              <Tag key={tech}>{tech}</Tag>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-4 pt-4 mt-6 border-t border-[var(--border-subtle)] font-mono text-xs">
                      {repoUrl && (
                        <span className="text-[var(--accent)] font-medium">
                          {activeLang === "es" ? "Código Fuente" : "Source Code"}
                        </span>
                      )}
                      {liveUrl && (
                        <span className="text-[var(--text-secondary)]">
                          {activeLang === "es" ? "Ver Demo →" : "Live Demo →"}
                        </span>
                      )}
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
