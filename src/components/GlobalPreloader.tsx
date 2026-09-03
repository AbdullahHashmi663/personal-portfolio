"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "@/context/ThemeContext";

export default function GlobalPreloader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [statusText, setStatusText] = useState("INITIALIZING SYSTEM...");
  const { currentTheme } = useTheme();

  useEffect(() => {
    // Disable scrolling while loader is active
    document.body.style.overflow = "hidden";

    const stages = [
      { threshold: 20, text: "INITIALIZING SYSTEMS KERNEL..." },
      { threshold: 45, text: "LOADING ARCHITECTURE TELEMETRY..." },
      { threshold: 70, text: "APPLYING DYNAMIC THEME TOKENS..." },
      { threshold: 90, text: "ENGAGING HARDWARE ACCELERATION..." },
      { threshold: 100, text: "SYSTEM READY · WELCOME" },
    ];

    let current = 0;
    const interval = setInterval(() => {
      // Smooth incremental progress
      const increment = Math.floor(Math.random() * 8) + 3;
      current = Math.min(current + increment, 100);
      setProgress(current);

      const matchedStage = stages.find((s) => current <= s.threshold);
      if (matchedStage) {
        setStatusText(matchedStage.text);
      }

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          document.body.style.overflow = "";
        }, 500);
      }
    }, 45);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="global-preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: "-100%",
            opacity: 0.9,
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-between p-8 sm:p-14 select-none pointer-events-auto"
          style={{
            backgroundColor: currentTheme.background,
            color: currentTheme.foreground,
          }}
        >
          {/* Subtle Ambient Vignette Glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: `radial-gradient(ellipse at 50% 50%, ${currentTheme.glow_color} 0%, transparent 75%)`,
            }}
          />

          {/* Top Telemetry Header */}
          <div className="relative z-10 w-full max-w-5xl flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full animate-ping"
                style={{ backgroundColor: currentTheme.primary }}
              />
              <span className="text-zinc-300 font-semibold tracking-wider">
                PORTFOLIO OS // V2.6
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-zinc-500">
              <span>LATENCY: 0.04ms</span>
              <span>•</span>
              <span style={{ color: currentTheme.accent }}>{currentTheme.name}</span>
            </div>
          </div>

          {/* Center Brand Identity & Emblem */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-lg space-y-6">
            
            {/* Glowing Brand Logo Emblem */}
            <div className="relative flex items-center justify-center">
              {/* Outer Cybernetic Orbital Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-full border border-dashed opacity-40 pointer-events-none"
                style={{ borderColor: currentTheme.primary }}
              />

              {/* Pulsing Ambient Glow */}
              <div
                className="absolute -inset-2 rounded-full blur-xl opacity-60 animate-pulse pointer-events-none"
                style={{ backgroundColor: currentTheme.glow_color }}
              />

              {/* Central Logo Container */}
              <div
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 p-1 shadow-2xl backdrop-blur-md"
                style={{
                  backgroundColor: currentTheme.card_bg,
                  borderColor: currentTheme.border_color,
                  boxShadow: `0 0 35px -5px ${currentTheme.glow_color}`,
                }}
              >
                <Image
                  src="/gallery/logo.png"
                  alt="Abdullah Bin Zubair Hashmi Logo"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover rounded-full select-none"
                  priority
                />
              </div>
            </div>

            {/* Name & Credentials */}
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-widest text-white uppercase">
                Abdullah Bin Zubair Hashmi
              </h1>
              <p className="text-xs font-mono text-zinc-400 tracking-wider">
                Full-Stack Developer · Systems Engineer · C++ & ASP.NET
              </p>
              
              <div className="pt-1 flex justify-center">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono border"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${currentTheme.primary} 12%, transparent)`,
                    borderColor: `color-mix(in srgb, ${currentTheme.primary} 30%, transparent)`,
                    color: currentTheme.primary,
                  }}
                >
                  <span>Microsoft Certified · Power Platform Developer Associate</span>
                </span>
              </div>
            </div>

          </div>

          {/* Bottom Progress Bar & Telemetry Status */}
          <div className="relative z-10 w-full max-w-md space-y-3">
            
            {/* Numeric Percentage & Status */}
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400 text-[11px] tracking-wider">
                {statusText}
              </span>
              <span
                className="text-sm font-bold font-mono"
                style={{ color: currentTheme.primary }}
              >
                {progress}%
              </span>
            </div>

            {/* Sleek Glowing Progress Bar */}
            <div
              className="w-full h-1.5 rounded-full overflow-hidden p-0.5 border"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderColor: currentTheme.border_color,
              }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(to right, ${currentTheme.accent}, ${currentTheme.primary})`,
                  boxShadow: `0 0 12px ${currentTheme.glow_color}`,
                }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-600">
              <span>INITIAL BOOT SEQUENCE</span>
              <span>60 FPS SMOOTH COMPOSITOR</span>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
