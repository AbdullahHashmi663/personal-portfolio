import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import InspirationQuoteSection from "@/components/InspirationQuoteSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import SmoothScroll from "@/components/SmoothScroll";
import {
  fetchProfile,
  fetchProjects,
  fetchSkills,
  fetchExperiences,
  fetchCertifications,
  fetchInspirationQuote,
} from "@/lib/data";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const [profile, projects, skills, experiences, certifications, quote] = await Promise.all([
    fetchProfile(),
    fetchProjects(),
    fetchSkills(),
    fetchExperiences(),
    fetchCertifications(),
    fetchInspirationQuote(),
  ]);

  return (
    <SmoothScroll>
      <main className="min-h-screen w-full bg-black text-white selection:bg-white/20 selection:text-white relative">
        {/* Top Scroll Reading Progress Bar */}
        <ScrollProgressBar />

        {/* Global Sticky Glassmorphism Navbar */}
        <Navbar profile={profile} />

        {/* 1. Hero Section */}
        <HeroSection profile={profile} />

        {/* 2. About & Academic Excellence Section */}
        <AboutSection profile={profile} certifications={certifications} />

        {/* 3. Inspiring Typographic Quote Section (Database-Driven Swiss Poster Layout) */}
        <InspirationQuoteSection quote={quote} />

        {/* 4. Featured Engineering Projects Section */}
        <ProjectsSection projects={projects} />

        {/* 5. Technical Skills & Engineering Depth */}
        <SkillsSection skills={skills} />

        {/* 6. Leadership & Work Experience Timeline */}
        <ExperienceSection experiences={experiences} />

        {/* 7. Direct Contact & Client Inquiry */}
        <ContactSection profile={profile} />

        {/* 8. Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
