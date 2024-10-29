import { useEffect, useState } from "react";
import backgroundMusic from "./assets/bg.m4a";
import coughSound from "./assets/cough.m4a";
import sneezeSound from "./assets/sneeze.m4a";
import doorSound from "./assets/door.m4a"; // Import the door sound

export function BackgroundMusicPlayer() {
  const [audio] = useState(new Audio(backgroundMusic));
  const [coughFrequency, setCoughFrequency] = useState(15000);
  const [sneezeFrequency, setSneezeFrequency] = useState(17000);
  const [doorFrequency, setDoorFrequency] = useState(18000);

  // Play background music
  useEffect(() => {
    audio.loop = true;
    audio
      .play()
      .catch((error) => console.error("Audio playback was prevented:", error));

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  // Function to play sound
  const playSound = (soundPath: string) => {
    const sound = new Audio(soundPath);
    sound
      .play()
      .catch((error) => console.error("Sound playback failed:", error));
  };

  useEffect(() => {
    const playCoughSound = () => playSound(coughSound);

    const interval = setInterval(() => {
      if (Math.random() < 0.5) playCoughSound(); // 50% chance to play each interval
    }, coughFrequency);

    return () => clearInterval(interval);
  }, [coughFrequency]);

  useEffect(() => {
    const playSneezeSound = () => playSound(sneezeSound);

    const interval = setInterval(() => {
      if (Math.random() < 0.5) playSneezeSound(); // 50% chance to play each interval
    }, sneezeFrequency);

    return () => clearInterval(interval);
  }, [sneezeFrequency]);

  useEffect(() => {
    const playDoorSound = () => playSound(doorSound);

    const interval = setInterval(() => {
      if (Math.random() < 0.5) playDoorSound(); // 50% chance to play each interval
    }, doorFrequency);

    return () => clearInterval(interval);
  }, [doorFrequency]);

  return (
    <div>
      <button onClick={() => audio.play()}>Play Background Music</button>
      <div>
        <label>
          Cough Frequency (ms):
          <input
            type="range"
            min="1000"
            max="20000"
            value={coughFrequency}
            onChange={(e) => setCoughFrequency(Number(e.target.value))}
          />
          {coughFrequency} ms
        </label>
      </div>
      <div>
        <label>
          Sneeze Frequency (ms):
          <input
            type="range"
            min="1000"
            max="20000"
            value={sneezeFrequency}
            onChange={(e) => setSneezeFrequency(Number(e.target.value))}
          />
          {sneezeFrequency} ms
        </label>
      </div>
      <div>
        <label>
          Door Frequency (ms):
          <input
            type="range"
            min="1000"
            max="20000"
            value={doorFrequency}
            onChange={(e) => setDoorFrequency(Number(e.target.value))}
          />
          {doorFrequency} ms
        </label>
      </div>
    </div>
  );
}
