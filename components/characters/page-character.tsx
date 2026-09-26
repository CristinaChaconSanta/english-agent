import { CharacterFrame, HappyFace, type CharacterState } from "@/components/characters/face";

export function Page({ state = "idle" }: { state?: CharacterState }) {
  return (
    <CharacterFrame label="Page" state={state}>
      <path d="M48 40 H152 V180 H48 Z" fill="#1FA774" stroke="#111" strokeWidth="3" />
      <path d="M48 40 H72 V180 H48 Z" fill="#0E7A52" stroke="#111" strokeWidth="3" />
      <path d="M118 40 H132 V70 H118 Z" fill="#FF4B3E" stroke="#111" strokeWidth="3" />
      <g transform="translate(8 18) scale(0.85)">
        <HappyFace asleep={state === "duerme"} />
      </g>
      <path d="M118 96 Q128 108 118 118" fill="#FF8FC8" stroke="#111" strokeWidth="3" />
    </CharacterFrame>
  );
}
