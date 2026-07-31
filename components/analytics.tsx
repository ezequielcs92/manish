"use client";

import { useEffect } from "react";

export function Analytics() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (navigator.doNotTrack === "1" || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return;
    const src = process.env.NEXT_PUBLIC_ANALYTICS_SCRIPT_URL;
    const websiteId = process.env.NEXT_PUBLIC_ANALYTICS_WEBSITE_ID;
    if (!src || !websiteId) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = src;
    script.dataset.websiteId = websiteId;
    script.dataset.doNotTrack = "true";
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return null;
}
