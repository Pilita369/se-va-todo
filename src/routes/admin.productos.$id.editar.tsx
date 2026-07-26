import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Logo } from "@/components/brand/Logo";
import { Ornament } from "@/components/brand/Ornament";
import { RequireAdmin } from "@/components/RequireAdmin";
import { ProductoForm } from "@/components/ProductoForm";
import { fetchProducto } from "@/lib/products";

export const Route = createFileRoute("/admin/productos/$id/editar")({
  head: () => ({ meta: [{ title: "Editar producto — Se Va Todo" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <RequireAdmin>
      <Editar />
    </RequireAdmin>
  ),
});

function Editar() {
  const { id } = Route.useParams();
  // Se pide client-side (no en un loader) porque necesita la sesión de admin
  // ya autenticada en el navegador para que la policy RLS deje ver el producto
  // aunque no esté visible en el catálogo público.
  const { data: producto, isLoading } = useQuery({
    queryKey: ["producto-admin", id],
    queryFn: () => fetchProducto(id),
  });

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
        <div className="text-[11px] uppercase tracking-widest text-[color:var(--gold)]">Editar</div>
        <h1 className="font-serif text-4xl text-[color:var(--chocolate)]">Editar producto</h1>
        <Ornament />

        {isLoading && <p className="text-sm text-[color:var(--warm-gray)]">Cargando…</p>}
        {!isLoading && !producto && (
          <p className="text-sm text-[color:var(--warm-gray)]">No se encontró el producto.</p>
        )}
        {producto && <ProductoForm producto={producto} />}
      </div>
    </div>
  );
}
