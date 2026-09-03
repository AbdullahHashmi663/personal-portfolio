import { Profile, Project, Skill, Experience, Certification, Theme, InspirationQuote } from "@/types/database";
import { defaultThemes } from "@/lib/themes";
import { createClient as createBrowserClient } from "@/lib/supabase/client";

// ==============================================================================
// VERIFIED RESUME DATASET - ABDULLAH BIN ZUBAIR HASHMI
// ==============================================================================

export const fallbackProfile: Profile = {
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
};

export const fallbackProjects: Project[] = [
  {
    id: "proj-1",
    title: "Autonomous XDR Framework for Sentinel Industrial IoT",
    slug: "autonomous-xdr-framework",
    tagline: "AI-Powered Extended Detection & Response for Industrial IoT",
    description: "Final Year Project implementing an advanced AI-powered XDR framework targeting Industrial IoT environments. Uses deep learning algorithms for real-time cyber threat detection and automated incident mitigation across complex sensor architectures.",
    category: "AI & IoT",
    image_url: null,
    technologies: ["Python", "PyTorch", "TensorFlow", "Wazuh XDR", "React.js", "Node.js", "CNN-BiLSTM-Transformer", "NIST & ISO Compliance"],
    github_url: "https://github.com/abdullahhashmi/autonomous-xdr-framework",
    live_url: null,
    featured: true,
    display_order: 1,
    architecture_details: "Deep learning hybrid model combining CNN spatial feature extraction with BiLSTM temporal analysis and Transformer self-attention for anomaly detection in Industrial IoT sensor telemetry.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "proj-2",
    title: "Smart-MediDB: Dual-Engine Clinical Information System",
    slug: "smart-medidb",
    tagline: "High-Performance Full-Stack Clinical Data Engine",
    description: "Comprehensive clinical data management system engineered with dual-database engine support for structured relational records and unstructured medical imaging/documents.",
    category: "Full-Stack",
    image_url: null,
    technologies: ["ASP.NET Core", "React.js", "TypeScript", "C#", "MS SQL Server", "MongoDB", "Entity Framework Core", "JWT Auth", "Vite"],
    github_url: "https://github.com/abdullahhashmi/smart-medidb",
    live_url: null,
    featured: true,
    display_order: 2,
    architecture_details: "Microservices architecture utilizing MS SQL Server for transactional compliance and MongoDB for unstructured patient records, secured via JWT authentication.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "proj-3",
    title: "MedZone: Alzheimer & Brain Stroke Prediction",
    slug: "medzone-prediction",
    tagline: "AI & Mobile System for Neurological Disease Prediction",
    description: "Cross-platform mobile application and deep learning pipeline for early prediction of Alzheimer's disease and brain strokes from clinical MRI and imaging data.",
    category: "Mobile & AI",
    image_url: null,
    technologies: ["Flutter", "Python", "Firebase", "FastAPI", "ONNX Runtime", "Computer Vision"],
    github_url: "https://github.com/abdullahhashmi/medzone",
    live_url: null,
    featured: true,
    display_order: 3,
    architecture_details: "Integrated lightweight ONNX models on-device for rapid inference, paired with a FastAPI backend for asynchronous batch analysis.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "proj-4",
    title: "Human Resource Management System (HRMS)",
    slug: "trust-nexus-hrms",
    tagline: "Scalable Enterprise Human Resource Platform",
    description: "Developed at Trust Nexus (Business Innovation Center, BUKC). Enterprise-grade HR management platform focusing on high responsiveness, intuitive role-based workflows, and employee telemetry.",
    category: "Full-Stack",
    image_url: null,
    technologies: ["Next.js", "Tailwind CSS", "TypeScript", "Redux Toolkit", "Node.js", "PostgreSQL"],
    github_url: "https://github.com/abdullahhashmi/hrms-trust-nexus",
    live_url: null,
    featured: true,
    display_order: 4,
    architecture_details: "Modern server-side rendered UI with Next.js App Router, Redux state caching, and responsive UI system designed for large organization hierarchies.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "proj-5",
    title: "YOTA Technical Development Platform",
    slug: "yota-platform",
    tagline: "Interactive Hub for University Technical Advancement",
    description: "Official digital platform for the Youth Organization for Technical Advancement at Bahria University, featuring 2D/3D animations, competitive programming leaderboards, and event registration portals.",
    category: "Web & 3D",
    image_url: null,
    technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "GSAP", "Three.js", "XAMPP", "MySQL"],
    github_url: "https://github.com/abdullahhashmi/yota-platform",
    live_url: null,
    featured: false,
    display_order: 5,
    architecture_details: "Custom GSAP and Three.js timeline animations for smooth storytelling and interactive showcase of university coding competitions like CodeZaar.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "proj-6",
    title: "Hotel Management System",
    slug: "hotel-management-system",
    tagline: "Full-Featured Hospitality Management & Booking Platform",
    description: "Complete reservation and hotel operations suite with room availability matrices, guest billing, and analytics dashboards.",
    category: "Full-Stack",
    image_url: null,
    technologies: ["Python", "Django", "React.js", "Tailwind CSS", "PostgreSQL"],
    github_url: "https://github.com/abdullahhashmi/hotel-management",
    live_url: null,
    featured: false,
    display_order: 6,
    architecture_details: "Django REST Framework backend with relational room booking engine and React dashboard.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "proj-7",
    title: "Student Records Manager & Timetable Engine",
    slug: "timetable-records-engine",
    tagline: "Algorithms & Systems Management Engine in C++ and C#",
    description: "High-performance desktop systems for automated academic timetable generation and comprehensive student records tracking.",
    category: "Systems & C++",
    image_url: null,
    technologies: ["C++", "ASP.NET", "C#", "SQL Server", "Qt", "Data Structures & Algorithms"],
    github_url: "https://github.com/abdullahhashmi/timetable-scheduler",
    live_url: null,
    featured: false,
    display_order: 7,
    architecture_details: "Constraint-satisfaction scheduling algorithms in C++ paired with ASP.NET CRUD interface.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const fallbackSkills: Skill[] = [
  // Frontend
  { id: "sk-1", name: "React.js & Next.js", category: "Frontend", proficiency: 96, experience_years: "2+ yrs", icon_name: "Atom", featured: true, display_order: 1, created_at: new Date().toISOString() },
  { id: "sk-2", name: "TypeScript & JavaScript", category: "Frontend", proficiency: 92, experience_years: "2+ yrs", icon_name: "Code2", featured: true, display_order: 2, created_at: new Date().toISOString() },
  { id: "sk-3", name: "Tailwind CSS & Modern UI", category: "Frontend", proficiency: 95, experience_years: "2+ yrs", icon_name: "Palette", featured: true, display_order: 3, created_at: new Date().toISOString() },
  { id: "sk-4", name: "Three.js / WebGL & GSAP", category: "Frontend", proficiency: 88, experience_years: "1+ yr", icon_name: "Sparkles", featured: true, display_order: 4, created_at: new Date().toISOString() },

  // Backend
  { id: "sk-5", name: "ASP.NET MVC & Core (C#)", category: "Backend", proficiency: 93, experience_years: "2+ yrs", icon_name: "Server", featured: true, display_order: 5, created_at: new Date().toISOString() },
  { id: "sk-6", name: "Entity Framework (EF Core)", category: "Backend", proficiency: 89, experience_years: "1+ yr", icon_name: "Layers", featured: true, display_order: 6, created_at: new Date().toISOString() },
  { id: "sk-7", name: "Node.js & Express", category: "Backend", proficiency: 86, experience_years: "2+ yrs", icon_name: "Terminal", featured: true, display_order: 7, created_at: new Date().toISOString() },
  { id: "sk-8", name: "PHP & Laravel Basics", category: "Backend", proficiency: 85, experience_years: "2+ yrs", icon_name: "FileCode", featured: false, display_order: 8, created_at: new Date().toISOString() },
  { id: "sk-9", name: "Python (FastAPI / Django)", category: "Backend", proficiency: 84, experience_years: "1+ yr", icon_name: "Cpu", featured: false, display_order: 9, created_at: new Date().toISOString() },

  // Systems & Core
  { id: "sk-10", name: "C++ & Object-Oriented Design", category: "Systems & Core", proficiency: 94, experience_years: "3+ yrs", icon_name: "Binary", featured: true, display_order: 10, created_at: new Date().toISOString() },
  { id: "sk-11", name: "Data Structures & Algorithms", category: "Systems & Core", proficiency: 92, experience_years: "3+ yrs", icon_name: "GitBranch", featured: true, display_order: 11, created_at: new Date().toISOString() },
  { id: "sk-12", name: "Competitive Programming", category: "Systems & Core", proficiency: 90, experience_years: "2+ yrs", icon_name: "Trophy", featured: true, display_order: 12, created_at: new Date().toISOString() },

  // Databases
  { id: "sk-13", name: "PostgreSQL & Supabase", category: "Databases", proficiency: 91, experience_years: "2+ yrs", icon_name: "Database", featured: true, display_order: 13, created_at: new Date().toISOString() },
  { id: "sk-14", name: "MS SQL Server (SSMS)", category: "Databases", proficiency: 92, experience_years: "2+ yrs", icon_name: "HardDrive", featured: true, display_order: 14, created_at: new Date().toISOString() },
  { id: "sk-15", name: "MongoDB & SQLite3", category: "Databases", proficiency: 86, experience_years: "2+ yrs", icon_name: "Boxes", featured: false, display_order: 15, created_at: new Date().toISOString() },

  // DevOps & Tools
  { id: "sk-16", name: "Git & GitHub DevOps", category: "DevOps & Tools", proficiency: 95, experience_years: "3+ yrs", icon_name: "GitFork", featured: true, display_order: 16, created_at: new Date().toISOString() },
  { id: "sk-17", name: "Docker Containerization", category: "DevOps & Tools", proficiency: 83, experience_years: "1+ yr", icon_name: "Container", featured: true, display_order: 17, created_at: new Date().toISOString() },
  { id: "sk-18", name: "AWS Cloud & Deployment", category: "DevOps & Tools", proficiency: 80, experience_years: "1+ yr", icon_name: "Cloud", featured: false, display_order: 18, created_at: new Date().toISOString() },
  { id: "sk-19", name: "Figma UI/UX Prototyping", category: "DevOps & Tools", proficiency: 88, experience_years: "2+ yrs", icon_name: "Layout", featured: true, display_order: 19, created_at: new Date().toISOString() },
];

export const fallbackExperiences: Experience[] = [
  {
    id: "exp-1",
    company: "Youth Organization for Technical Advancement (YOTA), Bahria University",
    role: "Director – Technical Development Team",
    location: "Islamabad, Pakistan",
    period: "Jul 2024 – Feb 2025",
    description: "Led the Technical Development Team, overseeing all student technical initiatives, architectural standards, and project delivery across the university.",
    achievements: [
      "Directed the flagship CodeZaar competitive programming championship from problem curation to live automated evaluation.",
      "Mentored 30+ engineering students in modern web development, algorithms, and collaborative git workflows.",
      "Architected core technical infrastructure for university tech events and hackathons."
    ],
    technologies: ["Leadership", "React.js", "Next.js", "Competitive Programming", "Project Management"],
    display_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "exp-2",
    company: "Youth Organization for Technical Advancement (YOTA), Bahria University",
    role: "Coordinator – Competitive Programming Team",
    location: "Islamabad, Pakistan",
    period: "Apr 2024 – Jul 2024",
    description: "Spearheaded competitive coding workshops, weekly algorithmic problem-solving contests, and DSA mentoring sessions.",
    achievements: [
      "Organized bi-weekly algorithmic contests with custom problem sets in C++ and Python.",
      "Elevated university ranking in regional competitive programming tournaments.",
      "Trained students on graph algorithms, dynamic programming, and data structures."
    ],
    technologies: ["C++", "DSA", "Algorithms", "Competitive Programming", "Mentoring"],
    display_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "exp-3",
    company: "Trust Nexus (Business Innovation Center, BUKC)",
    role: "Frontend Developer – HRMS Project",
    location: "Islamabad, Pakistan",
    period: "12 Weeks (Internship)",
    description: "Engineered high-performance user interfaces and responsive workflows for an enterprise Human Resource Management System.",
    achievements: [
      "Built intuitive employee telemetry, payroll dashboards, and attendance tracking interfaces.",
      "Optimized Next.js client-server state using Redux Toolkit and Tailwind CSS.",
      "Collaborated closely with backend engineers to integrate REST APIs with seamless error handling."
    ],
    technologies: ["Next.js", "Tailwind CSS", "TypeScript", "Redux", "REST APIs"],
    display_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: "exp-4",
    company: "Directorate of Student Affairs, Bahria University HQ",
    role: "Operations Intern",
    location: "Islamabad, Pakistan",
    period: "14 Weeks (Internship)",
    description: "Managed student administrative operations, cross-departmental communications, and event logistics across the university head office.",
    achievements: [
      "Streamlined inter-departmental documentation workflows and student request handling.",
      "Coordinated logistics and scheduling for university-wide academic conferences and seminars."
    ],
    technologies: ["Operations", "Workflow Automation", "Coordination", "Communication"],
    display_order: 4,
    created_at: new Date().toISOString(),
  },
];

export const fallbackCertifications: Certification[] = [
  {
    id: "cert-1",
    title: "Microsoft Power Platform Developer Associate",
    issuer: "NAVTTC",
    period: "Mar – Jun 2025",
    type: "Certification",
    description: "Comprehensive enterprise application engineering covering ASP.NET, C#, React, Web Forms, MVC, and SQL Server.",
    link_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "cert-2",
    title: "Master Course in Web Framework",
    issuer: "Udemy",
    period: "August 2023",
    type: "Certification",
    description: "Advanced architectural design and modern full-stack web frameworks.",
    link_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "cert-3",
    title: "Hafiz-e-Quran (Memorization of the Holy Quran)",
    issuer: "Jamia Islamia Hashmia",
    period: "18th May 2016",
    type: "Honor",
    description: "Memorization of the Holy Quran in its entirety.",
    link_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "cert-4",
    title: "Cardiac Image Processing Research",
    issuer: "Bahria University Academic Research",
    period: "Ongoing",
    type: "Research",
    description: "Novel computer vision and deep learning techniques for analyzing cardiac MRI scans to assist in early detection and assessment of cardiovascular conditions.",
    link_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "cert-5",
    title: "IoT-Based XDR and GRC Framework",
    issuer: "Industrial IoT Security Research",
    period: "Ongoing",
    type: "Research",
    description: "Unified Governance, Risk, and Compliance framework integrated with real-time sensor monitoring and automated cyber attack detection across heterogeneous OS environments.",
    link_url: null,
    created_at: new Date().toISOString(),
  },
];

// ==============================================================================
// SUPABASE CLIENT FETCHERS (With Fallback Resilience)
// ==============================================================================

export async function fetchProfile(): Promise<Profile> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project-id")) {
      return fallbackProfile;
    }
    const supabase = createBrowserClient();
    const { data, error } = await supabase.from("profiles").select("*").limit(1).single();
    if (error || !data) return fallbackProfile;
    return data as Profile;
  } catch {
    return fallbackProfile;
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project-id")) {
      return fallbackProjects;
    }
    const supabase = createBrowserClient();
    const { data, error } = await supabase.from("projects").select("*").order("display_order", { ascending: true });
    if (error || !data || data.length === 0) return fallbackProjects;
    return data as Project[];
  } catch {
    return fallbackProjects;
  }
}

export async function fetchSkills(): Promise<Skill[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project-id")) {
      return fallbackSkills;
    }
    const supabase = createBrowserClient();
    const { data, error } = await supabase.from("skills").select("*").order("display_order", { ascending: true });
    if (error || !data || data.length === 0) return fallbackSkills;
    return data as Skill[];
  } catch {
    return fallbackSkills;
  }
}

export async function saveSkillInDb(skill: Skill): Promise<boolean> {
  try {
    const res = await fetch("/api/admin/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "add_skill", payload: skill }),
    });
    return res.ok;
  } catch (err) {
    console.error("Error saving skill:", err);
    return false;
  }
}

export async function deleteSkillFromDb(skillId: string): Promise<boolean> {
  try {
    const res = await fetch("/api/admin/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete_skill", payload: { id: skillId } }),
    });
    return res.ok;
  } catch (err) {
    console.error("Error deleting skill:", err);
    return false;
  }
}

export async function fetchExperiences(): Promise<Experience[]> {
  return fallbackExperiences;
}

export async function fetchCertifications(): Promise<Certification[]> {
  return fallbackCertifications;
}

export async function submitContactMessage(formData: { name: string; email: string; subject?: string; message: string }) {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return {
      success: res.ok && data.success,
      message: data.message || (res.ok ? "Thank you! Your message has been sent successfully." : "Failed to send message."),
    };
  } catch (err: any) {
    console.error("Submit message error:", err);
    return { success: false, message: err.message || "Failed to send message. Please try again." };
  }
}

export async function fetchThemes(): Promise<Theme[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project-id")) {
      return defaultThemes;
    }
    const supabase = createBrowserClient();
    const { data, error } = await supabase.from("themes").select("*").order("created_at", { ascending: true });
    if (error || !data || data.length === 0) return defaultThemes;
    return data as Theme[];
  } catch {
    return defaultThemes;
  }
}

export async function setActiveThemeInDb(themeId: string): Promise<boolean> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project-id")) {
      return true;
    }
    const supabase = createBrowserClient();
    // First deactivate all
    await (supabase.from("themes") as any).update({ is_active: false }).neq("id", "none");
    // Then activate selected
    await (supabase.from("themes") as any).update({ is_active: true }).eq("id", themeId);
    return true;
  } catch (err) {
    console.error("Error activating theme:", err);
    return false;
  }
}

export async function saveThemeInDb(theme: Theme): Promise<boolean> {
  try {
    const res = await fetch("/api/admin/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "save_custom_theme", payload: theme }),
    });
    return res.ok;
  } catch (err) {
    console.error("Error saving theme:", err);
    return false;
  }
}

export async function deleteThemeFromDb(themeId: string): Promise<boolean> {
  try {
    const res = await fetch("/api/admin/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete_custom_theme", payload: { id: themeId } }),
    });
    return res.ok;
  } catch (err) {
    console.error("Error deleting theme:", err);
    return false;
  }
}

// ==============================================================================
// 8. INSPIRATION QUOTE (SWISS POSTER TYPOGRAPHY)
// ==============================================================================

export const fallbackQuote: InspirationQuote = {
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
};

export async function fetchInspirationQuote(): Promise<InspirationQuote> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project-id")) {
      return fallbackQuote;
    }
    const supabase = createBrowserClient();
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .eq("is_active", true)
      .limit(1)
      .single();

    if (error || !data) {
      return fallbackQuote;
    }
    return data as InspirationQuote;
  } catch {
    return fallbackQuote;
  }
}

export async function saveInspirationQuote(quote: InspirationQuote): Promise<boolean> {
  try {
    const res = await fetch("/api/admin/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "update_quote", payload: quote }),
    });
    return res.ok;
  } catch (err) {
    console.error("Error saving inspiration quote:", err);
    return false;
  }
}

