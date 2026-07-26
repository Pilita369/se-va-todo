import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { ProductImage } from "@/components/ProductImage";
import { Ornament } from "@/components/brand/Ornament";
import { fetchProducto, formatPrice, waComprar, waConsultar } from "@/lib/products";

export const Route = createFileRoute("/producto/$id")({
  loader: async ({ params }) => {
    const p = await fetchProducto(params.id);
    if (!p) throw notFound();
    return { producto: p };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.producto;
    if (!p) return { meta: [{ title: "Producto no encontrado — Se Va Todo" }] };
    return {
      meta: [
        { title: `${p.nombre} — Se Va Todo` },
        { name: "description", content: p.descripcion.slice(0, 155) },
        { property: "og:title", content: `${p.nombre} — Se Va Todo` },
        { property: "og:description", content: p.descripcion.slice(0, 155) },
      ],
    };
  },
  notFoundComponent: () => (
    <PublicLayout>
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="font-serif text-4xl text-[color:var(--chocolate)]">Ya no está.</h1>
        <p className="mt-3 text-[color:var(--warm-gray)]">
          Puede que este producto haya sido vendido o ya no esté publicado.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-[color:var(--primary)] px-5 py-2.5 text-[color:var(--primary-foreground)]"
        >
          Volver al catálogo
        </Link>
      </div>
    </PublicLayout>
  ),
  errorComponent: ({ reset }) => (
    <PublicLayout>
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="font-serif text-3xl text-[color:var(--chocolate)]">No se pudo cargar.</h1>
        <button onClick={reset} className="mt-4 rounded-full bg-[color:var(--primary)] px-4 py-2 text-sm text-[color:var(--primary-foreground)]">
          Reintentar
        </button>
      </div>
    </PublicLayout>
  ),
  component: Detail,
});

function Detail() {
  const { producto: p } = Route.useLoaderData();
  const vendido = p.estado === "Vendido";

  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl px-5 py-10">
        <Link
          to="/"
          className="text-sm text-[color:var(--warm-gray)] hover:text-[color:var(--chocolate)]"
        >
          ← Volver al catálogo
        </Link>

        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <div>
            <div className="card-ornate overflow-hidden">
              <ProductImage producto={p} className="aspect-[4/3] w-full" large />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="card-ornate aspect-square overflow-hidden">
                  <ProductImage producto={p} className="h-full w-full" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-widest text-[color:var(--gold)]">
              {p.categoria}
            </div>
            <h1 className="mt-2 font-serif text-4xl leading-tight text-[color:var(--chocolate)] sm:text-5xl">
              {p.nombre}
            </h1>
            <div className="mt-3 font-serif text-3xl text-[color:var(--chocolate)]">
              {formatPrice(p.precio)}
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <Chip>{p.condicion}</Chip>
              <Chip tone={p.estado}>{p.estado === "Vendido" ? "Ya se fue" : p.estado}</Chip>
              {p.cantidad === 1 && !vendido && <Chip tone="gold">Hay uno solo</Chip>}
            </div>

            <Ornament />

            <p className="text-[color:var(--chocolate)]/90">{p.descripcion}</p>

            <dl className="mt-5 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              {p.medidas && <Row label="Medidas" value={p.medidas} />}
              {p.entrega && <Row label="Entrega" value={p.entrega} />}
              {p.ubicacion && <Row label="Ubicación" value={p.ubicacion} />}
              {p.observaciones && <Row label="Observaciones" value={p.observaciones} />}
            </dl>

            {!vendido ? (
              <>
                <p className="mt-6 font-serif italic text-[color:var(--terracotta)]">
                  Hay uno solo. Consultá antes de que se vaya.
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a
                    href={waComprar(p.nombre, p.precio, p.id)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 rounded-full bg-[color:var(--primary)] px-6 py-3 text-center text-[color:var(--primary-foreground)] transition hover:opacity-90"
                  >
                    Quiero comprarlo
                  </a>
                  <a
                    href={waConsultar(p.nombre, p.id)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gold-outline rounded-full px-6 py-3 text-sm"
                  >
                    Consultar por WhatsApp
                  </a>
                </div>
                <p className="mt-4 text-xs text-[color:var(--warm-gray)]">
                  La compra, el pago y la entrega se coordinan directamente por WhatsApp.
                </p>
              </>
            ) : (
              <p className="mt-6 rounded-2xl border border-[color:var(--border)] bg-[color:var(--muted)] p-4 text-center text-sm text-[color:var(--warm-gray)]">
                Este producto ya encontró su nuevo lugar.
              </p>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[color:var(--border)]/60 bg-[color:var(--card)] p-3">
      <dt className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">{label}</dt>
      <dd className="mt-0.5 text-[color:var(--chocolate)]">{value}</dd>
    </div>
  );
}

function Chip({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone?: "Disponible" | "Reservado" | "Vendido" | "gold";
}) {
  const map: Record<string, string> = {
    Disponible: "bg-[color:var(--sage)]/25 border-[color:var(--sage)] text-[color:var(--chocolate)]",
    Reservado: "bg-[color:var(--terracotta)]/20 border-[color:var(--terracotta)]/60 text-[color:var(--chocolate)]",
    Vendido: "bg-[color:var(--muted)] border-[color:var(--warm-gray)]/40 text-[color:var(--warm-gray)]",
    gold: "bg-[color:var(--ivory)] border-[color:var(--gold)] text-[color:var(--chocolate)]",
    default: "bg-[color:var(--sand)] border-[color:var(--border)] text-[color:var(--chocolate)]",
  };
  return (
    <span className={`rounded-full border px-2.5 py-1 ${map[tone ?? "default"]}`}>{children}</span>
  );
}
