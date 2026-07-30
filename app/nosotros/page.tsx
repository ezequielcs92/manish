import Image from "next/image";
import type { Metadata } from "next";
import brandMark from "@/branding/logos/logo dibujo.svg";
import { PageCta } from "@/components/page-cta";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conocé la forma de pensar y trabajar de Manish Agencia Digital.",
};

export default function NosotrosPage() {
  return (
    <>
      <SiteHeader />
      <main id="inicio">
        <PageHero
          index="03"
          kicker="Nosotros"
          title={<>Inquietos por naturaleza.<br /><em>Concretos por elección.</em></>}
          description="Somos una agencia independiente que conecta estrategia, creatividad y tecnología para transformar preguntas complejas en avances concretos."
          tags={["Curiosidad", "Criterio", "Acción"]}
        />

        <section className="inner-section about-manifesto">
          <div className="container about-manifesto-layout">
            <p className="vertical-label">MANISH · AGENCIA DIGITAL</p>
            <div data-reveal>
              <p className="eyebrow"><span /> Lo que creemos</p>
              <h2>Las mejores ideas no aparecen por accidente. Se construyen haciendo las preguntas correctas.</h2>
              <div className="about-columns">
                <p>Nos involucramos en el negocio antes de pensar en formatos. Entendemos el problema, encontramos la tensión y recién entonces elegimos qué hacer.</p>
                <p>Trabajamos con equipos conectados y procesos claros. Sin capas innecesarias entre quien piensa, quien crea y quien construye.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="culture-section">
          <div className="container culture-layout">
            <div className="culture-object" data-tilt aria-hidden="true">
              <div className="culture-disc disc-one" /><div className="culture-disc disc-two" />
              <Image src={brandMark} alt="" width={330} height={330} />
            </div>
            <div className="culture-values">
              <p className="eyebrow light"><span /> Cómo somos</p>
              {[
                ["01", "Curiosos", "Preguntamos hasta encontrar lo que los demás pasan por alto."],
                ["02", "Directos", "Compartimos criterio, avances y problemas sin vueltas."],
                ["03", "Flexibles", "El proceso se adapta al desafío, no al revés."],
                ["04", "Responsables", "Nos hacemos cargo del trabajo y también de su impacto."],
              ].map(([number, title, text]) => (
                <article key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="inner-section team-section">
          <div className="container inner-heading" data-reveal>
            <p className="eyebrow"><span /> Un equipo, muchas miradas</p>
            <h2>Especialistas cuando hace falta.<br />Compañeros siempre.</h2>
          </div>
          <div className="role-marquee" aria-label="Disciplinas del equipo">
            <div>
              <span>Estrategia</span><i>✦</i><span>Diseño</span><i>✦</i><span>Contenido</span><i>✦</i><span>Desarrollo</span><i>✦</i><span>Performance</span><i>✦</i>
              <span>Estrategia</span><i>✦</i><span>Diseño</span><i>✦</i><span>Contenido</span><i>✦</i><span>Desarrollo</span><i>✦</i><span>Performance</span><i>✦</i>
            </div>
          </div>
        </section>

        <PageCta eyebrow="¿Trabajamos juntos?" title="Nos interesa tu desafío." />
      </main>
      <SiteFooter />
    </>
  );
}
