"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  window.addEventListener("storage", callback);
  return () => {
    observer.disconnect();
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): boolean {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot(): boolean {
  return false;
}

export default function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggleTheme() {
    const nextDark = !isDark;
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-all cursor-pointer shadow-xs"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Modo diurno (luz)" : "Visión de noche (oscuro)"}
    >
      {isDark ? (
        <>
          <Sun className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span className="hidden sm:inline">LUZ</span>
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span className="hidden sm:inline">NOCHE</span>
        </>
      )}
    </button>
  );
}
