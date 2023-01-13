import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { playAudio } from "../util";
import {
  TbRepeatOff,
  TbRepeatOnce,
  TbRepeat,
  TbArrowsShuffle,
} from "react-icons/tb";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

function Player({
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  setSongInfo,
  songInfo,
  songs,
  setCurrentSong,
  setSongs,
}) {
  //theme
  const { theme } = useContext(ThemeContext);
  //repeat
  const [repeat, setRepeat] = useState("off");

  const handleRepeat = () => {
    if (repeat === "off") {
      setRepeat("once");
    } else if (repeat === "once") {
      setRepeat("all");
    } else {
      setRepeat("off");
    }
    if (repeat === "once") {
      setCurrentSong(currentSong);
    }
  };

  //shuffle
  const [shuffle, setShuffle] = useState(false);

  const handleShuffle = async () => {
    setShuffle(!shuffle);
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let randomIndex = Math.floor(Math.random() * songs.length);
    await setCurrentSong(songs[randomIndex]);
    activeLibraryHandler(songs[randomIndex]);
  };

  //use effect - Update List
  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return { ...song, active: false };
      } else {
        return { ...song, active: true };
      }
    });
    setSongs(newSongs);
  };

  //Event Handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    //there is a function to get the correct time format ** ex: 0:02, 1:49 etc
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const secondsWithZero = String(seconds).padStart(2, "0");
    return `${minutes}:${secondsWithZero}`;
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  // * SkipTrackHandler
  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    //Forward BAck
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        playAudio(isPlaying, audioRef);
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };
  // * TrackAnim
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  const changeVolume = (e) => {
    let value = e.target.value;
    audioRef.current.volume = value;
    setSongInfo({ ...songInfo, volume: value });
  };

  return (
    <div className={`player ${theme} body ${theme}`}>
      <div className="time-control">
        <div className="time">
          <p>{getTime(songInfo.currentTime)}</p>
        </div>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            onChange={dragHandler}
            min={0}
            max={songInfo.duration}
            value={songInfo.currentTime}
            type="range"
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <div className="time">
          <p>{getTime(songInfo.duration)}</p>
        </div>
      </div>

      <div className="play-control">
        <TbArrowsShuffle
          className={`shuffle-button ${shuffle ? "active" : ""}`}
          onClick={() => handleShuffle()}
        ></TbArrowsShuffle>
        <IoIosArrowBack
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
        />
        <FontAwesomeIcon
          onClick={() => {
            playSongHandler();
          }}
          className="play"
          icon={isPlaying ? faPause : faPlay}
        />
        <IoIosArrowForward
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
        />
        <div onClick={() => handleRepeat()}>
          {repeat === "off" ? (
            <TbRepeatOff />
          ) : repeat === "once" ? (
            <TbRepeatOnce />
          ) : (
            <TbRepeat />
          )}
        </div>
      </div>
      {/* // ! this is not working good!
      <div className="volume-control">
          <FontAwesomeIcon
            onClick={() => setActiveVolume(!activeVolume)}
            icon={faVolumeDown}
          />
          {activeVolume && (
            <input
              className="volume"
              onChange={changeVolume}
              value={songInfo.volume}
              max="1"
              min="0"
              step="0.01"
              type="range"
            />
          )}
        </div> */}
    </div>
  );
}

export default Player;
