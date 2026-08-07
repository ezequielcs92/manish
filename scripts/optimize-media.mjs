import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } },
);

const collections = [
  ["posts", "featured_image_url", "blog"],
  ["projects", "cover_image_url", "portfolio"],
];

for (const [table, column, folder] of collections) {
  const { data, error } = await supabase.from(table).select(`id,${column}`).not(column, "is", null);
  if (error) throw error;
  for (const row of data ?? []) {
    const sourceUrl = String(row[column]);
    if (!sourceUrl || sourceUrl.endsWith(".webp")) continue;
    const response = await fetch(sourceUrl);
    if (!response.ok) {
      console.warn(`${table}/${row.id}: source unavailable (${response.status})`);
      continue;
    }
    const optimized = await sharp(Buffer.from(await response.arrayBuffer()), { failOn: "none" })
      .rotate()
      .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toBuffer();
    const path = `optimized/${folder}/${row.id}.webp`;
    const upload = await supabase.storage.from("media").upload(path, optimized, { contentType: "image/webp", cacheControl: "31536000", upsert: true });
    if (upload.error) throw upload.error;
    const { data: publicUrl } = supabase.storage.from("media").getPublicUrl(path);
    const update = await supabase.from(table).update({ [column]: publicUrl.publicUrl, updated_at: new Date().toISOString() }).eq("id", row.id);
    if (update.error) throw update.error;
    console.log(`${table}/${row.id}: optimized`);
  }
}
