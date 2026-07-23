import type { Producto } from "@/lib/products";

export function ProductImage({
  producto,
  className = "",
  large = false,
}: {
  producto: Producto;
  className?: string;
  large?: boolean;
}) {
  const initials = producto.nombre
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, ${producto.swatch}, oklch(0.88 0.03 75))`,
      }}
    >
      <div className="absolute inset-0 opacity-20 mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, oklch(1 0 0 / 0.5), transparent 40%), radial-gradient(circle at 80% 70%, oklch(0.3 0.03 45 / 0.4), transparent 45%)",
        }}
      />
      <div className="absolute inset-3 rounded-lg border border-[color:var(--gold)]/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`font-serif ${large ? "text-7xl" : "text-4xl"} text-[color:var(--ivory)] drop-shadow`}
        >
          {initials}
        </span>
      </div>
    </div>
  );
}
