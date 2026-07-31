import Link from "next/link";
import type { PostRecord } from "@/lib/admin-content";
import { deletePostAction, savePostAction } from "@/app/admin/actions";
import { AdminDeleteButton } from "./admin-delete-button";
import { AdminImageUpload } from "./admin-image-upload";
import { AdminRichEditor } from "./admin-rich-editor";

export function AdminPostForm({ post, configured }: { post?: PostRecord | null; configured: boolean }) {
  return (
    <>
      <form className="admin-editor" action={savePostAction}>
        {post ? <input type="hidden" name="id" value={post.id} /> : null}
        <div className="admin-editor-bar">
          <Link href="/admin/posts">← Volver</Link>
          <div>
            <select name="status" defaultValue={post?.status ?? "draft"} aria-label="Estado de publicación">
              <option value="draft">Borrador</option><option value="published">Publicado</option>
            </select>
            <button type="submit" disabled={!configured}>{post ? "Guardar cambios" : "Crear post"}</button>
          </div>
        </div>
        <div className="admin-editor-layout">
          <section className="admin-form-card main-fields">
            <label className="admin-title-field"><span>Título *</span><input name="title" defaultValue={post?.title} placeholder="Título del artículo" required /></label>
            <div className="admin-form-row">
              <label><span>Slug</span><input name="slug" defaultValue={post?.slug} placeholder="se-genera-desde-el-titulo" /></label>
              <label><span>Categoría</span><input name="category" defaultValue={post?.category ?? "Ideas"} placeholder="Estrategia" /></label>
            </div>
            <label><span>Extracto</span><textarea name="excerpt" defaultValue={post?.excerpt} rows={3} maxLength={600} placeholder="Una introducción breve para el listado..." /></label>
            <label><span>Contenido</span><AdminRichEditor name="content" initialValue={post?.content} /></label>
          </section>
          <aside className="admin-form-stack">
            <section className="admin-form-card"><h2>Imagen</h2><AdminImageUpload name="featuredImageUrl" label="Imagen destacada" defaultValue={post?.featuredImageUrl ?? ""} /></section>
            <section className="admin-form-card"><h2>SEO</h2><label><span>Meta title</span><input name="seoTitle" defaultValue={post?.seoTitle ?? ""} maxLength={180} /></label><label><span>Meta description</span><textarea name="seoDescription" defaultValue={post?.seoDescription ?? ""} rows={4} maxLength={320} /></label></section>
            {!configured ? <div className="admin-form-warning">Conectá Supabase para guardar.</div> : null}
          </aside>
        </div>
      </form>
      {post ? <div className="admin-danger-zone"><div><strong>Eliminar post</strong><p>Se borrará definitivamente de la base.</p></div><AdminDeleteButton id={post.id} action={deletePostAction} label="Eliminar" /></div> : null}
    </>
  );
}
