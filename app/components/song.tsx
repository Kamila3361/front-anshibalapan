"use client";

import React, { use, useEffect, useRef, useState } from "react";
import { RiPlayFill, RiPauseFill } from "react-icons/ri";
import Link from "next/link";
import { useSinging } from "../context/sing";

interface PlaylistsCardProps {
  title: string;
  tags: string[];
  songUrl: string;
}

export default function Song({ title, tags, songUrl }: PlaylistsCardProps){
  const localAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isCurrentPlaying, setIsCurrentPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const {audioRef, isPlaying, setIsPlaying} = useSinging();

  const handlePlayPause = () => {
    if (localAudioRef.current) {
      if (isCurrentPlaying) {
        localAudioRef.current.pause();
        setIsCurrentPlaying(false);
        if (audioRef.current === localAudioRef.current) {
          setIsPlaying(false);
        }
      } else {
        if (audioRef.current && audioRef.current !== localAudioRef.current) {
          audioRef.current.pause();
        }
        audioRef.current = localAudioRef.current;
        localAudioRef.current.play();
        setIsCurrentPlaying(true);
        setIsPlaying(true);
      }
      console.log(isCurrentPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current !== localAudioRef.current && isPlaying) {
      localAudioRef.current?.pause();
      setIsCurrentPlaying(false);
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (localAudioRef.current) {
      setCurrentTime(localAudioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (localAudioRef.current) {
      setDuration(localAudioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsCurrentPlaying(false);
    setIsPlaying(false);
  };

  return (
    <div className="flex justify-center items-center bg-white bg-opacity-40 rounded-2xl pr-[25px] h-[80px]">
      <div>
        <button
          className="text-3xl bg-opacity-0 text-black p-2 mx-2"
          onClick={handlePlayPause}
        >
          {(isCurrentPlaying && audioRef.current === localAudioRef.current) ? <RiPauseFill /> : <RiPlayFill />}
        </button>
      </div>
      <div className="w-[250px]">
          <p className="font-bold text-black mb-[1px] text-xl">{title.slice(0, 18)}</p>
          <p className="text-black text-lg">{tags.slice(0, 15)}...</p>
          <audio
            ref={localAudioRef}
            src={songUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
          />
      </div>
      <div>
        <p>{Math.floor(localAudioRef.current?.duration ? localAudioRef.current.duration / 60 : 0).toString().padStart(1, '0')}:{Math.floor(localAudioRef.current?.duration ? localAudioRef.current.duration % 60 : 0).toString().padStart(2, '0')}</p>
      </div>
    </div>
  );
};



{/* <div className="flex items-center mt-1 w-full">
                <span className="text-white">{Math.floor(currentTime / 60)}:{('0' + Math.floor(currentTime % 60)).slice(-2)}</span>
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
                <span className="text-white">{Math.floor(duration / 60)}:{('0' + Math.floor(duration % 60)).slice(-2)}</span>
            </div> */}