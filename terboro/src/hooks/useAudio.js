import { useEffect, useRef } from 'react';
import { useSound } from '../context/SoundContext';

export const useAudio = (src, { volume = 1.0, loop = false, autoplay = false } = {}) => {
  const audio = useRef(new Audio(src));
  const { isMuted } = useSound();

  useEffect(() => {
    audio.current.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    audio.current.volume = volume;
    audio.current.loop = loop;
    
    const attemptPlay = async () => {
        try {
            await audio.current.play();
        } catch (error) {
            console.log("Autoplay prevented, waiting for user interaction:", error);
            const onInteraction = () => {
                audio.current.play().catch(e => console.error("Retry play failed", e));
                document.removeEventListener('click', onInteraction);
                document.removeEventListener('keydown', onInteraction);
            };
            document.addEventListener('click', onInteraction);
            document.addEventListener('keydown', onInteraction);
        }
    };

    if (autoplay) {
        attemptPlay();
    }

    return () => {
        audio.current.pause();
        audio.current.currentTime = 0;
    };
  }, [src, volume, loop, autoplay]);

  const play = () => {
    if (audio.current.paused) {
        audio.current.currentTime = 0;
        audio.current.play().catch(e => console.error("Audio play failed", e));
    } else {
        // If already playing, clone it to play overlapping sounds (good for rapid hover)
        const clone = audio.current.cloneNode();
        clone.volume = volume;
        clone.muted = isMuted;
        clone.play().catch(e => console.error("Audio clone play failed", e));
    }
  };

  const stop = () => {
    audio.current.pause();
    audio.current.currentTime = 0;
  };

  return { play, stop };
};
