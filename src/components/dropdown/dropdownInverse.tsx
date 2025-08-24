import React, { useState } from "react";
import clsx from "clsx";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

interface DropdownProps {
  options: { value: string; label: string }[];
  defaultValue?: string;
  onChange?: (selectedValue: string) => void;
  className?: string;
  drop?: boolean;
  onDropChange?: (isDropping: boolean) => void;
}

const DropdownInverse: React.FC<DropdownProps> = ({
  options,
  defaultValue,
  onChange,
  className,
  drop,
  onDropChange,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");
  const [internalDropping, setInternalDropping] = useState(false);

  const isDropping = drop !== undefined ? drop : internalDropping;

  const handleOptionClick = (value: string, label: string) => {
    setSelectedValue(label);
    if (onChange) {
      onChange(value);
    }
    toggleDrop(false);
  };

  const toggleDrop = (newState: boolean) => {
    if (drop === undefined) {
      setInternalDropping(newState);
    }
    if (onDropChange) {
      onDropChange(newState);
    }
  };

  const defaultClasses =
    "bg-white w-full flex-1 p-2 flex flex-col text-black font-semibold border border-gray-800";

  const dropdownClasses = clsx(defaultClasses, className);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => toggleDrop(!isDropping)}
        className={dropdownClasses}
      >
        <div className="flex items-center justify-between w-full">
          <p>{selectedValue}</p>
          <p className="text-2xl">
            {isDropping ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
          </p>
        </div>
      </button>

      {isDropping && (
        <div className="absolute z-10 w-full bg-white text-black font-semibold rounded-b-md shadow-lg border-t-0 border border-gray-800">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option.value, option.label)}
              className="p-2 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            >
              <p>{option.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownInverse;
