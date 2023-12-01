import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.css";
import { useEffect, useRef, useState } from "react";
import { useMap } from "../../contexts/mapContext";
import maplibregl from "maplibre-gl";
import AddMarkerButton from "./AddMarkerButton";
import PopupForm from "./PopupForm";
import CustomPopupContent from "./CustomPopupContent";
import ReactDOMServer from 'react-dom/server';

function Map() {
  const mapContainer = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [temporaryMarker, setTemporaryMarker] = useState(null);
  const { mapRef, markers, addMarker, mapParams, isAddingMarker, setIsAddingMarker,selectedLocation, setSelectedLocation, apiKeys } = useMap();
  
  useEffect(() => {
    if (mapRef.current) return;
    console.log("Map initialized !")
    mapRef.current = new maplibregl.Map({
      
      container: mapContainer.current,
      style: `https://tiles.basemaps.cartocdn.com/gl/positron-gl-style/style.json`,
      center: [mapParams.lng, mapParams.lat],
      zoom: mapParams.zoom,
    });

    mapRef.current.addControl(new maplibregl.NavigationControl(), "top-right");

  }, [mapParams]);

  useEffect(() => {
    const handleMapClick = (e) => {
      if (isAddingMarker) {
        setSelectedLocation(e.lngLat);
        console.log("seçilen konum güncellendi")
        // Geçici marker'ı ekleyin
        if (temporaryMarker) {
          temporaryMarker.remove();
        }

        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';

        setTemporaryMarker(
          new maplibregl.Marker(markerElement)
            .setLngLat(e.lngLat)
            .addTo(mapRef.current)
        );

        setShowForm(true);
      }
    };

    if (isAddingMarker) {
      console.log("map click event added!")
      mapRef.current.on("click", handleMapClick);
      mapRef.current.getCanvasContainer().style.cursor = 'crosshair';

    }

    return () => {
      console.log("map click event removed!")
      mapRef.current.off("click", handleMapClick);
      mapRef.current.getCanvasContainer().style.cursor = '';
    };
  }, [isAddingMarker, mapRef, addMarker, setSelectedLocation, temporaryMarker]);

  

  const handleAddMarker = () => {
    setIsAddingMarker((prev) => !prev);
    setSelectedLocation(null);
  };

  const handleFormSubmit = (formData) => {
    const { title, description, location } = formData;
    console.log("formdata",formData)
    // Geçici marker'ı güncelle
    if (temporaryMarker) {
      temporaryMarker
        .setLngLat(location)
        .addTo(mapRef.current);

      // Kalıcı marker'ı ekleyin
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.id = "marker"

      const newMarker = new maplibregl.Marker(markerElement)
        .setLngLat(location)
        .setPopup(new maplibregl.Popup().setHTML(ReactDOMServer.renderToString(
          <CustomPopupContent title={title} description={description} location={location} />
        )))
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

    // Geçici marker'ı kaldırın
    if (temporaryMarker) {
      temporaryMarker.remove();
      setTemporaryMarker(null);
    }

    setIsAddingMarker(false); // Yeni bir marker eklemeyi engelle
  };

  useEffect(() => {
    console.log("ctx markers",markers)
  },[markers])

  return (
    <div className="map-wrap">
      <div className="map" ref={mapContainer} />
      {showForm && (
        <PopupForm
          onSave={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
      <AddMarkerButton handleAddMarker={handleAddMarker}/>
    </div>
  );
}

export default Map;
