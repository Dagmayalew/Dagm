"use client";

import Link from "next/link";
import { ProfileData } from "@/types";
import { PhoneMockup } from "./PhoneMockup";
import { useTheme } from "@/components/theme/ThemeProvider";
import {
  FileText,
  Mail,
  ArrowRight,
  Github,
  Linkedin,
} from "lucide-react";

export function HeroSection({ profile }: { profile: ProfileData }) {
  const { settings } = useTheme();
  const showPhone = settings.showPhoneMockup !== false;
  const showBadge = settings.showLiveStatusBadge !== false;

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div
          className={`grid grid-cols-1 ${
            showPhone ? "lg:grid-cols-12" : "max-w-3xl mx-auto"
          } gap-10 lg:gap-12 items-center`}
        >
          {/* Left Hero Content */}
          <div
            className={`${
              showPhone ? "lg:col-span-7" : "text-center space-y-6"
            } space-y-6 text-left`}
          >
            {/* Availability Pill */}
            {showBadge && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
                <span>
                  {profile.isOpenToWork
                    ? "Available for Senior Mobile Roles"
                    : "Senior Mobile App Developer"}
                </span>
              </div>
            )}

            {/* Main Headline & Intro */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Senior Mobile App Developer
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Specialized in <strong className="text-white font-semibold">React Native</strong>, <strong className="text-white font-semibold">TypeScript</strong>, and <strong className="text-white font-semibold">Mobile Architecture</strong>, with production experience across financial super apps, agency banking, and e-commerce platforms. Also proficient in Flutter and Full-Stack development.
              </p>
            </div>

            {/* Core Tech Stack Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {["React Native", "TypeScript", "Flutter", "Full-Stack (Next.js & Node.js)"].map((tech, idx) => (
                <span
                  key={tech}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                    idx === 0
                      ? "bg-primary/15 border-primary/40 text-primary font-semibold"
                      : "bg-white/[0.04] border-white/10 text-slate-300"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="#selected-work"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-background font-bold text-xs hover:brightness-110 shadow-md shadow-primary/20 transition-all"
              >
                Selected Work
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/cv"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] text-white font-semibold text-xs border border-white/10 transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-primary" />
                View Resume
              </Link>
            </div>

            {/* Direct Channels */}
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <span className="text-xs font-medium text-slate-500">
                Direct:
              </span>
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-all text-slate-300 border border-white/5"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-all text-slate-300 border border-white/5"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              <a
                href={`mailto:${profile.email}`}
                className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-all text-slate-300 border border-white/5"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Hero Mobile Mockup */}
          {showPhone && (
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <PhoneMockup />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
