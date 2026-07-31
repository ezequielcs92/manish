import Link from "next/link";
import type { Metadata } from "next";
import { getPosts } from "@/lib/admin-content";

export const metadata: Metadata = { title: "Blog" };

export default async function AdminPostsPage({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  const query = await searchParams;
  const result = await getPosts().catch(() => ({ configured: false, posts: [] }));
  return (
    <>
      <header className="admin-page-header compact"><div><p>GESTIÓN EDITORIAL</p><h1>Blog</h1><span>Creá, editá y publicá ideas.</span></div><Link className="admin-primary-link" href="/admin/posts/nuevo">+ Nuevo post</Link></header>
      {query.saved ? <div className="admin-success-banner">Post guardado correctamente.</div> : null}
      {query.deleted ? <div className="admin-success-banner">Post eliminado.</div> : null}
      {!result.configured ? <div className="admin-config-banner"><span>!</span><div><strong>Supabase no está configurado</strong><p>Ejecutá las migraciones para activar este módulo.</p></div></div> : null}
      <section className="admin-panel admin-content-list">
        <div className="admin-content-list-head"><span>{result.posts.length} posts</span><span>Estado</span><span>Actualizado</span></div>
        {result.posts.length ? result.posts.map((post) => <Link href={`/admin/posts/${post.id}`} key={post.id}><div><strong>{post.title}</strong><small>{post.category} · /{post.slug}</small></div><span className={`admin-status status-${post.status === "published" ? "closed" : "new"}`}>{post.status === "published" ? "Publicado" : "Borrador"}</span><time>{new Intl.DateTimeFormat("es-AR", { dateStyle: "medium" }).format(new Date(post.updatedAt))}</time></Link>) : <div className="admin-empty"><span>○</span><h3>No hay posts todavía</h3><p>Creá el primero para empezar el blog.</p></div>}
      </section>
    </>
  );
}
