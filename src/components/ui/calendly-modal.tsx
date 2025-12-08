"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface CalendlyModalProps {
  open: boolean;
  onClose: () => void;
  url: string;
}

export function CalendlyModal({ open, onClose, url }: CalendlyModalProps) {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [shouldHydrate, setShouldHydrate] = useState(false);

  type IdleWindow = Window & {
    requestIdleCallback?: (cb: IdleRequestCallback, options?: IdleRequestOptions) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

  // Delay hydration until after page load + idle to avoid impacting initial render
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hydrate = () => {
      const host = window.location.hostname;
      const params = new URLSearchParams({
        embed_domain: host,
        embed_type: "Inline",
      });
      setEmbedUrl(`${url}?${params.toString()}`);
      setShouldHydrate(true);
    };

    // Preconnect to Calendly CDN to warm DNS/TLS
    const head = document.head;
    const preconnects = [
      "https://calendly.com",
      "https://assets.calendly.com",
    ];
    preconnects.forEach((href) => {
      if (head.querySelector(`link[data-preconnect='${href}']`)) return;
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = href;
      link.setAttribute("data-preconnect", href);
      head.appendChild(link);
    });

    // Hydrate quickly after mount (150ms) and again on idle if available
    const t = window.setTimeout(hydrate, 150);
    const idle = (window as IdleWindow).requestIdleCallback
      ? (window as IdleWindow).requestIdleCallback!(hydrate, { timeout: 800 })
      : null;

    return () => {
      window.clearTimeout(t);
      if (idle && (window as IdleWindow).cancelIdleCallback) {
        (window as IdleWindow).cancelIdleCallback!(idle);
      }
    };
  }, [url]);

  // Ensure immediate hydrate on demand if user opens before idle timer
  useEffect(() => {
    if (open && !shouldHydrate) {
      const host = window.location.hostname;
      const params = new URLSearchParams({
        embed_domain: host,
        embed_type: "Inline",
      });
      setEmbedUrl(`${url}?${params.toString()}`);
      setShouldHydrate(true);
    }
  }, [open, shouldHydrate, url]);

  const preload = shouldHydrate && embedUrl && !open;

  if (!open && !preload) return null;

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 cursor-none">
          <div className="relative w-full max-w-5xl h-[80vh] bg-background/80 backdrop-blur-xl border border-primary/10 shadow-2xl rounded-xl overflow-hidden">
            <button
              onClick={onClose}
              aria-label="Close scheduler"
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow hover:bg-primary/90 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {embedUrl ? (
              <iframe
                src={embedUrl}
                className="w-full h-full bg-transparent"
                loading="eager"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-primary/80 text-sm">
                Loading scheduler…
              </div>
            )}
          </div>
        </div>
      )}

      {preload && (
        <div className="absolute -left-[9999px] -top-[9999px] w-px h-px overflow-hidden pointer-events-none opacity-0">
          <iframe src={embedUrl!} title="calendly-preload" loading="lazy" />
        </div>
      )}
    </>
  );
}
