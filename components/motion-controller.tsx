"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    document.documentElement.classList.add("motion-ready");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 },
    );

    const revealElements = document.querySelectorAll("[data-reveal]");
    revealElements.forEach((element) => revealObserver.observe(element));

    const tiltFrames = new WeakMap<HTMLElement, number>();
    function updateTilt(event: PointerEvent) {
      const element = event.currentTarget as HTMLElement;
      const previousFrame = tiltFrames.get(element);
      if (previousFrame) cancelAnimationFrame(previousFrame);
      const clientX = event.clientX;
      const clientY = event.clientY;
      tiltFrames.set(element, requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect();
        const x = (clientX - bounds.left) / bounds.width - 0.5;
        const y = (clientY - bounds.top) / bounds.height - 0.5;
        element.style.setProperty("--tilt-x", `${(-y * 7).toFixed(2)}deg`);
        element.style.setProperty("--tilt-y", `${(x * 8).toFixed(2)}deg`);
        element.style.setProperty("--spot-x", `${((x + 0.5) * 100).toFixed(1)}%`);
        element.style.setProperty("--spot-y", `${((y + 0.5) * 100).toFixed(1)}%`);
      }));
    }

    function resetTilt(event: PointerEvent) {
      const element = event.currentTarget as HTMLElement;
      element.style.setProperty("--tilt-x", "0deg");
      element.style.setProperty("--tilt-y", "0deg");
    }

    const tiltElements = window.matchMedia("(pointer: fine)").matches
      ? document.querySelectorAll<HTMLElement>("[data-tilt]")
      : [];
    tiltElements.forEach((element) => {
      element.addEventListener("pointermove", updateTilt);
      element.addEventListener("pointerleave", resetTilt);
    });

    return () => {
      revealObserver.disconnect();
      document.documentElement.classList.remove("motion-ready");
      tiltElements.forEach((element) => {
        const frame = tiltFrames.get(element);
        if (frame) cancelAnimationFrame(frame);
        element.removeEventListener("pointermove", updateTilt);
        element.removeEventListener("pointerleave", resetTilt);
      });
    };
  }, [pathname]);

  return null;
}
