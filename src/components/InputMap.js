
import React, { useState, useEffect } from 'react';
import 'react-autocomplete-input/dist/bundle.css';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const InputMap = () => {

    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [map, setMap] = useState(null)
  
    useEffect(() => {
      // Crea una instancia del mapa y la guarda en el estado
      const newMap = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-99.1332, 19.4326], // Ciudad de México
        zoom: 10,
        accessToken: 'pk.eyJ1IjoiZ29uYWxtaXJvbiIsImEiOiJjbGd6c3BvemcwbWdxM25wOTB0amJleGFpIn0.FYeIxKL5jo5B6HtGK1XAHQ',
      });
  
  
      // Crea una instancia del objeto MapboxGeocoder y la agrega al mapa
      const geocoder = new MapboxGeocoder({
        accessToken: 'pk.eyJ1IjoiZ29uYWxtaXJvbiIsImEiOiJjbGd6c3BvemcwbWdxM25wOTB0amJleGFpIn0.FYeIxKL5jo5B6HtGK1XAHQ',
        types: 'place',
        language: 'es-MX',
      });
  
      if (map) {
        map.addControl(geocoder);
      }
  
  // Guarda la instancia del mapa en el estado
  setMap(map);
  }, [map]);
  
  useEffect(() => {
    // Si no hay texto de búsqueda, limpia las sugerencias
    if (searchText === '') {
    setSuggestions([]);
    return;
    }
  
    // Usa la API de Mapbox Geocoding para obtener sugerencias
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=pk.eyJ1IjoiZ29uYWxtaXJvbiIsImEiOiJjbGd6c3BvemcwbWdxM25wOTB0amJleGFpIn0.FYeIxKL5jo5B6HtGK1XAHQ&language=es-MX`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const features = data.features;
      setSuggestions(features);
    });
  
  }, [searchText]);
  
  const handleInputChange = e => {
    setSearchText(e.target.value);
    };

    return(

        <>
        <div>
            <hr/>
            <ul>
            {suggestions.map(suggestion => (
            <li key={suggestion.id}>{suggestion.place_name}</li>
            ))}
            </ul>
            <hr/>
            <div id="map" style={{ height: '400px', width: '400px', position: 'relative',  }}></div>
            
            <hr/>
            <input
                    className="container my-4"
                type="text"
                placeholder="Buscar una ubicación"
                value={searchText}
                onChange={handleInputChange}
                />
        </div>
        </>
    )

}

export default InputMap