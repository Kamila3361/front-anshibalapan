"use client";

import { useMutation, useQueryClient, UseMutationResult} from "@tanstack/react-query";
import { axiosInstance } from "../axios/axiosINstance";
import { MouthCue } from "../context/sing";

interface SongData{
    prompt: string;
    voice?: string;
}

interface SongType {
    musicUrl: string;
    title: string;
    lyric: string;
    // mouthCues: MouthCue[];
}

const generateSong = async (postData: SongData) => {
    const response = await axiosInstance.post("/song/generate", postData);
    console.log(response.data);
    return response.data;
};

export const useCreateSong = () => {
    const queryClient = useQueryClient();

    return useMutation<SongType, Error, SongData>({
        mutationFn: generateSong,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["songs"]});
        },
    });
};
