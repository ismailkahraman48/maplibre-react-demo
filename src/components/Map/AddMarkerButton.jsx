// AddMarkerButton.js
import React from "react";
import { useMap } from "../../contexts/mapContext";

function AddMarkerButton() {
  const { isAddingMarker, setIsAddingMarker, setSelectedLocation } = useMap();
  
  const handleButtonClick = () => {
    setIsAddingMarker((prev) => !prev);
    setSelectedLocation(null);
  };

  return (
    <button className={`fixed top-5 left-5 p-2 rounded-md ${
      isAddingMarker ? 'bg-red-500' : 'bg-green-500'
    } text-white`} onClick={handleButtonClick}>
      {isAddingMarker ? "Cancel Adding Marker" : "Add Marker"}
    </button>
  );
}

export default AddMarkerButton;
