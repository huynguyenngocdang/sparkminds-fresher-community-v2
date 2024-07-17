
import { PlusIcon } from "../../icons";

const CreateButton = () => {
  return (
    <div className="flex items-center gap-3 hover:bg-slate-200 p-2 rounded-lg cursor-pointer">
      <PlusIcon className="size-5" />
      <span> Create </span>
    </div>
  );
};

export default CreateButton;
