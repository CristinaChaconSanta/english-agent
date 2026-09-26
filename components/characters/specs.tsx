import { CharacterFrame, HappyFace, type CharacterState } from "@/components/characters/face";

export function Specs({ state = "idle", night = false }: { state?: CharacterState; night?: boolean }) {
  const asleep = state === "duerme";
  return (
    <CharacterFrame label="Specs" state={state}>
      {night || asleep ? (
        <path d="M62 58 Q100 8 138 58 L150 78 H50 Z" fill="#8B4FD8" stroke="#111" strokeWidth="3" />
      ) : null}
      <circle cx="100" cy="110" r="52" fill="#8B4FD8" stroke="#111" strokeWidth="3" />
      <g transform="translate(0 22)">
        <HappyFace asleep={asleep} />
      </g>
      <g fill="none" stroke="#FF7A2F" strokeWidth="4">
        <circle cx="86" cy="104" r="16" />
        <circle cx="114" cy="104" r="16" />
        <path d="M102 104 H98" />
      </g>
    </CharacterFrame>
  );
}
