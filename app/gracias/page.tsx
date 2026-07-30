import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Gracias",
  description: "Recibimos tu consulta. El equipo de Manish se pondrá en contacto.",
  robots: { index: false, follow: false },
};

export default function GraciasPage() {
  return (
    <>
      <SiteHeader />
      <main id="inicio">
        <PageHero
          index="✓"
          kicker="Mensaje recibido"
          title={<>Gracias por<br /><em>dar el primer paso.</em></>}
          description="Tu consulta ya está con nosotros. Vamos a leerla con atención y responderte personalmente."
          tags={["Recibido", "En revisión", "Hablamos pronto"]}
        />

        <section className="inner-section thank-you-section">
          <div className="container thank-you-layout" data-reveal>
            <div>
              <p className="eyebrow"><span /> Qué sigue</p>
              <h2>Mientras preparamos la respuesta, podés conocer un poco más de nuestro trabajo.</h2>
            </div>
            <div className="thank-you-actions">
              <Link href="/portfolio"><span>01</span>Explorar portfolio <b>↗</b></Link>
              <Link href="/servicios"><span>02</span>Ver servicios <b>↗</b></Link>
              <Link href="/"><span>03</span>Volver al inicio <b>↗</b></Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
