//3D Model from react-three.js
'use client';

import {
  Html,
  OrbitControls,
  Preload,
  useAnimations,
  useGLTF,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';

const Avatar = () => {
  const [index, setIndex] = useState(1);
  const avatar = useGLTF('/assets/models/avatar.glb');

  const { actions, names } = useAnimations(avatar.animations, avatar.scene);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    actions[names[index]]?.reset().fadeIn(0.5).play();

    return () => {
      actions[names[index]]?.fadeOut(0.5);
    };
  }, [index, actions, names]);

  return (
    <group>
      <primitive
        object={avatar.scene}
        scale={2}
        position-y={-2}
        rotation-y={-0.5}
        position-x={[3.5]}
      />

      <Html position={[1.7, 0.3, 0]}>
        <button
          className='bg-default-blue hover:bg-dark-blu w-[100px] rounded-full p-2 text-xs text-white duration-500 hover:scale-110 sm:text-lg'
          onClick={() => {
            setIndex((index + 1) % names.length);
            setIsClicked(!isClicked);
          }}
        >
          {isClicked ? '< >' : '< >'}
        </button>
      </Html>
    </group>
  );
};

export const AvatarCanvas = () => {
  return (
    <Canvas dpr={[0, 2]}>
      <ambientLight intensity={-2.5} />
      <pointLight position={[1, 1, 1]} />
      <OrbitControls />
      <Avatar />
      <Preload all />
    </Canvas>
  );
};
