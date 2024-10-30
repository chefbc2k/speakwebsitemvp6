'use client';

import React, { useState, useMemo } from 'react';
import Globe from '@/components/marketplace/Globe';
import Map from '@/components/marketplace/Map';
import { MapData, useMapData } from '@/lib/map-data-utils';
import { getVisibleTables } from '@/lib/map-config';
import { useUser } from '@supabase/auth-helpers-react';

export default function Marketplace() {
  const user = useUser();
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  
  // Use the React Query hook instead of direct fetch
  const { data: mapData = [], isLoading, error } = useMapData();

  // Extract table sources for filtering
  const tableSources = useMemo(() => {
    return Array.from(
      new Set(mapData.map(item => item.tableSource))
    ).map(source => ({
      name: source,
      value: source,
    }));
  }, [mapData]);

  // Filter the map data based on the selected sources
  const filteredData = useMemo(() => {
    if (selectedSources.length === 0) {
      return mapData;
    }
    return mapData.filter((data) => selectedSources.includes(data.tableSource));
  }, [mapData, selectedSources]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading map data</div>;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="flex h-full w-full overflow-hidden">
        <div className="w-1/2 h-full">
          <Globe mapData={filteredData} />
        </div>

        <div className="w-1/2 h-full">
          <Map
            className="h-full w-full"
            initialView={[0, 0]}
            initialZoom={2}
            mapData={filteredData}
          />
        </div>
      </div>
    </div>
  );
}