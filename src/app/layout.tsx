import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import PageTransition from "@/components/PageTransition";

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
      className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
        <header className="border-b border-neutral-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
          <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block animate-pulse" title="Available for opportunities" />
              <div>
                <Link
                  href="/"
                  className="font-sans font-bold text-base tracking-tight text-neutral-900 hover:text-blue-600 transition-colors"
                >
                  CRISTHIAN V. ROJAS MARQUEZ
                </Link>
                <p className="font-mono text-xs text-neutral-500 mt-0.5 flex items-center gap-2">
                  <span>Software Engineer</span>
                </p>
              </div>
            </div>

            <nav className="flex items-center flex-wrap gap-4 font-mono text-sm">
              <Link
                href="/"
                className="text-neutral-600 hover:text-blue-600 font-medium transition-colors"
              >
                About Me
              </Link>
              <Link
                href="/projects"
                className="text-neutral-600 hover:text-blue-600 font-medium transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/resume"
                className="text-neutral-600 hover:text-blue-600 font-medium transition-colors"
              >
                CV
              </Link>
              <Link
                href="/blog"
                className="text-neutral-600 hover:text-blue-600 font-medium transition-colors"
              >
                Blog
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 md:py-20 overflow-hidden">
          <PageTransition>
            {children}
          </PageTransition>
        </main>

        <footer className="border-t border-neutral-100 bg-white mt-16 py-10 text-sm font-sans text-neutral-500">
          <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-medium text-neutral-800">Cristhian Victor Rojas Marquez</span>
              <span className="text-neutral-300">|</span>
              <span>Full-Stack &amp; QA Engineer</span>
            </div>
            <div className="flex items-center gap-4 text-neutral-500">
              <a href="mailto:cristhian.rojas@example.com" className="hover:text-blue-600 transition-colors">
                Email
              </a>
              <span className="text-neutral-300">•</span>
              <a href="https://github.com/cristhian-rojas" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                GitHub
              </a>
              <span className="text-neutral-300">•</span>
              <span>&copy; {new Date().getFullYear()}</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
