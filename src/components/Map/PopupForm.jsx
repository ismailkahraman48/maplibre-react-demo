/* eslint-disable react/prop-types */

import { useState } from "react";
import { useMap } from "../../contexts/mapContext";
import maplibregl from "maplibre-gl";
import CustomPopupContent from "./CustomPopupContent";
import ReactDOMServer from "react-dom/server";

function PopupForm() {
  const {
    selectedLocation,
    temporaryMarker,
    mapRef,
    addMarker,
    setShowForm,
    setSelectedLocation,
    setIsAddingMarker,
    setTemporaryMarker,
  } = useMap();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });



  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { title, description } = formData;
    console.log("selectedLocation", selectedLocation)
    console.log("formdata", formData);
    // Geçici marker'ı güncelle
    if (temporaryMarker) {

      temporaryMarker.setLngLat(selectedLocation).addTo(mapRef.current);

      // Kalıcı marker'ı ekle
      const markerElement = document.createElement("div");
      markerElement.className = "custom-marker";
      markerElement.id = "marker";

      const newMarker = new maplibregl.Marker(markerElement)
        .setLngLat(selectedLocation)
        .setPopup(
          new maplibregl.Popup().setHTML(
            ReactDOMServer.renderToString(
              <CustomPopupContent
                title={title}
                description={description}
                location={selectedLocation}
              />
            )
          )
        )
        .addTo(mapRef.current);

      addMarker(newMarker);
    }

    setShowForm(false);
    setSelectedLocation(null);
    setIsAddingMarker(false); // Yeni bir marker eklemeyi engelle

    // Geçici marker'ı kaldırın
    if (temporaryMarker) {
      temporaryMarker.remove();
      setTemporaryMarker(null);
    }

  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedLocation(null);
    if (temporaryMarker) {
      temporaryMarker.remove();
      setTemporaryMarker(null);
    }

    setIsAddingMarker(false); // Yeni bir marker eklemeyi engelle
  };

  return (
    <div className="absolute bottom-10 left-3 bg-gray-700 p-4 rounded-md" id="form-container">
      <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
        <label className="flex flex-col">
          <span className="text-white">Title:</span>
          <input type="text" name="title" value={formData.title} onChange={handleFormInput} className="p-2 border border-white rounded-md" />
        </label>
        <label className="flex flex-col">
          <span className="text-white">Description:</span>
          <textarea maxLength={20} name="description" value={formData.description} onChange={handleFormInput} className="p-2 border border-white rounded-md resize-none"></textarea>
        </label>
        <div className="flex justify-end text-white ">
          <button type="submit" className="bg-green-600 p-2 rounded-md  hover:bg-green-500">Save</button>
          <button type="button" onClick={handleFormCancel} className="ml-2 bg-red-600 p-2 hover:bg-red-500 rounded-md">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default PopupForm;
