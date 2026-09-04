"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-all cursor-pointer shadow-xs"
      aria-label={language === "en" ? "Cambiar idioma a Español" : "Switch language to English"}
      title={language === "en" ? "Cambiar a Español" : "Switch to English"}
    >
      <Globe className="w-3.5 h-3.5 text-[var(--accent)]" />
      <span className="font-semibold tracking-wide">
        {language === "en" ? "ES" : "EN"}
      </span>
    </button>
  );
}
