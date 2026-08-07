import Link from "next/link";
import type { ProjectRecord } from "@/lib/admin-content";
import { deleteProjectAction, saveProjectAction } from "@/app/admin/actions";
import { AdminDeleteButton } from "./admin-delete-button";
import { AdminImageUpload } from "./admin-image-upload";
import { AdminRichEditor } from "./admin-rich-editor";

export function AdminProjectForm({ project, configured }: { project?: ProjectRecord | null; configured: boolean }) {
  const categories = [["redes", "Manejo de redes"], ["contenido", "Creación de contenido"], ["diseno", "Diseño gráfico"], ["desarrollo", "Desarrollo"], ["ads", "Ads"]] as const;
  return (
    <>
      <form className="admin-editor" action={saveProjectAction}>
        {project ? <input type="hidden" name="id" value={project.id} /> : null}
        <div className="admin-editor-bar">
          <Link href="/admin/portfolio">← Volver</Link>
          <div><select name="status" defaultValue={project?.status ?? "draft"}><option value="draft">Borrador</option><option value="published">Publicado</option></select><button type="submit" disabled={!configured}>{project ? "Guardar cambios" : "Crear caso"}</button></div>
        </div>
        <div className="admin-editor-layout">
          <section className="admin-form-card main-fields">
            <label className="admin-title-field"><span>Nombre del caso *</span><input name="title" defaultValue={project?.title} placeholder="Goût Pâtisserie" required /></label>
            <div className="admin-form-row"><label><span>Cliente *</span><input name="client" defaultValue={project?.client} required /></label><label><span>Slug</span><input name="slug" defaultValue={project?.slug} placeholder="gout-patisserie" /></label></div>
            <label><span>Resumen</span><textarea name="summary" defaultValue={project?.summary} rows={4} placeholder="Contexto y objetivo del proyecto..." /></label>
            <label><span>Detalle del caso</span><AdminRichEditor name="content" initialValue={project?.content} /></label>
          </section>
          <aside className="admin-form-stack">
            <section className="admin-form-card"><h2>Clasificación</h2><label><span>Servicios / detalle</span><input name="services" defaultValue={project?.services} placeholder="Diseño gráfico · Redes sociales" /></label><fieldset className="admin-category-field"><legend>Categorías seleccionadas</legend>{categories.map(([value, label]) => <label key={value}><input name="categories" type="checkbox" value={value} defaultChecked={project?.categories.includes(value)} /><span>{label}</span></label>)}</fieldset><label className="admin-featured-toggle"><input name="isFeatured" type="checkbox" defaultChecked={project?.isFeatured} /><span>Mostrar en el Home como trabajo destacado <small>Podés elegir hasta 3 proyectos.</small></span></label><div className="admin-form-row"><label><span>Año</span><input name="year" defaultValue={project?.year ?? new Date().getFullYear()} /></label><label><span>Orden</span><input name="sortOrder" type="number" defaultValue={project?.sortOrder ?? 0} /></label></div></section>
            <section className="admin-form-card"><h2>Portada</h2><AdminImageUpload name="coverImageUrl" label="Imagen de portada" defaultValue={project?.coverImageUrl ?? ""} /></section>
            {!configured ? <div className="admin-form-warning">Conectá Supabase para guardar.</div> : null}
          </aside>
        </div>
      </form>
      {project ? <div className="admin-danger-zone"><div><strong>Eliminar caso</strong><p>Se borrará definitivamente de la base.</p></div><AdminDeleteButton id={project.id} action={deleteProjectAction} label="Eliminar" /></div> : null}
    </>
  );
}
