import React from "react";
import { playAudio } from "../util";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  setSongs,
  id,
  audioRef,
  isPlaying,
}) => {
  //theme
  const { theme } = useContext(ThemeContext);
  //song handler
  const songSelectHandler = async () => {
    await setCurrentSong(song);
    audioRef.current.pause();
    //add active state
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return { ...song, active: true };
      } else {
        return { ...song, active: false };
      }
    });
    setSongs(newSongs);

    if (isPlaying) audioRef.current.play();
    playAudio(isPlaying, audioRef);
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""} ${theme} `}
    >
      <img src={song.cover} alt={song.name}></img>
      <div className="library-text">
        <h2>{song.name}</h2>
        <p>{song.artist}</p>
      </div>
    </div>
  );
};

export default LibrarySong;
