import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import {
  CATEGORIAS,
  CONDICIONES,
  actualizarProducto,
  crearProducto,
  type Categoria,
  type Condicion,
  type Producto,
  type ProductoImagen,
} from "@/lib/products";
import { subirImagenProducto } from "@/lib/storage";

export function ProductoForm({ producto }: { producto?: Producto }) {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imagenes, setImagenes] = useState<ProductoImagen[]>(producto?.imagenes ?? []);
  const [nombreExistente, setNombreExistente] = useState("");
  const editando = !!producto;

  const agregarArchivo = async (file: File) => {
    setError(null);
    setStatus("Subiendo foto…");
    try {
      const url = await subirImagenProducto(file);
      setImagenes((imgs) => [...imgs, { url }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo subir la foto.");
    } finally {
      setStatus(null);
    }
  };

  const agregarExistente = () => {
    const nombre = nombreExistente.trim();
    if (!nombre) return;
    setImagenes((imgs) => [...imgs, { url: `/productos/${nombre}` }]);
    setNombreExistente("");
  };

  const quitarImagen = (i: number) => {
    setImagenes((imgs) => imgs.filter((_, idx) => idx !== i));
  };

  return (
    <form
      className="card-ornate grid gap-5 p-6 sm:p-8"
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        const form = new FormData(e.currentTarget);
        setSaving(true);
        try {
          setStatus(editando ? "Guardando cambios…" : "Guardando producto…");
          const input = {
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
          };
          if (editando) {
            await actualizarProducto(producto.id, input);
          } else {
            await crearProducto(input);
          }
          navigate({ to: "/admin/dashboard" });
        } catch (err) {
          setError(err instanceof Error ? err.message : "No se pudo guardar el producto.");
        } finally {
          setSaving(false);
          setStatus(null);
        }
      }}
    >
      <Field label="Nombre">
        <input name="nombre" required defaultValue={producto?.nombre} className={input} placeholder="Sillón de madera con almohadón" />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Categoría">
          <select name="categoria" defaultValue={producto?.categoria} className={input}>
            {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Precio (ARS)">
          <input name="precio" required type="number" min={0} defaultValue={producto?.precio} className={input} placeholder="85000" />
        </Field>
      </div>

      <Field label="Descripción">
        <textarea name="descripcion" rows={4} defaultValue={producto?.descripcion} className={input} placeholder="Detalles del producto…" />
      </Field>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Condición">
          <select name="condicion" defaultValue={producto?.condicion} className={input}>
            {CONDICIONES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Estado">
          <input
            className={`${input} bg-[color:var(--muted)] text-[color:var(--warm-gray)]`}
            value={producto?.estado ?? "Disponible"}
            disabled
          />
        </Field>
        <Field label="Cantidad">
          <input name="cantidad" type="number" min={0} defaultValue={producto?.cantidad ?? 1} className={input} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Medidas"><input name="medidas" defaultValue={producto?.medidas} className={input} placeholder="70 × 75 × 90 cm" /></Field>
        <Field label="Forma de entrega"><input name="entrega" defaultValue={producto?.entrega} className={input} placeholder="Retiro o envío" /></Field>
      </div>

      <Field label="Ubicación para retiro">
        <input name="ubicacion" defaultValue={producto?.ubicacion} className={input} placeholder="Neuquén Capital" />
      </Field>

      <Field label="Observaciones">
        <textarea name="observaciones" rows={2} defaultValue={producto?.observaciones} className={input} placeholder="Notas adicionales…" />
      </Field>

      <div className="rounded-xl border border-dashed border-[color:var(--gold)]/50 p-4 space-y-4">
        <span className="text-[11px] uppercase tracking-widest text-[color:var(--gold)]">Fotos</span>

        {imagenes.length > 0 && (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {imagenes.map((img, i) => (
              <div
                key={`${img.url}-${i}`}
                className="relative aspect-square overflow-hidden rounded-lg border border-[color:var(--border)] bg-[color:var(--muted)]"
              >
                <img src={img.url} alt={img.alt || ""} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => quitarImagen(i)}
                  title="Quitar foto"
                  className="absolute right-1 top-1 rounded-full bg-[color:var(--chocolate)]/80 p-1 text-white hover:bg-[color:var(--terracotta)]"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Subir foto nueva (celu o compu)">
            <input
              type="file"
              accept="image/*"
              className={input}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) agregarArchivo(file);
                e.target.value = "";
              }}
            />
          </Field>
          <div className="flex items-end gap-2">
            <Field label="…o nombre ya en public/productos/">
              <input
                value={nombreExistente}
                onChange={(e) => setNombreExistente(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    agregarExistente();
                  }
                }}
                className={input}
                placeholder="1.png"
              />
            </Field>
            <button
              type="button"
              onClick={agregarExistente}
              className="btn-gold-outline shrink-0 rounded-full px-4 py-2.5 text-sm"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Fecha de publicación">
          <input
            name="fechaPublicacion"
            type="date"
            className={input}
            defaultValue={producto?.fechaPublicacion ?? new Date().toISOString().slice(0, 10)}
          />
        </Field>
        <div className="flex items-end gap-6">
          <label className="inline-flex items-center gap-2 text-sm text-[color:var(--chocolate)]">
            <input name="destacado" type="checkbox" defaultChecked={producto?.destacado} className="h-4 w-4 accent-[color:var(--gold)]" /> Destacado
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-[color:var(--chocolate)]">
            <input name="visible" type="checkbox" defaultChecked={producto?.visible ?? true} className="h-4 w-4 accent-[color:var(--gold)]" /> Visible
          </label>
        </div>
      </div>

      {error && (
        <p className="rounded-lg border border-[color:var(--terracotta)]/50 bg-[color:var(--terracotta)]/10 p-3 text-sm text-[color:var(--chocolate)]">
          {error}
        </p>
      )}
      {status && (
        <p className="text-sm text-[color:var(--warm-gray)]">{status}</p>
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
          {saving ? "Guardando…" : editando ? "Guardar cambios" : "Publicar"}
        </button>
      </div>
    </form>
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
