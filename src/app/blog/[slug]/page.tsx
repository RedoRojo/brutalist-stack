import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug } from "../../admin/actions";
import Markdown from "@/components/Markdown";
import Card from "@/components/Card";
import Badge from "@/components/Badge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0;

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
        <Link href="/blog" className="text-rust link-underline">
          &larr; Back to Blog
        </Link>
      </div>

      {/* Post Header */}
      <Card accent>
        <div className="space-y-4">
          <Badge>
            PUBLISHED{" "}
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-display font-normal tracking-tight leading-snug text-bone">
            {post.title}
          </h1>
          <p className="text-sm font-sans text-bone/60 border-l-2 border-rust/40 pl-4 leading-relaxed italic">
            {post.summary}
          </p>
        </div>
      </Card>

      {/* Post Content */}
      <Card>
        <div className="font-mono text-[10px] text-ash uppercase tracking-wider border-b border-ash/15 pb-2 mb-4">
          Journal Entry
        </div>
        <Markdown content={post.content} />
      </Card>
    </div>
  );
}
