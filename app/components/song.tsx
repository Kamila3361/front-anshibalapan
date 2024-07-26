"use client";

import React, { useEffect, useState } from "react";
import { RiPlayFill, RiPauseFill, RiDownloadLine } from "react-icons/ri";
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
  const { audioRef, isPlaying, setIsPlaying, setSongTitle, setSongUrl, currentSongTitle, setCurrentSongTitle, setMouthCue, setIsLyric } = useSinging();
  let isCurrentPlaying = isPlaying && currentSongTitle === title;
  // const [currentTime, setCurrentTime] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const handlePlayPause = () => {
    setSongTitle(title);
    setSongUrl(songUrl);
    setCurrentSongTitle(title);
    setMouthCue(mouthCues);
    setIsLyric(false);
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

  const downloadSongHandler = async () => {
    setIsDownloading(true);
    try {
        const response = await fetch(songUrl);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${title}.mp3`; // Set the file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error downloading the song:", error);
    } finally {
      setIsDownloading(false);
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
    <div className="flex flex-row justify-center items-center bg-white bg-opacity-20 rounded-2xl h-[80px] w-full shadow-lg backdrop-blur-sm">
      <div>
        <button className="text-3xl bg-opacity-0 text-black p-1  mx-2" onClick={handlePlayPause}>
          {isCurrentPlaying ? <RiPauseFill /> : <RiPlayFill />}
        </button>
      </div>
      <div className="w-full">
        <p className="font-bold text-black mb-[1px] text-xl">{title.slice(0, 35)}</p>
        <p className="text-black text-lg">{tags.slice(0, 25)}...</p>
      </div>
      <div>
      <button
          className={`text-3xl p-2 mx-2 ${isDownloading ? "text-gray-500" : "text-black"} flex items-center justify-center`}
          onClick={downloadSongHandler}
          disabled={isDownloading}
      >
          {isDownloading ? (
              <img src="/loading.svg" alt="Loading" className="h-16 w-16" />
          ) : (
              <RiDownloadLine />
          )}
      </button>
      </div>
    </div>
  );
};