"use client";

import { useState, useEffect } from 'react';
import Song from './song';
import { useSongs } from '../api/fetchsongs';
import '../globals.css';

const Songs = () => {
  const { data, isLoading, isSuccess } = useSongs();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSongs = isSuccess 
    ? data.filter(song => 
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(song.tags) && song.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      ) 
    : [];

  return (
    <div className='flex flex-col gap-[15px] bg-white p-[15px] bg-opacity-0 rounded-xl pointer-events-auto' style={{ height: 'calc(100vh - 150px)', marginBottom: '150px' }}>
      <div>
        <input 
          type='text' 
          placeholder='Search' 
          className='w-full h-[40px] pl-[15px] text-black rounded-xl bg-white custom-placeholder shadow backdrop-blur-sm text-xl'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className='flex flex-col gap-[10px] overflow-y-auto' style={{ flexGrow: 1 }}>
        {isSuccess && filteredSongs.slice().reverse().map((song, index) => (
          <span key={index}>
            <Song title={song.title} tags={song.tags} songUrl={song.song_location} mouthCues={song.mouth_cue} lyrics={song.lyric}/>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Songs;

