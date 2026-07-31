# Plan de Desarrollo — Web Manish Agencia Digital

**Stack:** Next.js (App Router) + Tailwind CSS + Supabase (Postgres, Auth y Storage) · TinyMCE · **Deploy:** Vercel
**Formato:** Sitio multipágina + blog + dashboard de administración
**Dirección visual:** temas claro y oscuro con gradientes violeta-magenta

---

## Fase 0 — Prerrequisitos (antes de codear)

- [ ] Logo en SVG (versión para fondo claro y fondo oscuro)
- [x] Tipografías definidas + licencias web: Adumu para títulos y Poppins para textos
- [ ] Copy final de las páginas
- [ ] Casos de portfolio seleccionados (3–5) con textos y piezas visuales
- [ ] Autorización de clientes para mostrar sus trabajos
- [ ] Dominio comprado y acceso al DNS

---

## Fase 1 — Setup del proyecto e infraestructura

- [x] Proyecto Next.js con TypeScript, Tailwind y App Router
- [ ] Estructura de carpetas: `app/(public)/`, `app/(admin)/`, `components/`, `lib/`, `public/assets/`
- [x] Base de datos: Supabase Postgres mediante SDK oficial
- [ ] Autenticación para el dashboard: Auth.js o Clerk
- [ ] Storage de imágenes: Vercel Blob, Supabase Storage o Cloudinary
- [ ] Configurar ESLint + Prettier
- [ ] Repo en GitHub + conexión con Vercel (preview deploys por PR)

---

## Fase 2 — Sistema de diseño

### Tokens de color (Tailwind config / CSS variables)

| Rol | Colores |
|---|---|
| Principales | `#4943F0` (primario), `#362edf` (hover), `#7c579b` (secundario) |
| Acentos | `#ed43f0`, `#b143f0` (gradientes/highlights), `#73b3ff` (info), `#722ded` (decorativo) |
| Textos | `#10081b` / `#291446` (sobre claro), `#ffffff` / `#dbc8ea` (sobre oscuro), `#ffbd59` (solo destacados sobre oscuro) |
| Fondos | `#10081b` / `#291446` (secciones dark), `#fdefff` / `#ffffff` (secciones claras), `#dbc8ea` (bordes/divisores) |

> ⚠️ Contraste: `#ffbd59` y `#dbc8ea` como texto **solo sobre fondos oscuros** (WCAG).

### Componentes base

- [ ] Tipografía: escala (h1–h6, body, caption) y pesos
- [ ] Botones: primario, secundario, ghost + estados hover/focus
- [x] Header/Nav responsive con menú mobile
- [x] Selector de tema claro/oscuro, con detección del sistema y preferencia persistente
- [ ] Footer con links, redes y datos de contacto
- [ ] Card de servicio · Card de caso · Card de post de blog
- [ ] Sección CTA reutilizable
- [ ] Formulario: inputs, textarea, validación, estados de envío
- [ ] Componentes del admin: tabla de datos, sidebar, modales, editor de texto enriquecido (Tiptap)

---

## Fase 3 — Páginas públicas

Orden sugerido (de mayor a menor impacto):

### 3.1 Home
- [x] Hero con propuesta de valor + CTA y gradiente violeta-magenta
- [ ] Servicios destacados (cards con link a /servicios)
- [x] Logos de clientes: Goût, Ormiflex, Brothers Training Club, Ridigas, Actron
- [x] Preview de 2–3 casos del portfolio
- [x] CTA final a contacto

### 3.2 Servicios (3 bloques)
- [ ] **Marketing Digital:** manejo de redes · publicidad digital (Google Ads y Meta) · SEO · email marketing · analítica y reportes · consultoría, estrategia y digitalización de negocios
- [ ] **Contenido y Creatividad:** contenido nativo y UGC · edición de video y audiovisual · branding y diseño gráfico · fotografía y video de producto
- [ ] **Desarrollo y Tecnología:** webs, apps y juegos · e-commerce · automatizaciones e IA · software a medida e intranets · mantenimiento y optimización
- [ ] Cada servicio: qué incluye, para quién es, CTA propio por bloque

### 3.3 Portfolio / Casos
- [ ] Grilla de casos con filtro opcional por tipo de servicio
- [ ] Detalle por caso: contexto → qué hicimos → resultados (con números si hay)

### 3.4 Nosotros
- [ ] Historia y enfoque de la agencia
- [ ] Equipo (fotos + roles)

### 3.5 Contacto
- [ ] Formulario con envío por email (Resend o similar) **+ guardado del lead en la base** (para verlo en el dashboard)
- [x] Flujo de conversión con CTA contextuales → formulario → página de gracias
- [ ] Botón directo a WhatsApp
- [ ] Datos de contacto y redes

### 3.6 Blog
- [ ] Listado con paginación y filtro por categoría
- [ ] Página de post: contenido desde la base, autor, fecha, posts relacionados
- [ ] SEO por post: metadata dinámica, Open Graph con imagen destacada
- [ ] RSS feed

---

## Fase 4 — Dashboard de administración (`/admin`)

- [x] Base del dashboard responsive con sesión firmada, rate limiting y temas claro/oscuro
- [x] Login con Supabase Auth y roles (admin / editor)

### Gestión del blog
- [ ] CRUD de posts con editor enriquecido, imagen destacada y categorías/tags
- [ ] Estados: borrador → publicado, con publicación programada
- [x] Campos SEO por post (title, description, slug editable)

### Gestión del portfolio
- [x] CRUD de casos (agregar proyectos nuevos sin tocar código)
- [ ] Subida de imágenes/piezas por caso

### Leads (CRM liviano)
- [x] Captación y listado de leads conectado a Supabase
- [x] Bandeja de contactos del formulario con estado (nuevo / contactado / cerrado)
- [x] Notas internas por lead + notificación por email al recibir uno nuevo

### Otras secciones útiles
- [ ] Edición de contenido dinámico: servicios, equipo, logos de clientes
- [ ] Suscriptores del newsletter (captación desde el blog, export a CSV)
- [ ] Mini-analytics: visitas, posts más leídos, origen de leads

---

## Fase 5 — Features transversales

- [ ] Responsive mobile-first en todas las páginas (el tráfico principal viene de redes)
- [ ] Temas claro y oscuro consistentes en todas las páginas y el dashboard
- [ ] SEO: metadata por página, Open Graph, sitemap.xml dinámico (incluye posts), robots.txt
- [ ] Optimización de imágenes con `next/image`
- [x] Animaciones de entrada, movimiento ambiental y profundidad 3D con CSS
- [ ] Página 404 con la identidad de la marca
- [ ] Favicon + manifest
- [ ] Seguridad del admin: rate limiting en login, middleware de protección de rutas

---

## Fase 6 — QA y lanzamiento

- [ ] Test en dispositivos reales (iOS/Android, Chrome/Safari)
- [ ] Lighthouse: performance, accesibilidad (revisar contrastes), SEO > 90
- [ ] Revisión de todos los links, formulario y flujo completo del dashboard en producción
- [ ] Backup automático de la base de datos
- [ ] Conectar dominio en Vercel
- [ ] Google Analytics (o alternativa) + Search Console
- [ ] Linkear la web desde las bios de todas las redes de Manish

---

## Post-lanzamiento (backlog)

- **Portal de clientes:** acceso privado para que cada cliente vea sus reportes mensuales — diferencial fuerte, ya producen esos reportes
- Newsletter automatizado (los posts nuevos se envían a suscriptores)
- Casos nuevos a medida que se cierren proyectos
- Página de planes/precios si definen paquetes
