import React, { useState } from "react";
import Autocomplete from "react-autocomplete";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "pk.eyJ1IjoiZ29uYWxtaXJvbiIsImEiOiJjbGd6c3BvemcwbWdxM25wOTB0amJleGFpIn0.FYeIxKL5jo5B6HtGK1XAHQ";

function LayoutDos() {
  const [locations, setLocations] = useState([]);
  
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [map, setMap] = useState(null);

  const handleSearch = async (text) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${mapboxgl.accessToken}&country=ES&autocomplete=true`
    );
    const data = await response.json();
    setLocations(data.features);
  };

  const handleSelect = (value) => {
    const [longitude, latitude] = value.center;
    setSelectedLocation(value);
    map.flyTo({
      center: [longitude, latitude],
      zoom: 12,
    });
    new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
  };

  const handleLoad = (map) => {
    setMap(map);
  };

  return (
    <>
      <div>
        <Autocomplete
          getItemValue={(location) => location.place_name}
          items={locations}
          renderItem={(location, isHighlighted) => (
            <div
              key={location.id}
              style={{ background: isHighlighted ? "#eee" : "white" }}
            >
              {location.place_name}
            </div>
          )}
          value={selectedLocation?.place_name || ""}
          onChange={(event) => handleSearch(event.target.value)}
          onSelect={(value) =>
            handleSelect(locations.find((location) => location.place_name === value))
          }
        />
      </div>
      <div style={{ height: "400px", width: "100%" }} ref={handleLoad} />
    </>
  );
}

export default LayoutDos;