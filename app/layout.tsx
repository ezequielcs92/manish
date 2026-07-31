import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { Analytics } from "@/components/analytics";
import { MotionController } from "@/components/motion-controller";
import { absoluteUrl, siteName, siteUrl } from "@/lib/site";
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
  (() => {
    const systemTheme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    let savedTheme = null;
    try {
      const storedTheme = localStorage.getItem("manish-theme");
      if (storedTheme === "light" || storedTheme === "dark") savedTheme = storedTheme;
    } catch (_) {}
    document.documentElement.dataset.theme = savedTheme ?? systemTheme;
  })();
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Manish | Agencia digital",
    template: "%s | Manish",
  },
  description:
    "Estrategia, creatividad y tecnología para marcas que quieren avanzar.",
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "marketing",
  openGraph: {
    title: "Manish | Agencia digital",
    description:
      "Estrategia, creatividad y tecnología para marcas que quieren avanzar.",
    locale: "es_AR",
    type: "website",
    siteName,
    url: "/",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteName }],
  },
  twitter: { card: "summary_large_image", title: "Manish | Agencia digital", description: "Estrategia, creatividad y tecnología para marcas que quieren avanzar.", images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f4fa" },
    { media: "(prefers-color-scheme: dark)", color: "#10081b" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: siteName, url: siteUrl, logo: absoluteUrl("/icon") },
      { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: siteName, url: siteUrl, inLanguage: "es-AR", publisher: { "@id": `${siteUrl}/#organization` } },
    ],
  };
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${adumu.variable} ${poppins.variable}`}>
        <MotionController />
        <Analytics />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
