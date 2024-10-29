'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { MapPin, Music2 } from 'lucide-react';
import type { NFTLocation } from '@/types/marketplace';
import { Marker, Popup } from 'react-map-gl';

interface NFTMarkerProps {
  nft: NFTLocation;
  isSelected: boolean;
  onClick: () => void;
  onClose: () => void;
}

export default function NFTMarker({
  nft,
  isSelected,
  onClick,
  onClose
}: NFTMarkerProps) {
  return (
    <>
      <Marker
        latitude={nft.latitude}
        longitude={nft.longitude}
        anchor="bottom"
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-yellow hover:text-orange"
          onClick={onClick}
        >
          <MapPin className="h-6 w-6" />
        </Button>
      </Marker>

      <AnimatePresence>
        {isSelected && (
          <Popup
            latitude={nft.latitude}
            longitude={nft.longitude}
            anchor="bottom"
            onClose={onClose}
            closeButton={false}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="p-4 max-w-sm"
            >
              <img
                src={nft.image}
                alt={nft.title}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h3 className="font-semibold">{nft.title}</h3>
              <p className="text-sm text-gray-600">By {nft.artist}</p>
              <div className="mt-2 space-y-1 text-sm">
                <p><span className="font-medium">Voice Type:</span> {nft.voiceType}</p>
                <p><span className="font-medium">Language:</span> {nft.language}</p>
                <p><span className="font-medium">Style:</span> {nft.voiceStyle}</p>
                <p><span className="font-medium">Rating:</span> {nft.rating}/5</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="font-medium">{nft.price} ETH</span>
                <Button size="sm" className="flex items-center">
                  <Music2 className="h-4 w-4 mr-1" />
                  Play Sample
                </Button>
              </div>
            </motion.div>
          </Popup>
        )}
      </AnimatePresence>
    </>
  );
}