import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const AndaLocation = () => {
  const points = [
    { lat: 37.7749, lng: -122.4194, name: 'San Francisco' },
    { lat: 34.0522, lng: -118.2437, name: 'Los Ángeles' },
    { lat: 40.7128, lng: -74.0060, name: 'Nueva York' },
  ];

  return (
    <MapContainer center={[37.7749, -122.4194]} zoom={4} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {points.map((point, index) => (
        <Marker key={index} position={[point.lat, point.lng]} icon={L.icon({ iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png', iconSize: [25, 41], iconAnchor: [12, 41] })}>
          <Popup>{point.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default AndaLocation;
