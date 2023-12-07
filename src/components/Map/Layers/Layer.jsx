import { useEffect } from "react";
import { useMap } from "../../../contexts/mapContext";
import Poi from "../../../public/data/Poi.json";
import Yapi from "../../../public/data/Yapi.json";
import { useLayers } from "../../../contexts/LayerContext";

function Layer() {
  const { mapRef } = useMap();
  const {layers, setLayers} = useLayers();

  //Layer ilk harita yükleme anında katmanları yüklemiyor ref olduğundan
  // state yapılabilir
  // harita hareket ettiğinde katmanlar yükleniyor.

  const handleLoadLayers = () => {
        console.log("Layers loaded")
      // Add Poi layer
      mapRef.current.addSource("poi-data", {
        type: "geojson",
        data: Poi,
      });
      mapRef.current.addLayer({
        id: "poi-data",
        type: "circle",
        source: "poi-data",
        layout: {},
        paint: {
          "circle-radius": 6,
          "circle-color": "#B42222",
        },
      });

    //   Add Yapi layer
      // mapRef.current.addSource("yapi", {
      //   type: "geojson",
      //   data: Yapi,
      // });
      // mapRef.current.addLayer({
      //   id: "yapi",
      //   type: "fill",
      //   source: "yapi",
      //   layout: {},
      //   paint: {
      //     "fill-color": "rgba(200, 100, 240, 0.2)",
      //     "fill-outline-color": "rgba(155,200,200, 1)",
      //   },
      // });
      
  };

  

  useEffect(() => {
        if(mapRef.current){
          handleLoadLayers();
        }
        // mapRef.current?.on('load',handleLoadLayers())
        
  },[mapRef.current, layers])

 

  return (
    null
  );
}

export default Layer;
