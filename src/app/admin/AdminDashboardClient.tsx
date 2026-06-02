"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deleteProject, deletePost, logoutAdmin } from "./actions";

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

  // Compute Metrics & Stats
  const totalProjects = initialProjects.length;
  const totalPosts = initialPosts.length;

  // Extract unique tech stack tags
  const uniqueTechTags = Array.from(
    new Set(
      initialProjects
        .flatMap((p) => p.techStack ? p.techStack.split(",").map((t) => t.trim()) : [])
        .filter((t) => t.length > 0)
    )
  );

  const lastProjectUpdate = initialProjects.length > 0
    ? new Date(Math.max(...initialProjects.map((p) => new Date(p.updatedAt).getTime())))
    : null;

  const lastBlogUpdate = initialPosts.length > 0
    ? new Date(Math.max(...initialPosts.map((p) => new Date(p.updatedAt).getTime())))
    : null;

  // Handlers
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

  async function handleProjectDelete(id: string, title: string) {
    if (!confirm(`Are you sure you want to delete project "${title}"?`)) return;
    setLoading(true);
    setMessage(null);
    try {
      const res = await deleteProject(id);
      if (res.success) {
        setMessage({ text: "Project deleted successfully.", isError: false });
        router.refresh();
      }
    } catch (err: any) {
      setMessage({ text: err.message || "An error occurred.", isError: true });
    } finally {
      setLoading(false);
    }
  }

  async function handlePostDelete(id: string, title: string) {
    if (!confirm(`Are you sure you want to delete blog post "${title}"?`)) return;
    setLoading(true);
    setMessage(null);
    try {
      const res = await deletePost(id);
      if (res.success) {
        setMessage({ text: "Blog post deleted successfully.", isError: false });
        router.refresh();
      }
    } catch (err: any) {
      setMessage({ text: err.message || "An error occurred.", isError: true });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* 1. Extended Statistics Overview */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
        {/* Metric 1 */}
        <div className="border-brutal bg-white p-5 shadow-brutal flex flex-col justify-between">
          <span className="text-[10px] text-[#1a1a1a]/50 uppercase font-bold tracking-wider">
            Total Projects
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-extrabold">{totalProjects}</span>
            <span className="text-xs text-[#2c5f4b] font-bold">Published</span>
          </div>
          {lastProjectUpdate && (
            <span className="text-[9px] text-[#1a1a1a]/40 mt-3 block">
              Last updated: {lastProjectUpdate.toLocaleDateString()}
            </span>
          )}
        </div>

        {/* Metric 2 */}
        <div className="border-brutal bg-white p-5 shadow-brutal flex flex-col justify-between">
          <span className="text-[10px] text-[#1a1a1a]/50 uppercase font-bold tracking-wider">
            Total Articles
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-extrabold">{totalPosts}</span>
            <span className="text-xs text-[#2c5f4b] font-bold">Published</span>
          </div>
          {lastBlogUpdate && (
            <span className="text-[9px] text-[#1a1a1a]/40 mt-3 block">
              Last updated: {lastBlogUpdate.toLocaleDateString()}
            </span>
          )}
        </div>

        {/* Metric 3 */}
        <div className="border-brutal bg-white p-5 shadow-brutal flex flex-col justify-between">
          <span className="text-[10px] text-[#1a1a1a]/50 uppercase font-bold tracking-wider">
            Unique Technologies
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-extrabold">{uniqueTechTags.length}</span>
            <span className="text-xs text-[#c02b2b] font-bold">Tags Used</span>
          </div>
          <span className="text-[9px] text-[#1a1a1a]/40 mt-3 block truncate">
            {uniqueTechTags.slice(0, 3).join(", ")}{uniqueTechTags.length > 3 ? "..." : ""}
          </span>
        </div>

        {/* Metric 4 */}
        <div className="border-brutal bg-white p-5 shadow-brutal flex flex-col justify-between">
          <span className="text-[10px] text-[#1a1a1a]/50 uppercase font-bold tracking-wider">
            Infrastructure Status
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-sm font-extrabold uppercase tracking-tight text-[#2c5f4b]">
              PostgreSQL
            </span>
            <span className="px-1.5 py-0.5 text-[9px] bg-[#2c5f4b]/10 text-[#2c5f4b] border border-[#2c5f4b]/20 font-bold">
              CONNECTED
            </span>
          </div>
          <span className="text-[9px] text-[#1a1a1a]/40 mt-3 block">
            Database: Neon Cloud Host
          </span>
        </div>
      </section>

      {/* Action Row & Status Banners */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 max-w-5xl mx-auto">
        <div className="w-full md:w-auto">
          {message && (
            <div
              className={`border p-3 text-xs font-mono max-w-xl ${
                message.isError
                  ? "border-[#c02b2b]/30 bg-[#c02b2b]/5 text-[#c02b2b]"
                  : "border-[#2c5f4b]/30 bg-[#2c5f4b]/5 text-[#2c5f4b]"
              }`}
            >
              Status: {message.text}
            </div>
          )}
        </div>
        <div className="flex gap-3 font-mono text-xs self-end md:self-auto">
          <button
            onClick={handleLogout}
            disabled={loading}
            className="px-4 py-2 border border-[#1a1a1a] bg-transparent text-[#c02b2b] hover:bg-[#c02b2b] hover:text-[#fafafa] transition-all cursor-pointer disabled:opacity-50 shadow-brutal"
          >
            [Log Out]
          </button>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="space-y-6">
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

        {/* PROJECTS TAB CONTENTS */}
        {activeTab === "projects" && (
          <div className="border-brutal bg-[#fafafa] p-6 shadow-brutal space-y-6">
            <div className="flex justify-between items-center border-b border-[#1a1a1a]/10 pb-3">
              <h2 className="text-lg font-bold font-mono uppercase text-[#1a1a1a]">
                [Projects List]
              </h2>
              <Link
                href="/admin/projects/new"
                className="px-3 py-1.5 border border-[#1a1a1a] bg-[#2c5f4b] text-[#fafafa] font-mono text-xs font-bold hover:bg-[#1a1a1a] transition-all shadow-brutal"
              >
                + Add Project
              </Link>
            </div>

            {initialProjects.length === 0 ? (
              <div className="border border-dashed border-[#1a1a1a]/20 p-8 text-center bg-[#1a1a1a]/5 font-mono text-sm text-[#1a1a1a]/60">
                No projects found. Use the button above to publish your first project.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#1a1a1a]">
                      <th className="pb-2 font-bold uppercase tracking-wider">Title</th>
                      <th className="pb-2 font-bold uppercase tracking-wider hidden md:table-cell">Tech Stack</th>
                      <th className="pb-2 font-bold uppercase tracking-wider hidden sm:table-cell">Last Updated</th>
                      <th className="pb-2 font-bold uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1a1a1a]/10">
                    {initialProjects.map((project) => (
                      <tr key={project.id} className="hover:bg-[#1a1a1a]/5 transition-colors">
                        <td className="py-3 pr-2 font-bold font-sans text-sm text-[#1a1a1a]">
                          {project.title}
                        </td>
                        <td className="py-3 pr-2 hidden md:table-cell max-w-xs truncate">
                          {project.techStack || "-"}
                        </td>
                        <td className="py-3 pr-2 hidden sm:table-cell text-[#1a1a1a]/60">
                          {new Date(project.updatedAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 text-right space-x-2">
                          <Link
                            href={`/admin/projects/${project.id}`}
                            className="px-2.5 py-1 border border-[#1a1a1a]/30 hover:border-[#1a1a1a] text-[#2c5f4b] hover:bg-[#2c5f4b]/5 transition-all inline-block"
                          >
                            [Edit]
                          </Link>
                          <button
                            onClick={() => handleProjectDelete(project.id, project.title)}
                            disabled={loading}
                            className="px-2.5 py-1 border border-[#1a1a1a]/30 hover:border-[#1a1a1a] text-[#c02b2b] hover:bg-[#c02b2b]/5 transition-all cursor-pointer disabled:opacity-50"
                          >
                            [Delete]
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* BLOG POSTS TAB CONTENTS */}
        {activeTab === "blog" && (
          <div className="border-brutal bg-[#fafafa] p-6 shadow-brutal space-y-6">
            <div className="flex justify-between items-center border-b border-[#1a1a1a]/10 pb-3">
              <h2 className="text-lg font-bold font-mono uppercase text-[#1a1a1a]">
                [Blog Posts List]
              </h2>
              <Link
                href="/admin/blog/new"
                className="px-3 py-1.5 border border-[#1a1a1a] bg-[#2c5f4b] text-[#fafafa] font-mono text-xs font-bold hover:bg-[#1a1a1a] transition-all shadow-brutal"
              >
                + Add Blog Post
              </Link>
            </div>

            {initialPosts.length === 0 ? (
              <div className="border border-dashed border-[#1a1a1a]/20 p-8 text-center bg-[#1a1a1a]/5 font-mono text-sm text-[#1a1a1a]/60">
                No blog posts found. Use the button above to write your first post.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#1a1a1a]">
                      <th className="pb-2 font-bold uppercase tracking-wider">Title</th>
                      <th className="pb-2 font-bold uppercase tracking-wider hidden md:table-cell">Slug</th>
                      <th className="pb-2 font-bold uppercase tracking-wider hidden sm:table-cell">Published Date</th>
                      <th className="pb-2 font-bold uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1a1a1a]/10">
                    {initialPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-[#1a1a1a]/5 transition-colors">
                        <td className="py-3 pr-2 font-bold font-sans text-sm text-[#1a1a1a]">
                          {post.title}
                        </td>
                        <td className="py-3 pr-2 hidden md:table-cell text-[#1a1a1a]/60">
                          {post.slug}
                        </td>
                        <td className="py-3 pr-2 hidden sm:table-cell text-[#1a1a1a]/60">
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 text-right space-x-2">
                          <Link
                            href={`/admin/blog/${post.id}`}
                            className="px-2.5 py-1 border border-[#1a1a1a]/30 hover:border-[#1a1a1a] text-[#2c5f4b] hover:bg-[#2c5f4b]/5 transition-all inline-block"
                          >
                            [Edit]
                          </Link>
                          <button
                            onClick={() => handlePostDelete(post.id, post.title)}
                            disabled={loading}
                            className="px-2.5 py-1 border border-[#1a1a1a]/30 hover:border-[#1a1a1a] text-[#c02b2b] hover:bg-[#c02b2b]/5 transition-all cursor-pointer disabled:opacity-50"
                          >
                            [Delete]
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
