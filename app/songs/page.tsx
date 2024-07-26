"use client";

import Image from "next/image";
import Songs from "../components/songlist";
import { TextareaWithButton } from "../components/text";
import * as THREE from 'three';
import { useEffect, useRef } from "react";
import MusicBlock from "../components/musicBlock";
import { Experience } from "../components/Experience";
import { Canvas } from "@react-three/fiber";
import DropSongs from "../components/dropdownsongs";

export default function Home() {
  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-cover bg-center bg-[url('/model/stage2.png')] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-transparent">
        <Canvas
          shadows
          camera={{ position: [0, 0, 5], fov: 30, near: 0.2, far: 1000 }}
          style={{ pointerEvents: 'none' }}
        >
          <color attach="background" args={['#ececec']} />
          <Experience avatarPosition={[0, -1, 1]} scale={0.8} />
        </Canvas>
      </div>
      {/* Large and Medium Screens: Songs */}
      <div className="hidden md:block absolute top-20 left-0 pointer-events-auto h-screen z-10">
        <Songs />
      </div>
      {/* Small Screens: DropSongs */}
      <div className="md:hidden absolute top-20 left-0 pointer-events-auto h-screen w-screen z-10">
        <DropSongs />
      </div>
      <div className="absolute bottom-0 w-full h-[120px] md:h-[150px] md:top-20 md:right-0 md:left-auto pointer-events-auto md:p-[15px] bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm md:w-[350px] md:m-[10px] z-20">
        <MusicBlock />
      </div>
    </div>
  );
}