import { query, queryOne } from "@/lib/db";
import { getDb } from "@/lib/store";
import {
  fallbackProfile,
  fallbackProjects,
  fallbackSkills,
  fallbackExperiences,
  fallbackCertifications,
  fallbackQuote,
} from "@/lib/data";
import { Profile, Project, Skill, Experience, Certification, InspirationQuote, Theme } from "@/types/database";
import { defaultThemes } from "@/lib/themes";

export async function fetchProfile(): Promise<Profile> {
  try {
    if (process.env.DATABASE_URL) {
      const row = await queryOne<any>("SELECT * FROM public.profiles LIMIT 1");
      if (row) {
        return {
          ...row,
          cgpa: row.cgpa != null ? parseFloat(row.cgpa) : fallbackProfile.cgpa,
        } as Profile;
      }
    }
    const db = getDb();
    return db.profile || fallbackProfile;
  } catch (err) {
    console.warn("fetchProfile database note:", err);
    try {
      const db = getDb();
      return db.profile || fallbackProfile;
    } catch {
      return fallbackProfile;
    }
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    if (process.env.DATABASE_URL) {
      const rows = await query<any>("SELECT * FROM public.projects ORDER BY display_order ASC, created_at DESC");
      if (rows && rows.length > 0) {
        return rows as Project[];
      }
    }
    const db = getDb();
    return db.projects && db.projects.length > 0 ? db.projects : fallbackProjects;
  } catch (err) {
    console.warn("fetchProjects database note:", err);
    try {
      const db = getDb();
      return db.projects && db.projects.length > 0 ? db.projects : fallbackProjects;
    } catch {
      return fallbackProjects;
    }
  }
}

export async function fetchSkills(): Promise<Skill[]> {
  try {
    if (process.env.DATABASE_URL) {
      const rows = await query<any>("SELECT * FROM public.skills ORDER BY display_order ASC, created_at ASC");
      if (rows && rows.length > 0) {
        return rows as Skill[];
      }
    }
    const db = getDb();
    return db.skills && db.skills.length > 0 ? db.skills : fallbackSkills;
  } catch (err) {
    console.warn("fetchSkills database note:", err);
    try {
      const db = getDb();
      return db.skills && db.skills.length > 0 ? db.skills : fallbackSkills;
    } catch {
      return fallbackSkills;
    }
  }
}

export async function fetchExperiences(): Promise<Experience[]> {
  try {
    if (process.env.DATABASE_URL) {
      const rows = await query<any>("SELECT * FROM public.experiences ORDER BY display_order ASC, created_at ASC");
      if (rows && rows.length > 0) {
        return rows as Experience[];
      }
    }
    const db = getDb();
    return db.experiences && db.experiences.length > 0 ? db.experiences : fallbackExperiences;
  } catch (err) {
    console.warn("fetchExperiences database note:", err);
    try {
      const db = getDb();
      return db.experiences && db.experiences.length > 0 ? db.experiences : fallbackExperiences;
    } catch {
      return fallbackExperiences;
    }
  }
}

export async function fetchCertifications(): Promise<Certification[]> {
  try {
    if (process.env.DATABASE_URL) {
      const rows = await query<any>("SELECT * FROM public.certifications ORDER BY created_at ASC");
      if (rows && rows.length > 0) {
        return rows as Certification[];
      }
    }
    const db = getDb();
    return db.certifications && db.certifications.length > 0 ? db.certifications : fallbackCertifications;
  } catch (err) {
    console.warn("fetchCertifications database note:", err);
    try {
      const db = getDb();
      return db.certifications && db.certifications.length > 0 ? db.certifications : fallbackCertifications;
    } catch {
      return fallbackCertifications;
    }
  }
}

export async function fetchInspirationQuote(): Promise<InspirationQuote> {
  try {
    if (process.env.DATABASE_URL) {
      const row = await queryOne<any>("SELECT * FROM public.quotes WHERE is_active = true LIMIT 1");
      if (row) {
        return row as InspirationQuote;
      }
    }
    const db = getDb();
    return db.quote || fallbackQuote;
  } catch (err) {
    console.warn("fetchInspirationQuote database note:", err);
    try {
      const db = getDb();
      return db.quote || fallbackQuote;
    } catch {
      return fallbackQuote;
    }
  }
}

export async function fetchActiveTheme(): Promise<Theme> {
  try {
    if (process.env.DATABASE_URL) {
      const row = await queryOne<any>(
        'SELECT id, name, category, description, background, foreground, card_bg, border_color, "primary", accent, glow_color, is_active, is_custom, created_at FROM public.themes WHERE is_active = true LIMIT 1'
      );
      if (row) {
        return row as Theme;
      }
    }
    const db = getDb();
    if (db.customThemes) {
      const activeCustom = db.customThemes.find((t) => t.is_active);
      if (activeCustom) return activeCustom;
    }
    return defaultThemes.find((t) => t.is_active) || defaultThemes[0];
  } catch (err) {
    console.warn("fetchActiveTheme database note:", err);
    return defaultThemes.find((t) => t.is_active) || defaultThemes[0];
  }
}

export async function fetchAllThemes(): Promise<Theme[]> {
  try {
    let dbThemes: Theme[] = [];
    if (process.env.DATABASE_URL) {
      const rows = await query<any>(
        'SELECT id, name, category, description, background, foreground, card_bg, border_color, "primary", accent, glow_color, is_active, is_custom, created_at FROM public.themes ORDER BY created_at ASC'
      );
      if (rows && rows.length > 0) {
        dbThemes = rows as Theme[];
      }
    }
    if (dbThemes.length > 0) {
      return dbThemes;
    }
    const db = getDb();
    const custom = db.customThemes || [];
    return [...defaultThemes, ...custom];
  } catch (err) {
    console.warn("fetchAllThemes database note:", err);
    return defaultThemes;
  }
}


