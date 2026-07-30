import type { Metadata } from "next";
import { PageCta } from "@/components/page-cta";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Ideas",
  description: "Ideas, herramientas y aprendizajes sobre marketing, creatividad y tecnología.",
};

const topics = [
  { number: "01", category: "Estrategia", title: "Cómo ordenar una estrategia digital cuando todo parece prioridad", description: "Un marco práctico para pasar de una lista de tareas a una dirección compartida.", className: "article-violet" },
  { number: "02", category: "Contenido", title: "Contenido nativo: diseñar para el contexto, no solo para el formato", description: "Qué cambia cuando dejamos de adaptar piezas y empezamos a pensar desde cada plataforma.", className: "article-pink" },
  { number: "03", category: "Tecnología", title: "Dónde empieza una automatización que realmente vale la pena", description: "Cómo detectar procesos repetitivos sin agregar herramientas que complican más de lo que resuelven.", className: "article-blue" },
];

export default function BlogPage() {
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
            <div><p className="eyebrow"><span /> Próximamente</p><h2>Estamos preparando<br />el primer número.</h2></div>
            <p>El blog se publicará junto con el sistema de gestión editorial. Estos son algunos de los temas que estamos desarrollando.</p>
          </div>

          <div className="container article-grid">
            {topics.map((topic) => (
              <article className={`article-card ${topic.className}`} key={topic.number} data-reveal data-tilt>
                <div className="article-art"><span>{topic.number}</span><i /><b>{topic.category}</b></div>
                <div className="article-copy">
                  <p>{topic.category} · En preparación</p>
                  <h2>{topic.title}</h2>
                  <span>{topic.description}</span>
                </div>
              </article>
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
