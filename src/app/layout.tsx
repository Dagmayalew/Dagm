import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { getProfile } from "@/lib/data";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return {
    title: `${profile.name} | Senior Mobile App Developer`,
    description: profile.tagline,
    keywords: [
      "Senior Mobile App Developer",
      "React Native Developer",
      "TypeScript",
      "Mobile Architecture",
      "Flutter Developer",
      "iOS Developer",
      "Android Developer",
      "Full-Stack Engineer",
      "Next.js",
      "Dagmay Ayalew",
    ],
    authors: [{ name: profile.name, url: profile.githubUrl || undefined }],
    openGraph: {
      title: `${profile.name} — Senior Mobile App Developer`,
      description: profile.tagline,
      type: "website",
      url: "https://dagmayalew.dev",
      siteName: `${profile.name} Portfolio`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.name} | Senior Mobile App Developer`,
      description: profile.tagline,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
      data-theme="dark"
      data-accent="emerald"
      suppressHydrationWarning
    >
      <body
        className="bg-[#090d16] text-slate-100 min-h-screen antialiased selection:bg-primary selection:text-background"
        suppressHydrationWarning
      >
        <ThemeProvider initialSettings={profile.themeSettings}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
