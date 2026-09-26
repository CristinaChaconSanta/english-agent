import { BottomBar } from "@/components/ui/bottom-bar";
import { Card } from "@/components/ui/card";
import { Sticker } from "@/components/ui/sticker";
import { WavyDivider } from "@/components/ui/wavy-divider";
import { loadProgress } from "@/lib/progress";

export default async function ProgresoPage() {
  const progress = await loadProgress();

  return (
    <main className="lesson min-h-dvh px-4 pb-28 pt-6" style={{ background: "#FF8FC8", color: "#111111", ["--lesson-card" as string]: "#FFF8EC", ["--lesson-line" as string]: "#111111", ["--lesson-shadow" as string]: "#111111" }}>
      <div className="mx-auto flex w-full max-w-[390px] flex-col gap-4">
        <Sticker>#RACHA</Sticker>
        <h1 className="font-display text-5xl tracking-tight">Progreso</h1>
        <WavyDivider />
        <Card>
          <p className="font-display text-4xl">{progress.streak}</p>
          <p>días seguidos con 25 min</p>
        </Card>
        <Card>
          <p className="font-display text-4xl">{progress.weekMinutes}</p>
          <p>minutos esta semana</p>
        </Card>
        <Card>
          <p className="mb-2 font-display text-2xl">Logros</p>
          {progress.logros.length === 0 ? <p>Todavía no hay una línea guardada.</p> : null}
          <ul className="flex flex-col gap-2">
            {progress.logros.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          {progress.configured ? null : <p className="mt-3">Falta la configuración de Supabase en el entorno.</p>}
        </Card>
      </div>
      <BottomBar />
    </main>
  );
}
