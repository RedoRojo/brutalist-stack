import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectById } from "../../admin/actions";
import Markdown from "@/components/Markdown";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 0; // Dynamic server component

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Back link */}
      <div className="font-mono text-xs">
        <Link href="/projects" className="text-[#c02b2b] hover:underline">
          [&larr; Back to Projects Archive]
        </Link>
      </div>

      {/* Main Card Header */}
      <article className="border-brutal bg-[#fafafa] p-6 sm:p-8 shadow-brutal space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#c02b2b]" />

        <div className="pl-3 space-y-4">
          <div className="border-b border-[#1a1a1a]/10 pb-3 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight uppercase">
              {project.title}
            </h1>
            <span className="font-mono text-[10px] text-[#1a1a1a]/40 bg-[#1a1a1a]/5 px-2 py-0.5 border border-[#1a1a1a]/10 self-start sm:self-center">
              ID: {project.id.slice(0, 8)}
            </span>
          </div>

          {/* Core Info */}
          <p className="text-sm font-sans italic text-[#1a1a1a]/70 border-l-2 border-[#2c5f4b] pl-4">
            {project.description}
          </p>

          {/* Tech Stack */}
          {project.techStack && (
            <div className="space-y-1.5 font-mono">
              <span className="text-[10px] text-[#1a1a1a]/50 uppercase tracking-wider block">
                Tags & Tools:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.split(",").map((tech) => (
                  <span
                    key={tech.trim()}
                    className="px-2 py-0.5 text-xs bg-[#2c5f4b]/10 text-[#2c5f4b] border border-[#2c5f4b]/20"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Links */}
          <div className="flex flex-wrap gap-4 pt-3 font-mono text-xs border-t border-[#1a1a1a]/5 mt-4">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c02b2b] font-bold hover:underline"
              >
                [Access Repository]
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2c5f4b] font-bold hover:underline"
              >
                [Launch Live Demo]
              </a>
            )}
          </div>
        </div>
      </article>

      {/* Main Markdown Body Content */}
      <section className="border-brutal bg-white p-6 sm:p-8 shadow-brutal space-y-4">
        <div className="font-mono text-xs text-[#1a1a1a]/50 border-b border-[#1a1a1a]/10 pb-2 mb-4 uppercase">
          // Project Documentation
        </div>
        
        {project.content ? (
          <div className="prose prose-zinc max-w-none">
            <Markdown content={project.content} />
          </div>
        ) : (
          <div className="border border-dashed border-[#1a1a1a]/20 p-6 text-center bg-[#1a1a1a]/5 font-mono text-xs text-[#1a1a1a]/50">
            No further documentation has been compiled for this project record.
          </div>
        )}
      </section>
    </div>
  );
}
