'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarketplaceMap from '@/components/MarketplaceMap';
import NFTCarousel from '@/components/NFTCarousel';
import { Globe, Grid, MapPin } from 'lucide-react';

const nftData = [
  {
    id: 1,
    name: "Cosmic Voyage",
    artist: "Artist1",
    image: "https://picsum.photos/seed/1/400/400",
    price: "0.5 ETH",
    endTime: "24h",
    category: "Entertainment & Media",
    subcategory: "Animation",
    contractType: "Royalty",
    pricingModel: "Dynamic"
  },
  // ... rest of the NFT data
];

export default function Marketplace() {
  const [view, setView] = useState<'grid' | 'map'>('grid');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">NFT Marketplace</h1>
          <div className="flex space-x-2">
            <Button
              variant={view === 'grid' ? 'default' : 'outline'}
              onClick={() => setView('grid')}
            >
              <Grid className="h-4 w-4 mr-2" />
              Grid View
            </Button>
            <Button
              variant={view === 'map' ? 'default' : 'outline'}
              onClick={() => setView('map')}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Map View
            </Button>
          </div>
        </div>

        {/* Featured NFTs Carousel */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Featured NFTs</h2>
          <NFTCarousel nfts={nftData} />
        </motion.section>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {view === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Grid view content */}
            </div>
          ) : (
            <div className="h-[800px] rounded-lg overflow-hidden">
              <MarketplaceMap />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}