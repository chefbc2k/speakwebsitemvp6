'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { filterCategories } from '@/lib/marketplace-constants';
import type { FilterState } from '@/types/marketplace';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClose: () => void;
  showSidebar: boolean;
}

export default function FilterSidebar({
  filters,
  onFilterChange,
  onClose,
  showSidebar
}: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (category: string, value: string, checked: boolean) => {
    const updatedFilters = {
      ...localFilters,
      [category]: {
        ...localFilters[category as keyof FilterState],
        [value]: checked
      }
    };
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handlePriceRangeChange = (value: number[]) => {
    const updatedFilters = {
      ...localFilters,
      priceRange: value
    };
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearFilters = () => {
    const clearedFilters = Object.keys(localFilters).reduce((acc, key) => {
      if (key === 'priceRange') {
        return { ...acc, [key]: [0, 10] };
      }
      return {
        ...acc,
        [key]: Object.keys(localFilters[key as keyof FilterState]).reduce(
          (subAcc, subKey) => ({ ...subAcc, [subKey]: false }),
          {}
        )
      };
    }, {} as FilterState);
    
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const savePreferences = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('marketplaceFilters', JSON.stringify(localFilters));
    }
  };

  return (
    <div
      className={`absolute top-0 ${
        showSidebar ? 'left-0' : '-left-96'
      } z-10 w-96 h-full bg-white dark:bg-gray-900 shadow-lg transition-all duration-300`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100%-8rem)] p-4">
        <Accordion type="single" collapsible className="w-full">
          {filterCategories.map((category) => (
            <AccordionItem key={category.id} value={category.id}>
              <AccordionTrigger className="text-sm font-medium">
                {category.label}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {category.id === 'priceRange' ? (
                    <div className="px-2">
                      <Slider
                        value={localFilters.priceRange}
                        min={0}
                        max={10}
                        step={0.1}
                        onValueChange={handlePriceRangeChange}
                      />
                      <div className="flex justify-between mt-2 text-sm">
                        <span>{localFilters.priceRange[0]} ETH</span>
                        <span>{localFilters.priceRange[1]} ETH</span>
                      </div>
                    </div>
                  ) : (
                    category.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${category.id}-${option.value}`}
                          checked={localFilters[category.id as keyof FilterState][option.value]}
                          onCheckedChange={(checked) =>
                            handleFilterChange(category.id, option.value, checked as boolean)
                          }
                        />
                        <Label
                          htmlFor={`${category.id}-${option.value}`}
                          className="text-sm font-normal"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
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