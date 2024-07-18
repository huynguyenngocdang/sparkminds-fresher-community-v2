import React from "react";
import { IPanelItemProps } from "../../../types/panel";

const PanelsItem: React.FC<IPanelItemProps> = ({ icon, label }) => {
  return (
    <div className="flex gap-2 cursor-pointer hover:bg-slate-200 rounded-lg p-2">
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default PanelsItem;
