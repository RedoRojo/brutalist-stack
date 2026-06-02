import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug } from "../../admin/actions";
import Markdown from "@/components/Markdown";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0; // Dynamic server component

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Back link */}
      <div className="font-mono text-xs">
        <Link href="/blog" className="text-[#c02b2b] hover:underline">
          [&larr; Back to Blog]
        </Link>
      </div>

      {/* Main Post Header Card */}
      <article className="border-brutal bg-[#fafafa] p-6 sm:p-8 shadow-brutal space-y-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#c02b2b]" />

        <div className="pl-3 space-y-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#1a1a1a]/40 bg-[#1a1a1a]/5 px-2 py-0.5 border border-[#1a1a1a]/10">
              PUBLISHED: {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight leading-snug uppercase border-b border-[#1a1a1a]/10 pb-3">
            {post.title}
          </h1>

          <p className="text-sm font-sans italic text-[#1a1a1a]/70 border-l-2 border-[#2c5f4b] pl-4 leading-relaxed">
            {post.summary}
          </p>
        </div>
      </article>

      {/* Main Markdown Body Content */}
      <section className="border-brutal bg-white p-6 sm:p-8 shadow-brutal space-y-4">
        <div className="font-mono text-xs text-[#1a1a1a]/50 border-b border-[#1a1a1a]/10 pb-2 mb-4 uppercase">
          Journal Entry
        </div>
        
        <div className="prose prose-zinc max-w-none">
          <Markdown content={post.content} />
        </div>
      </section>
    </div>
  );
}
