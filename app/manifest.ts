import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Manish Agencia Digital",
    short_name: "Manish",
    description: "Estrategia, creatividad y tecnología para marcas que quieren avanzar.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f4fa",
    theme_color: "#4943f0",
    lang: "es-AR",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
