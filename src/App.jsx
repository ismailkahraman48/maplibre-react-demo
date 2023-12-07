import './App.css'
import MapContainer from './components/Map/MapContainer'
import Map from './components/Map/Map'
import Layer from './components/Map/Layers/Layer'
import GeojsonImporter from './components/Common/GeojsonImporter/GeojsonImporter'


function App() {


  return (
    <>
      <MapContainer>
        <Map>
          {/* <Layer/> */}
          <GeojsonImporter/>
        </Map>
      </MapContainer>
    </>
  )
}

export default App
