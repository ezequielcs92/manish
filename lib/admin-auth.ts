import { redirect } from "next/navigation";
import { getSupabaseServer } from "./supabase/server";

export type AdminRole = "admin" | "editor";

export async function getAdminSession() {
  const supabase = await getSupabaseServer();
  if (!supabase) return null;
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  const role = user.app_metadata?.role as AdminRole | undefined;
  if (role !== "admin" && role !== "editor") return null;
  return { id: user.id, email: user.email ?? "", role };
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}
