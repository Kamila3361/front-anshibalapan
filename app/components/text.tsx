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
    <div className="flex flex-col gap-[30px] bg-white rounded-xl p-[30px] pointer-events-auto w-full md:w-[650px]" style={{ height: 'calc(100vh - 300px)', marginBottom: '300px' }}>
      {!showMusicBlock ? (
        <>
          <h1 className='text-4xl font-semibold relative'>Өз әуеніңді сипатта</h1>
          <div className="flex flex-col gap-[30px] w-full h-full">
            <div className='relative w-full h-full'>
              <textarea
                placeholder='Өз әуеніңді сипатта'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className='w-full text-xl h-full px-[15px] pt-[10px] text-black rounded-xl bg-gray-200'
              />
            </div>
            <div className="flex gap-[20px]">
              <button className="border p-[10px] bg-white font-medium rounded-xl w-[250px] text-left hover:bg-gray-200 text-xl" onClick={() => setPrompt("Таулар туралы ән")}>
                Таулар туралы ән
              </button>
              <button className="border p-[10px] bg-white font-medium rounded-xl w-[250px] text-left hover:bg-gray-200 text-xl" onClick={() => setPrompt("Жануралар туралы ән")}>Жануарлар туралы ән</button>
            </div>
            <button className="bg-yellow-400 text-black rounded-xl h-[100px] font-semibold hover:bg-yellow-500 text-xl w-full" onClick={handleGenerateSong}>Әндет</button>
          </div>
        </>
      ) : (
        <>
          <div className="text-center font-semibold text-2xl">{songTitle}</div>
          <div className="md:text-2xl text-black overflow-auto h-full w-full px-[20px] text-base whitespace-pre-wrap">
            {newSong?.lyric}
          </div>
          <MusicBlock title={songTitle} songUrl={songUrl} />
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

