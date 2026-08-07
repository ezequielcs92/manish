import { cache } from "react";
import { getSupabaseAdmin } from "./db";

export type PostRecord = { id: string; title: string; slug: string; excerpt: string; content: string; category: string; status: "draft" | "published"; featuredImageUrl: string | null; seoTitle: string | null; seoDescription: string | null; publishedAt: string | null; updatedAt: string };
export type ProjectCategory = "redes" | "contenido" | "diseno" | "desarrollo" | "ads";
export type ProjectRecord = { id: string; title: string; slug: string; client: string; summary: string; content: string; services: string; categories: ProjectCategory[]; isFeatured: boolean; year: string | null; coverImageUrl: string | null; status: "draft" | "published"; sortOrder: number; updatedAt: string };

function mapPost(row: Record<string, unknown>): PostRecord {
  return { id: String(row.id), title: String(row.title), slug: String(row.slug), excerpt: String(row.excerpt ?? ""), content: String(row.content ?? ""), category: String(row.category), status: row.status as PostRecord["status"], featuredImageUrl: row.featured_image_url ? String(row.featured_image_url) : null, seoTitle: row.seo_title ? String(row.seo_title) : null, seoDescription: row.seo_description ? String(row.seo_description) : null, publishedAt: row.published_at ? String(row.published_at) : null, updatedAt: String(row.updated_at) };
}

function mapProject(row: Record<string, unknown>): ProjectRecord {
  return { id: String(row.id), title: String(row.title), slug: String(row.slug), client: String(row.client), summary: String(row.summary ?? ""), content: String(row.content ?? ""), services: String(row.services ?? ""), categories: Array.isArray(row.categories) ? row.categories.filter((category): category is ProjectRecord["categories"][number] => typeof category === "string") : [], isFeatured: row.is_featured === true, year: row.year ? String(row.year) : null, coverImageUrl: row.cover_image_url ? String(row.cover_image_url) : null, status: row.status as ProjectRecord["status"], sortOrder: Number(row.sort_order ?? 0), updatedAt: String(row.updated_at) };
}

export async function getPosts() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { configured: false, posts: [] as PostRecord[] };
  const { data, error } = await supabase.from("posts").select("*").order("updated_at", { ascending: false });
  if (error) throw error;
  return { configured: true, posts: (data ?? []).map(mapPost) };
}

export async function getPublishedPosts() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [] as PostRecord[];
  const { data, error } = await supabase
    .from("posts")
    .select("id,title,slug,excerpt,category,status,featured_image_url,seo_title,seo_description,published_at,updated_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapPost);
}

export async function getPost(id: string) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { configured: false, post: null as PostRecord | null };
  const { data, error } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return { configured: true, post: data ? mapPost(data) : null };
}

export const getPublishedPostBySlug = cache(async (slug: string) => {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
  if (error) throw error;
  return data ? mapPost(data) : null;
});

export async function getProjects() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { configured: false, projects: [] as ProjectRecord[] };
  const { data, error } = await supabase.from("projects").select("*").order("sort_order").order("updated_at", { ascending: false });
  if (error) throw error;
  return { configured: true, projects: (data ?? []).map(mapProject) };
}

export async function getPublishedProjects() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [] as ProjectRecord[];
  const { data, error } = await supabase
    .from("projects")
    .select("id,title,slug,client,summary,services,categories,is_featured,year,cover_image_url,status,sort_order,updated_at")
    .eq("status", "published")
    .order("sort_order")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapProject);
}

export async function getFeaturedProjects() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [] as ProjectRecord[];
  const { data, error } = await supabase
    .from("projects")
    .select("id,title,slug,client,summary,services,categories,is_featured,year,cover_image_url,status,sort_order,updated_at")
    .eq("status", "published")
    .eq("is_featured", true)
    .order("sort_order")
    .order("updated_at", { ascending: false })
    .limit(3);
  if (error) throw error;
  return (data ?? []).map(mapProject);
}

export async function getProject(id: string) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { configured: false, project: null as ProjectRecord | null };
  const { data, error } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return { configured: true, project: data ? mapProject(data) : null };
}

export const getPublishedProjectBySlug = cache(async (slug: string) => {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
  if (error) throw error;
  return data ? mapProject(data) : null;
});

export const getSiteContent = cache(async () => {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { configured: false, content: {} as Record<string, string> };
  const { data, error } = await supabase.from("site_content").select("key,value");
  if (error) throw error;
  return { configured: true, content: Object.fromEntries((data ?? []).map((row) => [String(row.key), String(row.value)])) };
});
