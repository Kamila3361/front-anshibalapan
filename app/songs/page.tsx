"use client";

import Songs from "../components/songlist";
import MusicBlock from "../components/musicBlock";
import { Experience } from "../components/Experience";
import { Canvas } from "@react-three/fiber";
import DropSongs from "../components/dropdownsongs";
import { useSinging } from "../context/sing";

export default function Home() {
  const { lyrics } = useSinging();
  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-cover bg-center bg-[url('/model/stage2.png')] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-transparent">
        <Canvas
          shadows
          camera={{ position: [0, 0, 5], fov: 30, near: 0.2, far: 1000 }}
          style={{ pointerEvents: "none" }}
        >
          <color attach="background" args={["#ececec"]} />
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
      {/* Lyrics bar */}
      <div className="md:flex md:flex-col md:gap-[10px] absolute bottom-0 w-full md:w-[450px] h-[150px] md:h-auto md:top-20 md:right-0 md:left-auto pointer-events-auto md:p-[15px] bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm z-20 md:mb-[10px]">
        <MusicBlock />
        <div className="bg-white bg-opacity-10 rounded-2xl p-[10px] h-full w-full shadow-lg backdrop-blur-sm overflow-auto">
          <div className="text-base md:text-lg text-black whitespace-pre-wrap">
            {lyrics}
          </div>
        </div>
      </div>
    </div>
  );
}

