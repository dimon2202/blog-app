export const AuthorMeta = ({ author, date }: { author: string; date: string }) => (
  <div className="flex items-center gap-3">
    <div
      className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-400 to-violet-500
                    flex items-center justify-center text-white font-bold"
    >
      {author.charAt(0).toUpperCase()}
    </div>
    <div>
      <p className="text-sm font-semibold text-zinc-800">{author}</p>
      <p className="text-xs text-zinc-400">{date}</p>
    </div>
  </div>
);
