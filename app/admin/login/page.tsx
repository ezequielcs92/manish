import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin-login-form";
import { Logo } from "@/components/logo";
import { getAdminSession } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Acceso administrativo",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");

  return (
    <main className="admin-login-page">
      <div className="admin-login-visual" aria-hidden="true">
        <div className="admin-login-orbit"><span>GESTIONAR</span><i /><i /></div>
        <p>ESTRATEGIA · CONTENIDO · DATOS</p>
      </div>
      <section className="admin-login-panel">
        <Logo />
        <div>
          <p className="admin-kicker">ACCESO PRIVADO</p>
          <h1>Volvé a tener<br />todo a la vista.</h1>
          <p>Ingresá para gestionar consultas y contenidos de Manish.</p>
        </div>
        <AdminLoginForm />
      </section>
    </main>
  );
}
