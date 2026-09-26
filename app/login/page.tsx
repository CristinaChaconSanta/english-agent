"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const ready = hasSupabaseEnv();

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!ready) {
      setMessage("Falta la configuración de Supabase en el entorno.");
      return;
    }
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setMessage(error ? "No se pudo enviar el enlace. Revisa el correo y vuelve a intentar." : "Revisa el correo. El enlace abre la sesión.");
  }

  return (
    <main className="lesson min-h-dvh px-4 py-8" style={{ background: "#FFD23F", color: "#111111", ["--lesson-card" as string]: "#FFF8EC", ["--lesson-line" as string]: "#111111", ["--lesson-shadow" as string]: "#111111" }}>
      <div className="mx-auto w-full max-w-[390px]">
        <h1 className="mb-4 font-display text-5xl tracking-tight">Entrar</h1>
        <Card>
          <form onSubmit={onSubmit}>
            <label className="mb-2 block" htmlFor="email">
              Correo
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mb-3 min-h-12 w-full rounded-2xl border-[3px] border-ink px-3"
            />
            <Button type="submit">Enviar enlace</Button>
          </form>
          {message ? <p className="mt-3">{message}</p> : null}
        </Card>
      </div>
    </main>
  );
}
