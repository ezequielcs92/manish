import Link from "next/link";
import type { Metadata } from "next";
import { getProjects } from "@/lib/admin-content";

export const metadata: Metadata = { title: "Portfolio" };

export default async function AdminPortfolioPage({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  const query = await searchParams;
  const result = await getProjects().catch(() => ({ configured: false, projects: [] }));
  return (
    <>
      <header className="admin-page-header compact"><div><p>CASOS Y PROYECTOS</p><h1>Portfolio</h1><span>Gestioná el trabajo que muestra Manish.</span></div><Link className="admin-primary-link" href="/admin/portfolio/nuevo">+ Nuevo caso</Link></header>
      {query.saved ? <div className="admin-success-banner">Caso guardado correctamente.</div> : null}
      {query.deleted ? <div className="admin-success-banner">Caso eliminado.</div> : null}
      {!result.configured ? <div className="admin-config-banner"><span>!</span><div><strong>Supabase no está configurado</strong><p>Ejecutá las migraciones para activar este módulo.</p></div></div> : null}
      <section className="admin-panel admin-content-list"><div className="admin-content-list-head"><span>{result.projects.length} casos</span><span>Estado</span><span>Orden</span></div>{result.projects.length ? result.projects.map((project) => <Link href={`/admin/portfolio/${project.id}`} key={project.id}><div><strong>{project.title}</strong><small>{project.client} · {project.services || "Sin categoría"}</small></div><span className={`admin-status status-${project.status === "published" ? "closed" : "new"}`}>{project.status === "published" ? "Publicado" : "Borrador"}</span><time>#{project.sortOrder}</time></Link>) : <div className="admin-empty"><span>○</span><h3>No hay casos todavía</h3><p>Creá el primero para comenzar el portfolio.</p></div>}</section>
    </>
  );
}
