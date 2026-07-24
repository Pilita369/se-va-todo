import { supabase } from "./supabase";

export type Condicion = "Nuevo" | "Con poco uso" | "En buen estado" | "Usado";
export type Estado = "Disponible" | "Reservado" | "Vendido";
export type Categoria =
  | "Muebles"
  | "Perfumes"
  | "Instrumentos musicales"
  | "Electrodomésticos"
  | "Tecnología"
  | "Decoración"
  | "Ropa y accesorios"
  | "Herramientas"
  | "Hogar"
  | "Otros";

export const CATEGORIAS: Categoria[] = [
  "Muebles",
  "Perfumes",
  "Instrumentos musicales",
  "Electrodomésticos",
  "Tecnología",
  "Decoración",
  "Ropa y accesorios",
  "Herramientas",
  "Hogar",
  "Otros",
];

export const CONDICIONES: Condicion[] = ["Nuevo", "Con poco uso", "En buen estado", "Usado"];
export const ESTADOS: Estado[] = ["Disponible", "Reservado", "Vendido"];

export const WHATSAPP_NUMBER = "5492996152272";
export const WHATSAPP_DISPLAY = "+54 9 299 615-2272";

// Las fotos viven en public/productos/<archivo> — url acá es la ruta relativa a ese archivo.
export interface ProductoImagen {
  url: string;
  alt?: string;
}

export interface Producto {
  id: string;
  nombre: string;
  categoria: Categoria;
  precio: number;
  descripcion: string;
  condicion: Condicion;
  estado: Estado;
  cantidad: number;
  medidas?: string;
  observaciones?: string;
  entrega?: string;
  ubicacion?: string;
  imagenes: ProductoImagen[];
  destacado: boolean;
  visible: boolean;
  fechaPublicacion: string;
  swatch?: string; // color css de respaldo cuando no hay foto
}

interface ProductoRow {
  id: string;
  nombre: string;
  categoria: Categoria;
  precio: number | string;
  descripcion: string;
  condicion: Condicion;
  estado: Estado;
  cantidad: number;
  medidas: string | null;
  observaciones: string | null;
  entrega: string | null;
  ubicacion: string | null;
  imagenes: ProductoImagen[] | null;
  destacado: boolean;
  visible: boolean;
  fecha_publicacion: string;
  swatch: string | null;
}

const PRODUCTO_COLUMNS =
  "id, nombre, categoria, precio, descripcion, condicion, estado, cantidad, medidas, observaciones, entrega, ubicacion, imagenes, destacado, visible, fecha_publicacion, swatch";

function fromRow(row: ProductoRow): Producto {
  return {
    id: row.id,
    nombre: row.nombre,
    categoria: row.categoria,
    precio: Number(row.precio),
    descripcion: row.descripcion,
    condicion: row.condicion,
    estado: row.estado,
    cantidad: row.cantidad,
    medidas: row.medidas ?? undefined,
    observaciones: row.observaciones ?? undefined,
    entrega: row.entrega ?? undefined,
    ubicacion: row.ubicacion ?? undefined,
    imagenes: row.imagenes ?? [],
    destacado: row.destacado,
    visible: row.visible,
    fechaPublicacion: row.fecha_publicacion,
    swatch: row.swatch ?? undefined,
  };
}

export async function fetchProductosVisibles(): Promise<Producto[]> {
  const { data, error } = await supabase
    .from("productos")
    .select(PRODUCTO_COLUMNS)
    .eq("visible", true)
    .order("fecha_publicacion", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(fromRow);
}

export async function fetchProducto(id: string): Promise<Producto | null> {
  const { data, error } = await supabase
    .from("productos")
    .select(PRODUCTO_COLUMNS)
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? fromRow(data) : null;
}

// Trae todos los productos (incluye no visibles). Requiere sesión de admin: la
// policy RLS "lectura completa para admin" sólo deja pasar al rol authenticated.
export async function fetchProductosAdmin(): Promise<Producto[]> {
  const { data, error } = await supabase
    .from("productos")
    .select(PRODUCTO_COLUMNS)
    .order("fecha_publicacion", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(fromRow);
}

export interface NuevoProductoInput {
  nombre: string;
  categoria: Categoria;
  precio: number;
  descripcion: string;
  condicion: Condicion;
  cantidad: number;
  medidas?: string;
  observaciones?: string;
  entrega?: string;
  ubicacion?: string;
  imagenes: ProductoImagen[];
  destacado: boolean;
  visible: boolean;
  fechaPublicacion: string;
}

export async function crearProducto(input: NuevoProductoInput): Promise<void> {
  const { error } = await supabase.from("productos").insert({
    nombre: input.nombre,
    categoria: input.categoria,
    precio: input.precio,
    descripcion: input.descripcion,
    condicion: input.condicion,
    cantidad: input.cantidad,
    medidas: input.medidas || null,
    observaciones: input.observaciones || null,
    entrega: input.entrega || null,
    ubicacion: input.ubicacion || null,
    imagenes: input.imagenes,
    foto_url: input.imagenes[0]?.url ?? null,
    destacado: input.destacado,
    visible: input.visible,
    fecha_publicacion: input.fechaPublicacion,
  });
  if (error) throw error;
}

export const formatPrice = (n: number) =>
  "$" + n.toLocaleString("es-AR", { maximumFractionDigits: 0 });

export const waConsultar = (nombre: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola, vi el producto ${nombre} en Se Va Todo. ¿Sigue disponible?`,
  )}`;

export const waComprar = (nombre: string, precio: number) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola, quiero comprar ${nombre}, publicado a ${formatPrice(precio)}. Quisiera coordinar el pago y la entrega.`,
  )}`;
