// Experience.js
"use client";

import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Avatar } from "./Avatar";
import { useRef } from "react";

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
      <OrbitControls ref={orbitControls} />
      <Avatar position={avatarPosition} scale={scale}/>
      <Environment preset="sunset" />
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </>
  );
};
