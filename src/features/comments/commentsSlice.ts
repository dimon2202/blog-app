import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Comment, CommentFormData } from "../../types";
import { fetchCommentsByPostId, addCommentToDB } from "../../lib/firebase";

interface CommentsState {
  items: Comment[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CommentsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchComments = createAsyncThunk(
  "comments/fetchByPostId",
  async (postId: string) => {
    return await fetchCommentsByPostId(postId);
  },
);

export const addComment = createAsyncThunk(
  "comments/add",
  async (data: CommentFormData) => {
    return await addCommentToDB(data);
  },
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearComments(state) {
      state.items = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error loading comments";
      });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
