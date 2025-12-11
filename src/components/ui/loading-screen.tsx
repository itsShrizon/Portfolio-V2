"use client";

import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const minLoadTime = 400;
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);
      
      setTimeout(() => setIsLoading(false), remainingTime);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      
      // Fallback timeout
      const timeout = setTimeout(handleLoad, 5000);
      
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(timeout);
      };
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-1000">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative flex flex-col items-center gap-8">
        {/* Logo/Name with animation */}
        <div className="relative">
          <h1 className="font-bold text-4xl md:text-5xl tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-700">
            tanzir.
          </h1>
          <div className="absolute -bottom-2 left-0 h-[2px] bg-primary animate-[shimmer_2s_ease-in-out_infinite]" 
               style={{ width: "100%" }}></div>
        </div>

        {/* Loading dots */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
          </div>
        </div>

        {/* Loading text */}
        <p className="text-muted-foreground text-sm animate-pulse">
          Loading portfolio...
        </p>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          50% {
            transform: translateX(100%);
            opacity: 1;
          }
          75% {
            opacity: 1;
          }
          100% {
            transform: translateX(-100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
