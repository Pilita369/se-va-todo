import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex flex-col leading-none ${className}`}>
      <span className="font-serif text-2xl tracking-tight text-[color:var(--chocolate)] sm:text-3xl">
        Se Va Todo
      </span>
      <span className="mt-0.5 text-[10px] uppercase tracking-[0.28em] text-[color:var(--gold)]">
        · Venta privada ·
      </span>
    </Link>
  );
}
