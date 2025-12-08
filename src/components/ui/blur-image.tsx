"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";

interface BlurImageProps {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function BlurImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: BlurImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent animate-shimmer" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`${className} transition-all duration-500 ${
          isLoading ? "blur-lg scale-105 opacity-0" : "blur-0 scale-100 opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
