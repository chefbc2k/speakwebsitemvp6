'use client';

import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface ParallaxConfig {
  offset?: number;
  speed?: number;
  easing?: (x: number) => number;
}

export function useParallax({ offset = 50, speed = 0.5, easing = (x) => x }: ParallaxConfig = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset * speed], {
    ease: easing,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  // Performance optimization
  useEffect(() => {
    if (ref.current) {
      ref.current.style.willChange = 'transform';
      return () => {
        if (ref.current) {
          ref.current.style.willChange = 'auto';
        }
      };
    }
  }, []);

  return { ref, y, opacity };
}