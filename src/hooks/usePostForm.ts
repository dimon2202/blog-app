import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export const usePostForm = () => {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedPost, status } = useAppSelector((s) => s.posts);

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: { title: "", body: "", author: "", tags: [] as string[] },
  });

  const tags: string[] =
    useWatch({ control: form.control, name: "tags" }) ?? [];

  // load post for editing
  useEffect(() => {
    if (id) dispatch(fetchPostById(id));
    return () => {
      dispatch(clearSelectedPost());
    };
  }, [dispatch, id]);

  // prefill form
  useEffect(() => {
    if (isEdit && selectedPost) {
      form.reset({
        title: selectedPost.title,
        body: selectedPost.body,
        author: selectedPost.author,
        tags: selectedPost.tags,
      });
    }
  }, [isEdit, selectedPost, form]);

  const setTags = (next: string[]) =>
    form.setValue("tags", next, { shouldDirty: true });

  const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
    if (isEdit && id) {
      await dispatch(updatePost({ id, data }));
      navigate(`/post/${id}`);
    } else {
      const result = await dispatch(createPost(data));
      if (createPost.fulfilled.match(result)) {
        navigate(`/post/${result.payload.id}`);
      }
    }
  };

  return {
    form,
    tags,
    setTags,
    isEdit,
    postId: id,
    status,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
