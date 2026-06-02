"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createProject,
  updateProject,
  deleteProject,
  createPost,
  updatePost,
  deletePost,
  logoutAdmin,
} from "./actions";

interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
  techStack: string;
  repoUrl: string;
  liveUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface AdminDashboardClientProps {
  initialProjects: Project[];
  initialPosts: Post[];
}

export default function AdminDashboardClient({
  initialProjects,
  initialPosts,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"projects" | "blog">("projects");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // ----------------------------------------------------
  // Projects CMS State
  // ----------------------------------------------------
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectContent, setProjectContent] = useState("");
  const [projectTechStack, setProjectTechStack] = useState("");
  const [projectRepoUrl, setProjectRepoUrl] = useState("");
  const [projectLiveUrl, setProjectLiveUrl] = useState("");
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // ----------------------------------------------------
  // Blog CMS State
  // ----------------------------------------------------
  const [postTitle, setPostTitle] = useState("");
  const [postSlug, setPostSlug] = useState("");
  const [postSummary, setPostSummary] = useState("");
  const [postContent, setPostContent] = useState("");
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // Logout handler
  async function handleLogout() {
    setLoading(true);
    try {
      await logoutAdmin();
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      setMessage({ text: "Failed to logout.", isError: true });
      setLoading(false);
    }
  }

  // ----------------------------------------------------
  // Project Actions Handlers
  // ----------------------------------------------------
  function handleProjectEditInit(project: Project) {
    setEditingProjectId(project.id);
    setProjectTitle(project.title);
    setProjectDescription(project.description);
    setProjectContent(project.content || "");
    setProjectTechStack(project.techStack);
    setProjectRepoUrl(project.repoUrl);
    setProjectLiveUrl(project.liveUrl);
    setMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetProjectForm() {
    setEditingProjectId(null);
    setProjectTitle("");
    setProjectDescription("");
    setProjectContent("");
    setProjectTechStack("");
    setProjectRepoUrl("");
    setProjectLiveUrl("");
  }

  async function handleProjectSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      title: projectTitle,
      description: projectDescription,
      content: projectContent,
      techStack: projectTechStack,
      repoUrl: projectRepoUrl,
      liveUrl: projectLiveUrl,
    };

    try {
      if (editingProjectId) {
        const res = await updateProject(editingProjectId, payload);
        if (res.success) {
          setMessage({ text: "Project updated successfully.", isError: false });
          resetProjectForm();
          router.refresh();
        }
      } else {
        const res = await createProject(payload);
        if (res.success) {
          setMessage({ text: "Project created successfully.", isError: false });
          resetProjectForm();
          router.refresh();
        }
      }
    } catch (err: any) {
      setMessage({ text: err.message || "An error occurred.", isError: true });
    } finally {
      setLoading(false);
    }
  }

  async function handleProjectDelete(id: string, title: string) {
    if (!confirm(`Delete project "${title}"?`)) return;
    setLoading(true);
    setMessage(null);
    try {
      const res = await deleteProject(id);
      if (res.success) {
        setMessage({ text: "Project deleted successfully.", isError: false });
        if (editingProjectId === id) resetProjectForm();
        router.refresh();
      }
    } catch (err: any) {
      setMessage({ text: err.message || "An error occurred.", isError: true });
    } finally {
      setLoading(false);
    }
  }

  // ----------------------------------------------------
  // Blog Actions Handlers
  // ----------------------------------------------------
  function handlePostEditInit(post: Post) {
    setEditingPostId(post.id);
    setPostTitle(post.title);
    setPostSlug(post.slug);
    setPostSummary(post.summary);
    setPostContent(post.content);
    setMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetPostForm() {
    setEditingPostId(null);
    setPostTitle("");
    setPostSlug("");
    setPostSummary("");
    setPostContent("");
  }

  // Auto-fill slug from title
  function handlePostTitleChange(val: string) {
    setPostTitle(val);
    if (!editingPostId) {
      const slg = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-_]/g, "")
        .replace(/\s+/g, "-");
      setPostSlug(slg);
    }
  }

  async function handlePostSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      title: postTitle,
      slug: postSlug,
      summary: postSummary,
      content: postContent,
    };

    try {
      if (editingPostId) {
        const res = await updatePost(editingPostId, payload);
        if (res.success) {
          setMessage({ text: "Blog post updated successfully.", isError: false });
          resetPostForm();
          router.refresh();
        }
      } else {
        const res = await createPost(payload);
        if (res.success) {
          setMessage({ text: "Blog post created successfully.", isError: false });
          resetPostForm();
          router.refresh();
        }
      }
    } catch (err: any) {
      setMessage({ text: err.message || "An error occurred.", isError: true });
    } finally {
      setLoading(false);
    }
  }

  async function handlePostDelete(id: string, title: string) {
    if (!confirm(`Delete blog post "${title}"?`)) return;
    setLoading(true);
    setMessage(null);
    try {
      const res = await deletePost(id);
      if (res.success) {
        setMessage({ text: "Blog post deleted successfully.", isError: false });
        if (editingPostId === id) resetPostForm();
        router.refresh();
      }
    } catch (err: any) {
      setMessage({ text: err.message || "An error occurred.", isError: true });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Navigation tabs */}
      <div className="flex border-b border-[#1a1a1a] font-mono text-sm">
        <button
          onClick={() => {
            setActiveTab("projects");
            setMessage(null);
          }}
          className={`px-4 py-2 border-t border-x border-[#1a1a1a] translate-y-[1px] ${
            activeTab === "projects"
              ? "bg-[#fafafa] font-bold border-b-[#fafafa]"
              : "bg-[#1a1a1a]/5 border-b-[#1a1a1a] text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-all"
          }`}
        >
          [Projects]
        </button>
        <button
          onClick={() => {
            setActiveTab("blog");
            setMessage(null);
          }}
          className={`px-4 py-2 border-t border-x border-[#1a1a1a] translate-y-[1px] ${
            activeTab === "blog"
              ? "bg-[#fafafa] font-bold border-b-[#fafafa]"
              : "bg-[#1a1a1a]/5 border-b-[#1a1a1a] text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-all"
          }`}
        >
          [Blog Posts]
        </button>
      </div>

      {message && (
        <div
          className={`border p-3 text-xs font-mono max-w-5xl mx-auto ${
            message.isError
              ? "border-[#c02b2b]/30 bg-[#c02b2b]/5 text-[#c02b2b]"
              : "border-[#2c5f4b]/30 bg-[#2c5f4b]/5 text-[#2c5f4b]"
          }`}
        >
          Status: {message.text}
        </div>
      )}

      {/* Logout Row */}
      <div className="flex justify-end max-w-5xl mx-auto font-mono text-xs">
        <button
          onClick={handleLogout}
          disabled={loading}
          className="px-3 py-1.5 border border-[#1a1a1a] bg-transparent text-[#c02b2b] hover:bg-[#c02b2b] hover:text-[#fafafa] transition-all cursor-pointer disabled:opacity-50"
        >
          [Log Out]
        </button>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 1. Projects CMS Tab */}
      {/* ---------------------------------------------------- */}
      {activeTab === "projects" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-4">
            <div className="border-brutal bg-[#fafafa] p-6 shadow-brutal space-y-4">
              <div className="border-b border-[#1a1a1a]/10 pb-2 flex justify-between items-center">
                <h2 className="text-lg font-bold font-mono uppercase">
                  {editingProjectId ? "[Edit Project]" : "[Create Project]"}
                </h2>
                {editingProjectId && (
                  <button
                    type="button"
                    onClick={resetProjectForm}
                    className="text-xs font-mono text-[#c02b2b] hover:underline"
                  >
                    [Cancel Edit]
                  </button>
                )}
              </div>

              <form onSubmit={handleProjectSubmit} className="space-y-4 font-mono text-xs">
                <div className="space-y-1">
                  <label htmlFor="p-title" className="font-bold uppercase tracking-wider">
                    Title:
                  </label>
                  <input
                    id="p-title"
                    type="text"
                    required
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-[#1a1a1a] bg-white rounded-none focus:outline-none focus:ring-1 focus:ring-[#c02b2b] text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="p-desc" className="font-bold uppercase tracking-wider">
                    Card Description (Short):
                  </label>
                  <textarea
                    id="p-desc"
                    required
                    rows={2}
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-[#1a1a1a] bg-white rounded-none focus:outline-none focus:ring-1 focus:ring-[#c02b2b] font-sans text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="p-content" className="font-bold uppercase tracking-wider block">
                    Detailed Content (Markdown & images supported):
                  </label>
                  <span className="text-[10px] text-[#1a1a1a]/50 block mb-1">
                    Describe your project, methodology, and embed images using `![alt](/path/to/img)`
                  </span>
                  <textarea
                    id="p-content"
                    rows={10}
                    value={projectContent}
                    onChange={(e) => setProjectContent(e.target.value)}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-[#1a1a1a] bg-white rounded-none focus:outline-none focus:ring-1 focus:ring-[#c02b2b] font-mono text-xs"
                    placeholder="# Project Details...&#10;&#10;## Key Architecture&#10;- Bullet points...&#10;&#10;![Signal Graph](/bci_abstract.png)"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="p-tech" className="font-bold uppercase tracking-wider">
                    Tech Stack (comma separated):
                  </label>
                  <input
                    id="p-tech"
                    type="text"
                    value={projectTechStack}
                    onChange={(e) => setProjectTechStack(e.target.value)}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-[#1a1a1a] bg-white rounded-none focus:outline-none focus:ring-1 focus:ring-[#c02b2b] text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="p-repo" className="font-bold uppercase tracking-wider">
                    GitHub URL:
                  </label>
                  <input
                    id="p-repo"
                    type="url"
                    value={projectRepoUrl}
                    onChange={(e) => setProjectRepoUrl(e.target.value)}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-[#1a1a1a] bg-white rounded-none focus:outline-none focus:ring-1 focus:ring-[#c02b2b] text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="p-live" className="font-bold uppercase tracking-wider">
                    Live URL:
                  </label>
                  <input
                    id="p-live"
                    type="url"
                    value={projectLiveUrl}
                    onChange={(e) => setProjectLiveUrl(e.target.value)}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-[#1a1a1a] bg-white rounded-none focus:outline-none focus:ring-1 focus:ring-[#c02b2b] text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-2 border border-[#1a1a1a] bg-[#c02b2b] text-[#fafafa] font-bold uppercase tracking-wide hover:bg-[#1a1a1a] transition-all cursor-pointer shadow-brutal disabled:opacity-50"
                >
                  {editingProjectId ? "[Update Project]" : "[Save Project]"}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="border-brutal bg-[#fafafa] p-6 shadow-brutal space-y-4">
              <h2 className="text-lg font-bold font-mono uppercase border-b border-[#1a1a1a]/10 pb-2">
                [Projects List]
              </h2>

              {initialProjects.length === 0 ? (
                <div className="border border-dashed border-[#1a1a1a]/20 p-8 text-center bg-[#1a1a1a]/5 font-mono text-sm text-[#1a1a1a]/60">
                  No projects found.
                </div>
              ) : (
                <div className="space-y-4 max-h-[700px] overflow-y-auto pr-1">
                  {initialProjects.map((project) => (
                    <div
                      key={project.id}
                      className="border border-[#1a1a1a]/15 bg-white p-4 space-y-3 relative hover:border-[#1a1a1a] transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-mono font-bold text-sm text-[#1a1a1a]">
                          {project.title}
                        </h3>
                        <div className="flex gap-2 font-mono text-[10px]">
                          <button
                            onClick={() => handleProjectEditInit(project)}
                            disabled={loading}
                            className="px-2 py-0.5 border border-[#1a1a1a]/30 hover:border-[#1a1a1a] text-[#2c5f4b] hover:bg-[#2c5f4b]/5 transition-all cursor-pointer"
                          >
                            [edit]
                          </button>
                          <button
                            onClick={() => handleProjectDelete(project.id, project.title)}
                            disabled={loading}
                            className="px-2 py-0.5 border border-[#1a1a1a]/30 hover:border-[#1a1a1a] text-[#c02b2b] hover:bg-[#c02b2b]/5 transition-all cursor-pointer"
                          >
                            [delete]
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-[#1a1a1a]/80 font-sans line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                      
                      {project.content && (
                        <div className="text-[10px] text-[#2c5f4b] font-mono">
                          ✓ Rich markdown content initialized ({project.content.length} chars)
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 2. Blog CMS Tab */}
      {/* ---------------------------------------------------- */}
      {activeTab === "blog" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-4">
            <div className="border-brutal bg-[#fafafa] p-6 shadow-brutal space-y-4">
              <div className="border-b border-[#1a1a1a]/10 pb-2 flex justify-between items-center">
                <h2 className="text-lg font-bold font-mono uppercase">
                  {editingPostId ? "[Edit Blog Post]" : "[Create Blog Post]"}
                </h2>
                {editingPostId && (
                  <button
                    type="button"
                    onClick={resetPostForm}
                    className="text-xs font-mono text-[#c02b2b] hover:underline"
                  >
                    [Cancel Edit]
                  </button>
                )}
              </div>

              <form onSubmit={handlePostSubmit} className="space-y-4 font-mono text-xs">
                <div className="space-y-1">
                  <label htmlFor="b-title" className="font-bold uppercase tracking-wider">
                    Post Title:
                  </label>
                  <input
                    id="b-title"
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => handlePostTitleChange(e.target.value)}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-[#1a1a1a] bg-white rounded-none focus:outline-none focus:ring-1 focus:ring-[#c02b2b] text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="b-slug" className="font-bold uppercase tracking-wider">
                    Slug (Auto-generated/url path):
                  </label>
                  <input
                    id="b-slug"
                    type="text"
                    required
                    value={postSlug}
                    onChange={(e) => setPostSlug(e.target.value)}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-[#1a1a1a] bg-white rounded-none focus:outline-none focus:ring-1 focus:ring-[#c02b2b] text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="b-summary" className="font-bold uppercase tracking-wider">
                    Summary (Short Intro):
                  </label>
                  <textarea
                    id="b-summary"
                    required
                    rows={2}
                    value={postSummary}
                    onChange={(e) => setPostSummary(e.target.value)}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-[#1a1a1a] bg-white rounded-none focus:outline-none focus:ring-1 focus:ring-[#c02b2b] font-sans text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="b-content" className="font-bold uppercase tracking-wider block">
                    Post Body (Markdown):
                  </label>
                  <textarea
                    id="b-content"
                    required
                    rows={12}
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-[#1a1a1a] bg-white rounded-none focus:outline-none focus:ring-1 focus:ring-[#c02b2b] font-mono text-xs"
                    placeholder="# My Post Title...&#10;&#10;Use markdown syntax for formatting."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-2 border border-[#1a1a1a] bg-[#c02b2b] text-[#fafafa] font-bold uppercase tracking-wide hover:bg-[#1a1a1a] transition-all cursor-pointer shadow-brutal disabled:opacity-50"
                >
                  {editingPostId ? "[Update Blog Post]" : "[Save Blog Post]"}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="border-brutal bg-[#fafafa] p-6 shadow-brutal space-y-4">
              <h2 className="text-lg font-bold font-mono uppercase border-b border-[#1a1a1a]/10 pb-2">
                [Blog Posts List]
              </h2>

              {initialPosts.length === 0 ? (
                <div className="border border-dashed border-[#1a1a1a]/20 p-8 text-center bg-[#1a1a1a]/5 font-mono text-sm text-[#1a1a1a]/60">
                  No blog posts found.
                </div>
              ) : (
                <div className="space-y-4 max-h-[700px] overflow-y-auto pr-1">
                  {initialPosts.map((post) => (
                    <div
                      key={post.id}
                      className="border border-[#1a1a1a]/15 bg-white p-4 space-y-3 relative hover:border-[#1a1a1a] transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-mono font-bold text-sm text-[#1a1a1a]">
                            {post.title}
                          </h3>
                          <span className="text-[10px] font-mono text-[#1a1a1a]/40 block mt-0.5">
                            slug: {post.slug}
                          </span>
                        </div>
                        <div className="flex gap-2 font-mono text-[10px]">
                          <button
                            onClick={() => handlePostEditInit(post)}
                            disabled={loading}
                            className="px-2 py-0.5 border border-[#1a1a1a]/30 hover:border-[#1a1a1a] text-[#2c5f4b] hover:bg-[#2c5f4b]/5 transition-all cursor-pointer"
                          >
                            [edit]
                          </button>
                          <button
                            onClick={() => handlePostDelete(post.id, post.title)}
                            disabled={loading}
                            className="px-2 py-0.5 border border-[#1a1a1a]/30 hover:border-[#1a1a1a] text-[#c02b2b] hover:bg-[#c02b2b]/5 transition-all cursor-pointer"
                          >
                            [delete]
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-[#1a1a1a]/80 font-sans line-clamp-2 leading-relaxed">
                        {post.summary}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
