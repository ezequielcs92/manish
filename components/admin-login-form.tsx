"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowser } from "@/lib/supabase/browser";

export function AdminLoginForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");
    const form = new FormData(event.currentTarget);

    try {
      const supabase = getSupabaseBrowser();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: String(form.get("email") ?? ""),
        password: String(form.get("password") ?? ""),
      });
      if (authError) throw new Error("Email o contraseña incorrectos");
      const role = data.user.app_metadata?.role;
      if (role !== "admin" && role !== "editor") {
        await supabase.auth.signOut();
        throw new Error("Este usuario no tiene acceso al dashboard");
      }
      router.replace("/admin");
      router.refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "No se pudo iniciar sesión");
      setStatus("error");
    }
  }

  return (
    <form className="admin-login-form" onSubmit={handleSubmit}>
      <label>
        <span>Email</span>
        <input type="email" name="email" autoComplete="username" placeholder="admin@manishagencia.com" required autoFocus />
      </label>
      <label>
        <span>Contraseña</span>
        <input type="password" name="password" autoComplete="current-password" placeholder="••••••••••••" required />
      </label>
      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Verificando..." : "Entrar al dashboard"}
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h14m-5-5 5 5-5 5" /></svg>
      </button>
      <p className="admin-form-error" aria-live="polite">{error}</p>
    </form>
  );
}
