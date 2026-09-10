import { getProfile } from "@/lib/data";
import { ContactForm } from "@/components/public/ContactForm";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Linkedin,
  Github,
  Twitter,
  ArrowUpRight,
} from "lucide-react";

export const revalidate = 3600;

export const metadata = {
  title: "Contact & Inquiries | Dagmay Ayalew - Senior Mobile Developer",
  description:
    "Get in touch with Dagmay Ayalew for React Native, Flutter, and FinTech mobile engineering projects, contracts, or full-time roles.",
};

export default async function ContactPage() {
  const profile = await getProfile();

  const directChannels = [
    {
      title: "Direct Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: Mail,
      desc: "Fastest channel for project inquiries & hiring",
      actionText: "Send Direct Email",
    },
    {
      title: "Phone & Telegram",
      value: profile.phone || "+251 988 280 976",
      href: profile.phone ? `tel:${profile.phone}` : "tel:+251988280976",
      icon: Phone,
      desc: "Available during EAT business hours (UTC+3)",
      actionText: "Call / Contact",
    },
    {
      title: "Location & Timezone",
      value: profile.location || "Addis Ababa, Ethiopia",
      href: null,
      icon: MapPin,
      desc: "UTC+3 (East Africa Time), Open to Global Remote",
      actionText: "Remote / Hybrid",
    },
    {
      title: "Current Availability",
      value: profile.isOpenToWork
        ? "Available for Senior Mobile Roles"
        : "Building Mobile Super Apps",
      href: null,
      icon: Clock,
      desc: "Quick response time",
      actionText: "Active Status",
    },
  ];

  return (
    <div className="pt-24 pb-20 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Top Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <Send className="w-3.5 h-3.5" /> Direct Channels
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Get In Touch
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Interested in discussing a senior mobile engineering opportunity, React Native architecture challenge, or new product development? Let&apos;s connect.
          </p>
        </div>

        {/* Direct Channels Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {directChannels.map((ch, idx) => {
            const Icon = ch.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0d1424] border border-white/10 hover:border-primary/40 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                      {ch.title}
                    </h3>
                    <p className="text-sm font-bold text-white mt-0.5 break-all">
                      {ch.value}
                    </p>
                  </div>
                  <p className="text-xs text-slate-400">
                    {ch.desc}
                  </p>
                </div>

                {ch.href ? (
                  <a
                    href={ch.href}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline pt-2"
                  >
                    <span>{ch.actionText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 pt-2">
                    {ch.actionText}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Social Network Profiles */}
        <div className="p-6 rounded-2xl bg-[#0d1424] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center sm:text-left">
            <h3 className="text-sm font-bold text-white">
              Professional Networks
            </h3>
            <p className="text-xs text-slate-400">
              Connect on LinkedIn or explore my public repositories on GitHub.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0077b5]/15 hover:bg-[#0077b5]/25 border border-[#0077b5]/30 text-xs font-semibold text-[#38bdf8] transition-all"
              >
                <Linkedin className="w-3.5 h-3.5" />
                LinkedIn
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
            {profile.twitterUrl && (
              <a
                href={profile.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all"
              >
                <Twitter className="w-3.5 h-3.5" />
                Twitter / X
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

      </div>

      {/* Main Interactive Contact Form */}
      <div className="-mt-6">
        <ContactForm profile={profile} />
      </div>
    </div>
  );
}
