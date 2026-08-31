"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { Theme } from "@/types/database";
import { defaultThemes } from "@/lib/themes";
import { fetchThemes, setActiveThemeInDb, saveThemeInDb, deleteThemeFromDb } from "@/lib/data";
import {
  getCachedThemes,
  getCachedActiveTheme,
  setCachedThemes,
  setCachedActiveTheme,
  applyThemeTokensToDOM,
} from "@/lib/themeCache";

interface ThemeContextType {
  currentTheme: Theme;
  themes: Theme[];
  setTheme: (themeId: string) => Promise<void>;
  saveCustomTheme: (theme: Theme) => Promise<boolean>;
  deleteCustomTheme: (themeId: string) => Promise<boolean>;
  refreshThemesFromDb: () => Promise<void>;
  isLoading: boolean;
  isCached: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  initialThemes = defaultThemes,
}: {
  children: ReactNode;
  initialThemes?: Theme[];
}) {
  // Synchronous Instant Cache Hydration (0ms - No DB blocking)
  const [themes, setThemesState] = useState<Theme[]>(() => {
    if (typeof window !== "undefined") {
      const cached = getCachedThemes();
      return cached.themes.length > 0 ? cached.themes : initialThemes;
    }
    return initialThemes;
  });

  const [currentTheme, setCurrentThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return getCachedActiveTheme();
    }
    return initialThemes.find((t) => t.is_active) || defaultThemes[0];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isCached, setIsCached] = useState(true);

  // Apply theme tokens to DOM immediately
  useEffect(() => {
    applyThemeTokensToDOM(currentTheme);
  }, [currentTheme]);

  // Stale-While-Revalidate Background Fetch
  const syncWithDatabase = useCallback(async (force = false) => {
    try {
      const { isFresh } = getCachedThemes();
      
      // If cache is fresh and not forced, skip network call
      if (isFresh && !force) {
        return;
      }

      setIsLoading(true);
      const dbThemes = await fetchThemes();

      if (dbThemes && dbThemes.length > 0) {
        setThemesState(dbThemes);
        setCachedThemes(dbThemes);

        // Check if there is an active theme in DB or user preference
        const savedId = typeof window !== "undefined" ? localStorage.getItem("portfolio_theme_id") : null;
        let active = dbThemes.find((t) => t.id === savedId);

        if (!active) {
          active = dbThemes.find((t) => t.is_active) || dbThemes[0];
        }

        if (active && active.id !== currentTheme.id) {
          setCurrentThemeState(active);
          setCachedActiveTheme(active);
          applyThemeTokensToDOM(active);
        }
      }
    } catch (err) {
      console.warn("Background theme sync skipped:", err);
    } finally {
      setIsLoading(false);
      setIsCached(true);
    }
  }, [currentTheme.id]);

  // Execute background SWR on initial load
  useEffect(() => {
    // Immediate initial DOM styling from cache
    applyThemeTokensToDOM(currentTheme);

    // Non-blocking background sync
    const timeout = setTimeout(() => {
      syncWithDatabase();
    }, 100);

    return () => clearTimeout(timeout);
  }, [syncWithDatabase, currentTheme]);

  // 1. Instant Write-Through Theme Selection
  const setTheme = async (themeId: string) => {
    const target = themes.find((t) => t.id === themeId);
    if (!target) return;

    // A. Instant UI Update (0ms)
    setCurrentThemeState(target);
    applyThemeTokensToDOM(target);

    // B. Instant Local Cache Update
    setCachedActiveTheme(target);
    const updatedThemes = themes.map((t) => ({
      ...t,
      is_active: t.id === themeId,
    }));
    setThemesState(updatedThemes);
    setCachedThemes(updatedThemes);

    // C. Asynchronous Non-blocking Database Sync
    setActiveThemeInDb(themeId).catch((err) => {
      console.error("Failed to sync active theme to DB:", err);
    });
  };

  // 2. Instant Write-Through Custom Theme Save
  const saveCustomTheme = async (theme: Theme) => {
    // A. Instant Local State & Cache Update
    const updatedThemes = [...themes.filter((t) => t.id !== theme.id), theme];
    setThemesState(updatedThemes);
    setCachedThemes(updatedThemes);

    if (theme.is_active) {
      setCurrentThemeState(theme);
      setCachedActiveTheme(theme);
      applyThemeTokensToDOM(theme);
    }

    // B. Asynchronous Database Persist
    const success = await saveThemeInDb(theme);
    return success;
  };

  // 3. Instant Write-Through Custom Theme Delete
  const deleteCustomTheme = async (themeId: string) => {
    // A. Instant Local State & Cache Update
    const updatedThemes = themes.filter((t) => t.id !== themeId);
    setThemesState(updatedThemes);
    setCachedThemes(updatedThemes);

    if (currentTheme.id === themeId) {
      const fallback = defaultThemes[0];
      setCurrentThemeState(fallback);
      setCachedActiveTheme(fallback);
      applyThemeTokensToDOM(fallback);
    }

    // B. Asynchronous Database Deletion
    const success = await deleteThemeFromDb(themeId);
    return success;
  };

  const refreshThemesFromDb = async () => {
    await syncWithDatabase(true);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themes,
        setTheme,
        saveCustomTheme,
        deleteCustomTheme,
        refreshThemesFromDb,
        isLoading,
        isCached,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
