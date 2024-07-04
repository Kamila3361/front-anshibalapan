"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axios/axiosINstance";

export interface SongType {
    title: string;
    lyric: string;
    song_location: string;
    key_song: string;
    poster_location: string;
    key_poster: string;
    tags: string;
    created_at: string;
}

const fetchSongs = async (): Promise<SongType[]> => {
    const response = await axiosInstance.get("/api/v5/song/allsongs");
    return response.data;
};

export const useSongs = () => {
    return useQuery<SongType[]>({
        queryKey: ["songs"],
        queryFn: fetchSongs,
    });
};