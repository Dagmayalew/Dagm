import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/data";
import {
  ArrowLeft,
  ArrowUpRight,
  Play,
  Github,
  Globe,
  CheckCircle2,
} from "lucide-react";

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Case Study - Dagm Ayalew`,
    description: project.summary || project.description,
    openGraph: {
      title: `${project.title} — Mobile Case Study`,
      description: project.summary || project.description,
      type: "article",
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const cs = project.caseStudy;

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Back Navigation */}
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Selected Work
          </Link>
        </div>

        {/* ========================================================================= */}
        {/* HERO / FIRST SCREEN */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                {project.platform}
              </span>
              {project.keyMetrics?.downloads && (
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold">
                  {project.keyMetrics.downloads}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              {project.summary || project.description}
            </p>
          </div>

          {/* Large Visual */}
          <div className="relative h-64 sm:h-[420px] w-full rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl">
            <Image
              src={project.thumbnail || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200"}
              alt={project.title}
              fill
              priority
              unoptimized
              className="object-cover"
            />
          </div>

          {/* Key Facts Bar */}
          <div className="p-6 rounded-2xl bg-[#0c1220] border border-white/10 flex flex-wrap items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                My Role
              </span>
              <p className="text-sm font-bold text-white mt-0.5">
                {project.role || "Mobile Application Developer"}
              </p>
            </div>

            <div className="flex-1 min-w-[200px]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-2">
              {project.playStoreUrl && (
                <a
                  href={project.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-background text-xs font-bold hover:brightness-110 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Google Play
                </a>
              )}
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  Website
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  Source
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CASE STUDY CONTENT BODY */}
        {/* ========================================================================= */}
        <div className="space-y-10 pt-4">
          
          {/* Overview */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Overview
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              {cs?.overview || project.description}
            </p>
          </section>

          {/* My Role */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight">
              My Role & Contributions
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              {cs?.role || `Contributed as ${project.role || "Mobile Application Developer"}, focusing on core application architecture and feature delivery.`}
            </p>
          </section>

          {/* The Challenge */}
          {cs?.challenge && (
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight">
                The Challenge
              </h2>
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0c1220] border border-white/10">
                <p className="text-slate-300 text-base leading-relaxed">
                  {cs.challenge}
                </p>
              </div>
            </section>
          )}

          {/* The Solution */}
          {cs?.solution && (
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight">
                The Solution
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                {cs.solution}
              </p>
            </section>
          )}

          {/* Engineering Decisions */}
          {cs?.architecture && cs.architecture.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Engineering Decisions
              </h2>
              <div className="grid grid-cols-1 gap-2.5">
                {cs.architecture.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-200 leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Results & Verified Impact */}
          {cs?.results && cs.results.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Results & Impact
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cs.results.map((res, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-1"
                  >
                    <span className="text-[10px] font-bold text-primary">0{idx + 1}</span>
                    <p className="text-sm font-semibold text-white leading-relaxed">
                      {res}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Screenshots */}
          {project.screenshots && project.screenshots.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Screenshots & Visuals
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.screenshots.map((shot, idx) => (
                  <div
                    key={idx}
                    className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-900 border border-white/10"
                  >
                    <Image
                      src={shot}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Key Takeaways */}
          {cs?.takeaways && cs.takeaways.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Key Takeaways
              </h2>
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0c1220] border border-white/10 space-y-2">
                {cs.takeaways.map((takeaway, idx) => (
                  <p key={idx} className="text-sm text-slate-300 leading-relaxed flex items-start gap-2">
                    <span className="text-primary font-bold">-</span>
                    <span>{takeaway}</span>
                  </p>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Footer Actions */}
        <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/#selected-work"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Selected Work
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-background font-bold text-xs hover:brightness-110 shadow-md shadow-primary/20 transition-all"
          >
            Get In Touch
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
