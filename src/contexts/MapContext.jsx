/* eslint-disable react/prop-types */
// MapContext.js
import { createContext, useContext, useRef, useState } from "react";
import { smoothDark, smooth, osmBright, outdoors, satellite, terrain } from "../public/assets/basemaps";
const MapContext = createContext();

export const MapProvider = ({ children }) => {

  const [basemaps, setBasemaps] = useState([
    { value: "alidade_smooth_dark", image: smoothDark, label: "Dark" },
    { value: "alidade_smooth", image: smooth, label: "Light" },
    { value: "osm_bright", image: osmBright, label: "Bright" },
    { value: "outdoors", image: outdoors, label: "Outdoor" },
    { value: "alidade_satellite", image: satellite, label: "Satellite" },
    { value: "stamen_terrain", image: terrain, label: "Terrain" },
  ]);

  const mapRef = useRef(null)
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [selectedBasemap, setSelectedBasemap] = useState("outdoors");
  const [mapParams, setMapParams] = useState({
    lat : 41.015137,
    lng : 28.979530,
    zoom : 12,
    style : `https://tiles.stadiamaps.com/styles/${selectedBasemap}.json`
  })
  const [activeMapParams, setActiveMapParams] = useState({
    lat : 41.015137,
    lng : 28.979530,
    zoom : 12,
    style : `https://tiles.stadiamaps.com/styles/${selectedBasemap}.json`
  })
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const addMarker = (marker) => {
    setMarkers((prevMarkers) => [...prevMarkers, marker]);
  };

  const data = {
    mapRef,
    mapParams,
    basemaps,
    setBasemaps,
    selectedBasemap,
    setSelectedBasemap,
    setMapParams,
    markers,
    setMarkers,
    isAddingMarker,
    setIsAddingMarker,
    addMarker,
    selectedLocation,
    setSelectedLocation,
    activeMapParams,
    setActiveMapParams
  };

  return (
    <MapContext.Provider value={data}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  return useContext(MapContext);
};
