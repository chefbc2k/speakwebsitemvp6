import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';
import { ReactNode } from 'react';
import { MAP_THEME } from './map-config';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@supabase/auth-helpers-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Get the Tables type from Database
type Tables = Database['public']['Tables'];

// Define the specific tables we want to use
export type ValidTableName = 'users' | 'uservoicetraits' | 'usertimezones';

// Define the TableConfig type with strict typing
export interface TableConfig {
  tableName: ValidTableName;
  displayFields: readonly string[];  // Changed to readonly
  label: string;
  markerColor: string;
  isPublic: boolean;
  private?: boolean;
  latitude: number;
  longitude: number;
}

// Define the tables configuration with explicit typing
export const TABLES_TO_FETCH: TableConfig[] = [
  {
    tableName: 'users',
    displayFields: ['user_id', 'username', 'geo_location', 'created_at'],
    label: 'Voice Artists',
    markerColor: MAP_THEME.light.markerColor,
    isPublic: true,
    latitude: 0,
    longitude: 0
  },
  {
    tableName: 'uservoicetraits',
    displayFields: ['user_id', 'voice_trait_id'],
    label: 'Voice Traits',
    markerColor: MAP_THEME.dark.markerColor,
    isPublic: true,
    latitude: 0,
    longitude: 0
  },
  {
    tableName: 'usertimezones',
    displayFields: ['user_id', 'time_zone_id'],
    label: 'Timezones',
    markerColor: '#44FF44',
    isPublic: true,
    latitude: 0,
    longitude: 0
  },
];

// Define the type for joined user data
type JoinedUserData = {
  user_id: string;
  username: string | null;
  geo_location: string | null;
  created_at: string;
  uservoicetraits?: Array<{
    voice_trait_id: string;
    voicetraits: {
      name: string;
    };
  }>;
  usertimezones?: Array<{
    time_zone_id: string;
    timezones: {
      name: string;
    };
  }>;
  // Optional NFT-related fields
  artist?: string;
  name?: string;
  image?: string;
  price?: string;
  endTime?: string;
};

export interface MapData {
  private: boolean;
  latitude: number;
  longitude: number;
  rawData: JoinedUserData;
  tableSource: ValidTableName;
  markerColor: string;
  label: string;
  popupContent?: ReactNode;
  properties: {
    userId: string;
    username: string;
    geoLocation: string | null;
    createdAt: string;
    voiceTraits?: string[];
    timezone?: string;
  };
}

export const fetchTableData = async (tables: TableConfig[]): Promise<MapData[]> => {
  const allMapData: MapData[] = [];

  for (const table of tables) {
    const { tableName, displayFields, markerColor, label } = table;

    try {
      const { data, error } = await supabase
        .from('users')
        .select(`
          user_id,
          username,
          geo_location,
          created_at,
          uservoicetraits (
            voice_trait_id,
            voicetraits (
              name
            )
          ),
          usertimezones (
            time_zone_id,
            timezones (
              name
            )
          )
        `) as { data: Array<{
          user_id: string;
          username: string | null;
          geo_location: string | null;
          created_at: string;
          uservoicetraits: Array<{
            voice_trait_id: string;
            voicetraits: {
              name: string;
            };
          }>;
          usertimezones: Array<{
            time_zone_id: string;
            timezones: {
              name: string;
            };
          }>;
        }> | null; error: any };

      if (error) {
        throw error;
      }
      if (!data) {
        continue;
      }

      const processedData = data.map((item) => ({
        private: false,
        latitude: parseFloat(item.geo_location?.split(',')[0] || '0'),
        longitude: parseFloat(item.geo_location?.split(',')[1] || '0'),
        rawData: item,
        tableSource: tableName,
        markerColor,
        label,
        properties: {
          userId: item.user_id,
          username: item.username || '',
          geoLocation: item.geo_location,
          createdAt: item.created_at,
          voiceTraits: item.uservoicetraits?.map(vt => vt.voicetraits.name) || [],
          timezone: item.usertimezones?.[0]?.timezones.name
        }
      }));

      allMapData.push(...processedData);
    } catch (error) {
      console.error(`Error processing table ${tableName}:`, error);
    }
  }

  return allMapData;
};

const applyFilterConditions = <T extends ValidTableName>(
  query: any,
  conditions: Partial<Tables[T]['Row']>
) => {
  let modifiedQuery = query;
  for (const [key, value] of Object.entries(conditions)) {
    modifiedQuery = modifiedQuery.eq(key, value);
  }
  return modifiedQuery;
};

// Helper function to get visible tables
export const getVisibleTables = (isAuthenticated: boolean): TableConfig[] => {
  return TABLES_TO_FETCH.filter(table => table.isPublic || isAuthenticated);
};

// Add the React Query hook at the bottom of the file
export function useMapData() {
  const user = useUser();

  return useQuery({
    queryKey: ['mapData', !!user],
    queryFn: async () => {
      const tables = getVisibleTables(!!user);
      return fetchTableData(tables);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}