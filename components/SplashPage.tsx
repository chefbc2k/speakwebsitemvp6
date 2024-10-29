'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, StopCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SplashPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState<number[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 256;

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      const source = audioContextRef.current!.createMediaStreamSource(stream);
      source.connect(analyserRef.current!);

      mediaRecorderRef.current.start();
      setIsRecording(true);

      const dataArray = new Uint8Array(analyserRef.current!.frequencyBinCount);
      const updateAudioData = () => {
        analyserRef.current!.getByteFrequencyData(dataArray);
        setAudioData(Array.from(dataArray));
        if (isRecording) {
          requestAnimationFrame(updateAudioData);
        }
      };
      updateAudioData();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setAudioData([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-4">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold text-white mb-8 text-center"
      >
        Welcome to Voice Capture
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
      >
        <div className="flex justify-center mb-4">
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            className={`${
              isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
            } text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center`}
          >
            {isRecording ? (
              <>
                <StopCircle className="mr-2" /> Stop Recording
              </>
            ) : (
              <>
                <Mic className="mr-2" /> Start Recording
              </>
            )}
          </Button>
        </div>

        <div className="h-32 bg-gray-100 rounded-lg overflow-hidden">
          <div className="flex h-full items-end justify-around">
            <AnimatePresence>
              {audioData.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={{ height: `${(value / 255) * 100}%` }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.1 }}
                  className="w-1 bg-blue-500 rounded-t"
                  style={{ minHeight: '1px' }}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-8 text-white text-center max-w-md"
      >
        Click the button to start recording your voice. The sound waves will visualize your audio input in real-time.
      </motion.p>
    </div>
  );
};

export default SplashPage;