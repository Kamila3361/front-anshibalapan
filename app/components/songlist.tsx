"use client";

import { useEffect } from 'react';
import Song from './song';
import { useSongs } from '../api/fetchsongs';
import '../globals.css';

const songsData = ["song1", "song2"];

const Songs = () => {
  const {data, isLoading, isSuccess} = useSongs();
  

  return (
    <div className='flex flex-col gap-[15px] bg-white bg-opacity-10 p-[15px] m-[10px] rounded-2xl backdrop-blur-sm'>
      <h1 className='text-5xl font-bold relative'>Music</h1>
      <div className='relative'>
        <input type='text' placeholder='Search' className='w-[310px] h-[35px] pl-[15px] text-black rounded-2xl bg-white bg-opacity-20 custom-placeholder shadow backdrop-blur-sm'/>
      </div>
      <div className='flex flex-col gap-[10px]'>
        {isSuccess && data?.map((song, index) => 
          (
            <span key={index}>
              <Song title={song.title} tags={song.tags} songUrl={song.song_location}/>
            </span>
          )
        )}
      </div>
    </div>
    
  )
}

export default Songs
