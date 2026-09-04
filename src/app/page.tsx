import Link from "next/link";
import prisma from "@/lib/db";
import { Project } from "@prisma/client";
import Card from "@/components/Card";
import Tag from "@/components/Tag";
import Button from "@/components/Button";
import AnimatedSection from "@/components/AnimatedSection";

export const revalidate = 0;

async function getFeaturedProjects(): Promise<Project[]> {
  try {
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

  const skillCategories = [
    {
      category: "Frontend & Web",
      skills: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion", "JavaScript"],
    },
    {
      category: "Backend & Databases",
      skills: ["Python", "Java", "Node.js", "PostgreSQL", "Prisma ORM", "Docker"],
    },
    {
      category: "QA & Systems Engineering",
      skills: ["Test Automation", "CI/CD", "Linux", "System Architecture", "Quality Assurance"],
    },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <AnimatedSection delay={0.1} className="space-y-6 pt-10">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent-border)] text-xs font-mono font-medium rounded-full">
            SOFTWARE ENGINEER
          </span>
          <span className="font-mono text-xs text-[var(--text-muted)]">• Cochabamba, Bolivia</span>
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-[var(--text-primary)] leading-tight">
          Cristhian Victor<br />Rojas Marquez
        </h1>

        <p className="text-lg sm:text-xl font-sans text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          Full-stack software engineer specialized in building robust web applications, test automation engines, and scalable system architectures. I love crafting clean code and fluid user experiences.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Button href="/resume" variant="primary">View Resume</Button>
          <Button href="/projects" variant="secondary">
            Explore Projects
          </Button>
        </div>
      </AnimatedSection>

      {/* HR Recruiter Quick Snapshot Card */}
      <AnimatedSection delay={0.2}>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex flex-wrap justify-between items-center gap-3 border-b border-[var(--border-subtle)] pb-4">
            <h2 className="font-sans text-lg font-semibold text-[var(--text-primary)]">
              Recruiter Overview
            </h2>
            <span className="px-3 py-1 bg-[var(--accent-green-bg)] text-[var(--accent-green)] border border-[var(--accent-green-border)] text-xs font-mono font-medium rounded-full">
              Available Immediately
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-mono text-sm">
            <div className="space-y-1.5 border-l-2 border-[var(--accent)] pl-4">
              <span className="text-[var(--text-muted)] font-medium uppercase text-xs tracking-wider block">
                Target Roles
              </span>
              <p className="font-semibold text-[var(--text-primary)]">
                Full-Stack / QA Engineer
              </p>
            </div>

            <div className="space-y-1.5 border-l-2 border-[var(--border-subtle)] pl-4">
              <span className="text-[var(--text-muted)] font-medium uppercase text-xs tracking-wider block">
                Education
              </span>
              <p className="font-semibold text-[var(--text-primary)]">
                B.S. Computer Science
              </p>
              <p className="text-[var(--text-muted)] text-xs">
                UMSS
              </p>
            </div>

            <div className="space-y-1.5 border-l-2 border-[var(--border-subtle)] pl-4">
              <span className="text-[var(--text-muted)] font-medium uppercase text-xs tracking-wider block">
                Location
              </span>
              <p className="font-semibold text-[var(--text-primary)]">
                Cochabamba, BO
              </p>
              <p className="text-[var(--accent-green)] font-medium text-xs">
                Open to Remote
              </p>
            </div>

            <div className="space-y-1.5 border-l-2 border-[var(--border-subtle)] pl-4">
              <span className="text-[var(--text-muted)] font-medium uppercase text-xs tracking-wider block">
                Contact
              </span>
              <p className="font-semibold text-[var(--text-primary)]">
                Spanish / English
              </p>
              <a href="mailto:cristhian.rojas@example.com" className="text-[var(--accent)] hover:underline text-xs">
                Email Me
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Categorized Technical Skills */}
      <AnimatedSection delay={0.3} className="space-y-8">
        <div>
          <h2 className="text-3xl font-sans font-bold text-[var(--text-primary)]">
            Technical Stack
          </h2>
          <p className="text-sm font-sans text-[var(--text-muted)] mt-2">
            Core technologies I work with
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((group, index) => (
            <Card key={group.category} delay={0.1 * index} className="space-y-4">
              <h3 className="font-sans font-semibold text-[var(--text-primary)]">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </AnimatedSection>

      {/* Featured Projects */}
      <AnimatedSection delay={0.4} className="space-y-8">
        <div className="flex justify-between items-end border-b border-[var(--border-subtle)] pb-4">
          <h2 className="text-3xl font-sans font-bold text-[var(--text-primary)]">
            Featured Projects
          </h2>
          <Link
            href="/projects"
            className="font-mono text-sm text-[var(--accent)] font-medium hover:underline"
          >
            View All &rarr;
          </Link>
        </div>

        {featuredProjects.length === 0 ? (
          <Card className="p-12 text-center border border-dashed border-[var(--border-subtle)] shadow-none hover:shadow-none">
            <p className="font-sans text-[var(--text-muted)]">
              No projects published yet.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <Card key={project.id} delay={0.1 * index} className="flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-sans font-bold text-lg text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
                    <Link href={`/projects/${project.id}`}>
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] font-sans line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                  {project.techStack && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.techStack.split(",").map((tech) => (
                        <Tag key={tech.trim()}>{tech.trim()}</Tag>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-4 pt-6 mt-4 font-mono text-xs">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent)] font-medium hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </AnimatedSection>
    </div>
  );
}

