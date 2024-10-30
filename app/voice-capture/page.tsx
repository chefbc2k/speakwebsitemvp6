'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mic, StopCircle, Download, Loader2, ArrowRight } from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';
import { useAuth } from '@/contexts/AuthContext';
import dynamic from 'next/dynamic';

const Microphone3D = dynamic(() => import('@/components/music/Microphone3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center bg-gray-900 rounded-lg">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  ),
});

export default function VoiceCapturePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [volume, setVolume] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const router = useRouter();
  const { isLoggedIn, login } = useAuth();

  useEffect(() => {
    if (waveformRef.current && !wavesurferRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#FFA500',
        progressColor: '#FF6347',
        cursorColor: '#fff',
        barWidth: 2,
        barGap: 1,
        height: 100,
        barRadius: 3,
        normalize: true,
        backend: 'WebAudio',
      });
    }

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        setIsProcessing(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);

        if (wavesurferRef.current) {
          await wavesurferRef.current.loadBlob(audioBlob);
        }
        setIsProcessing(false);
        toast({
          title: "Recording completed",
          description: "Your voice has been captured successfully!",
        });
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone.",
      });

      const progressInterval = setInterval(() => {
        setRecordingProgress((prev) => Math.min(prev + 1, 100));
      }, 100);

      setTimeout(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          stopRecording();
          clearInterval(progressInterval);
        }
      }, 30000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Error",
        description: "Could not access microphone. Please check your permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setRecordingProgress(100);
    }
  };

  const proceedToNFTCreation = () => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please connect your wallet to continue.",
        variant: "destructive",
      });
      return;
    }

    if (!audioBlob) {
      toast({
        title: "Recording required",
        description: "Please record your voice before proceeding.",
        variant: "destructive",
      });
      return;
    }

    // Store audio data in sessionStorage
    if (audioUrl) {
      sessionStorage.setItem('voiceNFTData', JSON.stringify({
        audioUrl,
        timestamp: new Date().toISOString(),
      }));
    }

    router.push('/profile/create-nft');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy to-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-3xl text-center text-cream">Voice NFT Creator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="h-[400px] rounded-lg overflow-hidden">
                <Microphone3D isRecording={isRecording} />
              </div>

              {isRecording && (
                <div className="space-y-2">
                  <Progress value={recordingProgress} className="w-full" />
                  <p className="text-center text-sm text-cream">Recording in progress...</p>
                </div>
              )}

              <div className="flex flex-col items-center space-y-6">
                <Button
                  size="lg"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`${
                    isRecording
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-yellow hover:bg-orange'
                  } text-navy font-bold py-3 px-6 rounded-full transition duration-300 w-48`}
                >
                  {isRecording ? (
                    <StopCircle className="mr-2 h-5 w-5" />
                  ) : (
                    <Mic className="mr-2 h-5 w-5" />
                  )}
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </Button>

                <div
                  ref={waveformRef}
                  className="w-full h-32 bg-gray-800/50 rounded-lg"
                ></div>

                {audioUrl && !isProcessing && (
                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = audioUrl;
                        link.download = 'voice-recording.wav';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="text-cream border-cream hover:bg-cream hover:text-navy"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download Recording
                    </Button>
                    <Button
                      onClick={proceedToNFTCreation}
                      className="bg-yellow text-navy hover:bg-orange"
                    >
                      <ArrowRight className="mr-2 h-5 w-5" />
                      Create NFT
                    </Button>
                  </div>
                )}

                {isProcessing && (
                  <div className="flex items-center text-cream">
                    <Loader2 className="animate-spin mr-2" />
                    Processing audio...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}