import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MapProvider } from "./contexts/mapContext.jsx";
import { LayerProvider } from "./contexts/LayerContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MapProvider>
    <LayerProvider>
      <App />
    </LayerProvider>
  </MapProvider>
);
