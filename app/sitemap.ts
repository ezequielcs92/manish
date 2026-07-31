import type { MetadataRoute } from "next";
import { getPublishedPosts, getPublishedProjects } from "@/lib/admin-content";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPages = ["/", "/servicios", "/portfolio", "/nosotros", "/contacto", "/blog", "/privacidad"];
  const [posts, projects] = await Promise.all([
    getPublishedPosts().catch(() => []),
    getPublishedProjects().catch(() => []),
  ]);

  return [
    ...staticPages.map((path) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: path === "/blog" ? "weekly" as const : "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/portfolio/${project.slug}`),
      lastModified: new Date(project.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
