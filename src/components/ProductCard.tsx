import { Link } from "@tanstack/react-router";
import type { Producto } from "@/lib/products";
import { formatPrice, waConsultar } from "@/lib/products";
import { ProductImage } from "./ProductImage";

function EstadoBadge({ estado }: { estado: Producto["estado"] }) {
  const map: Record<Producto["estado"], string> = {
    Disponible: "bg-[color:var(--sage)]/25 text-[color:var(--chocolate)] border-[color:var(--sage)]",
    Reservado: "bg-[color:var(--terracotta)]/20 text-[color:var(--chocolate)] border-[color:var(--terracotta)]/60",
    Vendido: "bg-[color:var(--muted)] text-[color:var(--warm-gray)] border-[color:var(--warm-gray)]/40",
  };
  const label = estado === "Vendido" ? "Ya se fue" : estado;
  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${map[estado]}`}>
      {label}
    </span>
  );
}

export function ProductCard({ p }: { p: Producto }) {
  const vendido = p.estado === "Vendido";
  return (
    <article
      className={`card-ornate group flex flex-col overflow-hidden transition ${
        vendido ? "opacity-70" : "hover:-translate-y-0.5 hover:shadow-lg"
      }`}
    >
      <Link
        to="/producto/$id"
        params={{ id: p.id }}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <ProductImage producto={p} className="h-full w-full" />
        <div className="absolute left-3 top-3 flex gap-2">
          <EstadoBadge estado={p.estado} />
          {p.cantidad === 1 && !vendido && (
            <span className="rounded-full border border-[color:var(--gold)] bg-[color:var(--ivory)]/85 px-2.5 py-0.5 text-[11px] font-medium text-[color:var(--chocolate)]">
              Hay uno solo
            </span>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-widest text-[color:var(--gold)]">
              {p.categoria}
            </div>
            <h3 className="mt-1 truncate font-serif text-xl text-[color:var(--chocolate)]">
              {p.nombre}
            </h3>
          </div>
          <div className="shrink-0 text-right font-serif text-xl text-[color:var(--chocolate)]">
            {formatPrice(p.precio)}
          </div>
        </div>
        <div className="text-xs text-[color:var(--warm-gray)]">
          Condición: <span className="text-[color:var(--chocolate)]">{p.condicion}</span>
        </div>
        <div className="mt-auto flex gap-2 pt-2">
          <Link
            to="/producto/$id"
            params={{ id: p.id }}
            className="flex-1 rounded-full bg-[color:var(--primary)] px-3 py-2 text-center text-sm text-[color:var(--primary-foreground)] transition hover:opacity-90"
          >
            Ver producto
          </Link>
          <a
            href={vendido ? undefined : waConsultar(p.nombre, p.id)}
            target="_blank"
            rel="noreferrer"
            aria-disabled={vendido}
            className={`btn-gold-outline rounded-full px-3 py-2 text-sm ${
              vendido ? "pointer-events-none opacity-50" : ""
            }`}
          >
            Consultar
          </a>
        </div>
      </div>
    </article>
  );
}
