"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
          ? `color-mix(in srgb, ${currentTheme.background} 90%, transparent)`
          : `color-mix(in srgb, ${currentTheme.background} 40%, transparent)`,
        borderColor: isScrolled ? currentTheme.border_color : "transparent",
        boxShadow: isScrolled ? `0 10px 30px -10px ${currentTheme.glow_color}` : "none",
        paddingTop: isScrolled ? "0.75rem" : "1rem",
        paddingBottom: isScrolled ? "0.75rem" : "1rem",
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
            className="p-2 rounded-xl border text-zinc-300 hover:text-white"
            style={{
              backgroundColor: currentTheme.card_bg,
              borderColor: currentTheme.border_color,
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Center Sunburst Emblem Icon */}
        <Link href="#home" className="flex items-center justify-center hover:opacity-80 transition-opacity">
          <svg
            className="w-7 h-7 animate-spin-slow"
            style={{ color: currentTheme.primary }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          >
            <line x1="12" y1="2" x2="12" y2="6" />
            <line x1="12" y1="18" x2="12" y2="22" />
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
            <line x1="2" y1="12" x2="6" y2="12" />
            <line x1="18" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
          </svg>
        </Link>

        {/* Right Controls: Theme Selector + Social Dots + Admin Button */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          
          {/* Theme Palette Switcher Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-md hover:scale-105 transition-all shadow-sm cursor-pointer"
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
                className="absolute right-0 mt-2.5 w-72 rounded-2xl border p-2.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-2xl"
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
                          {/* Palette Preview Swatch */}
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

          {/* Social Dots */}
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
            className="flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium backdrop-blur-md hover:scale-105 transition-all shadow-sm"
            style={{
              backgroundColor: currentTheme.card_bg,
              borderColor: currentTheme.border_color,
              color: currentTheme.foreground,
            }}
          >
            <Shield className="w-3 h-3" style={{ color: currentTheme.primary }} />
            <span>Admin</span>
            <span className="font-mono tracking-widest text-[11px] opacity-70">⸬</span>
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
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-zinc-300 hover:text-white py-1"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-3 border-t" style={{ borderColor: currentTheme.border_color }}>
            <a
              href={profile?.linkedin_url || "https://linkedin.com/in/abdullah-bin-zubair-hashmi"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-full text-xs"
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
              className="px-3 py-1 rounded-full text-xs"
              style={{
                backgroundColor: currentTheme.card_bg,
                borderColor: currentTheme.border_color,
              }}
            >
              GitHub
            </a>
            <a
              href={`mailto:${profile?.email || "abdullahbinzubairhashmi@gmail.com"}`}
              className="px-3 py-1 rounded-full text-xs"
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
