"use client";

import { useEffect, useRef } from 'react';

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export function FadeInSection({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = '' 
}: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  const directionClasses = {
    up: 'fade-in-up',
    down: 'fade-in-down',
    left: 'fade-in-left',
    right: 'fade-in-right',
  };

  return (
    <div 
      ref={ref} 
      className={`opacity-0 ${directionClasses[direction]} ${className}`}
    >
      {children}
    </div>
  );
}
