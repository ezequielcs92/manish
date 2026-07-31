"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const storageKey = "manish-theme";

function getCurrentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const systemTheme = matchMedia("(prefers-color-scheme: dark)");
    const initialFrame = requestAnimationFrame(() => setTheme(getCurrentTheme()));
    const syncWithSystem = (event: MediaQueryListEvent) => {
      if (!localStorage.getItem(storageKey)) {
        const nextTheme = event.matches ? "dark" : "light";
        document.documentElement.dataset.theme = nextTheme;
        setTheme(nextTheme);
      }
    };

    systemTheme.addEventListener("change", syncWithSystem);
    return () => {
      cancelAnimationFrame(initialFrame);
      systemTheme.removeEventListener("change", syncWithSystem);
    };
  }, []);

  function toggleTheme() {
    const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem(storageKey, nextTheme);
    setTheme(nextTheme);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      title={theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      aria-pressed={theme === "dark"}
    >
      <svg className="sun-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
      </svg>
      <svg className="moon-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z" />
      </svg>
    </button>
  );
}
