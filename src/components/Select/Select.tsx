import { Listbox, Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import clsx from "clsx";

const Select = ({
  options,
  selectedValue,
  onSelect,
  placeholder,
}: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState<Option>(null);

  useEffect(() => {
    if (selectedValue) {
      const option = options.find(option => option.value === selectedValue);
      if (!option) return;
      setSelectedOption(option);
    }
  }, [options, selectedValue]);

  return (
    <div className="relative z-10 select-none border-2 rounded-md border-grey-300 w-full h-14 p-2">
      <Listbox value={selectedValue} onChange={onSelect}>
        {({ open }) => (
          <>
            <Listbox.Button
              as="div"
              role="button"
              className="flex items-center justify-center h-full w-full"
            >
              {selectedOption?.name ?? placeholder}
            </Listbox.Button>
            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
              className="w-full h-full"
            >
              <Listbox.Options className="absolute w-full bg-white border-2 rounded-md border-grey-300 p-2 cursor-pointer">
                {options.map((option, i) => {
                  const { name, value } = option;

                  return (
                    <Listbox.Option value={value} key={`${value}$-${i}`}>
                      {({ active, selected }) => {
                        if (selected) return null;

                        return (
                          <div
                            className={clsx(
                              "flex items-center justify-center w-full h-14",
                              active && "bg-gray-200"
                            )}
                          >
                            {name}
                          </div>
                        );
                      }}
                    </Listbox.Option>
                  );
                })}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
};

type Option = {
  name: string;
  value: string;
};

type SelectProps = {
  options: Option[];
  selectedValue: string | undefined | null;
  onSelect: (value: string) => void;
  placeholder: string;
};

export default Select;
