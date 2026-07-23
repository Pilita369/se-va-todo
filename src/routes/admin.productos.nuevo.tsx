import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { Ornament } from "@/components/brand/Ornament";
import { CATEGORIAS, CONDICIONES, ESTADOS } from "@/lib/products";

export const Route = createFileRoute("/admin/productos/nuevo")({
  head: () => ({ meta: [{ title: "Nuevo producto — Se Va Todo" }, { name: "robots", content: "noindex" }] }),
  component: Nuevo,
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

        <form
          className="card-ornate grid gap-5 p-6 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Se guardará en Lovable Cloud al conectar la base de datos.");
          }}
        >
          <Field label="Nombre">
            <input required className={input} placeholder="Sillón de madera con almohadón" />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Categoría">
              <select className={input}>
                {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Precio (ARS)">
              <input required type="number" min={0} className={input} placeholder="85000" />
            </Field>
          </div>

          <Field label="Descripción">
            <textarea rows={4} className={input} placeholder="Detalles del producto…" />
          </Field>

          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Condición">
              <select className={input}>{CONDICIONES.map((c) => <option key={c}>{c}</option>)}</select>
            </Field>
            <Field label="Estado">
              <select className={input}>{ESTADOS.map((c) => <option key={c}>{c}</option>)}</select>
            </Field>
            <Field label="Cantidad">
              <input type="number" min={0} defaultValue={1} className={input} />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Medidas"><input className={input} placeholder="70 × 75 × 90 cm" /></Field>
            <Field label="Forma de entrega"><input className={input} placeholder="Retiro o envío" /></Field>
          </div>

          <Field label="Ubicación para retiro">
            <input className={input} placeholder="Neuquén Capital" />
          </Field>

          <Field label="Observaciones">
            <textarea rows={2} className={input} placeholder="Notas adicionales…" />
          </Field>

          <Field label="Fotografía principal">
            <input type="file" accept="image/*" capture="environment" className={input} />
          </Field>
          <Field label="Fotografías adicionales">
            <input type="file" accept="image/*" multiple className={input} />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Fecha de publicación">
              <input type="date" className={input} defaultValue={new Date().toISOString().slice(0, 10)} />
            </Field>
            <div className="flex items-end gap-6">
              <label className="inline-flex items-center gap-2 text-sm text-[color:var(--chocolate)]">
                <input type="checkbox" className="h-4 w-4 accent-[color:var(--gold)]" /> Destacado
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-[color:var(--chocolate)]">
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-[color:var(--gold)]" /> Visible
              </label>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap justify-end gap-3">
            <Link to="/admin/dashboard" className="btn-gold-outline rounded-full px-5 py-2.5 text-sm">
              Cancelar
            </Link>
            <button type="button" className="btn-gold-outline rounded-full px-5 py-2.5 text-sm">
              Vista previa
            </button>
            <button
              type="submit"
              className="rounded-full bg-[color:var(--primary)] px-6 py-2.5 text-sm text-[color:var(--primary-foreground)] hover:opacity-90"
            >
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const input =
  "w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-4 py-2.5 text-sm outline-none focus:border-[color:var(--gold)]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-widest text-[color:var(--gold)]">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
