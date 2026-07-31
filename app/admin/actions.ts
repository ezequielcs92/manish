"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/db";
import type { LeadStatus } from "@/lib/leads";
import { sanitizeRichText } from "@/lib/sanitize";

function text(form: FormData, key: string, maxLength = 10000) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function adminDatabase(fallbackPath: string) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  if (!supabase) redirect(`${fallbackPath}?error=database`);
  return supabase;
}

export async function updateLeadAction(form: FormData) {
  const id = text(form, "id", 50);
  const statusValue = text(form, "status", 20);
  const status: LeadStatus = ["new", "contacted", "closed"].includes(statusValue) ? statusValue as LeadStatus : "new";
  const supabase = await adminDatabase(`/admin/leads/${id}`);
  const { error } = await supabase.from("leads").update({ status, notes: text(form, "notes", 5000) || null, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) redirect(`/admin/leads/${id}?error=save`);
  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  redirect(`/admin/leads/${id}?saved=1`);
}

export async function savePostAction(form: FormData) {
  const id = text(form, "id", 50);
  const title = text(form, "title", 180);
  const slug = slugify(text(form, "slug", 200) || title);
  const fallbackPath = id ? `/admin/posts/${id}` : "/admin/posts/nuevo";
  const supabase = await adminDatabase(fallbackPath);
  if (!title || !slug) redirect(`${fallbackPath}?error=required`);
  const status = text(form, "status", 20) === "published" ? "published" : "draft";
  const existing = id ? await supabase.from("posts").select("published_at,slug").eq("id", id).maybeSingle() : null;
  const publishedAt = status === "published" ? existing?.data?.published_at ?? new Date().toISOString() : null;
  const values = {
    title, slug, excerpt: text(form, "excerpt", 600), content: sanitizeRichText(text(form, "content", 50000)),
    category: text(form, "category", 80) || "Ideas", status,
    featured_image_url: text(form, "featuredImageUrl", 1000) || null,
    seo_title: text(form, "seoTitle", 180) || null, seo_description: text(form, "seoDescription", 320) || null,
    published_at: publishedAt, updated_at: new Date().toISOString(),
  };
  const result = id ? await supabase.from("posts").update(values).eq("id", id) : await supabase.from("posts").insert(values);
  if (result.error) redirect(`${fallbackPath}?error=save`);
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  revalidatePath(`/blog/${slug}`);
  if (existing?.data?.slug && existing.data.slug !== slug) revalidatePath(`/blog/${existing.data.slug}`);
  redirect("/admin/posts?saved=1");
}

export async function deletePostAction(form: FormData) {
  const id = text(form, "id", 50);
  const supabase = await adminDatabase(`/admin/posts/${id}`);
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) redirect(`/admin/posts/${id}?error=delete`);
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  redirect("/admin/posts?deleted=1");
}

export async function saveProjectAction(form: FormData) {
  const id = text(form, "id", 50);
  const title = text(form, "title", 180);
  const slug = slugify(text(form, "slug", 200) || title);
  const client = text(form, "client", 180);
  const fallbackPath = id ? `/admin/portfolio/${id}` : "/admin/portfolio/nuevo";
  const supabase = await adminDatabase(fallbackPath);
  if (!title || !slug || !client) redirect(`${fallbackPath}?error=required`);
  const values = {
    title, slug, client, summary: text(form, "summary", 1000), content: sanitizeRichText(text(form, "content", 50000)),
    services: text(form, "services", 500), year: text(form, "year", 10) || null,
    cover_image_url: text(form, "coverImageUrl", 1000) || null,
    status: text(form, "status", 20) === "published" ? "published" : "draft",
    sort_order: Number.parseInt(text(form, "sortOrder", 5), 10) || 0, updated_at: new Date().toISOString(),
  };
  const result = id ? await supabase.from("projects").update(values).eq("id", id) : await supabase.from("projects").insert(values);
  if (result.error) redirect(`${fallbackPath}?error=save`);
  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  revalidatePath("/sitemap.xml");
  revalidatePath(`/portfolio/${slug}`);
  redirect("/admin/portfolio?saved=1");
}

export async function deleteProjectAction(form: FormData) {
  const id = text(form, "id", 50);
  const supabase = await adminDatabase(`/admin/portfolio/${id}`);
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) redirect(`/admin/portfolio/${id}?error=delete`);
  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  redirect("/admin/portfolio?deleted=1");
}

const siteContentKeys = ["home_eyebrow", "home_title_line_1", "home_title_line_2", "home_description", "contact_email", "whatsapp_url", "instagram_url", "linkedin_url"];

export async function saveSiteContentAction(form: FormData) {
  const supabase = await adminDatabase("/admin/sitio");
  const rows = siteContentKeys.map((key) => ({ key, value: text(form, key, 2000), updated_at: new Date().toISOString() }));
  const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
  if (error) redirect("/admin/sitio?error=save");
  revalidatePath("/");
  revalidatePath("/contacto");
  redirect("/admin/sitio?saved=1");
}
