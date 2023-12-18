import { useMap } from "../../../contexts/mapContext";

function GeojsonImporter() {
  const { mapRef } = useMap();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = function (theFile) {
      const geoJSONcontent = JSON.parse(theFile.target.result);

      geoJSONcontent.features.forEach((feature, index) => {
        // Generate a unique ID for each feature
        const layerId = `uploaded-${feature.geometry.type}-${Date.now()}-${index}`;
        console.log("created layer id :", layerId)
        // Add as source to the map
        mapRef.current.addSource(layerId, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [feature],
          },
        });

        // Add layer based on feature geometry type
        if (feature.geometry.type === "Point" || feature.geometry.type === "MultiPoint") {
          mapRef.current.addLayer({
            id: layerId,
            type: "circle",
            source: layerId,
            paint: {
              "circle-radius": 6,
              "circle-color": "#B42222",
            },
          });
        } else if (feature.geometry.type === "LineString" || feature.geometry.type === "MultiLineString") {
          mapRef.current.addLayer({
            id: layerId,
            type: "line",
            source: layerId,
            paint: {
              "line-color": "#888888",
              "line-width": 2,
            },
          });
        } else if (feature.geometry.type === "Polygon" || feature.geometry.type === "MultiPolygon") {
          mapRef.current.addLayer({
            id: layerId,
            type: "fill",
            source: layerId,
            paint: {
              "fill-color": "#888888",
              "fill-outline-color": "red",
              "fill-opacity": 0.4,
            },
          });
        }
      });
    };

    reader.readAsText(file, "UTF-8");
  };

  return (
    <div className="absolute right-5 top-5">
      <input
        type="file"
        id="geojsonImporter"
        name="geojsonImporter"
        accept="application/geo+json,application/vnd.geo+json,.geojson"
        onChange={handleFileSelect}
      />
    </div>
  );
}

export default GeojsonImporter;
