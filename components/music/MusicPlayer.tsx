'use client';

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Maximize2,
  Minimize2,
  ListMusic
} from 'lucide-react';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  audioUrl: string;
  imageUrl: string;
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack: Track = {
    id: 1,
    title: "Cosmic Voyage",
    artist: "Artist1",
    duration: "3:45",
    audioUrl: "/sample-audio.mp3",
    imageUrl: "https://picsum.photos/seed/audio1/100/100"
  };

  const playlist: Track[] = [
    currentTrack,
    {
      id: 2,
      title: "Digital Dreams",
      artist: "Artist2",
      duration: "4:20",
      audioUrl: "/sample-audio-2.mp3",
      imageUrl: "https://picsum.photos/seed/audio2/100/100"
    },
    {
      id: 3,
      title: "Neon Nights",
      artist: "Artist3",
      duration: "3:30",
      audioUrl: "/sample-audio-3.mp3",
      imageUrl: "https://picsum.photos/seed/audio3/100/100"
    }
  ];

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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !isMuted;
      setIsMuted(newMuted);
      setVolume(newMuted ? 0 : 1);
      audioRef.current.volume = newMuted ? 0 : 1;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
      />
      
      <div className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-all duration-300 ${isExpanded ? 'h-96' : 'h-20'}`}>
        {/* Main Player Bar */}
        <div className="flex items-center justify-between h-20 px-4">
          <div className="flex items-center space-x-4">
            <img
              src={currentTrack.imageUrl}
              alt={currentTrack.title}
              className="w-12 h-12 rounded-md"
            />
            <div>
              <p className="font-semibold">{currentTrack.title}</p>
              <p className="text-sm text-gray-500">{currentTrack.artist}</p>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="flex items-center justify-center space-x-4">
              <Button variant="ghost" size="icon">
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={togglePlay}>
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              <Button variant="ghost" size="icon">
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">{formatTime(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                className="w-full"
                onValueChange={(value) => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = value[0];
                  }
                }}
              />
              <span className="text-sm">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleMute}>
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Slider
              value={[volume]}
              max={1}
              step={0.01}
              className="w-24"
              onValueChange={handleVolumeChange}
            />
            <Button variant="ghost" size="icon" onClick={() => setShowPlaylist(!showPlaylist)}>
              <ListMusic className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Expanded View */}
        {isExpanded && (
          <div className="h-76 p-4">
            <div className="flex h-full">
              <div className="flex-1 pr-4">
                <img
                  src={currentTrack.imageUrl}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              {showPlaylist && (
                <div className="w-80 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <h3 className="font-semibold mb-4">Playlist</h3>
                  <ScrollArea className="h-[calc(100%-2rem)]">
                    {playlist.map((track) => (
                      <div
                        key={track.id}
                        className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                          currentTrack.id === track.id ? 'bg-gray-100 dark:bg-gray-800' : ''
                        }`}
                      >
                        <img
                          src={track.imageUrl}
                          alt={track.title}
                          className="w-10 h-10 rounded"
                        />
                        <div>
                          <p className="font-medium">{track.title}</p>
                          <p className="text-sm text-gray-500">{track.artist}</p>
                        </div>
                        <span className="ml-auto text-sm text-gray-500">
                          {track.duration}
                        </span>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}