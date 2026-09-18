import { Metadata } from "next";
import Link from "next/link";
import { TerminalViewer } from "@/components/public/TerminalViewer";
import { Terminal, ArrowLeft, ExternalLink, Code2, HelpCircle } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Terminal Portfolio | Dagm Ayalew",
  description:
    "Interactive command-line portfolio for Dagm Ayalew, Senior Mobile App Developer. Explore projects, skills, and background using a terminal shell.",
};

export default function TerminalPage() {
  const terminalCommands = [
    { cmd: "help", desc: "List all available interactive commands" },
    { cmd: "about", desc: "Display personal bio, background, and summary" },
    { cmd: "projects", desc: "List production mobile & full-stack projects" },
    { cmd: "skills", desc: "Inspect core technologies, frameworks, and tools" },
    { cmd: "experience", desc: "View work history and professional milestones" },
    { cmd: "contact", desc: "Get email, Telegram, phone, and social handles" },
    { cmd: "clear", desc: "Clear the terminal console buffer" },
  ];

  return (
    <div className="pt-24 pb-20 space-y-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5" /> Interactive CLI
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Terminal Portfolio
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Prefer a keyboard-driven developer interface? Navigate through my work, experience,
              and skills directly using this embedded command-line shell.
            </p>
          </div>

          {/* Quick Action Navigation */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-primary" />
              Standard Portfolio
            </Link>

            <a
              href="https://terminal.dagmayalew.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-background font-bold text-xs hover:brightness-110 shadow-md shadow-primary/20 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open Standalone
            </a>
          </div>
        </div>

        {/* Embedded Terminal Frame */}
        <TerminalViewer
          src="https://terminal.dagmayalew.online/"
          heightClassName="h-[680px] sm:h-[740px]"
        />

        {/* Command Reference Guide */}
        <div className="p-6 rounded-2xl bg-[#0d1424] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Code2 className="w-4 h-4 text-primary" />
              <span>Available Shell Commands</span>
            </div>
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" /> Type in console above
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {terminalCommands.map((item) => (
              <div
                key={item.cmd}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1"
              >
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-primary">
                  <span>$</span>
                  <span>{item.cmd}</span>
                </div>
                <p className="text-[11px] text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
