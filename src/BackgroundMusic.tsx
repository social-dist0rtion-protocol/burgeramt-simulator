import { useEffect, useState } from "react";
import backgroundMusic from "./assets/bg.m4a";

export function BackgroundMusicPlayer() {
  const [audio] = useState(new Audio(backgroundMusic));

  useEffect(() => {
    audio.loop = true;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  const handlePlay = () => {
    audio.play().catch((error) => {
      console.error("Audio playback was prevented:", error);
    });
  };

  return <button onClick={handlePlay}>Play Background Music</button>;
}
