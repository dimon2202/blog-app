import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { deletePost } from "../features/posts/postsSlice";
import type { Post } from "../types";

interface Props {
  post: Post;
}

const formatDate = (ms: number) =>
  new Date(ms).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const PostCard = ({ post }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Delete this post?")) {
      dispatch(deletePost(post.id));
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit/${post.id}`);
  };

  return (
    <article
      onClick={() => navigate(`/post/${post.id}`)}
      className="group relative bg-white border border-zinc-200 rounded-2xl p-6 cursor-pointer
          hover:border-indigo-400 hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)] transition-all duration-300 overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-indigo-500 to-violet-500
            scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
      />

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <h2 className="font-display text-xl font-semibold text-zinc-900 leading-snug mb-3 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2">
        {post.title}
      </h2>

      <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 mb-5">
        {post.body}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-linear-to-r from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
            {post.author.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-700">{post.author}</p>
            <p className="text-xs text-zinc-400">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleEdit}
            className="p-2 rounded-lg text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-150"
            title="Edit"
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
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-150"
            title="Delete"
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
          </button>
        </div>
      </div>
    </article>
  );
};
