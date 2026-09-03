"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Shield, Menu, X, Palette, Check } from "lucide-react";
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

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
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

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border text-zinc-300 hover:text-white active:scale-95 transition-transform"
            style={{
              backgroundColor: currentTheme.card_bg,
              borderColor: currentTheme.border_color,
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t px-6 py-5 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200 backdrop-blur-2xl"
          style={{
            backgroundColor: currentTheme.background,
            borderColor: currentTheme.border_color,
          }}
        >
          {/* Mobile Brand Header with Logo */}
          <div className="flex items-center gap-3 pb-3 border-b" style={{ borderColor: currentTheme.border_color }}>
            <div
              className="w-10 h-10 rounded-full overflow-hidden border p-[2px] flex-shrink-0"
              style={{
                backgroundColor: currentTheme.card_bg,
                borderColor: currentTheme.border_color,
                boxShadow: `0 0 12px -2px ${currentTheme.glow_color}`,
              }}
            >
              <Image
                src="/gallery/logo.png"
                alt="Abdullah Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">Abdullah Bin Zubair Hashmi</p>
              <p className="text-[10px] font-mono mt-0.5" style={{ color: currentTheme.accent }}>
                Full-Stack & Systems Engineer
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-medium text-zinc-300 hover:text-white p-2.5 rounded-xl border"
                style={{
                  backgroundColor: currentTheme.card_bg,
                  borderColor: currentTheme.border_color,
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between gap-2 pt-3 border-t" style={{ borderColor: currentTheme.border_color }}>
            <a
              href={profile?.linkedin_url || "https://linkedin.com/in/abdullah-bin-zubair-hashmi"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 rounded-xl text-xs border"
              style={{
                backgroundColor: currentTheme.card_bg,
                borderColor: currentTheme.border_color,
              }}
            >
              LinkedIn
            </a>
            <a
              href={profile?.github_url || "https://github.com/abdullahhashmi"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 rounded-xl text-xs border"
              style={{
                backgroundColor: currentTheme.card_bg,
                borderColor: currentTheme.border_color,
              }}
            >
              GitHub
            </a>
            <a
              href={`mailto:${profile?.email || "abdullahbinzubairhashmi@gmail.com"}`}
              className="flex-1 text-center py-2 rounded-xl text-xs border"
              style={{
                backgroundColor: currentTheme.card_bg,
                borderColor: currentTheme.border_color,
              }}
            >
              Email
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
