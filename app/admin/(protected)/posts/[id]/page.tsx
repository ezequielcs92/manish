import { notFound } from "next/navigation";
import { AdminPostForm } from "@/components/admin-post-form";
import { getPost } from "@/lib/admin-content";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getPost(id).catch(() => ({ configured: false, post: null }));
  if (result.configured && !result.post) notFound();
  return <AdminPostForm post={result.post} configured={result.configured} />;
}
