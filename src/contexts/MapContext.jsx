import { createContext, useContext, useState } from "react";

const MapContext = createContext();

export const MapProvider = ({children}) => {

    const [markers, setMarkers] = useState([]);

    const addMarker = (marker) => {
        setMarkers((prevMarkers) => [...prevMarkers, marker]);
      };
      const data = {
        markers,setMarkers,
        addMarker


      }

      return(
        <MapContext.Provider value={data}>
            {children}
        </MapContext.Provider>

      )
}

export const useMap = () => {
    return useContext(MapContext)
}