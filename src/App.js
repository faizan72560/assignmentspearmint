import React, { useState,useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
// import { useState } from 'react';

const API_BASE_URL = 'https://restcountries.com';
const countries = [
  { name: 'India', alpha2Code: 'C1', lat: 28.6139, lng: 77.2090 },
  { name: 'United States', alpha2Code: 'C2', lat: 37.0902, lng: -95.7129 },
  { name: 'Canada', alpha2Code: 'C3', lat: 56.1304, lng: -106.3468 },
  { name: 'Australia', alpha2Code: 'C4', lat: -25.2744, lng: 133.7751 },
  { name: 'United Kingdom', alpha2Code: 'C5', lat: 55.3781, lng: -3.4360 },
  { name: 'Germany', alpha2Code: 'C6', lat: 51.1657, lng: 10.4515 },
  { name: 'China', alpha2Code: 'C7', lat: 35.8617, lng: 104.1954 },
  { name: 'Brazil', alpha2Code: 'C8', lat: -14.2350, lng: -51.9253 },
  { name: 'Russia', alpha2Code: 'C9', lat: 61.5240, lng: 105.3188 },
  { name: 'Japan', alpha2Code: 'C10', lat: 36.2048, lng: 138.2529 },
  { name: 'Mexico', alpha2Code: 'C11', lat: 23.6345, lng: -102.5528 },
  { name: 'France', alpha2Code: 'C12', lat: 46.6031, lng: 1.8883 },
  { name: 'Italy', alpha2Code: 'C13', lat: 41.8719, lng: 12.5674 },
  { name: 'South Korea', alpha2Code: 'C14', lat: 35.9078, lng: 127.7669 },
  { name: 'Spain', alpha2Code: 'C15', lat: 40.4637, lng: -3.7492 },
  { name: 'Indonesia', alpha2Code: 'C16', lat: -0.7893, lng: 113.9213 },
  { name: 'Netherlands', alpha2Code: 'C17', lat: 52.1326, lng: 5.2913 },
  { name: 'Saudi Arabia', alpha2Code: 'C18', lat: 23.8859, lng: 45.0792 },
  { name: 'Switzerland', alpha2Code: 'C19', lat: 46.8182, lng: 8.2275 },
  { name: 'Argentina', alpha2Code: 'C20', lat: -38.4161, lng: -63.6167 },
  { name: 'Sweden', alpha2Code: 'C21', lat: 60.1282, lng: 18.6435 },
  { name: 'Poland', alpha2Code: 'C22', lat: 51.9194, lng: 19.1451 },
  { name: 'Iran', alpha2Code: 'C23', lat: 32.4279, lng: 53.6880 },
];

const WorldMap = () => {
  const [country, setcountry] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [contrydetails, setcontrydetails] = useState([])
  const [bool, setbool] = useState(false)

   useEffect(() => {
    const fetchCountryDetails = async () => {
      console.log(contrydetails)
      try {
        const {data} = await axios.get(`${API_BASE_URL}/v3.1/name/${selectedCountry.name}`);
        // return response.data;
        console.log(data)
        console.log("hello")
        setcontrydetails([...data,contrydetails])
        
      } catch (error) {
        console.error('Error fetching country details:', error);
        return null;
      }
    };
    fetchCountryDetails()
    
   }, [bool])
   
 


  

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    setbool(!bool)
    
    console.log(country)
  };

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '400px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

    
      {countries.map((country) => (
        <Marker
          key={country.name}
          position={[country.lat, country.lng]}
          eventHandlers={{
            click: () => handleCountryClick(country),
          }}

        >
          <Popup>{country.name}</Popup>
        </Marker>
      ))}

    
      {selectedCountry && (
        <div>
          <h2>Country:{selectedCountry.name}</h2>
          <p>Capital:{contrydetails[0]?.capital[0]}</p>
          <img src={contrydetails[0]?.flags.png}/>
        
        </div>

      )}
    </MapContainer>
  );
};

export default WorldMap;
