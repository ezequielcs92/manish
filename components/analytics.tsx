"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Consent = "granted" | "denied" | null;
type Gtag = (...args: unknown[]) => void;

const consentKey = "manish-ga-consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: Gtag;
  }
}

export function Analytics() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const validMeasurementId = measurementId && /^G-[A-Z0-9]+$/i.test(measurementId) ? measurementId : null;

  useEffect(() => {
    if (!validMeasurementId) return;
    const frame = requestAnimationFrame(() => {
      const privacySignal = navigator.doNotTrack === "1" || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl;
      const storedConsent = localStorage.getItem(consentKey);
      setConsent(privacySignal ? "denied" : storedConsent === "granted" || storedConsent === "denied" ? storedConsent : null);
    });
    return () => cancelAnimationFrame(frame);
  }, [validMeasurementId]);

  useEffect(() => {
    if (consent !== "granted" || !scriptReady || !window.gtag || !pathname) return;
    window.gtag("event", "page_view", { page_path: pathname, page_location: window.location.href });
  }, [consent, pathname, scriptReady]);

  function updateConsent(nextConsent: Exclude<Consent, null>) {
    localStorage.setItem(consentKey, nextConsent);
    setConsent(nextConsent);
    window.gtag?.("consent", "update", {
      analytics_storage: nextConsent,
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }

  if (!validMeasurementId) return null;

  return <>
    <Script id="ga4-consent-default" strategy="afterInteractive">
      {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});`}
    </Script>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${validMeasurementId}`} strategy="afterInteractive" onLoad={() => setScriptReady(true)} />
    <Script id="ga4-config" strategy="afterInteractive">
      {`gtag('js',new Date());gtag('config','${validMeasurementId}',{send_page_view:false});`}
    </Script>
    {consent === null ? <aside className="analytics-consent" role="dialog" aria-label="Preferencias de privacidad">
      <strong>Tu privacidad importa</strong>
      <p>Usamos analítica para mejorar el sitio y medir campañas. No enviamos datos personales del formulario.</p>
      <div><button type="button" onClick={() => updateConsent("denied")}>Rechazar</button><button className="button button-small" type="button" onClick={() => updateConsent("granted")}>Aceptar</button></div>
    </aside> : null}
  </>;
}
