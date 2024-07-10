"use client";

import { useEffect } from 'react';
import Song from './song';
import { useSongs } from '../api/fetchsongs';

const songsData = ["song1", "song2"];

const Songs = () => {
  const {data, isLoading, isSuccess} = useSongs();
  

  return (
    <div className='flex flex-col gap-[10px]'>
      {isSuccess && data?.map((song, index) => 
        (
          <span key={index}>
            <Song title={song.title} tags={song.tags} songUrl={song.song_location}/>
          </span>
        )
      )}
    </div>
  )
}

export default Songs
