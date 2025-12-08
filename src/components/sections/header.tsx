"use client";

import { useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { MovingElement } from "../navbar";
import { Typewriter } from "../ui/typewriter";
import { AnimatedAge } from "../ui/animated-age";
import { TextScramble } from "../ui/text-scramble";
import { CalendlyModal } from "../ui/calendly-modal";
import { useSpring, animated } from "@react-spring/web";

interface HeaderData {
  NAME: string;
  AGE: number;
  PRONOUN: string;
  HEADLINE: string;
  RESUME: string;
  EMAIL: string;
  GITHUB: string;
  LINKEDIN: string;
  PHONE: string;
  PHONE_ALT: string;
  ADDRESS: string;
}

export function Header({ data }: { data: HeaderData }) {
  const bookingUrl = `https://calendly.com/mailme-tanzir/30min`;
  const [showCalendly, setShowCalendly] = useState(false);
  
  const handleChange = (url: string) => {
    window.open(url, "_blank");
  };

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 60 },
  });

  const nameAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(-50px)' },
    to: { opacity: 1, transform: 'translateX(0px)' },
    delay: 200,
    config: { tension: 280, friction: 60 },
  });

  return (
    <section className="pt-12 relative">
      <animated.div style={fadeIn} className="space-y-2">
        <p className="font-normal text-muted-foreground text-base">
          hi there👋, I&apos;m
        </p>

        <div>
          <animated.h1 style={nameAnimation} className="font-bold text-primary text-4xl tracking-tight">
            <TextScramble 
              text={data.NAME}
              speed={50}
              scrambleSpeed={30}
            />
          </animated.h1>
          <h2 className="flex flex-col gap-0 font-normal text-primary/90 text-base mt-2">
            <p>
              <AnimatedAge finalAge={Number(data.AGE)} />, {data.PRONOUN}
            </p>
            <div className="text-lg font-medium">
              <Typewriter text={data.HEADLINE} delay={800} speed={50} />
            </div>
          </h2>
        </div>

        <div className="flex items-center gap-2 text-sm mt-4">
          <MovingElement
            className="inline-flex justify-center items-center bg-primary hover:bg-primary/90 disabled:opacity-50 shadow-sm hover:shadow-md px-4 py-2 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 font-medium text-primary-foreground text-sm whitespace-nowrap transition-all duration-300 disabled:pointer-events-none"
            change={() => handleChange(data.RESUME)}
            toChange={false}
            ariaLabel="Resume"
          >
            Resume
          </MovingElement>
          <MovingElement
            className="inline-flex justify-center items-center bg-secondary hover:bg-secondary/80 disabled:opacity-50 shadow-sm hover:shadow-md border border-input px-4 py-2 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 font-medium text-secondary-foreground text-sm whitespace-nowrap transition-all duration-300 disabled:pointer-events-none"
            change={() => setShowCalendly(true)}
            toChange={false}
            ariaLabel="Book Meeting"
          >
            Book Meeting
          </MovingElement>
          <div className="flex gap-2">
            <MovingElement
              change={() => handleChange(data.EMAIL)}
              ariaLabel="Email"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <Mail />
            </MovingElement>
            <MovingElement
              change={() => handleChange(data.GITHUB)}
              ariaLabel="Github"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <Github />
            </MovingElement>
            <MovingElement
              change={() => handleChange(data.LINKEDIN)}
              ariaLabel="Linkedin"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <Linkedin />
            </MovingElement>
          </div>
        </div>
      </animated.div>

      <CalendlyModal
        open={showCalendly}
        onClose={() => setShowCalendly(false)}
        url={bookingUrl}
      />
    </section>
  );
}
