import { EditIcon } from "./icons/EditIcon";
import { PlusIcon } from "./icons/PlusIcon";

export const FormHeader = ({ isEdit }: { isEdit: boolean }) => (
  <div className="mb-8">
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                    bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold mb-3"
    >
      {isEdit ? <EditIcon /> : <PlusIcon />}
      {isEdit ? "Editing" : "New Post"}
    </div>
    <h1 className="font-display text-3xl font-semibold text-zinc-900">
      {isEdit ? "Edit Post" : "Create Post"}
    </h1>
  </div>
);
