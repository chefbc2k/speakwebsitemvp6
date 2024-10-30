'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Globe from '@/components/marketplace/Globe';
import FilterSidebar from '@/components/marketplace/FilterSidebar';
import { fetchTableData, MapData, TABLES_TO_FETCH, TableConfig } from '@/lib/map-data-utils';
import { getVisibleTables } from '@/lib/map-config';
import { useUser } from '@supabase/auth-helpers-react';

const MarketplaceMap: React.FC = () => {
  const [mapData, setMapData] = useState<MapData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const user = useUser();

  // Transform TableConfig[] to FilterOption[]
  const filterOptions = useMemo(() => {
    return TABLES_TO_FETCH.map((table) => ({
      name: table.label,
      value: table.tableName
    }));
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const tables = getVisibleTables(!!user);
        const data = await fetchTableData(tables);
        setMapData(data);
      } catch (err) {
        console.error('Error loading map data:', err);
        setError('Failed to load map data.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  // Handle filter changes
  const handleFilterChange = (tableName: string) => {
    setSelectedSources((prev) =>
      prev.includes(tableName)
        ? prev.filter((name) => name !== tableName)
        : [...prev, tableName]
    );
  };

  // Filtered data based on selected sources
  const filteredData = useMemo(() => {
    if (selectedSources.length === 0) {
      return mapData;
    }
    return mapData.filter((data) => selectedSources.includes(data.tableSource));
  }, [mapData, selectedSources]);

  return (
    <div className="relative w-full h-full">
      {/* Loading and Error States */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-50">
          <div className="bg-destructive text-destructive-foreground p-4 rounded-md">
            {error}
          </div>
        </div>
      )}

      {/* Filters */}
      <FilterSidebar
        tableSources={filterOptions}
        selectedSources={selectedSources}
        onFilterChange={handleFilterChange}
        onClose={() => setShowSidebar(false)}
        showSidebar={showSidebar}
      />

      {/* Globe */}
      <Globe mapData={filteredData} />
    </div>
  );
};

export default MarketplaceMap;
