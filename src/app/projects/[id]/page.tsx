import { notFound } from "next/navigation";
import { getProjectByIdOrSlug } from "../../admin/actions";
import ProjectDetailContent from "@/components/ProjectDetailContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 0;

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = await getProjectByIdOrSlug(id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailContent project={project} />;
}
