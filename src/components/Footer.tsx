"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUp, Shield } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Footer() {
  const { currentTheme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="w-full theme-surface border-t py-12 px-4 sm:px-8 lg:px-14 transition-colors duration-500"
      style={{ borderColor: currentTheme.border_color }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b"
          style={{ borderColor: currentTheme.border_color }}
        >
          <div className="flex items-center gap-3.5">
            <div
              className="w-10 h-10 rounded-full overflow-hidden border p-[2px] flex-shrink-0"
              style={{
                backgroundColor: currentTheme.card_bg,
                borderColor: currentTheme.border_color,
                boxShadow: `0 0 15px -3px ${currentTheme.glow_color}`,
              }}
            >
              <Image
                src="/gallery/logo.png"
                alt="Abdullah Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover rounded-full select-none"
              />
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-tight">Abdullah Bin Zubair Hashmi</span>
              <p className="text-xs text-zinc-400 mt-0.5 font-mono">
                Full-Stack Developer · C++ & ASP.NET Engineer · Creative Technologist
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-zinc-400 font-medium">
            <Link href="#home" className="hover:text-white transition-colors">Home</Link>
            <Link href="#about" className="hover:text-white transition-colors">About</Link>
            <Link href="#projects" className="hover:text-white transition-colors">Projects</Link>
            <Link href="#skills" className="hover:text-white transition-colors">Skills</Link>
            <Link href="#experience" className="hover:text-white transition-colors">Experience</Link>
            <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/admin" className="text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: currentTheme.primary }}
            />
            <span>Available for Full-Stack & Engineering Roles</span>
          </div>

          <p>© {new Date().getFullYear()} Abdullah Bin Zubair Hashmi. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
