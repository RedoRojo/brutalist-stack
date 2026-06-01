import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/db";
import { Project } from "@prisma/client";

export const revalidate = 0; // Dynamic server component

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

  const skills = [
    "Python",
    "React",
    "TypeScript",
    "Arch Linux",
    "Java",
    "Machine Learning",
    "MNE-Python",
    "Next.js",
    "Prisma ORM",
    "SQLite",
    "Tailwind CSS",
    "Git",
    "BCI (Brain-Computer Interfaces)",
    "Software Analysis & Testing",
  ];

  return (
    <div className="space-y-12">
      {/* 1. Hero & Academic Identity */}
      <section className="border-brutal bg-[#fafafa] p-6 sm:p-8 shadow-brutal flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
        {/* Academic Accent Ribbon */}
        <div className="absolute top-0 left-0 w-2 h-full bg-[#c02b2b]" />
        
        <div className="flex-1 space-y-4 pl-2">
          <span className="font-mono text-xs font-bold text-[#c02b2b] tracking-wider uppercase">
            [ SOFTWARE ENGINEERING PORTFOLIO ]
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight leading-tight">
            Cristhian Victor Rojas Marquez
          </h1>
          <p className="font-mono text-sm text-[#1a1a1a]/60">
            Software Engineering & Web Development
          </p>
          
          <div className="prose prose-zinc max-w-none text-[#1a1a1a] font-sans leading-relaxed text-sm sm:text-base space-y-4">
            <p>
              Welcome to my professional development space. I am a software engineer focused on building robust web systems, test automation engines, and reliable real-time signal classification applications.
            </p>
            <p>
              My primary expertise and development areas include <strong>Software Analysis & Testing</strong>, <strong>Neurotechnology Applications (BCI Pipelines)</strong>, and <strong>Modern Web Development</strong>.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-3 font-mono text-sm">
            <a
              href="/projects"
              className="px-4 py-2 border border-[#1a1a1a] bg-[#c02b2b] text-[#fafafa] hover:bg-[#1a1a1a] hover:text-[#fafafa] transition-all"
            >
              [View Projects]
            </a>
            <a
              href="mailto:cristhian.rojas@example.com"
              className="px-4 py-2 border border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#fafafa] transition-all"
            >
              [Contact Me]
            </a>
          </div>
        </div>
      </section>

      {/* 2. Skills and Neurotech Illustration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Skills List Section */}
        <section className="md:col-span-7 border-brutal bg-[#fafafa] p-6 shadow-brutal relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#2c5f4b]" />
          <h2 className="text-xl font-bold font-mono border-b border-[#1a1a1a]/10 pb-2 mb-4 flex items-center gap-2">
            <span className="text-[#2c5f4b]">■</span> SKILLS_INVENTORY.log
          </h2>
          <p className="text-xs font-mono text-[#1a1a1a]/60 mb-4">
            Core technologies, programming languages, and software frameworks:
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 text-xs font-mono border border-[#1a1a1a]/10 hover:border-[#1a1a1a] bg-[#fafafa] text-[#1a1a1a] transition-all"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Neurotechnology / BCI Focus Illustration */}
        <section className="md:col-span-5 border-brutal bg-[#fafafa] p-6 shadow-brutal flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-mono border-b border-[#1a1a1a]/10 pb-2 flex items-center gap-2">
              <span className="text-[#c02b2b]">■</span> NEUROTECH_SYSTEMS
            </h2>
            <div className="border border-[#1a1a1a]/10 bg-white p-2">
              <Image
                src="/bci_abstract.png"
                alt="BCI and Brain Wave Signals Abstract Illustration"
                width={400}
                height={400}
                className="w-full h-auto grayscale contrast-125 object-cover"
                priority
              />
            </div>
            <p className="text-xs font-mono text-[#1a1a1a]/70 leading-relaxed">
              Development of real-time electroencephalography (EEG) data processing pipelines (MNE-Python, PyTorch) and building responsive web dashboards for live neurofeedback visualization.
            </p>
          </div>
        </section>
      </div>

      {/* 3. Featured Projects from DB */}
      <section className="border-brutal bg-[#fafafa] p-6 sm:p-8 shadow-brutal">
        <div className="flex justify-between items-center border-b border-[#1a1a1a]/10 pb-3 mb-6">
          <h2 className="text-xl font-bold font-mono flex items-center gap-2">
            <span className="text-[#c02b2b]">■</span> RECENT_PROJECTS.db
          </h2>
          <Link
            href="/projects"
            className="text-xs font-mono text-[#c02b2b] hover:underline"
          >
            [View All &rarr;]
          </Link>
        </div>

        {featuredProjects.length === 0 ? (
          <div className="border border-dashed border-[#1a1a1a]/20 p-8 text-center bg-[#1a1a1a]/5">
            <p className="font-mono text-sm text-[#1a1a1a]/60">
              No projects indexed in the SQLite database yet.
            </p>
            <p className="font-mono text-xs text-[#1a1a1a]/40 mt-2">
              Go to <Link href="/admin" className="text-[#c02b2b] underline">/admin</Link> to initialize data.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="border-brutal-muted p-4 flex flex-col justify-between hover:border-[#1a1a1a] hover:bg-[#1a1a1a]/5 transition-all bg-white"
              >
                <div className="space-y-3">
                  <h3 className="font-mono font-bold text-base hover:text-[#c02b2b] transition-colors">
                    <Link href={`/projects/${project.id}`}>
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-[#1a1a1a]/80 font-sans line-clamp-3">
                    {project.description}
                  </p>
                  
                  {project.techStack && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {project.techStack.split(",").map((tech) => (
                        <span
                          key={tech.trim()}
                          className="px-1.5 py-0.5 text-[10px] font-mono bg-[#2c5f4b]/10 text-[#2c5f4b] border border-[#2c5f4b]/20"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4 border-t border-[#1a1a1a]/5 mt-4 font-mono text-[11px]">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#c02b2b] hover:underline"
                    >
                      [GitHub]
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2c5f4b] hover:underline"
                    >
                      [Live Demo]
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
