import type { Metadata } from "next";
import Link from "next/link";
import { getLeads } from "@/lib/leads";

export const metadata: Metadata = { title: "Leads" };

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-AR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

async function loadLeads() {
  try {
    return { result: await getLeads(), databaseError: false };
  } catch {
    return {
      result: { configured: true, leads: [] as Awaited<ReturnType<typeof getLeads>>["leads"] },
      databaseError: true,
    };
  }
}

export default async function AdminLeadsPage() {
  const { result, databaseError } = await loadLeads();

  return (
    <>
      <header className="admin-page-header compact">
        <div><p>CRM LIVIANO</p><h1>Leads</h1><span>Consultas recibidas desde el sitio.</span></div>
      </header>

      {!result.configured || databaseError ? <div className="admin-config-banner"><span>!</span><div><strong>La bandeja todavía no está conectada</strong><p>Configurá Supabase para comenzar a guardar consultas.</p></div></div> : null}

      <section className="admin-panel leads-panel">
        <div className="admin-table-tools"><p>{result.leads.length} contactos</p><div><span>Todos</span><span>Nuevos</span><span>Contactados</span><span>Cerrados</span></div></div>
        {result.leads.length ? (
          <div className="admin-table-wrap"><table><thead><tr><th>Contacto</th><th>Interés</th><th>Mensaje</th><th>Estado</th><th>Fecha</th></tr></thead><tbody>{result.leads.map((lead) => <tr key={lead.id}><td><Link href={`/admin/leads/${lead.id}`}><strong>{lead.name}</strong><small>{lead.company || lead.email}</small></Link></td><td>{lead.service}</td><td><span className="lead-message">{lead.message}</span></td><td><span className={`admin-status status-${lead.status}`}>{lead.status === "new" ? "Nuevo" : lead.status === "contacted" ? "Contactado" : "Cerrado"}</span></td><td>{formatDate(lead.createdAt)}</td></tr>)}</tbody></table></div>
        ) : <div className="admin-empty"><span>○</span><h3>Bandeja vacía</h3><p>Los próximos leads aparecerán en esta tabla.</p></div>}
      </section>
    </>
  );
}
