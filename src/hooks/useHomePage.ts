import { useNavigate } from "react-router-dom";
import { usePosts } from "./usePost";

export const useHomePage = () => {
  const navigate = useNavigate();
  const { posts, allTags, status, error } = usePosts();
  const goCreate = () => navigate("/create");
  return { posts, allTags, status, error, goCreate };
};
