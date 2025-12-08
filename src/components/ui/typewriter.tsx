"use client";

import { useEffect, useState } from 'react';

interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  loop?: boolean;
}

export function Typewriter({ text, delay = 0, speed = 50, className = '', loop = true }: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!loop && currentIndex === text.length && !isDeleting) {
      return;
    }

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentIndex < text.length) {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        } else if (loop) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentIndex > 0) {
          setDisplayText(prev => prev.slice(0, -1));
          setCurrentIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
        }
      }
    }, currentIndex === 0 && !isDeleting ? delay : isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, speed, text, isDeleting, loop]);

  return <span className={className}>{displayText}<span className="animate-pulse">|</span></span>;
}
