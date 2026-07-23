export function Ornament({ label }: { label?: string }) {
  return (
    <div className="ornament-divider my-6 text-[color:var(--gold)]">
      <span className="font-serif text-sm italic tracking-wide">{label ?? "❦"}</span>
    </div>
  );
}

export function CornerFlourish() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute h-10 w-10 text-[color:var(--gold)]/60"
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M2 20 C 2 10, 10 2, 20 2 M20 2 C 15 6, 12 10, 12 16 M2 20 C 6 15, 10 12, 16 12"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
