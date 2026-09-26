import { CharacterFrame, HappyFace, type CharacterState } from "@/components/characters/face";

export function Loop({ state = "idle" }: { state?: CharacterState }) {
  return (
    <CharacterFrame label="Loop" state={state}>
      <g stroke="#111" strokeWidth="3" fill="#FF8FC8">
        <ellipse cx="100" cy="78" rx="28" ry="40" />
        <ellipse cx="138" cy="108" rx="28" ry="40" transform="rotate(72 138 108)" />
        <ellipse cx="124" cy="152" rx="28" ry="40" transform="rotate(144 124 152)" />
        <ellipse cx="76" cy="152" rx="28" ry="40" transform="rotate(216 76 152)" />
        <ellipse cx="62" cy="108" rx="28" ry="40" transform="rotate(288 62 108)" />
      </g>
      <circle cx="100" cy="112" r="36" fill="#FFD23F" stroke="#111" strokeWidth="3" />
      <g transform="translate(0 28)">
        <HappyFace asleep={state === "duerme"} />
      </g>
    </CharacterFrame>
  );
}
