import React, { useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { FcCheckmark } from "react-icons/fc";

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    if (selected.some((o) => o === option)) {
      onChange(selected.filter((o) => o !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const isSelected = (option: string) => selected.some((o) => o === option);

  return (
    <div className="relative" ref={wrapperRef}>
      <div
        className={`border h-10 rounded p-2 cursor-pointer text-black-color dark:text-white-color border-light-ev4 dark:border-dark-ev4 dark:bg-dark-ev1 ${
          isOpen ? "border-orange-color" : ""
        } `}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length > 0 ? selected.map((o) => o).join(", ") : "--select--"}
      </div>
      <BiChevronDown
        className="absolute top-1/2 -translate-y-1/2 right-2"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="absolute z-10 w-full border max-h-64 overflow-y-auto border-gray-300 dark:border-dark-ev4 rounded mt-1 bg-white dark:bg-dark-ev1">
          {options.map((option) => (
            <div
              key={option}
              className={`p-2 cursor-pointer flex items-center justify-between`}
              onClick={() => handleSelect(option)}
            >
              <div>{option}</div>
              {isSelected(option) && (
                <FcCheckmark className="text-orange-color" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
