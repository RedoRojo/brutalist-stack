import { redirect } from "next/navigation";
import { verifySession } from "../../actions";
import ProjectFormClient from "./ProjectFormClient";

export const revalidate = 0;

export default async function NewProjectPage() {
  const isAuthenticated = await verifySession();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <section className="accent-bar pl-6 space-y-2">
        <span className="font-mono text-xs font-bold text-rust tracking-wider uppercase">
          Projects Section
        </span>
        <h1 className="text-3xl font-display font-normal tracking-tight">
          Create New Project
        </h1>
      </section>
      <ProjectFormClient />
    </div>
  );
}
