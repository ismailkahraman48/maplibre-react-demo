
import useMapClick from "./useMapClick";
import maplibregl from "maplibre-gl";
const useAddMarkerOnMapClick = (mapRef, isAddingMarker, addMarker, setTemporaryMarkers, setShowForm, setSelectedLocation) => {
  useMapClick(mapRef, (e) => {
    if (isAddingMarker) {
      setSelectedLocation(e.lngLat);
      console.log("Selected location updated");

      // Remove existing temporary markers
      setTemporaryMarkers((prevMarkers) => {
        prevMarkers.forEach((marker) => marker.remove()); // Remove each marker
        return [];
      });

      const markerElement = document.createElement("div");
      markerElement.className = "custom-marker";

      // Add new temporary marker
      setTemporaryMarkers((prevMarkers) => [
        ...prevMarkers,
        new maplibregl.Marker(markerElement)
          .setLngLat(e.lngLat)
          .addTo(mapRef.current),
      ]);

      setShowForm(true);
    }
  });
};

export default useAddMarkerOnMapClick;
