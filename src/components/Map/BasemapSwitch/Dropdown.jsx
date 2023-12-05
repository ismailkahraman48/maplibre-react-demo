import { useState } from "react";

import DropdownOption from "./DropdownOptions";
import { useMap } from "../../../contexts/mapContext";

function Dropdown() {
  const { basemaps, selectedBasemap, setSelectedBasemap, setMapParams, activeMapParams,mapParams  } = useMap();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value) => {
    
    console.log("active map params",activeMapParams)
    // setIsOpen(false);
    const basemapStyle = mapParams.style.match(/\/styles\/(.*?)\.json/)[1]
    // aynı basemap için render yapma kontrolü
   if(!(basemapStyle === value)){
    setSelectedBasemap(value);
    setMapParams({
      lng : activeMapParams.lng,
      lat : activeMapParams.lat,
      zoom : activeMapParams.zoom,
      style : `https://tiles.stadiamaps.com/styles/${value}.json`
    })
   }
  };

  return (
    <div className="relative">
      <div
        className="flex justify-center items-center  bg-slate-400 cursor-pointer"
        onClick={handleToggle}
      >
        <span className="mr-2">
          {basemaps.find((opt) => opt.value === selectedBasemap)?.image && (
            <img
              className="w-12 h-12"
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
            strokeWidth="3"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
      {isOpen && (
        <div className="absolute flex bg-white border rounded-md shadow-lg bottom-14">
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
