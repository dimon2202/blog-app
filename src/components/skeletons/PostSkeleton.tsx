export const PostSkeleton = () => (
  <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse space-y-5">
    <div className="h-5 w-24 bg-zinc-100 rounded-lg" />
    <div className="h-10 w-3/4 bg-zinc-100 rounded-xl" />
    <div className="h-4 w-1/3 bg-zinc-100 rounded-lg" />
    <div className="space-y-3 pt-8">
      {[100, 90, 95, 80, 85].map((w, i) => (
        <div
          key={i}
          className="h-4 bg-zinc-100 rounded-lg"
          style={{ width: `${w}%` }}
        />
      ))}
    </div>
  </main>
);
