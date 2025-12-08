"use client";

import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

interface AnimatedAgeProps {
  finalAge: number;
}

export function AnimatedAge({ finalAge }: AnimatedAgeProps) {
  const [displayAge, setDisplayAge] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  useSpring({
    from: { number: 100 },
    to: { number: hasAnimated ? finalAge : finalAge - 1 },
    config: { 
      tension: 120, 
      friction: 40,
      duration: hasAnimated ? undefined : 1500 
    },
    onChange: ({ value }) => {
      setDisplayAge(Math.floor(value.number));
    },
  });

  // Glitch effect styling
  const glitchSpring = useSpring({
    from: { opacity: 1, scale: 1 },
    to: isGlitching 
      ? [
          { opacity: 0.7, scale: 1.15 },
          { opacity: 1, scale: 1.05 },
          { opacity: 0.8, scale: 1.1 },
          { opacity: 1, scale: 1 },
        ]
      : { opacity: 1, scale: 1 },
    config: { duration: 100 },
  });

  useEffect(() => {
    if (!hasAnimated) {
      const fallTimer = setTimeout(() => {
        // Trigger glitch effect
        setIsGlitching(true);
        
        // Snap to final age after glitch starts
        setTimeout(() => {
          setHasAnimated(true);
          setDisplayAge(finalAge);
          
          // End glitch effect
          setTimeout(() => {
            setIsGlitching(false);
          }, 400);
        }, 50);
      }, 1600);

      return () => clearTimeout(fallTimer);
    }
  }, [hasAnimated, finalAge]);

  return (
    <animated.span 
      className={`inline-block tabular-nums font-bold text-lg relative ${
        isGlitching ? 'animate-pulse' : ''
      }`}
      style={{
        ...glitchSpring,
        textShadow: isGlitching 
          ? '0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(147, 51, 234, 0.6)' 
          : 'none',
        color: isGlitching 
          ? 'rgb(96, 165, 250)' 
          : 'inherit',
        transition: 'color 0.3s ease',
      }}
    >
      {displayAge !== null ? displayAge : finalAge}
      
      {/* Glitch overlay effect */}
      {isGlitching && (
        <span 
          className="absolute inset-0 text-blue-400 opacity-50 blur-sm"
          style={{ transform: 'translate(2px, -2px)' }}
        >
          {displayAge !== null ? displayAge : finalAge}
        </span>
      )}
    </animated.span>
  );
}
