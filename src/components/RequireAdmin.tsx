import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSession } from "@/lib/auth";
import type { ReactNode } from "react";

export function RequireAdmin({ children }: { children: ReactNode }) {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session === null) navigate({ to: "/admin" });
  }, [session, navigate]);

  if (!session) {
    return (
      <div className="grid min-h-screen place-items-center text-sm text-[color:var(--warm-gray)]">
        Verificando acceso…
      </div>
    );
  }

  return <>{children}</>;
}
