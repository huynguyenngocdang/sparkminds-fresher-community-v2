import React from "react";

const FormGroup = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col mb-5 gap-y-3">{children}</div>;
};

export default FormGroup;
