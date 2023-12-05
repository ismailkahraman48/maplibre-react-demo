// useMapClick.js
import { useEffect } from "react";


const useMapClick = (mapRef, onClick) => {
  useEffect(() => {
    const handleMapClick = (e) => {
      onClick(e);
    };

    mapRef.current.on("click", handleMapClick);

    return () => {
      mapRef.current.off("click", handleMapClick);
    };
  }, [onClick]);
};

export default useMapClick;
