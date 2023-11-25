import 'maplibre-gl/dist/maplibre-gl.css';
import './Map.css'

import { useEffect, useRef, useState } from 'react'
import { useMap } from '../../contexts/mapContext';
import maplibregl from 'maplibre-gl';

function Map() {
    const mapContainer = useRef(null)
    const map = useRef(null)
    const apiKey2 = useRef("oDnL5NubQqpifBXFRO1T")
    const [lng] = useState(139.753);
    const [lat] = useState(35.6844);
    const [zoom] = useState(14);
    const [API_KEY] = useState('oDnL5NubQqpifBXFRO1T');

    const {markers,addMarker} = useMap()

    useEffect(() => {
        if(map.current) return;

        map.current = new maplibregl.Map({
            container : mapContainer.current,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey2.current}`,
            center: [lng, lat],
            zoom: zoom
        })

        map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    },[])


    const handleAddMarker = () => {

    }

  return (
    <div className="map-wrap">
        <div className='map' ref={mapContainer}/>
        <button onClick={handleAddMarker}>Add Marker</button>
    </div>
  )
}

export default Map