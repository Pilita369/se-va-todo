import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";

// Supabase Auth siempre necesita un email por dentro. El login solo pide un
// nombre de usuario, así que lo convertimos a un email sintético con este dominio.
const USERNAME_DOMAIN = "se-va-todo.local";

export function usernameToEmail(username: string) {
  return `${username.trim().toLowerCase()}@${USERNAME_DOMAIN}`;
}

export function useSession() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return session; // undefined = cargando, null = sin sesión
}

export async function signOut() {
  await supabase.auth.signOut();
}
