import { getAnalyticsReport } from "@/lib/google-analytics";

export const dynamic = "force-dynamic";

const number = new Intl.NumberFormat("es-AR");

function Ranking({ title, rows }: { title: string; rows: { label: string; value: number }[] }) {
  const max = Math.max(...rows.map((row) => row.value), 1);
  return <section className="admin-panel analytics-ranking"><div className="admin-panel-heading"><div><p>ÚLTIMOS 30 DÍAS</p><h2>{title}</h2></div></div>{rows.length ? <div className="analytics-ranking-list">{rows.map((row) => <div key={row.label}><div><span>{row.label}</span><strong>{number.format(row.value)}</strong></div><i><b style={{ width: `${Math.max((row.value / max) * 100, 4)}%` }} /></i></div>)}</div> : <div className="admin-empty"><span>○</span><h3>Sin datos todavía</h3><p>Cuando GA4 reciba visitas, aparecerán acá.</p></div>}</section>;
}

export default async function AnalyticsPage() {
  const report = await getAnalyticsReport();
  const hasError = report.configured && !report.summary.activeUsers && !report.summary.sessions && !report.summary.pageViews && !report.summary.events;
  return <>
    <header className="admin-page-header compact"><div><p>MEDICIÓN</p><h1>Analítica</h1><span>Una lectura clara de lo que mueve el sitio.</span></div><a href="https://analytics.google.com" target="_blank" rel="noreferrer">Abrir GA4 <b>↗</b></a></header>
    {!report.configured ? <div className="admin-config-banner"><span>!</span><div><strong>Conectá Google Analytics</strong><p>Agregá <code>GA_PROPERTY_ID</code>, <code>GOOGLE_SERVICE_ACCOUNT_EMAIL</code> y <code>GOOGLE_PRIVATE_KEY</code> en Vercel.</p></div></div> : null}
    {hasError ? <div className="admin-config-banner"><span>!</span><div><strong>GA4 está conectado, pero no hay datos disponibles</strong><p>Verificá que la cuenta de servicio tenga rol Lector en la propiedad correcta.</p></div></div> : null}
    <section className="admin-stat-grid analytics-stat-grid" aria-label="Resumen de analítica"><article><span>Usuarios activos</span><strong>{number.format(report.summary.activeUsers)}</strong><small>Últimos 30 días</small></article><article><span>Sesiones</span><strong>{number.format(report.summary.sessions)}</strong><small>Últimos 30 días</small></article><article><span>Páginas vistas</span><strong>{number.format(report.summary.pageViews)}</strong><small>Últimos 30 días</small></article><article><span>Consultas</span><strong>{number.format(report.leads)}</strong><small>Evento generate_lead</small></article></section>
    <div className="analytics-columns"><Ranking title="Páginas más visitadas" rows={report.pages} /><Ranking title="Canales de adquisición" rows={report.channels} /></div>
  </>;
}
