'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';

export default function StickyNavigation() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.onChange(y => {
      setIsVisible(y > 200);
    });

    return () => unsubscribe();
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full shadow-lg"
        onClick={scrollToTop}
      >
        <ChevronUp className="h-6 w-6" />
      </Button>
    </motion.div>
  );
}