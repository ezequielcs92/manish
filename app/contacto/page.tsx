import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contanos qué querés construir y empecemos una conversación.",
};

export default function ContactoPage() {
  return (
    <>
      <SiteHeader />
      <main id="inicio">
        <PageHero
          index="04"
          kicker="Contacto"
          title={<>Una buena idea empieza<br /><em>con una conversación.</em></>}
          description="Contanos dónde estás, qué querés mover y qué necesitás destrabar. Nosotros hacemos las preguntas que siguen."
          tags={["Hola", "Hablemos", "Empecemos"]}
        />

        <section className="inner-section contact-page-section">
          <div className="container contact-page-layout">
            <aside data-reveal>
              <p className="eyebrow"><span /> Escribinos</p>
              <h2>¿Qué podemos hacer juntos?</h2>
              <div className="contact-details">
                <div><span>Email</span><a href="mailto:hola@manish.com.ar">hola@manish.com.ar</a></div>
                <div><span>Base</span><p>Buenos Aires · Argentina</p></div>
                <div><span>Horario</span><p>Lunes a viernes · 9 a 18 h</p></div>
              </div>
            </aside>
            <div data-reveal><ContactForm /></div>
          </div>
        </section>

        <section className="contact-note">
          <div className="container" data-reveal>
            <span>¿TENÉS UNA CONSULTA RÁPIDA?</span>
            <p>También podés escribirnos directamente. Respondemos cada mensaje de forma personal.</p>
            <a href="mailto:hola@manish.com.ar">ENVIAR UN EMAIL ↗</a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
