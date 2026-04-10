import { Link } from "react-router-dom";

export const BackLink = ({ isEdit, postId }: { isEdit?: boolean; postId?: string }) => (
  <Link
    to={isEdit && postId ? `/post/${postId}` : "/"}
    className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-indigo-600
               mb-8 transition-colors duration-150 group"
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
    {isEdit ? "To the post" : "All posts"}
  </Link>
);
