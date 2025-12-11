'use client';

import React, { useRef, useEffect, useState } from 'react';

interface ScrambledTextProps {
  children: string;
  className?: string;
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  style?: React.CSSProperties;
}

export const ScrambledText: React.FC<ScrambledTextProps> = ({
  children,
  className = '',
  radius = 100,
  duration = 1,
  speed = 0.6,
  scrambleChars = '!@#$%^&*()_+',
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const originalChars = useRef<string[]>([]);
  const runningAnimations = useRef<Map<number, NodeJS.Timeout>>(new Map());

  useEffect(() => {
    // Initialize refs and original chars
    if (containerRef.current) {
      const spans = containerRef.current.querySelectorAll('span');
      refs.current = Array.from(spans);
      originalChars.current = Array.from(spans).map((span) => span.textContent || '');
      
      // Lock widths to prevent layout shift during scrambling
      spans.forEach(span => {
        const width = span.getBoundingClientRect().width;
        if (width > 0) {
            span.style.width = `${width}px`;
        }
      });
    }
  }, [children]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      refs.current.forEach((span, index) => {
        if (!span) return;

        const rect = span.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < radius) {
          // Start scrambling if not already
          if (!runningAnimations.current.has(index)) {
            startScramble(index);
          }
        } else {
          // Stop scrambling and restore if running
          if (runningAnimations.current.has(index)) {
            stopScramble(index);
          }
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      // Cleanup all animations
      runningAnimations.current.forEach((interval) => clearInterval(interval));
      runningAnimations.current.clear();
    };
  }, [radius, duration, speed, scrambleChars]);

  const startScramble = (index: number) => {
    const span = refs.current[index];
    if (!span) return;

    // Clear existing if any (safety)
    if (runningAnimations.current.has(index)) {
      clearInterval(runningAnimations.current.get(index)!);
    }

    let elapsed = 0;
    const intervalTime = speed * 100; // Map speed to interval roughly

    const interval = setInterval(() => {
      elapsed += intervalTime / 1000;
      
      if (elapsed >= duration) {
        // Finished duration, restore
        stopScramble(index);
        return;
      }

      // Scramble
      const randomChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      span.textContent = randomChar;
      
    }, intervalTime);

    runningAnimations.current.set(index, interval);
  };

  const stopScramble = (index: number) => {
    const span = refs.current[index];
    if (!span) return;

    // Clear interval
    if (runningAnimations.current.has(index)) {
      clearInterval(runningAnimations.current.get(index)!);
      runningAnimations.current.delete(index);
    }

    // Restore original text
    span.textContent = originalChars.current[index];
  };

  return (
    <div 
      ref={containerRef} 
      className={className} 
      style={style}
    >
      {children.split('').map((char, index) => (
        <span 
          key={index} 
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

export default ScrambledText;
