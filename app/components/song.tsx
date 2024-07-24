"use client";

import React, { useEffect, useState } from "react";
import { RiPlayFill, RiPauseFill } from "react-icons/ri";
import { useSinging } from "../context/sing";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";
import { MouthCue } from "../context/sing";

interface PlaylistsCardProps {
  title: string;
  tags: string[];
  songUrl: string;
  mouthCues: MouthCue[];
}

export default function Song({ title, tags, songUrl, mouthCues }: PlaylistsCardProps) {
  // const [isCurrentPlaying, setIsCurrentPlaying] = useState(false);
  const { audioRef, isPlaying, setIsPlaying, setSongTitle, setSongUrl, currentSongTitle, setCurrentSongTitle, setMouthCue } = useSinging();
  let isCurrentPlaying = isPlaying && currentSongTitle === title;
  // const [currentTime, setCurrentTime] = useState<number>(0);

  const handlePlayPause = () => {
    setSongTitle(title);
    setSongUrl(songUrl);
    setCurrentSongTitle(title);
    setMouthCue(mouthCues);
    isCurrentPlaying = isPlaying && currentSongTitle === title;
    if (audioRef.current) {
      if (isCurrentPlaying) {
        audioRef.current.pause();
        // setIsCurrentPlaying(false);
        setIsPlaying(false);
      } else {
        if (isPlaying) {
          audioRef.current.pause();
        }
        audioRef.current.src = songUrl;
        audioRef.current.play();
        // setIsCurrentPlaying(true);
        setIsPlaying(true);
      }
    }
    if (audioRef.current?.ended) {
      setIsPlaying(false);
    }
  };


  // useEffect(() => {
  //   console.log(currentTime)
  //   if(isPlaying){
  //     console.log(timestamps)
  //     for(let i = 0; i < timestamps.length; i++){
  //       if(currentTime >= timestamps[i].start && currentTime <= timestamps[i].end){
  //         setIsLyric(true);
  //         break;
  //       } else {
  //         setIsLyric(false);
  //       }
  //       console.log(isLyric);
  //     }
  //   } else {
  //     setIsLyric(false);
  //   }
  // }, [currentTime, isPlaying]);


  return (
    <div className="flex flex-row justify-center items-center bg-white bg-opacity-20 rounded-2xl pr-[15px] h-[80px] w-[310px] shadow-lg backdrop-blur-sm">
      <div>
        <button className="text-3xl bg-opacity-0 text-black p-2 mx-2" onClick={handlePlayPause}>
          {isCurrentPlaying ? <RiPauseFill /> : <RiPlayFill />}
        </button>
      </div>
      <div className="w-[250px]">
        <p className="font-bold text-black mb-[1px] text-xl">{title.slice(0, 18)}</p>
        <p className="text-black text-lg">{tags.slice(0, 15)}...</p>
      </div>
    </div>
  );
};