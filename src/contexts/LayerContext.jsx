/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const LayerContext = createContext();


export const LayerProvider = ({children}) => {
    const [layers, setLayers] = useState([]);

    const data = [
        layers,
        setLayers
    ]

    return (
        <LayerContext.Provider value={data}>
            {children}
        </LayerContext.Provider>
    )
}


export const useLayers = () => {
    return useContext(LayerContext);
}