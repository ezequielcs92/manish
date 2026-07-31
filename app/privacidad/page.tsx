import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata(
  "Privacidad",
  "Cómo utiliza Manish Agencia Digital la información enviada desde este sitio.",
  "/privacidad",
);

export default function PrivacyPage() {
  return <><SiteHeader /><main id="inicio" className="legal-page"><div className="container"><p className="eyebrow"><span /> Privacidad</p><h1>Información clara,<br />sin letra chica.</h1><section><h2>Datos de contacto</h2><p>Cuando enviás una consulta, usamos tu nombre, email, empresa, servicio de interés y mensaje únicamente para responderte y dar seguimiento a la conversación.</p><h2>Analítica</h2><p>El sitio puede utilizar medición anónima y sin cookies para entender qué páginas resultan útiles. Respetamos las señales Do Not Track y Global Privacy Control, y nunca enviamos datos del formulario al sistema de analítica.</p><h2>Servicios externos</h2><p>La información puede procesarse mediante proveedores de infraestructura, base de datos y correo necesarios para operar el sitio. No vendemos ni compartimos tus datos con fines publicitarios.</p><h2>Consultas</h2><p>Podés solicitar información, corrección o eliminación de tus datos escribiendo a <a href="mailto:hola@manish.com.ar">hola@manish.com.ar</a>.</p></section></div></main><SiteFooter /></>;
}
