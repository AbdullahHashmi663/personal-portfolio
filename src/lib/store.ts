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

const PRIMARY_DB_PATH = path.join(process.cwd(), "data", "db.json");
const SECONDARY_DB_PATH = path.join(process.cwd(), "src", "data", "db.json");

function getValidDbPath(): string {
  if (fs.existsSync(PRIMARY_DB_PATH)) return PRIMARY_DB_PATH;
  if (fs.existsSync(SECONDARY_DB_PATH)) return SECONDARY_DB_PATH;
  return PRIMARY_DB_PATH;
}

export function getDb(): DatabaseStore {
  const chosenPath = getValidDbPath();
  try {
    if (fs.existsSync(chosenPath)) {
      const raw = fs.readFileSync(chosenPath, "utf8");
      return JSON.parse(raw) as DatabaseStore;
    }
  } catch (err) {
    console.warn(`Could not read ${chosenPath}, checking fallback...`, err);
    if (chosenPath !== SECONDARY_DB_PATH && fs.existsSync(SECONDARY_DB_PATH)) {
      try {
        const raw = fs.readFileSync(SECONDARY_DB_PATH, "utf8");
        return JSON.parse(raw) as DatabaseStore;
      } catch {}
    }
  }

  // If both failed or file doesn't exist, create default
  const defaultDb: DatabaseStore = {
    profile: {
      id: "profile-1",
      name: "Abdullah Bin Zubair Hashmi",
      tagline: "Full Stack Developer | C++ & ASP.NET Engineer | Front-End (React & Next.js) | Creative Technologist",
      bio: "Full Stack Developer skilled in JavaScript, React, C#, HTML/CSS, PHP, C++, AWS, and Next.js, with experience building responsive web applications such as the YOTA website and Timetable Management System. Strong in SQL Server, SQLite3, and 2D/3D web animation.",
      about_text: "Dedicated Final-Year IT Bachelor student at Bahria University with a 3.85 CGPA. Former Director of the Technical Development Team and Coordinator of Competitive Programming at YOTA. Passionate about architecting scalable full-stack applications, AI-powered IoT security frameworks, and high-performance interactive experiences.",
      location: "Rawalpindi & Islamabad, Pakistan",
      email: "abdullahbinzubairhashmi@gmail.com",
      phone: "+92 314 5837015",
      github_url: "https://github.com/abdullahhashmi",
      linkedin_url: "https://linkedin.com/in/abdullah-bin-zubair-hashmi",
      twitter_url: "https://twitter.com",
      website_url: "https://abdullahbinzubairhashmi.dev",
      resume_url: "/Abdullah_Bin_Zubair_Hashmi_CV__3_.pdf",
      avatar_url: "/gallery/black-me.png",
      cgpa: 3.85,
      university: "Bahria University, Islamabad",
      degree: "Bachelors in Information Technology (Final Year)",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    projects: [],
    skills: [],
    experiences: [],
    certifications: [],
    quote: {
      id: "quote-main",
      handle: "@ABDULLAH_HASHMI",
      line1: "MAKE",
      line2: "SMART",
      line3: "CHOICES",
      line4_a: "IN",
      line4_b: "YOUR",
      line5: "LIFE",
      subtext: "Empower yourself by making decisions that reflect your true goals. Code with purpose, architect with precision, and build systems that outlast the ordinary.",
      author: "Abdullah Bin Zubair Hashmi",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    messages: [],
    customThemes: [],
  };

  saveDb(defaultDb);
  return defaultDb;
}

export function saveDb(data: DatabaseStore): void {
  const content = JSON.stringify(data, null, 2);
  const targets = [PRIMARY_DB_PATH, SECONDARY_DB_PATH];

  for (const target of targets) {
    try {
      const dir = path.dirname(target);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(target, content, "utf8");
    } catch (err) {
      console.warn(`Could not write to ${target}:`, err);
    }
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
  db.projects = db.projects.map((p) => (p.id === project.id ? { ...p, ...project, updated_at: new Date().toISOString() } : p));
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
  db.skills = db.skills.map((s) => (s.id === skill.id ? { ...s, ...skill } : s));
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
  db.experiences = db.experiences.map((e) => (e.id === exp.id ? { ...e, ...exp } : e));
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
export function updateQuote(quote: Partial<InspirationQuote>): InspirationQuote {
  const db = getDb();
  db.quote = {
    ...db.quote,
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
  db.messages = [newMsg, ...(db.messages || [])];
  saveDb(db);
  return newMsg;
}

export function toggleMessageRead(id: string): Message[] {
  const db = getDb();
  db.messages = (db.messages || []).map((m) => (m.id === id ? { ...m, read: !m.read } : m));
  saveDb(db);
  return db.messages;
}

export function deleteMessage(id: string): Message[] {
  const db = getDb();
  db.messages = (db.messages || []).filter((m) => m.id !== id);
  saveDb(db);
  return db.messages;
}

// 7. Custom Theme operations
export function saveCustomTheme(theme: Theme): Theme[] {
  const db = getDb();
  if (!db.customThemes) db.customThemes = [];
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
  if (!db.customThemes) db.customThemes = [];
  db.customThemes = db.customThemes.filter((t) => t.id !== id);
  saveDb(db);
  return db.customThemes;
}
