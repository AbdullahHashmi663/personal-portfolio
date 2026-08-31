"use client";

import { Theme } from "@/types/database";
import { defaultThemes } from "@/lib/themes";

const CACHE_KEY_THEMES = "portfolio_cached_themes_v2";
const CACHE_KEY_ACTIVE_THEME = "portfolio_cached_active_theme_v2";
const CACHE_KEY_TIMESTAMP = "portfolio_cached_timestamp_v2";
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 Minutes Cache TTL

// Tier 1: In-Memory Singleton Cache
let memoryThemesCache: Theme[] | null = null;
let memoryActiveThemeCache: Theme | null = null;

/**
 * Apply CSS variables to :root and document.body instantly
 */
export function applyThemeTokensToDOM(theme: Theme) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.style.setProperty("--background", theme.background);
  root.style.setProperty("--foreground", theme.foreground);
  root.style.setProperty("--card-bg", theme.card_bg);
  root.style.setProperty("--border-color", theme.border_color);
  root.style.setProperty("--primary", theme.primary);
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--glow-color", theme.glow_color);

  document.body.style.backgroundColor = theme.background;
  document.body.style.color = theme.foreground;
}

/**
 * Read cached themes from Memory (Tier 1) or LocalStorage (Tier 2)
 */
export function getCachedThemes(): { themes: Theme[]; isFresh: boolean } {
  // 1. Check in-memory cache first (0ms)
  if (memoryThemesCache && memoryThemesCache.length > 0) {
    return { themes: memoryThemesCache, isFresh: true };
  }

  // 2. Check LocalStorage cache
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(CACHE_KEY_THEMES);
      const timestamp = localStorage.getItem(CACHE_KEY_TIMESTAMP);

      if (stored) {
        const parsedThemes: Theme[] = JSON.parse(stored);
        if (Array.isArray(parsedThemes) && parsedThemes.length > 0) {
          memoryThemesCache = parsedThemes;
          const isFresh = timestamp ? Date.now() - parseInt(timestamp, 10) < CACHE_TTL_MS : false;
          return { themes: parsedThemes, isFresh };
        }
      }
    } catch {
      // LocalStorage access fallback
    }
  }

  // 3. Fallback to default catalog
  memoryThemesCache = defaultThemes;
  return { themes: defaultThemes, isFresh: false };
}

/**
 * Read cached active theme from Memory or LocalStorage
 */
export function getCachedActiveTheme(): Theme {
  if (memoryActiveThemeCache) {
    return memoryActiveThemeCache;
  }

  if (typeof window !== "undefined") {
    try {
      const storedActive = localStorage.getItem(CACHE_KEY_ACTIVE_THEME);
      if (storedActive) {
        const parsed: Theme = JSON.parse(storedActive);
        if (parsed && parsed.id && parsed.background) {
          memoryActiveThemeCache = parsed;
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
  }

  const { themes } = getCachedThemes();
  const activeFromThemes = themes.find((t) => t.is_active) || defaultThemes[0];
  memoryActiveThemeCache = activeFromThemes;
  return activeFromThemes;
}

/**
 * Store themes in Memory + LocalStorage write-through cache
 */
export function setCachedThemes(themes: Theme[]) {
  memoryThemesCache = themes;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(CACHE_KEY_THEMES, JSON.stringify(themes));
      localStorage.setItem(CACHE_KEY_TIMESTAMP, Date.now().toString());
    } catch {
      // Quota or private mode fallback
    }
  }
}

/**
 * Store active theme in Memory + LocalStorage write-through cache
 */
export function setCachedActiveTheme(theme: Theme) {
  memoryActiveThemeCache = theme;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(CACHE_KEY_ACTIVE_THEME, JSON.stringify(theme));
      localStorage.setItem("portfolio_theme_id", theme.id);
    } catch {
      // Quota or private mode fallback
    }
  }
}

/**
 * Clear or invalidate the cache
 */
export function invalidateThemeCache() {
  memoryThemesCache = null;
  memoryActiveThemeCache = null;
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(CACHE_KEY_THEMES);
      localStorage.removeItem(CACHE_KEY_ACTIVE_THEME);
      localStorage.removeItem(CACHE_KEY_TIMESTAMP);
    } catch {
      // Fallback
    }
  }
}
