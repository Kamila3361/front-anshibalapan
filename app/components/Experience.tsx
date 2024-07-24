"use client";

import { Environment, OrbitControls, useTexture, CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Avatar } from "./Avatar";
import { useEffect, useRef } from "react";

export const Experience = () => {
  const texture = useTexture("/model/stage2.png");
  const viewport = useThree((state) => state.viewport);
  const cameraControls = useRef<CameraControls | null>(null);

  useEffect(() => {
    if (cameraControls.current) {
      cameraControls.current.setLookAt(0, 0, 4, 0, 0, 0, true);
    }
  }, []);
  return (
    <>
      <CameraControls ref={cameraControls} />
      <Avatar position={[0, -0.7, 0]} scale={0.5} rotation={[Math.PI / 2, 0, 0]}/>
      <Environment preset="sunset" />
      <mesh position={[0, 0, -0.5]}>
        <planeGeometry args={[viewport.width + 1.55, viewport.height + 0.8]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </>
  );
};