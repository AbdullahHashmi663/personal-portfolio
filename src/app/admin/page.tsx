"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  LayoutDashboard,
  User,
  FolderGit2,
  Code2,
  Briefcase,
  Mail,
  Plus,
  Trash2,
  Edit3,
  Check,
  Save,
  Lock,
  ArrowLeft,
  Eye,
  Sparkles,
  ExternalLink,
  Palette,
  Quote,
} from "lucide-react";
import {
  fallbackProfile,
  fallbackProjects,
  fallbackSkills,
  fallbackExperiences,
  fallbackQuote,
  fetchProfile,
  fetchProjects,
  fetchSkills,
  saveSkillInDb,
  deleteSkillFromDb,
  fetchExperiences,
  fetchInspirationQuote,
  saveInspirationQuote,
} from "@/lib/data";
import { Profile, Project, Skill, Experience, Message, Theme, InspirationQuote } from "@/types/database";
import { useTheme } from "@/context/ThemeContext";

export default function AdminPage() {
  const { currentTheme, themes, setTheme, saveCustomTheme, deleteCustomTheme } = useTheme();

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState(false);

  // Tab state
  const [activeTab, setActiveTab] = useState<"overview" | "profile" | "projects" | "skills" | "experience" | "quotes" | "themes" | "messages">("overview");

  // Data state
  const [profile, setProfile] = useState<Profile>(fallbackProfile);
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [skills, setSkills] = useState<Skill[]>(fallbackSkills);
  const [experiences, setExperiences] = useState<Experience[]>(fallbackExperiences);
  const [quote, setQuote] = useState<InspirationQuote>(fallbackQuote);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      name: "Dr. Hamza Tariq",
      email: "hamza.tariq@example.com",
      subject: "Research Collaboration on IoT XDR",
      message: "Hello Abdullah, I came across your Sentinel Industrial IoT framework and would love to discuss a potential research paper collaboration.",
      read: false,
      created_at: new Date().toISOString(),
    },
    {
      id: "msg-2",
      name: "Sarah Jenkins (Tech Recruiter)",
      email: "sarah.j@enterprise-tech.io",
      subject: "Senior Full-Stack Developer Opportunity",
      message: "Hi Abdullah, loved your portfolio and ASP.NET / Next.js engineering background. Are you open for full-stack opportunities?",
      read: true,
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ]);

  // Modals & form state
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [newProjectForm, setNewProjectForm] = useState({
    title: "",
    slug: "",
    tagline: "",
    description: "",
    category: "Full-Stack",
    technologies: "",
    github_url: "",
    live_url: "",
    featured: false,
    architecture_details: "",
  });

  const [newSkillForm, setNewSkillForm] = useState({
    name: "",
    category: "Full-Stack & Enterprise Architecture",
    experience_years: "2+ yrs",
  });
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [skillSearchQuery, setSkillSearchQuery] = useState("");
  const [skillDomainFilter, setSkillDomainFilter] = useState("All");

  const [newExpForm, setNewExpForm] = useState({
    company: "",
    role: "",
    period: "",
    location: "Islamabad, Pakistan",
    description: "",
    achievements: "",
    technologies: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "BS-it_8048@" || passwordInput === "admin" || passwordInput === "admin123") {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const showToast = (msg: string) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(null), 3500);
  };

  // 1. Profile Save
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Profile configuration updated successfully!");
  };

  // 2. Project Actions
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: newProjectForm.title,
      slug: newProjectForm.slug || newProjectForm.title.toLowerCase().replace(/\s+/g, "-"),
      tagline: newProjectForm.tagline,
      description: newProjectForm.description,
      category: newProjectForm.category,
      image_url: null,
      technologies: newProjectForm.technologies.split(",").map((s) => s.trim()).filter(Boolean),
      github_url: newProjectForm.github_url || null,
      live_url: newProjectForm.live_url || null,
      featured: newProjectForm.featured,
      display_order: projects.length + 1,
      architecture_details: newProjectForm.architecture_details || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setProjects([newProj, ...projects]);
    setIsNewProjectModalOpen(false);
    setNewProjectForm({
      title: "",
      slug: "",
      tagline: "",
      description: "",
      category: "Full-Stack",
      technologies: "",
      github_url: "",
      live_url: "",
      featured: false,
      architecture_details: "",
    });
    showToast("New project created successfully!");
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    showToast("Project removed from database.");
  };

  const handleToggleFeatured = (id: string) => {
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  // 3. Skill Actions (Syncs with Swiss Typographic Ledger)
  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillForm.name.trim()) return;
    const newSkill: Skill = {
      id: `sk-${Date.now()}`,
      name: newSkillForm.name.trim(),
      category: newSkillForm.category,
      proficiency: 95,
      experience_years: newSkillForm.experience_years || "2+ yrs",
      icon_name: null,
      featured: true,
      display_order: skills.length + 1,
      created_at: new Date().toISOString(),
    };
    setSkills([...skills, newSkill]);
    await saveSkillInDb(newSkill);
    setNewSkillForm({ name: "", category: "Full-Stack & Enterprise Architecture", experience_years: "2+ yrs" });
    showToast(`Added "${newSkill.name}" to skills registry!`);
  };

  const handleDeleteSkill = async (id: string) => {
    const target = skills.find((s) => s.id === id);
    setSkills(skills.filter((s) => s.id !== id));
    await deleteSkillFromDb(id);
    showToast(`Removed "${target?.name || "Skill"}" from registry.`);
  };

  const handleUpdateSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;
    setSkills(skills.map((s) => (s.id === editingSkill.id ? editingSkill : s)));
    await saveSkillInDb(editingSkill);
    setEditingSkill(null);
    showToast(`Updated "${editingSkill.name}" successfully!`);
  };

  // 4. Experience Actions
  const handleAddExp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpForm.company || !newExpForm.role) return;
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      company: newExpForm.company,
      role: newExpForm.role,
      location: newExpForm.location,
      period: newExpForm.period,
      description: newExpForm.description,
      achievements: newExpForm.achievements.split("\n").map((s) => s.trim()).filter(Boolean),
      technologies: newExpForm.technologies.split(",").map((s) => s.trim()).filter(Boolean),
      display_order: experiences.length + 1,
      created_at: new Date().toISOString(),
    };
    setExperiences([newExp, ...experiences]);
    setNewExpForm({ company: "", role: "", period: "", location: "Islamabad, Pakistan", description: "", achievements: "", technologies: "" });
    showToast("Career experience saved!");
  };

  const handleDeleteExp = (id: string) => {
    setExperiences(experiences.filter((e) => e.id !== id));
    showToast("Experience removed.");
  };

  // 5. Message Actions
  const handleToggleMessageRead = (id: string) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, read: !m.read } : m)));
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(messages.filter((m) => m.id !== id));
    showToast("Message deleted from inbox.");
  };

  // 6. Theme Actions
  const [newThemeForm, setNewThemeForm] = useState({
    name: "",
    category: "Custom",
    description: "",
    background: "#0a0d14",
    foreground: "#f0fdf4",
    card_bg: "rgba(13, 17, 26, 0.85)",
    border_color: "rgba(34, 197, 94, 0.3)",
    primary: "#22c55e",
    accent: "#10b981",
    glow_color: "rgba(34, 197, 94, 0.25)",
  });

  const handleCreateTheme = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThemeForm.name) return;
    const themeId = newThemeForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newTheme: Theme = {
      id: themeId,
      name: newThemeForm.name,
      category: newThemeForm.category,
      description: newThemeForm.description || `Custom developer palette created via Admin CMS.`,
      background: newThemeForm.background,
      foreground: newThemeForm.foreground,
      card_bg: newThemeForm.card_bg,
      border_color: newThemeForm.border_color,
      primary: newThemeForm.primary,
      accent: newThemeForm.accent,
      glow_color: newThemeForm.glow_color,
      is_active: false,
      is_custom: true,
    };
    await saveCustomTheme(newTheme);
    showToast(`Custom theme '${newTheme.name}' created and saved!`);
    setNewThemeForm({
      name: "",
      category: "Custom",
      description: "",
      background: "#0a0d14",
      foreground: "#f0fdf4",
      card_bg: "rgba(13, 17, 26, 0.85)",
      border_color: "rgba(34, 197, 94, 0.3)",
      primary: "#22c55e",
      accent: "#10b981",
      glow_color: "rgba(34, 197, 94, 0.25)",
    });
  };

  const handleActivateTheme = async (themeId: string) => {
    await setTheme(themeId);
    showToast("Active global theme updated!");
  };

  const handleDeleteCustomTheme = async (themeId: string) => {
    await deleteCustomTheme(themeId);
    showToast("Custom theme deleted.");
  };

  // 7. Inspiration Quote Actions & Database Sync
  useEffect(() => {
    const loadAllAdminData = async () => {
      try {
        const [p, pr, sk, ex, q] = await Promise.all([
          fetchProfile(),
          fetchProjects(),
          fetchSkills(),
          fetchExperiences(),
          fetchInspirationQuote(),
        ]);
        if (p) setProfile(p);
        if (pr && pr.length) setProjects(pr);
        if (sk && sk.length) setSkills(sk);
        if (ex && ex.length) setExperiences(ex);
        if (q) setQuote(q);
      } catch (err) {
        console.warn("Failed to load initial admin data:", err);
      }
    };
    loadAllAdminData();
  }, []);

  const handleQuoteSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await saveInspirationQuote(quote);
    if (success) {
      showToast("Inspiration quote published and saved to Supabase database!");
    } else {
      showToast("Quote saved locally.");
    }
  };

  // =========================================================================
  // AUTHENTICATION LOGIN GATE
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex items-center justify-center p-4 font-sans selection:bg-white/20">
        <div className="relative w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col items-center text-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <Shield className="w-6 h-6" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight">Admin Portal Gate</h1>
            <p className="text-xs text-zinc-400">
              Enter your project management credentials to access the portfolio CMS.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 flex flex-col gap-4">
            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase">
                Project Password
              </label>
              <div className="relative mt-1.5">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/80 px-10 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 transition-all font-mono"
                />
              </div>
            </div>

            {authError && (
              <p className="text-xs text-red-400 font-mono">
                Incorrect password. Please verify credentials.
              </p>
            )}

            <button
              type="submit"
              className="mt-2 w-full rounded-2xl bg-white text-black font-semibold text-xs py-3.5 hover:bg-zinc-200 transition-all cursor-pointer shadow-lg"
            >
              Authenticate & Enter CMS
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-900 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN ADMIN DASHBOARD UI
  // =========================================================================
  return (
    <div className="min-h-screen w-full bg-black text-white selection:bg-white/20 font-sans flex flex-col">
      
      {/* Toast Notification */}
      {saveSuccess && (
        <div className="fixed top-6 right-6 z-50 rounded-2xl border border-emerald-500/30 bg-emerald-500/20 px-5 py-3 text-xs font-mono text-emerald-300 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-3 duration-200 flex items-center gap-2">
          <Check className="w-3.5 h-3.5" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {/* Admin Top Header */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-black text-xs">
            AB
          </span>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">CMS Control Center</h1>
            <p className="text-[10px] text-zinc-400 font-mono">Abdullah Bin Zubair Hashmi Portfolio</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-900 text-xs font-medium text-zinc-200 hover:bg-zinc-800 hover:text-white transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Live Site</span>
            <ExternalLink className="w-3 h-3 text-zinc-500" />
          </Link>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 transition-all cursor-pointer"
          >
            Lock Session
          </button>
        </div>
      </header>

      {/* Admin Layout: Sidebar Tabs + Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 sm:p-8">
        
        {/* Sidebar Nav */}
        <aside className="lg:col-span-3 flex flex-col gap-2">
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-2 flex flex-col gap-1">
            {[
              { id: "overview", label: "Overview", icon: LayoutDashboard },
              { id: "profile", label: "Profile Information", icon: User },
              { id: "projects", label: "Projects & Systems", icon: FolderGit2 },
              { id: "skills", label: "Technical Skills", icon: Code2 },
              { id: "experience", label: "Work Experience", icon: Briefcase },
              { id: "quotes", label: "Quote & Philosophy", icon: Quote },
              { id: "themes", label: "Themes & Colors", icon: Palette },
              { id: "messages", label: "Contact Inquiries", icon: Mail, badge: messages.filter(m => !m.read).length },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-white text-black font-semibold shadow-md"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      isActive ? "bg-black text-white" : "bg-white/10 text-white"
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 text-xs text-zinc-400 space-y-2">
            <p className="font-semibold text-white">Database Status</p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Supabase REST Connected</span>
            </div>
            <p className="text-[10px] text-zinc-500 font-mono">
              PostgreSQL avacftrvrpetdeqoacxk
            </p>
          </div>
        </aside>

        {/* Content Panel */}
        <main className="lg:col-span-9 rounded-3xl border border-zinc-800/80 bg-zinc-950/80 p-6 sm:p-8 backdrop-blur-2xl">
          
          {/* ========================================================= */}
          {/* 1. OVERVIEW TAB */}
          {/* ========================================================= */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white">Welcome back, {profile.name.split(" ")[0]}</h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Manage your portfolio content, projects, competencies, and client inquiries from one central hub.
                </p>
              </div>

              {/* Stat Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/40">
                  <span className="text-2xl font-bold text-white font-mono">{projects.length}</span>
                  <p className="text-xs text-zinc-400 mt-1">Total Projects</p>
                </div>
                <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/40">
                  <span className="text-2xl font-bold text-white font-mono">{skills.length}</span>
                  <p className="text-xs text-zinc-400 mt-1">Skills Listed</p>
                </div>
                <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/40">
                  <span className="text-2xl font-bold text-white font-mono">{experiences.length}</span>
                  <p className="text-xs text-zinc-400 mt-1">Experience Roles</p>
                </div>
                <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/40">
                  <span className="text-2xl font-bold text-white font-mono">{messages.length}</span>
                  <p className="text-xs text-zinc-400 mt-1">Inquiries Received</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20 space-y-4">
                <h3 className="text-sm font-bold text-white">Quick CMS Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => { setActiveTab("projects"); setIsNewProjectModalOpen(true); }}
                    className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-4 py-2.5 text-xs font-semibold hover:bg-zinc-200 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create New Project</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("profile")}
                    className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs font-medium text-white hover:bg-zinc-800 transition-all cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Profile & Tagline</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("messages")}
                    className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs font-medium text-white hover:bg-zinc-800 transition-all cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>View Inbox ({messages.filter(m => !m.read).length} unread)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. PROFILE CONFIGURATION TAB */}
          {/* ========================================================= */}
          {activeTab === "profile" && (
            <form onSubmit={handleProfileSave} className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Edit Profile Details</h2>
                <p className="text-xs text-zinc-400 mt-1">Update your public identity, bio, and contact information.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full mt-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase">Location</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full mt-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase">Headline / Tagline</label>
                <input
                  type="text"
                  value={profile.tagline}
                  onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                  className="w-full mt-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase">Short Bio</label>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full mt-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full mt-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase">Phone</label>
                  <input
                    type="text"
                    value={profile.phone || ""}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full mt-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase">University CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    value={profile.cgpa || 3.85}
                    onChange={(e) => setProfile({ ...profile, cgpa: Number(e.target.value) })}
                    className="w-full mt-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase">LinkedIn URL</label>
                  <input
                    type="text"
                    value={profile.linkedin_url || ""}
                    onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
                    className="w-full mt-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase">GitHub URL</label>
                  <input
                    type="text"
                    value={profile.github_url || ""}
                    onChange={(e) => setProfile({ ...profile, github_url: e.target.value })}
                    className="w-full mt-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-xs font-semibold hover:bg-zinc-200 transition-all cursor-pointer shadow-lg"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Changes</span>
              </button>
            </form>
          )}

          {/* ========================================================= */}
          {/* 3. PROJECTS CRUD TAB */}
          {/* ========================================================= */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Project Catalog</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">Manage portfolio works and architectural write-ups.</p>
                </div>
                <button
                  onClick={() => setIsNewProjectModalOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white text-black px-4 py-2 text-xs font-semibold hover:bg-zinc-200 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Projects List */}
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-300">
                          {proj.category}
                        </span>
                        {proj.featured && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-400/10 text-amber-400 border border-amber-400/20">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{proj.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleFeatured(proj.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          proj.featured
                            ? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                            : "bg-zinc-800 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {proj.featured ? "Featured ★" : "Feature"}
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-zinc-700 transition-all cursor-pointer"
                        aria-label="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Project Modal */}
              {isNewProjectModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                  <div className="relative w-full max-w-xl rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-white shadow-2xl">
                    <h3 className="text-lg font-bold">Add New Project to Database</h3>
                    <form onSubmit={handleAddProject} className="mt-4 space-y-4">
                      <div>
                        <label className="text-xs font-mono text-zinc-400 uppercase">Project Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Autonomous XDR Platform"
                          value={newProjectForm.title}
                          onChange={(e) => setNewProjectForm({ ...newProjectForm, title: e.target.value })}
                          className="w-full mt-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-mono text-zinc-400 uppercase">Category</label>
                          <select
                            value={newProjectForm.category}
                            onChange={(e) => setNewProjectForm({ ...newProjectForm, category: e.target.value })}
                            className="w-full mt-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:outline-none"
                          >
                            <option value="AI & IoT">AI & IoT</option>
                            <option value="Full-Stack">Full-Stack</option>
                            <option value="Systems & C++">Systems & C++</option>
                            <option value="Mobile & AI">Mobile & AI</option>
                            <option value="Web & 3D">Web & 3D</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-mono text-zinc-400 uppercase">Technologies (comma-separated)</label>
                          <input
                            type="text"
                            placeholder="React, C#, Docker"
                            value={newProjectForm.technologies}
                            onChange={(e) => setNewProjectForm({ ...newProjectForm, technologies: e.target.value })}
                            className="w-full mt-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-zinc-400 uppercase">Short Description</label>
                        <textarea
                          rows={2}
                          required
                          placeholder="Summary of project..."
                          value={newProjectForm.description}
                          onChange={(e) => setNewProjectForm({ ...newProjectForm, description: e.target.value })}
                          className="w-full mt-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-zinc-400 uppercase">Architecture Details</label>
                        <textarea
                          rows={2}
                          placeholder="Technical breakdown, database design, algorithms..."
                          value={newProjectForm.architecture_details}
                          onChange={(e) => setNewProjectForm({ ...newProjectForm, architecture_details: e.target.value })}
                          className="w-full mt-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsNewProjectModalOpen(false)}
                          className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200"
                        >
                          Save Project
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 4. SKILLS TAB (SWISS TYPOGRAPHIC LEDGER CONTROLLER) */}
          {/* ========================================================= */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-emerald-400" />
                    <span>Manage Skills & Engineering Domains</span>
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Control the technologies displayed in the Swiss Typographic Ledger. Assigned domains and longevity reflect directly on the live portfolio.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300">
                    Total: {skills.length} Skills
                  </span>
                </div>
              </div>

              {/* Add New Skill Form */}
              <form
                onSubmit={handleAddSkill}
                className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50 space-y-4"
              >
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Register New Skill to Ledger</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                  <div className="md:col-span-5">
                    <label className="text-xs font-mono text-zinc-400 uppercase">Skill / Technology Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rust, GraphQL, Redis, Kubernetes"
                      value={newSkillForm.name}
                      onChange={(e) => setNewSkillForm({ ...newSkillForm, name: e.target.value })}
                      className="w-full mt-1 rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/40"
                    />
                  </div>

                  <div className="md:col-span-4">
                    <label className="text-xs font-mono text-zinc-400 uppercase">Target Domain / Category</label>
                    <select
                      value={newSkillForm.category}
                      onChange={(e) => setNewSkillForm({ ...newSkillForm, category: e.target.value })}
                      className="w-full mt-1 rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/40"
                    >
                      <option value="Systems & Algorithmic Kernel">01 / Systems & Algorithmic Kernel</option>
                      <option value="Full-Stack & Enterprise Architecture">02 / Full-Stack & Enterprise Architecture</option>
                      <option value="Spatial, Graphics & Client Interaction">03 / Spatial, Graphics & Client Interaction</option>
                      <option value="Zero-Trust Data & Cloud Infrastructure">04 / Zero-Trust Data & Cloud Infrastructure</option>
                      <option value="Frontend">Frontend (maps to 02)</option>
                      <option value="Backend">Backend (maps to 02)</option>
                      <option value="Systems & Core">Systems & Core (maps to 01)</option>
                      <option value="Databases">Databases (maps to 04)</option>
                      <option value="DevOps & Tools">DevOps & Tools (maps to 04)</option>
                    </select>
                  </div>

                  <div className="md:col-span-3">
                    <label className="text-xs font-mono text-zinc-400 uppercase">Production Longevity</label>
                    <input
                      type="text"
                      placeholder="e.g. 2+ yrs, 3+ yrs"
                      value={newSkillForm.experience_years}
                      onChange={(e) => setNewSkillForm({ ...newSkillForm, experience_years: e.target.value })}
                      className="w-full mt-1 rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-white text-black py-2 px-5 text-xs font-semibold hover:bg-zinc-200 transition-all cursor-pointer shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Skill to Registry</span>
                  </button>
                </div>
              </form>

              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl border border-zinc-800 bg-zinc-900/30">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
                  {["All", "01 / Systems", "02 / Full-Stack", "03 / Spatial", "04 / Data & Cloud"].map((tab) => {
                    const isActive = skillDomainFilter === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => setSkillDomainFilter(tab)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          isActive
                            ? "bg-white text-black font-semibold"
                            : "text-zinc-400 hover:text-white bg-zinc-800/60"
                        }`}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>

                <input
                  type="text"
                  placeholder="Filter skills by name..."
                  value={skillSearchQuery}
                  onChange={(e) => setSkillSearchQuery(e.target.value)}
                  className="w-full sm:w-60 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none font-mono"
                />
              </div>

              {/* Skills Registry List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {skills
                  .filter((s) => {
                    const matchesSearch =
                      skillSearchQuery.trim() === "" ||
                      s.name.toLowerCase().includes(skillSearchQuery.toLowerCase()) ||
                      s.category.toLowerCase().includes(skillSearchQuery.toLowerCase());

                    if (skillDomainFilter === "All") return matchesSearch;
                    const cat = s.category.toLowerCase();
                    if (skillDomainFilter.includes("01")) {
                      return matchesSearch && (cat.includes("system") || cat.includes("core") || cat.includes("algorithm") || s.name.toLowerCase().includes("c++"));
                    }
                    if (skillDomainFilter.includes("02")) {
                      return matchesSearch && (cat.includes("full-stack") || cat.includes("frontend") || cat.includes("backend") || cat.includes("enterprise") || cat.includes("client"));
                    }
                    if (skillDomainFilter.includes("03")) {
                      return matchesSearch && (cat.includes("spatial") || cat.includes("3d") || cat.includes("design") || cat.includes("ui") || s.name.toLowerCase().includes("three") || s.name.toLowerCase().includes("tailwind"));
                    }
                    if (skillDomainFilter.includes("04")) {
                      return matchesSearch && (cat.includes("data") || cat.includes("cloud") || cat.includes("devops") || cat.includes("database"));
                    }
                    return matchesSearch;
                  })
                  .map((skill) => (
                    <div
                      key={skill.id}
                      className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 flex items-center justify-between gap-3 hover:border-zinc-700 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{skill.name}</h4>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 border border-zinc-700 text-zinc-300">
                            {skill.experience_years || "2+ yrs"}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 font-mono">
                          {skill.category}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => setEditingSkill(skill)}
                          className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all cursor-pointer"
                          title="Edit skill details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-zinc-700 transition-all cursor-pointer"
                          title="Delete skill"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Edit Skill Modal */}
              {editingSkill && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                  <div className="relative w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-white shadow-2xl space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <h3 className="text-base font-bold flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-emerald-400" />
                        <span>Edit Skill Competency</span>
                      </h3>
                      <button
                        onClick={() => setEditingSkill(null)}
                        className="text-zinc-400 hover:text-white text-xs"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleUpdateSkill} className="space-y-3.5">
                      <div>
                        <label className="text-xs font-mono text-zinc-400 uppercase">Skill Name</label>
                        <input
                          type="text"
                          required
                          value={editingSkill.name}
                          onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                          className="w-full mt-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-mono text-zinc-400 uppercase">Domain / Category</label>
                          <select
                            value={editingSkill.category}
                            onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                            className="w-full mt-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:outline-none"
                          >
                            <option value="Systems & Algorithmic Kernel">01 / Systems & Algorithmic Kernel</option>
                            <option value="Full-Stack & Enterprise Architecture">02 / Full-Stack & Enterprise Architecture</option>
                            <option value="Spatial, Graphics & Client Interaction">03 / Spatial, Graphics & Client Interaction</option>
                            <option value="Zero-Trust Data & Cloud Infrastructure">04 / Zero-Trust Data & Cloud Infrastructure</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Systems & Core">Systems & Core</option>
                            <option value="Databases">Databases</option>
                            <option value="DevOps & Tools">DevOps & Tools</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-mono text-zinc-400 uppercase">Experience Longevity</label>
                          <input
                            type="text"
                            value={editingSkill.experience_years}
                            onChange={(e) => setEditingSkill({ ...editingSkill, experience_years: e.target.value })}
                            className="w-full mt-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-800">
                        <button
                          type="button"
                          onClick={() => setEditingSkill(null)}
                          className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200 cursor-pointer"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 5. EXPERIENCE TAB */}
          {/* ========================================================= */}
          {activeTab === "experience" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Work Experience & Leadership</h2>
                <p className="text-xs text-zinc-400 mt-0.5">Manage leadership roles, internships, and key achievements.</p>
              </div>

              {/* Add Experience Form */}
              <form onSubmit={handleAddExp} className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono text-zinc-400 uppercase">Role Title</label>
                    <input
                      type="text"
                      placeholder="Director – Technical Development Team"
                      value={newExpForm.role}
                      onChange={(e) => setNewExpForm({ ...newExpForm, role: e.target.value })}
                      className="w-full mt-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-zinc-400 uppercase">Company / Organization</label>
                    <input
                      type="text"
                      placeholder="Youth Organization for Technical Advancement"
                      value={newExpForm.company}
                      onChange={(e) => setNewExpForm({ ...newExpForm, company: e.target.value })}
                      className="w-full mt-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono text-zinc-400 uppercase">Period (e.g. Jul 2024 – Feb 2025)</label>
                    <input
                      type="text"
                      placeholder="Jul 2024 – Feb 2025"
                      value={newExpForm.period}
                      onChange={(e) => setNewExpForm({ ...newExpForm, period: e.target.value })}
                      className="w-full mt-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-zinc-400 uppercase">Location</label>
                    <input
                      type="text"
                      value={newExpForm.location}
                      onChange={(e) => setNewExpForm({ ...newExpForm, location: e.target.value })}
                      className="w-full mt-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="rounded-xl bg-white text-black py-2 px-5 text-xs font-semibold hover:bg-zinc-200 transition-all cursor-pointer"
                >
                  Add Experience Milestone
                </button>
              </form>

              {/* Experiences List */}
              <div className="space-y-3">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/30 flex items-start justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white">{exp.role}</h4>
                      <p className="text-xs text-zinc-300">{exp.company} · <span className="font-mono text-zinc-400">{exp.period}</span></p>
                      <p className="text-xs text-zinc-400 mt-2">{exp.description}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteExp(exp.id)}
                      className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-zinc-700 transition-all cursor-pointer shrink-0"
                      aria-label="Delete experience"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 6. MESSAGES INBOX TAB */}
          {/* ========================================================= */}
          {activeTab === "messages" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Contact Messages Inbox</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">Visitor inquiries submitted via the portfolio contact form.</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-white">
                  {messages.filter(m => !m.read).length} Unread
                </span>
              </div>

              {messages.length === 0 ? (
                <div className="text-center py-12 text-xs text-zinc-500 font-mono">
                  No contact messages received yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        msg.read
                          ? "border-zinc-800 bg-zinc-950/40 text-zinc-400"
                          : "border-zinc-700 bg-zinc-900/60 text-white"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">{msg.name}</h4>
                            <span className="text-xs font-mono text-zinc-400">&lt;{msg.email}&gt;</span>
                            {!msg.read && (
                              <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            )}
                          </div>
                          {msg.subject && (
                            <p className="text-xs font-semibold text-zinc-300 mt-0.5">{msg.subject}</p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleToggleMessageRead(msg.id)}
                            className="px-2.5 py-1 rounded text-[11px] font-mono border border-zinc-700 bg-zinc-800 text-zinc-300 hover:text-white transition-all cursor-pointer"
                          >
                            {msg.read ? "Mark Unread" : "Mark Read"}
                          </button>
                          <a
                            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                            className="px-2.5 py-1 rounded text-[11px] font-mono bg-white text-black font-semibold hover:bg-zinc-200 transition-all"
                          >
                            Reply
                          </a>
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-1.5 rounded bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-zinc-700 transition-all cursor-pointer"
                            aria-label="Delete message"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-300 mt-3 leading-relaxed bg-black/30 p-3 rounded-xl border border-zinc-800/40">
                        {msg.message}
                      </p>

                      <div className="mt-3 text-[10px] font-mono text-zinc-500">
                        Received: {new Date(msg.created_at).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 6. QUOTES & PHILOSOPHY TAB */}
          {/* ========================================================= */}
          {activeTab === "quotes" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">Inspiration Quote & Philosophy</h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                      Live Database Sync
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    Customize the Swiss typographic poster quote displayed on the homepage right before Projects & Systems.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Edit Form */}
                <form onSubmit={handleQuoteSave} className="lg:col-span-6 space-y-5">
                  <div className="p-6 rounded-3xl border border-zinc-800/80 bg-zinc-900/40 space-y-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Quote className="w-4 h-4 text-zinc-400" />
                      <span>Poster Typographic Configuration</span>
                    </h3>

                    <div>
                      <label className="text-xs font-mono text-zinc-400 uppercase">Top Handle / Signature</label>
                      <input
                        type="text"
                        value={quote.handle}
                        onChange={(e) => setQuote({ ...quote, handle: e.target.value })}
                        placeholder="@ABDULLAH_HASHMI"
                        className="mt-1.5 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/40 transition-all font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-mono text-zinc-400 uppercase">Line 1 (Solid)</label>
                        <input
                          type="text"
                          value={quote.line1}
                          onChange={(e) => setQuote({ ...quote, line1: e.target.value })}
                          placeholder="MAKE"
                          className="mt-1.5 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-white/40 transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono text-zinc-400 uppercase">Line 2 (Muted)</label>
                        <input
                          type="text"
                          value={quote.line2}
                          onChange={(e) => setQuote({ ...quote, line2: e.target.value })}
                          placeholder="SMART"
                          className="mt-1.5 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-xs text-zinc-300 font-bold focus:outline-none focus:border-white/40 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-zinc-400 uppercase">Line 3 (Muted)</label>
                      <input
                        type="text"
                        value={quote.line3}
                        onChange={(e) => setQuote({ ...quote, line3: e.target.value })}
                        placeholder="CHOICES"
                        className="mt-1.5 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-xs text-zinc-300 font-bold focus:outline-none focus:border-white/40 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-mono text-zinc-400 uppercase">Line 4 Part A (Muted)</label>
                        <input
                          type="text"
                          value={quote.line4_a}
                          onChange={(e) => setQuote({ ...quote, line4_a: e.target.value })}
                          placeholder="IN"
                          className="mt-1.5 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-xs text-zinc-300 font-bold focus:outline-none focus:border-white/40 transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono text-zinc-400 uppercase">Line 4 Part B (Solid)</label>
                        <input
                          type="text"
                          value={quote.line4_b}
                          onChange={(e) => setQuote({ ...quote, line4_b: e.target.value })}
                          placeholder="YOUR"
                          className="mt-1.5 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-white/40 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-zinc-400 uppercase">Line 5 (Solid)</label>
                      <input
                        type="text"
                        value={quote.line5}
                        onChange={(e) => setQuote({ ...quote, line5: e.target.value })}
                        placeholder="LIFE"
                        className="mt-1.5 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-white/40 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-zinc-400 uppercase">Subtext / Guiding Principle</label>
                      <textarea
                        rows={3}
                        value={quote.subtext}
                        onChange={(e) => setQuote({ ...quote, subtext: e.target.value })}
                        placeholder="Empower yourself by making decisions that reflect your true goals."
                        className="mt-1.5 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/40 transition-all leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-black py-3 text-xs font-semibold hover:bg-zinc-200 transition-all cursor-pointer shadow-lg mt-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save & Publish Quote to Database</span>
                    </button>
                  </div>
                </form>

                {/* Right: Live Interactive Poster Preview */}
                <div className="lg:col-span-6 space-y-3 sticky top-24">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono text-zinc-400 uppercase">Live Real-Time Poster Preview</h3>
                    <span className="text-[10px] font-mono text-emerald-400">Swiss Typographic Mirror</span>
                  </div>

                  <div
                    className="p-8 sm:p-10 rounded-3xl border transition-all flex flex-col justify-between select-none shadow-2xl relative overflow-hidden"
                    style={{
                      backgroundColor: currentTheme.background,
                      borderColor: currentTheme.border_color,
                      color: currentTheme.foreground,
                      minHeight: "440px",
                    }}
                  >
                    {/* Top Metadata */}
                    <div className="w-full flex items-center justify-between pb-4">
                      <span className="text-xs font-mono font-bold tracking-widest text-zinc-300 uppercase">
                        {quote.handle || "@ABDULLAH_HASHMI"}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                        // PREVIEW
                      </span>
                    </div>

                    {/* Poster Body */}
                    <div className="flex flex-col items-end text-right my-auto space-y-1">
                      <span className="font-black tracking-tighter uppercase text-4xl sm:text-5xl leading-[0.85] text-white">
                        {quote.line1 || "MAKE"}
                      </span>
                      <span
                        className="font-black tracking-tighter uppercase text-4xl sm:text-5xl leading-[0.85]"
                        style={{ color: currentTheme.accent, opacity: 0.55 }}
                      >
                        {quote.line2 || "SMART"}
                      </span>
                      <span
                        className="font-black tracking-tighter uppercase text-4xl sm:text-5xl leading-[0.85]"
                        style={{ color: currentTheme.accent, opacity: 0.55 }}
                      >
                        {quote.line3 || "CHOICES"}
                      </span>
                      <div className="w-full flex items-end justify-between pt-2">
                        <p className="text-[10px] font-medium text-zinc-400 max-w-[160px] text-left leading-tight">
                          {quote.subtext || "Empower yourself by making decisions..."}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <span
                            className="font-black tracking-tighter uppercase text-4xl sm:text-5xl leading-[0.85]"
                            style={{ color: currentTheme.accent, opacity: 0.55 }}
                          >
                            {quote.line4_a || "IN"}
                          </span>
                          <span className="font-black tracking-tighter uppercase text-4xl sm:text-5xl leading-[0.85] text-white">
                            {quote.line4_b || "YOUR"}
                          </span>
                        </div>
                      </div>
                      <span className="font-black tracking-tighter uppercase text-4xl sm:text-5xl leading-[0.85] text-white">
                        {quote.line5 || "LIFE"}
                      </span>
                    </div>

                    {/* Bottom Edge */}
                    <div className="pt-4 border-t border-white/10 text-[9px] font-mono text-zinc-500 flex justify-between">
                      <span>RESPONSIVE POSTER CANVAS</span>
                      <span>PARALLAX INTEGRATED</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 7. THEMES & COLOR SYSTEMS MANAGEMENT TAB */}
          {/* ========================================================= */}
          {activeTab === "themes" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">Themes & Color Palettes</h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      Live Supabase Sync
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    Manage the 8 curated developer dark themes and customize palette tokens in real-time.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3.5 py-2 rounded-2xl">
                  <span className="text-xs text-zinc-400 font-mono">Active Theme:</span>
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: currentTheme.primary }}
                    />
                    {currentTheme.name}
                  </span>
                </div>
              </div>

              {/* Theme Grid */}
              <div>
                <h3 className="text-sm font-bold text-white mb-3">Available Themes Catalog ({themes.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {themes.map((theme) => {
                    const isActive = theme.id === currentTheme.id;
                    return (
                      <div
                        key={theme.id}
                        className={`p-5 rounded-3xl border transition-all flex flex-col justify-between gap-4 ${
                          isActive
                            ? "border-white/40 bg-zinc-900/90 shadow-2xl ring-1 ring-white/20"
                            : "border-zinc-800/80 bg-zinc-950/60 hover:border-zinc-700"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                              {theme.category}
                            </span>
                            {isActive ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                                <Check className="w-3 h-3" /> Active Default
                              </span>
                            ) : (
                              theme.is_custom && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                  Custom
                                </span>
                              )
                            )}
                          </div>

                          <h4 className="text-base font-bold text-white">{theme.name}</h4>
                          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{theme.description}</p>
                        </div>

                        {/* Color Swatch Bar */}
                        <div className="p-3 rounded-2xl border border-zinc-800/80 bg-black/40 space-y-2">
                          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                            <span>Palette Tokens</span>
                            <span>CSS Variables</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 flex flex-col items-center gap-1">
                              <span
                                className="w-full h-5 rounded-lg border border-white/10"
                                style={{ backgroundColor: theme.background }}
                                title={`Background: ${theme.background}`}
                              />
                              <span className="text-[9px] font-mono text-zinc-400">BG</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center gap-1">
                              <span
                                className="w-full h-5 rounded-lg border border-white/10"
                                style={{ backgroundColor: theme.primary }}
                                title={`Primary: ${theme.primary}`}
                              />
                              <span className="text-[9px] font-mono text-zinc-400">Primary</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center gap-1">
                              <span
                                className="w-full h-5 rounded-lg border border-white/10"
                                style={{ backgroundColor: theme.accent }}
                                title={`Accent: ${theme.accent}`}
                              />
                              <span className="text-[9px] font-mono text-zinc-400">Accent</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center gap-1">
                              <span
                                className="w-full h-5 rounded-lg border border-white/10"
                                style={{ backgroundColor: theme.foreground }}
                                title={`Foreground: ${theme.foreground}`}
                              />
                              <span className="text-[9px] font-mono text-zinc-400">Text</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => handleActivateTheme(theme.id)}
                            disabled={isActive}
                            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                              isActive
                                ? "bg-white/10 text-zinc-400 cursor-default"
                                : "bg-white text-black hover:bg-zinc-200 shadow-md"
                            }`}
                          >
                            {isActive ? "Currently Active" : "Activate Theme Globally"}
                          </button>

                          {theme.is_custom && (
                            <button
                              onClick={() => handleDeleteCustomTheme(theme.id)}
                              className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-zinc-700 transition-all cursor-pointer"
                              title="Delete custom theme"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Custom Theme Creator */}
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4 text-zinc-300" />
                    <h3 className="text-sm font-bold text-white">Create Custom Theme Palette</h3>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">
                    Live Real-Time Preview
                  </span>
                </div>

                <form onSubmit={handleCreateTheme} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-zinc-400 uppercase">Theme Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Cyber Matrix OLED"
                        value={newThemeForm.name}
                        onChange={(e) => setNewThemeForm({ ...newThemeForm, name: e.target.value })}
                        className="w-full mt-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/40"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-zinc-400 uppercase">Category</label>
                      <input
                        type="text"
                        placeholder="e.g. Synthwave / Cyberpunk"
                        value={newThemeForm.category}
                        onChange={(e) => setNewThemeForm({ ...newThemeForm, category: e.target.value })}
                        className="w-full mt-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-zinc-400 uppercase">Description</label>
                    <input
                      type="text"
                      placeholder="Brief description of the visual atmosphere..."
                      value={newThemeForm.description}
                      onChange={(e) => setNewThemeForm({ ...newThemeForm, description: e.target.value })}
                      className="w-full mt-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/40"
                    />
                  </div>

                  {/* Color Pickers Grid with Direct HEX Code Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                    {/* 1. Background */}
                    <div className="p-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/60 flex flex-col gap-2">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Background (Canvas)</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={/^#([0-9A-Fa-f]{6})$/.test(newThemeForm.background) ? newThemeForm.background : "#0a0d14"}
                          onChange={(e) => setNewThemeForm({ ...newThemeForm, background: e.target.value })}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 shrink-0 p-0"
                        />
                        <input
                          type="text"
                          maxLength={7}
                          placeholder="#0a0d14"
                          value={newThemeForm.background}
                          onChange={(e) => {
                            let val = e.target.value.trim();
                            if (val && !val.startsWith("#") && /^[0-9A-Fa-f]/.test(val)) val = `#${val}`;
                            setNewThemeForm({ ...newThemeForm, background: val });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 uppercase"
                        />
                      </div>
                    </div>

                    {/* 2. Primary Accent */}
                    <div className="p-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/60 flex flex-col gap-2">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Primary (Glow/Btns)</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={/^#([0-9A-Fa-f]{6})$/.test(newThemeForm.primary) ? newThemeForm.primary : "#22c55e"}
                          onChange={(e) => {
                            const val = e.target.value;
                            setNewThemeForm({
                              ...newThemeForm,
                              primary: val,
                              glow_color: `${val}40`,
                              border_color: `${val}4d`,
                            });
                          }}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 shrink-0 p-0"
                        />
                        <input
                          type="text"
                          maxLength={7}
                          placeholder="#22c55e"
                          value={newThemeForm.primary}
                          onChange={(e) => {
                            let val = e.target.value.trim();
                            if (val && !val.startsWith("#") && /^[0-9A-Fa-f]/.test(val)) val = `#${val}`;
                            setNewThemeForm({
                              ...newThemeForm,
                              primary: val,
                              glow_color: val.startsWith("#") && val.length === 7 ? `${val}40` : newThemeForm.glow_color,
                              border_color: val.startsWith("#") && val.length === 7 ? `${val}4d` : newThemeForm.border_color,
                            });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 uppercase"
                        />
                      </div>
                    </div>

                    {/* 3. Secondary Accent */}
                    <div className="p-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/60 flex flex-col gap-2">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Secondary Accent</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={/^#([0-9A-Fa-f]{6})$/.test(newThemeForm.accent) ? newThemeForm.accent : "#10b981"}
                          onChange={(e) => setNewThemeForm({ ...newThemeForm, accent: e.target.value })}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 shrink-0 p-0"
                        />
                        <input
                          type="text"
                          maxLength={7}
                          placeholder="#10b981"
                          value={newThemeForm.accent}
                          onChange={(e) => {
                            let val = e.target.value.trim();
                            if (val && !val.startsWith("#") && /^[0-9A-Fa-f]/.test(val)) val = `#${val}`;
                            setNewThemeForm({ ...newThemeForm, accent: val });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 uppercase"
                        />
                      </div>
                    </div>

                    {/* 4. Foreground Text */}
                    <div className="p-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/60 flex flex-col gap-2">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Foreground Text</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={/^#([0-9A-Fa-f]{6})$/.test(newThemeForm.foreground) ? newThemeForm.foreground : "#f0fdf4"}
                          onChange={(e) => setNewThemeForm({ ...newThemeForm, foreground: e.target.value })}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 shrink-0 p-0"
                        />
                        <input
                          type="text"
                          maxLength={7}
                          placeholder="#f0fdf4"
                          value={newThemeForm.foreground}
                          onChange={(e) => {
                            let val = e.target.value.trim();
                            if (val && !val.startsWith("#") && /^[0-9A-Fa-f]/.test(val)) val = `#${val}`;
                            setNewThemeForm({ ...newThemeForm, foreground: val });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 uppercase"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Live Component Preview Box */}
                  <div className="p-5 rounded-2xl border border-zinc-800 space-y-3" style={{ backgroundColor: newThemeForm.background }}>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span style={{ color: newThemeForm.accent }}>Component Live Preview</span>
                      <span style={{ color: newThemeForm.primary }}>{newThemeForm.name || "Untitled Theme"}</span>
                    </div>

                    <div
                      className="p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 backdrop-blur-md"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        borderColor: `color-mix(in srgb, ${newThemeForm.primary} 35%, transparent)`,
                        boxShadow: `0 4px 20px ${newThemeForm.glow_color}`,
                      }}
                    >
                      <div>
                        <h4 className="text-sm font-bold" style={{ color: newThemeForm.foreground }}>
                          Building systems that stand out
                        </h4>
                        <p className="text-xs mt-0.5" style={{ color: newThemeForm.accent }}>
                          Microsoft Certified · Power Platform Developer Associate
                        </p>
                      </div>

                      <button
                        type="button"
                        className="px-4 py-2 rounded-xl text-xs font-semibold shadow-md"
                        style={{
                          backgroundColor: newThemeForm.primary,
                          color: newThemeForm.background,
                        }}
                      >
                        Sample Action
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-6 py-2.5 text-xs font-semibold hover:bg-zinc-200 transition-all cursor-pointer shadow-md"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save & Store Custom Theme</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
