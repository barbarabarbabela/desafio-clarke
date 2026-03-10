import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col text-zinc-100 font-sans">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-yellow-500/10 blur-3xl rounded-full pointer-events-none z-0" />

      <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-1">
            <span className="text-white font-black tracking-widest uppercase text-lg">
              Teste
            </span>
            <span className="text-yellow-400 font-black tracking-widest uppercase text-lg ml-1">
              Energia
            </span>
            <span className="ml-2 w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          </a>

          <nav className="hidden sm:flex items-center gap-1 rounded-full px-2 py-1">
            <a
              href="/form"
              className="px-4 py-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/8 transition-all"
            >
              Simulador
            </a>

            <a
              href="/partners"
              className="px-4 py-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/8 transition-all"
            >
              Parceiros
            </a>

            <a
              href="/contact"
              className="px-4 py-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/8 transition-all"
            >
              Contato
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 relative z-10 max-w-5xl mx-auto w-full px-6 py-16">
        {children}
      </main>

      <footer className="relative z-10 border-t border-white/5 py-6">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-zinc-600 text-xs">
          <span>© 2026 Teste Energia</span>
          <span className="uppercase tracking-widest">
            Marketplace de Energia
          </span>
        </div>
      </footer>
    </div>
  );
}
