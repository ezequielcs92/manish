import type { Metadata } from "next";
import { PageCta } from "@/components/page-cta";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SectionCta } from "@/components/section-cta";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata("Servicios", "Marketing, contenido, creatividad y tecnología conectados para hacer crecer marcas y negocios.", "/servicios");

const groups = [
  {
    number: "01",
    title: "Marketing digital",
    description: "Encontramos dónde está la oportunidad, diseñamos el recorrido y medimos lo que realmente mueve el negocio.",
    services: [
      ["Estrategia digital", "Diagnóstico, posicionamiento, objetivos y roadmap para ordenar esfuerzos y acelerar decisiones."],
      ["Social media", "Estrategia de canales, planificación, gestión de comunidad y contenido pensado para cada plataforma."],
      ["Paid media", "Campañas en Meta y Google Ads con optimización continua enfocada en resultados."],
      ["SEO y contenidos", "Arquitectura, investigación y contenido para construir visibilidad orgánica sostenible."],
      ["Email marketing", "Automatizaciones y campañas que acompañan cada etapa de la relación con tus clientes."],
      ["Analítica", "Tableros y reportes que transforman datos dispersos en decisiones claras."],
    ],
  },
  {
    number: "02",
    title: "Contenido y creatividad",
    description: "Construimos una voz reconocible y la llevamos a piezas que capturan atención sin perder sentido.",
    services: [
      ["Branding", "Identidad visual, sistemas de marca y lineamientos para crecer con consistencia."],
      ["Contenido nativo y UGC", "Conceptos y piezas que entienden el lenguaje real de cada comunidad."],
      ["Diseño gráfico", "Campañas, presentaciones y sistemas visuales que organizan y potencian el mensaje."],
      ["Edición y audiovisual", "Video corto, piezas de campaña y narrativas audiovisuales para múltiples formatos."],
      ["Fotografía de producto", "Dirección, producción y retoque para mostrar productos con una mirada propia."],
    ],
  },
  {
    number: "03",
    title: "Desarrollo y tecnología",
    description: "Diseñamos productos y sistemas digitales que se sienten simples por fuera y trabajan en serio por dentro.",
    services: [
      ["Webs, apps y juegos", "Experiencias rápidas, accesibles y diseñadas alrededor de objetivos concretos."],
      ["E-commerce", "Tiendas que conectan catálogo, contenido, operación y conversión."],
      ["Automatizaciones e IA", "Flujos inteligentes que reducen tareas repetitivas y mejoran tiempos de respuesta."],
      ["Software a medida", "Herramientas internas, intranets y plataformas adaptadas a procesos reales."],
      ["Mantenimiento", "Evolución, performance, seguridad y soporte para productos digitales existentes."],
    ],
  },
];

export default function ServiciosPage() {
  return (
    <>
      <SiteHeader />
      <main id="inicio">
        <PageHero
          index="01"
          kicker="Servicios"
          title={<>Tres disciplinas.<br /><em>Un mismo equipo.</em></>}
          description="Conectamos pensamiento, expresión y ejecución para que cada parte del proyecto empuje en la misma dirección."
          tags={["Pensar", "Crear", "Construir"]}
        />

        <section className="inner-section services-intro">
          <div className="container inner-statement" data-reveal>
            <p>NO HACEMOS PAQUETES CERRADOS</p>
            <h2>Armamos el equipo y el sistema que cada desafío necesita.</h2>
          </div>
        </section>

        <div className="offering-list">
          {groups.map((group) => (
            <section className="offering-section" key={group.number}>
              <div className="container offering-layout">
                <div className={`offering-title offering-title-${group.number}`} data-reveal>
                  <span>{group.number}</span>
                  <h2>{group.number === "03" ? <>Desarrollo y<br />tecnología</> : group.title}</h2>
                  <p>{group.description}</p>
                  <SectionCta label="¿Es lo que necesitás?" text={`Conversemos sobre ${group.title.toLowerCase()} para tu marca.`} />
                </div>
                <div className="service-accordion" data-reveal>
                  {group.services.map(([title, description], index) => (
                    <details key={title} open={index === 0}>
                      <summary><span>{String(index + 1).padStart(2, "0")}</span>{title}<i>+</i></summary>
                      <p>{description}</p>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="inner-section process-section">
          <div className="container">
            <div className="inner-heading" data-reveal>
              <p className="eyebrow"><span /> Cómo trabajamos</p>
              <h2>Menos capas.<br />Más movimiento.</h2>
            </div>
            <div className="process-grid">
              {[
                ["01", "Entender", "Nos metemos en el negocio, el contexto y las preguntas que importan."],
                ["02", "Definir", "Convertimos información en una dirección clara y un plan accionable."],
                ["03", "Hacer", "Diseñamos, producimos y construimos con equipos conectados."],
                ["04", "Aprender", "Medimos, compartimos lo aprendido y mejoramos la siguiente versión."],
              ].map(([number, title, text]) => (
                <article key={number} data-reveal>
                  <span>{number}</span><h3>{title}</h3><p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <PageCta title="¿Qué necesita moverse?" />
      </main>
      <SiteFooter />
    </>
  );
}
