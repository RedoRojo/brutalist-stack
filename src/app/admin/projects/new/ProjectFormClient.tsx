"use client";

import { createProject } from "../../actions";
import ProjectEditor, { ProjectFormData } from "@/components/admin/ProjectEditor";

export default function ProjectFormClient() {
  async function handleSubmit(data: ProjectFormData) {
    return await createProject(data);
  }

  return <ProjectEditor mode="create" onSubmit={handleSubmit} />;
}
