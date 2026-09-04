import { redirect } from "next/navigation";
import { verifySession, getProjects, getPosts } from "./actions";
import AdminDashboardClient from "./AdminDashboardClient";

export const revalidate = 0;

export default async function AdminPage() {
  const isAuthenticated = await verifySession();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  const projects = await getProjects();
  const posts = await getPosts();

  return (
    <div className="space-y-8">
      {/* Admin Header */}
      <section className="accent-bar pl-6 space-y-2">
        <span className="font-mono text-xs font-bold text-rust tracking-wider uppercase">
          Authenticated: Admin Panel
        </span>
        <h1 className="text-3xl font-display font-normal tracking-tight">
          Admin Dashboard
        </h1>
      </section>

      {/* Main Client Dashboard */}
      <AdminDashboardClient initialProjects={projects} initialPosts={posts} />
    </div>
  );
}
