import Link from "next/link";
import { Logo } from "./logo";

const footerLinks = [
  { href: "/servicios", label: "Servicios" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto#formulario", label: "Contacto" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <Logo />
        <p>Estrategia, creatividad y tecnología<br />desde Buenos Aires.</p>
        <nav className="social-links" aria-label="Navegación del pie">
          {footerLinks.map((link) => (
            <Link href={link.href} key={link.href}>{link.label}</Link>
          ))}
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Manish Agencia Digital</span>
        <Link href="#inicio">Volver arriba ↑</Link>
      </div>
    </footer>
  );
}
