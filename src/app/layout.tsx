import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import GlobalPreloader from "@/components/GlobalPreloader";
import { fetchActiveTheme, fetchAllThemes } from "@/lib/server-data";

// 1. Paradiso (TAN Paradiso - Art Nouveau flared decorative display serif)
const paradiso = localFont({
  src: "../../public/fonts/TAN-PARADISO.ttf",
  variable: "--font-paradiso",
  display: "swap",
});

// 2. Bropella (Bold bubbly display serif with curvy retro flair)
const bropella = localFont({
  src: "../../public/fonts/Bropella.ttf",
  variable: "--font-bropella",
  display: "swap",
});

// 3. Carl Brown (Modern vintage luxury hairline serif)
const carlBrown = localFont({
  src: "../../public/fonts/CarlBrown.ttf",
  variable: "--font-carl-brown",
  display: "swap",
});

// 4. Narnia (Groovy, bubbly playful display font)
const narnia = localFont({
  src: "../../public/fonts/Narnia.otf",
  variable: "--font-narnia",
  display: "swap",
});

// 5. Silver Garden (Nostalgic chic serif duo with ligatures & italics)
const silverGarden = localFont({
  src: [
    { path: "../../public/fonts/Silver Garden.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Silver Garden Italic.otf", weight: "400", style: "italic" },
    { path: "../../public/fonts/Silver Garden Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Silver Garden Bold Italic.otf", weight: "700", style: "italic" },
  ],
  variable: "--font-silver-garden",
  display: "swap",
});

// 6. Ardent (Contemporary stencil/ligature display serif)
const ardent = localFont({
  src: "../../public/fonts/ardent-regular.otf",
  variable: "--font-ardent",
  display: "swap",
});

// 7. Raks (Bold curvy dramatic high-contrast display serif)
const raks = localFont({
  src: [
    { path: "../../public/fonts/Fraunces-900-normal.woff2", weight: "900", style: "normal" },
    { path: "../../public/fonts/Fraunces-700-italic.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-raks",
  display: "swap",
});

// 8. Limer (Groovy retro chunky display serif)
const limer = localFont({
  src: [{ path: "../../public/fonts/Caprasimo-400-normal.woff2", weight: "400", style: "normal" }],
  variable: "--font-limer",
  display: "swap",
});

// Clean body font & Developer monospace
const plusJakartaSans = localFont({
  src: [
    { path: "../../public/fonts/PlusJakartaSans-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/PlusJakartaSans-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/PlusJakartaSans-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/PlusJakartaSans-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: [
    { path: "../../public/fonts/JetBrainsMono-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/JetBrainsMono-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/JetBrainsMono-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.abdullahbinzubairhashmi.dev"),
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTheme, allThemes] = await Promise.all([
    fetchActiveTheme(),
    fetchAllThemes(),
  ]);

  return (
    <html
      lang="en"
      className={`${paradiso.variable} ${bropella.variable} ${carlBrown.variable} ${narnia.variable} ${silverGarden.variable} ${ardent.variable} ${raks.variable} ${limer.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} dark h-full antialiased scroll-smooth`}
    >
      <head>
        {/* Favicon & Web Manifest Icons for Search Engines (Googlebot-Favicon) & Browsers */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Zero-FOUT Immediate Theme Token Cache Hydration Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var raw = localStorage.getItem('portfolio_cached_active_theme_v2');
                  var t = raw ? JSON.parse(raw) : null;
                  var bg = (t && t.background) ? t.background : ${JSON.stringify(activeTheme.background)};
                  var fg = (t && t.foreground) ? t.foreground : ${JSON.stringify(activeTheme.foreground)};
                  var cardBg = (t && t.card_bg) ? t.card_bg : ${JSON.stringify(activeTheme.card_bg)};
                  var border = (t && t.border_color) ? t.border_color : ${JSON.stringify(activeTheme.border_color)};
                  var primary = (t && t.primary) ? t.primary : ${JSON.stringify(activeTheme.primary)};
                  var accent = (t && t.accent) ? t.accent : ${JSON.stringify(activeTheme.accent)};
                  var glow = (t && t.glow_color) ? t.glow_color : ${JSON.stringify(activeTheme.glow_color)};
                  var r = document.documentElement;
                  r.style.setProperty('--background', bg);
                  r.style.setProperty('--foreground', fg);
                  r.style.setProperty('--card-bg', cardBg);
                  r.style.setProperty('--border-color', border);
                  r.style.setProperty('--primary', primary);
                  r.style.setProperty('--accent', accent);
                  r.style.setProperty('--glow-color', glow);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-zinc-100 transition-colors duration-500">
        <ThemeProvider initialActiveTheme={activeTheme} initialThemes={allThemes}>
          <GlobalPreloader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
