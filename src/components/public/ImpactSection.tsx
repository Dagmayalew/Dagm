import {
  Smartphone,
  Layers,
  ShieldCheck,
  RefreshCw,
  Zap,
  Globe,
  CheckCircle2,
} from "lucide-react";

export function ImpactSection() {
  const capabilities = [
    {
      icon: Smartphone,
      title: "Production Mobile Development",
      badge: "Core Expertise",
      description:
        "Architecting and shipping responsive, native-feeling mobile applications across iOS and Android with React Native and Flutter.",
      points: [
        "React Native CLI & Expo workflows",
        "Platform-specific native adaptations",
        "Fluid 60fps animations & gesture interactions",
      ],
    },
    {
      icon: Layers,
      title: "Mobile Architecture & State",
      badge: "Clean Architecture",
      description:
        "Building structured, maintainable codebases with clean layer separation, modular feature boundaries, and robust state management.",
      points: [
        "Predictable state with Zustand & Redux Toolkit",
        "Modular domain-driven feature folder structures",
        "Reusable UI component design systems",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Fintech & Secure Transactions",
      badge: "Security & KYC",
      description:
        "Engineering high-stakes transaction flows, biometric security, and strict compliance workflows in live banking and fintech environments.",
      points: [
        "Biometric authentication (Face ID & Fingerprint)",
        "Hardware-backed secure storage (MMKV & Keychain)",
        "Fayda national ID & KYC integration flows",
      ],
    },
    {
      icon: RefreshCw,
      title: "API Integration & Offline Sync",
      badge: "Reliability",
      description:
        "Connecting mobile clients to complex backend infrastructures with resilient network handling, caching, and background sync.",
      points: [
        "RESTful API & GraphQL query integration",
        "Offline-first storage with WatermelonDB & SQLite",
        "Push notifications & deep link routing",
      ],
    },
    {
      icon: Zap,
      title: "Performance Optimization & UX",
      badge: "Speed & Polish",
      description:
        "Eliminating UI thread jank, reducing bridge latency, and optimizing memory footprints for low-end to flagship devices.",
      points: [
        "Virtual list virtualization & image caching",
        "App launch time & bundle size reduction",
        "Accessibility & haptic feedback refinement",
      ],
    },
    {
      icon: Globe,
      title: "Full-Stack & Web Ecosystem",
      badge: "End-to-End",
      description:
        "Bridging mobile apps with full-stack web platforms and backend services for complete product lifecycle delivery.",
      points: [
        "Next.js 15 App Router & modern web frontends",
        "Node.js, Express, and PostgreSQL backends",
        "Prisma ORM data modeling & migrations",
      ],
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" /> Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            How I Create Value as a Mobile Engineer
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Focused on building reliable, performant, and production-ready mobile software that solves real user and business problems.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-7 rounded-3xl bg-[#0f172a]/60 border border-white/10 backdrop-blur-xl hover:border-primary/40 transition-all shadow-xl flex flex-col justify-between group hover:scale-[1.01]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-background transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 space-y-2">
                  {item.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{pt}</span>
                    </div>
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
