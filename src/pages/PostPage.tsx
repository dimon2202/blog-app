import { Link } from "react-router-dom";
import { CommentList } from "../components/CommentList";
import { Button } from "../components/UI";
import { usePostPage } from "../hooks/usePostPage";
import { BackLink } from "../components/BackLink";
import { TagList } from "../components/TagList";
import { AuthorMeta } from "../components/AuthorMeta";
import { EditIcon } from "../components/icons/EditIcon";
import { TrashIcon } from "../components/icons/TrashIcon";
import { PostSkeleton } from "../components/skeletons/PostSkeleton";

const formatDate = (ms: number) =>
  new Date(ms).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const PostPage = () => {
  const { post, status, error, handleDelete, handleEdit } = usePostPage();

  if (status === "loading") return <PostSkeleton />;

  if (status === "failed" || !post) {
    return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-zinc-500 mb-4">{error ?? "Post not found"}</p>
        <Link
          to="/"
          className="text-indigo-600 text-sm font-medium hover:underline"
        >
          ← All posts
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <BackLink />

      <article>
        <TagList tags={post.tags} />

        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-zinc-900 leading-tight mb-6">
          {post.title}
        </h1>

        <div className="flex items-center justify-between pb-8 mb-8 border-b border-zinc-100">
          <AuthorMeta author={post.author} date={formatDate(post.createdAt)} />
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleEdit}>
              <EditIcon /> Edit
            </Button>
            <Button variant="ghost-danger" onClick={handleDelete}>
              <TrashIcon /> Delete
            </Button>
          </div>
        </div>

        <div className="prose prose-zinc max-w-none text-zinc-700 leading-relaxed whitespace-pre-wrap text-[15px]">
          {post.body}
        </div>

        {post.updatedAt !== post.createdAt && (
          <p className="text-xs text-zinc-400 mt-8 pt-6 border-t border-zinc-100">
            Updated: {formatDate(post.updatedAt)}
          </p>
        )}
      </article>

      <CommentList postId={post.id} />
    </main>
  );
};
