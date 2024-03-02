"use client"
import {
  Html,
  OrbitControls,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";


const Avatar = () => {
  const [index, setIndex] = useState(1);
  const avatar = useGLTF("/assets/models/anatomy2.glb");
  //const avatar = useGLTF("/assets/models/myavatar.glb");


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
      //  position-x={[-1]}
      />

      <Html position={[-3.7, 0.3, 0]}>

        <button
          className="bg-default-blue text-white w-[100px] p-2 rounded-full text-xs sm:text-lg hover:bg-dark-blu hover:scale-110 duration-500"
          onClick={() => {
            setIndex((index + 1) % names.length);
            setIsClicked(!isClicked);
          }}
        >
          {/* <RiDragMoveLine /> */}

          {isClicked ? "< >" : "Move!"}


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
      {/* <Preload all /> */}
    </Canvas>
  );
};