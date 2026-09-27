export function ContrastPair({ es, en }: { es: string; en: string }) {
  return (
    <div className="mt-3 text-[17px]">
      <p lang="es">🇪🇸 {es}</p>
      <p>🇬🇧 {en}</p>
    </div>
  );
}
