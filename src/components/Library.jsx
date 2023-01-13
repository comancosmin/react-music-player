import React from "react";
import LibrarySong from "./LibrarySong";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
}) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div
      className={`library ${libraryStatus ? "active-library" : ""} ${theme}`}
    >
      <div className="library-sticky">
        <h1>Music Library</h1>
      </div>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            song={song}
            songs={songs}
            cover={song.cover}
            name={song.name}
            artist={song.artist}
            active={song.active}
            key={song.id}
            id={song.id}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
