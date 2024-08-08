"use client";

import Songs from "../components/songlist";
import MusicBlock from "../components/musicBlock";
import { Experience } from "../components/Experience";
import { Canvas } from "@react-three/fiber";
import DropSongs from "../components/dropdownsongs";
import { useSinging } from "../context/sing";

export default function Home() {
  const { lyrics, songTitle } = useSinging();
  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-cover bg-center bg-[url('/model/old.png')] overflow-hidden">
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
      <div className="hidden md:block absolute top-20 mt-[50px] left-[15px] w-[490px] pointer-events-auto h-screen z-10">
        <Songs />
      </div>
      {/* Small Screens: DropSongs */}
      <div className="md:hidden absolute top-20 left-0 pointer-events-auto h-screen w-screen z-10">
        <DropSongs />
      </div>
      {/* Lyrics bar */}
      <div className="md:flex md:flex-col md:gap-[10px] absolute bottom-0 w-full md:w-[450px] h-[150px] md:h-auto md:top-20 md:mt-[60px] md:mr-[45px] md:right-0 md:left-auto pointer-events-auto md:p-[15px] bg-white rounded-xl z-20 md:mb-[10px]">
        <div className="text-center font-semibold text-2xl">{songTitle}</div>
          <div className="md:text-2xl text-black overflow-auto h-full w-full px-[20px] text-base whitespace-pre-wrap">
            {lyrics}
          </div>
          <MusicBlock/>
      </div>
    </div>
  );
}

