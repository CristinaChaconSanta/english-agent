export function Sticker({ children }: { children: string }) {
  const tilt = children.length % 2 === 0 ? "-rotate-3" : "rotate-2";
  return <span className={`sticker ${tilt}`}>{children}</span>;
}
