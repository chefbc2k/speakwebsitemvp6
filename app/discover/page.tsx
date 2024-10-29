'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useParallax } from '@/hooks/useParallax';
import LazyImage from '@/components/LazyImage';
import ScrollProgress from '@/components/ScrollProgress';
import SearchFilters from '@/components/SearchFilters';
import MusicPlayer from '@/components/MusicPlayer';
import NFTCard from '@/components/NFTCard';
import { Card } from '@/components/ui/card';

// Sample data for different NFT categories
const musicNFTs = [
  {
    id: 1,
    title: "Cosmic Voyage",
    artist: "SoundMaster",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    price: 0.5,
    contract: "0x1234...5678",
    region: "North America",
    category: "Music"
  },
  // Add more music NFTs...
];

const trendingCollections = [
  {
    id: 1,
    title: "Voice of Nature",
    artist: "EcoSound",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    price: 0.7,
    contract: "0x9876...4321",
    region: "Europe",
    category: "Nature Sounds"
  },
  // Add more trending collections...
];

export default function DiscoverPage() {
  const { ref: headerRef, y: headerY } = useParallax({ offset: 100 });
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const [filteredNFTs, setFilteredNFTs] = useState(musicNFTs);

  const handleFilterChange = (filters: any) => {
    // Implement filtering logic
    console.log('Filters applied:', filters);
  };

  return (
    <div className="min-h-screen">
      <ScrollProgress />
      
      {/* Hero Section with Parallax */}
      <motion.section
        ref={headerRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ y: headerY }}
      >
        <motion.div
          className="absolute inset-0 z-0"
          style={{ opacity }}
        >
          <LazyImage
            src="https://images.unsplash.com/photo-1520692852662-6be74c2d1ab4"
            alt="Discover Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/60" />
        </motion.div>
        
        <div className="container relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-cream mb-6"
          >
            Discover Voice NFTs
          </motion.h1>
        </div>
      </motion.section>

      {/* Search and Filters Section */}
      <section className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <SearchFilters onFilterChange={handleFilterChange} />
        </div>
      </section>

      {/* Music NFTs Section */}
      <motion.section
        className="relative py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Music NFTs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {musicNFTs.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Trending Collections Section */}
      <motion.section
        className="relative py-20 bg-navy/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Trending Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingCollections.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Fixed Music Player */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <MusicPlayer />
      </div>
    </div>
  );
}