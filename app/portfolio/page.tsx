import type { Metadata } from "next";
import { PageCta } from "@/components/page-cta";
import { PageHero } from "@/components/page-hero";
import { PortfolioFilter, type PortfolioFilterCase } from "@/components/portfolio-filter";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SectionCta } from "@/components/section-cta";
import { getPublishedProjects } from "@/lib/admin-content";
import { createPageMetadata } from "@/lib/site";
import { portfolioLinks } from "@/lib/portfolio-links";

export const metadata: Metadata = createPageMetadata("Portfolio", "Una selección de marcas, sistemas y experiencias digitales desarrolladas por Manish.", "/portfolio");
export const revalidate = 300;

const cases = [
  { client: "Goût Pâtisserie", type: "Branding · E-commerce", year: "2026", className: "case-gout", word: "goût" },
  { client: "Ormiflex", type: "Estrategia · Contenido", year: "2026", className: "case-ormi", word: "ormi/flex" },
  { client: "Brothers Training Club", type: "Social · Campañas", year: "2026", className: "case-brothers", word: "B+" },
  { client: "Ridigas", type: "Identidad · Digital", year: "2026", className: "case-ridigas", word: "RIDI/GAS" },
  { client: "Actron", type: "Contenido · Performance", year: "2026", className: "case-actron", word: "ACT/RON" },
];

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

function shuffle<T>(items: T[]) {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[randomIndex]] = [items[randomIndex], items[index]];
  }
  return items;
}

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const storedProjects = await getPublishedProjects().catch(() => []);
  const visibleCases: PortfolioFilterCase[] = storedProjects.length ? shuffle(storedProjects.map((project, index) => ({
    client: project.client, type: project.services, year: project.year || "", className: ["case-gout", "case-ormi", "case-brothers", "case-ridigas", "case-actron"][index % 5],
    word: project.title, slug: project.slug, coverImageUrl: project.coverImageUrl, externalUrl: portfolioLinks[project.slug], categories: project.categories.length ? project.categories : projectCategories(project.services),
  }))) as PortfolioFilterCase[] : shuffle(cases.map((project) => ({ ...project, slug: "", coverImageUrl: null, externalUrl: undefined, categories: projectCategories(project.type) })));

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
          <PortfolioFilter cases={visibleCases} />
          <div className="container"><SectionCta label="¿Te imaginás acá?" text="Tu próximo proyecto puede empezar con una conversación de treinta minutos." /></div>
        </section>

        <section className="client-proof">
          <div className="container client-proof-layout" data-reveal>
            <p>Cuentas y proyectos con los que trabajamos</p>
            <div className="client-proof-marquee" aria-label="Clientes y proyectos">
              <div className="client-proof-track">
                <div className="client-proof-list">{visibleCases.map((project) => <span key={project.client}>{project.client}</span>)}</div>
                <div className="client-proof-list" aria-hidden="true">{visibleCases.map((project) => <span key={`repeat-${project.client}`}>{project.client}</span>)}</div>
              </div>
            </div>
          </div>
        </section>

        <PageCta eyebrow="Tu marca puede ser la próxima" title="Construyamos algo propio." />
      </main>
      <SiteFooter />
    </>
  );
}
