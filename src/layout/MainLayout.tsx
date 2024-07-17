
import React from "react";
import NavigationBar from "../components/navigationBar/NavigationBar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavigationBar />
      <div className="container flex mx-auto p-4">
        <div className="w-1/4">Left panel</div>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
