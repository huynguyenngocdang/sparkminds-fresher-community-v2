import React from "react";
import { useController } from "react-hook-form"; // Assuming useController is from react-hook-form
import { TInputFormProps } from "../../../types";
import classNames from "../../utils/Classnames";


const TextArea = (props: TInputFormProps) => {
  const {
    control,
    name,
    error = "",
    placeholder = "",
    children,
    ...rest
  } = props;

  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <div className="relative">
      <textarea
        id={name}
        className={classNames(
          "w-full px-6 py-4 text-sm font-medium border rounded-xl text-text1 placeholder:text-text4 dark:placeholder:text-text2 dark:text-white bg-transparent resize-none",
          error.length > 0
            ? "border-error"
            : "border-strock dark:border-darkStroke",
          children ? "pr-16" : ""
        )}
        placeholder={error.length <= 0 ? placeholder : ""}
        {...rest}
        {...field}
      />
      {error.length > 0 && (
        <span className="text-sm font-medium pointer-events-none text-error">
          {error}
        </span>
      )}
      {children && (
        <span className="absolute cursor-pointer select-none right-6 top-2/4 -translate-y-2/4">
          {children}
        </span>
      )}
    </div>
  );
};

export default TextArea;
