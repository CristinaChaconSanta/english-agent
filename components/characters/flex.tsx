import { CharacterFrame, HappyFace, type CharacterState } from "@/components/characters/face";

export function Flex({ state = "idle" }: { state?: CharacterState }) {
  return (
    <CharacterFrame label="Flex" state={state}>
      <path d="M70 150 H130 L122 188 H78 Z" fill="#FF7A2F" stroke="#111" strokeWidth="3" />
      <path d="M88 150 C80 90 92 70 100 48 C108 70 120 90 112 150 Z" fill="#2F6BFF" stroke="#111" strokeWidth="3" />
      <path d="M90 110 C60 90 48 70 62 58" fill="none" stroke="#111" strokeWidth="3" />
      <path d="M110 100 C140 80 152 60 138 48" fill="none" stroke="#111" strokeWidth="3" />
      <g transform="translate(0 8) scale(0.72)">
        <HappyFace asleep={state === "duerme"} />
      </g>
    </CharacterFrame>
  );
}
