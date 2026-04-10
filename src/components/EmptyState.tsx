import { Button } from "./UI";

export const EmptyState = ({ onCreateClick }: { onCreateClick: () => void }) => (
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
    <Button onClick={onCreateClick}>Write a post</Button>
  </div>
);
