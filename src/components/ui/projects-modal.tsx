"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, X } from "lucide-react";
import { StaticImageData } from "next/image";

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

const CATEGORIES = [
  "All Projects",
  "AI & NLP",
  "Agents & Automation",
  "Software & Web",
] as const;
type Category = typeof CATEGORIES[number];

function matchesCategory(project: IProjectData, category: Category) {
  if (category === "All Projects") return true;
  const projectCategory = project.CATEGORY?.toLowerCase?.();
  return projectCategory === category.toLowerCase();
}

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: IProjectData[];
}

export function ProjectsModal({ isOpen, onClose, data }: ProjectsModalProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("All Projects");

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) setActiveCategory("All Projects");
  }, [isOpen]);

  const filtered = useMemo(
    () => data.filter((p) => matchesCategory(p, activeCategory)),
    [data, activeCategory]
  );

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="relative bg-background border border-border rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm px-6 py-4 flex items-center justify-between z-10">
          <h2 className="font-medium text-primary/90 text-base">all projects.</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Category filter */}
        <div className="px-6 pt-4 pb-3 flex flex-wrap gap-2 border-b border-border/60">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors border ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/40 text-primary/80 border-border hover:border-primary/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-6 space-y-4">
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground">No projects in this category yet.</p>
          )}

          {filtered.map((project, index) => (
            <div
              key={project.ID}
              className="border border-border rounded-lg p-4 bg-gradient-to-br from-muted/30 to-background backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-300"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-primary/90 text-lg font-semibold">{project.TITLE}</span>
                    <span className="px-2 py-1 rounded text-xs bg-primary/10 text-primary font-medium">
                      {project.CATEGORY || "Uncategorized"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.DESCRIPTION}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {project.TECHNOLOGIES.map((tech) => (
                      <span key={tech} className="px-2 py-1 rounded bg-muted/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  {project.DEMO && (
                    <a
                      href={project.DEMO}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-blue-500 hover:text-blue-400 transition-colors"
                    >
                      live <ArrowUpRight size={14} />
                    </a>
                  )}
                  {project.GITHUB && (
                    <a
                      href={project.GITHUB}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-purple-500 hover:text-purple-400 transition-colors"
                    >
                      code <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
