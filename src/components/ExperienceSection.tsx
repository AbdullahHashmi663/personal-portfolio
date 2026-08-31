"use client";

import { Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { Experience } from "@/types/database";
import ScrollReveal from "@/components/ScrollReveal";
import { useTheme } from "@/context/ThemeContext";

interface ExperienceSectionProps {
  experiences?: Experience[];
}

export default function ExperienceSection({ experiences = [] }: ExperienceSectionProps) {
  const { currentTheme } = useTheme();

  return (
    <section
      id="experience"
      className="relative w-full py-24 px-4 sm:px-8 lg:px-14 theme-surface overflow-hidden border-t transition-colors duration-500"
      style={{ borderColor: currentTheme.border_color }}
    >
      <div className="relative max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Header */}
        <ScrollReveal direction="up" delay={50}>
          <div
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8"
            style={{ borderColor: currentTheme.border_color }}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-[1px] w-6" style={{ backgroundColor: currentTheme.primary }} />
                <span className="text-xs font-mono tracking-widest uppercase" style={{ color: currentTheme.primary }}>
                  Leadership & Industry Journey
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Work Experience
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
              Proven track record leading software development teams, organizing competitive programming events, and engineering enterprise applications.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline List */}
        <div className="relative border-l ml-4 sm:ml-8 space-y-10" style={{ borderColor: currentTheme.border_color }}>
          {experiences.map((exp, index) => {
            const delay = index * 100 + 50;

            return (
              <ScrollReveal key={exp.id} direction="up" delay={delay}>
                <div className="relative pl-6 sm:pl-10">
                  
                  {/* Timeline Bullet Node */}
                  <span
                    className="absolute -left-[9px] top-2 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                    style={{
                      backgroundColor: currentTheme.background,
                      borderColor: currentTheme.primary,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.primary }} />
                  </span>

                  {/* Experience Card */}
                  <div
                    className="rounded-3xl border p-6 sm:p-8 backdrop-blur-xl transition-all duration-300"
                    style={{
                      backgroundColor: currentTheme.card_bg,
                      borderColor: currentTheme.border_color,
                      boxShadow: `0 8px 25px -10px ${currentTheme.glow_color}`,
                    }}
                  >
                    <div
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4 mb-5"
                      style={{ borderColor: currentTheme.border_color }}
                    >
                      <div>
                        <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                        <p className="text-sm font-medium mt-0.5" style={{ color: currentTheme.primary }}>
                          {exp.company}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
                          {exp.period}
                        </span>
                        {exp.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
                            {exp.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements List */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="mt-5 space-y-2">
                        {exp.achievements.map((ach, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: currentTheme.primary }} />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Pills */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div
                        className="mt-6 pt-4 border-t flex flex-wrap gap-2"
                        style={{ borderColor: currentTheme.border_color }}
                      >
                        {exp.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-0.5 rounded-md text-[11px] font-mono border"
                            style={{
                              backgroundColor: "rgba(0,0,0,0.3)",
                              borderColor: currentTheme.border_color,
                              color: currentTheme.foreground,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
