"use client";

import { ExperienceData } from "@/types";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export function ExperienceTimeline({
  experiences,
  title,
  subtitle,
}: {
  experiences: ExperienceData[];
  title?: string;
  subtitle?: string;
}) {
  return (
    <section id="experience" className="py-16 relative scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="space-y-2 mb-12 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" /> Career History
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {title || "Work Experience"}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {subtitle || "Track record of shipping production mobile applications and leading feature delivery."}
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l border-white/10 ml-3 sm:ml-6 space-y-10">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-6 sm:pl-8 group">
              
              {/* Timeline node */}
              <div className="absolute -left-[9px] top-2.5 w-4 h-4 rounded-full bg-[#070b14] border-2 border-primary/60" />

              {/* Card Container */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#0c1220] border border-white/10 hover:border-primary/40 transition-all shadow-md space-y-4">
                
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-primary mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1 sm:pt-0">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 border border-white/5">
                      <Calendar className="w-3 h-3 text-primary" />
                      {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 border border-white/5">
                        <MapPin className="w-3 h-3 text-primary" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                {exp.description && (
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>
                )}

                {/* Achievements */}
                {exp.achievements.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <ul className="space-y-2">
                      {exp.achievements.map((item, i) => (
                        <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack Chips */}
                {exp.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
