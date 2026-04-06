import { Link } from "react-router-dom";

export const Navbar = () => {

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-violet-600
                flex items-center justify-center shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform duration-200"
            >
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
            <span className="font-display text-lg font-semibold text-zinc-900 tracking-tight">
              blog
            </span>
          </Link>

          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 
                    text-white hover:bg-indigo-700 active:scale-95 shadow-sm shadow-indigo-200 transition-all duration-150"
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
                strokeWidth={2.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="hidden sm:inline">New post</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
