import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Ornament } from "@/components/brand/Ornament";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Acceso privado — Se Va Todo" }, { name: "robots", content: "noindex" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="grid min-h-screen place-items-center px-5 py-16">
      <div className="card-ornate w-full max-w-md p-8">
        <div className="flex justify-center">
          <Logo />
        </div>
        <Ornament label="Acceso privado" />
        <h1 className="text-center font-serif text-3xl text-[color:var(--chocolate)]">
          Ingresar al panel
        </h1>
        <p className="mt-2 text-center text-sm text-[color:var(--warm-gray)]">
          Sólo para la administración del catálogo.
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setError("La autenticación se conecta en el próximo paso (Lovable Cloud).");
          }}
        >
          <div>
            <label className="text-xs uppercase tracking-widest text-[color:var(--gold)]">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-4 py-2.5 outline-none focus:border-[color:var(--gold)]"
              placeholder="tu@email.com"
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-[color:var(--gold)]">Contraseña</label>
            <input
              type="password"
              className="mt-1 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-4 py-2.5 outline-none focus:border-[color:var(--gold)]"
              placeholder="••••••••"
              required
            />
          </div>
          {error && (
            <p className="rounded-lg border border-[color:var(--terracotta)]/50 bg-[color:var(--terracotta)]/10 p-3 text-sm text-[color:var(--chocolate)]">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full rounded-full bg-[color:var(--primary)] px-4 py-3 text-[color:var(--primary-foreground)] transition hover:opacity-90"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/admin/dashboard"
            className="text-sm text-[color:var(--warm-gray)] underline decoration-[color:var(--gold)] underline-offset-4 hover:text-[color:var(--chocolate)]"
          >
            Ver vista previa del panel →
          </Link>
        </div>
      </div>
    </div>
  );
}
