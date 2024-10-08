"use client";

import React from "react";
import { RiPlayFill, RiPauseFill } from "react-icons/ri";
import { useSinging } from "../context/sing";
import { useEffect } from "react";

export default function MusicBlock() {
  const { audioRef, isPlaying, setIsPlaying, songTitle, currentTime, duration, setIsLyric } = useSinging();

  const handlePlayPause = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } if(audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    if (audioRef.current && audioRef.current.ended) {
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white rounded-xl px-[10px] h-[150px] w-full">
      <div className="flex items-center mt-1 w-full">
        <span className="text-black">{Math.floor(currentTime / 60)}:{('0' + Math.floor(currentTime % 60)).slice(-2)}</span>
        <input
          type="range"
          className="flex-1 mx-1"
          value={currentTime}
          max={duration}
          onChange={(e) => {
            if (audioRef.current) {
              audioRef.current.currentTime = Number(e.target.value);
            }
          }}
        />
        <span className="text-black">{Math.floor(duration / 60)}:{('0' + Math.floor(duration % 60)).slice(-2)}</span>
      </div>
      <div>
        <button className="text-3xl bg-opacity-0 text-black p-2 mx-2" onClick={handlePlayPause}>
          {isPlaying ? <RiPauseFill /> : <RiPlayFill />}
        </button>
      </div>
    </div>
  );
};
