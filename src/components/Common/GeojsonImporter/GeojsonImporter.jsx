import { useMap } from "../../../contexts/mapContext";

function GeojsonImporter() {
  const { mapRef } = useMap();

  const handleFileSelect = (e) => {
    const file = e.target.files[0]; 
    if (!file) {
      // No file selected
      return;
    }

    // gelen verinin point polygon olma durumuna göre harita üzerine bas


    const reader = new FileReader();
    reader.onload = function (theFile) {
      // Parse as (geo)JSON
      const geoJSONcontent = JSON.parse(theFile.target.result);
      console.log("geoJSONcontent", geoJSONcontent);
      // Add as source to the map
      mapRef.current.addSource("uploaded-source", {
        type: "geojson",
        data: geoJSONcontent,
      });

      mapRef.current.addLayer({
        id: "uploaded-polygons", // her yüklenen geojson id farklı olmalı
        type: "circle", // type gelen feature type bakılarak yazılmalı
        source: "uploaded-source",
        paint: {
          "circle-radius": 6, // gelen veriye göre point polygon ayırt et ona göre paint ver
          "circle-color": "#B42222",
        },
      });
    };

    // Read the GeoJSON as text
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
