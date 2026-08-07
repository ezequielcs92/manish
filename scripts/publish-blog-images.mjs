import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } },
);

const images = [
  ["estrategia-de-marketing-digital", "estrategia-marketing-digital.png"],
  ["estrategia-de-contenidos-para-redes-sociales", "estrategia-contenidos-redes.png"],
  ["automatizacion-e-inteligencia-artificial-para-empresas", "automatizacion-inteligencia-artificial.png"],
];

for (const [slug, filename] of images) {
  const path = `blog/${filename.replace(/\.png$/i, ".webp")}`;
  const file = await sharp(await readFile(join(process.cwd(), "public", "assets", "blog", filename))).webp({ quality: 82, effort: 4 }).toBuffer();
  const { error: uploadError } = await supabase.storage.from("media").upload(path, file, {
    contentType: "image/webp",
    cacheControl: "31536000",
    upsert: true,
  });
  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  const { error: updateError } = await supabase.from("posts").update({
    featured_image_url: data.publicUrl,
    updated_at: new Date().toISOString(),
  }).eq("slug", slug);
  if (updateError) throw updateError;
  console.log(`${slug}: ${data.publicUrl}`);
}
