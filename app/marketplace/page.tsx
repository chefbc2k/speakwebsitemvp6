'use client';

import React, { useState, useMemo } from 'react';
import Globe from '@/components/marketplace/Globe';
import Map from '@/components/marketplace/Map';
import FilterSidebar from '@/components/marketplace/FilterSidebar';
import { MapData, TABLES_TO_FETCH, useMapData } from '@/lib/map-data-utils';
import { getVisibleTables } from '@/lib/map-config';
import { useUser } from '@supabase/auth-helpers-react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Marketplace() {
  const user = useUser();
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<MapData | null>(null);
  const [viewport, setViewport] = useState({
    center: [0, 0] as [number, number],
    zoom: 2
  });
  
  const { data: mapData = [], isLoading, error } = useMapData();

  // Use TABLES_TO_FETCH to generate initial table sources
  const tableSources = useMemo(() => {
    const visibleTables = getVisibleTables(!!user);
    return visibleTables.map(table => ({
      name: table,
      value: table,
    }));
  }, [user]);

  // Filter data based on selected sources
  const filteredData = useMemo(() => {
    if (!mapData) {
      return [];
    }
    const dataToFilter = user ? mapData : mapData.filter(item => !item.private);
    return selectedSources.length === 0
      ? dataToFilter
      : dataToFilter.filter(item => selectedSources.includes(item.tableSource));
  }, [mapData, selectedSources, user]);

  const handleFilterChange = (source: string) => {
    setSelectedSources(prev =>
      prev.includes(source)
        ? prev.filter(s => s !== source)
        : [...prev, source]
    );
  };

  const handleViewportChange = (center: [number, number], zoom: number) => {
    setViewport({ center, zoom });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading map data</div>;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {!showSidebar && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 left-4 z-20"
          onClick={() => setShowSidebar(true)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      {/* Filter Sidebar */}
      <FilterSidebar
        tableSources={tableSources}
        selectedSources={selectedSources}
        onFilterChange={handleFilterChange}
        onClose={() => setShowSidebar(false)}
        showSidebar={showSidebar}
      />

      {/* Main Content */}
      <div className={`flex flex-col h-full transition-all duration-300 ${showSidebar ? 'ml-96' : 'ml-0'}`}>
        {/* Globe Section - Top Half */}
        <div className="h-1/2 w-full">
          <Globe 
            mapData={filteredData}
            center={viewport.center}
            zoom={viewport.zoom}
          />
        </div>

        {/* Map Section - Bottom Half */}
        <div className="h-1/2 w-full">
          <Map
            className="h-full w-full"
            initialView={viewport.center}
            initialZoom={viewport.zoom}
            mapData={filteredData}
            onViewportChange={handleViewportChange}
          />
        </div>

        {/* Location Info Panel */}
        {selectedLocation && (
          <div className="absolute top-0 right-0 w-96 h-full bg-white dark:bg-gray-900 shadow-lg p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">{selectedLocation.tableSource}</h3>
            <div className="space-y-2">
              {Object.entries(selectedLocation.rawData)
                .filter(([key]) => !['latitude', 'longitude'].includes(key))
                .map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="font-medium">{key}:</span>
                    <span>{String(value)}</span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}