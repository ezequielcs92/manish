import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/db";

const allowedTypes = new Map([
  ["image/jpeg", "jpg"], ["image/png", "png"], ["image/webp", "webp"], ["image/gif", "gif"],
]);

export async function POST(request: Request) {
  if (!await getAdminSession()) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase no configurado" }, { status: 503 });

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Seleccioná una imagen" }, { status: 400 });
  const extension = allowedTypes.get(file.type);
  if (!extension) return NextResponse.json({ error: "Formato no permitido" }, { status: 400 });
  if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "La imagen supera los 5 MB" }, { status: 400 });

  const path = `uploads/${new Date().toISOString().slice(0, 10)}/${randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from("media").upload(path, await file.arrayBuffer(), { contentType: file.type, upsert: false });
  if (error) return NextResponse.json({ error: "No se pudo subir la imagen" }, { status: 502 });
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
