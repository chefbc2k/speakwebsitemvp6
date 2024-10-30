import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { type MapData } from '@/lib/map-data-utils';
import { getVisibleTables } from '@/lib/map-config';
import { useUser } from '@supabase/auth-helpers-react';

interface MapProps {
  className?: string;
  initialView?: [number, number];
  initialZoom?: number;
}

const MapComponent = ({
  className = '',
  initialView = [0, 0],
  initialZoom = 2
}: MapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const [mapData, setMapData] = useState<MapData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useUser();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!mapRef.current) {
      const map = L.map('map', { zoomControl: false }).setView(initialView, initialZoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      mapRef.current = map;
      markersRef.current = L.layerGroup().addTo(map);
    }

    loadMapData();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [user]);

  const loadMapData = async () => {
    setLoading(true);
    setError(null);
    try {
      const tables = getVisibleTables(!!user);
      const data = await getTableConfig(tables);
      setMapData(data);
    } catch (error) {
      console.error('Error loading map data:', error);
      setError('Failed to load map data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!mapRef.current || !markersRef.current) {
      return;
    }

    markersRef.current.clearLayers();

    mapData.forEach((point) => {
      if ('error' in point.rawData) {
        setError(point.rawData.error);
        return;
      }

      const marker = L.marker([point.latitude, point.longitude], {
        icon: createCustomIcon(point.markerColor),
      });

      const popupContent = `
        <div class="popup-content">
          <h3>${point.tableSource}</h3>
          ${Object.entries(point.rawData)
            .filter(([key]) => !['latitude', 'longitude'].includes(key))
            .map(([key, value]) => `
              <div class="popup-content-row">
                <span class="font-medium">${key}:</span> ${value}
              </div>
            `).join('')}
        </div>
      `;

      marker
        .bindPopup(popupContent, { maxWidth: 300, className: 'custom-popup' })
        .addTo(markersRef.current!);
    });

    if (mapData.length > 0 && !error) {
      const bounds = L.latLngBounds(mapData.map((item) => [item.latitude, item.longitude]));
      mapRef.current?.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [mapData, error]);

  return (
    <div className={`map-container ${className}`}>
      <div id="map" className="h-full w-full" />

      {loading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 bg-red-100 flex items-center justify-center">
          <p className="text-red-700 font-bold">{error}</p>
        </div>
      )}

      <div className="map-controls">
        <button onClick={loadMapData} className="map-control-button">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
      </div>
    </div>
  );
};

function createCustomIcon(color: string) {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="w-6 h-6 rounded-full border-2 border-white shadow-lg" style="background-color: ${color}"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

export default MapComponent;
