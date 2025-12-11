"use client";

import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import AchievementsModal from "../ui/achievements-modal";
import { MovingElement } from "../navbar";

interface ICourse {
  NAME: string;
  LINK: string;
}

interface IBlogData {
  TYPE: "certification" | "specialization" | "skill-track" | "award";
  DATE: string;
  LINK?: string;
  DESCRIPTION: string;
  COURSES?: ICourse[];
  FEATURED?: boolean;
}

export function Blogs({ data }: { data: Record<string, IBlogData> }) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleExpand = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Filter featured items for landing page
  const featuredData = Object.entries(data).reduce((acc, [key, value]) => {
    if (value.FEATURED) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, IBlogData>);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "specialization":
        return "Specialization";
      case "skill-track":
        return "Skill Track";
      case "award":
        return "Award";
      default:
        return "Certification";
    }
  };

  return (
    <div id="awards & certifications" className={`transition-all duration-300 ${isCollapsed ? "py-4" : "py-10"}`}>
      <div className="flex items-center justify-between">
        <MovingElement
          change={() => setIsCollapsed(!isCollapsed)}
          ariaLabel="Toggle awards and certifications section"
          className="flex items-center gap-2 group cursor-pointer transition-all duration-300 hover:scale-105"
        >
          <h2 className="font-medium text-primary/90 text-base group-hover:text-primary transition-colors animate-in fade-in slide-in-from-left-2 duration-500">
            awards & certifications.
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
        {Object.entries(featuredData).map(([key, value]) => (
          <li key={key} className="cursor-target">
            <div className="group relative p-6 rounded-lg border border-primary/10 bg-gradient-to-br from-muted/30 to-background backdrop-blur-sm overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-purple-500/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex items-start justify-between gap-2">
                <p className="text-primary/90 text-lg flex-1">
                  {key}{" "}
                  <span className="inline-block bg-secondary max-sm:mb-2 ml-2 px-2 py-1 rounded text-xs">
                    {value.DATE}
                  </span>
                  <span className="inline-block bg-primary/10 text-primary max-sm:mb-2 ml-2 px-2 py-1 rounded text-xs font-medium">
                    {getTypeLabel(value.TYPE)}
                  </span>
                </p>
              </div>

              {value.LINK && (
                <p className="relative z-10 flex items-center gap-1 text-sm mt-1">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                    href={value.LINK}
                  >
                    Credential <ArrowUpRight size={18} />
                  </a>
                </p>
              )}

              <p className={`${value.LINK ? 'mt-1' : 'mt-2'} relative z-10 text-muted-foreground text-sm text-justify`}>
                {value.DESCRIPTION}
              </p>

              {/* Courses dropdown for specialization and skill-track */}
              {(value.TYPE === "specialization" ||
                value.TYPE === "skill-track") &&
                value.COURSES &&
                value.COURSES.length > 0 && (
                  <div className="relative z-10 mt-3">
                    <button
                      onClick={() => toggleExpand(key)}
                      className="flex items-center gap-2 text-sm text-primary/90 hover:text-primary transition-colors font-medium"
                    >
                      {expandedItems[key] ? (
                        <>
                          <ChevronUp size={16} />
                          Hide Courses ({value.COURSES.length})
                        </>
                      ) : (
                        <>
                          <ChevronDown size={16} />
                          Show Courses ({value.COURSES.length})
                        </>
                      )}
                    </button>

                    {expandedItems[key] && (
                      <ul className="mt-3 ml-2 space-y-2 border-l-2 border-muted-foreground/30 pl-4">
                        {value.COURSES.map((course, idx) => (
                          <li key={idx} className="text-sm">
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={course.LINK}
                              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors group"
                            >
                              <span className="group-hover:underline">
                                {course.NAME}
                              </span>
                              <ArrowUpRight
                                size={14}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              />
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
            </div>
          </li>
        ))}
        </ul>

        {/* View All Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex justify-center items-center bg-background hover:bg-accent disabled:opacity-50 shadow-sm px-4 py-2 border border-input rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 font-medium text-muted-foreground text-sm whitespace-nowrap transition-colors hover:text-accent-foreground cursor-target disabled:pointer-events-none"
          >
            View all achievements
          </button>
        </div>
      </div>

      {/* Modal */}
      <AchievementsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={data}
      />
    </div>
  );
}
