"use client";

import { useState } from "react";

export function SpanishToggle({ es }: { es: string }) {
  const [open, setOpen] = useState(false);
  if (!es) return null;

  return (
    <div className="mt-3">
      <button type="button" className="min-h-12 text-[17px] underline" onClick={() => setOpen((value) => !value)}>
        {open ? "Ocultar español" : "Ver en español"}
      </button>
      {open ? (
        <p lang="es" className="mt-2 text-[17px]">
          {es}
        </p>
      ) : null}
    </div>
  );
}
