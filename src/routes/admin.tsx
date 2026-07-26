import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Ornament } from "@/components/brand/Ornament";
import { supabase } from "@/lib/supabase";
import { usernameToEmail } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Acceso privado — Se Va Todo" }, { name: "robots", content: "noindex" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            setLoading(true);
            const form = new FormData(e.currentTarget);
            const { data, error } = await supabase.auth.signInWithPassword({
              email: usernameToEmail(String(form.get("usuario"))),
              password: String(form.get("password")),
            });
            if (error || !data.session) {
              setLoading(false);
              setError("Usuario o contraseña incorrectos.");
              return;
            }
            // Navegación dura (no client-side) a propósito: así la carga de
            // /admin/dashboard arranca de cero y lee la sesión ya persistida
            // en localStorage, sin depender del timing del router en SPA.
            window.location.assign("/admin/dashboard");
          }}
        >
          <div>
            <label className="text-xs uppercase tracking-widest text-[color:var(--gold)]">Usuario</label>
            <input
              name="usuario"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              className="mt-1 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-4 py-2.5 outline-none focus:border-[color:var(--gold)]"
              placeholder="Pilar2026"
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-[color:var(--gold)]">Contraseña</label>
            <input
              name="password"
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
            disabled={loading}
            className="w-full rounded-full bg-[color:var(--primary)] px-4 py-3 text-[color:var(--primary-foreground)] transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Entrando…" : "Entrar"}
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
