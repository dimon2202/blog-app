export interface Post {
  id: string;
  title: string;
  body: string;
  author: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  text: string;
  createdAt: number;
}

export interface FilterState {
  search: string;
  selectedTags: string[];
}

export type PostFormData = Omit<Post, "id" | "createdAt" | "updatedAt">;
export type CommentFormData = Omit<Comment, "id" | "createdAt">;
