import { redirect } from "next/navigation";
import { verifySession, getProjects, getPosts } from "./actions";
import AdminDashboardClient from "./AdminDashboardClient";

export const revalidate = 0; // Dynamic server component

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
      <section className="border-brutal bg-[#fafafa] p-6 shadow-brutal relative">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#c02b2b]" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pl-2">
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-[#c02b2b] tracking-wider uppercase">
              [ ACCESS GRANTED: ADMIN CMS ]
            </span>
            <h1 className="text-3xl font-bold font-mono tracking-tight">
              ADMIN CONTROL PANEL
            </h1>
          </div>
        </div>
      </section>

      {/* Main Client Dashboard */}
      <AdminDashboardClient initialProjects={projects} initialPosts={posts} />
    </div>
  );
}
