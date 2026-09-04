"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";

export default function HeaderNav() {
  const { t } = useLanguage();
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: t.nav.about },
    { href: "/projects", label: t.nav.projects },
    { href: "/resume", label: t.nav.resume },
    { href: "/blog", label: t.nav.blog },
  ];

  return (
    <header className="border-b border-[var(--border-subtle)] sticky top-0 bg-[var(--bg-primary)]/85 backdrop-blur-md z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <span
            className="w-2 h-2 rounded-full bg-[var(--accent-green)] inline-block animate-pulse"
            title={t.header.status}
          />
          <div>
            <Link
              href="/"
              className="font-sans font-bold text-base tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
            >
              {t.header.name}
            </Link>
            <p className="font-mono text-xs text-[var(--text-secondary)] mt-0.5 flex items-center gap-2">
              <span>{t.header.role}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-5 flex-wrap">
          <nav className="flex items-center flex-wrap gap-3 sm:gap-4 font-mono text-sm">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-medium transition-colors ${
                    isActive
                      ? "text-[var(--accent)] font-semibold"
                      : "text-[var(--text-secondary)] hover:text-[var(--accent)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
