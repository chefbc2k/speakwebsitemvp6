'use client';

import { useState, useEffect, useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion';
import HeroSection from '@/components/sections/HeroSection';
import FeatureSection from '@/components/sections/FeatureSection';
import ExploreSection from '@/components/sections/ExploreSection';
import NavigationSection from '@/components/sections/NavigationSection';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const heroY = useTransform(scrollY, [0, 300], [0, 100]);

  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen" ref={containerRef}>
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80)',
          filter: 'brightness(0.3)'
        }}
      />

      {/* Main Sections */}
      <HeroSection
        opacity={heroOpacity}
        scale={heroScale}
        y={heroY}
        isVisible={isVisible}
      />
      <NavigationSection />
      <FeatureSection />
      <ExploreSection />

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-6 h-10 border-2 border-cream rounded-full flex justify-center"
        >
          <motion.div
            className="w-1 h-2 bg-cream rounded-full mt-2"
          />
        </motion.div>
      </div>
    </main>
  );
}