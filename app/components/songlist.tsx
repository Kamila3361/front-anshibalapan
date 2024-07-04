"use client";

import { useEffect } from 'react';
import '../globals.css';
import Song from './song';
import { useSongs } from '../api/fetchsongs';

const songsData = ["song1", "song2"];

const Songs = () => {
  const {data, isLoading, isSuccess} = useSongs();
  
  useEffect(() => {
    const songsContainer = document.querySelector('#songs')
    if(!songsContainer) return;
    const songs = songsContainer.querySelectorAll('span')
    const perSongRotationPercentage = 100 / songs.length 
    const totalRotation = 180

    const onScroll = () => {
      const maxScrollY = songsContainer.clientHeight - window.innerHeight
      const scrollPercentage = (window.scrollY / maxScrollY) * 100

      for (let i = 0; i < songs.length; i++) {
        const rotationPercentage = i * perSongRotationPercentage
        const rotation = (rotationPercentage / 100) * totalRotation
        const scrollRotation = (scrollPercentage / 100) * totalRotation
        const skipRotation = (perSongRotationPercentage / 100) * totalRotation

        songs[i].style.transform = `rotate(${rotation - scrollRotation - skipRotation}deg)`
        songs[i].classList.remove('active')
      }

      const nSongs = songs.length
      const activeSongIndex = Math.round((scrollPercentage / 100) * nSongs)
      songs[activeSongIndex]?.classList.add('active')
    }

    addEventListener('scroll', onScroll)
    onScroll()

    for (let i = 0; i < songs.length; i++) {
      songs[i].addEventListener('click', () => {
        const percentage = perSongRotationPercentage * i
        window.scrollTo({
          top: (percentage / 100) * (songsContainer.clientHeight - window.innerHeight),
          behavior: 'smooth',
        })
      })
    }

    return () => {
      removeEventListener('scroll', onScroll)
    }
  }, [data])

  return (
    <div id="songs">
      <div className="follow-screen">
          {/* <button
            className="text-3xl bg-opacity-0 text-white text-black rounded-full p-2 mx-2"
            onClick={handlePlayPause}
          >
            {isPlaying ? <RiPauseFill /> : <RiPlayFill />}
          </button> */}
        {isSuccess && data?.map((song, index) => 
          (
            <span key={index}>
              <Song title={song.title} songUrl={song.song_location}/>
            </span>
          )
        )}
      </div>
    </div>
  )
}

export default Songs
