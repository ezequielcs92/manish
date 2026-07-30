import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { MotionController } from "@/components/motion-controller";
import "./globals.css";

const adumu = localFont({
  src: [
    {
      path: "../branding/tipografias/adumu - Titulos/Adumu.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-adumu",
  display: "swap",
});

const poppins = localFont({
  src: [
    {
      path: "../branding/tipografias/poppins - textos/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../branding/tipografias/poppins - textos/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../branding/tipografias/poppins - textos/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../branding/tipografias/poppins - textos/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
  display: "swap",
});

const themeScript = `
  try {
    const savedTheme = localStorage.getItem("manish-theme");
    const systemTheme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.dataset.theme = savedTheme || systemTheme;
  } catch (_) {}
`;

export const metadata: Metadata = {
  metadataBase: new URL("https://manish.com.ar"),
  title: {
    default: "Manish | Agencia digital",
    template: "%s | Manish",
  },
  description:
    "Estrategia, creatividad y tecnología para marcas que quieren avanzar.",
  openGraph: {
    title: "Manish | Agencia digital",
    description:
      "Estrategia, creatividad y tecnología para marcas que quieren avanzar.",
    locale: "es_AR",
    type: "website",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f4fa" },
    { media: "(prefers-color-scheme: dark)", color: "#10081b" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${adumu.variable} ${poppins.variable}`}>
        <MotionController />
        {children}
      </body>
    </html>
  );
}
