import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  createPost,
  updatePost,
  fetchPostById,
  clearSelectedPost,
} from "../features/posts/postsSlice";
import { postSchema, type PostFormValues } from "../lib/schemas";

export const PostFormPage = () => {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedPost, status } = useAppSelector((s) => s.posts);

  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      body: "",
      author: "",
      tags: [] as string[],
    },
  });

  const tags = useWatch({ control, name: "tags" }) ?? [];

  useEffect(() => {
    if (id) dispatch(fetchPostById(id));
    return () => {
      dispatch(clearSelectedPost());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (isEdit && selectedPost) {
      reset({
        title: selectedPost.title,
        body: selectedPost.body,
        author: selectedPost.author,
        tags: selectedPost.tags,
      });
    }
  }, [isEdit, selectedPost, reset]);

  const addTag = () => {
    const trimmed = tagInput.trim().toLowerCase().replace(/\s+/g, "-");
    if (!trimmed || tags.includes(trimmed) || tags.length >= 10) {
      setTagInput("");
      return;
    }
    setValue("tags", [...tags, trimmed], { shouldDirty: true });
    setTagInput("");
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
    if (e.key === "Backspace" && tagInput === "" && tags.length > 0) {
      setValue("tags", tags.slice(0, -1), { shouldDirty: true });
    }
  };

  const removeTag = (tag: string) => {
    setValue(
      "tags",
      tags.filter((t) => t !== tag),
      { shouldDirty: true },
    );
  };

  const onSubmit: SubmitHandler<PostFormValues> = async (formData) => {
    const payload = {
      title: formData.title,
      body: formData.body,
      author: formData.author,
      tags: formData.tags,
    };

    if (isEdit && id) {
      await dispatch(updatePost({ id, data: payload }));
      navigate(`/post/${id}`);
    } else {
      const result = await dispatch(createPost(payload));
      if (createPost.fulfilled.match(result)) {
        navigate(`/post/${result.payload.id}`);
      }
    }
  };

  if (isEdit && status === "loading") {
    return (
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse space-y-5">
        <div className="h-8 w-48 bg-zinc-100 rounded-xl" />
        <div className="h-12 bg-zinc-100 rounded-xl" />
        <div className="h-40 bg-zinc-100 rounded-xl" />
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        to={isEdit && id ? `/post/${id}` : "/"}
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-indigo-600 mb-8 transition-colors duration-150 group"
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

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold mb-3">
          {isEdit ? (
            <>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Editing
            </>
          ) : (
            <>
              <svg
                className="w-3.5 h-3.5"
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
              New Post
            </>
          )}
        </div>
        <h1 className="font-display text-3xl font-semibold text-zinc-900">
          {isEdit ? "Edit Post" : "Create Post"}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-zinc-700 mb-2">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            {...register("title")}
            placeholder="Come up with a catchy title..."
            className="w-full px-4 py-3.5 bg-white border border-zinc-200 rounded-xl text-sm
                       text-zinc-800 placeholder-zinc-400 outline-none font-medium
                       focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
          />
          {errors.title && <FieldError msg={errors.title.message} />}
        </div>

        <div>
          <label className="block text-sm font-semibold text-zinc-700 mb-2">
            Author <span className="text-red-400">*</span>
          </label>
          <input
            {...register("author")}
            placeholder="Your name or nickname"
            className="w-full px-4 py-3.5 bg-white border border-zinc-200 rounded-xl text-sm
                       text-zinc-800 placeholder-zinc-400 outline-none
                       focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100
                       transition-all duration-200"
          />
          {errors.author && <FieldError msg={errors.author.message} />}
        </div>

        <div>
          <label className="block text-sm font-semibold text-zinc-700 mb-2">
            Post content <span className="text-red-400">*</span>
          </label>
          <textarea
            {...register("body")}
            placeholder="Share something interesting..."
            rows={12}
            className="w-full px-4 py-3.5 bg-white border border-zinc-200 rounded-xl text-sm
                       text-zinc-800 placeholder-zinc-400 outline-none resize-none leading-relaxed
                       focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100
                       transition-all duration-200"
          />
          {errors.body && <FieldError msg={errors.body.message} />}
        </div>

        <div>
          <label className="block text-sm font-semibold text-zinc-700 mb-2">
            Tegs
            <span className="ml-2 font-normal text-zinc-400 text-xs">
              Press Enter or + to add · Backspace to remove the last one
            </span>
          </label>

          <div className="flex gap-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Enter a tag..."
              maxLength={30}
              className="flex-1 px-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm
                         text-zinc-800 placeholder-zinc-400 outline-none
                         focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100
                         transition-all duration-200"
            />
            <button
              type="button"
              onClick={addTag}
              disabled={!tagInput.trim() || tags.length >= 10}
              className="px-4 py-3 rounded-xl bg-indigo-600 text-white
                         hover:bg-indigo-700 active:scale-95
                         disabled:opacity-40 disabled:cursor-not-allowed
                         transition-all duration-150"
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
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-indigo-400 hover:text-indigo-700 hover:bg-indigo-100 rounded-full p-0.5 transition-colors duration-100"
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

          {errors.tags && <FieldError msg={errors.tags.message} />}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting || (isEdit && !isDirty)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold
                bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
                  shadow-sm shadow-indigo-200 transition-all duration-150"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                {isEdit ? "Saving..." : "Publish..."}
              </>
            ) : isEdit ? (
              "Save changes"
            ) : (
              "Publish post"
            )}
          </button>

          <Link
            to={isEdit && id ? `/post/${id}` : "/"}
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

const FieldError = ({ msg }: { msg?: string }) => (
  <p className="mt-2 text-xs text-red-500 flex items-center gap-1.5">
    <svg
      className="w-3.5 h-3.5 shrink-0"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
    {msg}
  </p>
);
