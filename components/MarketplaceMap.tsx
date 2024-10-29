'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Map, { NavigationControl, MapRef } from 'react-map-gl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import FilterSidebar from './marketplace/FilterSidebar';
import NFTMarker from './marketplace/NFTMarker';
import type { NFTLocation, FilterState } from '@/types/marketplace';
import { filterCategories } from '@/lib/marketplace-constants';

// Initialize filter state
const initializeFilterState = (): FilterState => {
  const filterState = filterCategories.reduce((acc, category) => {
    if (category.id === 'priceRange') {
      return { ...acc, [category.id]: [0, 10] };
    }
    return {
      ...acc,
      [category.id]: category.options.reduce(
        (subAcc, option) => ({ ...subAcc, [option.value]: false }),
        {}
      )
    };
  }, {} as FilterState);

  // Try to load saved preferences
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('marketplaceFilters');
    if (saved) {
      return JSON.parse(saved);
    }
  }

  return filterState;
};

const INITIAL_VIEW_STATE = {
  latitude: 0,
  longitude: 0,
  zoom: 2,
  bearing: 0,
  pitch: 0
};

export default function MarketplaceMap() {
  const mapRef = useRef<MapRef | null>(null);
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [selectedNFT, setSelectedNFT] = useState<NFTLocation | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [filters, setFilters] = useState<FilterState>(initializeFilterState);
  const [locations, setLocations] = useState<NFTLocation[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<NFTLocation[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Fetch locations (simulated)
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchLocations = async () => {
      // Simulated data
      const data: NFTLocation[] = [
        {
          id: 1,
          latitude: 40.7128,
          longitude: -74.006,
          title: "NYC Voice Collection",
          artist: "VoiceArtist1",
          price: 0.5,
          image: "https://picsum.photos/seed/nyc/200/200",
          region: "northAmerica",
          voiceType: "bass",
          accent: "american",
          culturalBackground: "western",
          language: "english",
          ageRange: "adult",
          gender: "male",
          voiceStyle: "jazz",
          experienceLevel: "expert",
          rating: 5,
          availability: "immediate",
          recordingQuality: "studio",
          specialization: "audiobooks",
          projectType: "longForm"
        },
        // Add more sample data here
      ];
      setLocations(data);
      setFilteredLocations(data);
    };

    fetchLocations();
  }, []);

  const applyFilters = useCallback(() => {
    const filtered = locations.filter(nft => {
      // Check each filter category
      const matchesRegion = !Object.values(filters.region).some(v => v) ||
        filters.region[nft.region];
      const matchesVoiceType = !Object.values(filters.voiceType).some(v => v) ||
        filters.voiceType[nft.voiceType.toLowerCase()];
      const matchesAccent = !Object.values(filters.accent).some(v => v) ||
        filters.accent[nft.accent];
      const matchesCulture = !Object.values(filters.culturalBackground).some(v => v) ||
        filters.culturalBackground[nft.culturalBackground];
      const matchesLanguage = !Object.values(filters.language).some(v => v) ||
        filters.language[nft.language];
      const matchesAge = !Object.values(filters.ageRange).some(v => v) ||
        filters.ageRange[nft.ageRange];
      const matchesGender = !Object.values(filters.gender).some(v => v) ||
        filters.gender[nft.gender];
      const matchesStyle = !Object.values(filters.voiceStyle).some(v => v) ||
        filters.voiceStyle[nft.voiceStyle.toLowerCase()];
      const matchesExperience = !Object.values(filters.experienceLevel).some(v => v) ||
        filters.experienceLevel[nft.experienceLevel];
      const matchesPrice = nft.price >= filters.priceRange[0] && nft.price <= filters.priceRange[1];
      const matchesQuality = !Object.values(filters.recordingQuality).some(v => v) ||
        filters.recordingQuality[nft.recordingQuality];
      const matchesSpecialization = !Object.values(filters.specialization).some(v => v) ||
        filters.specialization[nft.specialization];
      const matchesProjectType = !Object.values(filters.projectType).some(v => v) ||
        filters.projectType[nft.projectType];

      return (
        matchesRegion && matchesVoiceType && matchesAccent && matchesCulture &&
        matchesLanguage && matchesAge && matchesGender && matchesStyle &&
        matchesExperience && matchesPrice && matchesQuality &&
        matchesSpecialization && matchesProjectType
      );
    });

    setFilteredLocations(filtered);
  }, [filters, locations]);

  useEffect(() => {
    applyFilters();
  }, [filters, applyFilters]);

  const handleMapLoad = () => {
    setIsMapLoaded(true);
  };

  if (typeof window === 'undefined') return null;

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      <FilterSidebar
        filters={filters}
        onFilterChange={setFilters}
        onClose={() => setShowSidebar(false)}
        showSidebar={showSidebar}
      />

      {!showSidebar && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 left-4 z-10 bg-white dark:bg-gray-900"
          onClick={() => setShowSidebar(true)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      <Map
        ref={mapRef}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        onLoad={handleMapLoad}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        <NavigationControl />
        
        {isMapLoaded && filteredLocations.map(nft => (
          <NFTMarker
            key={nft.id}
            nft={nft}
            isSelected={selectedNFT?.id === nft.id}
            onClick={() => setSelectedNFT(nft)}
            onClose={() => setSelectedNFT(null)}
          />
        ))}
      </Map>
    </div>
  );
}