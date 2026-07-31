"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Contact request failed");
      const analytics = (window as Window & { umami?: { track: (event: string) => void } }).umami;
      analytics?.track("contact_submit_success");
      form.reset();
      router.push("/gracias");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} id="formulario" aria-busy={status === "submitting"}>
      <label className="form-honeypot" aria-hidden="true">
        <span>Sitio web</span>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="form-row">
        <label>
          <span>Nombre *</span>
          <input name="name" type="text" autoComplete="name" placeholder="¿Cómo te llamás?" required />
        </label>
        <label>
          <span>Empresa</span>
          <input name="company" type="text" autoComplete="organization" placeholder="Tu marca o empresa" />
        </label>
      </div>
      <div className="form-row">
        <label>
          <span>Email *</span>
          <input name="email" type="email" autoComplete="email" placeholder="nombre@empresa.com" required />
        </label>
        <label>
          <span>¿En qué podemos ayudarte? *</span>
          <select name="service" defaultValue="" required>
            <option value="" disabled>Elegí una opción</option>
            <option>Marketing digital</option>
            <option>Contenido y creatividad</option>
            <option>Desarrollo y tecnología</option>
            <option>Un proyecto integral</option>
            <option>Otro</option>
          </select>
        </label>
      </div>
      <label>
        <span>Contanos un poco más *</span>
        <textarea name="message" rows={6} placeholder="Objetivos, tiempos, contexto..." required />
      </label>
      <div className="form-submit">
        <p>Usaremos tus datos únicamente para responder esta consulta.</p>
        <button className="button" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Enviando..." : "Enviar consulta"}
          <svg className="arrow-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h14m-5-5 5 5-5 5" /></svg>
        </button>
      </div>
      <p className="form-feedback" aria-live="polite" role={status === "error" ? "alert" : undefined}>
        {status === "error" ? "No pudimos enviar el mensaje. Intentá nuevamente o escribinos por email." : ""}
      </p>
    </form>
  );
}
