import Link from "next/link";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <main className="not-found">
      <Link href="/"><Logo /></Link>
      <div className="not-found-orbit" aria-hidden="true"><span>404</span><i /><i /></div>
      <div>
        <p>ESTA RUTA NO LLEGÓ A DESTINO</p>
        <h1>Nos movimos<br />demasiado rápido.</h1>
        <Link className="button" href="/">Volver al inicio →</Link>
      </div>
    </main>
  );
}
