import Link from "next/link";
import {
  getProfile,
  getProjects,
  getExperiences,
  getSkillCategories,
  getContactMessages,
  getLifeUpdates,
} from "@/lib/data";
import { seedDatabase } from "@/lib/actions";
import {
  Smartphone,
  FileText,
  Palette,
  MessageSquare,
  Code2,
  Database,
  ArrowRight,
  TrendingUp,
  Radio,
  ExternalLink,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [profile, projects, experiences, skillCats, messages, updates] =
    await Promise.all([
      getProfile(),
      getProjects(),
      getExperiences(),
      getSkillCategories(),
      getContactMessages(),
      getLifeUpdates(),
    ]);

  const totalSkills = skillCats.reduce((acc, cat) => acc + cat.skills.length, 0);
  const unreadMessages = messages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0d1424] border border-white/10 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs uppercase font-bold text-primary tracking-wider">
              Control Panel
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Welcome, {profile.name}
          </h1>
          <p className="text-xs text-slate-400">
            Current status: <strong className="text-slate-200">{profile.statusMessage}</strong>
          </p>
        </div>

        {/* Database Seed Action Form */}
        <form
          action={async () => {
            "use server";
            await seedDatabase();
          }}
        >
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/20 hover:bg-primary text-primary hover:text-background font-bold text-xs border border-primary/40 transition-all shadow-md"
          >
            <Database className="w-3.5 h-3.5" />
            Sync / Seed Default Mobile Data
          </button>
        </form>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Mobile Projects",
            value: projects.length,
            icon: Smartphone,
            href: "/admin/projects",
            color: "text-primary",
          },
          {
            label: "Career Milestones",
            value: experiences.length,
            icon: FileText,
            href: "/admin/cv",
            color: "text-cyan-400",
          },
          {
            label: "Cataloged Skills",
            value: totalSkills,
            icon: Code2,
            href: "/admin/skills",
            color: "text-violet-400",
          },
          {
            label: "Inbound Messages",
            value: unreadMessages > 0 ? `${unreadMessages} Unread` : `${messages.length} Total`,
            icon: MessageSquare,
            href: "/admin/messages",
            color: unreadMessages > 0 ? "text-amber-400" : "text-slate-400",
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link
              key={i}
              href={stat.href}
              className="p-5 rounded-2xl bg-[#0d1424] border border-white/10 hover:border-primary/40 transition-all shadow-lg group space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">
                  {stat.label}
                </span>
                <div className={`p-2 rounded-xl bg-white/5 ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-white tracking-tight">
                {stat.value}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Hubs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Theme Customizer (Highlighting user requirement A2) */}
        <div className="p-6 rounded-3xl bg-[#0d1424] border border-primary/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Palette className="w-4 h-4 text-primary" /> Live Theme Engine
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold">
              Active: {profile.themeSettings?.accentColor || "Emerald"}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Customize the global accent palette (Emerald, Cyan, Violet, Amber, Rose), font family, and glassmorphism styling in real time.
          </p>
          <Link
            href="/admin/theme"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
          >
            Open Theme Customizer <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 2: Mobile Projects Manager */}
        <div className="p-6 rounded-3xl bg-[#0d1424] border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-cyan-400" /> Mobile Apps & Stores
            </h3>
            <span className="text-xs text-slate-400">{projects.length} Apps</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Add new iOS & Android apps, attach App Store & Google Play links, configure screenshots, and feature top mobile products.
          </p>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:underline"
          >
            Manage Mobile Apps <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 3: Dynamic CV & Experience */}
        <div className="p-6 rounded-3xl bg-[#0d1424] border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-violet-400" /> Dynamic CV & Resume
            </h3>
            <span className="text-xs text-slate-400">{experiences.length} Positions</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Edit career timeline, achievements, education, and credentials with instant ATS PDF export syncing.
          </p>
          <Link
            href="/admin/cv"
            className="inline-flex items-center gap-2 text-xs font-bold text-violet-400 hover:underline"
          >
            Edit Resume Items <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* Recent Contact Messages Preview */}
      <div className="p-6 rounded-3xl bg-[#0d1424] border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-400" /> Recent Inbound Messages
          </h3>
          <Link
            href="/admin/messages"
            className="text-xs font-bold text-primary hover:underline"
          >
            View All ({messages.length})
          </Link>
        </div>

        {messages.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 text-center">
            No contact messages received yet. Test the contact form on the homepage!
          </p>
        ) : (
          <div className="space-y-2">
            {messages.slice(0, 3).map((msg) => (
              <div
                key={msg.id}
                className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-white">{msg.name} ({msg.email})</p>
                  <p className="text-[11px] text-slate-400 truncate max-w-md">{msg.message}</p>
                </div>
                <span className="text-[10px] text-slate-500">
                  {typeof msg.createdAt === "string" ? msg.createdAt.slice(0, 10) : "Recent"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
