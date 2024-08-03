"use client";

import { useState, useEffect } from 'react';
import Song from './song';
import { useSongs } from '../api/fetchsongs';
import '../globals.css';
import { is } from '@react-three/fiber/dist/declarations/src/core/utils';

const DropSongs = () => {
  const { data, isLoading, isSuccess } = useSongs();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter songs based on search query
  const filteredSongs = isSuccess 
    ? data.filter(song => 
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(song.tags) && song.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      ) 
    : [];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='relative'>
      {/* Dropdown Button */}
      <button 
        onClick={toggleDropdown} 
        className='w-full h-[50px] flex items-center justify-center bg-white bg-opacity-20 rounded-2xl p-[10px] shadow backdrop-blur-sm text-2xl font-semibold'
      >
        Әуендер
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className='absolute top-full left-0 w-full bg-white bg-opacity-20 p-[15px] rounded-2xl shadow-lg backdrop-blur-sm z-50'>
          <input 
            type='text' 
            placeholder='Search' 
            className='w-full h-[40px] pl-[15px] text-black rounded-2xl bg-white bg-opacity-20 custom-placeholder shadow backdrop-blur-sm text-xl mb-4'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className='flex flex-col gap-[10px] overflow-y-auto max-h-[400px]'>
            {isSuccess && filteredSongs.slice().reverse().map((song, index) => (
              <span key={index}>
                <Song title={song.title} tags={song.tags} songUrl={song.song_location} mouthCues={song.mouth_cue} lyrics={song.lyric}/>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropSongs;
