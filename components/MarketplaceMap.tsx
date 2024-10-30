'use client';

import { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { 
  MAP_STYLE, 
  INITIAL_VIEW_STATE,
  MAPBOX_TOKEN,
  MAP_THEME,
  type VoiceLocation,
  getVoiceClipLocations // Updated import
} from '@/lib/marketplace-constants';
import { useTheme } from 'next-themes';
import { Mic } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function MarketplaceMap() {
  const [locations, setLocations] = useState<VoiceLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<VoiceLocation | null>(null);
  const { theme } = useTheme();
  const currentTheme = MAP_THEME[theme as keyof typeof MAP_THEME] || MAP_THEME.light;

  useEffect(() => {
// sourcery skip: avoid-function-declarations-in-blocks
    async function loadLocations() {
      try {
        const data = await getVoiceClipLocations(); // Updated function call
        setLocations(data);
      } catch (error) {
        console.error('Error loading voice clip locations:', error);
      }
    }

    loadLocations();
  }, []);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={INITIAL_VIEW_STATE}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAP_STYLE}
      >
        {locations.map((location) => (
          <Marker
            key={location.location_id}
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

        {selectedLocation && (
          <Popup
            latitude={selectedLocation.latitude}
            longitude={selectedLocation.longitude}
            onClose={() => setSelectedLocation(null)}
            closeButton={true}
            closeOnClick={false}
            className="bg-background"
          >
            <div className="p-2">
              <h3 className="font-semibold">{selectedLocation.voice_clips.name}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedLocation.voice_clips.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedLocation.voice_clips.voices.voicecategories.map(({ categories }) => (
                  <Badge key={categories.category_id} variant="secondary">
                    {categories.name}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedLocation.voice_clips.voices.voicelanguages.map(({ languages }) => (
                  <Badge key={languages.language_id} variant="outline">
                    {languages.name}
                  </Badge>
                ))}
              </div>
              {selectedLocation.accuracy && (
                <p className="text-xs text-muted-foreground mt-2">
                  Accuracy: {selectedLocation.accuracy}m
                </p>
              )}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}