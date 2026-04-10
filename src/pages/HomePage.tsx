import { PostCard } from "../components/PostCard";
import { FilterBar } from "../components/FilterBar";
import { useHomePage } from "../hooks/useHomePage";
import { SkeletonGrid } from "../components/skeletons/SkeletonGrid";
import { ErrorState } from "../components/ErrorState";
import { EmptyState } from "../components/EmptyState";

export const HomePage = () => {
  const { posts, allTags, status, error, goCreate } = useHomePage();

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-zinc-900 leading-tight mb-3">
          Thoughts & Ideas
        </h1>
        <p className="text-zinc-500 text-lg">
          Notes on development, technologies, and everything that seems
          interesting.
        </p>
      </div>

      {(allTags.length > 0 || status === "succeeded") && (
        <div className="mb-8">
          <FilterBar allTags={allTags} />
        </div>
      )}

      {status === "loading" && <SkeletonGrid />}

      {status === "failed" && <ErrorState message={error} />}

      {status === "succeeded" && posts.length === 0 && (
        <EmptyState onCreateClick={goCreate} />
      )}

      {status === "succeeded" && posts.length > 0 && (
        <>
          <p className="text-xs text-zinc-400 font-medium mb-5 uppercase tracking-widest">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </>
      )}
    </main>
  );
};
