import prisma from "@/lib/db";
import { Project } from "@prisma/client";
import HomeContent from "@/components/HomeContent";

export const revalidate = 0;

async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const featured = await prisma.project.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
    });
    if (featured.length > 0) return featured;

    return await prisma.project.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();

  return <HomeContent featuredProjects={featuredProjects} />;
}
