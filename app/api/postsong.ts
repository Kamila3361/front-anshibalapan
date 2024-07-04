"use client";

import { useMutation, useQueryClient, UseMutationResult} from "@tanstack/react-query";
import { axiosInstance } from "../axios/axiosINstance";
import { SongType } from "./fetchsongs";

interface SongData{
    prompt: string;
    voice?: string;
}

const generateSong = async (postData: SongData) => {
    const response = await axiosInstance.post("/api/v5/song/generate", postData);
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
