import { getProjects } from "@/lib/data";
import { ProjectCard } from "@/components/public/ProjectCard";
import { Smartphone } from "lucide-react";

export const revalidate = 3600;

export const metadata = {
  title: "Selected Work & Mobile Applications | Dagmay Ayalew",
  description: "Production mobile applications and architectural case studies engineered by Dagmay Ayalew.",
  openGraph: {
    title: "Selected Work & Mobile Applications | Dagmay Ayalew",
    description: "Production mobile applications and architectural case studies engineered by Dagmay Ayalew.",
    type: "website",
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <Smartphone className="w-3.5 h-3.5" /> Mobile Showcase
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Selected Mobile Work
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Detailed breakdown of production React Native and mobile applications, featuring banking super apps, agent solutions, and e-commerce platforms.
          </p>
        </div>

        {/* Projects Grid (2-Column for large visuals) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} id={project.slug} className="scroll-mt-32">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
