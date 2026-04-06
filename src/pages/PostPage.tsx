import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchPostById,
  deletePost,
  clearSelectedPost,
} from "../features/posts/postsSlice";
import { clearComments } from "../features/comments/commentsSlice";
import { CommentList } from "../components/CommentList";

const formatDate = (ms: number) =>
  new Date(ms).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedPost: post, status, error } = useAppSelector((s) => s.posts);

  useEffect(() => {
    if (id) dispatch(fetchPostById(id));
    return () => {
      dispatch(clearSelectedPost());
      dispatch(clearComments());
    };
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (!post) return;
    if (window.confirm("Delete this post?")) {
      await dispatch(deletePost(post.id));
      navigate("/");
    }
  };

  if (status === "loading") {
    return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse space-y-5">
        <div className="h-5 w-24 bg-zinc-100 rounded-lg" />
        <div className="h-10 w-3/4 bg-zinc-100 rounded-xl" />
        <div className="h-4 w-1/3 bg-zinc-100 rounded-lg" />
        <div className="space-y-3 pt-8">
          {[100, 90, 95, 80, 85].map((w, i) => (
            <div
              key={i}
              className={`h-4 bg-zinc-100 rounded-lg`}
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      </main>
    );
  }

  if (status === "failed" || !post) {
    return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-zinc-500 mb-4">{error ?? "Post not found"}</p>
        <Link
          to="/"
          className="text-indigo-600 text-sm font-medium hover:underline"
        >
          ← To Home
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-indigo-600 mb-8 transition-colors duration-150 group"
      >
        <svg
          className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        All posts
      </Link>

      <article>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-zinc-900 leading-tight mb-6">
          {post.title}
        </h1>

        <div className="flex items-center justify-between pb-8 mb-8 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold"
            >
              {post.author.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-800">
                {post.author}
              </p>
              <p className="text-xs text-zinc-400">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/edit/${post.id}`)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium
                         border border-zinc-200 text-zinc-600 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-150"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium
                         border border-zinc-200 text-zinc-600 hover:border-red-300 hover:text-red-500 transition-all duration-150"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </button>
          </div>
        </div>

        <div className="prose prose-zinc max-w-none text-zinc-700 leading-relaxed whitespace-pre-wrap text-[15px]">
          {post.body}
        </div>

        {post.updatedAt !== post.createdAt && (
          <p className="text-xs text-zinc-400 mt-8 pt-6 border-t border-zinc-100">
            Updated: {formatDate(post.updatedAt)}
          </p>
        )}
      </article>

      <CommentList postId={post.id} />
    </main>
  );
};
