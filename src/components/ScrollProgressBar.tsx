"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3.5px] z-[99999] pointer-events-none bg-white/5 backdrop-blur-[1px]">
      <motion.div
        className="h-full w-full origin-left bg-gradient-to-r from-zinc-500 via-zinc-200 to-white shadow-[0_0_14px_rgba(255,255,255,0.9),0_0_4px_rgba(255,255,255,1)]"
        style={{ scaleX }}
      />
    </div>
  );
}
