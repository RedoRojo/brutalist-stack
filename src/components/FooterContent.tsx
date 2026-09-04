"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function FooterContent() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-card)] mt-16 py-10 text-sm font-sans text-[var(--text-secondary)] transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="font-medium text-[var(--text-primary)]">Cristhian Victor Rojas Marquez</span>
          <span className="text-[var(--border-subtle)]">|</span>
          <span>{t.footer.role}</span>
        </div>
        <div className="flex items-center gap-4 text-[var(--text-secondary)]">
          <a
            href="mailto:cristhian.rojas@example.com"
            className="hover:text-[var(--accent)] transition-colors"
          >
            {t.footer.email}
          </a>
          <span className="text-[var(--border-subtle)]">•</span>
          <a
            href="https://github.com/cristhian-rojas"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)] transition-colors"
          >
            {t.footer.github}
          </a>
          <span className="text-[var(--border-subtle)]">•</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
