import clsx from "clsx";
import React from "react";

const Input = ({
  isMissingField = false,
  customStyle,
  customInputStyle,
  ...inputProps
}: InputProps) => {
  const wrapperClasses = clsx(
    "relative flex flex-row items-center justify-between rounded focus:outline-none bg-white w-full h-14 border-2 border-grey-300",
    isMissingField && "border-red",
    customStyle
  );

  const inputClasses = clsx(
    "flex placeholder-italic w-full h-full leading-normal appearance-none focus:outline-none font-normal text-black 2xl:p-2 p-1.5 rounded transition-shadow ease-in-out duration-500 2xl:text-base text-sm",
    isMissingField ? "placeholder-red" : "placeholder-grey-400",
    customInputStyle
  );

  return (
    <div className={wrapperClasses}>
      <input className={inputClasses} {...inputProps} />
    </div>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isMissingField?: boolean;
  customStyle?: string;
  customInputStyle?: string;
}

export default Input;
