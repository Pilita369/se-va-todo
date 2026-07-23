import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Ornament } from "@/components/brand/Ornament";
import { ProductImage } from "@/components/ProductImage";
import { PRODUCTOS, formatPrice, type Producto } from "@/lib/products";
import { Copy, Share2, Plus, Eye, Pencil, Trash2, Bookmark, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Panel — Se Va Todo" }, { name: "robots", content: "noindex" }] }),
  component: Dashboard,
});

function Dashboard() {
  const stats = useMemo(() => {
    const disponibles = PRODUCTOS.filter((p) => p.estado === "Disponible");
    const reservados = PRODUCTOS.filter((p) => p.estado === "Reservado");
    const vendidos = PRODUCTOS.filter((p) => p.estado === "Vendido");
    return {
      publicados: PRODUCTOS.filter((p) => p.visible).length,
      disponibles: disponibles.length,
      reservados: reservados.length,
      vendidos: vendidos.length,
      valorDisp: disponibles.reduce((s, p) => s + p.precio, 0),
      recaudado: vendidos.reduce((s, p) => s + p.precio, 0),
    };
  }, []);

  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.origin : "https://sevatodo.app";
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-[color:var(--border)]/70 bg-[color:var(--background)]/85 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4">
          <div className="flex min-w-0 items-center gap-4">
            <Logo />
            <span className="hidden rounded-full border border-[color:var(--gold)]/40 px-3 py-0.5 text-[10px] uppercase tracking-widest text-[color:var(--gold)] sm:inline-block">
              Panel privado
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-sm text-[color:var(--warm-gray)] hover:text-[color:var(--chocolate)]">
              Ver sitio →
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-[color:var(--gold)]">
              Buen día ·
            </div>
            <h1 className="mt-1 font-serif text-4xl text-[color:var(--chocolate)]">Tu selección</h1>
          </div>
          <Link
            to="/admin/productos/nuevo"
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)] px-4 py-2.5 text-sm text-[color:var(--primary-foreground)] hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Agregar producto
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <StatCard label="Publicados" value={stats.publicados} />
          <StatCard label="Disponibles" value={stats.disponibles} tone="sage" />
          <StatCard label="Reservados" value={stats.reservados} tone="terracotta" />
          <StatCard label="Vendidos" value={stats.vendidos} tone="gray" />
          <StatCard label="Valor disponible" value={formatPrice(stats.valorDisp)} />
          <StatCard label="Recaudado" value={formatPrice(stats.recaudado)} tone="gold" />
        </div>

        {/* Compartir */}
        <div className="card-ornate mt-6 flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1">
            <div className="text-[11px] uppercase tracking-widest text-[color:var(--gold)]">
              Tu enlace para compartir
            </div>
            <div className="mt-1 truncate font-mono text-sm text-[color:var(--chocolate)]">{url}</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={copy}
              className="btn-gold-outline inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm"
            >
              <Copy className="h-4 w-4" /> {copied ? "¡Copiado!" : "Copiar enlace"}
            </button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Mirá lo que se va: ${url}`)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)] px-4 py-2 text-sm text-[color:var(--primary-foreground)] hover:opacity-90"
            >
              <Share2 className="h-4 w-4" /> Compartir WhatsApp
            </a>
          </div>
        </div>

        <Ornament label="Productos" />

        {/* Tabla desktop */}
        <div className="card-ornate hidden overflow-hidden md:block">
          <table className="w-full text-sm">
            <thead className="bg-[color:var(--sand)]/50 text-left text-[11px] uppercase tracking-widest text-[color:var(--gold)]">
              <tr>
                <th className="p-4">Producto</th>
                <th className="p-4">Categoría</th>
                <th className="p-4">Precio</th>
                <th className="p-4">Condición</th>
                <th className="p-4">Estado</th>
                <th className="p-4">Publicado</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTOS.map((p) => (
                <tr key={p.id} className="border-t border-[color:var(--border)]/60">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                        <ProductImage producto={p} className="h-full w-full" />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate font-medium text-[color:var(--chocolate)]">{p.nombre}</div>
                        <div className="text-xs text-[color:var(--warm-gray)]">#{p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-[color:var(--warm-gray)]">{p.categoria}</td>
                  <td className="p-3 font-serif">{formatPrice(p.precio)}</td>
                  <td className="p-3 text-[color:var(--warm-gray)]">{p.condicion}</td>
                  <td className="p-3"><EstadoTag e={p.estado} /></td>
                  <td className="p-3 text-[color:var(--warm-gray)]">{p.fechaPublicacion}</td>
                  <td className="p-3">
                    <RowActions p={p} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards mobile */}
        <div className="grid gap-3 md:hidden">
          {PRODUCTOS.map((p) => (
            <div key={p.id} className="card-ornate p-4">
              <div className="flex gap-3">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                  <ProductImage producto={p} className="h-full w-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-serif text-lg text-[color:var(--chocolate)]">{p.nombre}</div>
                  <div className="text-xs text-[color:var(--warm-gray)]">{p.categoria} · {p.condicion}</div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-serif text-[color:var(--chocolate)]">{formatPrice(p.precio)}</span>
                    <EstadoTag e={p.estado} />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <RowActions p={p} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string | number;
  tone?: "sage" | "terracotta" | "gray" | "gold";
}) {
  const bg: Record<string, string> = {
    sage: "bg-[color:var(--sage)]/20",
    terracotta: "bg-[color:var(--terracotta)]/15",
    gray: "bg-[color:var(--muted)]",
    gold: "bg-[color:var(--gold)]/15",
    default: "bg-[color:var(--card)]",
  };
  return (
    <div className={`card-ornate p-4 ${bg[tone ?? "default"]}`}>
      <div className="text-[11px] uppercase tracking-widest text-[color:var(--gold)]">{label}</div>
      <div className="mt-1 font-serif text-2xl text-[color:var(--chocolate)]">{value}</div>
    </div>
  );
}

function EstadoTag({ e }: { e: Producto["estado"] }) {
  const map = {
    Disponible: "bg-[color:var(--sage)]/25 border-[color:var(--sage)]",
    Reservado: "bg-[color:var(--terracotta)]/20 border-[color:var(--terracotta)]/60",
    Vendido: "bg-[color:var(--muted)] border-[color:var(--warm-gray)]/40 text-[color:var(--warm-gray)]",
  } as const;
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] ${map[e]}`}>
      {e === "Vendido" ? "Ya se fue" : e}
    </span>
  );
}

function RowActions({ p }: { p: Producto }) {
  return (
    <div className="flex flex-wrap justify-end gap-1.5">
      <IconBtn title="Editar"><Pencil className="h-3.5 w-3.5" /></IconBtn>
      <Link
        to="/producto/$id"
        params={{ id: p.id }}
        className="rounded-full border border-[color:var(--border)] p-1.5 text-[color:var(--warm-gray)] hover:bg-[color:var(--muted)]"
        title="Ver publicación"
      >
        <Eye className="h-3.5 w-3.5" />
      </Link>
      <IconBtn title="Reservar"><Bookmark className="h-3.5 w-3.5" /></IconBtn>
      <IconBtn title="Marcar como vendido"><CheckCircle2 className="h-3.5 w-3.5" /></IconBtn>
      <IconBtn title="Eliminar" danger><Trash2 className="h-3.5 w-3.5" /></IconBtn>
    </div>
  );
}

function IconBtn({
  children,
  title,
  danger,
}: {
  children: React.ReactNode;
  title: string;
  danger?: boolean;
}) {
  return (
    <button
      title={title}
      className={`rounded-full border p-1.5 transition ${
        danger
          ? "border-[color:var(--terracotta)]/50 text-[color:var(--terracotta)] hover:bg-[color:var(--terracotta)]/10"
          : "border-[color:var(--border)] text-[color:var(--warm-gray)] hover:bg-[color:var(--muted)]"
      }`}
    >
      {children}
    </button>
  );
}
