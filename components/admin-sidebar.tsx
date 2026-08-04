"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { getSupabaseBrowser } from "@/lib/supabase/browser";

const links = [
  { href: "/admin", label: "Resumen", icon: "grid" },
  { href: "/admin/leads", label: "Leads", icon: "inbox" },
  { href: "/admin/analitica", label: "Analítica", icon: "analytics" },
  { href: "/admin/posts", label: "Blog", icon: "edit" },
  { href: "/admin/portfolio", label: "Portfolio", icon: "folder" },
  { href: "/admin/sitio", label: "Sitio", icon: "site" },
];

function NavIcon({ name }: { name: string }) {
  if (name === "inbox") return <svg viewBox="0 0 24 24"><path d="M4 5h16v14H4zM4 14h5l2 2h2l2-2h5" /></svg>;
  if (name === "edit") return <svg viewBox="0 0 24 24"><path d="M5 19h4L19 9l-4-4L5 15v4ZM13 7l4 4" /></svg>;
  if (name === "folder") return <svg viewBox="0 0 24 24"><path d="M3 6h7l2 2h9v11H3z" /></svg>;
  if (name === "site") return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></svg>;
  if (name === "analytics") return <svg viewBox="0 0 24 24"><path d="M5 19V9M12 19V5M19 19v-7" /></svg>;
  return <svg viewBox="0 0 24 24"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" /></svg>;
}

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await getSupabaseBrowser().auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <aside className="admin-sidebar">
      <Link href="/admin" className="admin-brand"><Logo /></Link>
      <nav aria-label="Navegación administrativa">
        {links.map((link) => {
          const active = link.href === "/admin" ? pathname === link.href : pathname.startsWith(link.href);
          return <Link href={link.href} className={active ? "active" : ""} key={link.href}><NavIcon name={link.icon} />{link.label}</Link>;
        })}
      </nav>
      <div className="admin-side-actions"><ThemeToggle /><Link href="/" target="_blank" title="Abrir sitio">↗</Link></div>
      <div className="admin-user">
        <span>{email.slice(0, 1).toUpperCase()}</span>
        <div><strong>Administrador</strong><small>{email}</small></div>
        <button type="button" onClick={logout} aria-label="Cerrar sesión" title="Cerrar sesión">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5H5v14h5M14 8l4 4-4 4M8 12h10" /></svg>
        </button>
      </div>
    </aside>
  );
}
