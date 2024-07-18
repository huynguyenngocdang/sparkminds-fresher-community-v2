import React, { ReactNode } from "react";

interface ILabelProps {
  children: ReactNode;
  htmlFor?: string;
  className?: string;
}


const Label: React.FC<ILabelProps> = ({
  children,
  htmlFor = "",
  className = "",
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`inline-block text-sm font-medium cursor-pointer text-text2 ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
