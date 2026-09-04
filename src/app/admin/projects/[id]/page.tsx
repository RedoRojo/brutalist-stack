import { redirect, notFound } from "next/navigation";
import { verifySession, getProjectById } from "../../actions";
import EditProjectFormClient from "./EditProjectFormClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 0;

export default async function EditProjectPage({ params }: PageProps) {
  const isAuthenticated = await verifySession();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <section className="accent-bar pl-6 space-y-2">
        <span className="font-mono text-xs font-bold text-rust tracking-wider uppercase">
          Edit Mode
        </span>
        <h1 className="text-3xl font-display font-normal tracking-tight">
          {project.title}
        </h1>
      </section>
      <EditProjectFormClient project={project} />
    </div>
  );
}
