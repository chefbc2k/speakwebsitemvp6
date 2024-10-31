export const leafletToGlobeZoom = (leafletZoom: number): number => {
  // Convert Leaflet zoom level (0-18) to Globe altitude
  return Math.pow(2, 16 - leafletZoom);
};

export const globeToLeafletZoom = (altitude: number): number => {
  // Convert Globe altitude to Leaflet zoom level
  return 16 - Math.log2(altitude);
};

export const normalizeCoordinates = (lat: number, lng: number): [number, number] => {
  // Ensure coordinates are within valid ranges
  let normalizedLat = Math.max(-90, Math.min(90, lat));
  let normalizedLng = ((lng + 180) % 360) - 180;
  return [normalizedLat, normalizedLng];
};
