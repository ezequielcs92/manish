import Image from "next/image";
import brandMark from "@/branding/logos/logo dibujo.svg";

export function Logo() {
  return (
    <span className="logo" aria-label="Manish">
      <Image
        className="logo-mark"
        src={brandMark}
        alt=""
        width={42}
        height={42}
        priority
      />
      <span className="logo-type">
        <strong>MANISH</strong>
        <small>Agencia digital</small>
      </span>
    </span>
  );
}
