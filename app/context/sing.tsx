"use client";

import React, {useContext, createContext, useState, ReactNode, useEffect, useRef} from "react";

interface SingingContextType{
    audioRef: React.MutableRefObject<HTMLAudioElement | null>;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
}

export const SingingContex = createContext<SingingContextType | undefined>(undefined);

export const SingingProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <SingingContex.Provider value={{ audioRef, isPlaying, setIsPlaying }}>
            {children}
        </SingingContex.Provider>
    );
}

export const useSinging = () => {
    const context = useContext(SingingContex);
    if (context === undefined) {
        throw new Error('useSinging must be used within an SingingProvider');
    }
    return context;
};
