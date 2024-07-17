import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-2">
        <div className="pb-5">
          <span className="font-bold text-red-500 border-r-2 border-slate-300 p-2">
            404
          </span>
          <span className="font-semibold ml-2 text-slate-400">
            Page Not Found
          </span>
        </div>
        <div>
          <button
            className="text-blue-500 hover:underline hover:bg-opacity-5 hover:bg-blue-500 px-3 py-1 rounded-md transition-all"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
