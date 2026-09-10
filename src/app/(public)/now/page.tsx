import Link from "next/link";
import { getProfile, getLifeUpdates } from "@/lib/data";
import { Clock, Activity, BookOpen, Layers, Linkedin, Github, ArrowUpRight, Send } from "lucide-react";

export const revalidate = 3600;

export const metadata = {
  title: "Now & Day-to-Day Life | Dagmay Ayalew",
  description: "What Dagmay Ayalew is building, learning, and exploring right now.",
};

const TAG_ICONS: Record<string, React.ElementType> = {
  BUILDING: Layers,
  LEARNING: Activity,
  READING: BookOpen,
  MILESTONE: Activity,
  LIFE: Clock,
};

export default async function NowPage() {
  const [profile, lifeUpdates] = await Promise.all([
    getProfile(),
    getLifeUpdates(),
  ]);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" /> Day-to-Day Focus
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            What I&apos;m Doing Now
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            A living snapshot of my current mobile experiments, project updates, and day-to-day focus.
          </p>
        </div>

        {/* Current Active Focus Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0c1220] border border-primary/30 space-y-3">
          <span className="text-xs uppercase font-bold tracking-wider text-primary block">
            Current Focus
          </span>
          <p className="text-lg sm:text-xl font-bold text-white tracking-tight leading-relaxed">
            &ldquo;{profile.statusMessage}&rdquo;
          </p>
          <div className="pt-1 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span>Location: <strong className="text-white font-medium">{profile.location}</strong></span>
            <span>Status: <strong className="text-primary font-medium">{profile.isOpenToWork ? "Open for Opportunities" : "Focused on Current Projects"}</strong></span>
          </div>
        </div>

        {/* Activity & Micro-posts Timeline */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" /> Recent Logs & Updates
          </h2>

          <div className="space-y-3">
            {lifeUpdates.map((update) => {
              const Icon = TAG_ICONS[update.tag] || Activity;
              return (
                <div
                  key={update.id}
                  className="p-5 rounded-xl bg-[#0c1220] border border-white/10 hover:border-primary/40 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-primary flex items-center gap-1.5">
                      <Icon className="w-3 h-3" />
                      {update.tag}
                    </span>
                    <span className="text-xs text-slate-400">
                      {typeof update.createdAt === "string"
                        ? update.createdAt.slice(0, 10)
                        : new Date(update.createdAt).toISOString().slice(0, 10)}
                    </span>
                  </div>

                  <p className="text-sm text-slate-200 leading-relaxed">
                    {update.content}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Connect Channels */}
        <div className="p-6 rounded-2xl bg-[#0c1220] border border-white/10 space-y-3">
          <h3 className="text-base font-bold text-white">Stay Connected</h3>
          <p className="text-xs text-slate-400">
            I post project updates and mobile insights on LinkedIn and GitHub.
          </p>
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-background text-xs font-bold hover:brightness-110 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              Contact
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0077b5]/15 hover:bg-[#0077b5]/25 border border-[#0077b5]/30 text-xs font-semibold text-[#38bdf8] transition-all"
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
