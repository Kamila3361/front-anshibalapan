// "use client";

// import { useMutation, useQueryClient} from "@tanstack/react-query";
// import { axiosInstance } from "../axios/axiosINstance";

// interface SongData{
//     url: string;
// }

// interface SongType {
//     file: Buffer;
// }

// const downloadSong = async (postData: SongData) => {
//     const response = await axiosInstance.post("/song/download", postData);
//     console.log(response.data);
//     return response.data;
// };

// export const useDownloadSong = () => {
//     const queryClient = useQueryClient();

//     return useMutation<SongType, Error, SongData>({
//         mutationFn: downloadSong,
//         onSuccess: () => {
//             queryClient.invalidateQueries({queryKey: ["songs"]});
//         },
//     });
// };
