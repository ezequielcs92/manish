import Link from "next/link";
import { notFound } from "next/navigation";
import { updateLeadAction } from "@/app/admin/actions";
import { getLead } from "@/lib/leads";

export default async function AdminLeadDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  const { id } = await params;
  const query = await searchParams;
  const result = await getLead(id).catch(() => ({ configured: true, lead: null }));
  if (result.configured && !result.lead) notFound();
  const lead = result.lead;

  return (
    <>
      <div className="admin-editor-bar standalone"><Link href="/admin/leads">← Volver a leads</Link>{query.saved ? <span className="admin-saved">Cambios guardados</span> : null}</div>
      {lead ? (
        <div className="lead-detail-layout">
          <section className="admin-form-card lead-detail-main">
            <div className="lead-detail-heading"><span className="lead-avatar large">{lead.name.slice(0, 1).toUpperCase()}</span><div><p>{lead.company || "Contacto particular"}</p><h1>{lead.name}</h1></div></div>
            <dl><div><dt>Email</dt><dd><a href={`mailto:${lead.email}`}>{lead.email}</a></dd></div><div><dt>Interés</dt><dd>{lead.service}</dd></div><div><dt>Recibido</dt><dd>{new Intl.DateTimeFormat("es-AR", { dateStyle: "long", timeStyle: "short" }).format(new Date(lead.createdAt))}</dd></div></dl>
            <div className="lead-original-message"><span>MENSAJE ORIGINAL</span><p>{lead.message}</p></div>
          </section>
          <form className="admin-form-card lead-management" action={updateLeadAction}>
            <input type="hidden" name="id" value={lead.id} />
            <h2>Seguimiento</h2>
            <label><span>Estado</span><select name="status" defaultValue={lead.status}><option value="new">Nuevo</option><option value="contacted">Contactado</option><option value="closed">Cerrado</option></select></label>
            <label><span>Notas internas</span><textarea name="notes" defaultValue={lead.notes ?? ""} rows={12} placeholder="Contexto, próximos pasos, acuerdos..." /></label>
            <button type="submit">Guardar seguimiento</button>
          </form>
        </div>
      ) : <div className="admin-config-banner"><span>!</span><div><strong>Supabase no está configurado</strong><p>Conectá la base para consultar este lead.</p></div></div>}
    </>
  );
}
