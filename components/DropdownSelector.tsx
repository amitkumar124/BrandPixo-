
import React, { useState } from 'react';
import { ChevronDownIcon } from './Icons';

interface DropdownSelectorProps<T> {
  options: T[];
  selected: T;
  onChange: (value: T) => void;
  getLabel: (option: T) => string;
}

const DropdownSelector = <T,>({
  options,
  selected,
  onChange,
  getLabel,
}: DropdownSelectorProps<T>): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: T) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-black/30 border border-cyan-500/50 rounded-lg p-3 text-left text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-shadow duration-300 shadow-[0_0_5px_rgba(0,255,255,0.2)]"
      >
        <span>{getLabel(selected)}</span>
        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <ul className="absolute z-20 w-full mt-1 bg-[#1a1a2e] border border-cyan-500/50 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 text-gray-300 hover:bg-cyan-900/50 cursor-pointer"
            >
              {getLabel(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownSelector;
