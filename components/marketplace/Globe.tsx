import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { MapData } from '@/lib/map-data-utils';
import Marker from '@/components/marketplace/Marker';

interface GlobeProps {
  mapData: MapData[];
  center?: [number, number];
  zoom?: number;
}

// New Earth component that handles rotation and textures
const Earth = ({ mapData }: { mapData: MapData[] }) => {
  const earthRef = useRef<THREE.Mesh>(null!);
  const textureLoader = new THREE.TextureLoader();

  // Load Earth textures
  const textures = useMemo(() => {
    const colorMap = textureLoader.load('/textures/earth_daymap.jpg');
    const bumpMap = textureLoader.load('/textures/earth_bump.jpg');
    const specularMap = textureLoader.load('/textures/earth_specular.jpg');

    // Use LinearSRGBColorSpace instead
    colorMap.colorSpace = THREE.LinearSRGBColorSpace;
    colorMap.anisotropy = 16;

    return { colorMap, bumpMap, specularMap };
  }, []);

  // Rotate the globe slowly
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0008;
    }
  });

  return (
    <>
      <mesh ref={earthRef} castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={textures.colorMap}
          bumpMap={textures.bumpMap}
          bumpScale={0.05}
          specularMap={textures.specularMap}
          specular={new THREE.Color(0x666666)}
          shininess={25}
        />
      </mesh>

      {/* Markers on the globe */}
      {mapData.map((data, index) => (
        <Marker key={index} data={data} />
      ))}
    </>
  );
};

// Main Globe component
const Globe: React.FC<GlobeProps> = ({ mapData, center, zoom }) => {
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (center && zoom) {
      // Convert Leaflet zoom to globe camera distance
      const distance = Math.pow(2, 16 - zoom);
      
      globeRef.current?.pointOfView({
        lat: center[0],
        lng: center[1],
        altitude: distance
      }, 1000); // 1000ms transition duration
    }
  }, [center, zoom]);

  return (
    <div className="w-full h-full bg-[#42428f]">
      <Canvas
        style={{ background: '#0a0a1f' }}
        camera={{ position: [0, 0, 3], fov: 45 }}
        shadows
      >
        {/* Scene Background */}
        <color attach="background" args={['#0a0a1f']} />

        {/* Lighting Setup */}
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={3} />
        <directionalLight 
          position={[5, 3, 5]} 
          intensity={2} 
          castShadow 
        />
        <hemisphereLight
          intensity={1}
          color="#e0e0e0"
          groundColor="#3a3a3a"
        />

        {/* Stars in the background */}
        <Stars 
          radius={400} 
          depth={50} 
          count={5000} 
          factor={8} 
          saturation={0.1} 
          fade 
          speed={0.1} 
        />

        {/* Earth with rotation */}
        <Earth mapData={mapData} />

        {/* Orbit Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.7}
          panSpeed={0.6}
          rotateSpeed={0.5}
          minDistance={2}
          maxDistance={5}
        />
      </Canvas>
    </div>
  );
};

export default Globe;