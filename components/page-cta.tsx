import Link from "next/link";

export function PageCta({
  eyebrow = "¿Tenés algo en mente?",
  title = "Hagamos que pase.",
}: {
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="inner-cta">
      <div className="container inner-cta-layout" data-reveal>
        <p className="eyebrow light"><span /> {eyebrow}</p>
        <h2>{title}</h2>
        <Link className="inner-cta-link" href="/contacto#formulario">
          Contanos tu idea
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M9 5h10v10" /></svg>
        </Link>
      </div>
    </section>
  );
}
