import { AdminProjectForm } from "@/components/admin-project-form";
import { getProjects } from "@/lib/admin-content";

export default async function NewProjectPage() {
  const configured = await getProjects().then((result) => result.configured).catch(() => false);
  return <AdminProjectForm configured={configured} />;
}
