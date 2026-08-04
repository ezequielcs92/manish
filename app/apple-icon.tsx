/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export const runtime = "nodejs";

export default async function AppleIcon() {
  const logo = await readFile(join(process.cwd(), "branding", "logos", "logo dibujo.png (1).png"));
  const logoUrl = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(<div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", borderRadius: 36, overflow: "hidden", background: "#10081b" }}><img src={logoUrl} style={{ width: "180px", height: "180px" }} alt="" /></div>, size);
}
