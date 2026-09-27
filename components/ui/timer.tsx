function clock(totalSec: number) {
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function Timer({ elapsedSec, goalSec = 25 * 60 }: { elapsedSec: number; goalSec?: number }) {
  const filled = Math.min(elapsedSec / goalSec, 1);

  return (
    <div className="timer-pill px-5 py-3" aria-live="off">
      <p className="text-center font-display text-3xl tracking-tight" data-testid="timer">
        {clock(elapsedSec)}
      </p>
      <p className="text-center text-sm">{elapsedSec >= goalSec ? "Goal reached" : `Goal ${clock(goalSec)}`}</p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/30">
        <div className="h-full bg-white" style={{ width: `${filled * 100}%` }} />
      </div>
    </div>
  );
}
