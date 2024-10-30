'use client';

import React, { useState, useMemo } from 'react';
import Globe from '@/components/marketplace/Globe';
import Map from '@/components/marketplace/Map';
import FilterSidebar from '@/components/marketplace/FilterSidebar';
import { getVisibleTables } from '@/lib/map-config';
import { useUser } from '@supabase/auth-helpers-react';
import { useMapData } from '@/lib/map-data-utils';
import { TABLES_TO_FETCH } from '@/lib/map-data-utils';

const MarketplaceMap: React.FC = () => {
  const user = useUser();
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);

  const { data: mapData, isLoading, error } = useMapData();

  const filteredData = useMemo(() => {
    if (!mapData) {
      return [];
    }
    const dataToFilter = user ? mapData : mapData.filter(item => !item.private);
    return selectedSources.length === 0
      ? dataToFilter
      : dataToFilter.filter(item => selectedSources.includes(item.tableSource));
  }, [mapData, selectedSources, user]);

  const handleFilterChange = (tableName: string) => {
    setSelectedSources((prev) =>
      prev.includes(tableName) ? prev.filter((name) => name !== tableName) : [...prev, tableName]
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading map data: {(error as Error).message}</div>;

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
};

export default MarketplaceMap;