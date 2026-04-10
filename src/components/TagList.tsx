export const TagList = ({ tags }: { tags: string[] }) =>
  tags.length > 0 ? (
    <div className="flex flex-wrap gap-2 mb-5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-xs font-medium px-2.5 py-1 rounded-full
                     bg-indigo-50 text-indigo-600 border border-indigo-100"
        >
          #{tag}
        </span>
      ))}
    </div>
  ) : null;
