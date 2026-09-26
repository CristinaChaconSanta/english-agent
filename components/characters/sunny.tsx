import { CharacterFrame, HappyFace, type CharacterState } from "@/components/characters/face";

export function Sunny({ state = "idle" }: { state?: CharacterState }) {
  return (
    <CharacterFrame label="Sunny" state={state}>
      <g stroke="#111" strokeWidth="3">
        <path d="M100 18 L108 48 L140 36 L122 64 L158 78 L124 90 L150 122 L112 108 L118 148 L100 116 L82 148 L88 108 L50 122 L76 90 L42 78 L78 64 L60 36 L92 48 Z" fill="#FFD23F" />
      </g>
      <HappyFace asleep={state === "duerme"} />
    </CharacterFrame>
  );
}
