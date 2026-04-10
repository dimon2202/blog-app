import { useState } from "react";
import { FieldError } from "./../FieldError";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  error?: string;
  max?: number;
}

export const TagInput = ({
  tags,
  onChange,
  error,
  max = 10,
}: TagInputProps) => {
  const [input, setInput] = useState("");

  const add = () => {
    const trimmed = input.trim().toLowerCase().replace(/\s+/g, "-");
    if (!trimmed || tags.includes(trimmed) || tags.length >= max) {
      setInput("");
      return;
    }
    onChange([...tags, trimmed]);
    setInput("");
  };

  const remove = (tag: string) => onChange(tags.filter((t) => t !== tag));

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      add();
    }
    if (e.key === "Backspace" && input === "" && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-zinc-700">
        Tags
        <span className="ml-2 font-normal text-zinc-400 text-xs">
          Press Enter or + to add · Backspace removes last
        </span>
      </label>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Enter a tag..."
          maxLength={30}
          className={[
            "flex-1 px-4 py-3 bg-white border rounded-xl text-sm text-zinc-800",
            "placeholder-zinc-400 outline-none transition-all duration-200",
            "focus:ring-2 focus:ring-indigo-100",
            error
              ? "border-red-300 focus:border-red-400"
              : "border-zinc-200 focus:border-indigo-400",
          ].join(" ")}
        />
        <button
          type="button"
          onClick={add}
          disabled={!input.trim() || tags.length >= max}
          className="px-4 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700
                     active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
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
        </button>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5
                         rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200"
            >
              #{tag}
              <button
                type="button"
                onClick={() => remove(tag)}
                className="text-indigo-400 hover:text-indigo-700 hover:bg-indigo-100
                           rounded-full p-0.5 transition-colors duration-100"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

      {error && <FieldError msg={error} />}
    </div>
  );
};
