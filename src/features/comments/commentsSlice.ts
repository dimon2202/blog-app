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
  async (postId: string, { rejectWithValue }) => {
    try {
      return await fetchCommentsByPostId(postId);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to load comments";
      console.error("[fetchComments]", message);
      return rejectWithValue(message);
    }
  },
);

export const addComment = createAsyncThunk(
  "comments/add",
  async (data: CommentFormData, { rejectWithValue }) => {
    try {
      return await addCommentToDB(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to add comment";
      console.error("[addComment]", message);
      return rejectWithValue(message);
    }
  },
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearComments(state) {
      state.items = [];
      state.status = "idle";
      state.error = null;
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
        state.error = (action.payload as string) ?? "Failed to load comments";
      });

    builder
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = (action.payload as string) ?? "Failed to add comment";
      });
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
