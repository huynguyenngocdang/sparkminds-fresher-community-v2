import React from 'react';
import { IFormButtonProps } from '../../../types';

const Button: React.FC<IFormButtonProps> = ({
  type = "button",
  children,
  className = "",
  onClick = () => {},
  isLoading = false,
  ...rest
}) => {
  const child = isLoading ? (
    <div className="w-10 h-10 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
  ) : (
    children
  );

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center p-4 text-base bg-primary font-semibold rounded-xl text-white ${className} min-h-[56px] ${
        isLoading ? "opacity-50 pointer-events-none" : ""
      }`}
      type={type}
      {...rest}
    >
      {child}
    </button>
  );
};

export default Button;