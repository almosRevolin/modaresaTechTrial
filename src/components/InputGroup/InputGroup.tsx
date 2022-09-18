import { Input } from "../index";
import React from "react";

const InputGroup = ({
  isMissingField,
  labelName,
  label,
  ...inputProps
}: InputGroupProps) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={labelName} className="text-lg font-semibold text-black">
        {label}
      </label>
      <Input {...inputProps} isMissingField={isMissingField} id={labelName} />
    </div>
  );
};

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isMissingField?: boolean;
  labelName: string;
  label: string;
}

export default InputGroup;
