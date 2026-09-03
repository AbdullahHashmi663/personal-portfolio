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

export async function fetchProfile(): Promise<Profile> {
  try {
    const db = getDb();
    return db.profile || fallbackProfile;
  } catch (err) {
    console.error("fetchProfile server error:", err);
    return fallbackProfile;
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const db = getDb();
    return db.projects && db.projects.length > 0 ? db.projects : fallbackProjects;
  } catch (err) {
    console.error("fetchProjects server error:", err);
    return fallbackProjects;
  }
}

export async function fetchSkills(): Promise<Skill[]> {
  try {
    const db = getDb();
    return db.skills && db.skills.length > 0 ? db.skills : fallbackSkills;
  } catch (err) {
    console.error("fetchSkills server error:", err);
    return fallbackSkills;
  }
}

export async function fetchExperiences(): Promise<Experience[]> {
  try {
    const db = getDb();
    return db.experiences && db.experiences.length > 0 ? db.experiences : fallbackExperiences;
  } catch (err) {
    console.error("fetchExperiences server error:", err);
    return fallbackExperiences;
  }
}

export async function fetchCertifications(): Promise<Certification[]> {
  try {
    const db = getDb();
    return db.certifications && db.certifications.length > 0 ? db.certifications : fallbackCertifications;
  } catch (err) {
    console.error("fetchCertifications server error:", err);
    return fallbackCertifications;
  }
}

export async function fetchInspirationQuote(): Promise<InspirationQuote> {
  try {
    const db = getDb();
    return db.quote || fallbackQuote;
  } catch (err) {
    console.error("fetchInspirationQuote server error:", err);
    return fallbackQuote;
  }
}

export async function fetchCustomThemes(): Promise<Theme[]> {
  try {
    const db = getDb();
    return db.customThemes || [];
  } catch (err) {
    console.error("fetchCustomThemes server error:", err);
    return [];
  }
}
