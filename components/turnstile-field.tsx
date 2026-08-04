"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

type TurnstileWidget = { reset: (widgetId?: string) => void; remove: (widgetId?: string) => void; render: (element: HTMLElement, options: Record<string, unknown>) => string };

declare global {
  interface Window { turnstile?: TurnstileWidget; }
}

export function TurnstileField({ onToken, resetSignal }: { onToken: (token: string) => void; resetSignal: number }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  const firstReset = useRef(true);
  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useEffect(() => {
    if (!siteKey || !containerRef.current) return;
    let attempts = 0;
    const render = () => {
      if (!window.turnstile || !containerRef.current || widgetId.current) return Boolean(widgetId.current);
      widgetId.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: "auto",
        callback: (token: string) => onTokenRef.current(token),
        "expired-callback": () => onTokenRef.current(""),
        "error-callback": () => onTokenRef.current(""),
      });
      return true;
    };
    const timer = window.setInterval(() => {
      if (render() || ++attempts > 100) window.clearInterval(timer);
    }, 100);
    render();
    return () => {
      window.clearInterval(timer);
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [siteKey]);

  useEffect(() => {
    if (firstReset.current) {
      firstReset.current = false;
      return;
    }
    if (widgetId.current) window.turnstile?.reset(widgetId.current);
  }, [resetSignal]);

  if (!siteKey) return null;
  return <><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" /><div className="turnstile-field" ref={containerRef} /></>;
}
