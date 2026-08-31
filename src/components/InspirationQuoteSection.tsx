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
  const shiftLeft = useTransform(smoothProgress, [0, 1], [-40, 40]);
  const shiftRight = useTransform(smoothProgress, [0, 1], [40, -40]);

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
      className="relative w-full min-h-screen py-24 sm:py-32 lg:py-40 px-6 sm:px-12 lg:px-24 theme-surface overflow-hidden transition-colors duration-500 flex flex-col justify-between"
      style={{
        backgroundColor: currentTheme.background,
        color: currentTheme.foreground,
      }}
    >
      {/* Dynamic Ambient Background Glow */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[500px] blur-[200px] rounded-full pointer-events-none opacity-40 transition-all duration-500"
        style={{ backgroundColor: currentTheme.glow_color }}
      />

      <div className="relative w-full max-w-7xl mx-auto flex flex-col justify-between flex-1">
        
        {/* ============================================================ */}
        {/* 1. TOP-LEFT METADATA SIGNATURE */}
        {/* ============================================================ */}
        <div className="w-full flex items-center justify-between pb-8 sm:pb-12">
          <span className="text-sm sm:text-base font-mono font-bold tracking-widest text-zinc-300 uppercase">
            {handle}
          </span>
          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline">
            // PHILOSOPHY & ETHOS
          </span>
        </div>

        {/* ============================================================ */}
        {/* 2. MASSIVE FULL-BLEED SWISS TYPOGRAPHIC POSTER LAYOUT */}
        {/* ============================================================ */}
        <div className="relative w-full flex flex-col items-end text-right select-none my-auto">
          
          {/* Line 1: MAKE (Bold Solid) */}
          <motion.div
            style={{ x: shiftRight }}
            className="w-full flex justify-end"
          >
            <h2
              className="font-black tracking-tighter uppercase text-[17vw] sm:text-[15vw] lg:text-[13vw] xl:text-[12vw] leading-[0.84] transition-colors duration-500"
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
              className="font-black tracking-tighter uppercase text-[17vw] sm:text-[15vw] lg:text-[13vw] xl:text-[12vw] leading-[0.84] transition-colors duration-500"
              style={{
                color: currentTheme.accent,
                opacity: 0.55,
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
              className="font-black tracking-tighter uppercase text-[17vw] sm:text-[15vw] lg:text-[13vw] xl:text-[12vw] leading-[0.84] transition-colors duration-500"
              style={{
                color: currentTheme.accent,
                opacity: 0.55,
              }}
            >
              {line3}
            </h2>
          </motion.div>

          {/* Line 4 & Subtext Row */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-0 sm:my-1">
            
            {/* Lower-Left Subtext nestled in the negative space */}
            <div className="lg:col-span-6 text-left order-2 lg:order-1 pt-6 lg:pt-0">
              <p
                className="text-base sm:text-xl lg:text-2xl font-bold leading-snug max-w-xs sm:max-w-md transition-colors duration-500"
                style={{
                  color: currentTheme.accent,
                  opacity: 0.8,
                }}
              >
                {subtext}
              </p>
            </div>

            {/* Right Typography: IN YOUR */}
            <div className="lg:col-span-6 flex justify-end items-end gap-3 sm:gap-6 order-1 lg:order-2">
              <span
                className="font-black tracking-tighter uppercase text-[17vw] sm:text-[15vw] lg:text-[13vw] xl:text-[12vw] leading-[0.84] transition-colors duration-500"
                style={{
                  color: currentTheme.accent,
                  opacity: 0.55,
                }}
              >
                {line4A}
              </span>
              <span
                className="font-black tracking-tighter uppercase text-[17vw] sm:text-[15vw] lg:text-[13vw] xl:text-[12vw] leading-[0.84] transition-colors duration-500"
                style={{ color: currentTheme.foreground }}
              >
                {line4B}
              </span>
            </div>
          </div>

          {/* Line 5: LIFE (Bold Solid) */}
          <motion.div
            style={{ x: shiftLeft }}
            className="w-full flex justify-end"
          >
            <h2
              className="font-black tracking-tighter uppercase text-[17vw] sm:text-[15vw] lg:text-[13vw] xl:text-[12vw] leading-[0.84] transition-colors duration-500"
              style={{ color: currentTheme.foreground }}
            >
              {line5}
            </h2>
          </motion.div>

        </div>

        {/* ============================================================ */}
        {/* 3. BOTTOM SUBTLE BORDER */}
        {/* ============================================================ */}
        <div
          className="w-full pt-12 sm:pt-16 border-b flex items-center justify-between text-xs font-mono text-zinc-500"
          style={{ borderColor: currentTheme.border_color }}
        />

      </div>
    </section>
  );
}
