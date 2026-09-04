"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deleteProject, deletePost, logoutAdmin } from "./actions";
import Card from "@/components/Card";
import { useLanguage } from "@/context/LanguageContext";

interface Project {
  id: string;
  title: string;
  titleEs?: string | null;
  slug?: string;
  description: string;
  descriptionEs?: string | null;
  content?: string;
  contentEs?: string | null;
  techStack?: string | null;
  repoUrl?: string | null;
  liveUrl?: string | null;
  featured?: boolean;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
  _count?: { posts: number };
}

interface Post {
  id: string;
  title: string;
  titleEs?: string | null;
  slug: string;
  summary: string;
  summaryEs?: string | null;
  content?: string;
  contentEs?: string | null;
  tags?: string | null;
  published?: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  projectId?: string | null;
  project?: {
    id: string;
    title: string;
    titleEs?: string | null;
    slug: string;
  } | null;
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
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"projects" | "blog">("projects");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  const totalProjects = initialProjects.length;
  const totalPosts = initialPosts.length;

  const uniqueTechTags = Array.from(
    new Set(
      initialProjects
        .flatMap((p) =>
          p.techStack ? p.techStack.split(",").map((t: string) => t.trim()) : []
        )
        .filter((t: string) => t.length > 0)
    )
  );

  const lastProjectUpdate =
    initialProjects.length > 0
      ? new Date(
          Math.max(...initialProjects.map((p) => new Date(p.updatedAt).getTime()))
        )
      : null;

  const lastBlogUpdate =
    initialPosts.length > 0
      ? new Date(
          Math.max(...initialPosts.map((p) => new Date(p.updatedAt).getTime()))
        )
      : null;

  async function handleLogout() {
    setLoading(true);
    try {
      await logoutAdmin();
      router.push("/admin/login");
      router.refresh();
    } catch {
      setMessage({ text: "Failed to logout.", isError: true });
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
        setMessage({ text: "Project deleted.", isError: false });
        router.refresh();
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "An error occurred.";
      setMessage({ text: errMsg, isError: true });
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
        setMessage({ text: "Blog post deleted.", isError: false });
        router.refresh();
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "An error occurred.";
      setMessage({ text: errMsg, isError: true });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex flex-col justify-between">
          <span className="text-[10px] font-mono text-ash uppercase tracking-wider">
            Total Projects
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-mono font-bold text-bone">{totalProjects}</span>
            <span className="text-xs font-mono text-rust">Published</span>
          </div>
          {lastProjectUpdate && (
            <span className="text-[9px] text-ash mt-3 block">
              Last updated: {lastProjectUpdate.toLocaleDateString()}
            </span>
          )}
        </Card>

        <Card className="flex flex-col justify-between">
          <span className="text-[10px] font-mono text-ash uppercase tracking-wider">
            Total Articles
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-mono font-bold text-bone">{totalPosts}</span>
            <span className="text-xs font-mono text-rust">Published</span>
          </div>
          {lastBlogUpdate && (
            <span className="text-[9px] text-ash mt-3 block">
              Last updated: {lastBlogUpdate.toLocaleDateString()}
            </span>
          )}
        </Card>

        <Card className="flex flex-col justify-between">
          <span className="text-[10px] font-mono text-ash uppercase tracking-wider">
            Unique Technologies
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-mono font-bold text-bone">{uniqueTechTags.length}</span>
            <span className="text-xs font-mono text-rust">Tags Used</span>
          </div>
          <span className="text-[9px] text-ash mt-3 block truncate">
            {uniqueTechTags.slice(0, 3).join(", ")}
            {uniqueTechTags.length > 3 ? "..." : ""}
          </span>
        </Card>

        <Card className="flex flex-col justify-between">
          <span className="text-[10px] font-mono text-ash uppercase tracking-wider">
            Infrastructure Status
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-sm font-mono font-bold uppercase tracking-tight text-bone">
              PostgreSQL
            </span>
            <span className="px-1.5 py-0.5 text-[9px] bg-rust/10 text-rust border border-rust/20 font-mono font-bold">
              CONNECTED
            </span>
          </div>
          <span className="text-[9px] text-ash mt-3 block">
            Database: Neon Cloud Host
          </span>
        </Card>
      </section>

      {/* Status + Logout */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="w-full md:w-auto">
          {message && (
            <div
              className={`border p-3 text-xs font-mono ${
                message.isError
                  ? "border-rust/30 bg-rust/5 text-rust"
                  : "border-ash/30 bg-ash/5 text-bone/70"
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          disabled={loading}
          className="btn-secondary px-4 py-2 font-mono text-xs disabled:opacity-50"
        >
          Log Out
        </button>
      </div>

      {/* Tabs */}
      <div className="space-y-6">
        <div className="flex border-b border-ash/30 font-mono text-sm">
          <button
            onClick={() => {
              setActiveTab("projects");
              setMessage(null);
            }}
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === "projects"
                ? "border-rust text-bone font-bold"
                : "border-transparent text-ash hover:text-bone"
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => {
              setActiveTab("blog");
              setMessage(null);
            }}
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === "blog"
                ? "border-rust text-bone font-bold"
                : "border-transparent text-ash hover:text-bone"
            }`}
          >
            Blog Posts
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <Card>
            <div className="flex justify-between items-center border-b border-ash/15 pb-3 mb-4">
              <h2 className="text-lg font-mono font-bold text-bone">
                Projects
              </h2>
              <Link
                href="/admin/projects/new"
                className="btn-primary px-3 py-1.5 font-mono text-xs"
              >
                + Add Project
              </Link>
            </div>
            {initialProjects.length === 0 ? (
              <div className="border border-dashed border-ash/20 p-8 text-center bg-void font-mono text-sm text-ash">
                No projects found. Use the button above to publish your first
                project.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-ash/30">
                      <th className="pb-2 font-bold uppercase tracking-wider text-bone/60">
                        Title
                      </th>
                      <th className="pb-2 font-bold uppercase tracking-wider hidden lg:table-cell text-bone/60">
                        Devlogs / Posts
                      </th>
                      <th className="pb-2 font-bold uppercase tracking-wider hidden md:table-cell text-bone/60">
                        Status
                      </th>
                      <th className="pb-2 font-bold uppercase tracking-wider hidden sm:table-cell text-bone/60">
                        Last Updated
                      </th>
                      <th className="pb-2 font-bold uppercase tracking-wider text-right text-bone/60">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ash/10">
                    {initialProjects.map((project) => (
                      <tr
                        key={project.id}
                        className="hover:bg-bone/5 transition-colors"
                      >
                        <td className="py-3 pr-2 font-sans text-sm text-bone">
                          <div className="flex items-center gap-2">
                            <span>{language === "es" && project.titleEs ? project.titleEs : project.title}</span>
                            {project.featured && (
                              <span className="text-[10px] text-rust font-mono border border-rust/40 px-1 py-0.2 rounded">
                                ★ {language === "es" ? "Destacado" : "Featured"}
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-[11px] text-ash block">
                            /{project.slug || project.id}
                          </span>
                        </td>
                        <td className="py-3 pr-2 hidden lg:table-cell text-bone/70">
                          <span className="px-2 py-0.5 bg-void border border-ash/20 rounded text-[11px]">
                            {project._count?.posts ?? 0} {language === "es" ? (project._count?.posts === 1 ? "publicación" : "publicaciones") : (project._count?.posts === 1 ? "post" : "posts")}
                          </span>
                        </td>
                        <td className="py-3 pr-2 hidden md:table-cell text-bone/60">
                          <span className="text-[11px] uppercase">
                            {project.status === "COMPLETED"
                              ? language === "es"
                                ? "COMPLETADO"
                                : "COMPLETED"
                              : language === "es"
                              ? "EN DESARROLLO"
                              : "IN PROGRESS"}
                          </span>
                        </td>
                        <td className="py-3 pr-2 hidden sm:table-cell text-bone/50">
                          {new Date(project.updatedAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 text-right space-x-2">
                          <Link
                            href={`/admin/projects/${project.id}`}
                            className="text-rust hover:underline"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() =>
                              handleProjectDelete(project.id, project.title)
                            }
                            disabled={loading}
                            className="text-bone/40 hover:text-rust transition-colors cursor-pointer disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        )}

        {/* Blog Tab */}
        {activeTab === "blog" && (
          <Card>
            <div className="flex justify-between items-center border-b border-ash/15 pb-3 mb-4">
              <h2 className="text-lg font-mono font-bold text-bone">
                Blog Posts
              </h2>
              <Link
                href="/admin/blog/new"
                className="btn-primary px-3 py-1.5 font-mono text-xs"
              >
                + Add Blog Post
              </Link>
            </div>
            {initialPosts.length === 0 ? (
              <div className="border border-dashed border-ash/20 p-8 text-center bg-void font-mono text-sm text-ash">
                No blog posts found. Use the button above to write your first
                post.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-ash/30">
                      <th className="pb-2 font-bold uppercase tracking-wider text-bone/60">
                        Title
                      </th>
                      <th className="pb-2 font-bold uppercase tracking-wider hidden lg:table-cell text-bone/60">
                        Associated Project
                      </th>
                      <th className="pb-2 font-bold uppercase tracking-wider hidden md:table-cell text-bone/60">
                        Status
                      </th>
                      <th className="pb-2 font-bold uppercase tracking-wider hidden sm:table-cell text-bone/60">
                        Published Date
                      </th>
                      <th className="pb-2 font-bold uppercase tracking-wider text-right text-bone/60">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ash/10">
                    {initialPosts.map((post) => (
                      <tr
                        key={post.id}
                        className="hover:bg-bone/5 transition-colors"
                      >
                        <td className="py-3 pr-2 font-sans text-sm text-bone">
                          <div>{language === "es" && post.titleEs ? post.titleEs : post.title}</div>
                          <span className="font-mono text-[11px] text-ash block">
                            /{post.slug}
                          </span>
                        </td>
                        <td className="py-3 pr-2 hidden lg:table-cell text-bone/70">
                          {post.project ? (
                            <span className="px-2 py-0.5 bg-rust/10 text-rust border border-rust/30 rounded text-[11px]">
                              📌 {language === "es" && post.project.titleEs ? post.project.titleEs : post.project.title}
                            </span>
                          ) : (
                            <span className="text-ash text-[11px]">{language === "es" ? "Independiente" : "Standalone"}</span>
                          )}
                        </td>
                        <td className="py-3 pr-2 hidden md:table-cell text-bone/60">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${post.published ? "bg-bone/10 text-bone" : "bg-ash/20 text-ash"}`}>
                            {post.published
                              ? language === "es" ? "Publicado" : "Published"
                              : language === "es" ? "Borrador" : "Draft"}
                          </span>
                        </td>
                        <td className="py-3 pr-2 hidden sm:table-cell text-bone/50">
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 text-right space-x-2">
                          <Link
                            href={`/admin/blog/${post.id}`}
                            className="text-rust hover:underline"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() =>
                              handlePostDelete(post.id, post.title)
                            }
                            disabled={loading}
                            className="text-bone/40 hover:text-rust transition-colors cursor-pointer disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
