import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", borderRadius: 36, background: "#4943f0", color: "white", fontSize: 120, fontWeight: 800 }}>M</div>, size);
}
