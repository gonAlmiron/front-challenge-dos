import React, { useState, useEffect } from 'react';
import {
  MDBInput,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import 'react-autocomplete-input/dist/bundle.css';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

function Layout() {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [map, setMap] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    // Crea una instancia del mapa y la guarda en el estado
    const newMap = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-58.38161505533914, -34.60441336771922], 
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

    geocoder.on('result', (e) => {
      const { center, place_name } = e.result.geometry;

      // Crea un nuevo marcador en la ubicación seleccionada y lo agrega al mapa
      const newMarker = new mapboxgl.Marker().setLngLat(center).addTo(newMap);

      // Actualiza el estado con la ubicación seleccionada y el marcador
      setSelectedLocation({ name: place_name, coordinates: center });
      setMarker(newMarker);
    });


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

  return (
  
    <header>
      <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/slides/041.webp')", height: '400px' }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>42i</h1>
              <h4 className='mb-3'>Buscador de locaciones</h4>
        <div>
            <MDBInput 
            type="text" 
            value={searchText} 
            onChange={handleInputChange}
            placeholder="Buscar una locación" />
            {suggestions.map((suggestion) => (

        <MDBListGroup key={suggestion.place_name} onClick={() => setSearchText(suggestion.place_name)} style={{ minWidth: '22rem' }} light>
          <MDBListGroupItem tag='a' href='#' size="sm" action noBorders active aria-current='true' className='px-3'>{suggestion.place_name}</MDBListGroupItem >
        </MDBListGroup>
      ))}
      {/* {selectedLocation && (
        <div>
          <h2>{selectedLocation.name}</h2>
          <div id="map" style={{ height: '300px' }} />
        </div>
      )} */}
    </div>

            </div>
            
          </div>
        </div>
      </div>
      <hr/>
      <div>
            {/* <input
                className="container my-4"
                type="text"
                placeholder="Buscar una ubicación"
                value={searchText}
                onChange={handleInputChange}
                /> */}
                <div className="centered">
                {selectedLocation && (
        <div>
          <h2>{selectedLocation.name}</h2>
          <div id="map" style={{ height: '300px' }} />
        </div>
      )}
            <div id="map" style={{ height: '400px', width:'90%', position: 'relative', justifyContent:'center', borderRadius: '25px'  }}></div>
            </div>
    </div>
    </header>
  );
}

export default Layout