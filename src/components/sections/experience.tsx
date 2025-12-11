"use client";

import { extractDomain } from "@/lib/utils";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { FadeInSection } from "../ui/fade-in-section";
import { MovingElement } from "../navbar";

interface IRole {
  POSITION: string;
  LOCATION: string;
  DURATION: string;
  DESCRIPTION: string[];
  TECH_STACK: string[];
}

interface IExperienceData {
  WEBSITE: string;
  ROLES: IRole[];
}

export function Experience({
  data,
}: {
  data: Record<string, IExperienceData>;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <FadeInSection direction="up">
      <div id="experience" className={`transition-all duration-300 ${isCollapsed ? "py-4" : "py-10"}`}>
      <div className="flex items-center justify-between">
        <MovingElement
          change={() => setIsCollapsed(!isCollapsed)}
          ariaLabel="Toggle experience section"
          className="flex items-center gap-2 group cursor-pointer transition-all duration-300 hover:scale-105"
        >
          <h2 className="font-medium text-primary/90 text-base group-hover:text-primary transition-colors animate-in fade-in slide-in-from-left-2 duration-500">
            experience.
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
        {Object.entries(data).map(([key, value]) => (
          <li key={key} className="cursor-target">
            <div className="group relative p-6 rounded-lg border border-primary/10 bg-gradient-to-br from-muted/30 to-background backdrop-blur-sm overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-purple-500/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Company Header */}
              <div className="relative z-10 mb-4">
                <p className="flex items-center text-base">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-medium"
                    href={value.WEBSITE}
                  >
                    {extractDomain(value.WEBSITE)} <ArrowUpRight size={18} />
                  </a>
                </p>
              </div>

              {/* Roles */}
              <div className="relative z-10 space-y-6">
                {value.ROLES.map((role, roleIndex) => (
                  <div key={roleIndex}>
                    <div className="flex sm:flex-row flex-col justify-between items-start">
                      <div>
                        <p className="text-primary/90 text-lg">
                          {role.POSITION}{" "}
                          <span className="inline-block bg-secondary max-sm:mb-2 ml-2 px-2 py-1 rounded text-xs">
                            {role.LOCATION}
                          </span>
                        </p>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {role.DURATION}
                      </p>
                    </div>

                    <ul className="space-y-1 mt-1 pl-3 text-muted-foreground text-sm text-justify list-disc">
                      {role.DESCRIPTION.map((desc, index) => (
                        <li key={index}>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>

                    <ul className="flex flex-wrap items-center gap-2 mt-2 pl-3">
                      {role.TECH_STACK.map((tech, index) => (
                        <li
                          key={index}
                          className="bg-muted/60 border border-primary/10 px-2 py-1 rounded text-xs"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </li>
        ))}
        </ul>
      </div>
    </div>
    </FadeInSection>
  );
}
