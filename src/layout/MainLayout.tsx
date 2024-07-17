import React from "react";
import NavigationBar from "../components/navigationBar/NavigationBar";
import LeftPanel from "../components/panel/LeftPanel";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavigationBar />
      <div className="container flex mx-auto p-4">
        <div className="w-1/4">
          <LeftPanel />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
