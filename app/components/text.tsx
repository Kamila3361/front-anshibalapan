"use client";

import { useState, useEffect } from "react";
import '../globals.css';
import { useCreateSong } from "../api/postsong";
import MusicBlock from "./music";
import { useSinging } from "../context/sing";
import { ErrorModal } from "./Error";
import { LoadingModal } from "./Loading";

export function TextareaWithButton() {
  const [prompt, setPrompt] = useState<string>('');
  const { mutate: generateSong, isPending: isGenerating, isError: generatingError, isSuccess: isGenerated, data: newSong } = useCreateSong();
  const [showError, setShowError] = useState<boolean>(false);
  const { setAnimation } = useSinging();
  const [songTitle, setSongTitle] = useState<string>('');
  const [songUrl, setSongUrl] = useState<string>('');
  const [showMusicBlock, setShowMusicBlock] = useState<boolean>(false);

  const handleGenerateSong = () => {
    generateSong({ prompt: prompt });
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
      setShowMusicBlock(true);
    }
    if (isGenerating) {
      setAnimation('Thinking');
    }
  }, [generatingError, isGenerated, isGenerating, newSong, setAnimation, setSongTitle, setSongUrl]);

  const handleBack = () => {
    setShowMusicBlock(false);
    setPrompt('');
    setSongTitle('');
    setSongUrl('');
  };

  return (
    <div className="flex flex-col gap-[15px] bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm p-[15px] mt-[50px] pointer-events-auto w-full" style={{ height: 'calc(100vh - 300px)', marginBottom: '300px' }}>
      <h1 className='text-5xl font-bold relative'>Өз өлең</h1>
      {!showMusicBlock ? (
        <>
          <div className="flex flex-col gap-[10px] w-full h-full">
            <div className='relative w-full h-full'>
              <textarea
                placeholder='Менің анам туралы өлең шығарып бер'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className='w-full text-xl h-full px-[15px] pt-[10px] text-black rounded-2xl bg-white bg-opacity-20 custom-placeholder shadow-lg backdrop-blur-sm resize-none'
              />
            </div>
            <button className="bg-white bg-opacity-20 backdrop-blur-sm text-black rounded-2xl h-[70px] shadow-lg hover:bg-opacity-40 text-xl w-full" onClick={handleGenerateSong}>Send</button>
          </div>
        </>
      ) : (
        <>
          <MusicBlock title={songTitle} songUrl={songUrl} />
          <div className="bg-white bg-opacity-10 rounded-2xl p-[10px] h-full w-full shadow-lg backdrop-blur-sm overflow-auto">
            <div className="text-base md:text-lg text-black whitespace-pre-wrap">
              {newSong?.lyric}
            </div>
          </div>
          <button className="bg-white bg-opacity-20 backdrop-blur-sm text-black rounded-2xl h-[110px] shadow-lg hover:bg-opacity-40 text-xl w-full mt-4" onClick={handleBack}>Артқа</button>
        </>
      )}
      <ErrorModal
        showError={showError}
        onClose={() => setShowError(false)}
        errorMessage={"Дұрыс емес, қайталап көріңіз"}
      />
      <LoadingModal isLoading={isGenerating} />
    </div>
  );
}

