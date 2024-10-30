// src/components/Globe.tsx

import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { MapData } from '@/lib/map-data-utils';
import Marker from '@/components/marketplace/Marker';

interface GlobeProps {
  mapData: MapData[];
}

const Globe: React.FC<GlobeProps> = ({ mapData }) => {
  const earthRef = useRef<THREE.Mesh>(null!);

  // Load Earth textures
  const [colorMap, bumpMap, specularMap] = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const color = loader.load('/textures/earth_daymap.jpg');
    const bump = loader.load('/textures/earth_bump.jpg');
    const spec = loader.load('/textures/earth_specular.jpg');
    return [color, bump, spec];
  }, []);

  // Rotate the globe slowly
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Canvas style={{ height: '100vh', width: '100vw' }}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Stars in the background */}
      <Stars radius={300} depth={50} count={10000} factor={7} saturation={0} fade />

      {/* Earth Sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={colorMap}
          bumpMap={bumpMap}
          bumpScale={0.05}
          specularMap={specularMap}
          specular={new THREE.Color('gray')}
        />
      </mesh>

      {/* Markers */}
      {mapData.map((data, index) => (
        <Marker key={index} data={data} />
      ))}

      {/* Orbit Controls */}
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
};

export default Globe;