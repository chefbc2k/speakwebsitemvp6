export interface NFTLocation {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  artist: string;
  price: number;
  image: string;
  region: string;
  voiceType: string;
  accent: string;
  culturalBackground: string;
  language: string;
  ageRange: string;
  gender: string;
  voiceStyle: string;
  experienceLevel: string;
  rating: number;
  availability: string;
  recordingQuality: string;
  specialization: string;
  projectType: string;
}

export interface FilterState {
  region: Record<string, boolean>;
  voiceType: Record<string, boolean>;
  accent: Record<string, boolean>;
  culturalBackground: Record<string, boolean>;
  language: Record<string, boolean>;
  ageRange: Record<string, boolean>;
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