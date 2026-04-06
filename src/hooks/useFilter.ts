import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  setSearch,
  toggleTag,
  clearFilter,
} from "../features/filter/filterSlice";

export const useFilter = () => {
  const dispatch = useAppDispatch();
  const { search, selectedTags } = useAppSelector((s) => s.filter);

  return {
    search,
    selectedTags,
    onSearchChange: (value: string) => dispatch(setSearch(value)),
    onTagToggle: (tag: string) => dispatch(toggleTag(tag)),
    onClearFilter: () => dispatch(clearFilter()),
  };
};
