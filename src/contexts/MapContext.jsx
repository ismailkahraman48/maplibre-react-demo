// MapContext.js
import { createContext, useContext, useRef, useState } from "react";

const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const mapRef = useRef(null)
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [mapParams, setMapParams] = useState({
    lat : 41.015137,
    lng : 28.979530,
    zoom : 12,
  })
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [apiKeys, setApiKeys] = useState({
    maptiler: import.meta.env.VITE_MAPTILER_API_KEY,
    // Diğer API anahtarları buraya eklenebilir
  });
  const addMarker = (marker) => {
    setMarkers((prevMarkers) => [...prevMarkers, marker]);
  };

  const data = {
    mapRef,
    mapParams,
    setMapParams,
    markers,
    setMarkers,
    isAddingMarker,
    setIsAddingMarker,
    addMarker,
    selectedLocation,
    setSelectedLocation,
    apiKeys,
    setApiKeys,
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
