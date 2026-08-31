"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 36,
  className = "",
  threshold = 0.15,
  once = true,
}: ScrollRevealProps) {
  const getInitial = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance, scale: 0.98 };
      case "down":
        return { opacity: 0, y: -distance, scale: 0.98 };
      case "left":
        return { opacity: 0, x: distance, scale: 0.98 };
      case "right":
        return { opacity: 0, x: -distance, scale: 0.98 };
      case "scale":
        return { opacity: 0, scale: 0.92 };
      case "fade":
      default:
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once,
        amount: threshold,
        margin: "0px 0px -40px 0px",
      }}
      transition={{
        duration,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier standard
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
