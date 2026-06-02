import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  title: "Cristhian Victor Rojas Marquez | Software Engineer Portfolio",
  description: "Personal website, software engineering portfolio, and developer blog of Cristhian Victor Rojas Marquez.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fafafa] text-[#1a1a1a] selection:bg-[#c02b2b] selection:text-[#fafafa]">
        {/* Brutalist Top Header */}
        <header className="border-b border-[#1a1a1a] sticky top-0 bg-[#fafafa]/90 backdrop-blur-sm z-50">
          <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <a href="/" className="font-mono font-bold text-lg tracking-tight hover:text-[#c02b2b]">
                CRISTHIAN VICTOR ROJAS MARQUEZ
              </a>
              <p className="font-mono text-xs text-[#1a1a1a]/60 mt-0.5">
                [LOC: /usr/bin/portfolio]
              </p>
            </div>
            
            <nav className="flex items-center flex-wrap gap-1 sm:gap-2 font-mono text-sm">
              <a href="/" className="px-2 py-1 border border-transparent hover:border-[#1a1a1a] hover:bg-[#1a1a1a]/5 transition-all">
                [about]
              </a>
              <a href="/projects" className="px-2 py-1 border border-transparent hover:border-[#1a1a1a] hover:bg-[#1a1a1a]/5 transition-all">
                [projects]
              </a>
              <a href="/resume" className="px-2 py-1 border border-transparent hover:border-[#1a1a1a] hover:bg-[#1a1a1a]/5 transition-all">
                [resume]
              </a>
              <a href="/blog" className="px-2 py-1 border border-transparent hover:border-[#1a1a1a] hover:bg-[#1a1a1a]/5 transition-all">
                [blog]
              </a>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 md:py-12">
          {children}
        </main>

        {/* Brutalist Footer */}
        <footer className="border-t border-[#1a1a1a]/10 mt-12 bg-[#fafafa] py-6 text-xs font-mono text-[#1a1a1a]/60">
          <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span>SYSTEM: ONLINE</span>
              <span className="mx-2">|</span>
              <span>HOST: LOCALHOST</span>
              <span className="mx-2">|</span>
              <span>DB: SQLITE3</span>
            </div>
            <div>
              <span>© {new Date().getFullYear()} Cristhian Victor Rojas Marquez</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
