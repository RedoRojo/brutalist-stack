import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import ThemeToggle from "@/components/ThemeToggle";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cristhian Victor Rojas Marquez | Software Engineer",
  description: "Software engineer focused on web systems and quality assurance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'dark' || (!stored && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
        <header className="border-b border-[var(--border-subtle)] sticky top-0 bg-[var(--bg-primary)]/85 backdrop-blur-md z-50 transition-colors duration-200">
          <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <span
                className="w-2 h-2 rounded-full bg-[var(--accent-green)] inline-block animate-pulse"
                title="Available for opportunities"
              />
              <div>
                <Link
                  href="/"
                  className="font-sans font-bold text-base tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                >
                  CRISTHIAN V. ROJAS MARQUEZ
                </Link>
                <p className="font-mono text-xs text-[var(--text-secondary)] mt-0.5 flex items-center gap-2">
                  <span>Software Engineer</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <nav className="flex items-center flex-wrap gap-4 font-mono text-sm">
                <Link
                  href="/"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)] font-medium transition-colors"
                >
                  About Me
                </Link>
                <Link
                  href="/projects"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)] font-medium transition-colors"
                >
                  Projects
                </Link>
                <Link
                  href="/resume"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)] font-medium transition-colors"
                >
                  CV
                </Link>
                <Link
                  href="/blog"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)] font-medium transition-colors"
                >
                  Blog
                </Link>
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 md:py-20 overflow-hidden">
          <PageTransition>
            {children}
          </PageTransition>
        </main>

        <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-card)] mt-16 py-10 text-sm font-sans text-[var(--text-secondary)] transition-colors duration-200">
          <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-medium text-[var(--text-primary)]">Cristhian Victor Rojas Marquez</span>
              <span className="text-[var(--border-subtle)]">|</span>
              <span>Full-Stack &amp; QA Engineer</span>
            </div>
            <div className="flex items-center gap-4 text-[var(--text-secondary)]">
              <a href="mailto:cristhian.rojas@example.com" className="hover:text-[var(--accent)] transition-colors">
                Email
              </a>
              <span className="text-[var(--border-subtle)]">•</span>
              <a href="https://github.com/cristhian-rojas" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
                GitHub
              </a>
              <span className="text-[var(--border-subtle)]">•</span>
              <span>&copy; {new Date().getFullYear()}</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
