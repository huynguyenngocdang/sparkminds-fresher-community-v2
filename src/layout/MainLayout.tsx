import React from "react";
import NavigationBar from "../components/navigationBar/NavigationBar";
import LeftPanel from "../components/panel/LeftPanel";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavigationBar />
      <div className="container flex">
        <div className="w-1/5 max-w-[250px] border-r p-2">
          <LeftPanel />
        </div>
        <div className="flex-1 ml-[25px] p-2">{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
