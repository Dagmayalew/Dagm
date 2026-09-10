"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProjectData } from "@/types";
import {
  Smartphone,
  ArrowUpRight,
  Download,
  Play,
  Github,
  Globe,
} from "lucide-react";

export function ProjectCard({ project }: { project: ProjectData }) {
  const [imgSrc, setImgSrc] = useState(
    project.thumbnail ||
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
  );

  return (
    <div className="group rounded-3xl bg-[#0c1220] border border-white/10 hover:border-primary/40 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl">
      {/* Large Visual Preview */}
      <Link
        href={`/projects/${project.slug}`}
        className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900 block"
      >
        <Image
          src={imgSrc}
          alt={project.title}
          fill
          unoptimized
          onError={() =>
            setImgSrc(
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
            )
          }
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-[1.02] transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1220] via-transparent to-black/30" />

        {/* Platform Tag */}
        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 border border-white/15 text-[11px] font-semibold text-white backdrop-blur-md">
          <Smartphone className="w-3.5 h-3.5 text-primary" />
          {project.platform}
        </div>

        {/* Downloads / Scope Tag */}
        {project.keyMetrics?.downloads && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-[11px] font-bold text-primary backdrop-blur-md">
            {project.keyMetrics.downloads}
          </div>
        )}
      </Link>

      {/* Card Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          <div>
            {project.role && (
              <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">
                {project.role}
              </span>
            )}
            <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
              <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-1.5">
                {project.title}
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </Link>
            </h3>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {project.summary || project.description}
          </p>
        </div>

        {/* Tech Stack & Actions */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-medium text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {project.playStoreUrl && (
                <a
                  href={project.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title="Google Play Store"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                </a>
              )}
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title="Website / Live Demo"
                >
                  <Globe className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title="GitHub Repository"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <Link
              href={`/projects/${project.slug}`}
              className="text-xs font-bold text-primary hover:brightness-125 inline-flex items-center gap-1 transition-all"
            >
              Read Case Study <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
