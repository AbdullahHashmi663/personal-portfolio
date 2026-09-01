-- ==============================================================================
-- ABDULLAH BIN ZUBAIR HASHMI - PORTFOLIO DATABASE SCHEMA & SEED DATA
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  bio TEXT NOT NULL,
  about_text TEXT,
  location TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  resume_url TEXT,
  avatar_url TEXT,
  cgpa NUMERIC(3, 2),
  university TEXT,
  degree TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- 'AI & IoT', 'Full-Stack', 'Systems & C++', 'Mobile', 'Web'
  image_url TEXT,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  github_url TEXT,
  live_url TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  architecture_details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'Frontend', 'Backend', 'Systems & Core', 'Databases', 'DevOps & Tools'
  proficiency INTEGER NOT NULL DEFAULT 85, -- 1 to 100
  experience_years TEXT NOT NULL DEFAULT '2+ yrs',
  icon_name TEXT,
  featured BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  location TEXT,
  period TEXT NOT NULL,
  description TEXT NOT NULL,
  achievements TEXT[] NOT NULL DEFAULT '{}',
  technologies TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. CERTIFICATIONS & RESEARCH TABLE
CREATE TABLE IF NOT EXISTS public.certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  period TEXT,
  type TEXT NOT NULL, -- 'Certification', 'Research', 'Honor'
  description TEXT,
  link_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public projects are viewable by everyone" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public skills are viewable by everyone" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public experiences are viewable by everyone" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Public certifications are viewable by everyone" ON public.certifications FOR SELECT USING (true);
CREATE POLICY "Anyone can insert messages" ON public.messages FOR INSERT WITH CHECK (true);

-- Admin CRUD policies (Service role / authenticated)
CREATE POLICY "Full access for service role on profiles" ON public.profiles USING (true) WITH CHECK (true);
CREATE POLICY "Full access for service role on projects" ON public.projects USING (true) WITH CHECK (true);
CREATE POLICY "Full access for service role on skills" ON public.skills USING (true) WITH CHECK (true);
CREATE POLICY "Full access for service role on experiences" ON public.experiences USING (true) WITH CHECK (true);
CREATE POLICY "Full access for service role on certifications" ON public.certifications USING (true) WITH CHECK (true);
CREATE POLICY "Full access for service role on messages" ON public.messages USING (true) WITH CHECK (true);

-- ==============================================================================
-- SEED DATA FROM ABDULLAH BIN ZUBAIR HASHMI'S RESUME
-- ==============================================================================

-- Clear existing sample data
TRUNCATE TABLE public.messages, public.certifications, public.experiences, public.skills, public.projects, public.profiles RESTART IDENTITY;

-- 1. Insert Profile
INSERT INTO public.profiles (
  name, tagline, bio, about_text, location, email, phone, github_url, linkedin_url, website_url, resume_url, avatar_url, cgpa, university, degree
) VALUES (
  'Abdullah Bin Zubair Hashmi',
  'Full Stack Developer | C++ & ASP.NET Engineer | Front-End (React & Next.js) | Creative Technologist',
  'Full Stack Developer skilled in JavaScript, React, C#, HTML/CSS, PHP, C++, AWS, and Next.js, with experience building responsive web applications such as the YOTA website and Timetable Management System. Strong in SQL Server, SQLite3, and 2D/3D web animation.',
  'Dedicated Final-Year IT Bachelor student at Bahria University with a 3.85 CGPA. Former Director of the Technical Development Team and Coordinator of Competitive Programming at YOTA. Passionate about architecting scalable full-stack applications, AI-powered IoT security frameworks, and high-performance interactive experiences.',
  'Rawalpindi & Islamabad, Pakistan',
  'abdullahbinzubairhashmi@gmail.com',
  '+92 314 5837015',
  'https://github.com/abdullahhashmi',
  'https://linkedin.com/in/abdullah-bin-zubair-hashmi',
  'https://abdullahbinzubairhashmi.dev',
  '/Abdullah_Bin_Zubair_Hashmi_CV__3_.pdf',
  '/gallery/black-me.png',
  3.85,
  'Bahria University, Islamabad',
  'Bachelors in Information Technology (Final Year)'
);

-- 2. Insert Projects
INSERT INTO public.projects (title, slug, tagline, description, category, technologies, featured, display_order, architecture_details)
VALUES 
(
  'Autonomous XDR Framework for Sentinel Industrial IoT',
  'autonomous-xdr-framework',
  'AI-Powered Extended Detection & Response for Industrial IoT',
  'Final Year Project implementing an advanced AI-powered XDR framework targeting Industrial IoT environments. Uses deep learning algorithms for real-time cyber threat detection and automated incident mitigation across complex sensor architectures.',
  'AI & IoT',
  ARRAY['Python', 'PyTorch', 'TensorFlow', 'Wazuh XDR', 'React.js', 'Node.js', 'CNN-BiLSTM-Transformer', 'NIST & ISO Compliance'],
  true,
  1,
  'Deep learning hybrid model combining CNN spatial feature extraction with BiLSTM temporal analysis and Transformer self-attention for anomaly detection in Industrial IoT sensor telemetry.'
),
(
  'Smart-MediDB: Dual-Engine Clinical Information System',
  'smart-medidb',
  'High-Performance Full-Stack Clinical Data Engine',
  'Comprehensive clinical data management system engineered with dual-database engine support for structured relational records and unstructured medical imaging/documents.',
  'Full-Stack',
  ARRAY['ASP.NET Core', 'React.js', 'TypeScript', 'C#', 'MS SQL Server', 'MongoDB', 'Entity Framework Core', 'JWT Auth', 'Vite', 'Axios'],
  true,
  2,
  'Microservices architecture utilizing MS SQL Server for transactional compliance and MongoDB for unstructured patient records, secured via JWT authentication.'
),
(
  'MedZone: Alzheimer & Brain Stroke Prediction',
  'medzone-prediction',
  'AI & Mobile System for Neurological Disease Prediction',
  'Cross-platform mobile application and deep learning pipeline for early prediction of Alzheimer''s disease and brain strokes from clinical MRI and imaging data.',
  'Mobile & AI',
  ARRAY['Flutter', 'Python', 'Firebase', 'FastAPI', 'ONNX Runtime', 'Computer Vision'],
  true,
  3,
  'Integrated lightweight ONNX models on-device for rapid inference, paired with a FastAPI backend for asynchronous batch analysis and medical history sync.'
),
(
  'Human Resource Management System (HRMS)',
  'trust-nexus-hrms',
  'Scalable Enterprise Human Resource Platform',
  'Developed at Trust Nexus (Business Innovation Center, BUKC). Enterprise-grade HR management platform focusing on high responsiveness, intuitive role-based workflows, and scalable employee telemetry.',
  'Full-Stack',
  ARRAY['Next.js', 'Tailwind CSS', 'TypeScript', 'Redux Toolkit', 'Node.js', 'PostgreSQL'],
  true,
  4,
  'Modern server-side rendered UI with Next.js App Router, Redux state caching, and responsive UI system designed for large organization hierarchies.'
),
(
  'YOTA Technical Development Platform',
  'yota-platform',
  'Interactive Hub for University Technical Advancement',
  'Official digital platform for the Youth Organization for Technical Advancement at Bahria University, featuring 2D/3D animations, competitive programming leaderboards, and event registration portals.',
  'Web & Animation',
  ARRAY['HTML5', 'CSS3', 'JavaScript', 'PHP', 'GSAP', 'Three.js', 'XAMPP', 'MySQL'],
  false,
  5,
  'Custom GSAP and Three.js timeline animations for smooth storytelling and interactive showcase of university coding competitions like CodeZaar.'
),
(
  'Hotel Management System',
  'hotel-management-system',
  'Full-Featured Hospitality Management & Booking Platform',
  'Complete reservation and hotel operations suite with room availability matrices, guest billing, and analytics dashboards.',
  'Full-Stack',
  ARRAY['Python', 'Django', 'React.js', 'Tailwind CSS', 'PostgreSQL'],
  false,
  6,
  'Django REST Framework backend with relational room booking engine and React dashboard.'
),
(
  'Student Records Manager & Timetable Engine',
  'timetable-records-engine',
  'Algorithms & Systems Management Engine in C++ and C#',
  'High-performance desktop systems for automated academic timetable generation and comprehensive student records tracking.',
  'Systems & C++',
  ARRAY['C++', 'ASP.NET', 'C#', 'SQL Server', 'Qt', 'Data Structures & Algorithms'],
  false,
  7,
  'Constraint-satisfaction scheduling algorithms in C++ paired with ASP.NET CRUD interface.'
);

-- 3. Insert Skills
INSERT INTO public.skills (name, category, proficiency, experience_years, featured, display_order)
VALUES
-- Frontend
('React.js / Next.js', 'Frontend', 95, '2+ yrs', true, 1),
('TypeScript / JavaScript', 'Frontend', 92, '2+ yrs', true, 2),
('Tailwind CSS & Modern UI', 'Frontend', 95, '2+ yrs', true, 3),
('Three.js / WebGL & GSAP', 'Frontend', 88, '1+ yr', true, 4),

-- Backend & Frameworks
('ASP.NET MVC & Core (C#)', 'Backend', 92, '2+ yrs', true, 5),
('Entity Framework (EF Core)', 'Backend', 88, '1+ yr', true, 6),
('Node.js & Express', 'Backend', 86, '2+ yrs', true, 7),
('PHP / XAMPP / WAMPP', 'Backend', 85, '2+ yrs', false, 8),
('Python (FastAPI / Django)', 'Backend', 84, '1+ yr', false, 9),

-- Systems & Core
('C++ & Object-Oriented Design', 'Systems & Core', 94, '3+ yrs', true, 10),
('Data Structures & Algorithms', 'Systems & Core', 92, '3+ yrs', true, 11),
('Competitive Programming', 'Systems & Core', 90, '2+ yrs', true, 12),

-- Databases
('PostgreSQL & Supabase', 'Databases', 90, '2+ yrs', true, 13),
('MS SQL Server (SSMS)', 'Databases', 92, '2+ yrs', true, 14),
('MongoDB & SQLite3', 'Databases', 86, '2+ yrs', false, 15),

-- DevOps & Tools
('Git & GitHub Version Control', 'DevOps & Tools', 95, '3+ yrs', true, 16),
('Docker & Containerization', 'DevOps & Tools', 82, '1+ yr', true, 17),
('AWS Cloud Hosting', 'DevOps & Tools', 80, '1+ yr', false, 18),
('Figma UI/UX Design', 'DevOps & Tools', 88, '2+ yrs', true, 19);

-- 4. Insert Experiences
INSERT INTO public.experiences (company, role, location, period, description, achievements, technologies, display_order)
VALUES
(
  'Youth Organization for Technical Advancement (YOTA), Bahria University',
  'Director – Technical Development Team',
  'Islamabad, Pakistan',
  'Jul 2024 – Feb 2025',
  'Led the Technical Development Team, overseeing all student technical initiatives, architectural standards, and project delivery across the university.',
  ARRAY[
    'Directed the flagship CodeZaar competitive programming championship from problem curation to live automated evaluation.',
    'Mentored 30+ engineering students in modern web development, algorithms, and collaborative git workflows.',
    'Architected core technical infrastructure for university tech events and hackathons.'
  ],
  ARRAY['Leadership', 'React.js', 'Next.js', 'Competitive Programming', 'Project Management'],
  1
),
(
  'Youth Organization for Technical Advancement (YOTA), Bahria University',
  'Coordinator – Competitive Programming Team',
  'Islamabad, Pakistan',
  'Apr 2024 – Jul 2024',
  'Spearheaded competitive coding workshops, weekly algorithmic problem-solving contests, and DSA mentoring sessions.',
  ARRAY[
    'Organized bi-weekly algorithmic contests with custom problem sets in C++ and Python.',
    'Elevated university ranking in regional competitive programming tournaments.',
    'Trained students on graph algorithms, dynamic programming, and data structures.'
  ],
  ARRAY['C++', 'DSA', 'Algorithms', 'Competitive Programming', 'Mentoring'],
  2
),
(
  'Trust Nexus (Business Innovation Center, BUKC)',
  'Frontend Developer – HRMS Project',
  'Islamabad, Pakistan',
  '12 Weeks (Internship)',
  'Engineered high-performance user interfaces and responsive workflows for an enterprise Human Resource Management System.',
  ARRAY[
    'Built intuitive employee telemetry, payroll dashboards, and attendance tracking interfaces.',
    'Optimized Next.js client-server state using Redux Toolkit and Tailwind CSS.',
    'Collaborated closely with backend engineers to integrate REST APIs with seamless error handling.'
  ],
  ARRAY['Next.js', 'Tailwind CSS', 'TypeScript', 'Redux', 'REST APIs'],
  3
),
(
  'Directorate of Student Affairs, Bahria University HQ',
  'Operations Intern',
  'Islamabad, Pakistan',
  '14 Weeks (Internship)',
  'Managed student administrative operations, cross-departmental communications, and event logistics across the university head office.',
  ARRAY[
    'Streamlined inter-departmental documentation workflows and student request handling.',
    'Coordinated logistics and scheduling for university-wide academic conferences and seminars.'
  ],
  ARRAY['Operations', 'Workflow Automation', 'Coordination', 'Communication'],
  4
);

-- 5. Insert Certifications & Research
INSERT INTO public.certifications (title, issuer, period, type, description)
VALUES
(
  'Microsoft Power Platform Developer Associate',
  'NAVTTC',
  'Mar – Jun 2025',
  'Certification',
  'Comprehensive enterprise application engineering covering ASP.NET, C#, React, Web Forms, MVC, and SQL Server.'
),
(
  'Master Course in Web Framework',
  'Udemy',
  'August 2023',
  'Certification',
  'Advanced architectural design and modern full-stack web frameworks.'
),
(
  'Hafiz-e-Quran (Memorization of the Holy Quran)',
  'Jamia Islamia Hashmia',
  '18th May 2016',
  'Honor',
  'Memorization of the Holy Quran in its entirety.'
),
(
  'Cardiac Image Processing Research',
  'Bahria University Academic Research',
  'Ongoing',
  'Research',
  'Novel computer vision and deep learning techniques for analyzing cardiac MRI scans to assist in early detection and assessment of cardiovascular conditions.'
),
(
  'IoT-Based XDR and GRC Framework',
  'Industrial IoT Security Research',
  'Ongoing',
  'Research',
  'Unified Governance, Risk, and Compliance framework integrated with real-time sensor monitoring and automated cyber attack detection across heterogeneous OS environments.'
);

-- ==============================================================================
-- 7. THEMES TABLE & SEED DATA (8 CURATED DEVELOPER THEMES)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.themes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  background TEXT NOT NULL,
  foreground TEXT NOT NULL,
  card_bg TEXT NOT NULL,
  border_color TEXT NOT NULL,
  primary TEXT NOT NULL,
  accent TEXT NOT NULL,
  glow_color TEXT NOT NULL,
  is_active BOOLEAN DEFAULT false,
  is_custom BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.themes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public themes are viewable by everyone." ON public.themes FOR SELECT USING (true);
CREATE POLICY "Themes can be modified by anyone." ON public.themes FOR ALL USING (true);

INSERT INTO public.themes (id, name, category, description, background, foreground, card_bg, border_color, primary, accent, glow_color, is_active, is_custom)
VALUES
(
  'oled-obsidian',
  'OLED Obsidian',
  'Monochrome & True Black',
  'Pure #000000 true-black canvas with crisp monochrome white accents and subtle titanium borders.',
  '#000000',
  '#ededed',
  'rgba(9, 9, 11, 0.75)',
  'rgba(39, 39, 42, 0.8)',
  '#ffffff',
  '#a1a1aa',
  'rgba(255, 255, 255, 0.15)',
  true,
  false
),
(
  'tokyo-night',
  'Tokyo Night',
  'Atmospheric & Neon',
  'Deep midnight Japanese indigo canvas with vivid electric blue, neon cyan, and soft purple accents.',
  '#1a1b26',
  '#c0caf5',
  'rgba(26, 27, 38, 0.82)',
  'rgba(65, 72, 104, 0.8)',
  '#7aa2f7',
  '#bb9af7',
  'rgba(122, 162, 247, 0.3)',
  false,
  false
),
(
  'catppuccin-mocha',
  'Catppuccin Mocha',
  'Pastel Dark & Cozy',
  'Comforting dark roast crust with soothing mauve, sapphire, and pastel peach developer aesthetics.',
  '#1e1e2e',
  '#cdd6f4',
  'rgba(30, 30, 46, 0.82)',
  'rgba(69, 71, 90, 0.85)',
  '#cba6f7',
  '#89b4fa',
  'rgba(203, 166, 247, 0.25)',
  false,
  false
),
(
  'nord-aurora',
  'Nord Aurora',
  'Arctic & Clean',
  'Arctic polar night palette with cool frost cyan, glacial blues, and vibrant aurora green accents.',
  '#242933',
  '#eceff4',
  'rgba(46, 52, 64, 0.85)',
  'rgba(67, 76, 94, 0.85)',
  '#88c0d0',
  '#a3be8c',
  'rgba(136, 192, 208, 0.28)',
  false,
  false
),
(
  'cyberpunk-2077',
  'Cyberpunk 2077',
  'High Voltage & Synth',
  'High-contrast dark terminal illuminated by acid green lasers, electric magenta, and neon yellow.',
  '#0a0d14',
  '#00ff9d',
  'rgba(13, 17, 26, 0.85)',
  'rgba(0, 255, 157, 0.35)',
  '#00ff9d',
  '#ff007f',
  'rgba(0, 255, 157, 0.32)',
  false,
  false
),
(
  'emerald-matrix',
  'Emerald Matrix',
  'Forest & Cryptography',
  'Deep cryptographic obsidian background paired with radiant emerald and cybernetic jade glow.',
  '#05130d',
  '#d1fae5',
  'rgba(6, 26, 17, 0.82)',
  'rgba(16, 185, 129, 0.32)',
  '#10b981',
  '#34d399',
  'rgba(16, 185, 129, 0.28)',
  false,
  false
),
(
  'nebula-violet',
  'Nebula Violet',
  'Cosmic & Deep Space',
  'Deep cosmic dark violet canvas infused with electric ultraviolet, purple nebula, and fuchsia flare.',
  '#0d071e',
  '#e9d5ff',
  'rgba(20, 10, 42, 0.85)',
  'rgba(139, 92, 246, 0.35)',
  '#a855f7',
  '#d946ef',
  'rgba(168, 85, 247, 0.28)',
  false,
  false
),
(
  'sunset-amber',
  'Sunset Amber',
  'Warm Titanium & Ember',
  'Warm espresso dark background glowing with golden amber, volcanic tangerine, and flame gradients.',
  '#140d07',
  '#fef3c7',
  'rgba(28, 18, 10, 0.85)',
  'rgba(245, 158, 11, 0.3)',
  '#f59e0b',
  '#fb923c',
  'rgba(245, 158, 11, 0.28)',
  false,
  false
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  background = EXCLUDED.background,
  foreground = EXCLUDED.foreground,
  card_bg = EXCLUDED.card_bg,
  border_color = EXCLUDED.border_color,
  primary = EXCLUDED.primary,
  accent = EXCLUDED.accent,
  glow_color = EXCLUDED.glow_color;

-- ==============================================================================
-- 8. INSPIRATION QUOTES TABLE & SEED DATA
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.quotes (
  id TEXT PRIMARY KEY,
  handle TEXT NOT NULL,
  line1 TEXT NOT NULL,
  line2 TEXT NOT NULL,
  line3 TEXT NOT NULL,
  line4_a TEXT NOT NULL,
  line4_b TEXT NOT NULL,
  line5 TEXT NOT NULL,
  subtext TEXT NOT NULL,
  author TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public quotes are viewable by everyone." ON public.quotes FOR SELECT USING (true);
CREATE POLICY "Quotes can be modified by anyone." ON public.quotes FOR ALL USING (true);

INSERT INTO public.quotes (id, handle, line1, line2, line3, line4_a, line4_b, line5, subtext, author, is_active)
VALUES
(
  'quote-main',
  '@ABDULLAH_HASHMI',
  'MAKE',
  'SMART',
  'CHOICES',
  'IN',
  'YOUR',
  'LIFE',
  'Empower yourself by making decisions that reflect your true goals. Code with purpose, architect with precision, and build systems that outlast the ordinary.',
  'Abdullah Bin Zubair Hashmi',
  true
)
ON CONFLICT (id) DO UPDATE SET
  handle = EXCLUDED.handle,
  line1 = EXCLUDED.line1,
  line2 = EXCLUDED.line2,
  line3 = EXCLUDED.line3,
  line4_a = EXCLUDED.line4_a,
  line4_b = EXCLUDED.line4_b,
  line5 = EXCLUDED.line5,
  subtext = EXCLUDED.subtext,
  author = EXCLUDED.author,
  is_active = EXCLUDED.is_active,
  updated_at = timezone('utc'::text, now());

-- ==============================================================================
-- 8. ADMIN AUTHENTICATION TABLE (Cryptographic Hashed Storage)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.admin_auth (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL DEFAULT 'admin',
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  algorithm TEXT NOT NULL DEFAULT 'pbkdf2_sha512',
  iterations INTEGER NOT NULL DEFAULT 100000,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (Service Role only / Server API access)
ALTER TABLE public.admin_auth ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow server client to verify admin credentials" ON public.admin_auth FOR ALL USING (true);

-- Seed Initial Hashed Credential for H4fiz_8048@ (Never plaintext)
-- Salt: fa0cfe8616c63888ea5f9c4e39b49c42
-- Hash: 9e3727114008f7e877223d8f5acd3e58fd8c95895bde60d431a3dfeb258cf7a966053a7fcd08fdb5c72b2762f52723fbc360dbd47ad862509cce47bf6a1d7511
INSERT INTO public.admin_auth (username, password_hash, salt, algorithm, iterations)
VALUES (
  'admin',
  '9e3727114008f7e877223d8f5acd3e58fd8c95895bde60d431a3dfeb258cf7a966053a7fcd08fdb5c72b2762f52723fbc360dbd47ad862509cce47bf6a1d7511',
  'fa0cfe8616c63888ea5f9c4e39b49c42',
  'pbkdf2_sha512',
  100000
)
ON CONFLICT (username) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  salt = EXCLUDED.salt,
  algorithm = EXCLUDED.algorithm,
  iterations = EXCLUDED.iterations,
  updated_at = timezone('utc'::text, now());


