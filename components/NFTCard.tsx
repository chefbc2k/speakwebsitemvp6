'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, ExternalLink } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';
import Link from 'next/link';

interface NFT {
  id: number;
  title: string;
  artist: string;
  image: string;
  audioUrl: string;
  price: number;
  contract: string;
  region: string;
  category: string;
}

interface NFTCardProps {
  nft: NFT;
}

export default function NFTCard({ nft }: NFTCardProps) {
  const { state: { currentTrack, isPlaying }, playTrack, togglePlay } = useAudio();
  const isCurrentTrack = currentTrack?.id === nft.id;

  const handlePlayClick = () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack({
        id: nft.id,
        title: nft.title,
        artist: nft.artist,
        audioUrl: nft.audioUrl,
        imageUrl: nft.image,
        duration: '0:00', // This will be updated when audio loads
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="group overflow-hidden">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{nft.title}</span>
            <span className="text-sm text-gray-500">{nft.category}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
            <img
              src={nft.image}
              alt={nft.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute bottom-4 right-4"
              onClick={handlePlayClick}
            >
              {isCurrentTrack && isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-sm">Artist: {nft.artist}</p>
            <p className="text-sm">Region: {nft.region}</p>
            <p className="text-sm font-mono">Contract: {nft.contract}</p>
            <div className="flex justify-between items-center">
              <span className="font-bold">{nft.price} ETH</span>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}