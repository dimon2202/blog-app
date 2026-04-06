import { useFilter } from "../hooks/useFilter";

interface Props {
  allTags: string[];
}

export const FilterBar = ({ allTags }: Props) => {
  const { search, selectedTags, onSearchChange, onTagToggle, onClearFilter } = useFilter();
  const isActive = search.trim() || selectedTags.length > 0;

  return (
    <div className="space-y-4">
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-800 
           placeholder-zinc-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mr-1">
            Tegs:
          </span>
          {allTags.map((tag) => {
            const active = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-150
                  ${
                    active
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-200"
                      : "bg-white text-zinc-600 border-zinc-200 hover:border-indigo-300 hover:text-indigo-600"
                  }`}
              >
                #{tag}
              </button>
            );
          })}

          {isActive && (
            <button
              onClick={onClearFilter}
              className="text-xs text-zinc-400 hover:text-red-500 ml-1 transition-colors duration-150 underline underline-offset-2"
            >
              Reset
            </button>
          )}
        </div>
      )}
    </div>
  );
};
