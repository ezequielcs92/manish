import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageCta } from "@/components/page-cta";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SectionCta } from "@/components/section-cta";
import { getPublishedProjects } from "@/lib/admin-content";
import { createPageMetadata } from "@/lib/site";
import { portfolioLinks } from "@/lib/portfolio-links";

export const metadata: Metadata = createPageMetadata("Portfolio", "Una selección de marcas, sistemas y experiencias digitales desarrolladas por Manish.", "/portfolio");
export const revalidate = 300;

const cases = [
  { client: "Goût Pâtisserie", type: "Branding · E-commerce", year: "2026", className: "case-gout", word: "goût", note: "SABOR CON IDENTIDAD" },
  { client: "Ormiflex", type: "Estrategia · Contenido", year: "2026", className: "case-ormi", word: "ormi/flex", note: "DESCANSAR CAMBIA TODO" },
  { client: "Brothers Training Club", type: "Social · Campañas", year: "2026", className: "case-brothers", word: "B+", note: "TRAIN TOGETHER" },
  { client: "Ridigas", type: "Identidad · Digital", year: "2026", className: "case-ridigas", word: "RIDI/GAS", note: "ENERGÍA EN MOVIMIENTO" },
  { client: "Actron", type: "Contenido · Performance", year: "2026", className: "case-actron", word: "ACT/RON", note: "TECNOLOGÍA QUE AVANZA" },
];

const categoryOptions = [
  ["all", "Todo"],
  ["redes", "Manejo de redes"],
  ["contenido", "Creación de contenido"],
  ["diseno", "Diseño gráfico"],
  ["desarrollo", "Desarrollo"],
  ["ads", "Ads"],
] as const;

function projectCategories(services: string) {
  const value = services.toLowerCase();
  return [
    value.match(/redes|social/) ? "redes" : null,
    value.match(/contenido/) ? "contenido" : null,
    value.match(/diseño|diseno|branding|merch/) ? "diseno" : null,
    value.match(/web|digital|desarrollo|woocommerce|e-commerce|software/) ? "desarrollo" : null,
    value.match(/ads|paid/) ? "ads" : null,
  ].filter((category): category is string => Boolean(category));
}

export default async function PortfolioPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams;
  const activeCategory = categoryOptions.some(([value]) => value === params.category) ? params.category ?? "all" : "all";
  const storedProjects = await getPublishedProjects().catch(() => []);
  const visibleCases = storedProjects.length ? storedProjects.map((project, index) => ({
    client: project.client, type: project.services, year: project.year || "", className: ["case-gout", "case-ormi", "case-brothers", "case-ridigas", "case-actron"][index % 5],
    word: project.title, note: project.summary, slug: project.slug, coverImageUrl: project.coverImageUrl, externalUrl: portfolioLinks[project.slug], categories: projectCategories(project.services),
  })) : cases.map((project) => ({ ...project, slug: "", coverImageUrl: null, externalUrl: undefined, categories: projectCategories(project.type) }));
  const filteredCases = activeCategory === "all" ? visibleCases : visibleCases.filter((project) => project.categories.includes(activeCategory));

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
            <div aria-label="Disciplinas del trabajo seleccionado">
              {categoryOptions.map(([value, label]) => <Link className={activeCategory === value ? "active" : ""} href={value === "all" ? "/portfolio" : `/portfolio?category=${value}`} aria-current={activeCategory === value ? "page" : undefined} key={value}>{label}</Link>)}
            </div>
          </div>

          <div className="container case-grid">
            {filteredCases.map((project, index) => (
              <article className={`case-card ${project.className} ${index === 0 || index === 3 ? "case-wide" : ""}`} key={project.client} data-reveal data-tilt>
                <div className={`case-art${project.coverImageUrl ? " has-cover" : ""}`}>
                  {project.coverImageUrl ? <><Image src={project.coverImageUrl} alt={`${project.client} - proyecto realizado por Manish`} fill sizes="(max-width: 640px) 100vw, 50vw" /><i className="case-cover-shade" /></> : null}
                  <div className="case-grid-lines" />
                  {!project.coverImageUrl ? <span className="case-word">{project.word}</span> : null}
                  <span className="case-note">{project.note}</span>
                  <i className="case-shape shape-one" /><i className="case-shape shape-two" />
                  {project.externalUrl ? <a className="case-cover-link" href={project.externalUrl} target="_blank" rel="noreferrer" aria-label={`Abrir enlace de ${project.client}`} /> : null}
                </div>
                <div className="case-info">
                  <div><p>{project.type}</p><h2>{project.client}</h2></div>
                  <div className="case-info-links">{project.externalUrl ? <a href={project.externalUrl} target="_blank" rel="noreferrer">Visitar ↗</a> : null}{project.slug ? <Link href={`/portfolio/${project.slug}`}>Ver caso ↗</Link> : <span>{project.year}</span>}</div>
                </div>
              </article>
            ))}
            {!filteredCases.length ? <div className="portfolio-no-results"><h2>No encontramos casos en esta categoría.</h2><Link href="/portfolio">Ver todo el trabajo →</Link></div> : null}
          </div>
          <div className="container"><SectionCta label="¿Te imaginás acá?" text="Tu próximo proyecto puede empezar con una conversación de treinta minutos." /></div>
        </section>

        <section className="client-proof">
          <div className="container client-proof-layout" data-reveal>
            <p>Cuentas y proyectos con los que trabajamos</p>
            <div>{visibleCases.map((project) => <span key={project.client}>{project.client}</span>)}</div>
          </div>
        </section>

        <PageCta eyebrow="Tu marca puede ser la próxima" title="Construyamos algo propio." />
      </main>
      <SiteFooter />
    </>
  );
}
