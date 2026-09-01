"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useTheme } from "@/context/ThemeContext";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const { currentTheme } = useTheme();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3.5px] z-[99999] pointer-events-none bg-black/20 backdrop-blur-[2px]">
      <motion.div
        className="h-full w-full origin-left transition-all duration-300"
        style={{
          scaleX,
          background: `linear-gradient(90deg, ${currentTheme?.accent || "var(--accent)"}, ${currentTheme?.primary || "var(--primary)"})`,
          boxShadow: `0 0 14px ${currentTheme?.glow_color || "var(--glow-color)"}, 0 0 5px ${currentTheme?.primary || "var(--primary)"}`,
        }}
      />
    </div>
  );
}
