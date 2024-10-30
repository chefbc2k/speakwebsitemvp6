// src/lib/map-config.ts

// Initial View State for the Map
export const INITIAL_VIEW_STATE = {
  latitude: 40.7128, // Default latitude (New York City)
  longitude: -74.0060, // Default longitude (New York City)
  zoom: 11,
  bearing: 0,
  pitch: 0,
} as const;

// Mapbox API Token
export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

// Map Style
export const MAP_STYLE = 'mapbox://styles/mapbox/dark-v11';

// Theme Configurations for Light and Dark Modes
export const MAP_THEME = {
  light: {
    backgroundColor: '#ffffff',
    textColor: '#1a1a1a',
    markerColor: '#2563eb',
  },
  dark: {
    backgroundColor: '#1a1a1a',
    textColor: '#ffffff',
    markerColor: '#1e293b',
  },
} as const;

// Define table visibility configuration
export interface TableConfig {
  id: string;
  visible: boolean;
  label: string;
  color?: string;
  locationColumn?: string; // Column containing location data
}

// Default table configurations based on your Supabase schema
export const TABLE_CONFIGS: Record<string, TableConfig> = {
  listings: {
    id: 'listings',
    visible: true,
    label: 'Voice NFT Listings',
    color: '#2563eb',
    // Note: You'll need to add a location column to your listings table
  },
  users: {
    id: 'users',
    visible: true,
    label: 'Voice Artists',
    color: '#10b981',
    // Note: You'll need to add location columns to your users table
  }
} as const;

export function getVisibleTables(p0: boolean): string[] {
  return Object.values(TABLE_CONFIGS)
    .filter(config => config.visible)
    .map(config => config.id);
}
