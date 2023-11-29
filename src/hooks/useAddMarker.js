// useAddMarker.js
import { useEffect, useState } from 'react';
import { useMap } from '../contexts/mapContext';
import maplibregl from 'maplibre-gl';
import PopupForm from '../components/Map/PopupForm';

function useAddMarker() {
  const { mapRef, isAddingMarker, addMarker } = useMap();
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const handleAddMarker = (e) => {
      if (isAddingMarker) {
        console.log("Marker Added!")
        const { lng, lat } = e.lngLat;
        const markerElement = document.createElement("div");
        markerElement.className = "custom-marker";
        const popup = new maplibregl.Popup().setHTML(
          "<p>Marker Öznitelikleri</p>"
        );

        const marker = new maplibregl.Marker(markerElement)
          .setLngLat({ lng, lat })
          .setPopup(popup)
          .addTo(mapRef.current);

        addMarker(marker) // add new marker to context
      }
    };

    if (isAddingMarker) {
      mapRef.current.on("click", handleAddMarker);
    }

    return () => mapRef.current.off("click", handleAddMarker);
  }, [isAddingMarker, mapRef, addMarker]);

  return null; 
}

export default useAddMarker;
