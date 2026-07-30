import type { Metadata } from "next";
import { PageCta } from "@/components/page-cta";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SectionCta } from "@/components/section-cta";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Una selección de marcas, sistemas y experiencias digitales desarrolladas por Manish.",
};

const cases = [
  { client: "Goût Pâtisserie", type: "Branding · E-commerce", year: "2026", className: "case-gout", word: "goût", note: "SABOR CON IDENTIDAD" },
  { client: "Ormiflex", type: "Estrategia · Contenido", year: "2026", className: "case-ormi", word: "ormi/flex", note: "DESCANSAR CAMBIA TODO" },
  { client: "Brothers Training Club", type: "Social · Campañas", year: "2026", className: "case-brothers", word: "B+", note: "TRAIN TOGETHER" },
  { client: "Ridigas", type: "Identidad · Digital", year: "2026", className: "case-ridigas", word: "RIDI/GAS", note: "ENERGÍA EN MOVIMIENTO" },
  { client: "Actron", type: "Contenido · Performance", year: "2026", className: "case-actron", word: "ACT/RON", note: "TECNOLOGÍA QUE AVANZA" },
];

export default function PortfolioPage() {
  return (
    <>
      <SiteHeader />
      <main id="inicio">
        <PageHero
          index="02"
          kicker="Portfolio"
          title={<>Trabajo que se ve.<br /><em>Impacto que queda.</em></>}
          description="Ideas convertidas en identidades, campañas, contenido y productos digitales. Cada caso empieza con una pregunta distinta."
          tags={["Marcas", "Sistemas", "Experiencias"]}
        />

        <section className="inner-section portfolio-section">
          <div className="container portfolio-toolbar" data-reveal>
            <p>TRABAJO SELECCIONADO</p>
            <div aria-label="Categorías disponibles">
              <span className="active">Todo</span><span>Marca</span><span>Contenido</span><span>Digital</span>
            </div>
          </div>

          <div className="container case-grid">
            {cases.map((project, index) => (
              <article className={`case-card ${project.className} ${index === 0 || index === 3 ? "case-wide" : ""}`} key={project.client} data-reveal data-tilt>
                <div className="case-art">
                  <div className="case-grid-lines" />
                  <span className="case-word">{project.word}</span>
                  <span className="case-note">{project.note}</span>
                  <i className="case-shape shape-one" /><i className="case-shape shape-two" />
                </div>
                <div className="case-info">
                  <div><p>{project.type}</p><h2>{project.client}</h2></div>
                  <span>{project.year}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="container"><SectionCta label="¿Te imaginás acá?" text="Tu próximo proyecto puede empezar con una conversación de treinta minutos." /></div>
        </section>

        <section className="client-proof">
          <div className="container client-proof-layout" data-reveal>
            <p>También confían en nosotros</p>
            <div><span>Goût</span><span>Ormiflex</span><span>Brothers</span><span>Ridigas</span><span>Actron</span></div>
          </div>
        </section>

        <PageCta eyebrow="Tu marca puede ser la próxima" title="Construyamos algo propio." />
      </main>
      <SiteFooter />
    </>
  );
}
