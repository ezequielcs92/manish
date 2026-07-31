import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Contenido" };

const modules = [
  ["Blog", "Posts, borradores, categorías y SEO.", "/admin/posts"],
  ["Portfolio", "Casos, piezas visuales y resultados.", "/admin/portfolio"],
  ["Sitio", "Mensajes principales y canales de contacto.", "/admin/sitio"],
];

export default function AdminContentPage() {
  return (
    <>
      <header className="admin-page-header compact"><div><p>GESTIÓN EDITORIAL</p><h1>Contenido</h1><span>Una base preparada para publicar sin tocar código.</span></div></header>
      <section className="admin-module-grid">
        {modules.map(([title, description, href], index) => <Link href={href} key={title}><article><span>0{index + 1}</span><div><h2>{title}</h2><p>{description}</p></div><small>Abrir módulo →</small></article></Link>)}
      </section>
    </>
  );
}
