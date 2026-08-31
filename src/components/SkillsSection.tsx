"use client";

import { useState, useMemo } from "react";
import {
  Code2,
  Server,
  Binary,
  Database,
  Wrench,
  Sparkles,
  Search,
  CheckCircle2,
  Cpu,
  Layers,
  Shield,
  Zap,
  Terminal,
  Activity,
} from "lucide-react";
import { Skill } from "@/types/database";
import ScrollReveal from "@/components/ScrollReveal";
import { useTheme } from "@/context/ThemeContext";

interface SkillsSectionProps {
  skills?: Skill[];
}

// Sub-competencies mapping to give each skill deep engineering context
const skillSubTags: Record<string, string[]> = {
  "React.js & Next.js": ["App Router", "Server Components", "SSR/SSG", "State Hooks"],
  "TypeScript & JavaScript": ["Strict Typing", "Generics", "Async/Await", "ESNext"],
  "Tailwind CSS & Modern UI": ["Custom Design Tokens", "Glassmorphism", "Responsive Layouts"],
  "Three.js / WebGL & GSAP": ["3D Scenes", "ScrollTrigger Choreography", "Shaders", "GPU Acceleration"],
  "ASP.NET MVC & Core (C#)": ["RESTful Web APIs", "Dependency Injection", "Middleware", "LINQ"],
  "Entity Framework (EF Core)": ["Code-First Migrations", "Query Optimization", "Relational Mapping"],
  "Node.js & Express": ["Microservices", "REST Architecture", "Event Loops", "JWT Auth"],
  "PHP & Laravel Basics": ["MVC Architecture", "Blade Templating", "Eloquent ORM"],
  "Python (FastAPI / Django)": ["Async Endpoints", "Pydantic Models", "Data Pipelines"],
  "C++ & Object-Oriented Design": ["Memory Management", "Pointers", "Templates", "STL Algorithms"],
  "Data Structures & Algorithms": ["Graph Traversal", "Dynamic Programming", "Time Complexity", "Trees"],
  "Competitive Programming": ["Speed Coding", "Optimization", "CodeZaar Organizer"],
  "PostgreSQL & Supabase": ["Row Level Security (RLS)", "Indexing", "Triggers", "Realtime Sync"],
  "MS SQL Server (SSMS)": ["Stored Procedures", "Complex Joins", "Schema Design", "Transactions"],
  "MongoDB & SQLite3": ["Document Schema", "Aggregation Pipelines", "Embedded Storage"],
  "Git & GitHub DevOps": ["Branching Strategies", "PR Reviewing", "Merge Conflict Resolution"],
  "Docker Containerization": ["Dockerfile", "Compose", "Multi-Stage Builds", "Networking"],
  "AWS Cloud & Deployment": ["EC2", "S3 Storage", "IAM Policies", "Vercel Edge"],
  "Figma UI/UX Prototyping": ["Component Systems", "Auto-Layout", "Design Tokens", "Wireframing"],
};

export default function SkillsSection({ skills = [] }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [minProficiency, setMinProficiency] = useState<number>(0);
  const { currentTheme } = useTheme();

  const categories = [
    { name: "All", icon: Sparkles },
    { name: "Frontend", icon: Code2 },
    { name: "Backend", icon: Server },
    { name: "Systems & Core", icon: Binary },
    { name: "Databases", icon: Database },
    { name: "DevOps & Tools", icon: Wrench },
  ];

  // Filter skills based on Category, Search query, and Proficiency
  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory =
        selectedCategory === "All" ||
        skill.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        searchQuery.trim() === "" ||
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (skillSubTags[skill.name] &&
          skillSubTags[skill.name].some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          ));

      const matchesProficiency = skill.proficiency >= minProficiency;

      return matchesCategory && matchesSearch && matchesProficiency;
    });
  }, [skills, selectedCategory, searchQuery, minProficiency]);

  return (
    <section
      id="skills"
      className="relative w-full py-28 px-4 sm:px-8 lg:px-14 theme-surface overflow-hidden border-t transition-colors duration-500"
      style={{ borderColor: currentTheme.border_color }}
    >
      {/* Dynamic Ambient Background Glow */}
      <div
        className="absolute top-1/4 left-1/3 w-[600px] h-[350px] blur-[160px] rounded-full pointer-events-none transition-all duration-500"
        style={{ backgroundColor: currentTheme.glow_color }}
      />

      <div className="relative max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* ============================================================ */}
        {/* 1. HEADER WITH EDITORIAL ACCENT */}
        {/* ============================================================ */}
        <ScrollReveal direction="up" delay={50}>
          <div
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8"
            style={{ borderColor: currentTheme.border_color }}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-[1px] w-6" style={{ backgroundColor: currentTheme.primary }} />
                <span className="text-xs font-mono tracking-widest uppercase" style={{ color: currentTheme.primary }}>
                  Technical Architecture & Capabilities Matrix
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Engineering Skills & Mastery
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
              Bridging low-level systems programming in C++ with enterprise full-stack web architectures and GPU-accelerated 3D interfaces.
            </p>
          </div>
        </ScrollReveal>

        {/* ============================================================ */}
        {/* 2. CORE COMPETENCIES HUD TELEMETRY BENTO */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Bento Left: Core Engineering Radar & Telemetry (7 cols) */}
          <ScrollReveal direction="up" delay={100} className="lg:col-span-7 flex">
            <div
              className="w-full rounded-3xl border p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
              style={{
                backgroundColor: currentTheme.card_bg,
                borderColor: currentTheme.border_color,
                boxShadow: `0 10px 30px -10px ${currentTheme.glow_color}`,
              }}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="p-2.5 rounded-2xl border flex items-center justify-center"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${currentTheme.primary} 15%, transparent)`,
                        borderColor: `color-mix(in srgb, ${currentTheme.primary} 30%, transparent)`,
                        color: currentTheme.primary,
                      }}
                    >
                      <Activity className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-white">Core Engineering Telemetry</h3>
                      <p className="text-xs font-mono" style={{ color: currentTheme.accent }}>
                        Domain Competency Breakdown
                      </p>
                    </div>
                  </div>

                  <span
                    className="hidden sm:inline-block px-3 py-1 rounded-full text-[11px] font-mono border"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${currentTheme.primary} 10%, transparent)`,
                      borderColor: `color-mix(in srgb, ${currentTheme.primary} 25%, transparent)`,
                      color: currentTheme.primary,
                    }}
                  >
                    3.85 CGPA High Honor
                  </span>
                </div>

                {/* 4 Core Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {[
                    { title: "Full-Stack Architecture", metric: "96%", desc: "Next.js 16, React, TypeScript & Server Actions", icon: Layers },
                    { title: "Systems & Algorithms", metric: "94%", desc: "C++ (OOP & STL), DSA, Time Optimization", icon: Binary },
                    { title: "Enterprise Backend", metric: "93%", desc: "ASP.NET Core, C#, EF Core & REST APIs", icon: Server },
                    { title: "Database Systems", metric: "92%", desc: "PostgreSQL, Supabase RLS & MS SQL Server", icon: Database },
                  ].map((pillar) => {
                    const Icon = pillar.icon;
                    return (
                      <div
                        key={pillar.title}
                        className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col justify-between gap-3 hover:border-white/15 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white flex items-center gap-2">
                            <Icon className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
                            {pillar.title}
                          </span>
                          <span className="text-xs font-mono font-bold" style={{ color: currentTheme.primary }}>
                            {pillar.metric}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-snug">
                          {pillar.desc}
                        </p>
                        <div className="w-full h-1 rounded-full bg-black/40 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: pillar.metric,
                              background: `linear-gradient(to right, ${currentTheme.accent}, ${currentTheme.primary})`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Credentials Pill */}
              <div
                className="mt-6 pt-5 border-t flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400"
                style={{ borderColor: currentTheme.border_color }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" style={{ color: currentTheme.primary }} />
                  <span>Microsoft Certified: Power Platform Developer Associate</span>
                </div>
                <span className="text-zinc-500">NAVTTC · 2025</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Bento Right: Engineering Principles & Architectural DNA (5 cols) */}
          <ScrollReveal direction="up" delay={200} className="lg:col-span-5 flex">
            <div
              className="w-full rounded-3xl border p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between transition-all duration-300"
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
                    <Cpu className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">Architectural Philosophy</h3>
                    <p className="text-xs font-mono" style={{ color: currentTheme.accent }}>
                      Standards & System Design
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div className="p-3.5 rounded-2xl border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                      <Zap className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
                      <span>Low-Latency & Memory Bounds</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Rigorous algorithmic complexity analysis, avoiding memory leaks, and optimizing cache locality.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                      <Shield className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
                      <span>Type Safety & Zero-Trust APIs</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      End-to-end type invariants from PostgreSQL schemas to C# models and TypeScript client interfaces.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                      <Terminal className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
                      <span>60 FPS Dynamic Interaction</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Lenis momentum physics, GSAP timeline sequencing, and Motion hardware-accelerated transforms.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="mt-6 pt-4 border-t flex items-center justify-between text-[11px] font-mono text-zinc-500"
                style={{ borderColor: currentTheme.border_color }}
              >
                <span>CodeZaar Championship Director</span>
                <span style={{ color: currentTheme.primary }}>YOTA Lead</span>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* ============================================================ */}
        {/* 3. INTERACTIVE SEARCH & CATEGORY FILTER CONTROL BAR */}
        {/* ============================================================ */}
        <ScrollReveal direction="up" delay={150}>
          <div
            className="p-4 rounded-3xl border backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300"
            style={{
              backgroundColor: currentTheme.card_bg,
              borderColor: currentTheme.border_color,
            }}
          >
            {/* Category Chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto py-1">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.name;
                const count =
                  cat.name === "All"
                    ? skills.length
                    : skills.filter((s) => s.category.toLowerCase() === cat.name.toLowerCase()).length;

                return (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl text-xs font-medium transition-all cursor-pointer border shrink-0"
                    style={{
                      backgroundColor: isActive ? currentTheme.primary : "transparent",
                      color: isActive ? currentTheme.background : currentTheme.foreground,
                      borderColor: isActive ? currentTheme.primary : currentTheme.border_color,
                      fontWeight: isActive ? 600 : 500,
                      transform: isActive ? "scale(1.03)" : "scale(1)",
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.name}</span>
                    <span
                      className="px-1.5 py-0.2 rounded-full text-[10px] font-mono ml-0.5"
                      style={{
                        backgroundColor: isActive
                          ? "rgba(0,0,0,0.2)"
                          : "rgba(255,255,255,0.08)",
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Live Search & Filter Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search skills, tags, or concepts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border bg-black/40 pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none transition-all"
                style={{ borderColor: currentTheme.border_color }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* ============================================================ */}
        {/* 4. EXPANDED SKILLS MATRIX GRID */}
        {/* ============================================================ */}
        {filteredSkills.length === 0 ? (
          <div
            className="text-center py-16 rounded-3xl border border-dashed p-8"
            style={{ borderColor: currentTheme.border_color }}
          >
            <Search className="w-8 h-8 mx-auto text-zinc-500 mb-3" />
            <p className="text-sm font-bold text-white">No matching skills found</p>
            <p className="text-xs text-zinc-400 mt-1">
              Try adjusting your search query or reset the category filter.
            </p>
            <button
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              className="mt-4 px-4 py-1.5 rounded-xl text-xs font-semibold"
              style={{
                backgroundColor: currentTheme.primary,
                color: currentTheme.background,
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSkills.map((skill, index) => {
              const delay = (index % 3) * 70 + 50;
              const subTags = skillSubTags[skill.name] || ["Production Ready", "High Velocity", "Architecture"];

              return (
                <ScrollReveal key={skill.id} direction="up" delay={delay}>
                  <div
                    className="group rounded-3xl border p-6 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                    style={{
                      backgroundColor: currentTheme.card_bg,
                      borderColor: currentTheme.border_color,
                      boxShadow: `0 4px 20px -10px ${currentTheme.glow_color}`,
                    }}
                  >
                    {/* Top Glow bar on hover */}
                    <div
                      className="absolute top-0 inset-x-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: `linear-gradient(to right, transparent, ${currentTheme.primary}, transparent)` }}
                    />

                    <div>
                      {/* Category & Experience Tag */}
                      <div className="flex items-center justify-between mb-3.5">
                        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                          {skill.category}
                        </span>
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-mono border"
                          style={{
                            backgroundColor: "rgba(0,0,0,0.3)",
                            borderColor: currentTheme.border_color,
                            color: currentTheme.accent,
                          }}
                        >
                          {skill.experience_years}
                        </span>
                      </div>

                      {/* Skill Name */}
                      <h3 className="text-lg font-bold text-white group-hover:text-zinc-100 transition-colors">
                        {skill.name}
                      </h3>

                      {/* Sub-competencies Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {subTags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md text-[10px] font-mono border text-zinc-400"
                            style={{
                              backgroundColor: "rgba(255,255,255,0.02)",
                              borderColor: currentTheme.border_color,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Proficiency Gauge with Spring Glow Bar */}
                    <div
                      className="mt-6 pt-4 border-t flex flex-col gap-2"
                      style={{ borderColor: currentTheme.border_color }}
                    >
                      <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                        <span>Mastery Benchmark</span>
                        <span style={{ color: currentTheme.primary }} className="font-bold font-mono">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-black/50 overflow-hidden border border-white/5 p-0.5">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${skill.proficiency}%`,
                            background: `linear-gradient(to right, ${currentTheme.accent}, ${currentTheme.primary})`,
                            boxShadow: `0 0 10px ${currentTheme.glow_color}`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* ============================================================ */}
        {/* 5. TOOLCHAIN, IDES & SYSTEMS ECOSYSTEM POD */}
        {/* ============================================================ */}
        <ScrollReveal direction="up" delay={200}>
          <div
            className="rounded-3xl border p-7 sm:p-9 backdrop-blur-xl space-y-6 transition-colors"
            style={{
              backgroundColor: currentTheme.card_bg,
              borderColor: currentTheme.border_color,
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4" style={{ borderColor: currentTheme.border_color }}>
              <div>
                <h4 className="text-base font-bold text-white">Full Development Toolchain & System Environments</h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Operating systems, compilers, database management studios, and cloud deployment pipelines.
                </p>
              </div>
              <span className="text-xs font-mono text-zinc-500">
                100% Native & Cloud Tooling
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Pod 1: IDEs & Compilers */}
              <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] space-y-3">
                <div className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: currentTheme.primary }}>
                  IDEs & Compilers
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Visual Studio 2022", "VS Code", "GCC / Clang", "Android Studio", "LaTeX"].map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono border"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.3)",
                        borderColor: currentTheme.border_color,
                        color: currentTheme.foreground,
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pod 2: Databases & Studios */}
              <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] space-y-3">
                <div className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: currentTheme.accent }}>
                  Database Studios & Stores
                </div>
                <div className="flex flex-wrap gap-2">
                  {["MS SQL Server (SSMS)", "Supabase Studio", "pgAdmin", "XAMPP / WAMPP", "SQLite Studio"].map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono border"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.3)",
                        borderColor: currentTheme.border_color,
                        color: currentTheme.foreground,
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pod 3: DevOps & Collaboration */}
              <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] space-y-3">
                <div className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: currentTheme.primary }}>
                  DevOps, Cloud & UI
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Docker", "Git & GitHub", "Postman", "Figma UI/UX", "Linux / WSL"].map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono border"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.3)",
                        borderColor: currentTheme.border_color,
                        color: currentTheme.foreground,
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
