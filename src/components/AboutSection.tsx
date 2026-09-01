"use client";

import { GraduationCap, Award, BookOpen, Code, CheckCircle2 } from "lucide-react";
import { Profile, Certification } from "@/types/database";
import ScrollReveal from "@/components/ScrollReveal";
import { useTheme } from "@/context/ThemeContext";

interface AboutSectionProps {
  profile?: Profile;
  certifications?: Certification[];
}

export default function AboutSection({ profile, certifications = [] }: AboutSectionProps) {
  const cgpa = profile?.cgpa || 3.85;
  const { currentTheme } = useTheme();

  return (
    <section
      id="about"
      className="relative w-full py-24 px-4 sm:px-8 lg:px-14 theme-surface overflow-hidden border-t transition-colors duration-500"
      style={{ borderColor: currentTheme.border_color }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[140px] rounded-full pointer-events-none transition-all duration-500"
        style={{ backgroundColor: currentTheme.glow_color }}
      />

      <div className="relative max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8"
            style={{ borderColor: currentTheme.border_color }}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-[1px] w-6" style={{ backgroundColor: currentTheme.primary }} />
                <span className="text-xs font-mono tracking-widest uppercase" style={{ color: currentTheme.primary }}>
                  Biography & Academic Excellence
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white font-ardent">
                About & Credentials
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
              A software engineer committed to rigorous computer science fundamentals, high-throughput systems, and modern full-stack web architectures.
            </p>
          </div>
        </ScrollReveal>

        {/* Bento Grid: Bio, Education, Research, Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* 1. Core Profile & Philosophy (7 cols) */}
          <ScrollReveal direction="up" delay={100} className="lg:col-span-7 flex">
            <div
              className="w-full rounded-3xl border p-7 sm:p-9 backdrop-blur-xl flex flex-col justify-between transition-all duration-300"
              style={{
                backgroundColor: currentTheme.card_bg,
                borderColor: currentTheme.border_color,
                boxShadow: `0 10px 30px -10px ${currentTheme.glow_color}`,
              }}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span
                    className="p-2.5 rounded-2xl border flex items-center justify-center"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${currentTheme.primary} 15%, transparent)`,
                      borderColor: `color-mix(in srgb, ${currentTheme.primary} 30%, transparent)`,
                      color: currentTheme.primary,
                    }}
                  >
                    <Code className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">Full-Stack & Systems Engineering</h3>
                    <p className="text-xs font-mono" style={{ color: currentTheme.accent }}>
                      React · Next.js · ASP.NET Core · C++ · 3D Web
                    </p>
                  </div>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed">
                  I am a passionate Full-Stack Developer and Final-Year Information Technology student at <strong className="text-white">Bahria University, Islamabad</strong> with a high academic standing of <strong className="text-white font-mono">{cgpa} CGPA</strong>. 
                </p>

                <p className="text-sm text-zinc-400 leading-relaxed">
                  My engineering focus bridges modern interactive web platforms (Next.js, Three.js, GSAP) with robust enterprise backend systems (ASP.NET Core, C#, Entity Framework Core, dual-engine databases) and systems-level algorithms in C++. I have spearheaded competitive programming initiatives and led student technical teams to build scalable software for hundreds of users.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl border border-white/10 bg-white/[0.02]">
                    <div className="text-2xl font-bold font-mono" style={{ color: currentTheme.primary }}>{cgpa}</div>
                    <div className="text-[11px] text-zinc-400 mt-1">University CGPA</div>
                  </div>
                  <div className="p-3.5 rounded-2xl border border-white/10 bg-white/[0.02]">
                    <div className="text-2xl font-bold font-mono" style={{ color: currentTheme.accent }}>3+ Years</div>
                    <div className="text-[11px] text-zinc-400 mt-1">C++ & Algorithms</div>
                  </div>
                  <div className="p-3.5 rounded-2xl border border-white/10 bg-white/[0.02] col-span-2 sm:col-span-1">
                    <div className="text-2xl font-bold font-mono" style={{ color: currentTheme.primary }}>7+</div>
                    <div className="text-[11px] text-zinc-400 mt-1">Complex Systems</div>
                  </div>
                </div>
              </div>

              {/* Core Values / Competencies */}
              <div
                className="mt-8 pt-6 border-t flex flex-wrap gap-2.5"
                style={{ borderColor: currentTheme.border_color }}
              >
                {["Full-Stack Scalability", "Low-Latency Architecture", "Constraint Optimization", "AI Threat Intelligence", "Clean Code Standards"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-mono border flex items-center gap-1.5"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${currentTheme.card_bg} 90%, transparent)`,
                      borderColor: currentTheme.border_color,
                      color: currentTheme.foreground,
                    }}
                  >
                    <CheckCircle2 className="w-3 h-3" style={{ color: currentTheme.primary }} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* 2. Education Card (5 cols) */}
          <ScrollReveal direction="up" delay={200} className="lg:col-span-5 flex">
            <div
              className="w-full rounded-3xl border p-7 sm:p-9 backdrop-blur-xl flex flex-col justify-between transition-all duration-300"
              style={{
                backgroundColor: currentTheme.card_bg,
                borderColor: currentTheme.border_color,
              }}
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="p-2.5 rounded-2xl border flex items-center justify-center"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${currentTheme.primary} 15%, transparent)`,
                      borderColor: `color-mix(in srgb, ${currentTheme.primary} 30%, transparent)`,
                      color: currentTheme.primary,
                    }}
                  >
                    <GraduationCap className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">Academic Journey</h3>
                    <p className="text-xs font-mono" style={{ color: currentTheme.accent }}>
                      Degrees & High Honors
                    </p>
                  </div>
                </div>

                {/* Education Timeline */}
                <div className="space-y-6 relative border-l ml-3 pl-6" style={{ borderColor: currentTheme.border_color }}>
                  
                  {/* 1. Bahria University */}
                  <div className="relative">
                    <span
                      className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-black"
                      style={{ backgroundColor: currentTheme.primary }}
                    />
                    <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: currentTheme.accent }}>
                      Feb 2023 – Present · Final Year
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">Bachelors in Information Technology</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">Bahria University, Islamabad</p>
                    <div
                      className="inline-block mt-2 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${currentTheme.primary} 15%, transparent)`,
                        color: currentTheme.primary,
                      }}
                    >
                      CGPA: {cgpa} / 4.00
                    </div>
                  </div>

                  {/* 2. Punjab Group of Colleges */}
                  <div className="relative">
                    <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-600 ring-4 ring-black" />
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Jul 2020 – Aug 2022</span>
                    <h4 className="text-sm font-bold text-white mt-0.5">ICS – Mathematics, CS & Physics</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">Punjab Group of Colleges, Rawalpindi</p>
                    <div className="inline-block mt-2 px-2.5 py-0.5 rounded-md bg-zinc-800 text-zinc-300 text-[11px] font-mono">
                      Grade: A
                    </div>
                  </div>

                  {/* 3. Saint Mary's Cambridge HSS */}
                  <div className="relative">
                    <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-700 ring-4 ring-black" />
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Jul 2018 – Jul 2020</span>
                    <h4 className="text-sm font-bold text-white mt-0.5">General Sciences – Matriculation</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">Saint Mary’s Cambridge HSS, Rawalpindi</p>
                    <div className="inline-block mt-2 px-2.5 py-0.5 rounded-md bg-zinc-800 text-zinc-300 text-[11px] font-mono">
                      Grade: A
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* 3. Academic Research (6 cols) */}
          <ScrollReveal direction="up" delay={150} className="lg:col-span-6 flex">
            <div
              className="w-full rounded-3xl border p-7 sm:p-9 backdrop-blur-xl flex flex-col justify-between transition-all duration-300"
              style={{
                backgroundColor: currentTheme.card_bg,
                borderColor: currentTheme.border_color,
              }}
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="p-2.5 rounded-2xl border flex items-center justify-center"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${currentTheme.primary} 15%, transparent)`,
                      borderColor: `color-mix(in srgb, ${currentTheme.primary} 30%, transparent)`,
                      color: currentTheme.primary,
                    }}
                  >
                    <BookOpen className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">Research & Scientific Inquiries</h3>
                    <p className="text-xs font-mono" style={{ color: currentTheme.accent }}>
                      AI, Computer Vision & Cybersecurity
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="text-zinc-400">Medical Imaging & Deep Learning</span>
                      <span style={{ color: currentTheme.primary }} className="font-semibold">In Progress</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">Cardiac Image Processing</h4>
                    <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                      Research on automated feature extraction and deep learning segmentation of cardiac MRI scans to support early detection of cardiovascular anomalies.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="text-zinc-400">Industrial IoT & Defense</span>
                      <span style={{ color: currentTheme.primary }} className="font-semibold">In Progress</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">IoT-Based XDR & GRC Framework</h4>
                    <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                      Integrating Governance, Risk, and Compliance standards with real-time multi-agent telemetry for automated threat mitigation across Industrial IoT nodes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* 4. Certifications & Honors (6 cols) */}
          <ScrollReveal direction="up" delay={250} className="lg:col-span-6 flex">
            <div
              className="w-full rounded-3xl border p-7 sm:p-9 backdrop-blur-xl flex flex-col justify-between transition-all duration-300"
              style={{
                backgroundColor: currentTheme.card_bg,
                borderColor: currentTheme.border_color,
              }}
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="p-2.5 rounded-2xl border flex items-center justify-center"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${currentTheme.primary} 15%, transparent)`,
                      borderColor: `color-mix(in srgb, ${currentTheme.primary} 30%, transparent)`,
                      color: currentTheme.primary,
                    }}
                  >
                    <Award className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">Certifications & Honors</h3>
                    <p className="text-xs font-mono" style={{ color: currentTheme.accent }}>
                      Industry Credentials
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white">Microsoft Power Platform Developer Associate</h4>
                      <p className="text-xs text-zinc-400 mt-1">NAVTTC · Mar – Jun 2025</p>
                      <p className="text-[11px] font-mono mt-1" style={{ color: currentTheme.accent }}>
                        ASP.NET, C#, React, Web Forms, MVC, SQL Server
                      </p>
                    </div>
                    <span
                      className="px-2 py-1 rounded text-[10px] font-mono shrink-0 font-semibold"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${currentTheme.primary} 15%, transparent)`,
                        color: currentTheme.primary,
                      }}
                    >
                      Certified
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white">Master Course in Web Framework</h4>
                      <p className="text-xs text-zinc-400 mt-1">Udemy · August 2023</p>
                      <p className="text-[11px] text-zinc-500 mt-1 font-mono">Web Architecture, Component Patterns & REST</p>
                    </div>
                    <span
                      className="px-2 py-1 rounded text-[10px] font-mono shrink-0 font-semibold"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${currentTheme.primary} 15%, transparent)`,
                        color: currentTheme.primary,
                      }}
                    >
                      Certified
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white">Hafiz-e-Quran</h4>
                      <p className="text-xs text-zinc-400 mt-1">Jamia Islamia Hashmia · 18th May 2016</p>
                      <p className="text-[11px] text-zinc-500 mt-1 font-mono">Complete Memorization of the Holy Quran</p>
                    </div>
                    <span
                      className="px-2 py-1 rounded text-[10px] font-mono shrink-0 font-semibold"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${currentTheme.accent} 20%, transparent)`,
                        color: currentTheme.accent,
                      }}
                    >
                      Honor
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
