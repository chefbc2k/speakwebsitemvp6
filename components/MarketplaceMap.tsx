'use client';

import { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { fetchTableData, type MapData } from '@/lib/map-data-utils'; // Data utility import
import { useTheme } from 'next-themes';
import { Mic } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { INITIAL_VIEW_STATE, MAPBOX_TOKEN, MAP_STYLE, MAP_THEME, getVisibleTables } from '@/lib/map-config'; // Config imports

export default function MarketplaceMap({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [locations, setLocations] = useState<MapData[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<MapData | null>(null);
  const { theme } = useTheme();
  const currentTheme = MAP_THEME[theme as keyof typeof MAP_THEME] || MAP_THEME.light;

  useEffect(() => {
    async function loadLocations() {
      try {
        const tables = getVisibleTables(isAuthenticated); // Get visible tables based on auth
        const data = await fetchTableData(tables); // Fetch data from these tables
        setLocations(data);
      } catch (error) {
        console.error('Error loading map data:', error);
      }
    }

    loadLocations();
  }, [isAuthenticated]);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={INITIAL_VIEW_STATE}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAP_STYLE}
      >
        {locations.map((location, index) => (
          <Marker
            key={`${location.latitude}-${location.longitude}-${index}`}
            latitude={location.latitude}
            longitude={location.longitude}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedLocation(location);
            }}
          >
            <Mic className="w-6 h-6 text-primary cursor-pointer" />
          </Marker>
        ))}

        {selectedLocation && !('error' in selectedLocation.rawData) && (
          <Popup
            latitude={selectedLocation.latitude}
            longitude={selectedLocation.longitude}
            onClose={() => setSelectedLocation(null)}
            closeButton={true}
            closeOnClick={false}
            className="bg-background"
          >
            <div className="p-2">
              <h3 className="font-semibold">{selectedLocation.popupContent}</h3>
              {'accuracy' in selectedLocation.rawData && selectedLocation.rawData.accuracy && (
                <p className="text-xs text-muted-foreground mt-2">
                  Accuracy: {selectedLocation.rawData.accuracy}m
                </p>
              )}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}