"use client";

import { updateProject } from "../../actions";
import ProjectEditor, { ProjectFormData } from "@/components/admin/ProjectEditor";

interface EditProjectFormClientProps {
  project: {
    id: string;
    title: string;
    titleEs?: string | null;
    slug?: string;
    description: string;
    descriptionEs?: string | null;
    content: string;
    contentEs?: string | null;
    techStack: string;
    repoUrl?: string | null;
    liveUrl?: string | null;
    status?: string;
    featured?: boolean;
    [key: string]: unknown;
  };
}

export default function EditProjectFormClient({ project }: EditProjectFormClientProps) {
  async function handleSubmit(data: ProjectFormData) {
    return await updateProject(project.id, data);
  }

  return (
    <ProjectEditor
      mode="edit"
      initialData={{
        id: project.id,
        title: project.title,
        titleEs: project.titleEs || undefined,
        slug: project.slug || undefined,
        description: project.description,
        descriptionEs: project.descriptionEs || undefined,
        content: project.content,
        contentEs: project.contentEs || undefined,
        techStack: project.techStack,
        repoUrl: project.repoUrl || undefined,
        liveUrl: project.liveUrl || undefined,
        status: project.status,
        featured: project.featured,
      }}
      onSubmit={handleSubmit}
    />
  );
}
