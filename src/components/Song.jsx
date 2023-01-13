import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { useRef, useEffect, useState } from "react";

const Song = ({ currentSong, isPlaying, song, activateSong }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  //rotation
  const audioRef = useRef(null);
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      const newAngle =
        (360 * audioRef.current.currentTime) / audioRef.current.duration;
      setRotationAngle(newAngle);
    }
  }, [isPlaying, audioRef]);
  return (
    <div
      className={`song-container ${theme}`}
      onClick={() => activateSong(song.id)}
    >
      <img
        className={isPlaying ? "animation-play" : ""}
        src={(currentSong && currentSong.cover) || "no cover"}
        alt={(currentSong && currentSong.name) || "no name"}
        style={{ transform: `rotate(${rotationAngle}deg)` }}
        ref={audioRef}
      ></img>
      <h2>{currentSong.name}</h2>
      <p>{currentSong.artist}</p>
    </div>
  );
};

export default Song;
