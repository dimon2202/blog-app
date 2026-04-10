export const SkeletonGrid = () => (
  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="animate-pulse bg-zinc-100 rounded-2xl h-56" />
    ))}
  </div>
);
