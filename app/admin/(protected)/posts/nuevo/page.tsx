import { AdminPostForm } from "@/components/admin-post-form";
import { getPosts } from "@/lib/admin-content";

export default async function NewPostPage() {
  const configured = await getPosts().then((result) => result.configured).catch(() => false);
  return <AdminPostForm configured={configured} />;
}
