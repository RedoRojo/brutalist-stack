import { getPosts } from "../admin/actions";
import BlogListContent from "@/components/BlogListContent";

export const revalidate = 0;

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return <BlogListContent posts={posts} />;
}
