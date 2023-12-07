/* eslint-disable react/prop-types */
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.css";
import { useEffect, useRef } from "react";
import { useMap } from "../../contexts/mapContext";
import maplibregl from "maplibre-gl";
import AddMarkerButton from "./AddMarkerButton";
import PopupForm from "./PopupForm";
import BasemapSwitch from "./BasemapSwitch/BasemapSwitch";
import { useLayers } from "../../contexts/LayerContext";


function Map({children}) {
  const mapContainer = useRef(null);
  const {
    mapRef,
    addMarker,
    mapParams,
    isAddingMarker,
    setSelectedLocation,
    setActiveMapParams,
    showForm,
    setShowForm,
    temporaryMarker,
    setTemporaryMarker,
  } = useMap();
  const [layers] = useLayers();

  const handleMapMove = (e) => {
    const { center, zoom } = e.target.boxZoom._tr;
    console.log(center);
    setActiveMapParams({
      lat: center.lat,
      lng: center.lng,
      zoom: zoom,
    });
  };
  const handleMapClick = (e) => {
    setSelectedLocation(e.lngLat);
    console.log("seçilen konum güncellendi");
    // Geçici marker'ı ekleyin
    if (temporaryMarker) {
      temporaryMarker.remove();
    }

    const markerElement = document.createElement("div");
    markerElement.className = "custom-marker";

    setTemporaryMarker(
      new maplibregl.Marker(markerElement)
        .setLngLat(e.lngLat)
        .addTo(mapRef.current)
    );
    setShowForm(true);
  };

  

  const handlePolygonClick = (e) => { // layer componentine taşı
    console.log(e.features[0]);
    new maplibregl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(e.features[0].properties.ad)
      .addTo(mapRef.current);
  };

  useEffect(() => {
    // harita render işlemi dropdown olduktan sonra olmalı
    // if (mapRef.current) return;
    console.log("Map initialized !");
    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: mapParams.style,
      center: [mapParams.lng, mapParams.lat],
      zoom: mapParams.zoom,
    });

    mapRef.current.on("moveend", handleMapMove);
    
    mapRef.current.on("click", "yapi", handlePolygonClick); //layer a taşı

    mapRef.current.on("mouseenter", "yapi", () => {
      mapRef.current.getCanvas().style.cursor = "pointer";
    });
    mapRef.current.on("mouseleave", "yapi", () => {
      mapRef.current.getCanvas().style.cursor = "";
    });

    return () => {
      mapRef.current.off("moveend", handleMapMove);
      
      mapRef.current.remove();
    };
  }, [mapParams, mapRef, layers]);

  useEffect(() => {
    console.log("map.jsx",mapRef.current)
  },[mapRef])

  useEffect(() => {
    if (isAddingMarker) {
      console.log("map click event added!");
      mapRef.current.on("click", handleMapClick);
      mapRef.current.getCanvasContainer().style.cursor = "crosshair";
    }

    return () => {
      console.log("map click event removed!");
      mapRef.current.off("click", handleMapClick);
      mapRef.current.getCanvasContainer().style.cursor = "";
    };
  }, [addMarker]);

  return (
    <div className="map-wrap">
      <div className="map" ref={mapContainer} />

      {showForm && <PopupForm />}
      <AddMarkerButton />
      <BasemapSwitch />
      {children}
    </div>
  );
}

export default Map;
