// src/lib/map-config.ts
import { TableConfig, TABLES_TO_FETCH } from './map-data-utils';

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
// Helper function to get visible tables
export const getVisibleTables = (isAuthenticated: boolean, tablesToFetch?: TableConfig[]): TableConfig[] => {
  const defaultTables: TableConfig[] = [
    {
      tableName: 'users', 
      displayFields: ['user_id', 'username', 'geo_location', 'created_at'],
      label: 'Voice Artists',
      markerColor: MAP_THEME.light.markerColor,
      isPublic: true,
    },
    {
      tableName: 'uservoicetraits',
      displayFields: ['user_id', 'voice_trait_id'],
      label: 'Voice Traits',
      markerColor: MAP_THEME.dark.markerColor,
      isPublic: true,
    },
    {
      tableName: 'usertimezones',
      displayFields: ['user_id', 'time_zone_id'],
      label: 'Timezones',
      markerColor: '#44FF44',
      isPublic: true,
    },
  ];

  return TABLES_TO_FETCH.filter(table => table.isPublic || isAuthenticated);
};