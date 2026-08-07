import { mkdir, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright-core";
import sharp from "sharp";
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

for (const [slug, url] of sources) {
  const filePath = join(outputDir, `${slug}.png`);
  const isInstagram = url.includes("instagram.com");
  const page = await browser.newPage({ viewport: isInstagram ? { width: 390, height: 844 } : { width: 1200, height: 675 }, deviceScaleFactor: isInstagram ? 3 : 1 });
  await page.setExtraHTTPHeaders({ "Accept-Language": "es-AR,es;q=0.9,en;q=0.8" });
  page.setDefaultTimeout(30000);
  try {
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    if (response && response.status() >= 400) throw new Error(`HTTP ${response.status()}`);
    await page.waitForTimeout(2500);
    if (isInstagram) {
      await page.evaluate(() => window.scrollTo(0, 360));
      await page.waitForTimeout(1200);
    }
    await page.keyboard.press("Escape").catch(() => {});
    await page.screenshot({ path: filePath, type: "png", fullPage: false, ...(isInstagram ? { clip: { x: 0, y: 0, width: 390, height: 219 } } : {}) });
    const file = await readFile(filePath);
    const optimized = await sharp(file).webp({ quality: 82, effort: 4 }).toBuffer();
    const storagePath = `portfolio/${slug}.webp`;
    const { error: uploadError } = await supabase.storage.from("media").upload(storagePath, optimized, { contentType: "image/webp", cacheControl: "31536000", upsert: true });
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from("media").getPublicUrl(storagePath);
    const { error: updateError } = await supabase.from("projects").update({ cover_image_url: data.publicUrl, updated_at: new Date().toISOString() }).eq("slug", slug);
    if (updateError) throw updateError;
    console.log(`${slug}: captured and assigned`);
  } catch (error) {
    console.error(`${slug}: skipped (${error instanceof Error ? error.message : String(error)})`);
  }
  await page.close();
}

await browser.close();
await rm(outputDir, { recursive: true, force: true });
