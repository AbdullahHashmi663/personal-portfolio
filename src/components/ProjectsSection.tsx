"use client";

import { useState } from "react";
import { ExternalLink, Sparkles, X, ChevronRight, Cpu } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { Project } from "@/types/database";
import ScrollReveal from "@/components/ScrollReveal";
import { useTheme } from "@/context/ThemeContext";

interface ProjectsSectionProps {
  projects?: Project[];
}

export default function ProjectsSection({ projects = [] }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { currentTheme } = useTheme();

  const categories = ["All", "AI & IoT", "Full-Stack", "Mobile & AI", "Systems & C++", "Web & 3D"];

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()) || activeCategory.toLowerCase().includes(p.category.toLowerCase()));

  return (
    <section
      id="projects"
      className="relative w-full py-24 px-4 sm:px-8 lg:px-14 theme-surface overflow-hidden border-t transition-colors duration-500"
      style={{ borderColor: currentTheme.border_color }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 right-1/4 w-[500px] h-[300px] blur-[150px] rounded-full pointer-events-none transition-all duration-500"
        style={{ backgroundColor: currentTheme.glow_color }}
      />

      <div className="relative max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Header & Filter Controls */}
        <ScrollReveal direction="up" delay={50}>
          <div
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8"
            style={{ borderColor: currentTheme.border_color }}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-[1px] w-6" style={{ backgroundColor: currentTheme.primary }} />
                <span className="text-xs font-mono tracking-widest uppercase" style={{ color: currentTheme.primary }}>
                  Featured Engineering Works
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Projects & Systems
              </h2>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto py-1">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer border shrink-0"
                    style={{
                      backgroundColor: isActive ? currentTheme.primary : currentTheme.card_bg,
                      color: isActive ? currentTheme.background : currentTheme.foreground,
                      borderColor: isActive ? currentTheme.primary : currentTheme.border_color,
                      fontWeight: isActive ? 600 : 500,
                      transform: isActive ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Projects Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const isFirst = index === 0 && activeCategory === "All";
            const delay = (index % 3) * 100 + 50;

            return (
              <ScrollReveal
                key={project.id}
                direction="up"
                delay={delay}
                className={`flex ${isFirst ? "md:col-span-2 lg:col-span-2" : ""}`}
              >
                <div
                  onClick={() => setSelectedProject(project)}
                  className="w-full group cursor-pointer rounded-3xl border p-5 sm:p-7 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                  style={{
                    backgroundColor: currentTheme.card_bg,
                    borderColor: currentTheme.border_color,
                    boxShadow: `0 8px 25px -10px ${currentTheme.glow_color}`,
                  }}
                >
                  {/* Subtle top edge glow on hover */}
                  <div
                    className="absolute top-0 inset-x-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(to right, transparent, ${currentTheme.primary}, transparent)` }}
                  />

                  <div>
                    {/* Tags & Action */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span
                        className="px-3 py-1 rounded-full text-[11px] font-mono border"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${currentTheme.primary} 12%, transparent)`,
                          borderColor: `color-mix(in srgb, ${currentTheme.primary} 25%, transparent)`,
                          color: currentTheme.primary,
                        }}
                      >
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="flex items-center gap-1 text-[10px] font-mono text-zinc-400">
                          <Sparkles className="w-3 h-3" style={{ color: currentTheme.accent }} />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-lg sm:text-xl font-bold group-hover:opacity-90 transition-colors" style={{ color: currentTheme.foreground }}>
                      {project.title}
                    </h3>
                    {project.tagline && (
                      <p className="text-xs font-mono mt-1" style={{ color: currentTheme.accent }}>
                        {project.tagline}
                      </p>
                    )}

                    {/* Description */}
                    <p className="mt-3 text-xs sm:text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Footer: Tech badges + View Link */}
                  <div className="mt-6 pt-4 border-t flex items-center justify-between gap-2" style={{ borderColor: currentTheme.border_color }}>
                    <div className="flex flex-wrap gap-1.5 max-w-[75%]">
                      {project.technologies.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono border"
                          style={{
                            backgroundColor: currentTheme.card_bg,
                            borderColor: currentTheme.border_color,
                            color: currentTheme.foreground,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-500">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <span className="w-8 h-8 rounded-full border flex items-center justify-center group-hover:scale-110 transition-transform" style={{ borderColor: currentTheme.border_color }}>
                      <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>

      {/* Project Deep-Dive Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border p-5 sm:p-8 text-white shadow-2xl animate-in zoom-in-95 duration-200"
            style={{
              backgroundColor: currentTheme.background,
              borderColor: currentTheme.border_color,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 w-8 h-8 rounded-full border flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer"
              style={{
                backgroundColor: currentTheme.card_bg,
                borderColor: currentTheme.border_color,
              }}
            >
              <X className="w-4 h-4" />
            </button>

            <span
              className="px-3 py-1 rounded-full text-xs font-mono border"
              style={{
                backgroundColor: `color-mix(in srgb, ${currentTheme.primary} 12%, transparent)`,
                borderColor: `color-mix(in srgb, ${currentTheme.primary} 25%, transparent)`,
                color: currentTheme.primary,
              }}
            >
              {selectedProject.category}
            </span>

            <h3 className="text-xl sm:text-3xl font-bold mt-4 pr-8">
              {selectedProject.title}
            </h3>

            {selectedProject.tagline && (
              <p className="text-xs sm:text-sm font-mono mt-1" style={{ color: currentTheme.accent }}>
                {selectedProject.tagline}
              </p>
            )}

            <div className="mt-5 sm:mt-6 space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <p>{selectedProject.description}</p>

              {selectedProject.architecture_details && (
                <div
                  className="mt-5 sm:mt-6 p-4 rounded-2xl border"
                  style={{
                    backgroundColor: currentTheme.card_bg,
                    borderColor: currentTheme.border_color,
                  }}
                >
                  <div className="flex items-center gap-2 text-xs font-mono uppercase mb-2" style={{ color: currentTheme.primary }}>
                    <Cpu className="w-3.5 h-3.5" />
                    <span>System Architecture</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {selectedProject.architecture_details}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t" style={{ borderColor: currentTheme.border_color }}>
              <h4 className="text-xs font-mono uppercase text-zinc-400 mb-3">
                Technologies & Frameworks
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono border"
                    style={{
                      backgroundColor: currentTheme.card_bg,
                      borderColor: currentTheme.border_color,
                      color: currentTheme.foreground,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {selectedProject.github_url && (
                <a
                  href={selectedProject.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-semibold transition-all shadow-md text-center"
                  style={{
                    backgroundColor: currentTheme.primary,
                    color: currentTheme.background,
                  }}
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
              {selectedProject.live_url && (
                <a
                  href={selectedProject.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border py-3 px-4 text-xs font-medium transition-all text-center"
                  style={{
                    backgroundColor: currentTheme.card_bg,
                    borderColor: currentTheme.border_color,
                    color: currentTheme.foreground,
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Platform</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
