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
  imagenes: string[];
  destacado: boolean;
  visible: boolean;
  fechaPublicacion: string;
  swatch: string; // color css for placeholder
}

export const PRODUCTOS: Producto[] = [
  {
    id: "sillon-madera",
    nombre: "Sillón de madera con almohadón",
    categoria: "Muebles",
    precio: 85000,
    descripcion:
      "Sillón individual en madera maciza, restaurado a mano. Almohadón en lino natural, muy cómodo. Ideal para un rincón de lectura.",
    condicion: "Con poco uso",
    estado: "Disponible",
    cantidad: 1,
    medidas: "70 × 75 × 90 cm",
    observaciones: "Ligeras marcas de uso en apoyabrazos.",
    entrega: "Retiro en zona céntrica o envío a coordinar.",
    ubicacion: "Neuquén Capital",
    imagenes: [],
    destacado: true,
    visible: true,
    fechaPublicacion: "2025-07-15",
    swatch: "oklch(0.72 0.06 45)",
  },
  {
    id: "perfume-importado",
    nombre: "Perfume importado 100 ml",
    categoria: "Perfumes",
    precio: 65000,
    descripcion: "Fragancia amaderada, oriental. Frasco original con caja. Casi lleno.",
    condicion: "Con poco uso",
    estado: "Reservado",
    cantidad: 1,
    medidas: "100 ml",
    entrega: "Retiro o envío por correo.",
    ubicacion: "Neuquén Capital",
    imagenes: [],
    destacado: true,
    visible: true,
    fechaPublicacion: "2025-07-18",
    swatch: "oklch(0.78 0.055 20)",
  },
  {
    id: "guitarra-acustica",
    nombre: "Guitarra acústica",
    categoria: "Instrumentos musicales",
    precio: 120000,
    descripcion: "Guitarra acústica de estudio, sonido cálido. Incluye funda.",
    condicion: "En buen estado",
    estado: "Disponible",
    cantidad: 1,
    entrega: "Retiro únicamente.",
    ubicacion: "Neuquén Capital",
    imagenes: [],
    destacado: true,
    visible: true,
    fechaPublicacion: "2025-07-20",
    swatch: "oklch(0.55 0.08 45)",
  },
  {
    id: "mesa-ratona",
    nombre: "Mesa ratona redonda",
    categoria: "Muebles",
    precio: 45000,
    descripcion: "Mesa ratona redonda de madera clara. Base metálica dorada envejecida.",
    condicion: "En buen estado",
    estado: "Disponible",
    cantidad: 1,
    medidas: "Ø 80 × 42 cm",
    ubicacion: "Neuquén Capital",
    imagenes: [],
    destacado: false,
    visible: true,
    fechaPublicacion: "2025-07-10",
    swatch: "oklch(0.82 0.04 78)",
  },
  {
    id: "lampara-mesa",
    nombre: "Lámpara de mesa",
    categoria: "Decoración",
    precio: 28000,
    descripcion: "Lámpara de cerámica con pantalla de lino. Luz cálida.",
    condicion: "Con poco uso",
    estado: "Disponible",
    cantidad: 1,
    ubicacion: "Neuquén Capital",
    imagenes: [],
    destacado: false,
    visible: true,
    fechaPublicacion: "2025-07-05",
    swatch: "oklch(0.72 0.045 145)",
  },
  {
    id: "auriculares-bt",
    nombre: "Auriculares Bluetooth",
    categoria: "Tecnología",
    precio: 42000,
    descripcion: "Auriculares inalámbricos con estuche de carga.",
    condicion: "Usado",
    estado: "Vendido",
    cantidad: 0,
    ubicacion: "Neuquén Capital",
    imagenes: [],
    destacado: false,
    visible: true,
    fechaPublicacion: "2025-06-28",
    swatch: "oklch(0.5 0.02 55)",
  },
];

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

export const getProducto = (id: string) => PRODUCTOS.find((p) => p.id === id);
