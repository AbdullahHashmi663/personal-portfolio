"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  Code2,
  Server,
  Binary,
  Database,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ArrowUpRight,
  Terminal,
  Shield,
  CheckCircle2,
} from "lucide-react";
import { Skill } from "@/types/database";
import ScrollReveal from "@/components/ScrollReveal";
import { useTheme } from "@/context/ThemeContext";
import { fallbackSkills } from "@/lib/data";

interface SkillsSectionProps {
  skills?: Skill[];
}

// ----------------------------------------------------------------------
// Typographic Domain Groupings & Deep Editorial Metadata
// ----------------------------------------------------------------------
interface SkillEditorial {
  name: string;
  category: string;
  experience: string;
  role: string;
  subTags: string[];
  projects: { name: string; tag: string; link?: string }[];
}

const skillEditorialMap: Record<string, SkillEditorial> = {
  "React.js & Next.js": {
    name: "React.js & Next.js",
    category: "Client & Architecture",
    experience: "2+ yrs",
    role: "Server-driven UI architecture, App Router streaming islands, optimistic cache invalidations, and React 19 Server Actions.",
    subTags: ["App Router", "Server Actions", "Streaming SSR", "Partial Prerendering"],
    projects: [{ name: "HRMS Enterprise", tag: "Trust Nexus", link: "#projects" }, { name: "YOTA Platform", tag: "3D Web", link: "#projects" }],
  },
  "TypeScript & JavaScript": {
    name: "TypeScript & JavaScript",
    category: "Languages & Type Safety",
    experience: "2+ yrs",
    role: "End-to-end type invariants, strict generic constraints, discriminant unions, and compile-time API contract enforcement.",
    subTags: ["Strict Typing", "Generic Constraints", "Discriminant Unions", "ESNext"],
    projects: [{ name: "HRMS Platform", tag: "Enterprise State", link: "#projects" }, { name: "Personal Portfolio", tag: "Type System", link: "#" }],
  },
  "Tailwind CSS & Modern UI": {
    name: "Tailwind CSS & Modern UI",
    category: "Design Systems & UI",
    experience: "2+ yrs",
    role: "Design token architecture, theme token hydration without FOUC, fluid typography, and cybernetic micro-interactions.",
    subTags: ["Custom Tokens", "Glassmorphism", "Fluid Scaling", "WCAG 2.1 AA"],
    projects: [{ name: "HRMS Enterprise", tag: "Admin UI", link: "#projects" }, { name: "Personal Portfolio", tag: "Themed Tokens", link: "#" }],
  },
  "Three.js / WebGL & GSAP": {
    name: "Three.js / WebGL & GSAP",
    category: "Spatial & Motion",
    experience: "1+ yr",
    role: "GPU-accelerated spatial interfaces, procedural shader materials, custom particle meshes, and scroll-linked timeline choreography.",
    subTags: ["3D Shaders", "ScrollTrigger", "GPU Acceleration", "Mesh Choreography"],
    projects: [{ name: "YOTA Technical Hub", tag: "Interactive 3D Hero", link: "#projects" }],
  },
  "ASP.NET MVC & Core (C#)": {
    name: "ASP.NET MVC & Core (C#)",
    category: "Enterprise Backend",
    experience: "2+ yrs",
    role: "High-throughput enterprise RESTful Web APIs, dependency injection lifetimes, middleware filters, and asynchronous pipeline execution.",
    subTags: ["RESTful Web APIs", "Dependency Injection", "Middleware Pipelines", "LINQ Async"],
    projects: [{ name: "Timetable & Records Engine", tag: "Core API", link: "#projects" }, { name: "HRMS Services", tag: "Backend", link: "#projects" }],
  },
  "Entity Framework (EF Core)": {
    name: "Entity Framework (EF Core)",
    category: "Enterprise Backend",
    experience: "1+ yr",
    role: "Code-first migrations, relational schema modeling, compiled LINQ query optimization, and eager/explicit loading execution.",
    subTags: ["Compiled Queries", "Code-First Migrations", "Relational Mapping", "AsNoTracking"],
    projects: [{ name: "Timetable & Records Manager", tag: "Relational Queries", link: "#projects" }],
  },
  "Node.js & Express": {
    name: "Node.js & Express",
    category: "Enterprise Backend",
    experience: "2+ yrs",
    role: "Non-blocking event loop architectures, microservice telemetry proxies, rate-limiting shields, and RESTful API endpoints.",
    subTags: ["Cluster Forking", "Event Loops", "JWT Security", "Rate Limiting"],
    projects: [{ name: "HRMS Enterprise", tag: "Telemetry Proxies", link: "#projects" }, { name: "YOTA Platform", tag: "Event API", link: "#projects" }],
  },
  "PHP & Laravel Basics": {
    name: "PHP & Laravel Basics",
    category: "Enterprise Backend",
    experience: "2+ yrs",
    role: "MVC application structure, Eloquent relational mapping, Blade templating, and REST API controllers.",
    subTags: ["MVC Pattern", "Eloquent ORM", "Blade Engine", "REST Endpoints"],
    projects: [{ name: "YOTA Platform", tag: "Original Portal", link: "#projects" }],
  },
  "Python (FastAPI / Django)": {
    name: "Python (FastAPI / Django)",
    category: "Enterprise Backend",
    experience: "1+ yr",
    role: "High-performance asynchronous endpoints with Pydantic validation, Django ORM relational engines, and data pipeline aggregation.",
    subTags: ["AsyncIO", "Pydantic V2", "Django ORM", "REST Framework"],
    projects: [{ name: "Hotel Management System", tag: "Full-Stack Backend", link: "#projects" }],
  },
  "C++ & Object-Oriented Design": {
    name: "C++ & Object-Oriented Design",
    category: "Systems & Low-Level",
    experience: "3+ yrs",
    role: "Deterministic manual memory management, RAII pointers, custom container data structures, and cache-friendly computational algorithms.",
    subTags: ["RAII Pointers", "Memory Arenas", "Custom STL", "Cache Optimization"],
    projects: [{ name: "Timetable Constraint Engine", tag: "Scheduling Graph Core", link: "#projects" }, { name: "CodeZaar Core", tag: "Evaluation Engine", link: "#projects" }],
  },
  "Data Structures & Algorithms": {
    name: "Data Structures & Algorithms",
    category: "Systems & Low-Level",
    experience: "3+ yrs",
    role: "Graph traversal (Dijkstra, DFS/BFS), dynamic programming state transitions, tree balance, and asymptotic time-complexity optimization.",
    subTags: ["Graph Traversal", "Dynamic Programming", "Time Complexity O(log N)", "Trees"],
    projects: [{ name: "Timetable Scheduling Engine", tag: "Constraint Solver", link: "#projects" }, { name: "CodeZaar Contests", tag: "Algorithmic Challenges", link: "#projects" }],
  },
  "Competitive Programming": {
    name: "Competitive Programming",
    category: "Systems & Low-Level",
    experience: "2+ yrs",
    role: "High-speed algorithmic problem solving, sub-millisecond execution runtime tuning, and CodeZaar championship technical direction.",
    subTags: ["Speed Coding", "Bitmask DP", "Fast I/O Multiplexing", "Contest Director"],
    projects: [{ name: "CodeZaar Championship", tag: "Director & Author", link: "#projects" }],
  },
  "PostgreSQL & Supabase": {
    name: "PostgreSQL & Supabase",
    category: "Data Infrastructure",
    experience: "2+ yrs",
    role: "Zero-Trust Row Level Security (RLS), real-time change data capture (CDC), B-tree & GIN indexing, and relational schema migrations.",
    subTags: ["Row Level Security", "Realtime CDC", "GIN Indexing", "ACID Compliance"],
    projects: [{ name: "Personal Portfolio", tag: "Active Database", link: "#" }, { name: "HRMS Platform", tag: "Data Isolation", link: "#projects" }],
  },
  "MS SQL Server (SSMS)": {
    name: "MS SQL Server (SSMS)",
    category: "Data Infrastructure",
    experience: "2+ yrs",
    role: "Enterprise relational schema architecture, complex joins, stored procedures, execution plan profiling, and transactional integrity.",
    subTags: ["Stored Procedures", "Execution Plans", "Clustered Indexes", "ACID Isolation"],
    projects: [{ name: "Student Records System", tag: "Enterprise Database", link: "#projects" }],
  },
  "MongoDB & SQLite3": {
    name: "MongoDB & SQLite3",
    category: "Data Infrastructure",
    experience: "2+ yrs",
    role: "Document store schema designs, aggregation pipelines, embedded edge databases, and single-file offline state persistence.",
    subTags: ["Document Schemas", "Aggregation Pipelines", "Embedded Storage"],
    projects: [{ name: "Local Record Utilities", tag: "Edge Storage", link: "#projects" }],
  },
  "Docker Containerization": {
    name: "Docker Containerization",
    category: "DevOps & Cloud",
    experience: "1+ yr",
    role: "Multi-stage production build pipelines, minimal Alpine/Distroless images, compose orchestration, and isolated dev containers.",
    subTags: ["Multi-Stage Builds", "Docker Compose", "Distroless Images", "Bridge Networks"],
    projects: [{ name: "HRMS Services & DB", tag: "Container Compose", link: "#projects" }],
  },
  "AWS Cloud & Deployment": {
    name: "AWS Cloud & Deployment",
    category: "DevOps & Cloud",
    experience: "1+ yr",
    role: "Elastic Compute (EC2), S3 asset distribution, IAM least-privilege security policies, and Vercel edge deployment architectures.",
    subTags: ["EC2 Instances", "S3 Storage", "IAM Least-Privilege", "Edge Routing"],
    projects: [{ name: "Web Infrastructure", tag: "Production Edge Cloud", link: "#projects" }],
  },
  "Git & GitHub DevOps": {
    name: "Git & GitHub DevOps",
    category: "DevOps & Cloud",
    experience: "3+ yrs",
    role: "Trunk-based branch choreography, automated PR workflows, GitHub Actions CI/CD test matrices, and semantic release tagging.",
    subTags: ["Branch Protection", "GitHub Actions CI/CD", "Automated Testing", "Trunk-based"],
    projects: [{ name: "Enterprise Repositories", tag: "CI/CD Pipelines", link: "https://github.com/abdullahhashmi" }],
  },
  "Figma UI/UX Prototyping": {
    name: "Figma UI/UX Prototyping",
    category: "Design Systems & UI",
    experience: "2+ yrs",
    role: "Component variant design systems, auto-layout hierarchies, responsive grid tokens, and interactive micro-interaction wireframes.",
    subTags: ["Auto-Layout", "Design Tokens", "Wireframing", "Component Variants"],
    projects: [{ name: "HRMS Design System", tag: "Component Library", link: "#projects" }],
  },
};

function getEditorial(skillName: string, category: string): SkillEditorial {
  if (skillEditorialMap[skillName]) return skillEditorialMap[skillName];
  return {
    name: skillName,
    category: category,
    experience: "2+ yrs",
    role: `Production-ready engineering in ${skillName}, adhering to clean code architecture and performance standards.`,
    subTags: ["Production Tested", "Clean Code"],
    projects: [{ name: "Enterprise Systems", tag: "Verified" }],
  };
}

// 4 Swiss Editorial Domains
const DOMAINS = [
  {
    index: "01",
    title: "SYSTEMS & ALGORITHMIC KERNEL",
    kicker: "Low-Level Computation • Deterministic Memory • O(log N) Efficiency",
    skillNames: [
      "C++ & Object-Oriented Design",
      "Data Structures & Algorithms",
      "Competitive Programming",
    ],
  },
  {
    index: "02",
    title: "FULL-STACK & ENTERPRISE ARCHITECTURE",
    kicker: "Server-Driven UI • CQRS Microservices • End-to-End Type Invariants",
    skillNames: [
      "React.js & Next.js",
      "TypeScript & JavaScript",
      "ASP.NET MVC & Core (C#)",
      "Entity Framework (EF Core)",
      "Node.js & Express",
      "Python (FastAPI / Django)",
      "PHP & Laravel Basics",
    ],
  },
  {
    index: "03",
    title: "SPATIAL, GRAPHICS & CLIENT INTERACTION",
    kicker: "GPU Shaders • 60 FPS Timelines • Design Token Architecture",
    skillNames: [
      "Three.js / WebGL & GSAP",
      "Tailwind CSS & Modern UI",
      "Figma UI/UX Prototyping",
    ],
  },
  {
    index: "04",
    title: "ZERO-TRUST DATA & CLOUD INFRASTRUCTURE",
    kicker: "Row-Level Security • ACID Durability • Containerized Pipelines",
    skillNames: [
      "PostgreSQL & Supabase",
      "MS SQL Server (SSMS)",
      "Docker Containerization",
      "AWS Cloud & Deployment",
      "Git & GitHub DevOps",
      "MongoDB & SQLite3",
    ],
  },
];

export default function SkillsSection({ skills = [] }: SkillsSectionProps) {
  const activeSkillsList = skills.length > 0 ? skills : fallbackSkills;
  const { currentTheme } = useTheme();

  // Floating Cursor State (Dennis Snellenberg Style)
  const sectionRef = useRef<HTMLElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHoveringSection, setIsHoveringSection] = useState(false);
  const [activeHoveredSkill, setActiveHoveredSkill] = useState<SkillEditorial | null>(null);

  // Mobile / Touch expanded skill
  const [expandedMobileSkill, setExpandedMobileSkill] = useState<string | null>(null);

  // Mouse move handler for smooth magnetic floating preview
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setCursorPos({
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  // Helper to dynamically map skills to the 4 domains
  const domainSkills = useMemo(() => {
    const map = new Map<string, Skill[]>();
    DOMAINS.forEach((d) => map.set(d.index, []));

    const getDomainIdx = (skill: Skill): string => {
      const cat = (skill.category || "").toLowerCase();
      const name = (skill.name || "").toLowerCase();

      if (
        cat.includes("system") ||
        cat.includes("algorithm") ||
        cat.includes("low-level") ||
        cat.includes("core") ||
        name.includes("c++") ||
        name.includes("competitive")
      ) {
        return "01";
      }

      if (
        cat.includes("spatial") ||
        cat.includes("motion") ||
        cat.includes("3d") ||
        cat.includes("design") ||
        cat.includes("ui") ||
        name.includes("three") ||
        name.includes("figma") ||
        name.includes("tailwind")
      ) {
        return "03";
      }

      if (
        cat.includes("data") ||
        cat.includes("cloud") ||
        cat.includes("devops") ||
        cat.includes("database") ||
        name.includes("postgres") ||
        name.includes("sql server") ||
        name.includes("docker") ||
        name.includes("aws") ||
        name.includes("mongo") ||
        name.includes("git")
      ) {
        return "04";
      }

      return "02"; // Full-Stack & Enterprise Architecture
    };

    activeSkillsList.forEach((skill) => {
      const dIdx = getDomainIdx(skill);
      const list = map.get(dIdx) || [];
      list.push(skill);
      map.set(dIdx, list);
    });

    return map;
  }, [activeSkillsList]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHoveringSection(true)}
      onMouseLeave={() => {
        setIsHoveringSection(false);
        setActiveHoveredSkill(null);
      }}
      className="relative w-full py-28 px-4 sm:px-8 lg:px-14 theme-surface overflow-hidden border-t transition-colors duration-500"
      style={{ borderColor: currentTheme.border_color }}
    >
      {/* Subtle Ambient Background Accent */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] blur-[200px] rounded-full pointer-events-none opacity-20 transition-all duration-700"
        style={{ backgroundColor: currentTheme.glow_color }}
      />

      <div className="relative max-w-7xl mx-auto flex flex-col gap-20">
        {/* ============================================================ */}
        {/* 1. EDITORIAL HEADER (SWISS MINIMALIST AESTHETIC) */}
        {/* ============================================================ */}
        <ScrollReveal direction="up" delay={50}>
          <div
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-10"
            style={{ borderColor: currentTheme.border_color }}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-[1px] w-6" style={{ backgroundColor: currentTheme.primary }} />
                <span
                  className="text-xs font-mono tracking-widest uppercase font-bold"
                  style={{ color: currentTheme.primary }}
                >
                  // 04 — TECHNICAL SKILLS & CAPABILITIES
                </span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-normal tracking-tight text-white font-carl-brown">
                Skills & Engineering Domains
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed font-sans">
              A borderless, typographic index of technical disciplines. From deterministic C++ systems
              and algorithmic problem solving to enterprise ASP.NET microservices and spatial interfaces.
            </p>
          </div>
        </ScrollReveal>

        {/* ============================================================ */}
        {/* 2. SWISS TYPOGRAPHIC LIST (DENNIS SNELLENBERG STYLE) */}
        {/* ============================================================ */}
        <div className="flex flex-col">
          {DOMAINS.map((domain, domainIdx) => {
            const rawSkills = domainSkills.get(domain.index) || [];
            // Use dynamic skills if available, or fallback to domain definition
            const displaySkills =
              rawSkills.length > 0
                ? rawSkills
                : domain.skillNames.map((name, idx) => ({
                    id: `fallback-${domain.index}-${idx}`,
                    name,
                    category: domain.title,
                    proficiency: 90,
                    experience_years: "2+ yrs",
                    icon_name: null,
                    featured: true,
                    display_order: idx + 1,
                    created_at: new Date().toISOString(),
                  }));
            return (
              <ScrollReveal key={domain.index} direction="up" delay={domainIdx * 80 + 100}>
                <div
                  className="group relative border-t py-12 sm:py-16 transition-all duration-500"
                  style={{ borderColor: currentTheme.border_color }}
                >
                  {/* Subtle Background Glow on Row Hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `linear-gradient(to right, color-mix(in srgb, ${currentTheme.primary} 4%, transparent), transparent)`,
                    }}
                  />

                  <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Domain Identifier & Subtitle (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <span
                          className="font-mono text-xs sm:text-sm font-bold tracking-widest transition-colors duration-300"
                          style={{ color: currentTheme.primary }}
                        >
                          {domain.index}
                        </span>
                        <span className="h-[1px] w-4 bg-zinc-700" />
                        <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
                          Domain
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug font-tech">
                        {domain.title}
                      </h3>

                      <p className="text-xs text-zinc-400 font-mono mt-1 leading-relaxed">
                        {domain.kicker}
                      </p>
                    </div>

                    {/* Fluid Typographic Technology List (8 cols) */}
                    <div className="lg:col-span-8 flex flex-wrap items-baseline gap-x-6 gap-y-4">
                      {displaySkills.map((skill) => {
                        const skillName = skill.name;
                        const editorial = getEditorial(skillName, domain.title);
                        // Ensure dynamic experience_years from DB is reflected
                        if (skill.experience_years) {
                          editorial.experience = skill.experience_years;
                        }
                        const isHovered = activeHoveredSkill?.name === skillName;
                        const isExpandedMobile = expandedMobileSkill === skillName;

                        return (
                          <div key={skill.id || skillName} className="inline-flex flex-col">
                            <button
                              onMouseEnter={() => setActiveHoveredSkill(editorial)}
                              onClick={() =>
                                setExpandedMobileSkill(
                                  expandedMobileSkill === skillName ? null : skillName
                                )
                              }
                              className="group/skill relative inline-flex items-center gap-2 text-left cursor-pointer text-base sm:text-xl md:text-2xl font-medium transition-all duration-300 select-none py-1 font-tech"
                              style={{
                                color: isHovered ? currentTheme.primary : "rgba(255, 255, 255, 0.85)",
                                transform: isHovered ? "translateX(4px)" : "none",
                              }}
                            >
                              <span className="transition-colors duration-300">
                                {skillName}
                              </span>

                              {/* Subtle Experience Pill Next to Name */}
                              <span
                                className="text-[10px] font-mono px-2 py-0.5 rounded-full border opacity-60 group-hover/skill:opacity-100 transition-opacity"
                                style={{
                                  borderColor: isHovered ? currentTheme.primary : currentTheme.border_color,
                                  backgroundColor: isHovered
                                    ? `color-mix(in srgb, ${currentTheme.primary} 15%, transparent)`
                                    : "transparent",
                                  color: isHovered ? currentTheme.primary : currentTheme.foreground,
                                }}
                              >
                                {skill.experience_years || editorial.experience}
                              </span>

                              {/* Subtle Underline on Hover */}
                              <span
                                className="absolute bottom-0 left-0 h-[1px] transition-all duration-300"
                                style={{
                                  width: isHovered ? "100%" : "0%",
                                  backgroundColor: currentTheme.primary,
                                }}
                              />
                            </button>

                            {/* Mobile Accordion Drawer (for touch screens where cursor hover isn't present) */}
                            {isExpandedMobile && (
                              <div
                                className="lg:hidden mt-3 p-4 rounded-2xl border text-xs font-mono space-y-2 animate-in fade-in duration-300"
                                style={{
                                  backgroundColor: currentTheme.card_bg,
                                  borderColor: currentTheme.border_color,
                                }}
                              >
                                <p className="text-zinc-300 leading-relaxed font-sans">{editorial.role}</p>
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                  {editorial.subTags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-2 py-0.5 rounded-md border text-[10px] text-zinc-400"
                                      style={{ borderColor: currentTheme.border_color }}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                <div className="pt-2 border-t flex items-center justify-between text-[11px]" style={{ borderColor: currentTheme.border_color }}>
                                  <span className="text-zinc-400">Proven in:</span>
                                  <span style={{ color: currentTheme.primary }}>{editorial.projects[0]?.name}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* 3. SIGNATURE FLOATING CURSOR PREVIEW CARD (DESKTOP ONLY) */}
        {/* ============================================================ */}
        {activeHoveredSkill && (
          <div
            className="hidden lg:block pointer-events-none fixed z-50 transition-all duration-75 ease-out"
            style={{
              left: `${cursorPos.x + 16}px`,
              top: `${cursorPos.y + 16}px`,
              transform: `${cursorPos.x > (typeof window !== "undefined" ? window.innerWidth - 360 : 900) ? "translateX(-105%)" : "translateX(0)"} ${cursorPos.y > (typeof window !== "undefined" ? window.innerHeight - 300 : 600) ? "translateY(-95%)" : "translateY(0)"}`,
            }}
          >
            <div
              className="w-80 rounded-2xl border p-5 backdrop-blur-2xl shadow-2xl space-y-3.5 transition-all duration-300 animate-in fade-in zoom-in-95"
              style={{
                backgroundColor: "rgba(9, 9, 12, 0.88)",
                borderColor: currentTheme.primary,
                boxShadow: `0 20px 40px -10px ${currentTheme.glow_color}`,
              }}
            >
              {/* Header: Category & Experience */}
              <div className="flex items-center justify-between border-b pb-2.5" style={{ borderColor: currentTheme.border_color }}>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                  {activeHoveredSkill.category}
                </span>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-mono border"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${currentTheme.primary} 15%, transparent)`,
                    borderColor: currentTheme.primary,
                    color: currentTheme.primary,
                  }}
                >
                  {activeHoveredSkill.experience} in Production
                </span>
              </div>

              {/* Skill Title */}
              <h4 className="text-base font-bold text-white leading-snug">
                {activeHoveredSkill.name}
              </h4>

              {/* Architectural Role Description */}
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {activeHoveredSkill.role}
              </p>

              {/* Sub-competencies Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeHoveredSkill.subTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono border text-zinc-400"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      borderColor: currentTheme.border_color,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Verified Project Link */}
              <div
                className="pt-2.5 border-t flex items-center justify-between text-[11px] font-mono"
                style={{ borderColor: currentTheme.border_color }}
              >
                <span className="text-zinc-400 flex items-center gap-1">
                  <Shield className="w-3 h-3" style={{ color: currentTheme.primary }} />
                  <span>Verified In:</span>
                </span>
                <span className="font-semibold text-white truncate max-w-[150px]">
                  {activeHoveredSkill.projects[0]?.name}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 4. MINIMALIST EDITORIAL TOOLCHAIN & SYSTEMS FOOTER */}
        {/* ============================================================ */}
        <ScrollReveal direction="up" delay={200}>
          <div
            className="border-t pt-10 flex flex-col md:flex-row md:items-center justify-between gap-6 font-mono text-xs text-zinc-400"
            style={{ borderColor: currentTheme.border_color }}
          >
            <div className="flex items-center gap-2.5">
              <Terminal className="w-4 h-4" style={{ color: currentTheme.primary }} />
              <span className="text-white uppercase tracking-wider font-bold">
                Supported Ecosystem:
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-zinc-400">
              {["Docker", "Git & GitHub", "Linux / WSL", "Visual Studio 2022", "VS Code", "Postman", "Figma UI/UX", "MS SQL Server (SSMS)", "Supabase Studio", "AWS S3 / EC2"].map((tool, idx) => (
                <span key={tool} className="flex items-center gap-3">
                  <span className="hover:text-white transition-colors">{tool}</span>
                  {idx < 9 && <span className="text-zinc-600">/</span>}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
