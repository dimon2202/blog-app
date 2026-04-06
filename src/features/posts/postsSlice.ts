import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Post, PostFormData } from "../../types";
import {
  fetchPostsFromDB,
  fetchPostByIdFromDB,
  addPostToDB,
  updatePostInDB,
  deletePostFromDB,
} from "../../lib/firebase";

interface PostsState {
  items: Post[];
  selectedPost: Post | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostsState = {
  items: [],
  selectedPost: null,
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchAll", async () => {
  return await fetchPostsFromDB();
});

export const fetchPostById = createAsyncThunk(
  "posts/fetchById",
  async (id: string) => {
    const post = await fetchPostByIdFromDB(id);
    if (!post) throw new Error("Post not found");
    return post;
  },
);

export const createPost = createAsyncThunk(
  "posts/create",
  async (data: PostFormData) => {
    return await addPostToDB(data);
  },
);

export const updatePost = createAsyncThunk(
  "posts/update",
  async ({ id, data }: { id: string; data: Partial<PostFormData> }) => {
    await updatePostInDB(id, data);
    return { id, data };
  },
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id: string) => {
    await deletePostFromDB(id);
    return id;
  },
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearSelectedPost(state) {
      state.selectedPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error loading posts";
      });

    builder
      .addCase(fetchPostById.pending, (state) => {
        state.status = "loading";
        state.selectedPost = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error loading posts";
      });

    builder.addCase(createPost.fulfilled, (state, action) => {
      state.items.unshift(action.payload);
    });

    builder.addCase(updatePost.fulfilled, (state, action) => {
      const { id, data } = action.payload;
      const idx = state.items.findIndex((p) => p.id === id);
      if (idx !== -1) {
        state.items[idx] = {
          ...state.items[idx],
          ...data,
          updatedAt: Date.now(),
        };
      }
      if (state.selectedPost?.id === id) {
        state.selectedPost = {
          ...state.selectedPost,
          ...data,
          updatedAt: Date.now(),
        };
      }
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
      if (state.selectedPost?.id === action.payload) {
        state.selectedPost = null;
      }
    });
  },
});

export const { clearSelectedPost } = postsSlice.actions;
export default postsSlice.reducer;
