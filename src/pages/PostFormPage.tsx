import { Link } from "react-router-dom";
import { Input, Textarea, Button, TagInput } from "../components/UI";
import { usePostForm } from "../hooks/usePostForm";
import { BackLink } from "../components/BackLink";
import { FormHeader } from "../components/FormHeader";
import { FormSkeleton } from "../components/skeletons/FormSkeleton";

export const PostFormPage = () => {
  const { form, tags, setTags, isEdit, postId, status, onSubmit } =
    usePostForm();
  const {
    register,
    formState: { errors, isSubmitting, isDirty },
  } = form;

  if (isEdit && status === "loading") return <FormSkeleton />;

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <BackLink isEdit={isEdit} postId={postId} />
      <FormHeader isEdit={isEdit} />

      <form onSubmit={onSubmit} className="space-y-6">
        <Input
          {...register("title")}
          label="Title"
          required
          placeholder="Come up with a catchy title..."
          error={errors.title?.message}
        />

        <Input
          {...register("author")}
          label="Author"
          required
          placeholder="Your name or nickname"
          error={errors.author?.message}
        />

        <Textarea
          {...register("body")}
          label="Post content"
          required
          placeholder="Share something interesting..."
          rows={12}
          error={errors.body?.message}
        />

        <TagInput tags={tags} onChange={setTags} error={errors.tags?.message} />

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            loading={isSubmitting}
            loadingText={isEdit ? "Saving..." : "Publishing..."}
            disabled={isEdit && !isDirty}
          >
            {isEdit ? "Save changes" : "Publish post"}
          </Button>

          <Link
            to={isEdit && postId ? `/post/${postId}` : "/"}
            className="px-6 py-3 rounded-xl text-sm font-semibold border border-zinc-200
                       text-zinc-600 hover:border-zinc-300 hover:text-zinc-800 transition-all duration-150"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
};
