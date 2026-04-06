import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FilterState } from "../../types";

const initialState: FilterState = {
  search: "",
  selectedTags: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    toggleTag(state, action: PayloadAction<string>) {
      const tag = action.payload;
      const idx = state.selectedTags.indexOf(tag);
      if (idx === -1) {
        state.selectedTags.push(tag);
      } else {
        state.selectedTags.splice(idx, 1);
      }
    },
    clearFilter(state) {
      state.search = "";
      state.selectedTags = [];
    },
  },
});

export const { setSearch, toggleTag, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
