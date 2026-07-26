import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { ProductCard } from "@/components/ProductCard";
import { Ornament } from "@/components/brand/Ornament";
import {
  CATEGORIAS,
  CONDICIONES,
  ESTADOS,
  fetchProductosVisibles,
  type Categoria,
  type Condicion,
  type Estado,
} from "@/lib/products";

export const Route = createFileRoute("/")({
  loader: () => fetchProductosVisibles(),
  head: () => ({
    meta: [
      { title: "Se Va Todo — Estamos haciendo lugar. Mirá antes de que se vaya." },
      {
        name: "description",
        content:
          "Venta privada de objetos únicos: muebles, perfumes, instrumentos, tecnología, decoración y más. Hay uno solo de cada uno.",
      },
      { property: "og:title", content: "Se Va Todo — Venta privada" },
      {
        property: "og:description",
        content: "Una selección privada de objetos que buscan un nuevo lugar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const productos = Route.useLoaderData();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Categoria | "Todas">("Todas");
  const [cond, setCond] = useState<Condicion | "Todas">("Todas");
  const [estado, setEstado] = useState<Estado | "Todos">("Todos");

  const visibles = productos;
  const destacados = useMemo(
    () => visibles.filter((p) => p.destacado && p.estado !== "Vendido").slice(0, 3),
    [visibles],
  );

  const filtrados = useMemo(() => {
    let list = visibles.filter((p) => {
      if (q && !p.nombre.toLowerCase().includes(q.toLowerCase())) return false;
      if (cat !== "Todas" && p.categoria !== cat) return false;
      if (cond !== "Todas" && p.condicion !== cond) return false;
      if (estado !== "Todos" && p.estado !== estado) return false;
      return true;
    });
    list = [...list].sort((a, b) => b.fechaPublicacion.localeCompare(a.fechaPublicacion));
    // vendidos al final
    list = [...list].sort((a, b) => Number(a.estado === "Vendido") - Number(b.estado === "Vendido"));
    return list;
  }, [visibles, q, cat, cond, estado]);

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pt-10 pb-14 sm:pt-16 sm:pb-20">
          <div className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/50 bg-[color:var(--ivory)]/70 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-[color:var(--gold)]">
                · Venta privada ·
              </div>
              <h1 className="font-serif text-5xl leading-[1.05] text-[color:var(--chocolate)] sm:text-6xl md:text-7xl">
                Estamos <em className="italic">haciendo lugar.</em>
                <br />
                Mirá antes de que se vaya.
              </h1>
              <p className="mt-5 max-w-lg text-[color:var(--warm-gray)]">
                Una selección privada de objetos únicos: muebles, perfumes, instrumentos,
                tecnología, decoración y más. Cuando se vende, desaparece.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#catalogo"
                  className="rounded-full bg-[color:var(--primary)] px-6 py-3 text-[color:var(--primary-foreground)] shadow-sm transition hover:opacity-90"
                >
                  Ver qué queda
                </a>
                <a
                  href="#destacados"
                  className="btn-gold-outline rounded-full px-6 py-3 text-sm"
                >
                  Destacados
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[color:var(--warm-gray)]">
                <span>· Hay uno solo</span>
                <span>· Cuando se vende, desaparece</span>
                <span>· Coordinamos por WhatsApp</span>
              </div>
            </div>

            {/* Composición editorial */}
            <div className="relative hidden aspect-[5/6] md:block">
              <div className="absolute left-0 top-6 h-3/5 w-1/2 rotate-[-3deg] rounded-2xl border border-[color:var(--gold)]/50 bg-[color:var(--sand)] p-2 shadow-lg">
                <div className="h-full w-full rounded-xl" style={{ background: destacados[0]?.swatch ?? "var(--sage)" }} />
              </div>
              <div className="absolute right-0 top-0 h-2/3 w-3/5 rotate-[4deg] rounded-2xl border border-[color:var(--gold)]/50 bg-[color:var(--sand)] p-2 shadow-lg">
                <div className="h-full w-full rounded-xl" style={{ background: destacados[1]?.swatch ?? "var(--rose-old)" }} />
              </div>
              <div className="absolute bottom-0 left-8 h-2/5 w-3/5 rotate-[-1deg] rounded-2xl border border-[color:var(--gold)]/50 bg-[color:var(--sand)] p-2 shadow-lg">
                <div className="h-full w-full rounded-xl" style={{ background: destacados[2]?.swatch ?? "var(--terracotta)" }} />
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="rotate-[-8deg] rounded-full border-2 border-[color:var(--terracotta)] bg-[color:var(--ivory)]/95 px-5 py-2 font-serif text-lg italic text-[color:var(--terracotta)] shadow-md">
                  Venta de garage
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destacados */}
      {destacados.length > 0 && (
        <section id="destacados" className="mx-auto max-w-6xl px-5 py-10">
          <Ornament label="Destacados de la semana" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destacados.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </section>
      )}

      {/* Catálogo */}
      <section id="catalogo" className="mx-auto max-w-6xl px-5 py-10">
        <Ornament label="Entrá a ver qué queda" />

        <div className="card-ornate mb-8 grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar producto…"
            className="rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-4 py-2 text-sm outline-none focus:border-[color:var(--gold)]"
          />
          <Select value={cat} onChange={(v) => setCat(v as Categoria | "Todas")} options={["Todas", ...CATEGORIAS]} />
          <Select value={cond} onChange={(v) => setCond(v as Condicion | "Todas")} options={["Todas", ...CONDICIONES]} />
          <Select value={estado} onChange={(v) => setEstado(v as Estado | "Todos")} options={["Todos", ...ESTADOS]} />
        </div>

        {filtrados.length === 0 ? (
          <p className="py-16 text-center font-serif text-2xl italic text-[color:var(--warm-gray)]">
            No hay productos con esos filtros.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtrados.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </section>
    </PublicLayout>
  );
}

type Option = string | { value: string; label: string };
function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-4 py-2 text-sm outline-none focus:border-[color:var(--gold)]"
    >
      {options.map((o) => {
        const v = typeof o === "string" ? o : o.value;
        const l = typeof o === "string" ? o : o.label;
        return (
          <option key={v} value={v}>
            {l}
          </option>
        );
      })}
    </select>
  );
}
