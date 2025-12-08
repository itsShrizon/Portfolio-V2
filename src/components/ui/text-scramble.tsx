"use client";

import { useEffect, useState, useRef } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number;
  scrambleSpeed?: number;
}

export function TextScramble({ 
  text, 
  className = "",
  speed = 90,
  scrambleSpeed = 120 
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const frameRef = useRef<number>(0);
  const scrambleRef = useRef<NodeJS.Timeout | null>(null);

  // Characters to use for scrambling effect
  const chars = "_-+*/=!?<>@#$%^&";

  useEffect(() => {
    if (currentIndex >= text.length) return;

    const char = text[currentIndex];
    
    // Skip scrambling for spaces
    if (char === " ") {
      setDisplayText((prev) => prev + " ");
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }

    // Scramble effect before revealing the actual character
    let scrambleCount = 0;
    const maxScrambles = 5;

    scrambleRef.current = setInterval(() => {
      if (scrambleCount < maxScrambles) {
        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        setDisplayText((prev) => {
          const baseText = prev.slice(0, currentIndex);
          return baseText + randomChar;
        });
        scrambleCount++;
      } else {
        if (scrambleRef.current) {
          clearInterval(scrambleRef.current);
        }
        // Reveal the actual character
        setDisplayText((prev) => {
          const baseText = prev.slice(0, currentIndex);
          return baseText + char;
        });
        // Move to next character
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
        }, speed);
      }
    }, scrambleSpeed);

    return () => {
      if (scrambleRef.current) {
        clearInterval(scrambleRef.current);
      }
    };
  }, [currentIndex, text, speed, scrambleSpeed, chars]);

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && (
        <span className="animate-pulse opacity-75">|</span>
      )}
    </span>
  );
}
