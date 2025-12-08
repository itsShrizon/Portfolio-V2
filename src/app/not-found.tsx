"use client";

import { MovingElement } from "@/components/navbar";
import GridPattern from "@/components/ui/grid-pattern";
import { ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-background px-4">
      {/* Background Grid Pattern */}
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        className="[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
      />

      <div className="relative z-10 text-center space-y-6 max-w-2xl">
        {/* 404 Number with Gradient */}
        <div className="relative">
          <h1 className="text-[120px] md:text-[180px] font-bold tracking-tighter leading-none bg-gradient-to-br from-primary to-primary/40 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl opacity-20 bg-primary/50 -z-10"></div>
        </div>

        {/* Error Message */}
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto">
            Oops! The page you&apos;re looking for seems to have wandered off into the digital void.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <MovingElement
            change={() => router.back()}
            ariaLabel="Go back to previous page"
          >
            <div className="flex items-center gap-2 px-6 py-3 bg-muted hover:bg-muted/80 rounded-md transition-colors duration-200 font-medium cursor-pointer">
              <ArrowLeft size={20} />
              Go Back
            </div>
          </MovingElement>

          <MovingElement
            change={() => router.push("/")}
            ariaLabel="Navigate to home"
          >
            <div className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors duration-200 font-medium cursor-pointer">
              <Home size={20} />
              Go to Home
            </div>
          </MovingElement>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>
    </div>
  );
}
