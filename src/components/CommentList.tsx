import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchComments, addComment } from "../features/comments/commentsSlice";
import { commentSchema, type CommentSchemaInput } from "../lib/schemas";

interface Props {
  postId: string;
}

const formatDate = (ms: number) =>
  new Date(ms).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const CommentList = ({ postId }: Props) => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((s) => s.comments);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentSchemaInput>({ resolver: zodResolver(commentSchema) });

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  const onSubmit = async (data: CommentSchemaInput) => {
    await dispatch(addComment({ ...data, postId }));
    reset();
  };

  return (
    <section className="mt-12">
      <div className="flex items-center gap-3 mb-8">
        <h3 className="font-display text-xl font-semibold text-zinc-900">
          Comments
        </h3>
        {items.length > 0 && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
            {items.length}
          </span>
        )}
      </div>

      <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 mb-8">
        <h4 className="text-sm font-semibold text-zinc-700 mb-4">
          Leave a comment
        </h4>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("author")}
              placeholder="Your name"
              className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm
                  text-zinc-800 placeholder-zinc-400 outline-none
                  focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
            />
            {errors.author && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.author.message}
              </p>
            )}
          </div>

          <div>
            <textarea
              {...register("text")}
              placeholder="Write a comment..."
              rows={3}
              className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm
                  text-zinc-800 placeholder-zinc-400 outline-none resize-none
                  focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
            />
            {errors.text && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.text.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                       bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95
                       disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Sending...
              </>
            ) : (
              "Publish"
            )}
          </button>
        </form>
      </div>

      {status === "loading" ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-zinc-100 rounded-2xl h-24"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-10 text-zinc-400 text-sm">
          No comments yet. Be the first!
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((comment, idx) => (
            <div
              key={comment.id}
              className="bg-white border border-zinc-100 rounded-2xl p-5
                         hover:border-indigo-100 transition-colors duration-200"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {comment.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-800">
                    {comment.author}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed pl-11">
                {comment.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
