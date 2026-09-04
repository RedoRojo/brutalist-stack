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
    <div className="space-y-6 max-w-[1700px] w-full mx-auto">
      <EditProjectFormClient project={project} />
    </div>
  );
}
