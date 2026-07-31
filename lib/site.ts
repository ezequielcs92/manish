import type { Metadata } from "next";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://manishagencia.com").replace(/\/$/, "");
export const siteName = "Manish Agencia Digital";

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | Manish`, description, url: path, type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteName }] },
    twitter: { card: "summary_large_image", title: `${title} | Manish`, description, images: ["/opengraph-image"] },
  };
}
