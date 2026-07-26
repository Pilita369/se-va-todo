import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Logo } from "./brand/Logo";
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "@/lib/products";

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-[color:var(--border)]/70 bg-[color:var(--background)]/85 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4">
          <div className="flex min-w-0 items-center gap-2">
            <Link
              to="/admin"
              aria-label="Acceso privado"
              className="shrink-0 rounded-full p-1.5 text-sm leading-none text-[color:var(--warm-gray)]/60 hover:text-[color:var(--gold)]"
            >
              •
            </Link>
            <Logo />
          </div>
          <nav className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className="hidden rounded-full px-3 py-1.5 text-[color:var(--chocolate)] hover:bg-[color:var(--muted)] sm:inline-block"
            >
              Catálogo
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="btn-gold-outline rounded-full px-3.5 py-1.5 text-xs font-medium sm:text-sm"
            >
              WhatsApp
            </a>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-24 border-t border-[color:var(--border)]/70 bg-[color:var(--sand)]/40">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 sm:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-[color:var(--warm-gray)]">
              Una selección privada de objetos que buscan un nuevo lugar.
            </p>
          </div>
          <div className="text-sm">
            <div className="mb-2 font-serif text-lg text-[color:var(--chocolate)]">Consultas</div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              className="text-[color:var(--chocolate)] underline decoration-[color:var(--gold)] underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
          </div>
          <div className="text-sm text-[color:var(--warm-gray)]">
            <div className="mb-2 font-serif text-lg text-[color:var(--chocolate)]">Recordá</div>
            Hay uno solo de cada objeto. Cuando se vende, desaparece.
          </div>
        </div>
        <div className="border-t border-[color:var(--border)]/60 py-4 text-center text-xs text-[color:var(--warm-gray)]">
          © {new Date().getFullYear()} Se Va Todo
        </div>
      </footer>
    </div>
  );
}
