"use client";

import React from "react";
import { RiPlayFill, RiPauseFill, RiDownloadLine } from "react-icons/ri";
import { useSinging } from "../context/sing";
import { useRef, useState } from "react";
// import { useDownloadSong } from "../api/downloadsong";

interface PlaylistsCardProps {
    title: string;
    songUrl: string;
}

export default function MusicBlock({title, songUrl}: PlaylistsCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
      if (audioRef.current) {
          setDuration(audioRef.current.duration);
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

  return (
    <div className="flex flex-col justify-center items-center bg-white bg-opacity-10 rounded-2xl px-[10px] h-[150px] w-full shadow-lg backdrop-blur-sm">
      <div className="w-[250px] text-center">
        <p className="font-bold text-black mb-[1px] text-2xl">{title.slice(0, 18)}</p>
      </div>
      <div className="flex items-center mt-1 w-full">
      <audio ref={audioRef} src={songUrl} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} />
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
        <button
          className={`text-3xl p-2 mx-2 ${isDownloading ? "text-gray-500" : "text-black"}`}
          onClick={downloadSongHandler}
          disabled={isDownloading}
        >
          {isDownloading ? (
              <img src="/loading.svg" alt="Loading" className="h-10 w-10" />
          ) : (
              <RiDownloadLine />
          )}
        </button>
      </div>
    </div>
  );
};
