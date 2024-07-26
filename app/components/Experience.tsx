// Experience.js
"use client";

import { OrbitControls, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Avatar } from "./Avatar";
import { useRef, Suspense } from "react";
import { AmbientLight, DirectionalLight } from "three";

interface Props {
  avatarPosition: [number, number, number];
  scale: number;
}

export const Experience = ({avatarPosition, scale}: Props) => {
  const texture = useTexture("/model/stage2.png");
  const viewport = useThree((state) => state.viewport);
  const orbitControls = useRef(null);

  return (
    <>
      <Suspense fallback={null}>
        <ambientLight intensity={0.8} /> {/* Ambient light */}
        <directionalLight position={[10, 10, 10]} intensity={1.5} /> {/* Directional light */}
        <OrbitControls ref={orbitControls} />
        {/* Your 3D objects go here */}
        <Avatar position={avatarPosition} scale={scale}/>
        {/* <Environment preset="sunset" /> */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[viewport.width, viewport.height]} />
          <meshBasicMaterial map={texture} />
        </mesh>
      </Suspense>
      {/* <Avatar position={avatarPosition} scale={scale}/>
      {/* <Environment preset="sunset" /> */}
      {/* <mesh position={[0, 0, 0]}>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial map={texture} />
      </mesh> */} 
    </>
  );
};
