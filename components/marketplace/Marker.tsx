// src/components/Marker.tsx

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MapData } from '@/lib/map-data-utils';
import * as THREE from 'three';
import { latLngToVector3 } from '@/utils/vector3/latLngToVector3';
import { Html } from '@react-three/drei';

interface MarkerProps {
  data: MapData;
}

const Marker: React.FC<MarkerProps> = ({ data }) => {
  const markerRef = useRef<THREE.Mesh>(null!);
  const { latitude, longitude, markerColor, tableSource, rawData } = data;
  const [showPopup, setShowPopup] = useState<boolean>(false);

  // Convert lat/lng to position
  const position = latLngToVector3(latitude, longitude, 1.01); // Slightly above the globe

  // Optional: Add simple animation or interactivity
  useFrame(() => {
    if (markerRef.current) {
      markerRef.current.rotation.y += 0.01;
    }
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPopup(!showPopup);
  };
  return (
    <mesh position={position} ref={markerRef} onClick={(e) => {
      e.stopPropagation();
      setShowPopup(!showPopup);
    }}>
      <sphereGeometry args={[0.01, 8, 8]} />
      <meshStandardMaterial color={markerColor} />
      {/* Tooltip on hover */}
      {showPopup && (
        <Html distanceFactor={10} position={[0, 0.02, 0]}>
          <div className="marker-popup">
            <strong>{tableSource}</strong>
            {/* Display additional data */}
            {Object.entries(rawData)
              .filter(
                ([key]) =>
                  !['latitude', 'longitude'].includes(key)
              )
              .map(([key, value]) => (
                <div key={key}>
                  <strong>{key}:</strong> {String(value)}
                </div>
              ))}
          </div>
        </Html>
      )}
    </mesh>
  );
};

export default Marker;