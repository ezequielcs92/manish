"use client";

import { useMemo, useState } from "react";

const baseUrl = "https://www.manishagencia.com";

function slug(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

export function UtmBuilder() {
  const [path, setPath] = useState("/");
  const [source, setSource] = useState("google");
  const [medium, setMedium] = useState("cpc");
  const [campaign, setCampaign] = useState("");
  const [content, setContent] = useState("");
  const [term, setTerm] = useState("");
  const [copied, setCopied] = useState(false);
  const url = useMemo(() => {
    const params = new URLSearchParams();
    [["utm_source", source], ["utm_medium", medium], ["utm_campaign", campaign], ["utm_content", content], ["utm_term", term]].forEach(([key, value]) => {
      if (value) params.set(key, slug(value));
    });
    return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}${params.size ? `?${params}` : ""}`;
  }, [campaign, content, medium, path, source, term]);

  async function copyUrl() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return <section className="admin-panel utm-builder"><div className="admin-panel-heading"><div><p>CAMPAÑAS</p><h2>Generador de URLs UTM</h2></div><span>Medición consistente</span></div><div className="utm-form"><label><span>Página de destino</span><input value={path} onChange={(event) => setPath(event.target.value)} placeholder="/contacto" /></label><label><span>Fuente</span><input value={source} onChange={(event) => setSource(event.target.value)} placeholder="google" /></label><label><span>Medio</span><input value={medium} onChange={(event) => setMedium(event.target.value)} placeholder="cpc" /></label><label><span>Campaña</span><input value={campaign} onChange={(event) => setCampaign(event.target.value)} placeholder="servicios_2026" /></label><label><span>Contenido opcional</span><input value={content} onChange={(event) => setContent(event.target.value)} placeholder="anuncio_a" /></label><label><span>Término opcional</span><input value={term} onChange={(event) => setTerm(event.target.value)} placeholder="marketing digital" /></label></div><div className="utm-result"><code>{url}</code><button className="button button-small" type="button" onClick={copyUrl}>{copied ? "Copiada" : "Copiar URL"}</button></div><p className="utm-help">Usá siempre minúsculas y guiones bajos. Ejemplo: fuente <strong>google</strong>, medio <strong>cpc</strong>, campaña <strong>servicios_2026</strong>.</p></section>;
}
