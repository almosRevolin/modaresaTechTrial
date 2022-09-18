import React from "react";
import clsx from "clsx";

const Button = ({
  children,
  buttonType = "default",
  customStyle,
  ...buttonProps
}: ButtonProps) => {
  const buttonStyle = clsx(
    "h-12 flex items-center justify-center font-bold min-w-fit p-1 rounded-md border-2 enabled:shadow-dark disabled:cursor-not-allowed",
    buttonType === "danger"
      ? "bg-white text-red-400 enabled:hover:bg-red-400 border-red-400 enabled:hover:text-white"
      : "bg-black border-black text-white enabled:hover:bg-white enabled:hover:text-black",

    customStyle
  );

  return (
    <button className={buttonStyle} {...buttonProps}>
      {children}
    </button>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: "danger" | "default";
  customStyle?: string;
  children: React.ReactNode;
}

export default Button;
