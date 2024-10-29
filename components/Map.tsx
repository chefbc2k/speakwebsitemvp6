import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!mapRef.current) {
        const map = L.map('map').setView([0, 0], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Sample data for NFT hotspots
        const hotspots = [
          { lat: 40.7128, lon: -74.0060, name: 'New York', count: 1000 },
          { lat: 51.5074, lon: -0.1278, name: 'London', count: 800 },
          { lat: 35.6762, lon: 139.6503, name: 'Tokyo', count: 600 },
          { lat: 37.7749, lon: -122.4194, name: 'San Francisco', count: 500 },
          { lat: 48.8566, lon: 2.3522, name: 'Paris', count: 400 },
        ];

        hotspots.forEach(spot => {
          L.marker([spot.lat, spot.lon])
            .addTo(map)
            .bindPopup(`<b>${spot.name}</b><br>NFTs: ${spot.count}`);
        });

        mapRef.current = map;
      }
    }
  }, []);

  return <div id="map" style={{ height: '100%', width: '100%' }}></div>;
};

export default Map;