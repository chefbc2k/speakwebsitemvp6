import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// Static Constants for Map Configuration
export const MAP_STYLE = 'mapbox://styles/mapbox/dark-v11';
export const INITIAL_VIEW_STATE = {
  latitude: 40.7128,
  longitude: -74.0060,
  zoom: 11,
  bearing: 0,
  pitch: 0,
};

export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

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
};

// Function to Fetch Voice Clip Locations
export async function getVoiceClipLocations(): Promise<VoiceLocation[]> {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from('voice_clip_locations') // Matching table name exactly
    .select(`
      *,
      voice_clips (
        name,
        description,
        user_id,
        voices (
          name,
          description,
          voicecategories (
            categories (*)
          ),
          voicelanguages (
            languages (*)
          )
        )
      )
    `);

  if (error) {
    throw error;
  }

  return data as unknown as VoiceLocation[];
}

// Type Definition for Voice Clip Location
export type VoiceLocation = Database['public']['Tables']['voice_clip_locations']['Row'] & {
  voice_clips: Database['public']['Tables']['voice_clips']['Row'] & {
    voices: Database['public']['Tables']['voices']['Row'] & {
      voicecategories: {
        categories: Database['public']['Tables']['categories']['Row'];
      }[];
      voicelanguages: {
        languages: Database['public']['Tables']['languages']['Row'];
      }[];
    };
  };
};