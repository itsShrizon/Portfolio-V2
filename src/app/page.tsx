"use client";

import { DATA } from "@/app/data";
import {
  AboutMe,
  Blogs,
  Contact,
  Education,
  Experience,
  Footer,
  Header,
  Navbar,
  Projects,
  Research,
  Skills,
} from "@/components/sections";
import GridPattern from "@/components/ui/grid-pattern";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { CursorTracker } from "@/components/ui/cursor-tracker";
import { ParticleBackground } from "@/components/ui/particle-background";
import useMobileDetection from "@/hooks/use-mobile";

export default function Page() {
  const checkMobile = useMobileDetection();

  return (
    <div className="mx-auto px-4 pt-6 sm:pt-12 w-full lg:w-2/3 xl:w-1/2 text-foreground min-h-screen relative">
      <ParticleBackground />
      <AnimatedBackground />
      <FloatingShapes />
      <CursorTracker />
      
      <div className="relative z-10">
        <Navbar />

        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          className="[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
        />

        <main className="px-4">
          <Header data={DATA.HEADER} />
          <AboutMe data={DATA.ABOUT_ME} />
          <Research data={DATA.RESEARCH} />
          <Experience data={DATA.EXPERIENCE} />
          <Projects data={DATA.PROJECTS} />
          <Education data={DATA.EDUCATION} />
          <Blogs data={DATA["AWARDS & CERTIFICATIONS"]} />
          <Skills data={DATA.SKILLS} />
          <Contact />
          <Footer />
        </main>
      </div>

      {/* Default cursor retained; custom target cursor removed per request */}
    </div>
  );
}
