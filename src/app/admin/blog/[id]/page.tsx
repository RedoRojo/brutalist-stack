import { redirect, notFound } from "next/navigation";
import { verifySession, getPostById, getProjects } from "../../actions";
import EditBlogFormClient from "./EditBlogFormClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 0;

export default async function EditBlogPage({ params }: PageProps) {
  const isAuthenticated = await verifySession();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  const projects = await getProjects();

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <section className="accent-bar pl-6 space-y-2">
        <span className="font-mono text-xs font-bold text-rust tracking-wider uppercase">
          Edit Mode
        </span>
        <h1 className="text-3xl font-sans font-bold tracking-tight text-[var(--text-primary)]">
          {post.title}
        </h1>
      </section>
      <EditBlogFormClient post={post} projects={projects} />
    </div>
  );
}
