import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageCta } from "@/components/page-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublishedProjectBySlug } from "@/lib/admin-content";
import { portfolioLinks } from "@/lib/portfolio-links";
import { sanitizeRichText } from "@/lib/sanitize";
import { absoluteUrl, siteName, siteUrl } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug).catch(() => null);
  if (!project) return { title: "Caso" };
  const url = `/portfolio/${project.slug}`;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: { title: project.title, description: project.summary, url, type: "article", images: project.coverImageUrl ? [{ url: project.coverImageUrl, alt: project.title }] : undefined },
    twitter: { card: "summary_large_image", title: project.title, description: project.summary, images: project.coverImageUrl ? [project.coverImageUrl] : undefined },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug).catch(() => null);
  if (!project) notFound();
  const structuredData = { "@context": "https://schema.org", "@type": "CreativeWork", name: project.title, description: project.summary, url: absoluteUrl(`/portfolio/${project.slug}`), creator: { "@id": `${siteUrl}/#organization`, name: siteName }, image: project.coverImageUrl || undefined, dateModified: project.updatedAt, inLanguage: "es-AR" };
  const safeContent = sanitizeRichText(project.content);
  const projectUrl = portfolioLinks[project.slug] ?? safeContent.match(/href="(https?:\/\/[^\"]+)"/i)?.[1];
  const contentWithoutImages = safeContent.replace(/<figure\b[^>]*>[\s\S]*?<\/figure>/gi, "").replace(/<img\b[^>]*>/gi, "");
  const contentWithoutLink = contentWithoutImages.replace(/<p>\s*<strong>Ver proyecto:<\/strong>[\s\S]*?<\/p>/i, "");
  return <><SiteHeader /><main id="inicio"><article className="editorial-detail case-editorial-detail"><header className="container"><Link href="/portfolio">← Volver al portfolio</Link><p>{project.services}</p><h1>{project.title}</h1><span>{project.summary}</span><div className="case-editorial-meta"><span>{project.client}</span>{project.year ? <span>{project.year}</span> : null}</div></header><div className="container editorial-body"><div dangerouslySetInnerHTML={{ __html: contentWithoutLink }} />{projectUrl ? <a className="button button-small case-project-action" href={projectUrl} target="_blank" rel="noreferrer">Ver proyecto <svg className="arrow-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 15 15 5m-8 0h8v8" /></svg></a> : null}</div></article><PageCta eyebrow="¿Construimos el próximo?" title="Tu proyecto empieza acá." /></main><SiteFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /></>;
}
