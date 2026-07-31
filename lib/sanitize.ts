import sanitizeHtml from "sanitize-html";

export function sanitizeRichText(value: string) {
  return sanitizeHtml(value, {
    allowedTags: ["p", "br", "hr", "h2", "h3", "h4", "strong", "em", "u", "s", "span", "ul", "ol", "li", "blockquote", "a", "img", "figure", "figcaption", "table", "thead", "tbody", "tr", "th", "td", "code", "pre", "iframe"],
    allowedAttributes: {
      "*": ["style"],
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height", "loading", "decoding"],
      figure: ["class"],
      code: ["class"],
      iframe: ["src", "width", "height", "title", "frameborder", "allow", "allowfullscreen", "loading", "referrerpolicy"],
      table: ["border", "cellpadding", "cellspacing"],
      th: ["colspan", "rowspan", "scope"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedIframeHostnames: ["www.youtube.com", "youtube.com", "player.vimeo.com"],
    allowedStyles: {
      "*": {
        color: [/^#[0-9a-f]{3,8}$/i, /^rgb(a)?\([\d\s,.%]+\)$/i],
        "background-color": [/^#[0-9a-f]{3,8}$/i, /^rgb(a)?\([\d\s,.%]+\)$/i],
        "text-align": [/^(left|right|center|justify)$/],
        "font-size": [/^\d+(px|pt|em|rem|%)$/],
        "font-family": [/^[\w\s,'"-]+$/],
      },
      img: { width: [/^\d+(px|%)$/], height: [/^\d+(px|%)$/] },
    },
    transformTags: {
      a: (_tagName, attributes) => ({ tagName: "a", attribs: { ...attributes, rel: "noopener noreferrer" } }),
      img: (_tagName, attributes) => ({ tagName: "img", attribs: { ...attributes, alt: attributes.alt ?? "", loading: "lazy", decoding: "async" } }),
      iframe: (_tagName, attributes) => ({ tagName: "iframe", attribs: { ...attributes, title: attributes.title ?? "Contenido multimedia", loading: "lazy", referrerpolicy: "strict-origin-when-cross-origin" } }),
    },
  });
}
