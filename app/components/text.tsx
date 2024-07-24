"use client";

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import '../globals.css';
import { useCreateSong } from "../api/postsong";
import MusicBlock from "./musicBlock";
import { useSinging } from "../context/sing";
import { ErrorModal } from "./Error";
import { LoadingModal } from "./Loading";

export function TextareaWithButton() {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const {mutate, isPending, isError, isSuccess, data} = useCreateSong();
  const [showError, setShowError] = useState<boolean>(false);
  const { audioRef, setSongTitle, setSongUrl, setMouthCue, setAnimation } = useSinging();

  const handleGenerateSong = () => {
    if(selectedOption === 'None') {
      mutate({prompt: prompt});
    } else {
      mutate({prompt: prompt, voice: selectedOption});
    }
  }

  useEffect(() => {
    if (isError) {
      setShowError(true);
      setAnimation('Happy');
    }
    if (isSuccess && audioRef.current) {
      setShowError(false);
      console.log(data);
      setSongTitle(data.title);
      setSongUrl(data.musicUrl);
      setMouthCue(data.mouthCues);
      audioRef.current.src = data.musicUrl;
      setAnimation('Happy');
    }
    if (isPending) {
      setAnimation('Thinking');
    }
  }, [isError, isSuccess, isPending, data, setAnimation, setSongTitle, setSongUrl, setMouthCue]);

  return (
    <div className="flex flex-col gap-[15px] bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm p-[15px] m-[10px] pointer-events-auto">
      <h1 className='text-5xl font-bold relative w-[310px]'>Oz Olen</h1>
      <div className="flex flex-col gap-[10px] w-[310px]">
        <div className='relative w-[310px]'>
          <textarea
            placeholder='Менің анам туралы өлең шығарып бер'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className='w-[310px] text-xl h-[150px] pl-[15px] pt-[10px] text-black rounded-2xl bg-white bg-opacity-20 custom-placeholder shadow-lg backdrop-blur-sm resize-none'
          />
        </div>
        <div className="relative inline-block">
          <select
            value={selectedOption}
            onChange={(option) => setSelectedOption(option.target.value)}
            className="block w-full appearance-none text-xl text-black hover:border-white px-[15px] py-2 pr-8 rounded-2xl shadow leading-tight focus:outline-none shadow-lg bg-white bg-opacity-20 backdrop-blur-sm"
          >
            <option value="None">None</option>
            <option value="Dua Lipa">Dua Lipa</option>
            <option value="Lana Del Rey">Lana Del Rey</option>
            <option value="Taylor Swift">Taylor Swift</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
        </div>
        <button className="bg-white bg-opacity-20 backdrop-blur-sm text-black rounded-2xl h-[35px] shadow-lg hover:bg-opacity-40 text-xl" onClick={handleGenerateSong}>Send</button>
      </div>
      <MusicBlock/>
      <ErrorModal
        showError={showError}
        onClose={() => setShowError(false)}
        errorMessage={"An unexpected error occurred"}
      />
      <LoadingModal isLoading={isPending} />
      
      {/* {isSuccess && <div className="text-black">Song add to the playlist</div>} */}
      {/* {isError && <div className="text-white">Error</div>} */}
    </div>

  )
}

