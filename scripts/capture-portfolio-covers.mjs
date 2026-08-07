import { mkdir, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright-core";
import { createClient } from "@supabase/supabase-js";

const browserPath = process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outputDir = join(process.env.TEMP ?? process.cwd(), "manish-portfolio-captures");
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } },
);

const sources = [
  ["brothers-training-club", "https://www.instagram.com/brotherstrainingclub/"],
  ["panaderia-gran-roma", "https://www.instagram.com/panaderiagranroma/"],
  ["brujula-adventure", "https://www.instagram.com/brujula.adv/"],
  ["jeep-compass-argentina", "https://www.instagram.com/jeep.compassarg/"],
  ["xflota", "https://www.instagram.com/xflotagps/"],
  ["easter-egg", "https://easteregg.site/"],
  ["manish3d", "https://www.instagram.com/manish.3d/"],
  ["dentalmas", "https://www.instagram.com/dentalmasar/"],
  ["noelia-morales-ph", "https://www.instagram.com/noeliamoralesph/"],
  ["ridigas", "https://www.instagram.com/ridigas/"],
  ["agus-y-soda-panizza", "https://www.instagram.com/aguapanizza/"],
  ["bar-de-eventos", "https://www.instagram.com/bardeeventos/"],
  ["easy-talk", "https://www.instagram.com/easytalkcourses/"],
  ["gout-gluten-free-argentina", "https://www.instagram.com/goutglutenfree/"],
  ["gout-gluten-free-chile", "https://www.instagram.com/goutchileglutenfree/"],
  ["liga-argentina-de-beisbol", "https://www.ligaargentinabeisbol.com/"],
  ["soberanis-cancun-hotel", "https://www.soberaniscancunhotel.com/"],
  ["progreso-beach-hotel", "https://www.progreso-beach.com/es"],
  ["fertility-center-cancun", "https://fertilitycentercancun.com/es"],
  ["futfemgol", "https://www.futfemgol.com/"],
  ["somnomedica", "https://somnomedica.co/"],
  ["uladi", "https://uladi.com.mx/"],
  ["entre-sierras", "https://entresierras.com.mx/"],
  ["tienda-parres", "https://tienda.parres.com.mx/"],
  ["satori-latam", "https://satorilatam.com/"],
  ["compower", "https://compower.com.co/"],
  ["les-caprices-de-marianne", "https://www.caprices-de-marianne.fr/"],
  ["innova-armonia-dental", "https://www.innovaarmoniadental.com/"],
  ["terrazas-lamadrid", "https://terrazaslamadrid.com.ar/"],
  ["emotions-cancun", "https://emotionscancun.com/"],
  ["doma-sculpt-center", "https://www.domasculptcenter.com/"],
];

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: browserPath });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setExtraHTTPHeaders({ "Accept-Language": "es-AR,es;q=0.9,en;q=0.8" });
page.setDefaultTimeout(30000);

for (const [slug, url] of sources) {
  const filePath = join(outputDir, `${slug}.png`);
  try {
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    if (response && response.status() >= 400) throw new Error(`HTTP ${response.status()}`);
    await page.waitForTimeout(2500);
    await page.keyboard.press("Escape").catch(() => {});
    await page.screenshot({ path: filePath, type: "png", fullPage: false });
    const file = await readFile(filePath);
    const storagePath = `portfolio/${slug}.png`;
    const { error: uploadError } = await supabase.storage.from("media").upload(storagePath, file, { contentType: "image/png", cacheControl: "31536000", upsert: true });
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from("media").getPublicUrl(storagePath);
    const { error: updateError } = await supabase.from("projects").update({ cover_image_url: data.publicUrl, updated_at: new Date().toISOString() }).eq("slug", slug);
    if (updateError) throw updateError;
    console.log(`${slug}: captured and assigned`);
  } catch (error) {
    console.error(`${slug}: skipped (${error instanceof Error ? error.message : String(error)})`);
  }
}

await browser.close();
await rm(outputDir, { recursive: true, force: true });
