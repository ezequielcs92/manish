import Link from "next/link";
import { getLeads, getLeadStats } from "@/lib/leads";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-AR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

async function loadDashboardData() {
  try {
    const [stats, latest] = await Promise.all([getLeadStats(), getLeads(5)]);
    return { stats, latest, databaseError: false };
  } catch {
    return {
      stats: { configured: true, total: 0, new: 0, contacted: 0, closed: 0 },
      latest: { configured: true, leads: [] as Awaited<ReturnType<typeof getLeads>>["leads"] },
      databaseError: true,
    };
  }
}

export default async function AdminDashboardPage() {
  const { stats, latest, databaseError } = await loadDashboardData();
  const databaseReady = stats.configured && !databaseError;

  return (
    <>
      <header className="admin-page-header">
        <div><p>VISTA GENERAL</p><h1>Buenas, equipo.</h1><span>Esto es lo que está pasando en Manish.</span></div>
        <Link href="/" target="_blank">Ver sitio <b>↗</b></Link>
      </header>

      {!databaseReady ? (
        <div className="admin-config-banner">
          <span>!</span><div><strong>{databaseError ? "Supabase no responde" : "Conectá Supabase para activar los leads"}</strong><p>Configurá las variables de Supabase y ejecutá las migraciones SQL.</p></div>
        </div>
      ) : null}

      <section className="admin-stat-grid" aria-label="Métricas de leads">
        <article><span>Total de leads</span><strong>{stats.total}</strong><small>Acumulado</small></article>
        <article><span>Nuevos</span><strong>{stats.new}</strong><small>Requieren atención</small></article>
        <article><span>Contactados</span><strong>{stats.contacted}</strong><small>En conversación</small></article>
        <article><span>Cerrados</span><strong>{stats.closed}</strong><small>Finalizados</small></article>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-heading"><div><p>ENTRADAS RECIENTES</p><h2>Últimos leads</h2></div><Link href="/admin/leads">Ver todos →</Link></div>
        {latest.leads.length ? (
          <div className="admin-lead-list">
            {latest.leads.map((lead) => <Link href={`/admin/leads/${lead.id}`} key={lead.id}><span className="lead-avatar">{lead.name.slice(0, 1).toUpperCase()}</span><div><strong>{lead.name}</strong><small>{lead.company || lead.email}</small></div><span className={`admin-status status-${lead.status}`}>{lead.status === "new" ? "Nuevo" : lead.status === "contacted" ? "Contactado" : "Cerrado"}</span><time>{formatDate(lead.createdAt)}</time></Link>)}
          </div>
        ) : <div className="admin-empty"><span>○</span><h3>Todavía no hay consultas</h3><p>Los mensajes del formulario aparecerán acá.</p></div>}
      </section>
    </>
  );
}
