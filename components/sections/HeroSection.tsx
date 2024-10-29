'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mic, Music2 } from 'lucide-react';
import Link from 'next/link';

interface HeroSectionProps {
  opacity: any;
  scale: any;
  y: any;
  isVisible: boolean;
}

export default function HeroSection({ opacity, scale, y, isVisible }: HeroSectionProps) {
  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center text-center px-4 snap-start"
      style={{ opacity, scale, y }}
    >
      <div className="container mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-cream mb-6">
            Transform Your Voice into Digital Art
          </h1>
          <p className="text-xl md:text-2xl text-orange mb-12 max-w-2xl mx-auto">
            Create, collect, and trade unique voice NFTs in a revolutionary marketplace.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/voice-capture">
              <Button size="lg" className="bg-yellow text-navy hover:bg-orange hover:text-cream w-full md:w-auto">
                <Mic className="mr-2 h-5 w-5" />
                Start Recording
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button size="lg" variant="outline" className="text-cream border-cream hover:bg-cream hover:text-navy w-full md:w-auto">
                <Music2 className="mr-2 h-5 w-5" />
                Browse Marketplace
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}