import React, { useState,useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
// import { useState } from 'react';

const API_BASE_URL = 'https://restcountries.com';
const countries = [
  { name: 'india', alpha2Code: 'C1', lat: 12.34, lng: 56.78 },
  { name: 'america', alpha2Code: 'C2', lat: 23.45, lng: 67.89 },
  // Add more country objects as needed
  { name: 'cananda', alpha2Code: 'C3', lat: 34.56, lng: 78.90 },
  { name: 'australia', alpha2Code: 'C3', lat: 34.56, lng: 78.90 }, 
  { name: 'england', alpha2Code: 'C3', lat: 34.56, lng: 78.90 }, 
  { name: 'germany', alpha2Code: 'C3', lat: 34.56, lng: 78.90 },
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
