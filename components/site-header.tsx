import Link from "next/link";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/servicios", label: "Servicios" },
  { href: "/portfolio", label: "Trabajo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="logo-link" href="/">
          <Logo />
        </Link>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <Link className="button button-small header-cta" href="/contacto#formulario">
            Hablemos
          </Link>
          <details className="mobile-menu">
            <summary aria-label="Abrir menú">
              <span />
              <span />
            </summary>
            <nav aria-label="Navegación móvil">
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
              <Link href="/contacto#formulario">Contacto</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
