import prisma from "@/lib/db";
import { Project } from "@prisma/client";
import ProjectsListContent from "@/components/ProjectsListContent";

export const revalidate = 0;

async function getAllProjects(): Promise<Project[]> {
  try {
    return await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return <ProjectsListContent projects={projects} />;
}
