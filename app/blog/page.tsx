import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageCta } from "@/components/page-cta";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublishedPosts } from "@/lib/admin-content";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata("Ideas", "Ideas, herramientas y aprendizajes sobre marketing, creatividad y tecnología.", "/blog");

export const revalidate = 300;

const topics = [
  { number: "01", category: "Estrategia", title: "Cómo ordenar una estrategia digital cuando todo parece prioridad", description: "Un marco práctico para pasar de una lista de tareas a una dirección compartida.", className: "article-violet" },
  { number: "02", category: "Contenido", title: "Contenido nativo: diseñar para el contexto, no solo para el formato", description: "Qué cambia cuando dejamos de adaptar piezas y empezamos a pensar desde cada plataforma.", className: "article-pink" },
  { number: "03", category: "Tecnología", title: "Dónde empieza una automatización que realmente vale la pena", description: "Cómo detectar procesos repetitivos sin agregar herramientas que complican más de lo que resuelven.", className: "article-blue" },
];

export default async function BlogPage() {
  const storedPosts = await getPublishedPosts().catch(() => []);
  const articles = storedPosts.length ? storedPosts.map((post, index) => ({
    number: String(index + 1).padStart(2, "0"), category: post.category, title: post.title,
    description: post.excerpt, className: ["article-violet", "article-pink", "article-blue"][index % 3], slug: post.slug, image: post.featuredImageUrl,
  })) : topics.map((topic) => ({ ...topic, slug: "", image: null }));

  return (
    <>
      <SiteHeader />
      <main id="inicio">
        <PageHero
          index="05"
          kicker="Ideas"
          title={<>Pensar mejor para<br /><em>moverse mejor.</em></>}
          description="Aprendizajes, preguntas y herramientas que surgen de trabajar todos los días entre negocio, cultura y tecnología."
          tags={["Ideas", "Métodos", "Señales"]}
        />

        <section className="inner-section journal-section">
          <div className="container journal-heading" data-reveal>
            <div><p className="eyebrow"><span /> Últimas ideas</p><h2>Ideas para pensar,<br />decidir y avanzar.</h2></div>
            <p>Análisis y herramientas nacidas del trabajo diario con marcas, equipos y negocios en movimiento.</p>
          </div>

          <div className="container article-grid">
            {articles.map((topic) => (
              <Link className={`article-card ${topic.className}`} href={topic.slug ? `/blog/${topic.slug}` : "/blog"} key={topic.number} data-reveal data-tilt>
                <div className={`article-art${topic.image ? " has-image" : ""}`}>{topic.image ? <><Image src={topic.image} alt="" fill sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 900px) 45vw, 33vw" /><i className="article-shade" /></> : <i />}<span>{topic.number}</span><b>{topic.category}</b></div>
                <div className="article-copy">
                  <p>{topic.category}</p>
                  <h2>{topic.title}</h2>
                  <span>{topic.description}</span>
                  {topic.slug ? <span className="article-read-link">Leer artículo →</span> : null}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="editorial-principle">
          <div className="container" data-reveal>
            <p>Sin relleno. Sin tendencias repetidas.</p>
            <h2>Solo ideas que podamos llevar a la práctica.</h2>
          </div>
        </section>

        <PageCta eyebrow="Mientras tanto" title="Conversemos sobre tu marca." />
      </main>
      <SiteFooter />
    </>
  );
}
