import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractDomain(url: string): string {
  try {
    if (!url || url.trim() === "") {
      return "Company Website";
    }
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, "");
  } catch {
    // If URL is invalid, return the original string or a fallback
    return url || "Company Website";
  }
}
