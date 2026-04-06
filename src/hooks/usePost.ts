import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchPosts } from "../features/posts/postsSlice";
import type { Post } from "../types";

export const usePosts = () => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((s) => s.posts);
  const { search, selectedTags } = useAppSelector((s) => s.filter);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  const filteredPosts: Post[] = useMemo(() => {
    let result = [...items];

    if (search.trim()) {
      const lower = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.body.toLowerCase().includes(lower) ||
          p.author.toLowerCase().includes(lower),
      );
    }

    if (selectedTags.length > 0) {
      result = result.filter((p) =>
        selectedTags.every((tag) => p.tags.includes(tag)),
      );
    }

    return result;
  }, [items, search, selectedTags]);

  const allTags: string[] = useMemo(
    () => Array.from(new Set(items.flatMap((p) => p.tags))).sort(),
    [items],
  );

  return { posts: filteredPosts, allTags, status, error };
};
