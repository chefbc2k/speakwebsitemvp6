// src/lib/MapDataUtilities.ts

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { TABLES_TO_FETCH, type TableConfig } from './map-config';
import { ReactNode } from 'react';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

/**
 * Represents the processed data for each map marker.
 */
export interface MapData {
  latitude: number;
  longitude: number;
  rawData: Record<string, any>;
  tableSource: string;
  markerColor: string;
  popupContent?: ReactNode; // Optional popup content as ReactNode
  [x: string]: ReactNode | number | string | Record<string, any> | undefined; // Updated index signature
}

/**
 * Fetches data from the specified tables and processes it into MapData format.
 * @param tables - Array of table configurations to fetch data from.
 * @returns A promise that resolves to an array of MapData.
 */
export const fetchTableData = async (tables: TableConfig[]): Promise<MapData[]> => {
  const allMapData: MapData[] = [];

  for (const table of tables) {
    const { tableName, displayFields, markerColor, label, filterConditions } = table;

    try {
      let query = supabase.from(tableName).select(displayFields.join(', '));

      if (filterConditions) {
        query = applyFilterConditions(query, filterConditions);
      }

      const { data, error } = await query;
      if (error) {
        throw new Error(`Error fetching data from ${tableName}: ${error.message}`);
      }

      if (!data) {
        console.warn(`No data found in table ${tableName}`);
        continue;
      }

      // Process the data into MapData format
      const processedData = data.map((item: any) => ({
        latitude: item.latitude,
        longitude: item.longitude,
        rawData: item,
        tableSource: tableName,
        markerColor,
        label
      }));

      allMapData.push(...processedData);
    } catch (error) {
      console.error(`Error processing table ${tableName}:`, error);
    }
  }

  return allMapData;
};

/**
 * Applies filter conditions to a Supabase query.
 * @param query - The Supabase query builder.
 * @param conditions - An object representing filter conditions.
 * @returns The modified query with applied filters.
 */
const applyFilterConditions = (
  query: any,
  conditions: Record<string, any>
) => {
  let modifiedQuery = query;
  for (const [key, value] of Object.entries(conditions)) {
    modifiedQuery = modifiedQuery.eq(key, value);
  }
  return modifiedQuery;
};