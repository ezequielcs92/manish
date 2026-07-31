import { ImageResponse } from "next/og";

export const alt = "Manish Agencia Digital - Estrategia, creatividad y tecnología";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", flexDirection: "column", justifyContent: "space-between", overflow: "hidden", padding: "72px 80px", background: "#10081b", color: "white" }}>
      <div style={{ display: "flex", color: "#7772ff", fontSize: 34, fontWeight: 800, letterSpacing: 3 }}>MANISH / AGENCIA DIGITAL</div>
      <div style={{ display: "flex", maxWidth: 900, flexDirection: "column", fontSize: 76, fontWeight: 800, lineHeight: 1.03 }}>
        <span>Estrategia, creatividad</span><span style={{ color: "#ed43f0" }}>y tecnología.</span>
      </div>
      <div style={{ display: "flex", fontSize: 24, color: "#dbc8ea" }}>Ideas que mueven marcas y negocios.</div>
      <div style={{ position: "absolute", right: -120, top: -100, width: 460, height: 460, border: "2px solid #4943f0", borderRadius: "50%" }} />
    </div>,
    size,
  );
}
