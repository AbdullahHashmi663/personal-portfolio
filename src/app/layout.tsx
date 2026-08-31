import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import GlobalPreloader from "@/components/GlobalPreloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abdullah Bin Zubair Hashmi | Full-Stack Developer & Systems Engineer",
  description:
    "Portfolio of Abdullah Bin Zubair Hashmi — Full-Stack Developer, C++ & ASP.NET Engineer, Microsoft Certified Power Platform Developer Associate, and Creative Technologist.",
  keywords: [
    "Abdullah Bin Zubair Hashmi",
    "Full Stack Developer",
    "Next.js",
    "React",
    "ASP.NET Core",
    "C++",
    "Three.js",
    "ThreeJS",
    "Microsoft Certified",
    "Autonomous XDR",
    "Bahria University",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased scroll-smooth`}
    >
      <head>
        {/* Zero-FOUT Immediate Theme Token Cache Hydration Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var raw = localStorage.getItem('portfolio_cached_active_theme_v2');
                  if (raw) {
                    var t = JSON.parse(raw);
                    if (t && t.background) {
                      var r = document.documentElement;
                      r.style.setProperty('--background', t.background);
                      r.style.setProperty('--foreground', t.foreground);
                      r.style.setProperty('--card-bg', t.card_bg);
                      r.style.setProperty('--border-color', t.border_color);
                      r.style.setProperty('--primary', t.primary);
                      r.style.setProperty('--accent', t.accent);
                      r.style.setProperty('--glow-color', t.glow_color);
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-zinc-100 transition-colors duration-500">
        <ThemeProvider>
          <GlobalPreloader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
