import React from "react";

const Button = ({ children, ...buttonProps }: ButtonProps) => {
  return (
    <button
      className="h-12 flex items-center justify-center font-bold min-w-fit p-1 rounded-md bg-black text-white border-2 border-black hover:bg-white hover:text-black shadow-dark"
      {...buttonProps}
    >
      {children}
    </button>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default Button;
