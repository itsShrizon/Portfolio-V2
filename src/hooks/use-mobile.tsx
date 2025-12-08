import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export default function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Return false during SSR to avoid hydration mismatch
  return isClient ? isMobile : false;
}
