import { Suspense } from "react";
import {
  getProfile,
  getExperiences,
  getEducation,
  getSkillCategories,
  getCertifications,
} from "@/lib/data";
import { CVPreview } from "@/components/cv/CVPreview";
import { FileText } from "lucide-react";

export const revalidate = 3600;

export const metadata = {
  title: "Dynamic CV & Resume | Dagmay Ayalew",
  description: "Interactive and ATS-ready curriculum vitae of Dagmay Ayalew, Senior Mobile App Developer.",
};

export default async function CVPage() {
  const [profile, experiences, education, skillCategories, certifications] =
    await Promise.all([
      getProfile(),
      getExperiences(),
      getEducation(),
      getSkillCategories(),
      getCertifications(),
    ]);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Title */}
        <div className="no-print space-y-2 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" /> Interactive Resume
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Curriculum Vitae & Experience
          </h1>
          <p className="text-slate-400 text-sm max-w-xl">
            Live database-driven CV with instant 1-click ATS PDF download.
          </p>
        </div>

        {/* CV Preview & Print Component */}
        <Suspense fallback={<div className="h-96 rounded-3xl bg-white/5 animate-pulse" />}>
          <CVPreview
            profile={profile}
            experiences={experiences}
            education={education}
            skillCategories={skillCategories}
            certifications={certifications}
          />
        </Suspense>
      </div>
    </div>
  );
}
