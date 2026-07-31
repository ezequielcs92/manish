import type { Metadata } from "next";
import { saveSiteContentAction } from "@/app/admin/actions";
import { getSiteContent } from "@/lib/admin-content";

export const metadata: Metadata = { title: "Contenido del sitio" };

const defaults: Record<string, string> = {
  home_eyebrow: "Agencia digital · Ideas en movimiento",
  home_title_line_1: "Ideas que",
  home_title_line_2: "mueven marcas.",
  home_description: "Unimos estrategia, creatividad y tecnología para convertir desafíos de negocio en experiencias que hacen avanzar.",
  contact_email: "hola@manish.com.ar",
  whatsapp_url: "",
  instagram_url: "",
  linkedin_url: "",
};

export default async function AdminSitePage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const query = await searchParams;
  const result = await getSiteContent().catch(() => ({ configured: false, content: {} as Record<string, string> }));
  const value = (key: string) => result.content[key] ?? defaults[key];
  return (
    <>
      <header className="admin-page-header compact"><div><p>CONTENIDO GLOBAL</p><h1>Sitio</h1><span>Editá mensajes y canales principales.</span></div></header>
      {query.saved ? <div className="admin-success-banner">Contenido actualizado.</div> : null}
      {!result.configured ? <div className="admin-config-banner"><span>!</span><div><strong>Supabase no está configurado</strong><p>El formulario queda en modo lectura hasta conectar la base.</p></div></div> : null}
      <form className="admin-site-form" action={saveSiteContentAction}>
        <section className="admin-form-card"><div className="admin-form-section-heading"><span>01</span><div><h2>Hero de la Home</h2><p>El primer mensaje que ve cada visitante.</p></div></div><label><span>Etiqueta superior</span><input name="home_eyebrow" defaultValue={value("home_eyebrow")} /></label><div className="admin-form-row"><label><span>Primera línea</span><input name="home_title_line_1" defaultValue={value("home_title_line_1")} /></label><label><span>Segunda línea destacada</span><input name="home_title_line_2" defaultValue={value("home_title_line_2")} /></label></div><label><span>Descripción</span><textarea name="home_description" rows={4} defaultValue={value("home_description")} /></label></section>
        <section className="admin-form-card"><div className="admin-form-section-heading"><span>02</span><div><h2>Contacto y redes</h2><p>Canales que aparecen en el sitio.</p></div></div><label><span>Email público</span><input name="contact_email" type="email" defaultValue={value("contact_email")} /></label><label><span>WhatsApp</span><input name="whatsapp_url" type="url" defaultValue={value("whatsapp_url")} placeholder="https://wa.me/..." /></label><div className="admin-form-row"><label><span>Instagram</span><input name="instagram_url" type="url" defaultValue={value("instagram_url")} /></label><label><span>LinkedIn</span><input name="linkedin_url" type="url" defaultValue={value("linkedin_url")} /></label></div></section>
        <div className="admin-site-save"><p>Los cambios de contenido se reflejarán al regenerar las páginas conectadas.</p><button type="submit" disabled={!result.configured}>Guardar contenido</button></div>
      </form>
    </>
  );
}
