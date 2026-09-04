import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectById } from "../../admin/actions";
import Markdown from "@/components/Markdown";
import Card from "@/components/Card";
import Tag from "@/components/Tag";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 0;

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
        <Link href="/projects" className="text-rust link-underline">
          &larr; Back to Projects
        </Link>
      </div>

      {/* Project Header */}
      <Card accent>
        <div className="space-y-5">
          <h1 className="text-2xl sm:text-3xl font-display font-normal tracking-tight text-bone">
            {project.title}
          </h1>
          <p className="text-sm font-sans text-bone/60 border-l-2 border-rust/40 pl-4 leading-relaxed">
            {project.description}
          </p>
          {project.techStack && (
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-ash uppercase tracking-wider block">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.split(",").map((tech) => (
                  <Tag key={tech.trim()}>{tech.trim()}</Tag>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-4 pt-3 font-mono text-xs border-t border-ash/15">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-rust hover:underline"
              >
                View Source Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-bone/50 hover:text-bone hover:underline"
              >
                View Live Site
              </a>
            )}
          </div>
        </div>
      </Card>

      {/* Project Documentation */}
      <Card>
        <div className="font-mono text-[10px] text-ash uppercase tracking-wider border-b border-ash/15 pb-2 mb-4">
          Project Documentation
        </div>
        {project.content ? (
          <Markdown content={project.content} />
        ) : (
          <div className="border border-dashed border-ash/20 p-6 text-center bg-void font-mono text-xs text-ash">
            No further details available for this project.
          </div>
        )}
      </Card>
    </div>
  );
}
