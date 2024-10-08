// Home.js
"use client";

import Image from "next/image";
import Songs from "./components/songlist";
import { TextareaWithButton } from "./components/text";
import * as THREE from 'three';
import { useEffect, useRef } from "react";
import MusicBlock from "./components/musicBlock";
import { Experience } from "./components/Experience";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  // useEffect(() => {
  //   // Prevent scrolling
  //   document.body.style.overflow = 'hidden';
  //   return () => {
  //     // Restore scroll when component unmounts
  //     document.body.style.overflow = 'auto';
  //   };
  // }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-cover bg-center bg-[url('/model/old.png')] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-transparent md:block hidden">
        <Canvas
          shadows
          camera={{ position: [0, 0, 5], fov: 30, near: 0.2, far: 1000 }}
          style={{ pointerEvents: 'none' }}
        >
          <color attach="background" args={['#ececec']} />
          <Experience avatarPosition={[-1, -3, 1]} scale={2}/>
        </Canvas>
      </div>
      <div className="absolute top-20 mt-[80px] md:right-0 pointer-events-none mx-[45px] w-full md:w-[650px]">
        <TextareaWithButton />
      </div>
    </div>
  );
}

