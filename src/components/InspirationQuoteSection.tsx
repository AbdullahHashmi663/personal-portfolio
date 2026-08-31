"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { InspirationQuote } from "@/types/database";
import { fallbackQuote } from "@/lib/data";
import { useTheme } from "@/context/ThemeContext";

interface InspirationQuoteSectionProps {
  quote?: InspirationQuote;
}

export default function InspirationQuoteSection({
  quote = fallbackQuote,
}: InspirationQuoteSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { currentTheme } = useTheme();

  // Scroll parallax effects for dynamic kinetic typography
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Parallax subtle shifts for alternating words
  const shiftLeft = useTransform(smoothProgress, [0, 1], [-20, 20]);
  const shiftRight = useTransform(smoothProgress, [0, 1], [20, -20]);

  const handle = quote?.handle || "@ABDULLAH_HASHMI";
  const line1 = quote?.line1 || "MAKE";
  const line2 = quote?.line2 || "SMART";
  const line3 = quote?.line3 || "CHOICES";
  const line4A = quote?.line4_a || "IN";
  const line4B = quote?.line4_b || "YOUR";
  const line5 = quote?.line5 || "LIFE";
  const subtext = quote?.subtext || "Empower yourself by making decisions that reflect your true goals.";

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen pt-28 sm:pt-36 pb-16 sm:pb-24 px-5 sm:px-12 lg:px-24 theme-surface overflow-hidden transition-colors duration-500 flex flex-col justify-between"
      style={{
        backgroundColor: currentTheme.background,
        color: currentTheme.foreground,
      }}
    >
      {/* Dynamic Ambient Background Glow */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[400px] blur-[180px] rounded-full pointer-events-none opacity-35 transition-all duration-500"
        style={{ backgroundColor: currentTheme.glow_color }}
      />

      <div className="relative w-full max-w-7xl mx-auto flex flex-col justify-between flex-1">
        
        {/* ============================================================ */}
        {/* 1. TOP-LEFT METADATA SIGNATURE */}
        {/* ============================================================ */}
        <div className="w-full flex items-center justify-between pb-6 sm:pb-10 border-b" style={{ borderColor: currentTheme.border_color }}>
          <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-zinc-300 uppercase">
            {handle}
          </span>
          <span className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-widest">
            // PHILOSOPHY & ETHOS
          </span>
        </div>

        {/* ============================================================ */}
        {/* 2. MASSIVE FULL-BLEED SWISS TYPOGRAPHIC POSTER LAYOUT */}
        {/* ============================================================ */}
        <div className="relative w-full flex flex-col items-end text-right select-none my-auto py-6 sm:py-10 space-y-0.5 sm:space-y-1">
          
          {/* Line 1: MAKE (Bold Solid) */}
          <motion.div
            style={{ x: shiftRight }}
            className="w-full flex justify-end"
          >
            <h2
              className="font-black tracking-tighter uppercase text-[12vw] sm:text-[11vw] md:text-[9.5vw] lg:text-[8.5vw] xl:text-[8vw] leading-[0.84] transition-colors duration-500"
              style={{ color: currentTheme.foreground }}
            >
              {line1}
            </h2>
          </motion.div>

          {/* Line 2: SMART (Muted Grey / Accent) */}
          <motion.div
            style={{ x: shiftLeft }}
            className="w-full flex justify-end"
          >
            <h2
              className="font-black tracking-tighter uppercase text-[12vw] sm:text-[11vw] md:text-[9.5vw] lg:text-[8.5vw] xl:text-[8vw] leading-[0.84] transition-colors duration-500"
              style={{
                color: currentTheme.accent,
                opacity: 0.5,
              }}
            >
              {line2}
            </h2>
          </motion.div>

          {/* Line 3: CHOICES (Muted Grey / Accent) */}
          <motion.div
            style={{ x: shiftRight }}
            className="w-full flex justify-end"
          >
            <h2
              className="font-black tracking-tighter uppercase text-[12vw] sm:text-[11vw] md:text-[9.5vw] lg:text-[8.5vw] xl:text-[8vw] leading-[0.84] transition-colors duration-500"
              style={{
                color: currentTheme.accent,
                opacity: 0.5,
              }}
            >
              {line3}
            </h2>
          </motion.div>

          {/* Bottom Grid: Left Subtext & Right (IN YOUR + LIFE) */}
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 items-end pt-2 sm:pt-4">
            
            {/* Lower-Left Subtext nestled in the negative space */}
            <div className="md:col-span-6 text-left order-2 md:order-1 pb-1 sm:pb-3">
              <p
                className="text-xs sm:text-base md:text-lg lg:text-xl font-bold leading-relaxed max-w-sm transition-colors duration-500"
                style={{
                  color: currentTheme.accent,
                  opacity: 0.85,
                }}
              >
                {subtext}
              </p>
            </div>

            {/* Right: IN YOUR + LIFE */}
            <div className="md:col-span-6 flex flex-col items-end text-right order-1 md:order-2 space-y-0.5 sm:space-y-1">
              {/* Row 4: IN YOUR */}
              <div className="flex items-end justify-end gap-2 sm:gap-4">
                <span
                  className="font-black tracking-tighter uppercase text-[12vw] sm:text-[11vw] md:text-[9.5vw] lg:text-[8.5vw] xl:text-[8vw] leading-[0.84] transition-colors duration-500"
                  style={{
                    color: currentTheme.accent,
                    opacity: 0.5,
                  }}
                >
                  {line4A}
                </span>
                <span
                  className="font-black tracking-tighter uppercase text-[12vw] sm:text-[11vw] md:text-[9.5vw] lg:text-[8.5vw] xl:text-[8vw] leading-[0.84] transition-colors duration-500"
                  style={{ color: currentTheme.foreground }}
                >
                  {line4B}
                </span>
              </div>

              {/* Row 5: LIFE */}
              <motion.div
                style={{ x: shiftLeft }}
                className="w-full flex justify-end"
              >
                <h2
                  className="font-black tracking-tighter uppercase text-[12vw] sm:text-[11vw] md:text-[9.5vw] lg:text-[8.5vw] xl:text-[8vw] leading-[0.84] transition-colors duration-500"
                  style={{ color: currentTheme.foreground }}
                >
                  {line5}
                </h2>
              </motion.div>
            </div>

          </div>

        </div>

        {/* ============================================================ */}
        {/* 3. BOTTOM SUBTLE BORDER */}
        {/* ============================================================ */}
        <div
          className="w-full pt-6 sm:pt-10 border-t flex items-center justify-between text-[10px] sm:text-xs font-mono text-zinc-500"
          style={{ borderColor: currentTheme.border_color }}
        >
          <span>SWISS TYPOGRAPHIC ETHOS</span>
          <span>BAHRIA UNIVERSITY 2026</span>
        </div>

      </div>
    </section>
  );
}
