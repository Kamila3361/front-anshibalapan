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
    <div className="grid w-full gap-2">
      <Textarea placeholder="Yout prompt here" onChange={(e) => setPrompt(e.target.value)} className="text-white text-lg bg-transparent w-[400px] h-[300px] border-purple border-2 divide-opacity-20" />
      <div className="relative inline-block w-full">
      <select
        value={selectedOption}
        onChange={(option) => setSelectedOption(option.target.value)}
        className="block appearance-none w-full text-white border border-purple bg-transparent hover:border-white px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="None" className="bg-black">None</option>
        <option value="Dua Lipa" className="bg-black">Dua Lipa</option>
        <option value="Lana Del Rey" className="bg-black">Lana Del Rey</option>
        <option value="Taylor Swift" className="bg-black">Taylor Swift</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      </div>
    </div>
      <Button className="bg-purple" onClick={handleGenerateSong}>Send</Button>
      {isSuccess && <div className="text-white">Song add to the playlist</div>}
      {/* {isError && <div className="text-white">Error</div>} */}
    </div>
  )
}

