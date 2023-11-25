import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.css";

import { useEffect, useRef, useState } from "react";
import { useMap } from "../../contexts/mapContext";
import maplibregl from "maplibre-gl";

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const API_KEY = useRef("oDnL5NubQqpifBXFRO1T");
  const [lng] = useState(28.979530);
  const [lat] = useState(41.015137);
  const [zoom] = useState(12);
  // const [API_KEY] = useState('oDnL5NubQqpifBXFRO1T');

  const { markers, addMarker } = useMap();

  const [isAddingMarker, setIsAddingMarker] = useState(false);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY.current}`,
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
  }, [lng, lat]);

  useEffect(() => {
    const handleClick = (e) => {
      if (isAddingMarker) {
        const { lng, lat } = e.lngLat;
        const markerElement = document.createElement("div");
        markerElement.className = "custom-marker";
        const popup = new maplibregl.Popup().setHTML(
          "<p>Marker Öznitelikleri</p>"
        );

        const marker = new maplibregl.Marker(markerElement)
          .setLngLat({ lng, lat })
          .setPopup(popup)
          .addTo(map.current);

        addMarker(marker) // add new marker to context
      }
    };

    if (isAddingMarker) {
      map.current.on("click", handleClick);
    }
  
    return () => map.current.off("click", handleClick);
  }, [isAddingMarker]);

  const handleAddMarkerButtonClick = () => {
    setIsAddingMarker((prev) => !prev);
  };

  console.log("ctx markers",markers)
  return (
    <div className="map-wrap">
      <div className="map" ref={mapContainer} />
      <button
        className="fixed bottom-0 left-5 "
        onClick={handleAddMarkerButtonClick}
      >
        {isAddingMarker
          ? "Marker ekleme aktif (Haritaya tıkla)"
          : "Marker Ekle"}
      </button>
    </div>
  );
}

export default Map;
