import Link from "next/link";
import { ProfileData } from "@/types";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";

export function Footer({ profile }: { profile: ProfileData }) {
  return (
    <footer className="border-t border-white/10 bg-[#06090f] relative no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Bio */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-background font-black text-sm">
                DA
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {profile.name}
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              {profile.tagline}
            </p>
            <div className="pt-1">
              <span className="text-xs text-slate-300">
                {profile.isOpenToWork ? "Available for Senior Mobile Roles & Contracts" : "Currently occupied"}
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="text-slate-300 hover:text-primary transition-colors">
                  Home Portfolio
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-slate-300 hover:text-primary transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="/cv" className="text-slate-300 hover:text-primary transition-colors inline-flex items-center gap-1">
                  Dynamic CV & Resume <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/now" className="text-slate-300 hover:text-primary transition-colors">
                  Now / Day-to-Day
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-primary transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Social Hub */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Connect
            </h4>
            <div className="flex flex-col space-y-2.5 text-xs">
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {profile.twitterUrl && (
                <a
                  href={profile.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors"
                >
                  <Twitter className="w-3.5 h-3.5" />
                  <span>Twitter / X</span>
                </a>
              )}
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="truncate">{profile.email}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p>Senior Mobile App Developer | React Native, TypeScript, Flutter</p>
        </div>
      </div>
    </footer>
  );
}
