import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import {
  LayoutDashboard,
  User,
  Palette,
  Smartphone,
  FileText,
  Code2,
  Clock,
  MessageSquare,
  LogOut,
  ExternalLink,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // If not authenticated, render login form cleanly
  if (!session?.user) {
    return (
      <div className="min-h-screen bg-[#06090f] text-slate-100 flex items-center justify-center p-4">
        <AdminLoginForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06090f] text-slate-100 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#0a0f1d] border-r border-white/10 flex flex-col justify-between p-4 shrink-0">
        <div className="space-y-6">
          {/* Admin Header */}
          <div className="flex items-center justify-between px-2 py-3 border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-background font-black text-sm">
                DA
              </div>
              <div>
                <span className="font-bold text-sm text-white">Admin CMS</span>
                <p className="text-[10px] text-primary font-semibold">Live Management</p>
              </div>
            </Link>
            <Link
              href="/"
              target="_blank"
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              title="View Public Site"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {[
              { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
              { href: "/admin/profile", label: "Profile & Bio", icon: User },
              { href: "/admin/theme", label: "Theme & Accents", icon: Palette, badge: "Customizer" },
              { href: "/admin/projects", label: "Mobile Projects", icon: Smartphone },
              { href: "/admin/cv", label: "CV & Experience", icon: FileText },
              { href: "/admin/skills", label: "Skills Matrix", icon: Code2 },
              { href: "/admin/life-feed", label: "Life / Now Feed", icon: Clock },
              { href: "/admin/messages", label: "Messages Inbox", icon: MessageSquare },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-primary/20 text-primary">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Admin Session / Logout */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
              {session?.user?.name ? session.user.name[0] : "A"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">
                {session?.user?.name || "Admin Mode"}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {session?.user?.email || "Authenticated"}
              </p>
            </div>
          </div>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-xs font-semibold text-slate-400 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Admin Body */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
