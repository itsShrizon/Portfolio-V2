"use client";

import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

export function CursorTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Smooth spring animation for the numbers
  const { x, y } = useSpring({
    x: position.x,
    y: position.y,
    config: { tension: 280, friction: 60 },
  });

  // Fade in animation
  const fadeIn = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(20px)',
    config: { tension: 280, friction: 60 },
  });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <animated.div
      style={fadeIn}
      className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
    >
      <div className="relative">
        {/* Main container with retro terminal style */}
        <div className="relative bg-background/95 border border-primary/30 rounded-none p-4 font-mono shadow-lg">
          {/* Header with retro style */}
          <div className="mb-3 pb-2 border-b border-primary/20">
            <div className="text-xs text-primary/70 tracking-widest uppercase">
              SCORE&lt;1&gt;
            </div>
          </div>

          {/* Coordinates display */}
          <div className="space-y-1">
            <animated.div className="text-base text-primary/90 tabular-nums tracking-wider">
              {x.to((val) => Math.round(val).toString().padStart(4, "0"))}
            </animated.div>
            <animated.div className="text-base text-primary/90 tabular-nums tracking-wider">
              {y.to((val) => Math.round(val).toString().padStart(4, "0"))}
            </animated.div>
          </div>
        </div>
      </div>
    </animated.div>
  );
}
