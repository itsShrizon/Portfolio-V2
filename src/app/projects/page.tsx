"use client";

import { DATA } from "@/app/data";
import { Contact, Footer, Navbar } from "@/components/sections";
import GridPattern from "@/components/ui/grid-pattern";
import TargetCursor from "@/components/ui/target-cursor";
import BlurImage from "@/components/ui/blur-image";
import useMobileDetection from "@/hooks/use-mobile";
import { ArrowUpRight } from "lucide-react";
import { StaticImageData } from "next/image";
import React, { useState } from "react";

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

type CategoryFilter = "All Projects" | "Robotics" | "Software Development" | "AI/ML/DL";

export default function Page() {
  const projectsData: IProjectData[] = DATA.PROJECTS;
  const checkMobile = useMobileDetection();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All Projects");

  const categories: CategoryFilter[] = [
    "All Projects",
    "AI/ML/DL",
    "Software Development",
    "Robotics",
  ];

  const filteredProjects = selectedCategory === "All Projects"
    ? projectsData
    : projectsData.filter((project) => project.CATEGORY === selectedCategory);

  return (
    <div className="mx-auto px-4 pt-6 sm:pt-12 w-full lg:w-2/3 text-foreground min-h-screen">
      <Navbar />

      <h1 className="sr-only">Projects by Tanzir Hossain - AI Engineer</h1>

      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        className="[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
      />

      <section className="py-16">
        <h1 className="font-medium text-primary/90 text-base">my projects.</h1>
        <div className="max-w-4xl text-muted-foreground text-sm text-justify leading-relaxed">
          <p className="mt-2 mb-4">
            Passionate about building high-performance and scalable web
            applications. I thrive on solving complex problems, optimizing
            performance, and creating intuitive user experiences. My expertise
            lies in Next.js, TypeScript, and Cloud technologies, with a strong
            focus on delivering quality solutions.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-target ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <div className="space-y-12 mb-12">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No projects found in this category.</p>
          </div>
        ) : (
          filteredProjects.map((value, index) => {
            const isEven = index % 2 === 0;

            return (
              <React.Fragment key={value.ID}>
                <div 
                  className="items-start gap-12 grid lg:grid-cols-2 cursor-target animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="relative rounded-lg overflow-hidden group">
                      <BlurImage
                        src={value.IMAGE || "/placeholder.svg"}
                        alt={`${value.TITLE} - ${value.DESCRIPTION}`}
                        width={600}
                        height={400}
                        className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <div
                    className={`space-y-6 border-muted-foreground hover:border-primary border-l size-full transition-all duration-300 pl-4 ${isEven ? "lg:order-2" : "lg:order-1"}`}
                  >
                    <div>
                      <h2 className="mb-1 font-medium text-2xl">{value.TITLE}</h2>
                      
                      <span className="inline-block px-2 py-1 mt-1 mb-2 bg-muted text-muted-foreground rounded text-xs">
                        {value.CATEGORY}
                      </span>

                      <p className="flex items-center gap-1 text-sm">
                        {value.DEMO && (
                          <a
                            className="flex items-center gap-1 hover:text-primary transition-colors"
                            href={value.DEMO}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            live preview <ArrowUpRight size={18} />
                          </a>
                        )}
                        {value.GITHUB && (
                          <a
                            className="flex items-center gap-1 hover:text-primary transition-colors"
                            href={value.GITHUB}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            github <ArrowUpRight size={18} />
                          </a>
                        )}
                      </p>
                    </div>
                    
                    <p className="text-muted-foreground text-sm text-justify">
                      {value.LONG_DESCRIPTION}
                    </p>

                    <ul className="space-y-1 mt-1 pl-3 text-muted-foreground text-sm text-justify list-disc">
                      {value.FEATURES.map((feature, idx) => (
                        <li key={idx}>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <ul className="flex flex-wrap items-center gap-2 mt-2 pl-3">
                      {value.TECHNOLOGIES.map((tech, idx) => (
                        <li
                          key={idx}
                          className="bg-muted px-2 py-1 rounded text-xs hover:bg-muted/80 transition-colors"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {index < filteredProjects.length - 1 && (
                  <div className="border-muted-foreground/20 border-t" />
                )}
              </React.Fragment>
            );
          })
        )}
      </div>

      <Contact />

      <Footer />

      {!checkMobile && <TargetCursor spinDuration={2} hideDefaultCursor />}
    </div>
  );
}
