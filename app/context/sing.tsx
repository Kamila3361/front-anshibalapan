"use client";

import React, {useContext, createContext, useState, ReactNode, useRef} from "react";

export interface MouthCue{
    start: number;
    end: number;
    value: string;
}

interface SingingContextType {
    audioRef: React.MutableRefObject<HTMLAudioElement | null>;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    songTitle: string;
    setSongTitle: (songTitle: string) => void;
    songUrl: string;
    setSongUrl: (songUrl: string) => void;
    currentTime: number;
    handleTimeUpdate: () => void;
    duration: number;
    handleLoadedMetadata: () => void;
    currentSongTitle: string;
    setCurrentSongTitle: (title: string) => void;
    isLyric: boolean;
    setIsLyric: (isLyric: boolean) => void;
    mouthCue: MouthCue[];
    setMouthCue: (mouthCue: MouthCue[]) => void;
    animation: string;
    setAnimation: (animation: string) => void;
    lyrics: string;
    setLyrics: (lyrics: string) => void;
}

export const SingingContext = createContext<SingingContextType | undefined>(undefined);

export const SingingProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songTitle, setSongTitle] = useState<string>("");
    const [songUrl, setSongUrl] = useState<string>("");
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentSongTitle, setCurrentSongTitle] = useState<string>("");
    const [isLyric, setIsLyric] = useState<boolean>(false);
    const [mouthCue, setMouthCue] = useState<MouthCue[]>([]);
    const [animation, setAnimation] = useState("Happy");
    const [lyrics, setLyrics] = useState<string>("");

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

    return (
        <SingingContext.Provider value={{ 
            audioRef, 
            isPlaying, 
            setIsPlaying, 
            songTitle, 
            setSongTitle, 
            songUrl, 
            setSongUrl, 
            currentTime, 
            handleTimeUpdate, 
            duration, 
            handleLoadedMetadata,
            currentSongTitle,
            setCurrentSongTitle,
            isLyric,
            setIsLyric,
            mouthCue,
            setMouthCue,
            animation,
            setAnimation,
            lyrics,
            setLyrics
        }}>
            {children}
            <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} />
        </SingingContext.Provider>
    );
};

export const useSinging = () => {
    const context = useContext(SingingContext);
    if (context === undefined) {
        throw new Error('useSinging must be used within a SingingProvider');
    }
    return context;
};
