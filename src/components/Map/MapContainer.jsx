import { MapProvider } from "../../contexts/mapContext";

function MapContainer({children}) {
  return (
    <MapProvider>
      {children}
    </MapProvider>
  );
}

export default MapContainer;
