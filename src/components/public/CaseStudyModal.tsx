"use client";

import { useState } from "react";
import Image from "next/image";
import { ProjectData } from "@/types";
import {
  X,
  Smartphone,
  ExternalLink,
  Github,
  Download,
  Star,
  Layers,
  Play,
  CheckCircle2,
  ShieldCheck,
  Zap,
  FileText,
  ChevronRight,
} from "lucide-react";

interface CaseStudyModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-[32px] bg-[#0c1220] border border-white/15 shadow-2xl text-slate-100 flex flex-col">
        
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-slate-300 hover:text-white transition-all backdrop-blur-md"
          title="Close Case Study"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Cover Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden shrink-0 bg-slate-900">
          <Image
            src={project.thumbnail || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200"}
            alt={project.title}
            fill
            unoptimized
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1220] via-[#0c1220]/50 to-transparent" />

          {/* Top Badges */}
          <div className="absolute bottom-6 left-6 sm:left-8 right-6 flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Smartphone className="w-3.5 h-3.5" /> {project.platform}
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {project.title}
              </h2>
            </div>

            {project.featured && (
              <span className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-400 text-xs font-bold flex items-center gap-1.5 backdrop-blur-md self-start sm:self-auto">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> Featured Mobile App
              </span>
            )}
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Key Metrics Stats Bar */}
          {project.keyMetrics && Object.keys(project.keyMetrics).length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              {project.keyMetrics.downloads && (
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Deployment / Scale
                  </span>
                  <p className="text-base sm:text-lg font-black text-primary">
                    {project.keyMetrics.downloads}
                  </p>
                </div>
              )}
              {project.keyMetrics.rating && (
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    App Quality / Score
                  </span>
                  <p className="text-base sm:text-lg font-black text-amber-400">
                    {project.keyMetrics.rating}
                  </p>
                </div>
              )}
              {project.keyMetrics.activeUsers && (
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Performance / Scope
                  </span>
                  <p className="text-base sm:text-lg font-black text-cyan-400">
                    {project.keyMetrics.activeUsers}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Summary / Problem Statement */}
          <div className="space-y-3">
            <h3 className="text-sm uppercase tracking-widest font-extrabold text-primary flex items-center gap-2">
              <FileText className="w-4 h-4" /> Executive Overview
            </h3>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-medium">
              {project.summary}
            </p>
          </div>

          {/* Deep-Dive Case Study & Architecture */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm uppercase tracking-widest font-extrabold text-primary flex items-center gap-2">
              <Zap className="w-4 h-4" /> Engineering & Architecture Breakdown
            </h3>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {project.description}
            </div>
          </div>

          {/* Tech Stack Matrix */}
          <div className="space-y-3">
            <h3 className="text-sm uppercase tracking-widest font-extrabold text-primary flex items-center gap-2">
              <Layers className="w-4 h-4" /> Technologies & Frameworks Utilized
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 hover:border-primary/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Screenshots Gallery (if available) */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm uppercase tracking-widest font-extrabold text-primary flex items-center gap-2">
                <Smartphone className="w-4 h-4" /> Mobile App Gallery & Visuals
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {project.screenshots.map((shot, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedScreenshot(shot)}
                    className="group relative h-48 rounded-2xl overflow-hidden bg-slate-900 border border-white/10 cursor-pointer hover:border-primary/50 transition-all shadow-lg"
                  >
                    <Image
                      src={shot}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1 rounded-lg bg-black/70 text-[11px] font-bold text-white border border-white/20">
                        Enlarge
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Links Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {project.appStoreUrl && (
                <a
                  href={project.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-background font-bold text-xs hover:brightness-110 shadow-lg shadow-primary/25 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Apple App Store
                </a>
              )}
              {project.playStoreUrl && (
                <a
                  href={project.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 border border-white/10 transition-all"
                >
                  <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                  Google Play Store
                </a>
              )}
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 text-slate-200 font-semibold text-xs hover:bg-white/10 border border-white/10 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-primary" />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 text-slate-200 font-semibold text-xs hover:bg-white/10 border border-white/10 transition-all"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs transition-colors"
            >
              Close
            </button>
          </div>

        </div>

        {/* Screenshot Lightbox Modal */}
        {selectedScreenshot && (
          <div
            onClick={() => setSelectedScreenshot(null)}
            className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <div className="relative max-w-3xl max-h-[85vh] w-full h-[70vh]">
              <Image
                src={selectedScreenshot}
                alt="Enlarged screenshot"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
