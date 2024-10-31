'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FilterCategory {
  name: string;
  tables: FilterOption[];
}

interface FilterOption {
  name: string;
  value: string;
  description?: string;
}

interface FilterSidebarProps {
  tableSources: FilterOption[];
  selectedSources: string[];
  onFilterChange: (source: string) => void;
  onClose?: () => void;
  showSidebar?: boolean;
}

const filterCategories: FilterCategory[] = [
  {
    name: "Location Data",
    tables: [
      { name: "Voice Clip Locations", value: "voice_clip_locations", description: "Geographic locations of voice clips" },
      { name: "Timezones", value: "timezones" },
      { name: "User Timezones", value: "usertimezones" },
      { name: "Voice Timezones", value: "voicetimezones" },
      { name: "NFT Timezones", value: "nfttimezones" }
    ]
  },
  {
    name: "Languages & Translation",
    tables: [
      { name: "Languages", value: "languages", description: "Primary languages" },
      { name: "Secondary Languages", value: "secondarylanguages", description: "Additional language proficiencies" },
      { name: "User Secondary Languages", value: "usersecondarylanguages" },
      { name: "NFT Secondary Languages", value: "nftsecondarylanguages" },
      { name: "Voice Languages", value: "voicelanguages" }
    ]
  },
  {
    name: "Ownership & Rights",
    tables: [
      { name: "Transactions", value: "transactions", description: "NFT ownership transfers" },
      { name: "Royalties", value: "royalties", description: "Creator royalty arrangements" },
      { name: "Roles", value: "roles" },
      { name: "Role Permissions", value: "rolepermissions" }
    ]
  },
  {
    name: "Reviews & Ratings",
    tables: [
      { name: "Reviews", value: "reviews", description: "User and NFT reviews" },
      { name: "Ratings", value: "ratings" }
    ]
  },
  {
    name: "Voice Assets",
    tables: [
      { name: "Voices", value: "voices" },
      { name: "Voice Clips", value: "voice_clips" },
      { name: "Voice Traits", value: "voicetraits" },
      { name: "Voice Categories", value: "voicecategories" },
      { name: "Voice Locations", value: "voice_clip_locations" },
      { name: "Voice Languages", value: "voicelanguages" },
      { name: "Voice Regional Dialects", value: "voiceregionaldialects" },
      { name: "Voice Production Quality", value: "voiceproductionqualities" },
      { name: "Voice Style Tones", value: "voicestyletoneoptions" },
      { name: "Voice Technical Specs", value: "voicetechnicalspecifications" },
      { name: "Voice Secondary Languages", value: "voicesecondarylanguages" },
      { name: "Voice Studio Availability", value: "voicestudioavailabilities" },
      { name: "Voice Voice Traits", value: "voicevoicetraits" }
    ]
  },
  {
    name: "NFT Information",
    tables: [
      { name: "NFTs", value: "nfts" },
      { name: "Collections", value: "collections" },
      { name: "Categories", value: "categories" },
      { name: "Style Tone Options", value: "styletoneoptions" },
      { name: "NFT Categories", value: "nftcategories" },
      { name: "NFT Languages", value: "nftlanguages" },
      { name: "NFT Production Qualities", value: "nftproductionqualities" },
      { name: "NFT Regional Dialects", value: "nftregionaldialects" },
      { name: "NFT Secondary Languages", value: "nftsecondarylanguages" },
      { name: "NFT Studio Availabilities", value: "nftstudioavailabilities" },
      { name: "NFT Style Tone Options", value: "nftstyletoneoptions" },
      { name: "NFT Technical Specifications", value: "nfttechnicalspecifications" },
      { name: "NFT Timezones", value: "nfttimezones" },
      { name: "NFT Voice Traits", value: "nftvoicetraits" }
    ]
  },
  {
    name: "Market Activity",
    tables: [
      { name: "Listings", value: "listings" },
      { name: "Bids", value: "bids" },
      { name: "Contracts", value: "contracts" },
      { name: "Contract Voices", value: "contractvoices" },
      { name: "Contract NFTs", value: "contractnfts" },
      { name: "Contract Users", value: "contractusers" },
      { name: "Favorites", value: "favorites" },
      { name: "Transactions", value: "transactions", description: "Completed sales" }
    ]
  },
  {
    name: "User Categories & Preferences",
    tables: [
      { name: "Users", value: "users" },
      { name: "Activity Logs", value: "activitylogs" },
      { name: "Analytics Events", value: "analyticsevents" },
      { name: "Experience Levels", value: "experiencelevels" },
      { name: "Messages", value: "messages" },
      { name: "User Secondary Languages", value: "usersecondarylanguages" },
      { name: "User Studio Availabilities", value: "userstudioavailabilities" },
      { name: "User Style Tone Options", value: "userstyletoneoptions" },
      { name: "User Technical Specifications", value: "usertechnicalspecifications" },
      { name: "User Timezones", value: "usertimezones" },
      { name: "User Voice Traits", value: "uservoicetraits" },
      { name: "User Secondary Languages", value: "usersecondarylanguages" }
    ]
  }
];

export default function FilterSidebar({
  tableSources,
  selectedSources,
  onFilterChange,
  onClose,
  showSidebar
}: FilterSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const handleFilterChange = (source: string) => {
    onFilterChange(source);
  };

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const clearFilters = () => {
    selectedSources.forEach(source => {
      onFilterChange(source);
    });
  };

  return (
    <div className={`absolute top-0 ${
      showSidebar ? 'left-0' : '-left-96'
    } z-10 w-96 h-full bg-white dark:bg-gray-900 shadow-lg transition-all duration-300`}>
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold">Data Layers</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100%-8rem)] p-4">
        <div className="space-y-4">
          {filterCategories.map((category) => (
            <Collapsible
              key={category.name}
              open={expandedCategories.includes(category.name)}
              onOpenChange={() => toggleCategory(category.name)}
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium">
                {category.name}
                <ChevronLeft className={`h-4 w-4 transform transition-transform ${
                  expandedCategories.includes(category.name) ? 'rotate-90' : '-rotate-90'
                }`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-4 pt-2">
                {category.tables.map((table) => (
                  <div key={table.value} className="flex items-center space-x-2 py-1">
                    <Checkbox
                      id={table.value}
                      checked={selectedSources.includes(table.value)}
                      onCheckedChange={() => handleFilterChange(table.value)}
                    />
                    <Label htmlFor={table.value} className="text-sm font-normal">
                      {table.name}
                    </Label>
                  </div>
                ))}
              </CollapsibleContent>
              <Separator className="my-2" />
            </Collapsible>
          ))}
        </div>
      </ScrollArea>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white dark:bg-gray-900">
        <Button variant="outline" onClick={clearFilters} className="w-full">
          Clear All Filters
        </Button>
      </div>
    </div>
  );
}