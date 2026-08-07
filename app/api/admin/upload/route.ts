import { randomUUID } from "node:crypto";
import sharp from "sharp";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/db";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);

export async function POST(request: Request) {
  if (!await getAdminSession()) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase no configurado" }, { status: 503 });

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Seleccioná una imagen" }, { status: 400 });
  if (!allowedTypes.has(file.type)) return NextResponse.json({ error: "Formato no permitido" }, { status: 400 });
  if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "La imagen supera los 5 MB" }, { status: 400 });

  let optimized: Buffer;
  try {
    optimized = await sharp(Buffer.from(await file.arrayBuffer()), { failOn: "none" })
      .rotate()
      .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toBuffer();
  } catch {
    return NextResponse.json({ error: "No se pudo optimizar la imagen" }, { status: 400 });
  }

  const path = `uploads/${new Date().toISOString().slice(0, 10)}/${randomUUID()}.webp`;
  const { error } = await supabase.storage.from("media").upload(path, optimized, { contentType: "image/webp", cacheControl: "31536000", upsert: false });
  if (error) return NextResponse.json({ error: "No se pudo subir la imagen" }, { status: 502 });
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
