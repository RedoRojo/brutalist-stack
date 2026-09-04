import prisma from "@/lib/db";
import { Project } from "@prisma/client";
import Link from "next/link";
import Card from "@/components/Card";
import Tag from "@/components/Tag";
import Button from "@/components/Button";
import Badge from "@/components/Badge";

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

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <section className="accent-bar pl-6 space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="red">ENGINEERING PORTFOLIO</Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-normal tracking-tight text-neutral-900">
          Projects &amp; Open Source Contributions
        </h1>
        <p className="text-sm font-sans text-neutral-600 max-w-2xl leading-relaxed">
          A comprehensive showcase of full-stack web applications, automated testing tools, and real-time signal classification repositories.
        </p>
      </section>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="font-mono text-sm text-neutral-500">
            No projects published yet in database.
          </p>
          <div className="mt-4">
            <Button href="/admin">Admin Dashboard</Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col justify-between hover:border-crimson transition-all">
              <div className="space-y-4">
                <h2 className="font-mono font-bold text-base text-neutral-900 hover:text-crimson transition-colors">
                  <Link href={`/projects/${project.id}`}>
                    {project.title}
                  </Link>
                </h2>
                <p className="text-sm font-sans leading-relaxed text-neutral-600 min-h-[4rem]">
                  {project.description}
                </p>
                {project.techStack && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                      Tech Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.split(",").map((tech) => (
                        <Tag key={tech.trim()}>{tech.trim()}</Tag>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-4 pt-4 mt-6 border-t border-dotted border-neutral-200 font-mono text-xs">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-crimson font-medium hover:underline"
                  >
                    Source Code (GitHub)
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-600 hover:text-neutral-900 hover:underline"
                  >
                    Live Demo &rarr;
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

