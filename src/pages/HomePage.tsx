import { usePosts } from "../hooks/usePost";
import { PostCard } from "../components/PostCard";
import { FilterBar } from "../components/FilterBar";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const { posts, allTags, status, error } = usePosts();
  const navigate = useNavigate();

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-zinc-900 leading-tight mb-3">
          Thoughts & Ideas
        </h1>
        <p className="text-zinc-500 text-lg">
          Notes on development, technologies, and everything that seems interesting.
        </p>
      </div>

      {(allTags.length > 0 || status === "succeeded") && (
        <div className="mb-8">
          <FilterBar allTags={allTags} />
        </div>
      )}

      {status === "loading" && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-zinc-100 rounded-2xl h-56"
            />
          ))}
        </div>
      )}

      {status === "failed" && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p className="text-zinc-500 text-sm">{error ?? "Loading error"}</p>
        </div>
      )}

      {status === "succeeded" && posts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-5">
            <svg
              className="w-7 h-7 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="font-display text-lg font-semibold text-zinc-700 mb-2">
            No posts yet
          </h3>
          <p className="text-sm text-zinc-400 mb-6">
            Be the first to write something interesting
          </p>
          <button
            onClick={() => navigate("/create")}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-150"
          >
            Write a post
          </button>
        </div>
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
