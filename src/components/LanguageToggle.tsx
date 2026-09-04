"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 p-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs font-mono shadow-xs">
      <Globe className="w-3.5 h-3.5 text-[var(--accent)] ml-1 shrink-0" />
      <div className="flex items-center p-0.5 bg-[var(--bg-secondary)] rounded-md">
        <button
          type="button"
          onClick={() => setLanguage("en")}
          className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
            language === "en"
              ? "bg-[var(--bg-card)] text-[var(--text-primary)] font-bold shadow-2xs"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium"
          }`}
          aria-label="Switch to English"
          title="English"
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => setLanguage("es")}
          className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
            language === "es"
              ? "bg-[var(--bg-card)] text-[var(--text-primary)] font-bold shadow-2xs"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium"
          }`}
          aria-label="Cambiar a Español"
          title="Español"
        >
          ES
        </button>
      </div>
    </div>
  );
}
