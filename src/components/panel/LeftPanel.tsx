import React from "react";
import { ArrowTopRightIcon, ExploreIcon, HomeIcon, PlusIcon } from "../icons";
import PanelsItem from "../ui/panel/PanelsItem";

const LeftPanel = () => {
  return (
    <div className="flex flex-col gap-2 p-2 ml-2">
      <div className="flex flex-col gap-2 border-b pb-2">
        <PanelsItem icon={<HomeIcon className="size-5" />} label="Home" />
        <PanelsItem
          icon={<ArrowTopRightIcon className="size-5" />}
          label="Popular"
        />
        <PanelsItem icon={<ExploreIcon className="size-5" />} label="Explore" />
        <PanelsItem
          icon={<ArrowTopRightIcon className="size-5" />}
          label="All"
        />
      </div>
      <div className="flex flex-col border-b pb-2">
        <span className="text-xl font-thin text-slate-400">Custom Feeds</span>
        <div className="flex items-center gap-3 hover:bg-slate-200 p-2 rounded-lg cursor-pointer">
          <PlusIcon className="size-5" />
          <span> Create a custom feeds </span>
        </div>
      </div>
      <div>
        <span className="text-xl font-thin text-slate-400">Community</span>
        <div className="flex items-center gap-3 hover:bg-slate-200 p-2 rounded-lg cursor-pointer">
          <PlusIcon className="size-5" />
          <span> Create a community </span>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
