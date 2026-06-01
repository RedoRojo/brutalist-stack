import Link from "next/link";
import { getPosts } from "../admin/actions";

export const revalidate = 0; // Dynamic server component

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Page Header */}
      <section className="border-brutal bg-[#fafafa] p-6 shadow-brutal relative">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#c02b2b]" />
        <div className="space-y-2 pl-2">
          <span className="font-mono text-xs font-bold text-[#c02b2b] tracking-wider uppercase">
            [ ARCHIVE: ENGINEERING_BLOG.db ]
          </span>
          <h1 className="text-3xl font-bold font-mono tracking-tight">
            THE DEV LOG & DISPATCHES
          </h1>
          <p className="text-sm font-mono text-[#1a1a1a]/60">
            Technical write-ups, post-mortems, and development notes on software engineering and system design.
          </p>
        </div>
      </section>

      {/* Posts List */}
      {posts.length === 0 ? (
        <div className="border-brutal bg-[#fafafa] p-12 text-center shadow-brutal space-y-4">
          <p className="font-mono text-sm text-[#1a1a1a]/60">
            No entries written to the database journal yet.
          </p>
          <div className="flex justify-center">
            <Link
              href="/admin"
              className="px-4 py-2 border border-[#1a1a1a] bg-[#c02b2b] text-[#fafafa] font-mono text-xs hover:bg-[#1a1a1a] transition-all shadow-brutal"
            >
              [Access CMS Dashboard &rarr;]
            </Link>
          </div>
        </div>
      ) : (
        <div className="border-brutal bg-white p-6 shadow-brutal space-y-6 divide-y divide-[#1a1a1a]/10">
          {posts.map((post, idx) => (
            <article
              key={post.id}
              className={`pt-6 first:pt-0 flex flex-col md:flex-row md:items-baseline md:justify-between gap-4`}
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#1a1a1a]/40 bg-[#1a1a1a]/5 px-2 py-0.5 border border-[#1a1a1a]/10">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h2 className="font-mono font-bold text-lg hover:text-[#c02b2b] transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-sm font-sans text-[#1a1a1a]/80 leading-relaxed max-w-2xl">
                  {post.summary}
                </p>
              </div>

              <div className="font-mono text-xs self-start md:self-auto">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-[#c02b2b] hover:underline"
                >
                  [Read Post &rarr;]
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
