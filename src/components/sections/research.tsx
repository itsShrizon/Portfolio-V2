"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { FadeInSection } from "../ui/fade-in-section";
import { MovingElement } from "../navbar";

interface IResearchData {
  STATUS: string;
  COLLABORATORS: string[];
  DESCRIPTION: string;
  LINK?: string;
}

export function Research({ data }: { data: Record<string, IResearchData> }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "published":
        return "bg-green-500/20 text-green-700 dark:text-green-400";
      case "in progress":
        return "bg-blue-500/20 text-blue-700 dark:text-blue-400";
      case "completed":
        return "bg-purple-500/20 text-purple-700 dark:text-purple-400";
      case "on hold":
        return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400";
      default:
        return "bg-secondary";
    }
  };

  return (
    <FadeInSection direction="up">
      <div id="research" className={`transition-all duration-300 ${isCollapsed ? "py-4" : "py-10"}`}>
        <div className="flex items-center justify-between">
          <MovingElement
            change={() => setIsCollapsed(!isCollapsed)}
            ariaLabel="Toggle research section"
            className="flex items-center gap-2 group cursor-pointer transition-all duration-300 hover:scale-105"
          >
            <h2 className="font-medium text-primary/90 text-base group-hover:text-primary transition-colors animate-in fade-in slide-in-from-left-2 duration-500">
              research.
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
            <div className="group relative p-6 rounded-lg border border-primary/10 bg-gradient-to-br from-muted/30 to-background backdrop-blur-sm overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-purple-500/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <p className="relative z-10 text-primary/90 text-lg">
                {key}{" "}
                <span
                  className={`inline-block max-sm:mb-2 ml-2 px-2 py-1 rounded text-xs ${getStatusColor(
                    value.STATUS
                  )}`}
                >
                  {value.STATUS}
                </span>
              </p>

              {value.COLLABORATORS.length > 0 && (
                <div className="relative z-10 flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-muted-foreground text-sm">
                    Collaborators: {value.COLLABORATORS.join(", ")}
                  </span>
                </div>
              )}

              {value.LINK && (
                <p className="relative z-10 flex items-center gap-1 mt-1 text-sm">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                    href={value.LINK}
                  >
                    View Paper <ArrowUpRight size={18} />
                  </a>
                </p>
              )}

              <p className="relative z-10 mt-2 text-muted-foreground text-sm text-justify">
                {value.DESCRIPTION}
              </p>
            </div>
          </li>
        ))}
        </ul>
      </div>
    </div>
    </FadeInSection>
  );
}
