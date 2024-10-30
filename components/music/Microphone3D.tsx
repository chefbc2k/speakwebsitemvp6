'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MicrophoneModelProps {
  isRecording: boolean;
}

function MicrophoneModel({ isRecording }: MicrophoneModelProps) {
  const meshRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Animation controls
  const y = useMotionValue(0);
  const smoothY = useSpring(y, { damping: 20 });
  const rotationY = useTransform(y, [0, 1], [0, Math.PI * 2]);

  useEffect(() => {
    if (isRecording) {
      y.set(Math.random());
    }
  }, [isRecording, y]);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
      
      if (isRecording) {
        // Add subtle vibration when recording
        meshRef.current.position.x = Math.sin(state.clock.getElapsedTime() * 30) * 0.01;
      }
    }
  });

  return (
    <group ref={meshRef} rotation-y={rotationY.get()}>
      {/* Base */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.8, 1, 0.3, 32]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Stand */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 2, 16]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Main Body */}
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color={isRecording ? "#ff4444" : "#4a4a4a"}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Grill */}
      <mesh position={[0, 0.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.8, 32, 4, true]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Top Cap */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial 
          color="#3a3a3a"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Recording Light */}
      {isRecording && (
        <pointLight
          position={[0, 0.7, 0.6]}
          color="#ff0000"
          intensity={2}
          distance={3}
          decay={2}
        />
      )}
    </group>
  );
}

interface Microphone3DProps {
  isRecording: boolean;
}

export default function Microphone3D({ isRecording }: Microphone3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{
        background: 'transparent',
        height: '100%',
        width: '100%',
      }}
    >
      <Stage
        environment="city"
        intensity={0.5}
        contactShadow={{ opacity: 0.5, blur: 2 }}
      >
        <MicrophoneModel isRecording={isRecording} />
      </Stage>
      
      {/* Ambient light */}
      <ambientLight intensity={0.5} />
      
      {/* Key light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        color="#ffffff"
      />
      
      {/* Fill light */}
      <directionalLight
        position={[-10, -10, -5]}
        intensity={0.3}
        color="#FFA500"
      />
      
      {/* Rim light */}
      <pointLight
        position={[0, 5, -5]}
        intensity={0.5}
        color="#FF6347"
      />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
        autoRotate={!isRecording}
        autoRotateSpeed={2}
      />
    </Canvas>
  );
}