"use client";

import { useState } from "react";
import { ProfileData, LifeUpdateData } from "@/types";
import {
  Activity,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function StatusWidget({
  profile,
  latestUpdate,
}: {
  profile: ProfileData;
  latestUpdate?: LifeUpdateData;
}) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0f172a]/90 to-[#131d31]/90 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          
          {/* Ambient light accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Col: Current Status */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs uppercase font-bold tracking-wider text-primary">
                  Current Status
                </span>
              </div>

              <p className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                &ldquo;{profile.statusMessage}&rdquo;
              </p>

              {latestUpdate && (
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Latest update:</span>
                  <span>{latestUpdate.content}</span>
                </div>
              )}
            </div>

            {/* Right Col: Quick Actions (Copy email, LinkedIn, GitHub) */}
            <div className="lg:col-span-4 flex flex-wrap lg:flex-col gap-3 justify-start lg:justify-end">
              <button
                onClick={copyEmail}
                className="flex-1 lg:flex-none flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-all group"
              >
                <div className="flex items-center gap-2 truncate">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span className="truncate">{profile.email}</span>
                </div>
                <div className="p-1 rounded bg-white/5 group-hover:bg-primary group-hover:text-background transition-colors">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </div>
              </button>

              <div className="flex items-center gap-2 w-full">
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0077b5]/20 hover:bg-[#0077b5]/30 border border-[#0077b5]/40 text-xs font-semibold text-[#38bdf8] transition-all"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>
                )}
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-all"
                  >
                    <Github className="w-3.5 h-3.5" />
                    GitHub
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
