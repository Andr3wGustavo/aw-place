"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

type AudioContextType = {
  currentBeat: any;
  isPlaying: boolean;
  playBeat: (beat: any) => void;
  togglePlay: () => void;
  progress: number;
  duration: number;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentBeat, setCurrentBeat] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Instancia o player de áudio real no navegador
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.addEventListener('timeupdate', () => {
        setProgress(audioRef.current?.currentTime || 0);
      });
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }
  }, []);

  const playBeat = (beat: any) => {
    if (audioRef.current) {
      if (currentBeat?.id === beat.id) {
        togglePlay(); // Pausa ou Despausa se clicar na mesma música
        return;
      }
      setCurrentBeat(beat);
      // Se tiver MP3 com watermark, toca. Senão, toca uma default do soundhelix para testes.
      audioRef.current.src = beat.demoAudioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <AudioContext.Provider value={{ currentBeat, isPlaying, playBeat, togglePlay, progress, duration }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
