import Link from "next/link";
import {
  getProfile,
  getFeaturedProjects,
  getExperiences,
  getSkillCategories,
} from "@/lib/data";
import { HeroSection } from "@/components/public/HeroSection";
import { ProjectCard } from "@/components/public/ProjectCard";
import { ExperienceTimeline } from "@/components/public/ExperienceTimeline";
import { SkillsMatrix } from "@/components/public/SkillsMatrix";
import { ContactForm } from "@/components/public/ContactForm";
import { Smartphone, ArrowRight } from "lucide-react";

export const revalidate = 3600;

export default async function HomePage() {
  const [profile, featuredProjects, experiences, skillCategories] =
    await Promise.all([
      getProfile(),
      getFeaturedProjects(),
      getExperiences(),
      getSkillCategories(),
    ]);

  return (
    <div className="space-y-12">
      {/* 1. Hero Section */}
      <HeroSection profile={profile} />

      {/* 2. Selected Work */}
      <section id="selected-work" className="py-16 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                <Smartphone className="w-3.5 h-3.5" /> Selected Work
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Featured Mobile Projects
              </h2>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl">
                Production React Native and mobile applications built for scale, performance, and real user workflows.
              </p>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-all self-start md:self-auto"
            >
              All Projects ({featuredProjects.length}+)
              <ArrowRight className="w-3.5 h-3.5 text-primary" />
            </Link>
          </div>

          {/* 2-Column Grid for Significantly Larger Project Visuals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Work Experience */}
      <ExperienceTimeline experiences={experiences} />

      {/* 4. Technical Skills */}
      <SkillsMatrix categories={skillCategories} />

      {/* 5. Contact Form CTA */}
      <ContactForm profile={profile} />
    </div>
  );
}
