import { useState } from "react";

import DropdownOption from "./DropdownOptions";
import { useMap } from "../../../contexts/mapContext";

function Dropdown() {
  const { basemaps, selectedBasemap, setSelectedBasemap, setMapParams  } = useMap();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value) => {
    console.log(value)
    setSelectedBasemap(value);
    setIsOpen(false);
    setMapParams((prevParams) => ({
      ...prevParams,
      style : `https://tiles.stadiamaps.com/styles/${value}.json`
    }))
  };

  return (
    <div className="relative inline-block">
      <div
        className="flex items-center p-2 border bg-slate-400 cursor-pointer"
        onClick={handleToggle}
      >
        <span className="mr-2">
          {basemaps.find((opt) => opt.value === selectedBasemap)?.image && (
            <img
              className="w-8 h-8"
              src={basemaps.find((opt) => opt.value === selectedBasemap).image}
              alt=""
            />
          )}
        </span>
        <svg
          className={`w-4 h-4 transition-transform transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-40 mt-2 bg-white border rounded-md shadow-lg bottom-10">
          {basemaps.map((option) => (
            <DropdownOption
              key={option.value}
              value={option.value}
              image={option.image}
              onSelect={handleSelect}
              label= {option.label}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
