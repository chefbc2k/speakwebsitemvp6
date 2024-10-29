'use client';

import { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';

interface Track {
  id: number;
  title: string;
  artist: string;
  audioUrl: string;
  imageUrl: string;
  duration: string;
}

interface AudioState {
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
}

type AudioAction =
  | { type: 'SET_TRACK'; payload: Track }
  | { type: 'SET_QUEUE'; payload: Track[] }
  | { type: 'TOGGLE_PLAY' }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'TOGGLE_MUTE' }
  | { type: 'SET_TIME'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'NEXT_TRACK' }
  | { type: 'PREVIOUS_TRACK' };

const initialState: AudioState = {
  currentTrack: null,
  queue: [],
  isPlaying: false,
  volume: 1,
  isMuted: false,
  currentTime: 0,
  duration: 0,
};

const audioReducer = (state: AudioState, action: AudioAction): AudioState => {
  switch (action.type) {
    case 'SET_TRACK':
      return { ...state, currentTrack: action.payload };
    case 'SET_QUEUE':
      return { ...state, queue: action.payload };
    case 'TOGGLE_PLAY':
      return { ...state, isPlaying: !state.isPlaying };
    case 'SET_VOLUME':
      return { ...state, volume: action.payload, isMuted: action.payload === 0 };
    case 'TOGGLE_MUTE':
      return { ...state, isMuted: !state.isMuted };
    case 'SET_TIME':
      return { ...state, currentTime: action.payload };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'NEXT_TRACK': {
      const currentIndex = state.queue.findIndex(track => track.id === state.currentTrack?.id);
      const nextTrack = state.queue[currentIndex + 1] || state.queue[0];
      return { ...state, currentTrack: nextTrack };
    }
    case 'PREVIOUS_TRACK': {
      const currentIndex = state.queue.findIndex(track => track.id === state.currentTrack?.id);
      const previousTrack = state.queue[currentIndex - 1] || state.queue[state.queue.length - 1];
      return { ...state, currentTrack: previousTrack };
    }
    default:
      return state;
  }
};

const AudioContext = createContext<{
  state: AudioState;
  dispatch: React.Dispatch<AudioAction>;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  seekTo: (time: number) => void;
  nextTrack: () => void;
  previousTrack: () => void;
} | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(audioReducer, initialState);

  const playTrack = useCallback((track: Track) => {
    dispatch({ type: 'SET_TRACK', payload: track });
    dispatch({ type: 'TOGGLE_PLAY' });
  }, []);

  const togglePlay = useCallback(() => {
    dispatch({ type: 'TOGGLE_PLAY' });
  }, []);

  const setVolume = useCallback((volume: number) => {
    dispatch({ type: 'SET_VOLUME', payload: volume });
  }, []);

  const toggleMute = useCallback(() => {
    dispatch({ type: 'TOGGLE_MUTE' });
  }, []);

  const seekTo = useCallback((time: number) => {
    dispatch({ type: 'SET_TIME', payload: time });
  }, []);

  const nextTrack = useCallback(() => {
    dispatch({ type: 'NEXT_TRACK' });
  }, []);

  const previousTrack = useCallback(() => {
    dispatch({ type: 'PREVIOUS_TRACK' });
  }, []);

  return (
    <AudioContext.Provider
      value={{
        state,
        dispatch,
        playTrack,
        togglePlay,
        setVolume,
        toggleMute,
        seekTo,
        nextTrack,
        previousTrack,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}