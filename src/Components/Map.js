import React, { useEffect } from 'react';
import L from 'leaflet';

const Map = () => {
  useEffect(() => {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([51.5, -0.09]).addTo(map)
      .bindPopup('A marker on the map.')
      .openPopup();
  }, []);

  return <div id="map" style={{ height: '400px' }} />;
};

export default Map;