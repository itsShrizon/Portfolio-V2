"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { FadeInSection } from "../ui/fade-in-section";

export function Skills({ data }: { data: Record<string, string[]> }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <FadeInSection direction="up">
      <div id="skills" className={`transition-all duration-300 ${isCollapsed ? "py-4" : "py-10"}`}>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-2 group cursor-pointer w-full text-left"
        >
          <h2 className="font-medium text-primary/90 text-base group-hover:text-primary transition-colors animate-in fade-in slide-in-from-left-2 duration-500">
            technical skills.
          </h2>
          <ChevronDown
            className={`w-4 h-4 text-primary/70 transition-transform duration-300 ${isCollapsed ? "-rotate-180" : ""}`}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isCollapsed ? "max-h-0 opacity-0" : "max-h-[10000px] opacity-100"
          }`}
        >
          <div className="flex flex-col gap-4 mt-6">
            {Object.entries(data).map(([category, skills], categoryIndex) => (
              <div 
                key={category} 
                className="group"
                style={{ animationDelay: `${categoryIndex * 100}ms` }}
              >
                <h3 className="font-semibold text-primary/90 text-sm mb-3 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></span>
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, skillIndex) => (
                    <SkillBadge 
                      key={skill} 
                      skill={skill} 
                      delay={categoryIndex * 100 + skillIndex * 50}
                      isHovered={hoveredSkill === skill}
                      onHover={() => setHoveredSkill(skill)}
                      onLeave={() => setHoveredSkill(null)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

function SkillBadge({ 
  skill, 
  delay, 
  onHover, 
  onLeave 
}: { 
  skill: string; 
  delay: number;
  isHovered?: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const [{ scale, rotateY }, api] = useSpring(() => ({
    scale: 1,
    rotateY: 0,
    config: { tension: 300, friction: 10 },
  }));

  return (
    <animated.div
      className="relative group/skill"
      style={{
        scale,
        transform: rotateY.to(r => `perspective(600px) rotateY(${r}deg)`),
        animationDelay: `${delay}ms`,
      }}
      onMouseEnter={() => {
        onHover();
        api.start({ scale: 1.1, rotateY: 5 });
      }}
      onMouseLeave={() => {
        onLeave();
        api.start({ scale: 1, rotateY: 0 });
      }}
    >
      <div className="relative px-4 py-2 rounded-lg bg-gradient-to-br from-muted/80 to-muted/40 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md">
        <span className="text-sm font-medium text-primary/90 relative z-10">
          {skill}
        </span>
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300" />
      </div>
    </animated.div>
  );
}
