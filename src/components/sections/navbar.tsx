"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatedText, MovingElement } from "../navbar";
import useMobileDetection from "@/hooks/use-mobile";

export function Navbar() {
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMobileDetection();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    // Set theme to dark by default on mount if not already set
    if (typeof window !== 'undefined' && isMounted) {
      try {
        const currentTheme = localStorage.getItem("theme");
        if (!currentTheme) {
          setTheme("dark");
        }
      } catch (error) {
        console.error("Error initializing theme:", error);
      }
    }
  }, [setTheme, isMounted]);

  useEffect(() => {
    // Handle hash navigation on page load
    if (typeof window !== 'undefined' && window.location.hash) {
      const targetId = window.location.hash.substring(1); // Remove the # symbol
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  }, []);

  const toggleTheme = () => {
    if (!isMounted) return;
    try {
      const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
      setTheme(nextTheme);
    } catch (error) {
      console.error("Error toggling theme:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    // Check if we're on the home page
    const isHomePage = window.location.pathname === '/';
    
    if (!isHomePage) {
      // Navigate to home page with hash
      router.push(`/#${targetId}`);
    } else {
      // We're already on home page, just scroll
      setTimeout(() => {
        const element = document.getElementById(targetId);
        
        if (element) {
          const offset = 80; // Offset for navbar height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  };

  const navLinks = ["education", "experience", "projects", "research", "awards & certifications"];

  return (
    <>
      <header className="flex justify-between items-center">
        <MovingElement
          change={() => router.push("/")}
          ariaLabel="Navigate to home"
        >
          <Link href={"/"} className="font-bold text-xl tracking-tighter">
            tanzir.
          </Link>
        </MovingElement>

        <nav className="flex items-center gap-2">
          {/* Desktop Navigation */}
          {!isMobile && isMounted && (
            <>
              <ul className="flex items-center gap-2 sm:gap-0">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <AnimatedText href={`/#${link}`}>{link}</AnimatedText>
                  </li>
                ))}
              </ul>

              <MovingElement
                className="p-2 rounded-full flex items-center justify-center"
                change={toggleTheme}
                ariaLabel={`Switch to ${
                  resolvedTheme === "dark" ? "light" : "dark"
                } mode`}
              >
                {resolvedTheme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
              </MovingElement>
            </>
          )}
        </nav>
      </header>

      {/* Floating Mobile Controls */}
      {isMobile && isMounted && (
        <div className="fixed top-6 right-4 z-50 flex items-center gap-2">
          {!isMenuOpen && (
            <MovingElement
              className="p-2.5 rounded-full bg-background/80 backdrop-blur-md shadow-lg border border-border flex items-center justify-center"
              change={toggleTheme}
              ariaLabel={`Switch to ${
                resolvedTheme === "dark" ? "light" : "dark"
              } mode`}
            >
              {resolvedTheme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
            </MovingElement>
          )}
          
          <MovingElement
            className="p-2.5 rounded-full bg-background/80 backdrop-blur-md shadow-lg border border-border flex items-center justify-center"
            change={toggleMenu}
            ariaLabel="Toggle menu"
          >
            <div className="w-5 h-5 flex flex-col justify-center items-center gap-[4px]">
              <span
                className={`block h-[2px] w-full bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "rotate-45 translate-y-[6px]" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-full bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-full bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""
                }`}
              />
            </div>
          </MovingElement>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {isMobile && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
              isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={toggleMenu}
          />

          {/* Drawer */}
          <div
            className={`fixed top-0 right-0 h-full w-[280px] bg-background border-l border-border z-50 transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full p-6">
              {/* Navigation Links */}
              <ul className="flex flex-col gap-1 mb-auto pt-4">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={`/#${link}`}
                      onClick={(e) => handleLinkClick(e, link)}
                      className="block px-4 py-3 rounded-lg hover:bg-accent transition-colors capitalize text-sm"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}
