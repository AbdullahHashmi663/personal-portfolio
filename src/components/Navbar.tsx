"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Menu, X, Palette, Check, ArrowUpRight } from "lucide-react";
import { Profile } from "@/types/database";
import { useTheme } from "@/context/ThemeContext";

interface NavbarProps {
  profile?: Profile;
}

export default function Navbar({ profile }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const { currentTheme, themes, setTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setThemeDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent background scrolling when mobile editorial menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "#home", tag: "Index // 00" },
    { name: "About", href: "#about", tag: "Bio & Credentials" },
    { name: "Projects", href: "#projects", tag: "Selected Works" },
    { name: "Skills", href: "#skills", tag: "Tech Stack & Systems" },
    { name: "Experience", href: "#experience", tag: "Leadership & Roles" },
    { name: "Contact", href: "#contact", tag: "Get in Touch" },
  ];

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 w-full transition-all duration-500 backdrop-blur-xl border-b"
        style={{
          backgroundColor: isScrolled
            ? `color-mix(in srgb, ${currentTheme.background} 92%, transparent)`
            : `color-mix(in srgb, ${currentTheme.background} 50%, transparent)`,
          borderColor: isScrolled ? currentTheme.border_color : "transparent",
          boxShadow: isScrolled ? `0 10px 30px -10px ${currentTheme.glow_color}` : "none",
          paddingTop: isScrolled ? "0.6rem" : "0.85rem",
          paddingBottom: isScrolled ? "0.6rem" : "0.85rem",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 flex items-center justify-between">
          
          {/* Left Nav links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs sm:text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-zinc-300 hover:text-white transition-colors hover:scale-105 active:scale-95"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Pill Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white active:scale-95 transition-all shadow-sm cursor-pointer"
              style={{
                backgroundColor: currentTheme.card_bg,
                borderColor: currentTheme.border_color,
              }}
              aria-label="Open navigation menu"
            >
              <Menu className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
              <span className="text-[11px] font-mono tracking-widest font-medium">MENU</span>
            </button>
          </div>

          {/* Center Brand Logo Emblem */}
          <Link
            href="#home"
            className="group relative flex items-center justify-center hover:opacity-95 transition-opacity"
            aria-label="Home - Abdullah Bin Zubair Hashmi"
          >
            {/* Subtle Ambient Glow Ring */}
            <div
              className="absolute -inset-1 rounded-full blur-md opacity-40 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none"
              style={{ backgroundColor: currentTheme.glow_color }}
            />

            <div
              className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border p-[2px] transition-all duration-300 group-hover:scale-110 group-active:scale-95 shadow-sm"
              style={{
                backgroundColor: currentTheme.card_bg,
                borderColor: currentTheme.border_color,
                boxShadow: `0 0 16px -2px ${currentTheme.glow_color}`,
              }}
            >
              <Image
                src="/gallery/logo.png"
                alt="Abdullah Bin Zubair Hashmi Logo"
                width={36}
                height={36}
                className="w-full h-full object-cover rounded-full select-none"
                priority
              />
            </div>
          </Link>

          {/* Right Controls: Theme Selector + Social Dots + Admin Button */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            
            {/* Theme Palette Switcher Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="flex items-center gap-1.5 rounded-full border px-2.5 sm:px-3 py-1.5 text-xs font-medium backdrop-blur-md hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
                style={{
                  backgroundColor: currentTheme.card_bg,
                  borderColor: currentTheme.border_color,
                  color: currentTheme.foreground,
                }}
                title="Switch Portfolio Theme"
              >
                <Palette className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
                <span className="hidden sm:inline text-[11px] font-mono capitalize">
                  {currentTheme?.name || "Theme"}
                </span>
              </button>

              {/* Dropdown Menu */}
              {themeDropdownOpen && (
                <div
                  className="absolute right-0 mt-2.5 w-[280px] sm:w-72 rounded-2xl border p-2.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-2xl max-w-[calc(100vw-2rem)]"
                  style={{
                    backgroundColor: currentTheme.background,
                    borderColor: currentTheme.border_color,
                    boxShadow: `0 15px 40px -10px ${currentTheme.glow_color}`,
                  }}
                >
                  <div
                    className="px-2.5 py-1.5 border-b mb-1.5 flex items-center justify-between"
                    style={{ borderColor: currentTheme.border_color }}
                  >
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                      Select Theme ({themes.length})
                    </span>
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: currentTheme.primary }}
                    />
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-1 pr-1">
                    {themes.map((theme) => {
                      const isCurrent = theme.id === currentTheme.id;
                      return (
                        <button
                          key={theme.id}
                          onClick={() => {
                            setTheme(theme.id);
                            setThemeDropdownOpen(false);
                          }}
                          className="w-full flex items-center justify-between p-2 rounded-xl text-left transition-all cursor-pointer border"
                          style={{
                            backgroundColor: isCurrent
                              ? `color-mix(in srgb, ${theme.primary} 15%, transparent)`
                              : "transparent",
                            borderColor: isCurrent ? theme.border_color : "transparent",
                            color: isCurrent ? theme.primary : theme.foreground,
                          }}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="flex items-center -space-x-1">
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-sm"
                                style={{ backgroundColor: theme.background }}
                              />
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-sm"
                                style={{ backgroundColor: theme.primary }}
                              />
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-sm"
                                style={{ backgroundColor: theme.accent }}
                              />
                            </div>

                            <div>
                              <p className="text-xs font-bold leading-none">{theme.name}</p>
                              <p className="text-[10px] font-mono opacity-70 mt-0.5">
                                {theme.category}
                              </p>
                            </div>
                          </div>

                          {isCurrent && <Check className="w-3.5 h-3.5" style={{ color: theme.primary }} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Social Dots (Desktop) */}
            <div className="hidden sm:flex items-center gap-1.5">
              <a
                href={profile?.linkedin_url || "https://linkedin.com/in/abdullah-bin-zubair-hashmi"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full border flex items-center justify-center text-[10px] text-zinc-300 hover:text-white transition-all font-mono"
                style={{
                  backgroundColor: currentTheme.card_bg,
                  borderColor: currentTheme.border_color,
                }}
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href={profile?.github_url || "https://github.com/abdullahhashmi"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full border flex items-center justify-center text-[10px] text-zinc-300 hover:text-white transition-all font-mono"
                style={{
                  backgroundColor: currentTheme.card_bg,
                  borderColor: currentTheme.border_color,
                }}
                aria-label="GitHub"
              >
                G
              </a>
              <a
                href={`mailto:${profile?.email || "abdullahbinzubairhashmi@gmail.com"}`}
                className="w-7 h-7 rounded-full border flex items-center justify-center text-[10px] text-zinc-300 hover:text-white transition-all font-mono"
                style={{
                  backgroundColor: currentTheme.card_bg,
                  borderColor: currentTheme.border_color,
                }}
                aria-label="Email"
              >
                @
              </a>
            </div>

            {/* Admin Portal Button */}
            <Link
              href="/admin"
              className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-md hover:scale-105 active:scale-95 transition-all shadow-sm"
              style={{
                backgroundColor: currentTheme.card_bg,
                borderColor: currentTheme.border_color,
                color: currentTheme.foreground,
              }}
            >
              <Shield className="w-3 h-3" style={{ color: currentTheme.primary }} />
              <span className="text-[11px] sm:text-xs">Admin</span>
              <span className="font-mono tracking-widest text-[10px] opacity-70 hidden sm:inline">⸬</span>
            </Link>
          </div>

        </div>
      </header>

      {/* ============================================================ */}
      {/* FULL-SCREEN KINETIC EDITORIAL MOBILE OVERLAY (AWWWARDS STYLE) */}
      {/* ============================================================ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-editorial-overlay"
            initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[999999] flex flex-col justify-between p-6 sm:p-10 select-none overflow-y-auto"
            style={{
              backgroundColor: currentTheme.background,
              color: currentTheme.foreground,
            }}
          >
            {/* Ambient Radial Vignette & Theme Glow */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                background: `radial-gradient(ellipse at 85% 15%, ${currentTheme.glow_color} 0%, transparent 65%), radial-gradient(ellipse at 15% 85%, ${currentTheme.glow_color} 0%, transparent 65%)`,
              }}
            />

            {/* 1. Top Header Row: Identity & Minimalist Close Button */}
            <div className="relative z-10 w-full flex items-center justify-between pb-5 border-b" style={{ borderColor: currentTheme.border_color }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full overflow-hidden border p-[1.5px] flex-shrink-0"
                  style={{
                    backgroundColor: currentTheme.card_bg,
                    borderColor: currentTheme.border_color,
                    boxShadow: `0 0 12px -2px ${currentTheme.glow_color}`,
                  }}
                >
                  <Image
                    src="/gallery/logo.png"
                    alt="Abdullah Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-bold tracking-wider text-white uppercase leading-tight">
                    Abdullah Bin Zubair Hashmi
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-zinc-400 mt-0.5">
                    NAVIGATION // 06 ROUTES
                  </span>
                </div>
              </div>

              {/* Tactile Close Button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white active:scale-95 transition-all cursor-pointer backdrop-blur-md shadow-sm"
                style={{
                  backgroundColor: currentTheme.card_bg,
                  borderColor: currentTheme.border_color,
                }}
                aria-label="Close menu"
              >
                <span className="text-[11px] font-mono tracking-widest">CLOSE</span>
                <X
                  className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300"
                  style={{ color: currentTheme.primary }}
                />
              </button>
            </div>

            {/* 2. Center Area: Staggered Large Editorial Typography */}
            <div className="relative z-10 my-auto py-6 sm:py-8">
              <motion.ul
                initial="closed"
                animate="open"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.06, delayChildren: 0.12 },
                  },
                  closed: {
                    transition: { staggerChildren: 0.03, staggerDirection: -1 },
                  },
                }}
                className="flex flex-col divide-y divide-white/5"
              >
                {navLinks.map((link, idx) => (
                  <motion.li
                    key={link.name}
                    variants={{
                      closed: { y: 30, opacity: 0 },
                      open: {
                        y: 0,
                        opacity: 1,
                        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
                      },
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex items-baseline justify-between py-3 sm:py-4 transition-all duration-300"
                    >
                      <div className="flex items-baseline gap-4 sm:gap-6">
                        <span className="font-mono text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                          0{idx + 1}
                        </span>
                        <span
                          className="text-3xl sm:text-5xl font-normal tracking-tight font-ardent text-zinc-200 group-hover:text-white group-hover:translate-x-3 transition-all duration-300"
                          style={{
                            textShadow: `0 0 0px ${currentTheme.glow_color}`,
                          }}
                        >
                          {link.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-all duration-300">
                        <span className="hidden xs:inline text-[10px] font-mono tracking-widest text-zinc-400 group-hover:text-zinc-200">
                          {link.tag}
                        </span>
                        <ArrowUpRight
                          className="w-5 h-5 -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"
                          style={{ color: currentTheme.primary }}
                        />
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* 3. Bottom Information & Inline Utilities Bar (Thumb Zone) */}
            <div
              className="relative z-10 w-full pt-5 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono"
              style={{ borderColor: currentTheme.border_color }}
            >
              {/* Clean Inline Social Links (No heavy box borders!) */}
              <div className="flex items-center gap-4 text-zinc-400">
                <a
                  href={profile?.linkedin_url || "https://linkedin.com/in/abdullah-bin-zubair-hashmi"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>LinkedIn</span>
                  <span className="text-[10px] opacity-60">↗</span>
                </a>
                <span className="text-zinc-600">/</span>
                <a
                  href={profile?.github_url || "https://github.com/abdullahhashmi"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <span className="text-[10px] opacity-60">↗</span>
                </a>
                <span className="text-zinc-600">/</span>
                <a
                  href={`mailto:${profile?.email || "abdullahbinzubairhashmi@gmail.com"}`}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Email</span>
                  <span className="text-[10px] opacity-60">↗</span>
                </a>
              </div>

              {/* Status & Active Theme Telemetry */}
              <div className="flex items-center gap-3 text-[11px] text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-ping"
                    style={{ backgroundColor: currentTheme.primary }}
                  />
                  <span className="text-zinc-300">ISLAMABAD, PK</span>
                </div>
                <span>•</span>
                <span className="capitalize" style={{ color: currentTheme.accent }}>
                  {currentTheme.name}
                </span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

