import { useId, type ReactNode } from "react";

export type CharacterState = "idle" | "hop" | "celebra" | "piensa" | "duerme";

const STATE_CLASS: Record<CharacterState, string> = {
  idle: "character-idle",
  hop: "character-hop",
  celebra: "character-celebra",
  piensa: "character-piensa",
  duerme: "",
};

interface CharacterFrameProps {
  label: string;
  state: CharacterState;
  children: ReactNode;
}

export function CharacterFrame({ label, state, children }: CharacterFrameProps) {
  const filterId = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 200 220" role="img" aria-label={label} className={`h-36 w-36 ${STATE_CLASS[state]}`}>
      <ellipse cx="100" cy="200" rx="46" ry="10" fill="#111111" opacity="0.25" />
      <g filter={`url(#${filterId})`}>{children}</g>
      <defs>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="4" result="spread" />
          <feFlood floodColor="#ffffff" result="white" />
          <feComposite in="white" in2="spread" operator="in" result="outline" />
          <feMerge>
            <feMergeNode in="outline" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

export function HappyFace({ asleep }: { asleep: boolean }) {
  if (asleep) {
    return (
      <g>
        <path d="M78 78 Q86 86 94 78" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" />
        <path d="M106 78 Q114 86 122 78" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" />
        <path d="M86 108 Q100 118 114 108" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" />
      </g>
    );
  }

  return (
    <g>
      <g className="blink">
        <ellipse cx="86" cy="82" rx="10" ry="12" fill="#111" />
        <ellipse cx="114" cy="82" rx="10" ry="12" fill="#111" />
        <circle cx="90" cy="78" r="3.5" fill="#fff" />
        <circle cx="118" cy="78" r="3.5" fill="#fff" />
      </g>
      <ellipse cx="68" cy="98" rx="8" ry="5" fill="#FF8FC8" />
      <ellipse cx="132" cy="98" rx="8" ry="5" fill="#FF8FC8" />
      <path d="M82 108 Q100 128 118 108 Q100 118 82 108Z" fill="#111" />
    </g>
  );
}
