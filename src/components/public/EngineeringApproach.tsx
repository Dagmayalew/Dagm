import {
  ShieldAlert,
  Layers,
  Zap,
  HeartHandshake,
  GitBranch,
  TerminalSquare,
} from "lucide-react";

export function EngineeringApproach() {
  const principles = [
    {
      icon: ShieldAlert,
      title: "Production-First Mindset",
      description:
        "Building for harsh real-world conditions: flaky network connections, low-memory devices, unexpected API payloads, and strict security constraints. Polish is about resilience as much as aesthetics.",
      tags: ["Crash Resilience", "Graceful Degradation", "Defensive Parsing"],
    },
    {
      icon: Layers,
      title: "Predictable & Modular Architecture",
      description:
        "Structuring projects with distinct separation of concerns: clear data access layers, domain-isolated state stores, and unopinionated presentation components that stay maintainable as teams grow.",
      tags: ["Feature-Driven Design", "Strict TypeScript", "Decoupled Logic"],
    },
    {
      icon: Zap,
      title: "Performance as a Core Feature",
      description:
        "Optimizing for sub-second cold starts, jank-free 60fps lists, and disciplined asset caching. Respecting mobile battery life, cellular data consumption, and CPU thermal throttling.",
      tags: ["60fps Animations", "Memory Profiling", "Bundle Optimization"],
    },
    {
      icon: HeartHandshake,
      title: "User & Product Empathy",
      description:
        "Writing code that directly serves product viability and user satisfaction. Avoiding unnecessary over-engineering and choosing the simplest, most dependable solution to solve actual human problems.",
      tags: ["Pragmatic Engineering", "UX Polish", "Business Value"],
    },
    {
      icon: GitBranch,
      title: "Clean Collaboration & Workflows",
      description:
        "Believing in transparent communication, atomic git commits, comprehensive PR descriptions, clear API contracts, and seamless cross-functional pairing with designers and backend engineers.",
      tags: ["Clear Documentation", "API Contract Alignment", "Team Empathy"],
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <TerminalSquare className="w-3.5 h-3.5" /> Engineering Standards
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            How I Build Software
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Principles honed across production mobile deployments, high-concurrency fintech flows, and startup delivery timelines.
          </p>
        </div>

        {/* 5-Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {principles.map((item, index) => {
            const Icon = item.icon;
            const isWide = index === 0;
            return (
              <div
                key={index}
                className={`p-7 sm:p-8 rounded-3xl bg-[#0f172a]/60 border border-white/10 backdrop-blur-xl hover:border-primary/40 transition-all shadow-xl flex flex-col justify-between group ${
                  isWide ? "lg:col-span-2" : ""
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-background transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex flex-wrap gap-2">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
