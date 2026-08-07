import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageCta } from "@/components/page-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublishedProjectBySlug } from "@/lib/admin-content";
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
  return <><SiteHeader /><main id="inicio"><article className="editorial-detail case-editorial-detail"><header className="container"><Link href="/portfolio">← Volver al portfolio</Link><p>{project.services}</p><h1>{project.title}</h1><span>{project.summary}</span><div className="case-editorial-meta"><span>{project.client}</span>{project.year ? <span>{project.year}</span> : null}</div></header>{project.coverImageUrl ? <div className="editorial-cover"><Image src={project.coverImageUrl} alt={project.title} fill sizes="(max-width: 1228px) calc(100vw - 48px), 1180px" /></div> : null}<div className="container editorial-body" dangerouslySetInnerHTML={{ __html: sanitizeRichText(project.content) }} /></article><PageCta eyebrow="¿Construimos el próximo?" title="Tu proyecto empieza acá." /></main><SiteFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /></>;
}
