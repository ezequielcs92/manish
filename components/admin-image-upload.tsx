"use client";

import { useState, type ChangeEvent } from "react";

export function AdminImageUpload({ name, label, defaultValue = "" }: { name: string; label: string; defaultValue?: string }) {
  const [url, setUrl] = useState(defaultValue);
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState("");

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setStatus("uploading");
    setError("");
    const body = new FormData();
    body.set("file", file);
    try {
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const result = await response.json() as { url?: string; error?: string };
      if (!response.ok || !result.url) throw new Error(result.error ?? "No se pudo subir");
      setUrl(result.url);
      setStatus("idle");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "No se pudo subir la imagen");
      setStatus("error");
    }
  }

  return (
    <div className="admin-image-field">
      <label><span>{label}</span><input name={name} type="url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://..." /></label>
      {url ? <div className="admin-image-preview" style={{ backgroundImage: `url("${url.replaceAll('"', "%22")}")` }}><button type="button" onClick={() => setUrl("")}>Quitar</button></div> : null}
      <label className="admin-upload-button"><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={upload} disabled={status === "uploading"} /><span>{status === "uploading" ? "Subiendo..." : "Subir imagen"}</span></label>
      <p className="admin-upload-error" aria-live="polite">{error}</p>
    </div>
  );
}
