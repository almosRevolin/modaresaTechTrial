import { Listbox } from "@headlessui/react";

const Select = ({ options, selectedOptions, onSelect }) => {
  return (
    <div className="relative z-10 select-none border-2 rounded-md border-grey-300">
      <Listbox></Listbox>
    </div>
  );
};
