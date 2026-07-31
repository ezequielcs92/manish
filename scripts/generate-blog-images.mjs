import { mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import opentype from "opentype.js";

const root = process.cwd();
const output = join(root, "public", "assets", "blog");
await mkdir(output, { recursive: true });

const [adumuBuffer, poppinsBuffer, logo] = await Promise.all([
  readFile(join(root, "branding", "tipografias", "adumu - Titulos", "Adumu.ttf")),
  readFile(join(root, "branding", "tipografias", "poppins - textos", "Poppins-SemiBold.ttf")),
  readFile(join(root, "branding", "logos", "logo dibujo.svg")),
]);
const toArrayBuffer = (buffer) => buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
const adumu = opentype.parse(toArrayBuffer(adumuBuffer));
const poppins = opentype.parse(toArrayBuffer(poppinsBuffer));
const logoData = `data:image/svg+xml;base64,${logo.toString("base64")}`;

function text(font, value, x, y, size, fill) {
  return `<path d="${font.getPath(value, x, y, size, { kerning: true }).toPathData(2)}" fill="${fill}"/>`;
}

function shell(content, background = "#10081b") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <filter id="blur"><feGaussianBlur stdDeviation="45"/></filter>
      <filter id="shadow"><feDropShadow dx="0" dy="20" stdDeviation="25" flood-color="#10081b" flood-opacity=".35"/></filter>
      <linearGradient id="violet" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#4943f0"/><stop offset="1" stop-color="#ed43f0"/></linearGradient>
    </defs>
    <rect width="1200" height="630" fill="${background}"/>
    ${content}
  </svg>`;
}

const images = [
  {
    file: "estrategia-marketing-digital.png",
    svg: shell(`
      <defs><pattern id="grid" width="52" height="52" patternUnits="userSpaceOnUse"><path d="M52 0H0V52" fill="none" stroke="#dbc8ea" stroke-opacity=".07"/></pattern></defs>
      <rect width="1200" height="630" fill="url(#grid)"/>
      <circle cx="1020" cy="110" r="150" fill="#4943f0" opacity=".22" filter="url(#blur)"/>
      <circle cx="820" cy="500" r="130" fill="#ed43f0" opacity=".16" filter="url(#blur)"/>
      ${text(poppins, "MANISH · IDEAS", 74, 72, 15, "#dbc8ea")}
      ${text(poppins, "MARKETING DIGITAL · 01", 74, 155, 16, "#ed43f0")}
      ${text(adumu, "ESTRATEGIA DE", 70, 250, 75, "#fff")}
      ${text(adumu, "MARKETING", 70, 332, 75, "#7772ff")}
      ${text(adumu, "DIGITAL", 70, 414, 75, "#fff")}
      ${text(poppins, "Cómo conectar objetivos, canales y métricas.", 76, 485, 18, "#c1b1cc")}
      <g transform="translate(760 115)" filter="url(#shadow)">
        <rect width="365" height="390" rx="30" fill="#1a0f26" stroke="#49385a"/>
        <path d="M40 304C100 262 127 279 173 220S263 203 324 99" fill="none" stroke="url(#violet)" stroke-width="8" stroke-linecap="round"/>
        <path d="M40 320H325M40 255H325M40 190H325M40 125H325" stroke="#dbc8ea" stroke-opacity=".1"/>
        <circle cx="173" cy="220" r="10" fill="#ffbd59"/><circle cx="324" cy="99" r="10" fill="#ed43f0"/>
        <rect x="47" y="336" width="70" height="10" rx="5" fill="#4943f0"/><rect x="128" y="336" width="108" height="10" rx="5" fill="#7c579b"/><rect x="247" y="336" width="72" height="10" rx="5" fill="#ed43f0"/>
      </g>
      <image href="${logoData}" x="1080" y="30" width="76" height="76" opacity=".92"/>
    `),
  },
  {
    file: "estrategia-contenidos-redes.png",
    svg: shell(`
      <circle cx="940" cy="160" r="280" fill="#ed43f0" opacity=".18" filter="url(#blur)"/>
      <circle cx="1060" cy="550" r="240" fill="#ffbd59" opacity=".18" filter="url(#blur)"/>
      ${text(poppins, "MANISH · IDEAS", 74, 72, 15, "#dbc8ea")}
      ${text(poppins, "CONTENIDO Y CREATIVIDAD · 02", 74, 155, 16, "#ffbd59")}
      ${text(adumu, "CONTENIDOS", 70, 250, 70, "#fff")}
      ${text(adumu, "PARA REDES", 70, 327, 70, "#ed43f0")}
      ${text(adumu, "SOCIALES", 70, 404, 70, "#fff")}
      ${text(poppins, "Identidad, formatos nativos y objetivos claros.", 76, 475, 18, "#c1b1cc")}
      <g transform="translate(775 96) rotate(6 170 215)" filter="url(#shadow)">
        <rect width="340" height="430" rx="34" fill="#fdefff"/>
        <rect x="25" y="25" width="290" height="250" rx="22" fill="#ef9ba8"/>
        <path d="M60 238C110 170 153 196 192 127S255 128 289 68" fill="none" stroke="#4e1732" stroke-width="5" stroke-linecap="round"/>
        <circle cx="74" cy="318" r="15" fill="#4943f0"/><rect x="104" y="307" width="175" height="12" rx="6" fill="#7c579b" opacity=".45"/>
        <rect x="45" y="355" width="250" height="11" rx="5" fill="#7c579b" opacity=".28"/><rect x="45" y="381" width="185" height="11" rx="5" fill="#7c579b" opacity=".18"/>
      </g>
      <g transform="translate(695 380) rotate(-8 80 80)"><rect width="155" height="155" rx="28" fill="#4943f0"/>${text(adumu, "Aa", 34, 100, 62, "#fff")}</g>
      <image href="${logoData}" x="1080" y="30" width="76" height="76" opacity=".92"/>
    `),
  },
  {
    file: "automatizacion-inteligencia-artificial.png",
    svg: shell(`
      <defs><pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2" fill="#73b3ff" opacity=".12"/></pattern></defs>
      <rect width="1200" height="630" fill="url(#dots)"/>
      <circle cx="960" cy="300" r="250" fill="#73b3ff" opacity=".17" filter="url(#blur)"/>
      ${text(poppins, "MANISH · IDEAS", 74, 72, 15, "#dbc8ea")}
      ${text(poppins, "TECNOLOGÍA · 03", 74, 145, 16, "#73b3ff")}
      ${text(adumu, "AUTOMATIZACIÓN", 70, 234, 65, "#fff")}
      ${text(adumu, "E INTELIGENCIA", 70, 307, 65, "#73b3ff")}
      ${text(adumu, "ARTIFICIAL", 70, 380, 65, "#fff")}
      ${text(poppins, "Por dónde empezar sin sumar complejidad.", 76, 452, 18, "#c1b1cc")}
      <g transform="translate(790 112)" filter="url(#shadow)">
        <path d="M170 5 330 97v185l-160 93L10 282V97Z" fill="#18253c" stroke="#73b3ff" stroke-opacity=".55"/>
        <path d="m170 5 160 92-160 93L10 97Zm0 185v185M10 97l160 93" fill="none" stroke="#73b3ff" stroke-opacity=".45"/>
        <circle cx="170" cy="190" r="76" fill="#4943f0" opacity=".5"/><circle cx="170" cy="190" r="45" fill="#73b3ff" opacity=".75"/><circle cx="170" cy="190" r="17" fill="#fff"/>
        <circle cx="10" cy="97" r="8" fill="#ed43f0"/><circle cx="330" cy="97" r="8" fill="#ed43f0"/><circle cx="170" cy="375" r="8" fill="#ffbd59"/>
      </g>
      <path d="M755 535h410" stroke="#73b3ff" stroke-opacity=".35"/><circle cx="815" cy="535" r="7" fill="#73b3ff"/><circle cx="960" cy="535" r="7" fill="#ed43f0"/><circle cx="1105" cy="535" r="7" fill="#ffbd59"/>
      <image href="${logoData}" x="1080" y="30" width="76" height="76" opacity=".92"/>
    `),
  },
];

for (const image of images) {
  await sharp(Buffer.from(image.svg)).png({ compressionLevel: 9, palette: true }).toFile(join(output, image.file));
  console.log(join("public", "assets", "blog", image.file));
}
