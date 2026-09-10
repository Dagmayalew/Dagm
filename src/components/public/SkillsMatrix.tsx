"use client";

import { useState } from "react";
import { SkillCategoryData } from "@/types";
import {
  Smartphone,
  Layers,
  Database,
  Cpu,
  Workflow,
  Globe,
  Flame,
  HardDrive,
  Terminal,
  Server,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
  Smartphone,
  Layers,
  Database,
  Cpu,
  Workflow,
  Globe,
  Flame,
  HardDrive,
  Terminal,
  Server,
};

export function SkillsMatrix({ categories }: { categories: SkillCategoryData[] }) {
  const [selectedCat, setSelectedCat] = useState<string>("all");

  const filteredCategories =
    selectedCat === "all"
      ? categories
      : categories.filter((c) => c.id === selectedCat);

  return (
    <section id="skills" className="py-16 relative scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="space-y-2 mb-10 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5" /> Technical Arsenal
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Technologies & Tools
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Focused on production React Native mobile architectures, with end-to-end full-stack capabilities.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => setSelectedCat("all")}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all",
              selectedCat === "all"
                ? "bg-primary text-background font-bold shadow-sm"
                : "bg-white/5 text-slate-400 hover:text-white"
            )}
          >
            All Skills
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all",
                selectedCat === cat.id
                  ? "bg-primary text-background font-bold shadow-sm"
                  : "bg-white/5 text-slate-400 hover:text-white"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((cat) => {
            const isMobile = cat.name.toLowerCase().includes("mobile");
            return (
              <div
                key={cat.id}
                className={cn(
                  "p-6 rounded-2xl bg-[#0c1220] border transition-all space-y-4",
                  isMobile
                    ? "border-primary/40 bg-gradient-to-br from-[#0c1220] to-[#0d182b]"
                    : "border-white/10"
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">
                    {cat.name}
                  </h3>
                  {isMobile && (
                    <span className="text-[10px] font-bold text-primary px-2 py-0.5 rounded-full bg-primary/15 border border-primary/30 uppercase tracking-wider">
                      Core Focus
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => {
                    const Icon = (skill.iconName && ICON_MAP[skill.iconName]) || Smartphone;
                    const isRN = skill.name.toLowerCase().includes("react native");
                    return (
                      <div
                        key={skill.id}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all",
                          isRN
                            ? "bg-primary text-background font-bold shadow-sm"
                            : skill.featured
                            ? "bg-primary/10 border border-primary/25 text-primary font-semibold"
                            : "bg-white/5 border border-white/10 text-slate-300"
                        )}
                      >
                        <Icon className={cn("w-3.5 h-3.5", isRN ? "text-background" : "opacity-75")} />
                        <span>{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
