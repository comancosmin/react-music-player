import React from "react";

const Song = ({ currentSong, isPlaying }) => {
  return (
    <div className="song-container">
      <img
        className={isPlaying ? "animation-play" : ""}
        src={currentSong.cover}
        alt={currentSong.name}
      ></img>
      <h2>{currentSong.name}</h2>
      <p>{currentSong.artist}</p>
    </div>
  );
};

export default Song;
