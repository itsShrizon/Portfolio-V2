"use client";

import { FadeInSection } from "../ui/fade-in-section";

export function AboutMe({ data }: { data: Record<string, string> }) {
  return (
    <FadeInSection direction="up">
      <div id="aboutme" className="py-10">
        <h2 className="font-medium text-primary/90 text-base">about me.</h2>

        <div className="mt-4 p-5 sm:p-6">
          <p className="font-normal text-muted-foreground text-base text-justify">
            {data.INTRO}{" "}
            <span className="hidden sm:inline">{data.EXPERTISE}</span>
          </p>
        </div>
      </div>
    </FadeInSection>
  );
}
