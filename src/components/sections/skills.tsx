"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { MovingElement } from "../navbar";
import { FadeInSection } from "../ui/fade-in-section";

export function Skills({ data }: { data: Record<string, string[]> }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <FadeInSection direction="up">
      <div id="skills" className={`transition-all duration-300 ${isCollapsed ? "py-4" : "py-10"}`}>
        <div className="flex items-center justify-between">
          <MovingElement
            change={() => setIsCollapsed(!isCollapsed)}
            ariaLabel="Toggle technical skills section"
            className="flex items-center gap-2 group cursor-pointer transition-all duration-300 hover:scale-105"
          >
            <h2 className="font-medium text-primary/90 text-base group-hover:text-primary transition-colors animate-in fade-in slide-in-from-left-2 duration-500">
              technical skills.
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
        <ul className="mt-4 flex flex-col gap-3 w-full font-normal text-primary/90 text-base">
          {Object.entries(data).map(([key, value]) => (
            <li
              key={key}
              className="w-full grid items-start gap-x-6 gap-y-2 sm:grid-cols-[200px_1fr] relative p-6 rounded-lg border border-primary/10 bg-gradient-to-br from-muted/30 to-background backdrop-blur-sm overflow-hidden group shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]"
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-purple-500/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="font-semibold text-primary/90 sm:text-right sm:pr-2 text-left">{key}:</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{value.join(", ")}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </FadeInSection>
  );
}
