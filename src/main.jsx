import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MapProvider, LayerProvider } from "contexts/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MapProvider>
    <LayerProvider>
      <App />
    </LayerProvider>
  </MapProvider>
);
