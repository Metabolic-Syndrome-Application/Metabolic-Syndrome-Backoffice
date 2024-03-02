"use client"
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three'; // Import the entire THREE library
import { TextureLoader } from 'three/src/loaders/TextureLoader';


interface MaterialProps {
  map: THREE.Texture;
}

// Define a custom component for each material
function Material({ map }: MaterialProps) {
  return <meshStandardMaterial map={map} />;
}

export default function Cube() {
  const meshRef = useRef(null as unknown as THREE.Mesh); // Use a specific type

  useFrame((state, delta) => {
    if (meshRef.current) { // Check if meshRef.current is not null
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.z += delta * 0.15;
    }
  });

  const texture_1 = useLoader(TextureLoader, '/assets/1.jpg');
  const texture_2 = useLoader(TextureLoader, '/assets/2.jpg');
  const texture_3 = useLoader(TextureLoader, '/assets/3.jpg');
  const texture_4 = useLoader(TextureLoader, '/assets/4.jpg');
  const texture_5 = useLoader(TextureLoader, '/assets/5.jpg');
  const texture_6 = useLoader(TextureLoader, '/assets/6.jpg');

  return (
    <div className='bg-red-400'>
      <div className=''>
        <Canvas>
          <ambientLight intensity={2} />
          <directionalLight position={[2, 1, 1]} />
          <mesh ref={meshRef}>
            <boxGeometry args={[2.5, 2.5, 2.5]} />
            <Material map={texture_1} />
            <Material map={texture_2} />
            <Material map={texture_3} />
            <Material map={texture_4} />
            <Material map={texture_5} />
            <Material map={texture_6} />
          </mesh>
        </Canvas>
      </div>
    </div>
  );
}
