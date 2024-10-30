'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Grid, MapPin } from 'lucide-react';
import Globe from '@/components/marketplace/Globe';
import Filters from '@/components/marketplace/FilterSidebar';
import { fetchTableData, MapData } from '@/lib/map-data-utils';
import { getVisibleTables } from '@/lib/map-config';
import { useUser } from '@supabase/auth-helpers-react';

export default function Marketplace() {
  const [view, setView] = useState<'grid' | 'map'>('map'); // Default to 'map'
  const [mapData, setMapData] = useState<MapData[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const user = useUser();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch map data when component mounts or user changes
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

  const tableSources = useMemo(() => {
    const sources = mapData.map((data) => ({
      name: data.tableSource,
      value: data.tableSource,
    }));
    return Array.from(new Map(sources.map(item => [item.value, item])).values());
  }, [mapData]);

  const handleFilterChange = (source: string) => {
    setSelectedSources((prev) =>
      prev.includes(source) ? prev.filter((s) => s !== source) : [...prev, source]
    );
  };

  const filteredData = useMemo(() => {
    if (selectedSources.length === 0) {
      return mapData;
    }
    return mapData.filter((data) => selectedSources.includes(data.tableSource));
  }, [mapData, selectedSources]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="w-full h-full flex flex-col">
        {/* Header with View Toggle Buttons */}
        <div className="flex justify-between items-center p-4">
          <h1 className="text-3xl font-bold">NFT Marketplace</h1>
          <div className="flex space-x-2">
            <Button
              variant={view === 'grid' ? 'default' : 'outline'}
              onClick={() => setView('grid')}
            >
              <Grid className="h-4 w-4 mr-2" />
              Grid View
            </Button>
            <Button
              variant={view === 'map' ? 'default' : 'outline'}
              onClick={() => setView('map')}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Map View
            </Button>
          </div>
        </div>

        {/* Filters */}
        {view === 'map' && (
          <Filters
            tableSources={tableSources}
            selectedSources={selectedSources}
            onFilterChange={handleFilterChange}
          />
        )}

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

        {/* Main Content */}
        <motion.div
          className="flex-1 flex justify-center items-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {view === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full px-4">
              {mapData.map((data, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={data.rawData.image || 'https://via.placeholder.com/400'}
                    alt={data.rawData.name || 'NFT Image'}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{data.rawData.name || 'NFT Name'}</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      By {data.rawData.artist || 'Unknown'}
                    </p>
                    <p className="mt-2 text-lg font-bold">{data.rawData.price || 'N/A'}</p>
                    <p className="text-sm text-gray-500">
                      Ends in {data.rawData.endTime || 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-[800px]">
              <Globe mapData={filteredData} />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}