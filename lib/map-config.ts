// src/lib/map-config.ts

// Define and export the TableConfig type
export type TableConfig = {
  tableName: string;
  displayFields: readonly string[];
  label: string;
  markerColor: string;
  isPublic: boolean;
  filterConditions?: Record<string, any>;
};

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
    markerColor: '#3b82f6',
  },
} as const;

// Configuration for Tables to Fetch
export const TABLES_TO_FETCH: TableConfig[] = [
  {
    tableName: 'voice_clip_locations',
    displayFields: ['voice_clip_id', 'accuracy', 'latitude', 'longitude', 'location_id'] as const,
    label: 'Voice Clip Location',
    markerColor: '#FF4444', // Red marker for voice clip locations
    isPublic: true,
  },
  {
    tableName: 'voice_clips',
    displayFields: ['name', 'description', 'voice_id', 'created_at'] as const,
    label: 'Voice Clip',
    markerColor: '#4444FF', // Blue marker for voice clips
    isPublic: true,
    filterConditions: {
      is_published: true, // Only show published clips
    },
  },
  {
    tableName: 'voices',
    displayFields: ['name', 'user_id'] as const,
    label: 'Voice',
    markerColor: '#44FF44', // Green marker for voices
    isPublic: false, // Restricted to authenticated users
  },
] as const;

// Helper Function to Filter Tables Based on Authentication
export const getVisibleTables = (isAuthenticated: boolean): TableConfig[] => {
  return TABLES_TO_FETCH.filter(table => isAuthenticated || table.isPublic);
};