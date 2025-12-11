"use client";

import { useEffect, useRef, useState } from "react";

interface ScrambledTextProps {
  children: string;
  className?: string;
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  style?: React.CSSProperties;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  children,
  className = "",
  radius = 1,
  duration = 1,
  speed = 0.9,
  scrambleChars = "!@#$%^&*()_+",
  style,
}) => {
  const [displayText, setDisplayText] = useState(children);
  const containerRef = useRef<HTMLDivElement>(null);
  const originalText = useRef(children);
  const scramblingIndices = useRef<Set<number>>(new Set());
  const animationFrameRefs = useRef<{ [key: number]: number }>({});
  const lastUpdateTimes = useRef<{ [key: number]: number }>({});

  useEffect(() => {
    originalText.current = children;
    setDisplayText(children);
  }, [children]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const spans = containerRef.current.querySelectorAll("span");
      
      spans.forEach((span, index) => {
        const spanRect = span.getBoundingClientRect();
        const spanCenterX = spanRect.left + spanRect.width / 2;
        const spanCenterY = spanRect.top + spanRect.height / 2;

        const distance = Math.sqrt(
          Math.pow(mouseX - spanCenterX, 2) + Math.pow(mouseY - spanCenterY, 2)
        );

        if (distance < radius) {
          if (!scramblingIndices.current.has(index)) {
            scramblingIndices.current.add(index);
            startScramble(index);
          }
        } else {
          if (scramblingIndices.current.has(index)) {
            scramblingIndices.current.delete(index);
            stopScramble(index);
          }
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      Object.values(animationFrameRefs.current).forEach(cancelAnimationFrame);
    };
  }, [radius]);

  const startScramble = (index: number) => {
    const animate = (time: number) => {
      if (!scramblingIndices.current.has(index)) return;

      // Adjust speed factor as needed. 
      // If speed is 0.6, let's say we update every 60ms?
      const interval = speed * 100; 

      if (!lastUpdateTimes.current[index] || time - lastUpdateTimes.current[index] > interval) {
        setDisplayText((prev) => {
          const chars = prev.split("");
          chars[index] = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          return chars.join("");
        });
        lastUpdateTimes.current[index] = time;
      }

      animationFrameRefs.current[index] = requestAnimationFrame(animate);
    };

    animationFrameRefs.current[index] = requestAnimationFrame(animate);
  };

  const stopScramble = (index: number) => {
    cancelAnimationFrame(animationFrameRefs.current[index]);
    setDisplayText((prev) => {
      const chars = prev.split("");
      chars[index] = originalText.current[index];
      return chars.join("");
    });
  };

  return (
    <div ref={containerRef} className={className} style={style}>
      {displayText.split("").map((char, index) => (
        <span key={index} className="inline-block whitespace-pre">
          {char}
        </span>
      ))}
    </div>
  );
};

export default ScrambledText;
