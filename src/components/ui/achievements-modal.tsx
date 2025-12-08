"use client";

import { ArrowUpRight, ChevronDown, ChevronUp, X } from "lucide-react";
import { useEffect, useState } from "react";

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

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Record<string, IBlogData>;
}

export default function AchievementsModal({
  isOpen,
  onClose,
  data,
}: AchievementsModalProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const toggleExpand = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-background border border-border rounded-lg shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm px-6 py-4 flex items-center justify-between z-10">
          <h2 className="font-medium text-primary/90 text-base">
            awards & certifications.
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-full transition-colors cursor-target"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-80px)] px-6 py-6">
          <ul className="flex flex-col gap-8">
            {Object.entries(data).map(([key, value], index) => (
              <li
                key={key}
                className="animate-in fade-in slide-in-from-bottom-2 duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="pl-4 border-muted-foreground hover:border-primary border-l transition-all duration-300 cursor-target">
                  <div className="flex items-start justify-between gap-2">
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
                    <p className="flex items-center gap-1 text-sm mt-1">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-primary transition-colors cursor-target"
                        href={value.LINK}
                      >
                        Credential <ArrowUpRight size={18} />
                      </a>
                    </p>
                  )}

                  <p
                    className={`${
                      value.LINK ? "mt-1" : "mt-2"
                    } text-muted-foreground text-sm text-justify`}
                  >
                    {value.DESCRIPTION}
                  </p>

                  {/* Courses dropdown */}
                  {(value.TYPE === "specialization" ||
                    value.TYPE === "skill-track") &&
                    value.COURSES &&
                    value.COURSES.length > 0 && (
                      <div className="mt-3">
                        <button
                          onClick={() => toggleExpand(key)}
                          className="flex items-center gap-2 text-sm text-primary/90 hover:text-primary transition-colors font-medium cursor-target"
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
                          <ul className="mt-3 ml-2 space-y-2 border-l-2 border-muted-foreground/30 pl-4 animate-in slide-in-from-top-2 duration-200">
                            {value.COURSES.map((course, idx) => (
                              <li key={idx} className="text-sm">
                                <a
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href={course.LINK}
                                  className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors group cursor-target"
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
        </div>
      </div>
    </div>
  );
}
