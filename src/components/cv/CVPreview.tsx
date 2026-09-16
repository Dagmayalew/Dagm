"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  ProfileData,
  ExperienceData,
  EducationData,
  SkillCategoryData,
  CertificationData,
} from "@/types";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  FileDown,
  ExternalLink,
  Sparkles,
} from "lucide-react";

interface CVPreviewProps {
  profile: ProfileData;
  experiences: ExperienceData[];
  education: EducationData[];
  skillCategories: SkillCategoryData[];
  certifications: CertificationData[];
}

export function CVPreview({
  profile,
  experiences,
  education,
  skillCategories,
  certifications,
}: CVPreviewProps) {
  const [activeTemplate, setActiveTemplate] = useState<"modern" | "ats">("modern");
  const searchParams = useSearchParams();

  useEffect(() => {
    const isDownload =
      searchParams?.get("download") === "true" ||
      searchParams?.get("action") === "download";

    if (isDownload) {
      const timer = setTimeout(() => {
        window.print();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handlePrint = () => {
    window.print();
  };

  const hasExternalResume =
    Boolean(profile.resumeUrl) &&
    profile.resumeUrl !== "/cv" &&
    profile.resumeUrl?.trim() !== "";

  return (
    <div className="space-y-8">
      {/* Control Bar (Template switch & PDF Download action) */}
      <div className="no-print flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#0f172a]/95 border border-white/10 backdrop-blur-xl shadow-xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
            Layout Preview:
          </span>
          <button
            onClick={() => setActiveTemplate("modern")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTemplate === "modern"
                ? "bg-primary text-background shadow-md shadow-primary/20"
                : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            Modern Dark
          </button>
          <button
            onClick={() => setActiveTemplate("ats")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTemplate === "ats"
                ? "bg-primary text-background shadow-md shadow-primary/20"
                : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            Classic ATS (Paper White)
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {hasExternalResume && (
            <a
              href={profile.resumeUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-primary" />
              Direct File / Cloud PDF
            </a>
          )}

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-background font-bold text-xs hover:brightness-110 shadow-lg shadow-primary/25 transition-all cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            Download / Print ATS PDF
          </button>
        </div>
      </div>

      {/* Recruiter Prompt Tip */}
      <div className="no-print flex items-center gap-2.5 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20 text-xs text-slate-300">
        <Sparkles className="w-4 h-4 text-primary shrink-0" />
        <span>
          <strong>Recruiter Tip:</strong> Clicking <em>&quot;Download / Print ATS PDF&quot;</em> automatically renders this resume with A4 page breaks, pure contrast, and ATS-parseable headings. Choose <strong>Save as PDF</strong> in your system dialog.
        </span>
      </div>

      {/* CV Sheet */}
      <div
        className={`w-full max-w-4xl mx-auto rounded-3xl transition-all duration-300 shadow-2xl overflow-hidden cv-sheet ${
          activeTemplate === "modern"
            ? "bg-[#0c1220] border border-white/15 text-slate-100 p-8 sm:p-12"
            : "bg-white text-slate-900 border border-slate-300 p-8 sm:p-12 shadow-black/10"
        }`}
      >
        {/* Header Section */}
        <div className="border-b pb-8 space-y-4 border-slate-700/50 print-border cv-break-avoid">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1
                className={`text-3xl sm:text-4xl font-black tracking-tight print-primary ${
                  activeTemplate === "modern" ? "text-white" : "text-slate-950"
                }`}
              >
                {profile.name}
              </h1>
              <p
                className={`text-lg font-bold mt-1 print-accent ${
                  activeTemplate === "modern" ? "text-primary" : "text-emerald-700"
                }`}
              >
                {profile.title}
              </p>
            </div>
            
            <div className="text-xs space-y-1.5 sm:text-right text-slate-400 print-muted">
              <p className="flex items-center sm:justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> {profile.location}
              </p>
              <p className="flex items-center sm:justify-end gap-1.5">
                <Mail className="w-3.5 h-3.5 text-primary shrink-0" /> {profile.email}
              </p>
              {profile.phone && (
                <p className="flex items-center sm:justify-end gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-primary shrink-0" /> {profile.phone}
                </p>
              )}
            </div>
          </div>

          {/* Social Links Row */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold pt-2">
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:underline text-primary print-accent"
              >
                <Linkedin className="w-3.5 h-3.5" /> {profile.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            )}
            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:underline text-primary print-accent"
              >
                <Github className="w-3.5 h-3.5" /> {profile.githubUrl.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            )}
          </div>
        </div>

        {/* Executive Summary */}
        <div className="py-6 border-b border-slate-700/50 print-border space-y-2 cv-break-avoid">
          <h2
            className={`text-xs font-black uppercase tracking-wider print-primary ${
              activeTemplate === "modern" ? "text-primary" : "text-emerald-800"
            }`}
          >
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed opacity-90 whitespace-pre-line print-primary">
            {profile.aboutMe || profile.bio}
          </p>
        </div>

        {/* Work Experience */}
        <div className="py-6 border-b border-slate-700/50 print-border space-y-6">
          <h2
            className={`text-xs font-black uppercase tracking-wider flex items-center gap-2 print-primary cv-break-avoid ${
              activeTemplate === "modern" ? "text-primary" : "text-emerald-800"
            }`}
          >
            <Briefcase className="w-4 h-4" /> Work Experience
          </h2>

          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-2 cv-break-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="text-base font-bold print-primary">
                      {exp.role} <span className="font-normal opacity-75">at</span>{" "}
                      <span className="text-primary print-accent font-bold">{exp.company}</span>
                    </h3>
                  </div>
                  <span className="text-xs font-medium opacity-70 print-muted">
                    {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate} | {exp.location || "Remote"}
                  </span>
                </div>

                {exp.description && (
                  <p className="text-xs leading-relaxed opacity-85 print-primary">{exp.description}</p>
                )}

                {exp.achievements.length > 0 && (
                  <ul className="space-y-1.5 pl-1 pt-1">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="text-xs leading-relaxed flex items-start gap-2 print-primary">
                        <span className="text-primary print-accent font-bold mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {exp.techStack.length > 0 && (
                  <p className="text-[11px] pt-1 opacity-75 print-muted">
                    <strong className="font-semibold print-primary">Technologies:</strong> {exp.techStack.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills Categorized */}
        <div className="py-6 border-b border-slate-700/50 print-border space-y-4 cv-break-avoid">
          <h2
            className={`text-xs font-black uppercase tracking-wider flex items-center gap-2 print-primary ${
              activeTemplate === "modern" ? "text-primary" : "text-emerald-800"
            }`}
          >
            <Code2 className="w-4 h-4" /> Skills & Core Competencies
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="space-y-1">
                <h4 className="font-bold opacity-90 print-primary">{cat.name}:</h4>
                <p className="leading-relaxed opacity-80 print-primary">
                  {cat.skills.map((s) => s.name).join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="py-6 border-b border-slate-700/50 print-border space-y-4 cv-break-avoid">
          <h2
            className={`text-xs font-black uppercase tracking-wider flex items-center gap-2 print-primary ${
              activeTemplate === "modern" ? "text-primary" : "text-emerald-800"
            }`}
          >
            <GraduationCap className="w-4 h-4" /> Education
          </h2>

          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="space-y-1 cv-break-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-sm font-bold print-primary">
                    {edu.degree} in {edu.fieldOfStudy}
                  </h3>
                  <span className="text-xs opacity-70 print-muted">
                    {edu.startDate} – {edu.isCurrent ? "Present" : edu.endDate}
                  </span>
                </div>
                <p className="text-xs text-primary print-accent font-semibold">{edu.institution}</p>
                {edu.grade && <p className="text-xs opacity-80 print-muted">{edu.grade}</p>}
                {edu.activities.length > 0 && (
                  <ul className="text-xs opacity-75 list-disc list-inside space-y-0.5 pt-1 print-primary">
                    {edu.activities.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="pt-6 space-y-4 cv-break-avoid">
            <h2
              className={`text-xs font-black uppercase tracking-wider flex items-center gap-2 print-primary ${
                activeTemplate === "modern" ? "text-primary" : "text-emerald-800"
              }`}
            >
              <Award className="w-4 h-4" /> Certifications & Credentials
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/5 print-badge space-y-0.5"
                >
                  <h4 className="font-bold print-primary">{cert.title}</h4>
                  <p className="opacity-75 print-muted">{cert.issuer} | Issued {cert.issueDate}</p>
                  {cert.credentialId && (
                    <p className="text-[10px] opacity-60 font-mono print-muted">ID: {cert.credentialId}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
