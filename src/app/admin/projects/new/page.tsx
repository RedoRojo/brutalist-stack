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
    <div className="space-y-6 max-w-6xl mx-auto">
      <ProjectFormClient />
    </div>
  );
}
