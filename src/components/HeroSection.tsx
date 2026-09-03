"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Download,
  Award,
} from "lucide-react";
import { Profile } from "@/types/database";
import { useTheme } from "@/context/ThemeContext";

interface HeroSectionProps {
  profile?: Profile;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  const [emailInput, setEmailInput] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const { currentTheme } = useTheme();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Visitor (Hero Quick Collaborate)",
          email: emailInput.trim(),
          subject: "Direct Collaboration Inquiry from Hero Section",
          message: "Visitor submitted email to initiate project collaboration from the hero section.",
        }),
      });
    } catch {
      // continue to UI feedback
    }
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
      setEmailInput("");
    }, 4000);
  };

  const name = profile?.name || "Abdullah Bin Zubair Hashmi";
  const resumeUrl = profile?.resume_url || "/Abdullah_Bin_Zubair_Hashmi_CV__3_.pdf";

  return (
    <div className="w-full theme-surface selection:bg-white/20 selection:text-white transition-colors duration-500">
      {/* ============================================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================================ */}
      <section
        id="home"
        className="relative min-h-[90vh] lg:min-h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-8 lg:px-14 pt-24 sm:pt-32 pb-10 sm:pb-14 theme-surface"
        style={{ isolation: "isolate" }}
      >
        {/* Dynamic theme radial vignette & ambient background glow */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] transition-all duration-500"
          style={{
            background: `radial-gradient(ellipse at 50% 40%, ${currentTheme.glow_color} 0%, transparent 70%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none z-[1]" />

        {/* --- Desktop Center / Background Portrait Layer (z-2) --- */}
        <div className="hidden lg:flex absolute bottom-0 lg:left-[54%] xl:left-[56%] 2xl:left-[57%] -translate-x-1/2 w-[350px] lg:w-[380px] xl:w-[440px] 2xl:w-[480px] pointer-events-none z-[2] items-end justify-center transition-all duration-300">
          <Image
            src="/gallery/black-me.png"
            alt={name}
            width={800}
            height={1000}
            priority
            className="w-full h-auto object-contain select-none [mask-image:linear-gradient(to_bottom,black_82%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_82%,transparent_100%)]"
          />
        </div>

        {/* --- Hero Main Content Grid (z-20) --- */}
        <div className="relative z-20 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto pt-6 sm:pt-10 pb-6">

          {/* Left Column: Heading & Description & CTAs (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            {/* Microsoft Certified & Tagline Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] sm:text-[11px] font-mono backdrop-blur-md transition-all duration-300"
                style={{
                  backgroundColor: `color-mix(in srgb, ${currentTheme.primary} 12%, transparent)`,
                  borderColor: `color-mix(in srgb, ${currentTheme.primary} 30%, transparent)`,
                  color: currentTheme.primary,
                }}
              >
                <Award className="w-3.5 h-3.5 shrink-0" />
                <span className="font-semibold">Microsoft Certified</span>
                <span className="opacity-80 truncate">· Power Platform Developer</span>
              </div>
            </div>

            {/* Editorial Headline: Paradiso & Silver Garden Italic */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-normal tracking-tight text-white leading-[1.08] font-paradiso">
              Building <br />
              systems that <br />
              <span
                className="transition-colors duration-500 font-silver-garden-italic"
                style={{ color: currentTheme.primary }}
              >
                stand out
              </span>
            </h1>

            {/* Mobile / Tablet Portrait Display (Cleanly positioned between headline and bio) */}
            <div className="flex lg:hidden justify-center items-center my-6 relative">
              <div className="relative w-[220px] sm:w-[280px] md:w-[320px] aspect-[4/5] flex items-center justify-center">
                <div
                  className="absolute inset-0 blur-2xl rounded-full opacity-40 pointer-events-none"
                  style={{ backgroundColor: currentTheme.glow_color }}
                />
                <Image
                  src="/gallery/black-me.png"
                  alt={name}
                  width={600}
                  height={750}
                  priority
                  className="w-full h-auto object-contain relative z-10 select-none [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
                />
              </div>
            </div>

            {/* Description from Resume */}
            <p className="mt-2 sm:mt-6 text-xs sm:text-sm text-zinc-300 max-w-md leading-relaxed font-sans">
              Based in Islamabad & Rawalpindi. <strong className="text-white">Microsoft Certified Power Platform Developer Associate</strong> & Final-Year IT Bachelor at Bahria University (<strong className="text-white font-mono">3.85 CGPA</strong>), specializing in Next.js, C#, ASP.NET Core, C++ systems, and 2D/3D web interactive animations.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="#projects"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-xs sm:text-sm font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg cursor-pointer text-center"
                style={{
                  backgroundColor: currentTheme.primary,
                  color: currentTheme.background,
                  boxShadow: `0 4px 20px ${currentTheme.glow_color}`,
                }}
              >
                <span>Explore Projects</span>
              </Link>
              <a
                href={resumeUrl}
                download="Abdullah_Bin_Zubair_Hashmi_CV.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-xs sm:text-sm font-medium backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-center"
                style={{
                  backgroundColor: currentTheme.card_bg,
                  borderColor: currentTheme.border_color,
                  color: currentTheme.foreground,
                }}
              >
                <Download className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
                <span>Download CV</span>
              </a>
            </div>

            {/* Partners / Tech Stacks Logo Row */}
            <div className="mt-8 sm:mt-14">
              <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-2.5">
                Core Engineering Stack
              </p>
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-6 text-[11px] sm:text-xs font-semibold tracking-wider text-zinc-400">
                <span className="flex items-center gap-1 hover:text-white transition-colors cursor-default">
                  <span className="font-black" style={{ color: currentTheme.primary }}>⚛</span> Next.js & React
                </span>
                <span className="flex items-center gap-1 hover:text-white transition-colors cursor-default">
                  <span style={{ color: currentTheme.accent }}>✦</span> ASP.NET Core
                </span>
                <span className="flex items-center gap-1 hover:text-white transition-colors cursor-default">
                  <span style={{ color: currentTheme.accent }}>❖</span> C++ & DSA
                </span>
                <span className="flex items-center gap-1 hover:text-white transition-colors cursor-default">
                  <span style={{ color: currentTheme.primary }}>◈</span> PostgreSQL
                </span>
                <span className="flex items-center gap-1 hover:text-white transition-colors cursor-default">
                  <span style={{ color: currentTheme.accent }}>☁</span> Three.js
                </span>
              </div>
            </div>
          </div>

          {/* Center Column: Disciplinary tags (Positioned with proper breathing room below navbar) */}
          <div className="hidden lg:flex lg:col-span-4 relative flex-col items-center justify-between min-h-[480px] xl:min-h-[530px] pointer-events-none">
            <div className="w-full text-right space-y-1 pointer-events-auto pt-8 xl:pt-14 pr-2">
              <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                /focus & credentials
              </p>
              <p className="text-[11px] font-bold tracking-widest" style={{ color: currentTheme.primary }}>
                MICROSOFT CERTIFIED
              </p>
              <p className="text-[11px] font-bold tracking-widest text-zinc-200">
                FULL-STACK APPS
              </p>
              <p className="text-[11px] font-bold tracking-widest text-zinc-200">
                AI & IOT XDR
              </p>
              <p className="text-[11px] font-bold tracking-widest text-zinc-200">
                3D WEB & GRAPHICS
              </p>
            </div>
          </div>

          {/* Right Column: Floating Glass Cards (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4 justify-center mt-4 lg:mt-0">

            {/* 1. Metric / Stat Bento Card */}
            <div
              className="rounded-3xl border p-4 sm:p-5 backdrop-blur-2xl shadow-2xl flex flex-col gap-3.5 transition-all duration-300"
              style={{
                backgroundColor: currentTheme.card_bg,
                borderColor: currentTheme.border_color,
                boxShadow: `0 10px 30px -10px ${currentTheme.glow_color}`,
              }}
            >
              <div className="grid grid-cols-2 gap-2.5">
                {/* 3.85 CGPA Stat */}
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3 flex flex-col justify-between">
                  <span
                    className="text-2xl sm:text-3xl font-black font-mono"
                    style={{ color: currentTheme.primary }}
                  >
                    3.85
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase mt-1.5">
                    CGPA / 4.00
                  </span>
                </div>

                {/* YOTA Director Stat */}
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3 flex flex-col justify-between">
                  <span
                    className="text-2xl sm:text-3xl font-black font-mono"
                    style={{ color: currentTheme.accent }}
                  >
                    Lead
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase mt-1.5">
                    YOTA Dev Team
                  </span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center justify-between pt-1 border-t border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: currentTheme.primary }}
                  />
                  <span className="text-[11px] font-mono text-zinc-300">
                    Open for Eng Roles
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">
                  Full-Stack
                </span>
              </div>
            </div>

            {/* 2. Quick Connect / Project Inquiry Box */}
            <div
              className="rounded-3xl border p-4 sm:p-5 backdrop-blur-2xl shadow-xl flex flex-col gap-3 transition-all duration-300"
              style={{
                backgroundColor: currentTheme.card_bg,
                borderColor: currentTheme.border_color,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-white tracking-wide">
                    Initiate Collaboration
                  </p>
                  <p className="text-[10px] text-zinc-400 font-mono">
                    Direct Inquiry Response
                  </p>
                </div>
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: currentTheme.primary }}
                />
              </div>

              <form onSubmit={handleEmailSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 transition-colors"
                />
                <button
                  type="submit"
                  className="rounded-xl px-3 py-2 text-xs font-semibold hover:opacity-90 active:scale-95 transition-all cursor-pointer shrink-0"
                  style={{
                    backgroundColor: currentTheme.primary,
                    color: currentTheme.background,
                  }}
                >
                  {emailSent ? "Sent!" : "Send"}
                </button>
              </form>
            </div>

          </div>

        </div>

        {/* --- Hero Footer Status Bar (z-20) --- */}
        <div
          className="relative z-20 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between pt-6 border-t gap-3 text-[10px] sm:text-xs font-mono text-zinc-400"
          style={{ borderColor: currentTheme.border_color }}
        >
          <div className="flex items-center gap-3">
            <span>ISLAMABAD // RAWALPINDI</span>
            <span>•</span>
            <span style={{ color: currentTheme.accent }}>BAHRIA UNIVERSITY 2026</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-500">
            <span>SCROLL FOR PROJECTS</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </section>
    </div>
  );
}
