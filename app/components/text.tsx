"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import '../globals.css';
import { useCreateSong } from "../api/postsong";
import MusicBlock from "./music";
import { useSinging } from "../context/sing";
import { ErrorModal } from "./Error";
import { LoadingModal } from "./Loading";

export function TextareaWithButton() {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const { mutate: generateSong, isPending: isGenerating, isError: generatingError, isSuccess: isGenerated, data: newSong } = useCreateSong();
  const [showError, setShowError] = useState<boolean>(false);
  const { setAnimation } = useSinging();
  const [songTitle, setSongTitle] = useState<string>('');
  const [songUrl, setSongUrl] = useState<string>('');

  const handleGenerateSong = () => {
    if (selectedOption === 'None') {
      generateSong({ prompt: prompt });
    } else {
      generateSong({ prompt: prompt, voice: selectedOption });
    }
    setPrompt('');
  };

  useEffect(() => {
    if (generatingError) {
      setShowError(true);
      setAnimation('Happy');
    }
    if (isGenerated) {
      setShowError(false);
      console.log(newSong);
      setSongTitle(newSong.title);
      setSongUrl(newSong.musicUrl);
      setAnimation('Happy');
    }
    if (isGenerating) {
      setAnimation('Thinking');
    }
  }, [generatingError, isGenerated, isGenerating, newSong, setAnimation, setSongTitle, setSongUrl]);

  return (
    <div className="flex flex-col gap-[15px] bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm p-[15px] mt-[50px] pointer-events-auto w-full">
      <h1 className='text-5xl font-bold relative'>Өз өлең</h1>
      <div className="flex flex-col gap-[10px] w-full">
        <div className='relative w-full'>
          <textarea
            placeholder='Менің анам туралы өлең шығарып бер'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className='w-full text-xl h-[200px] md:h-[300px] pl-[15px] pt-[10px] text-black rounded-2xl bg-white bg-opacity-20 custom-placeholder shadow-lg backdrop-blur-sm resize-none'
          />
        </div>
        <div className="relative inline-block w-full">
          <select
            value={selectedOption}
            onChange={(option) => setSelectedOption(option.target.value)}
            className="block w-full h-[50px] appearance-none text-xl text-black hover:border-white px-[15px] py-2 pr-8 rounded-2xl shadow leading-tight focus:outline-none shadow-lg bg-white bg-opacity-20 backdrop-blur-sm"
          >
            <option value="None">Дауыс</option>
            <option value="Dua Lipa">Dua Lipa</option>
            <option value="Lana Del Rey">Lana Del Rey</option>
            <option value="Taylor Swift">Taylor Swift</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
        </div>
        <button className="bg-white bg-opacity-20 backdrop-blur-sm text-black rounded-2xl h-[50px] shadow-lg hover:bg-opacity-40 text-xl w-full" onClick={handleGenerateSong}>Send</button>
      </div>
      <MusicBlock title={songTitle} songUrl={songUrl}/>
      <ErrorModal
        showError={showError}
        onClose={() => setShowError(false)}
        errorMessage={"An unexpected error occurred"}
      />
      <LoadingModal isLoading={isGenerating} />
      
    </div>
  );
}

