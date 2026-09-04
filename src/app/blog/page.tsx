import Link from "next/link";
import { getPosts } from "../admin/actions";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Button from "@/components/Button";

export const revalidate = 0;

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-10 max-w-3xl mx-auto">
      {/* Page Header */}
      <section className="accent-bar pl-6 space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="red">TECHNICAL WRITING</Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-normal tracking-tight text-[var(--text-primary)]">
          Development Journal &amp; Notes
        </h1>
        <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
          Technical write-ups, post-mortems, and development notes on software engineering, QA testing, and signal processing.
        </p>
      </section>

      {/* Posts List */}
      {posts.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="font-mono text-sm text-[var(--text-muted)]">No posts published yet.</p>
          <div className="mt-4">
            <Button href="/admin">Admin Dashboard</Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="hover:border-[var(--accent)] transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-dotted border-[var(--border-subtle)] pb-2">
                <Badge variant="black">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Badge>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-mono text-xs text-[var(--accent)] font-medium hover:underline self-start sm:self-auto"
                >
                  Read Article &rarr;
                </Link>
              </div>
              <h2 className="font-mono font-bold text-lg text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors leading-snug">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
                {post.summary}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

