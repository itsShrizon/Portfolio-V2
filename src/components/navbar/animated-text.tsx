import { motion } from "framer-motion";
import type React from "react";

const DURATION = 0.15;
const STAGGER = 0.020;

interface AnimatedTextProps {
  children: string;
  href: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  href,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = href.replace("/#", "");
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
  };

  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      onClick={handleClick}
      className="relative flex items-center w-fit leading-none rounded-lg px-2 py-2 text-base text-primary/90 whitespace-nowrap"
    >
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-accent"
        variants={{
          initial: { width: "0%" },
          hovered: { width: "100%" },
        }}
        transition={{ duration: DURATION, ease: "easeInOut" }}
      />

      <span className="relative inline-block cursor-pointer">
        {children.split("").map((l, i) => (
          <span key={i} className="relative inline-block overflow-hidden">
            <motion.span
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: i * STAGGER,
              }}
              className="block"
            >
              {l}
            </motion.span>
            <motion.span
              variants={{
                initial: { y: "100%" },
                hovered: { y: "0%" },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: i * STAGGER,
              }}
              className="block absolute left-0 top-0"
            >
              {l}
            </motion.span>
          </span>
        ))}
      </span>
    </motion.a>
  );
};
