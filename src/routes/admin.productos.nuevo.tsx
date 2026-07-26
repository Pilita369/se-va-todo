import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { Ornament } from "@/components/brand/Ornament";
import { RequireAdmin } from "@/components/RequireAdmin";
import { ProductoForm } from "@/components/ProductoForm";

export const Route = createFileRoute("/admin/productos/nuevo")({
  head: () => ({ meta: [{ title: "Nuevo producto — Se Va Todo" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <RequireAdmin>
      <Nuevo />
    </RequireAdmin>
  ),
});

function Nuevo() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-[color:var(--border)]/70 bg-[color:var(--background)]/85 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
          <Logo />
          <Link to="/admin/dashboard" className="text-sm text-[color:var(--warm-gray)] hover:text-[color:var(--chocolate)]">
            ← Panel
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 py-8">
        <div className="text-[11px] uppercase tracking-widest text-[color:var(--gold)]">Nuevo</div>
        <h1 className="font-serif text-4xl text-[color:var(--chocolate)]">Agregar producto</h1>
        <Ornament />
        <ProductoForm />
      </div>
    </div>
  );
}
