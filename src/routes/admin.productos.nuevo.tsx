import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Ornament } from "@/components/brand/Ornament";
import { RequireAdmin } from "@/components/RequireAdmin";
import {
  CATEGORIAS,
  CONDICIONES,
  crearProducto,
  type Categoria,
  type Condicion,
  type ProductoImagen,
} from "@/lib/products";

export const Route = createFileRoute("/admin/productos/nuevo")({
  head: () => ({ meta: [{ title: "Nuevo producto — Se Va Todo" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <RequireAdmin>
      <Nuevo />
    </RequireAdmin>
  ),
});

function Nuevo() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            const form = new FormData(e.currentTarget);
            const imagenPrincipal = String(form.get("imagenPrincipal") || "").trim();
            const imagenAlt = String(form.get("imagenAlt") || "").trim();
            const imagenesAdicionales = String(form.get("imagenesAdicionales") || "")
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);

            const imagenes: ProductoImagen[] = [];
            if (imagenPrincipal) {
              imagenes.push({ url: `/productos/${imagenPrincipal}`, alt: imagenAlt || undefined });
            }
            for (const archivo of imagenesAdicionales) {
              imagenes.push({ url: `/productos/${archivo}` });
            }

            setSaving(true);
            try {
              await crearProducto({
                nombre: String(form.get("nombre")),
                categoria: form.get("categoria") as Categoria,
                precio: Number(form.get("precio")),
                descripcion: String(form.get("descripcion") || ""),
                condicion: form.get("condicion") as Condicion,
                cantidad: Number(form.get("cantidad") || 1),
                medidas: String(form.get("medidas") || "") || undefined,
                observaciones: String(form.get("observaciones") || "") || undefined,
                entrega: String(form.get("entrega") || "") || undefined,
                ubicacion: String(form.get("ubicacion") || "") || undefined,
                imagenes,
                destacado: form.get("destacado") === "on",
                visible: form.get("visible") === "on",
                fechaPublicacion: String(form.get("fechaPublicacion")),
              });
              navigate({ to: "/admin/dashboard" });
            } catch (err) {
              setError(err instanceof Error ? err.message : "No se pudo guardar el producto.");
            } finally {
              setSaving(false);
            }
          }}
        >
          <Field label="Nombre">
            <input name="nombre" required className={input} placeholder="Sillón de madera con almohadón" />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Categoría">
              <select name="categoria" className={input}>
                {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Precio (ARS)">
              <input name="precio" required type="number" min={0} className={input} placeholder="85000" />
            </Field>
          </div>

          <Field label="Descripción">
            <textarea name="descripcion" rows={4} className={input} placeholder="Detalles del producto…" />
          </Field>

          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Condición">
              <select name="condicion" className={input}>{CONDICIONES.map((c) => <option key={c}>{c}</option>)}</select>
            </Field>
            <Field label="Estado">
              <input className={`${input} bg-[color:var(--muted)] text-[color:var(--warm-gray)]`} value="Disponible" disabled />
            </Field>
            <Field label="Cantidad">
              <input name="cantidad" type="number" min={0} defaultValue={1} className={input} />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Medidas"><input name="medidas" className={input} placeholder="70 × 75 × 90 cm" /></Field>
            <Field label="Forma de entrega"><input name="entrega" className={input} placeholder="Retiro o envío" /></Field>
          </div>

          <Field label="Ubicación para retiro">
            <input name="ubicacion" className={input} placeholder="Neuquén Capital" />
          </Field>

          <Field label="Observaciones">
            <textarea name="observaciones" rows={2} className={input} placeholder="Notas adicionales…" />
          </Field>

          <div className="rounded-xl border border-dashed border-[color:var(--gold)]/50 p-4">
            <p className="text-xs text-[color:var(--warm-gray)]">
              Copiá los archivos de foto a la carpeta <code>public/productos/</code> del repo y escribí acá el
              nombre del archivo (ej: <code>sillon-madera-1.jpg</code>). Todavía no se suben desde este formulario.
            </p>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <Field label="Archivo de imagen principal">
                <input name="imagenPrincipal" className={input} placeholder="sillon-madera-1.jpg" />
              </Field>
              <Field label="Descripción de la imagen (alt)">
                <input name="imagenAlt" className={input} placeholder="Sillón de madera visto de frente" />
              </Field>
            </div>
            <div className="mt-5">
              <Field label="Archivos de imágenes adicionales (separados por coma)">
                <input name="imagenesAdicionales" className={input} placeholder="sillon-madera-2.jpg, sillon-madera-3.jpg" />
              </Field>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Fecha de publicación">
              <input name="fechaPublicacion" type="date" className={input} defaultValue={new Date().toISOString().slice(0, 10)} />
            </Field>
            <div className="flex items-end gap-6">
              <label className="inline-flex items-center gap-2 text-sm text-[color:var(--chocolate)]">
                <input name="destacado" type="checkbox" className="h-4 w-4 accent-[color:var(--gold)]" /> Destacado
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-[color:var(--chocolate)]">
                <input name="visible" type="checkbox" defaultChecked className="h-4 w-4 accent-[color:var(--gold)]" /> Visible
              </label>
            </div>
          </div>

          {error && (
            <p className="rounded-lg border border-[color:var(--terracotta)]/50 bg-[color:var(--terracotta)]/10 p-3 text-sm text-[color:var(--chocolate)]">
              {error}
            </p>
          )}

          <div className="mt-3 flex flex-wrap justify-end gap-3">
            <Link to="/admin/dashboard" className="btn-gold-outline rounded-full px-5 py-2.5 text-sm">
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[color:var(--primary)] px-6 py-2.5 text-sm text-[color:var(--primary-foreground)] hover:opacity-90 disabled:opacity-60"
            >
              {saving ? "Publicando…" : "Publicar"}
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
