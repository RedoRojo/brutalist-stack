import { redirect } from "next/navigation";
import { verifySession } from "../../actions";
import BlogFormClient from "./BlogFormClient";

export const revalidate = 0;

export default async function NewBlogPage() {
  const isAuthenticated = await verifySession();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <section className="accent-bar pl-6 space-y-2">
        <span className="font-mono text-xs font-bold text-rust tracking-wider uppercase">
          Blog Section
        </span>
        <h1 className="text-3xl font-display font-normal tracking-tight">
          Create New Blog Post
        </h1>
      </section>
      <BlogFormClient />
    </div>
  );
}
