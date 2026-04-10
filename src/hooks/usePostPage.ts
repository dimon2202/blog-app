import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchPostById,
  deletePost,
  clearSelectedPost,
} from "../features/posts/postsSlice";
import { clearComments } from "../features/comments/commentsSlice";

export const usePostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedPost: post, status, error } = useAppSelector((s) => s.posts);

  useEffect(() => {
    if (id) dispatch(fetchPostById(id));
    return () => {
      dispatch(clearSelectedPost());
      dispatch(clearComments());
    };
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (!post || !window.confirm("Delete this post?")) return;
    await dispatch(deletePost(post.id));
    navigate("/");
  };

  const handleEdit = () => navigate(`/edit/${post?.id}`);

  return { post, status, error, handleDelete, handleEdit };
};
