"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, ArrowUpRight, Download } from "lucide-react";
import { Profile } from "@/types/database";
import { submitContactMessage } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";
import { useTheme } from "@/context/ThemeContext";

interface ContactSectionProps {
  profile?: Profile;
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const { currentTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");
    const res = await submitContactMessage(formData);

    if (res.success) {
      setStatus("success");
      setStatusMsg(res.message);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("error");
      setStatusMsg(res.message);
    }
  };

  const email = profile?.email || "abdullahbinzubairhashmi@gmail.com";
  const phone = profile?.phone || "+92 314 5837015";
  const location = profile?.location || "Rawalpindi & Islamabad, Pakistan";
  const resumeUrl = profile?.resume_url || "/Abdullah_Bin_Zubair_Hashmi_CV__3_.pdf";

  return (
    <section
      id="contact"
      className="relative w-full py-24 px-4 sm:px-8 lg:px-14 theme-surface overflow-hidden border-t transition-colors duration-500"
      style={{ borderColor: currentTheme.border_color }}
    >
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/3 w-[500px] h-[300px] blur-[150px] rounded-full pointer-events-none transition-all duration-500"
        style={{ backgroundColor: currentTheme.glow_color }}
      />

      <div className="relative max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Header */}
        <ScrollReveal direction="up" delay={50}>
          <div
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8"
            style={{ borderColor: currentTheme.border_color }}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-[1px] w-6" style={{ backgroundColor: currentTheme.primary }} />
                <span className="text-xs font-mono tracking-widest uppercase" style={{ color: currentTheme.primary }}>
                  Let's Build Something Exceptional
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Get in Touch
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
              Open for full-time software engineering roles, research collaborations, and innovative product builds.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Grid: Info Cards (5 cols) & Interactive Form (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Info Cards */}
          <ScrollReveal direction="up" delay={100} className="lg:col-span-5 flex">
            <div className="w-full flex flex-col justify-between gap-6">
              <div className="space-y-4">
                
                {/* Email Card */}
                <a
                  href={`mailto:${email}`}
                  className="group p-5 rounded-3xl border backdrop-blur-xl flex items-center justify-between transition-all duration-300"
                  style={{
                    backgroundColor: currentTheme.card_bg,
                    borderColor: currentTheme.border_color,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="w-10 h-10 rounded-2xl border flex items-center justify-center"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${currentTheme.primary} 15%, transparent)`,
                        borderColor: `color-mix(in srgb, ${currentTheme.primary} 30%, transparent)`,
                        color: currentTheme.primary,
                      }}
                    >
                      <Mail className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">Email</span>
                      <p className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">{email}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                </a>

                {/* Phone Card */}
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="group p-5 rounded-3xl border backdrop-blur-xl flex items-center justify-between transition-all duration-300"
                  style={{
                    backgroundColor: currentTheme.card_bg,
                    borderColor: currentTheme.border_color,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="w-10 h-10 rounded-2xl border flex items-center justify-center"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${currentTheme.primary} 15%, transparent)`,
                        borderColor: `color-mix(in srgb, ${currentTheme.primary} 30%, transparent)`,
                        color: currentTheme.primary,
                      }}
                    >
                      <Phone className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">Phone / WhatsApp</span>
                      <p className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">{phone}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                </a>

                {/* Location Card */}
                <div
                  className="p-5 rounded-3xl border backdrop-blur-xl flex items-center gap-4 transition-colors"
                  style={{
                    backgroundColor: currentTheme.card_bg,
                    borderColor: currentTheme.border_color,
                  }}
                >
                  <span
                    className="w-10 h-10 rounded-2xl border flex items-center justify-center"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${currentTheme.primary} 15%, transparent)`,
                      borderColor: `color-mix(in srgb, ${currentTheme.primary} 30%, transparent)`,
                      color: currentTheme.primary,
                    }}
                  >
                    <MapPin className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Location</span>
                    <p className="text-sm font-medium text-zinc-200">{location}</p>
                  </div>
                </div>

              </div>

              {/* Quick Resume Download Callout */}
              <div
                className="p-6 rounded-3xl border backdrop-blur-xl flex flex-col gap-4 transition-colors"
                style={{
                  backgroundColor: currentTheme.card_bg,
                  borderColor: currentTheme.border_color,
                }}
              >
                <div>
                  <h4 className="text-sm font-bold text-white">Need an offline copy of my CV?</h4>
                  <p className="text-xs text-zinc-400 mt-1">Download the verified PDF containing full academic and project references.</p>
                </div>
                <a
                  href={resumeUrl}
                  download="Abdullah_Bin_Zubair_Hashmi_CV.pdf"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-semibold transition-all shadow-md"
                  style={{
                    backgroundColor: currentTheme.primary,
                    color: currentTheme.background,
                  }}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resume (PDF)</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Contact Message Form */}
          <ScrollReveal direction="up" delay={200} className="lg:col-span-7 flex">
            <div
              className="w-full rounded-3xl border p-7 sm:p-9 backdrop-blur-xl transition-colors"
              style={{
                backgroundColor: currentTheme.card_bg,
                borderColor: currentTheme.border_color,
                boxShadow: `0 10px 30px -10px ${currentTheme.glow_color}`,
              }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-zinc-400 uppercase">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-2xl border bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-all"
                      style={{ borderColor: currentTheme.border_color }}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-zinc-400 uppercase">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-2xl border bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-all"
                      style={{ borderColor: currentTheme.border_color }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-zinc-400 uppercase">Subject</label>
                  <input
                    type="text"
                    placeholder="Project Opportunity / Engineering Role"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-2xl border bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-all"
                    style={{ borderColor: currentTheme.border_color }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-zinc-400 uppercase">Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-2xl border bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-all resize-none"
                    style={{ borderColor: currentTheme.border_color }}
                  />
                </div>

                {/* Status Alert Banner */}
                {status === "success" && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{statusMsg}</span>
                  </div>
                )}
                {status === "error" && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{statusMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-2 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-xs font-semibold hover:scale-[1.02] transition-all disabled:opacity-50 shadow-lg cursor-pointer"
                  style={{
                    backgroundColor: currentTheme.primary,
                    color: currentTheme.background,
                    boxShadow: `0 4px 20px ${currentTheme.glow_color}`,
                  }}
                >
                  {status === "loading" ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

              </form>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
