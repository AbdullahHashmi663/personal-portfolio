# 🌌 Abdullah Bin Zubair Hashmi — Systems Engineer & Full-Stack Portfolio

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Microsoft Certified](https://img.shields.io/badge/Microsoft_Certified-Power_Platform_Dev-0078D4?style=for-the-badge&logo=microsoft)](https://learn.microsoft.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **Architecting scalable full-stack applications, AI-powered IoT cyber-defense frameworks, and high-performance interactive systems.**

---

## 🚀 Live Demo & Portfolio Highlights

- **Repository**: [https://github.com/AbdullahHashmi663/personal-portfolio.git](https://github.com/AbdullahHashmi663/personal-portfolio.git)
- **Role**: Full-Stack Developer & Systems Engineer (C++, ASP.NET Core, Next.js, PostgreSQL)
- **Academic Standing**: Final-Year IT Bachelor at Bahria University (3.85 CGPA)
- **Certification**: Microsoft Certified · Power Platform Developer Associate

---

## ✨ Architectural Features

### 1. ⚡ Global Preloader Boot Sequence
- High-precision telemetry loader with real-time numeric percentage counter (`0%` to `100%`).
- Spinning geometric sunburst emblem with pulsing glowing core.
- Dynamic system boot milestones and hardware acceleration detection.
- Cinematic slide-up curtain reveal with cubic-bezier easing.

### 2. 🎨 Multi-Tier Theme State & 0ms Cache Management
- **8 Curated Developer Themes**: OLED Obsidian, Tokyo Night, Catppuccin Mocha, Nord Aurora, Cyberpunk 2077, Emerald Matrix, Nebula Violet, and Sunset Amber.
- **Zero-FOUT (Flash of Unstyled Theme)**: Immediate inline DOM token script hydrates theme custom properties before React ticks.
- **Multi-Tier Write-Through Caching**: In-memory singleton cache + persistent `localStorage` cache + Stale-While-Revalidate (SWR) background Supabase synchronization.
- **Component-Wide Synchronization**: Dynamically updates sticky navigation bar, reading scroll meter, typography, borders, glow effects, modals, and telemetry gauges.

### 3. 🖼️ Swiss Typographic Inspiration Quote Section
- Massive, full-bleed kinetic typography poster layout inspired by brutalist Swiss graphic design.
- Interlocking dual-tone color contrast (solid primary foreground vs. muted accent tones).
- Parallax letter shifts responding to scroll physics.
- Fully dynamic and editable via Supabase and Admin CMS with live real-time preview.

### 4. 📊 HUD Bento Skills Matrix & Engineering Radar
- Real-time search filter and interactive category chips with live count badges.
- Core telemetry gauges for Full-Stack Architecture (96%), Systems & Algorithms in C++ (94%), Enterprise ASP.NET (93%), and Database Systems (92%).
- Ecosystem sub-tags per skill (e.g. *App Router*, *Memory Management*, *PostgreSQL RLS*).
- 3 categorized pods for IDEs/Compilers, Database Studios, and DevOps/Cloud/UI.

### 5. 🛡️ Complete Admin CMS & Database Control Center (`/admin`)
- Project management gate with protected authentication.
- Live CMS for Profile configuration, Projects & Systems with deep-dive modal support, Skills matrix, Work Experience timeline, and Inspiration Quotes.
- Custom Theme Builder with live component color preview and one-click global deployment.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework & Core** | Next.js 16 (App Router, Turbopack, Server Actions), React 19, TypeScript |
| **Styling & Design System** | Tailwind CSS, CSS Custom Properties / Tokens, Glassmorphism, Swiss Brutalism |
| **Animation & Physics** | GSAP, Motion (Framer Motion), Lenis Momentum Scroll Physics, Three.js / WebGL |
| **Database & Auth** | Supabase (PostgreSQL, Row Level Security, Realtime REST Client) |
| **Icons & Typography** | Lucide React, Geist Sans & Geist Mono Google Fonts |

---

## 📁 Repository Structure

```
├── .agents/                   # Design system and UI/UX skill references
├── public/                    # Static assets, portfolio imagery, resumes, and shaders
│   ├── gallery/               # Project screenshots & visual assets
│   └── Abdullah_Bin_Zubair_Hashmi_CV__3_.pdf
├── src/
│   ├── app/
│   │   ├── admin/             # Admin CMS Portal (Themes, Quotes, Projects, Skills)
│   │   ├── globals.css        # Core design tokens, CSS variables, and themes
│   │   ├── layout.tsx         # Root layout with zero-FOUT cache script & preloader
│   │   └── page.tsx           # Main single-page portfolio application
│   ├── components/            # Modular UI components
│   │   ├── GlobalPreloader.tsx
│   │   ├── InspirationQuoteSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── ScrollProgressBar.tsx
│   │   └── SmoothScroll.tsx
│   ├── context/
│   │   └── ThemeContext.tsx   # Theme state provider with SWR synchronization
│   ├── lib/
│   │   ├── data.ts            # Database fetch & fallback datasets
│   │   ├── themeCache.ts      # Multi-tier in-memory & localStorage caching engine
│   │   ├── themes.ts          # Curated 8 developer color themes
│   │   └── supabase/          # Supabase client configurations
│   └── types/
│       └── database.ts        # Full TypeScript database definitions
└── supabase/
    └── schema.sql             # SQL DDL schemas, RLS policies, and seed data
```

---

## ⚙️ Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/AbdullahHashmi663/personal-portfolio.git
cd personal-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Setup (Supabase)

1. Open your **Supabase Dashboard** -> **SQL Editor**.
2. Copy and paste the entire contents of [`supabase/schema.sql`](supabase/schema.sql).
3. Click **Run** to generate tables (`profiles`, `projects`, `skills`, `experiences`, `certifications`, `quotes`, `themes`, `messages`) and seed initial verified resume records.

---

## 👨‍💻 Author

**Abdullah Bin Zubair Hashmi**
- 🌐 Portfolio: [abdullahbinzubairhashmi.dev](https://abdullahbinzubairhashmi.dev)
- 💼 LinkedIn: [linkedin.com/in/abdullah-bin-zubair-hashmi](https://linkedin.com/in/abdullah-bin-zubair-hashmi)
- 🐙 GitHub: [@AbdullahHashmi663](https://github.com/AbdullahHashmi663)
- 📧 Email: [abdullahbinzubairhashmi@gmail.com](mailto:abdullahbinzubairhashmi@gmail.com)

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
