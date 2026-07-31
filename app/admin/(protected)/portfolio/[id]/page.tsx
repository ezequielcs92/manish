import { notFound } from "next/navigation";
import { AdminProjectForm } from "@/components/admin-project-form";
import { getProject } from "@/lib/admin-content";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getProject(id).catch(() => ({ configured: false, project: null }));
  if (result.configured && !result.project) notFound();
  return <AdminProjectForm project={result.project} configured={result.configured} />;
}
