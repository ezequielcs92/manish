import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import brandMark from "@/branding/logos/logo dibujo.svg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionCta } from "@/components/section-cta";
import { getFeaturedProjects, getSiteContent } from "@/lib/admin-content";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata(
  "Agencia digital",
  "Estrategia, creatividad y tecnología para marcas que quieren avanzar.",
  "/",
);

const services = [
  {
    number: "01",
    title: "Marketing digital",
    description:
      "Estrategia, campañas y datos trabajando juntos para transformar atención en crecimiento.",
    tags: ["Social", "Paid media", "SEO", "Analytics"],
    icon: "signal",
  },
  {
    number: "02",
    title: "Contenido y creatividad",
    description:
      "Ideas con identidad propia, pensadas para cada formato y hechas para conectar con personas.",
    tags: ["Branding", "UGC", "Audiovisual", "Diseño"],
    icon: "spark",
  },
  {
    number: "03",
    title: "Desarrollo y\u00a0tecnología",
    description:
      "Productos digitales y automatizaciones que simplifican procesos y abren nuevas oportunidades.",
    tags: ["Webs", "E-commerce", "IA", "Software"],
    icon: "code",
  },
];

const clients = ["Goût", "Ormiflex", "Brothers", "Ridigas", "Actron"];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg className="arrow-icon" viewBox="0 0 20 20" aria-hidden="true">
      {diagonal ? (
        <path d="M5 15 15 5m-8 0h8v8" />
      ) : (
        <path d="M3 10h14m-5-5 5 5-5 5" />
      )}
    </svg>
  );
}

function ServiceIcon({ name }: { name: string }) {
  if (name === "signal") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 35c5-13 11-19 18-19 5 0 9 3 14 9" />
        <path d="M8 25c5-8 10-12 16-12 7 0 12 5 16 15" />
        <circle cx="10" cy="35" r="3" />
        <circle cx="40" cy="25" r="3" />
      </svg>
    );
  }

  if (name === "spark") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="m24 5 3.3 11.7L39 20l-11.7 3.3L24 35l-3.3-11.7L9 20l11.7-3.3L24 5Z" />
        <path d="m38 31 1.4 5.6L45 38l-5.6 1.4L38 45l-1.4-5.6L31 38l5.6-1.4L38 31Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="m18 13-11 11 11 11M30 13l11 11-11 11M27 7l-6 34" />
    </svg>
  );
}

export default async function Home() {
  const [siteContent, featuredProjects] = await Promise.all([
    getSiteContent().then((result) => result.content).catch(() => ({} as Record<string, string>)),
    getFeaturedProjects().catch(() => []),
  ]);
  const content = (key: string, fallback: string) => siteContent[key] || fallback;

  return (
    <>
      <SiteHeader />
      <main id="inicio">
        <section className="hero">
          <div className="hero-glow" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                <span /> {content("home_eyebrow", "Agencia digital · Ideas en movimiento")}
              </p>
              <h1>
                <span>{content("home_title_line_1", "Ideas que")}</span>
                <span><em>{content("home_title_line_2", "mueven marcas.")}</em></span>
              </h1>
              <p className="hero-lead">
                {content("home_description", "Unimos estrategia, creatividad y tecnología para convertir desafíos de negocio en experiencias que hacen avanzar.")}
              </p>
              <div className="hero-actions">
                <Link className="button" href="/contacto#formulario">
                  Empecemos un proyecto <Arrow />
                </Link>
                <Link className="text-link" href="#trabajo">
                  Ver nuestro trabajo <Arrow diagonal />
                </Link>
              </div>
            </div>

            <div className="hero-stage" data-tilt aria-hidden="true">
              <div className="stage-grid" />
              <div className="stage-halo halo-one" />
              <div className="stage-halo halo-two" />
              <div className="brand-sculpture">
                <div className="brand-depth depth-three" />
                <div className="brand-depth depth-two" />
                <div className="brand-depth depth-one" />
                <div className="brand-face">
                  <Image src={brandMark} alt="" width={430} height={430} priority />
                </div>
              </div>
              <div className="stage-card stage-card-one">
                <span>01</span><strong>ESTRATEGIA</strong>
              </div>
              <div className="stage-card stage-card-two">
                <span>02</span><strong>CREATIVIDAD</strong>
              </div>
              <div className="stage-card stage-card-three">
                <span>03</span><strong>TECNOLOGÍA</strong>
              </div>
              <div className="stage-status"><i /> EN LÍNEA</div>
            </div>
          </div>
          <div className="container client-strip">
            <p>Marcas que confían</p>
            <div className="client-marquee">
              <div className="client-track">
                <div className="client-list">
                  {clients.map((client) => <span key={client}>{client}</span>)}
                </div>
                <div className="client-list" aria-hidden="true">
                  {clients.map((client) => <span key={`repeat-${client}`}>{client}</span>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section services" id="servicios">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="eyebrow"><span /> Lo que hacemos</p>
              <h2>Todo lo que una idea necesita para crecer.</h2>
              <p>Equipos y disciplinas conectados de principio a fin. Sin fórmulas enlatadas.</p>
            </div>

            <div className="service-grid">
              {services.map((service) => (
                <article className="service-card" key={service.title} data-reveal data-tilt>
                  <div className="card-topline">
                    <span>{service.number}</span>
                    <div className="service-icon"><ServiceIcon name={service.icon} /></div>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul aria-label={`Especialidades de ${service.title}`}>
                    {service.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </article>
              ))}
            </div>
            <SectionCta label="¿No sabés por dónde empezar?" text="Contanos el desafío y definimos juntos qué disciplinas necesita." />
          </div>
        </section>

        <div className="kinetic-band" aria-hidden="true">
          <div className="kinetic-track">
            <span>ESTRATEGIA</span><i>✦</i><span>DISEÑO</span><i>✦</i><span>CONTENIDO</span><i>✦</i><span>DESARROLLO</span><i>✦</i><span>PERFORMANCE</span><i>✦</i>
            <span>ESTRATEGIA</span><i>✦</i><span>DISEÑO</span><i>✦</i><span>CONTENIDO</span><i>✦</i><span>DESARROLLO</span><i>✦</i><span>PERFORMANCE</span><i>✦</i>
          </div>
        </div>

        <section className="section work-section" id="trabajo">
          <div className="container">
            <div className="work-heading" data-reveal>
              <div>
                <p className="eyebrow light"><span /> Trabajo seleccionado</p>
                <h2>Lo que hacemos habla por nosotros.</h2>
              </div>
              <p>Una muestra de colaboraciones donde la estrategia se convirtió en algo concreto.</p>
            </div>

            <div className="work-grid">
              {featuredProjects.length ? featuredProjects.map((project, index) => (
                <article className={`project project-featured-${index}`} data-reveal data-tilt key={project.id}>
                  <Link className="project-featured-link" href={`/portfolio/${project.slug}`}>
                    <div className="project-art project-art-cover">
                      {project.coverImageUrl ? <Image className="project-cover-image" src={project.coverImageUrl} alt={`${project.client} - proyecto realizado por Manish`} fill sizes="(max-width: 640px) 100vw, 50vw" /> : <span className="project-cover-placeholder">{project.client}</span>}
                      <i className="project-cover-shade" />
                    </div>
                    <div className="project-meta">
                      <div><span>{project.services || "Trabajo destacado"}</span><h3>{project.title}</h3></div>
                      <Arrow diagonal />
                    </div>
                  </Link>
                </article>
              )) : <p className="featured-empty">Elegí hasta tres proyectos destacados desde el dashboard para mostrarlos acá.</p>}
            </div>
            <SectionCta dark label="¿Querés construir el próximo caso?" text="Conversemos sobre la oportunidad detrás de tu marca." />
          </div>
        </section>

        <section className="section manifesto" id="nosotros">
          <div className="container manifesto-grid" data-reveal>
            <p className="eyebrow"><span /> Nuestra forma</p>
              <div>
              <h2>No venimos a llenar espacios. Venimos a encontrar oportunidades.</h2>
              <div className="manifesto-copy">
                <p>
                  Somos un equipo inquieto que hace preguntas, conecta puntos y se involucra de verdad. Pensamos como consultora y ejecutamos como agencia.
                </p>
                <div className="principles">
                  <span><b>01</b> Claridad antes que ruido</span>
                  <span><b>02</b> Ideas que se pueden hacer</span>
                  <span><b>03</b> Resultados compartidos</span>
                </div>
                <SectionCta label="¿Buscás un equipo que se involucre?" text="Traé la pregunta. Nosotros ayudamos a convertirla en un plan." />
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contacto">
          <div className="container contact-inner" data-reveal>
            <p className="eyebrow light"><span /> ¿Tenés algo en mente?</p>
            <h2>Hagamos que pase.</h2>
            <Link className="contact-link" href="/contacto#formulario">
              Contanos tu idea <Arrow diagonal />
            </Link>
            <div className="contact-orb" aria-hidden="true">
              <Image src={brandMark} alt="" width={380} height={380} />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
