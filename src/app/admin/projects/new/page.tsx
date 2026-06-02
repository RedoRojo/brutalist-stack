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
      {/* Header */}
      <section className="border-brutal bg-[#fafafa] p-6 shadow-brutal relative">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#c02b2b]" />
        <div className="space-y-1 pl-2">
          <span className="font-mono text-xs font-bold text-[#c02b2b] tracking-wider uppercase">
            [ Projects Section ]
          </span>
          <h1 className="text-3xl font-bold font-mono tracking-tight">
            CREATE NEW PROJECT
          </h1>
        </div>
      </section>

      {/* Client Form */}
      <ProjectFormClient />
    </div>
  );
}
