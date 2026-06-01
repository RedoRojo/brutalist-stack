import prisma from "@/lib/db";
import { Project } from "@prisma/client";
import Link from "next/link";

export const revalidate = 0; // Dynamic server component

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
    <div className="space-y-8">
      {/* Page Header */}
      <section className="border-brutal bg-[#fafafa] p-6 shadow-brutal relative">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#c02b2b]" />
        <div className="space-y-2 pl-2">
          <span className="font-mono text-xs font-bold text-[#c02b2b] tracking-wider uppercase">
            [ ARCHIVE: PROJECTS_PORTFOLIO.db ]
          </span>
          <h1 className="text-3xl font-bold font-mono tracking-tight">
            PROJECTS & CONTRIBUTIONS
          </h1>
          <p className="text-sm font-mono text-[#1a1a1a]/60">
            A comprehensive list of engineering projects, open-source repositories, and research implementations.
          </p>
        </div>
      </section>

      {/* Projects List/Grid */}
      {projects.length === 0 ? (
        <div className="border-brutal bg-[#fafafa] p-12 text-center shadow-brutal space-y-4">
          <p className="font-mono text-sm text-[#1a1a1a]/60">
            No projects registered in the database directory yet.
          </p>
          <div className="flex justify-center">
            <Link
              href="/admin"
              className="px-4 py-2 border border-[#1a1a1a] bg-[#c02b2b] text-[#fafafa] font-mono text-xs hover:bg-[#1a1a1a] transition-all shadow-brutal"
            >
              [Access Admin CMS &rarr;]
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="border-brutal bg-white p-6 shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-red transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-[#1a1a1a]/10 pb-2">
                  <h2 className="font-mono font-bold text-lg hover:text-[#c02b2b] transition-colors">
                    <Link href={`/projects/${project.id}`}>
                      {project.title}
                    </Link>
                  </h2>
                  <span className="font-mono text-[10px] text-[#1a1a1a]/40 bg-[#1a1a1a]/5 px-2 py-0.5 border border-[#1a1a1a]/10">
                    ID: {project.id.slice(0, 8)}
                  </span>
                </div>
                
                <p className="text-sm font-sans leading-relaxed text-[#1a1a1a]/85 min-h-[4rem]">
                  {project.description}
                </p>

                {project.techStack && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-[#1a1a1a]/50 uppercase tracking-wider block">
                      TECH_STACK:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.split(",").map((tech) => (
                        <span
                          key={tech.trim()}
                          className="px-2 py-0.5 text-xs font-mono bg-[#2c5f4b]/10 text-[#2c5f4b] border border-[#2c5f4b]/20"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4 mt-6 border-t border-[#1a1a1a]/10 font-mono text-xs">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#c02b2b] font-bold hover:underline flex items-center gap-1"
                  >
                    [Source Repository]
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2c5f4b] font-bold hover:underline flex items-center gap-1"
                  >
                    [Live Deployment]
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
