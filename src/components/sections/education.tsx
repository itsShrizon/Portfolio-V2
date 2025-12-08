"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FadeInSection } from "../ui/fade-in-section";
import { MovingElement } from "../navbar";

interface IEducationData {
  DEGREE: string;
  LOCATION: string;
  DURATION: string;
  GRADE: string;
  ACHIEVEMENTS: string[];
  EXTRA_CURRICULARS?: string[];
}

export function Education({ data }: { data: Record<string, IEducationData> }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <FadeInSection direction="up">
      <div id="education" className={`transition-all duration-300 ${isCollapsed ? "py-4" : "py-10"}`}>
        <div className="flex items-center justify-between">
          <MovingElement
            change={() => setIsCollapsed(!isCollapsed)}
            ariaLabel="Toggle education section"
            className="flex items-center gap-2 group cursor-pointer transition-all duration-300 hover:scale-105"
          >
            <h2 className="font-medium text-primary/90 text-base group-hover:text-primary transition-colors animate-in fade-in slide-in-from-left-2 duration-500">
              education.
            </h2>
          </MovingElement>
          <ChevronDown
            className={`w-4 h-4 text-primary/70 transition-transform duration-300 cursor-pointer ${isCollapsed ? "-rotate-180" : ""}`}
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        </div>      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isCollapsed ? "max-h-0 opacity-0" : "max-h-[10000px] opacity-100"
        }`}
      >
        <ul className="flex flex-col gap-12 mt-4 font-normal text-primary/90 text-base">
        {Object.entries(data).map(([key, value]) => (
          <li key={key} className="cursor-target">
            <div className="pl-4 border-muted-foreground hover:border-primary border-l size-full transition-all duration-300">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-primary/90 text-lg">{key}</p>
                  <p className="text-primary/80 text-sm">{value.DEGREE}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground text-sm">
                    {value.DURATION}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {value.LOCATION}
                  </p>
                </div>
              </div>

              <div className="mt-2">
                <span className="inline-block bg-secondary px-2 py-1 rounded text-xs">
                  {value.GRADE}
                </span>
              </div>

              {value.ACHIEVEMENTS.length > 0 && (
                <div className="mt-3">
                  <p className="font-medium text-primary/90 text-sm">
                    Achievements:
                  </p>
                  <ul className="space-y-1 mt-1 text-muted-foreground text-sm">
                    {value.ACHIEVEMENTS.map((achievement, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-primary/50">★</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {value.EXTRA_CURRICULARS && value.EXTRA_CURRICULARS.length > 0 && (
                <div className="mt-3">
                  <p className="font-medium text-primary/90 text-sm">
                    Extra Curriculars:
                  </p>
                  <ul className="space-y-1 mt-1 text-muted-foreground text-sm">
                    {value.EXTRA_CURRICULARS.map((activity, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-primary/50">•</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
        ))}
        </ul>
      </div>
    </div>
    </FadeInSection>
  );
}
