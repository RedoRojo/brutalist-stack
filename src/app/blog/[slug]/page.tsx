import { notFound } from "next/navigation";
import { getPostBySlug } from "../../admin/actions";
import BlogDetailContent from "@/components/BlogDetailContent";

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

  return <BlogDetailContent post={post} />;
}
