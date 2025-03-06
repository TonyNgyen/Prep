import React, { useState } from "react";
import clsx from "clsx";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

interface DropdownProps {
  options: { value: string; label: string }[];
  defaultValue?: string;
  onChange?: (selectedValue: string) => void;
  className?: string; // Allow custom Tailwind classes
  drop?: boolean; // External control for dropdown state
  onDropChange?: (isDropping: boolean) => void; // Callback for drop state changes
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

  // Use the external `drop` prop if provided, otherwise use internal state
  const isDropping = drop !== undefined ? drop : internalDropping;

  const handleOptionClick = (value: string, label: string) => {
    setSelectedValue(label);
    if (onChange) {
      onChange(value);
    }
    toggleDrop(false); // Close the dropdown after selecting an option
  };

  const toggleDrop = (newState: boolean) => {
    if (drop === undefined) {
      // If `drop` is not provided, use internal state
      setInternalDropping(newState);
    }
    if (onDropChange) {
      // Notify parent of drop state change
      onDropChange(newState);
    }
  };

  // Default Tailwind classes for the dropdown
  const defaultClasses =
    "bg-white w-full flex-1 p-2 flex flex-col text-black font-semibold border border-mainGreen";

  // Merge default classes with custom classes
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
        <div className="absolute z-10 w-full bg-white text-black font-semibold rounded-b-md shadow-lg border-t-0 border border-mainGreen">
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
