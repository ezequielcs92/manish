import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteContent } from "@/lib/admin-content";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata("Contacto", "Contanos qué querés construir y empecemos una conversación.", "/contacto");

export default async function ContactoPage() {
  const content = await getSiteContent().then((result) => result.content).catch(() => ({} as Record<string, string>));
  const contactEmail = content.contact_email || "hola@manish.com.ar";

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
                <div><span>Email</span><a href={`mailto:${contactEmail}`}>{contactEmail}</a></div>
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
            <a href={`mailto:${contactEmail}`}>ENVIAR UN EMAIL ↗</a>
          </div>
        </section>
        {content.whatsapp_url || content.instagram_url || content.linkedin_url ? (
          <nav className="contact-socials" aria-label="Canales sociales">
            <div className="container">
              {content.whatsapp_url ? <a href={content.whatsapp_url} target="_blank" rel="noreferrer">WhatsApp ↗</a> : null}
              {content.instagram_url ? <a href={content.instagram_url} target="_blank" rel="noreferrer">Instagram ↗</a> : null}
              {content.linkedin_url ? <a href={content.linkedin_url} target="_blank" rel="noreferrer">LinkedIn ↗</a> : null}
            </div>
          </nav>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}
