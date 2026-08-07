import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } },
);

const managedClients = [
  ["Brothers Training Club", "brothers-training-club", "Diseño gráfico · Merch · Redes sociales · Ads · Contenido", "https://www.instagram.com/brotherstrainingclub/", "Diseño gráfico, realización de merch, manejo de redes, campañas de Ads y creación de contenido para una comunidad deportiva en movimiento."],
  ["Panadería Gran Roma", "panaderia-gran-roma", "Redes sociales · Contenido", "https://www.instagram.com/panaderiagranroma/", "Manejo de redes y creación de contenido para construir deseo alrededor de una marca cercana, artesanal y cotidiana."],
  ["Brújula Adventure", "brujula-adventure", "Diseño gráfico · Redes sociales · Contenido", "https://www.instagram.com/brujula.adv/", "Diseño gráfico, manejo de redes y creación de contenido para comunicar experiencias que invitan a salir de la rutina."],
  ["Jeep Compass Argentina", "jeep-compass-argentina", "Diseño gráfico · Redes sociales · Contenido", "https://www.instagram.com/jeep.compassarg/", "Diseño gráfico, manejo de redes y creación de contenido para una marca con espíritu de aventura y exploración."],
  ["Xflota", "xflota", "Diseño gráfico · Redes sociales", "https://www.instagram.com/xflotagps/", "Diseño gráfico y manejo de redes para una solución tecnológica que ayuda a gestionar flotas y moverse con más información."],
  ["Easter Egg", "easter-egg", "Diseño gráfico · Redes sociales · Contenido · Web", "https://www.instagram.com/tienda.easteregg/", "Diseño gráfico, manejo de redes, creación de contenido y presencia web para una marca creativa y de productos con identidad propia.", "https://easteregg.site/"],
  ["Manish3D", "manish3d", "Diseño gráfico · Redes sociales · Contenido", "https://www.instagram.com/manish.3d/", "Diseño gráfico, manejo de redes y creación de contenido para explorar nuevas formas de presentar ideas, espacios y productos."],
  ["Dentalmas", "dentalmas", "Ads", "https://www.instagram.com/dentalmasar/", "Manejo de campañas de Ads para conectar servicios odontológicos con nuevas oportunidades de consulta."],
  ["Noelia Morales PH", "noelia-morales-ph", "Redes sociales", "https://www.instagram.com/noeliamoralesph/", "Manejo de redes para construir una presencia coherente alrededor de una mirada fotográfica sensible y personal."],
];

const contentClients = [
  ["Ridigas", "ridigas", "Creación de contenido", "https://www.instagram.com/ridigas/"],
  ["Agus y Soda Panizza", "agus-y-soda-panizza", "Creación de contenido", "https://www.instagram.com/aguapanizza/"],
  ["Bar de Eventos", "bar-de-eventos", "Creación de contenido", "https://www.instagram.com/bardeeventos/"],
  ["Easy Talk", "easy-talk", "Creación de contenido", "https://www.instagram.com/easytalkcourses/"],
  ["Goût Gluten Free Argentina", "gout-gluten-free-argentina", "Creación de contenido", "https://www.instagram.com/goutglutenfree/"],
  ["Goût Gluten Free Chile", "gout-gluten-free-chile", "Creación de contenido", "https://www.instagram.com/goutchileglutenfree/"],
];

const webProjects = [
  ["Liga Argentina de Béisbol", "liga-argentina-de-beisbol", "Desarrollo web · Institucional · Comunidad", "https://www.ligaargentinabeisbol.com/"],
  ["Soberanis Cancún Hotel", "soberanis-cancun-hotel", "Desarrollo web · Hotelería · Turismo", "https://www.soberaniscancunhotel.com/"],
  ["Progreso Beach Hotel", "progreso-beach-hotel", "Desarrollo web · Hotelería · Turismo", "https://www.progreso-beach.com/es"],
  ["Fertility Center Cancún", "fertility-center-cancun", "Desarrollo web · Salud · Fertilidad", "https://fertilitycentercancun.com/es"],
  ["FutFemGol", "futfemgol", "Desarrollo web · Portal deportivo · Noticias", "https://www.futfemgol.com/"],
  ["Somnomedica", "somnomedica", "Desarrollo web · Institucional · Salud", "https://somnomedica.co/"],
  ["Uladi", "uladi", "Desarrollo web · Logística · Distribución", "https://uladi.com.mx/"],
  ["Entre Sierras", "entre-sierras", "Desarrollo web · Inmobiliaria · Residencial", "https://entresierras.com.mx/"],
  ["Tienda Parres", "tienda-parres", "Desarrollo web · WooCommerce · B2B", "https://tienda.parres.com.mx/"],
  ["Satori Latam", "satori-latam", "Desarrollo web · Corporativo · Consultoría", "https://satorilatam.com/"],
  ["Compower", "compower", "Desarrollo web · ONG · Impacto social", "https://compower.com.co/"],
  ["Les Caprices de Marianne", "les-caprices-de-marianne", "Desarrollo web · Cultura · Eventos", "https://www.caprices-de-marianne.fr/"],
  ["Innova Armonía Dental", "innova-armonia-dental", "Desarrollo web · Salud · Servicios", "https://www.innovaarmoniadental.com/"],
  ["Terrazas Lamadrid", "terrazas-lamadrid", "Desarrollo web · Residencia · Cuidados", "https://terrazaslamadrid.com.ar/"],
  ["Emotions Cancún", "emotions-cancun", "Desarrollo web · Educación · Bienestar", "https://emotionscancun.com/"],
  ["DOMA Sculpt Center", "doma-sculpt-center", "Desarrollo web · Salud · Institucional", "https://www.domasculptcenter.com/"],
];

function links(primaryUrl, secondaryUrl) {
  return `<p><strong>Ver proyecto:</strong> <a href="${primaryUrl}" target="_blank" rel="noopener noreferrer">Abrir enlace externo ↗</a>${secondaryUrl ? ` · <a href="${secondaryUrl}" target="_blank" rel="noopener noreferrer">Visitar sitio web ↗</a>` : ""}</p>`;
}

function project([title, slug, services, primaryUrl, summary, secondaryUrl], sortOrder) {
  return { title, slug, client: title, summary: summary || `Trabajo de ${services.toLowerCase()} para ${title}.`, content: `${links(primaryUrl, secondaryUrl)}<p>${summary || `Trabajo de ${services.toLowerCase()} para ${title}.`}</p><p>Este caso forma parte del trabajo de Manish Agencia Digital. Las imágenes y resultados detallados se incorporarán próximamente.</p>`, services, year: "2026", status: "published", sort_order: sortOrder, cover_image_url: null, updated_at: new Date().toISOString() };
}

const projects = [
  ...managedClients.map((item, index) => project(item, index + 1)),
  ...contentClients.map(([title, slug, services, url], index) => project([title, slug, services, url, `Creación de contenido para ${title}, con piezas pensadas para comunicar con claridad, ritmo e identidad.`, undefined], index + managedClients.length + 1)),
  ...webProjects.map(([title, slug, services, url], index) => project([title, slug, services, url, `Desarrollo web realizado desde Manish para ${title}, con foco en claridad, experiencia y una presencia digital sólida.`, undefined], index + managedClients.length + contentClients.length + 1)),
];

const { error } = await supabase.from("projects").upsert(projects, { onConflict: "slug" });
if (error) throw error;
console.log(`Upserted ${projects.length} published projects.`);
