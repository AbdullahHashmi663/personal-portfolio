export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Theme {
  id: string;
  name: string;
  category: string;
  description: string;
  background: string;
  foreground: string;
  card_bg: string;
  border_color: string;
  primary: string;
  accent: string;
  glow_color: string;
  is_active: boolean;
  is_custom?: boolean;
  created_at?: string;
}

export interface InspirationQuote {
  id: string;
  handle: string;
  line1: string;
  line2: string;
  line3: string;
  line4_a: string;
  line4_b: string;
  line5: string;
  subtext: string;
  author?: string | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Database {
  public: {
    Tables: {
      quotes: {
        Row: InspirationQuote;
        Insert: InspirationQuote;
        Update: Partial<InspirationQuote>;
      };
      profiles: {
        Row: {
          id: string;
          name: string;
          tagline: string;
          bio: string;
          about_text: string | null;
          location: string;
          email: string;
          phone: string | null;
          github_url: string | null;
          linkedin_url: string | null;
          twitter_url: string | null;
          website_url: string | null;
          resume_url: string | null;
          avatar_url: string | null;
          cgpa: number | null;
          university: string | null;
          degree: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          tagline: string;
          bio: string;
          about_text?: string | null;
          location: string;
          email: string;
          phone?: string | null;
          github_url?: string | null;
          linkedin_url?: string | null;
          twitter_url?: string | null;
          website_url?: string | null;
          resume_url?: string | null;
          avatar_url?: string | null;
          cgpa?: number | null;
          university?: string | null;
          degree?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          tagline?: string;
          bio?: string;
          about_text?: string | null;
          location?: string;
          email?: string;
          phone?: string | null;
          github_url?: string | null;
          linkedin_url?: string | null;
          twitter_url?: string | null;
          website_url?: string | null;
          resume_url?: string | null;
          avatar_url?: string | null;
          cgpa?: number | null;
          university?: string | null;
          degree?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          tagline: string | null;
          description: string;
          category: string;
          image_url: string | null;
          technologies: string[];
          github_url: string | null;
          live_url: string | null;
          featured: boolean;
          display_order: number;
          architecture_details: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          tagline?: string | null;
          description: string;
          category: string;
          image_url?: string | null;
          technologies?: string[];
          github_url?: string | null;
          live_url?: string | null;
          featured?: boolean;
          display_order?: number;
          architecture_details?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          tagline?: string | null;
          description?: string;
          category?: string;
          image_url?: string | null;
          technologies?: string[];
          github_url?: string | null;
          live_url?: string | null;
          featured?: boolean;
          display_order?: number;
          architecture_details?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: string;
          proficiency: number;
          experience_years: string;
          icon_name: string | null;
          featured: boolean;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          proficiency?: number;
          experience_years?: string;
          icon_name?: string | null;
          featured?: boolean;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          proficiency?: number;
          experience_years?: string;
          icon_name?: string | null;
          featured?: boolean;
          display_order?: number;
          created_at?: string;
        };
      };
      experiences: {
        Row: {
          id: string;
          company: string;
          role: string;
          location: string | null;
          period: string;
          description: string;
          achievements: string[];
          technologies: string[];
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          company: string;
          role: string;
          location?: string | null;
          period: string;
          description: string;
          achievements?: string[];
          technologies?: string[];
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          company?: string;
          role?: string;
          location?: string | null;
          period?: string;
          description?: string;
          achievements?: string[];
          technologies?: string[];
          display_order?: number;
          created_at?: string;
        };
      };
      certifications: {
        Row: {
          id: string;
          title: string;
          issuer: string;
          period: string | null;
          type: string;
          description: string | null;
          link_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          issuer: string;
          period?: string | null;
          type: string;
          description?: string | null;
          link_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          issuer?: string;
          period?: string | null;
          type?: string;
          description?: string | null;
          link_url?: string | null;
          created_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string | null;
          message: string;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject?: string | null;
          message: string;
          read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string | null;
          message?: string;
          read?: boolean;
          created_at?: string;
        };
      };
      themes: {
        Row: Theme;
        Insert: Theme;
        Update: Partial<Theme>;
      };
    };
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Skill = Database["public"]["Tables"]["skills"]["Row"];
export type Experience = Database["public"]["Tables"]["experiences"]["Row"];
export type Certification = Database["public"]["Tables"]["certifications"]["Row"];
export type Message = Database["public"]["Tables"]["messages"]["Row"];
