"use client";

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import '../globals.css';
import { useCreateSong } from "../api/postsong";

export function TextareaWithButton() {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const {mutate, isPending, isError, isSuccess} = useCreateSong();

  const handleGenerateSong = () => {
    if(selectedOption === 'None') {
      mutate({prompt: prompt});
    } else {
      mutate({prompt: prompt, voice: selectedOption});
    }
  }

  if(isPending) {
    return <div className="text-white">Loading...</div>
  }
  if(isError) {
    console.log(isError);
  }

  return (
    <div className="flex flex-col w-full gap-2 bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm p-[15px] m-[10px]">
      <h1 className='text-5xl font-bold relative'>Oz Olen</h1>
      <div className='relative'>
        <input type='text' placeholder='Here' className='w-[310px] h-[100px] pl-[15px] pb-[60px] text-black rounded-2xl bg-white bg-opacity-20 custom-placeholder shadow-lg backdrop-blur-sm'/>
      </div>
      <div className="relative inline-block w-[310px]">
        <select
          value={selectedOption}
          onChange={(option) => setSelectedOption(option.target.value)}
          className="block appearance-none text-black hover:border-white px-[15px] py-2 pr-8 rounded-2xl shadow leading-tight focus:outline-none shadow-lg bg-white bg-opacity-20 backdrop-blur-sm"
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
      <button className="bg-white bg-opacity-20 backdrop-blur-sm text-black rounded-2xl h-[35px] shadow-lg w-[310px] hover:bg-opacity-40" onClick={handleGenerateSong}>Send</button>
      {isSuccess && <div className="text-black">Song add to the playlist</div>}
      {/* {isError && <div className="text-white">Error</div>} */}
    </div>
  )
}

