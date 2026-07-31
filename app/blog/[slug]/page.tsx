import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageCta } from "@/components/page-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublishedPostBySlug } from "@/lib/admin-content";
import { sanitizeRichText } from "@/lib/sanitize";
import { absoluteUrl, siteName, siteUrl } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug).catch(() => null);
  if (!post) return { title: "Artículo" };
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const url = `/blog/${post.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    keywords: [post.category, post.title.toLowerCase(), "agencia digital", "Manish"],
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: ["Manish Agencia Digital"],
      images: post.featuredImageUrl ? [{ url: post.featuredImageUrl, width: 1200, height: 630, alt: post.title }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description, images: post.featuredImageUrl ? [post.featuredImageUrl] : undefined },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug).catch(() => null);
  if (!post) notFound();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: { "@id": `${siteUrl}/#organization`, name: siteName },
    publisher: { "@id": `${siteUrl}/#organization`, name: siteName },
    articleSection: post.category,
    image: post.featuredImageUrl || undefined,
    inLanguage: "es-AR",
  };
  return <><SiteHeader /><main id="inicio"><article className="editorial-detail"><header className="container"><Link href="/blog">← Volver a ideas</Link><p>{post.category}</p><h1>{post.title}</h1><span>{post.excerpt}</span></header>{post.featuredImageUrl ? <div className="editorial-cover"><Image src={post.featuredImageUrl} alt={post.title} fill sizes="(max-width: 1228px) calc(100vw - 48px), 1180px" /></div> : null}<div className="container editorial-body" dangerouslySetInnerHTML={{ __html: sanitizeRichText(post.content) }} /></article><PageCta eyebrow="¿Lo llevamos a la práctica?" title="Conversemos sobre tu marca." /></main><SiteFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /></>;
}
