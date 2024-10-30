export interface VoiceLocation {
    accuracy: number | null;
    captured_at: string;
    device_info: string | null;
    ip_address: unknown;
    latitude: number;
    location_id: string;
    longitude: number;
    user_id: string;
    voice_clip_id: string;
    voice_clips: {
      name: string;
      description: string;
      user_id: string;
      voices: {
        name: string;
        description: string;
        voicecategories: {
          categories: {
            // Add properties of categories here
          }[];
        }[];
        voicelanguages: {
          languages: {
            // Add properties of languages here
          }[];
        }[];
      }[];
    };
  }
  
  
  export interface FilterState {
    region: Record<string, boolean>;
    voiceType: Record<string, boolean>;
    accent: Record<string, boolean>;
    culturalBackground: Record<string, boolean>;
    language: Record<string, boolean>;
    ageRange: number[];
    gender: Record<string, boolean>;
    voiceStyle: Record<string, boolean>;
    experienceLevel: Record<string, boolean>;
    priceRange: number[];
    rating: Record<string, boolean>;
    availability: Record<string, boolean>;
    recordingQuality: Record<string, boolean>;
    specialization: Record<string, boolean>;
    projectType: Record<string, boolean>;
  }