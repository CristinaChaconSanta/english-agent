export function Timer({ elapsedSec, goalSec = 25 * 60 }: { elapsedSec: number; goalSec?: number }) {
  const remaining = Math.max(goalSec - elapsedSec, 0);
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const label = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  const filled = Math.min(elapsedSec / goalSec, 1);

  return (
    <div className="timer-pill px-5 py-3" aria-live="polite">
      <p className="text-center font-display text-3xl tracking-tight">{label}</p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/30">
        <div className="h-full bg-white" style={{ width: `${(1 - filled) * 100}%` }} />
      </div>
    </div>
  );
}
