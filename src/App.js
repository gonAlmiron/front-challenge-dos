import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl';
import Layout from './components/Layout'
 
mapboxgl.accessToken = 'pk.eyJ1IjoiZ29uYWxtaXJvbiIsImEiOiJjbGd6c3BvemcwbWdxM25wOTB0amJleGFpIn0.FYeIxKL5jo5B6HtGK1XAHQ';
 
export default function App() {
const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(-58.381849956776435);
const [lat, setLat] = useState(-34.603822153083456);
const [zoom, setZoom] = useState(9);


useEffect(() => {
if (map.current) return; // initialize map only once
map.current = new mapboxgl.Map({
container: mapContainer.current,
style: 'mapbox://styles/mapbox/streets-v12',
center: [lng, lat],
zoom: zoom
});
});
 
useEffect(() => {
if (!map.current) return; // wait for map to initialize
map.current.on('move', () => {
setLng(map.current.getCenter().lng.toFixed(4));
setLat(map.current.getCenter().lat.toFixed(4));
setZoom(map.current.getZoom().toFixed(2));
});
});
 
return (
<div>
<Layout/>
<hr/>
<div className="sidebar">
Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
</div>
<div ref={mapContainer} className="map-container" />
</div>
);
}
