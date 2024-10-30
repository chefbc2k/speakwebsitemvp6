'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { MapData, TABLES_TO_FETCH, TableConfig } from '@/lib/map-data-utils';

interface FilterOption {
  name: string;
  value: string;
}

interface FilterSidebarProps {
  tableSources: FilterOption[];
  selectedSources: string[];
  onFilterChange: (source: string) => void;
  onClose?: () => void;
  showSidebar?: boolean;
}

export default function FilterSidebar({
  tableSources,
  selectedSources,
  onFilterChange,
  onClose,
  showSidebar
}: FilterSidebarProps) {
  const handleFilterChange = (source: string) => {
    onFilterChange(source);
  };

  const clearFilters = () => {
    tableSources.forEach(table => {
      if (selectedSources.includes(table.name)) {
        onFilterChange(table.name);
      }
    });
  };

  const savePreferences = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mapFilters', JSON.stringify(selectedSources));
    }
  };

  return (
    <div
      className={`absolute top-0 ${
        showSidebar ? 'left-0' : '-left-96'
      } z-10 w-96 h-full bg-white dark:bg-gray-900 shadow-lg transition-all duration-300`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold">Data Layers</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100%-8rem)] p-4">
        <div className="space-y-4">
          {tableSources.map((table) => (
            <div key={table.name} className="flex items-center space-x-2">
              <Checkbox
                id={table.name}
                checked={selectedSources.includes(table.name)}
                onCheckedChange={() => handleFilterChange(table.name)}
              />
              <Label
                htmlFor={table.name}
                className="text-sm font-normal"
              >
                {table.name}
              </Label>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white dark:bg-gray-900">
        <div className="flex space-x-2">
          <Button variant="outline" onClick={clearFilters} className="flex-1">
            Clear
          </Button>
          <Button onClick={savePreferences} className="flex-1">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}