"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { CalendlyModal } from "../ui/calendly-modal";

export function Contact() {
  const bookingUrl = `https://calendly.com/mailme-tanzir/30min`;
  const [showCalendly, setShowCalendly] = useState(false);

  return (
    <section className="py-10">
      <div className="space-y-6 text-center relative p-6 sm:p-8 rounded-lg border border-primary/10 bg-gradient-to-br from-muted/30 to-background backdrop-blur-sm overflow-hidden group shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-purple-500/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="space-y-4">
          <h2 className="font-bold text-3xl text-primary">
            Let&apos;s work together.
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-base">
            I&apos;m always interested in new opportunities and exciting
            projects. Whether you have a project or a research idea in mind or just want to chat
            about tech, I&apos;d love to hear from you.
          </p>
        </div>

      </div>


    </section>
  );
}
