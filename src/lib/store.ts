import fs from "fs";
import path from "path";
import { Profile, Project, Skill, Experience, Certification, Message, Theme, InspirationQuote } from "@/types/database";

export interface DatabaseStore {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  certifications: Certification[];
  quote: InspirationQuote;
  messages: Message[];
  customThemes: Theme[];
}

const DB_PATH = path.join(process.cwd(), "src", "data", "db.json");

export function getDb(): DatabaseStore {
  try {
    if (!fs.existsSync(DB_PATH)) {
      throw new Error("db.json not found");
    }
    const raw = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(raw) as DatabaseStore;
  } catch (err) {
    console.error("Failed to read from db.json:", err);
    throw err;
  }
}

export function saveDb(data: DatabaseStore): void {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write to db.json:", err);
    throw err;
  }
}

// 1. Profile operations
export function updateProfile(updates: Partial<Profile>): Profile {
  const db = getDb();
  db.profile = {
    ...db.profile,
    ...updates,
    updated_at: new Date().toISOString(),
  };
  saveDb(db);
  return db.profile;
}

// 2. Project operations
export function addProject(project: Project): Project[] {
  const db = getDb();
  db.projects = [project, ...db.projects];
  saveDb(db);
  return db.projects;
}

export function updateProject(project: Project): Project[] {
  const db = getDb();
  db.projects = db.projects.map((p) => (p.id === project.id ? { ...project, updated_at: new Date().toISOString() } : p));
  saveDb(db);
  return db.projects;
}

export function deleteProject(id: string): Project[] {
  const db = getDb();
  db.projects = db.projects.filter((p) => p.id !== id);
  saveDb(db);
  return db.projects;
}

export function toggleProjectFeatured(id: string): Project[] {
  const db = getDb();
  db.projects = db.projects.map((p) => (p.id === id ? { ...p, featured: !p.featured, updated_at: new Date().toISOString() } : p));
  saveDb(db);
  return db.projects;
}

// 3. Skill operations
export function addSkill(skill: Skill): Skill[] {
  const db = getDb();
  db.skills = [...db.skills, skill];
  saveDb(db);
  return db.skills;
}

export function updateSkill(skill: Skill): Skill[] {
  const db = getDb();
  db.skills = db.skills.map((s) => (s.id === skill.id ? skill : s));
  saveDb(db);
  return db.skills;
}

export function deleteSkill(id: string): Skill[] {
  const db = getDb();
  db.skills = db.skills.filter((s) => s.id !== id);
  saveDb(db);
  return db.skills;
}

// 4. Experience operations
export function addExperience(exp: Experience): Experience[] {
  const db = getDb();
  db.experiences = [exp, ...db.experiences];
  saveDb(db);
  return db.experiences;
}

export function updateExperience(exp: Experience): Experience[] {
  const db = getDb();
  db.experiences = db.experiences.map((e) => (e.id === exp.id ? exp : e));
  saveDb(db);
  return db.experiences;
}

export function deleteExperience(id: string): Experience[] {
  const db = getDb();
  db.experiences = db.experiences.filter((e) => e.id !== id);
  saveDb(db);
  return db.experiences;
}

// 5. Quote operations
export function updateQuote(quote: InspirationQuote): InspirationQuote {
  const db = getDb();
  db.quote = {
    ...quote,
    updated_at: new Date().toISOString(),
  };
  saveDb(db);
  return db.quote;
}

// 6. Messages operations
export function addMessage(msg: { name: string; email: string; subject?: string; message: string }): Message {
  const db = getDb();
  const newMsg: Message = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    name: msg.name,
    email: msg.email,
    subject: msg.subject || "Portfolio Contact Inquiry",
    message: msg.message,
    read: false,
    created_at: new Date().toISOString(),
  };
  db.messages = [newMsg, ...db.messages];
  saveDb(db);
  return newMsg;
}

export function toggleMessageRead(id: string): Message[] {
  const db = getDb();
  db.messages = db.messages.map((m) => (m.id === id ? { ...m, read: !m.read } : m));
  saveDb(db);
  return db.messages;
}

export function deleteMessage(id: string): Message[] {
  const db = getDb();
  db.messages = db.messages.filter((m) => m.id !== id);
  saveDb(db);
  return db.messages;
}

// 7. Custom Theme operations
export function saveCustomTheme(theme: Theme): Theme[] {
  const db = getDb();
  const existing = db.customThemes.findIndex((t) => t.id === theme.id);
  if (existing >= 0) {
    db.customThemes[existing] = theme;
  } else {
    db.customThemes.push(theme);
  }
  saveDb(db);
  return db.customThemes;
}

export function deleteCustomTheme(id: string): Theme[] {
  const db = getDb();
  db.customThemes = db.customThemes.filter((t) => t.id !== id);
  saveDb(db);
  return db.customThemes;
}
