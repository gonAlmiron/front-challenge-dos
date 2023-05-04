import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl';
import Layout from './components/Layout'
import LoginIG from './components/Login';
import {BrowserRouter} from 'react-router-dom'
import InputMap from './components/InputMap';
 
mapboxgl.accessToken = 'pk.eyJ1IjoiZ29uYWxtaXJvbiIsImEiOiJjbGd6c3BvemcwbWdxM25wOTB0amJleGFpIn0.FYeIxKL5jo5B6HtGK1XAHQ';
 
export default function App() {

return (
    <BrowserRouter>
        <div>
            {/* <InputMap/> */}
            {/* <Layout/> */}
            {/* <hr/>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
            <hr/>
            */}
            <LoginIG/> 
        </div>
    </BrowserRouter>
);
}
