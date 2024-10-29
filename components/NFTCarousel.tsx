'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import Link from 'next/link';

interface NFT {
  id: number;
  name: string;
  artist: string;
  image: string;
  price: string;
  endTime: string;
  category: string;
  subcategory: string;
  contractType: string;
  pricingModel: string;
}

interface NFTCarouselProps {
  nfts: NFT[];
  autoRotate?: boolean;
  interval?: number;
}

export default function NFTCarousel({ 
  nfts, 
  autoRotate = true, 
  interval = 5000 
}: NFTCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoRotate);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((current) => (current + 1) % nfts.length);
  }, [nfts.length]);

  const previousSlide = () => {
    setCurrentIndex((current) => (current - 1 + nfts.length) % nfts.length);
  };

  useEffect(() => {
    if (isPlaying && !isHovered) {
      const timer = setInterval(nextSlide, interval);
      return () => clearInterval(timer);
    }
  }, [isPlaying, isHovered, interval, nextSlide]);

  const visibleNFTs = () => {
    const items = [];
    for (let i = 0; i < 5; i++) {
      const index = (currentIndex + i) % nfts.length;
      items.push(nfts[index]);
    }
    return items;
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex space-x-4 overflow-hidden">
        {visibleNFTs().map((nft, index) => (
          <div
            key={`${nft.id}-${index}`}
            className="flex-none w-1/5"
          >
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg">{nft.name}</CardTitle>
                <p className="text-sm text-gray-500">{nft.artist}</p>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href={`/marketplace/item/${nft.id}`}>
                      <Button variant="secondary">View Details</Button>
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Category: {nft.category}</p>
                  <p className="text-sm text-gray-600">Contract: {nft.contractType}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="font-semibold">{nft.price}</span>
                <span className="text-sm text-gray-500">Ends in {nft.endTime}</span>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2"
        onClick={previousSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute bottom-4 right-4"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
    </div>
  );
}