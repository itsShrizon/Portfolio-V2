"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import { StaticImageData } from "next/image";
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { FadeInSection } from "../ui/fade-in-section";
import { MovingElement } from "../navbar";
import { ProjectsModal } from "../ui/projects-modal";

interface IProjectData {
  ID: string;
  TITLE: string;
  DESCRIPTION: string;
  LONG_DESCRIPTION: string;
  FEATURES: string[];
  TECHNOLOGIES: string[];
  CATEGORY: string;
  IMAGE: StaticImageData;
  GITHUB?: string;
  DEMO?: string;
  FEATURED: boolean;
}

export function Projects({ data }: { data: IProjectData[] }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showAll, setShowAll] = useState(false);

  return (
    <FadeInSection direction="up">
      <div id="projects" className={`transition-all duration-300 ${isCollapsed ? "py-4" : "py-10"}`}>
        <div className="flex items-center justify-between">
          <MovingElement
            change={() => setIsCollapsed(!isCollapsed)}
            ariaLabel="Toggle projects section"
            className="flex items-center gap-2 group cursor-pointer transition-all duration-300 hover:scale-105"
          >
            <h2 className="font-medium text-primary/90 text-base group-hover:text-primary transition-colors animate-in fade-in slide-in-from-left-2 duration-500">
              projects.
            </h2>
          </MovingElement>
          <ChevronDown
            className={`w-4 h-4 text-primary/70 transition-transform duration-300 cursor-pointer ${isCollapsed ? "-rotate-180" : ""}`}
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isCollapsed ? "max-h-0 opacity-0" : "max-h-[10000px] opacity-100"
          }`}
        >
          <ul className="flex flex-col gap-12 mt-4 font-normal text-primary/90 text-base">
          {data
            .filter((project) => project.FEATURED)
            .map((value) => (
              <ProjectCard key={value.ID} project={value} />
            ))}
          </ul>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex justify-center items-center bg-gradient-to-r from-blue-500/10 to-purple-600/10 hover:from-blue-500/20 hover:to-purple-600/20 disabled:opacity-50 shadow-sm hover:shadow-md px-6 py-2 border border-primary/20 hover:border-primary/40 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 h-10 font-medium text-primary/90 text-sm whitespace-nowrap transition-all duration-300 transform hover:scale-105 cursor-pointer disabled:pointer-events-none"
            >
              View all projects
            </button>
          </div>
        </div>
      </div>

      <ProjectsModal isOpen={showAll} onClose={() => setShowAll(false)} data={data} />
    </FadeInSection>
  );
}

function ProjectCard({ project }: { project: IProjectData }) {
  const [{ scale, boxShadow }, api] = useSpring(() => ({
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
    config: { mass: 1, tension: 170, friction: 26 },
  }));

  const handleMouseMove = () => {
    api.start({
      scale: 1.02,
      boxShadow: '0px 20px 50px rgba(59, 130, 246, 0.3)',
    });
  };

  const handleMouseLeave = () => {
    api.start({
      scale: 1,
      boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
    });
  };

  return (
    <animated.li
      className="cursor-target"
      style={{
        scale,
        boxShadow,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative p-6 rounded-lg border border-primary/10 bg-gradient-to-br from-muted/30 to-background backdrop-blur-sm overflow-hidden group">
        {/* Animated border gradient */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-purple-500/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-primary/90 text-lg font-semibold mb-1 bg-gradient-to-r from-primary via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {project.TITLE}
              </h3>

              <p className="flex items-center gap-3 text-sm">
                {project.DEMO && (
                  <a
                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                    href={project.DEMO}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    live preview <ArrowUpRight size={16} />
                  </a>
                )}
                {project.GITHUB && (
                  <a
                    className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors"
                    href={project.GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.GITHUB.includes('youtube.com') || project.GITHUB.includes('youtu.be') 
                      ? 'video' 
                      : 'github'} <ArrowUpRight size={16} />
                  </a>
                )}
              </p>
            </div>
          </div>

          <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
            {project.DESCRIPTION}
          </p>

          <ul className="space-y-1.5 mt-3 pl-4 text-muted-foreground text-sm list-disc">
            {project.FEATURES.map((feature, idx) => (
              <li key={idx} className="leading-relaxed">
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-2 mt-4">
            {project.TECHNOLOGIES.slice(0, 6).map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-primary/20 text-primary/80 hover:border-primary/40 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </animated.li>
  );
}
