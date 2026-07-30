import Link from "next/link";

export function SectionCta({
  label,
  text,
  dark = false,
}: {
  label: string;
  text: string;
  dark?: boolean;
}) {
  return (
    <div className={`section-action${dark ? " section-action-dark" : ""}`} data-reveal>
      <p><span>{label}</span>{text}</p>
      <Link href="/contacto#formulario">
        Empecemos
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h14m-5-5 5 5-5 5" /></svg>
      </Link>
    </div>
  );
}
