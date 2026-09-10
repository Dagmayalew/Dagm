"use client";

import { useState, useEffect } from "react";
import { ExperienceData, EducationData, CertificationData } from "@/types";
import {
  DEFAULT_EXPERIENCES,
  DEFAULT_EDUCATION,
  DEFAULT_CERTIFICATIONS,
} from "@/lib/constants";
import {
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Plus,
  Edit2,
  Trash2,
  Save,
  Loader2,
  X,
  Calendar,
  MapPin,
  ExternalLink,
} from "lucide-react";

export default function CVAdminPage() {
  const [experiences, setExperiences] = useState<ExperienceData[]>(DEFAULT_EXPERIENCES);
  const [education, setEducation] = useState<EducationData[]>(DEFAULT_EDUCATION);
  const [certifications, setCertifications] = useState<CertificationData[]>(DEFAULT_CERTIFICATIONS);
  const [activeTab, setActiveTab] = useState<"experience" | "education" | "certifications">("experience");

  const [editingExp, setEditingExp] = useState<Partial<ExperienceData> | null>(null);
  const [editingEdu, setEditingEdu] = useState<Partial<EducationData> | null>(null);
  const [editingCert, setEditingCert] = useState<Partial<CertificationData> | null>(null);

  const [expAchievementsText, setExpAchievementsText] = useState("");
  const [expTechStackText, setExpTechStackText] = useState("");
  const [eduActivitiesText, setEduActivitiesText] = useState("");

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCVData = async () => {
    try {
      const res = await fetch("/api/cv-data");
      if (res.ok) {
        const data = await res.json();
        setExperiences(data.experiences || DEFAULT_EXPERIENCES);
        setEducation(data.education || DEFAULT_EDUCATION);
        setCertifications(data.certifications || DEFAULT_CERTIFICATIONS);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCVData();
  }, []);

  // Experience handlers
  const openExpModal = (exp: Partial<ExperienceData>) => {
    setEditingExp(exp);
    setExpAchievementsText(exp.achievements ? exp.achievements.join("\n") : "");
    setExpTechStackText(exp.techStack ? exp.techStack.join(", ") : "");
  };

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp?.company || !editingExp?.role) return;
    setSaving(true);
    try {
      const achievements = expAchievementsText.split("\n").map((s) => s.trim()).filter(Boolean);
      const techStack = expTechStackText.split(",").map((s) => s.trim()).filter(Boolean);

      const payload = {
        type: "experience",
        data: {
          ...editingExp,
          company: editingExp.company,
          role: editingExp.role,
          achievements,
          techStack,
        },
      };

      const res = await fetch("/api/cv-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setEditingExp(null);
        await fetchCVData();
      }
    } catch (err) {
      console.error("Failed to save experience:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteExp = async (id: string) => {
    if (!confirm("Delete this work experience entry?")) return;
    try {
      const res = await fetch(`/api/cv-data?type=experience&id=${id}`, { method: "DELETE" });
      if (res.ok) await fetchCVData();
    } catch (err) {
      console.error(err);
    }
  };

  // Education handlers
  const openEduModal = (edu: Partial<EducationData>) => {
    setEditingEdu(edu);
    setEduActivitiesText(edu.activities ? edu.activities.join("\n") : "");
  };

  const handleSaveEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEdu?.institution || !editingEdu?.degree) return;
    setSaving(true);
    try {
      const activities = eduActivitiesText.split("\n").map((s) => s.trim()).filter(Boolean);
      const payload = {
        type: "education",
        data: {
          ...editingEdu,
          institution: editingEdu.institution,
          degree: editingEdu.degree,
          activities,
        },
      };

      const res = await fetch("/api/cv-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setEditingEdu(null);
        await fetchCVData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEdu = async (id: string) => {
    if (!confirm("Delete this education entry?")) return;
    try {
      const res = await fetch(`/api/cv-data?type=education&id=${id}`, { method: "DELETE" });
      if (res.ok) await fetchCVData();
    } catch (err) {
      console.error(err);
    }
  };

  // Certification handlers
  const openCertModal = (cert: Partial<CertificationData>) => {
    setEditingCert(cert);
  };

  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert?.title || !editingCert?.issuer) return;
    setSaving(true);
    try {
      const payload = {
        type: "certification",
        data: editingCert,
      };

      const res = await fetch("/api/cv-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setEditingCert(null);
        await fetchCVData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCert = async (id: string) => {
    if (!confirm("Delete this certification?")) return;
    try {
      const res = await fetch(`/api/cv-data?type=certification&id=${id}`, { method: "DELETE" });
      if (res.ok) await fetchCVData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" /> Dynamic Resume & ATS Builder
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            CV & Experience Manager
          </h1>
          <p className="text-xs text-slate-400">
            Manage your career history, bulleted achievements, academic background, and certifications.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#0d1424] border border-white/10 self-start sm:self-auto">
          {[
            { id: "experience", label: "Work Experience", icon: Briefcase, count: experiences.length },
            { id: "education", label: "Education", icon: GraduationCap, count: education.length },
            { id: "certifications", label: "Certifications", icon: Award, count: certifications.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-primary text-background shadow-md shadow-primary/25"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? "bg-black/20 text-background" : "bg-white/10 text-slate-300"}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: WORK EXPERIENCES */}
      {activeTab === "experience" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" /> Professional Work History
            </h2>
            <button
              onClick={() =>
                openExpModal({
                  id: "new",
                  company: "",
                  role: "Mobile Application Developer",
                  location: "Addis Ababa, Ethiopia",
                  startDate: "2026",
                  endDate: "Present",
                  isCurrent: true,
                  description: "Core mobile developer building production fintech and banking applications with React Native.",
                  achievements: [],
                  techStack: ["React Native", "TypeScript", "Zustand", "Token Auth"],
                  type: "FULL_TIME",
                })
              }
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-background font-bold text-xs hover:brightness-110 shadow-lg shadow-primary/25 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Experience
            </button>
          </div>

          <div className="space-y-4">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="p-6 rounded-3xl bg-[#0d1424] border border-white/10 space-y-4 shadow-xl hover:border-white/20 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-white">{exp.role}</h3>
                      <span className="text-xs text-primary font-semibold">@ {exp.company}</span>
                      {exp.isCurrent && (
                        <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold">
                          Current Role
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" /> {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" /> {exp.location}
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => openExpModal(exp)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                      title="Edit Experience"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteExp(exp.id)}
                      className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete Experience"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{exp.description}</p>

                {/* Achievements */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="space-y-1.5 pl-4 border-l-2 border-primary/40 text-xs text-slate-300">
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx} className="leading-relaxed list-disc">
                        {ach}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech Stack Chips */}
                {exp.techStack && exp.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-semibold text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: EDUCATION */}
      {activeTab === "education" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-primary" /> Academic Qualifications
            </h2>
            <button
              onClick={() =>
                openEduModal({
                  id: "new",
                  institution: "Unity University, Addis Ababa",
                  degree: "Bachelor of Science",
                  fieldOfStudy: "Computer Science",
                  startDate: "2021",
                  endDate: "2025",
                  isCurrent: false,
                  grade: "Graduated 2025",
                  activities: [],
                })
              }
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-background font-bold text-xs hover:brightness-110 shadow-lg shadow-primary/25 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Education
            </button>
          </div>

          <div className="space-y-4">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="p-6 rounded-3xl bg-[#0d1424] border border-white/10 space-y-4 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white">
                      {edu.degree} in {edu.fieldOfStudy}
                    </h3>
                    <p className="text-xs text-primary font-semibold">{edu.institution}</p>
                    <p className="text-xs text-slate-400">
                      {edu.startDate} – {edu.isCurrent ? "Present" : edu.endDate} {edu.grade ? `| ${edu.grade}` : ""}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => openEduModal(edu)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEdu(edu.id)}
                      className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {edu.activities && edu.activities.length > 0 && (
                  <ul className="space-y-1 pl-4 border-l-2 border-primary/30 text-xs text-slate-300">
                    {edu.activities.map((act, idx) => (
                      <li key={idx} className="list-disc leading-relaxed">
                        {act}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CERTIFICATIONS */}
      {activeTab === "certifications" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" /> Certifications & Licenses
            </h2>
            <button
              onClick={() =>
                openCertModal({
                  id: "new",
                  title: "Meta React Native Specialization",
                  issuer: "Coursera / Meta",
                  issueDate: "2024",
                  credentialUrl: "",
                })
              }
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-background font-bold text-xs hover:brightness-110 shadow-lg shadow-primary/25 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Certification
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-5 rounded-3xl bg-[#0d1424] border border-white/10 flex items-center justify-between gap-4 shadow-xl"
              >
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white">{cert.title}</h3>
                  <p className="text-xs text-primary font-semibold">{cert.issuer}</p>
                  <p className="text-[11px] text-slate-400">Issued: {cert.issueDate}</p>
                </div>

                <div className="flex items-center gap-2">
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                      title="View Credential"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => openCertModal(cert)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCert(cert.id)}
                    className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EXPERIENCE MODAL */}
      {editingExp && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto p-6 sm:p-8 rounded-[32px] bg-[#0d1424] border border-white/15 shadow-2xl space-y-6 text-slate-100">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white">
                {editingExp.id === "new" ? "Add Work Experience" : `Edit "${editingExp.company}"`}
              </h3>
              <button
                onClick={() => setEditingExp(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveExp} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={editingExp.company || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary/60"
                    placeholder="Eagle Lion System Technologies"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Role / Job Title *</label>
                  <input
                    type="text"
                    required
                    value={editingExp.role || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary/60"
                    placeholder="Mobile Application Developer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Location</label>
                  <input
                    type="text"
                    value={editingExp.location || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary/60"
                    placeholder="Addis Ababa, Ethiopia"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Start Date</label>
                  <input
                    type="text"
                    value={editingExp.startDate || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, startDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary/60"
                    placeholder="Feb 2026"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">End Date</label>
                  <input
                    type="text"
                    disabled={editingExp.isCurrent}
                    value={editingExp.isCurrent ? "Present" : editingExp.endDate || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, endDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary/60 disabled:opacity-50"
                    placeholder="Present"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isCurrent"
                  checked={editingExp.isCurrent || false}
                  onChange={(e) => setEditingExp({ ...editingExp, isCurrent: e.target.checked })}
                  className="w-4 h-4 rounded text-primary bg-white/5 cursor-pointer"
                />
                <label htmlFor="isCurrent" className="text-xs font-bold text-slate-200 cursor-pointer">
                  I currently work in this role
                </label>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Role Overview / Summary</label>
                <textarea
                  rows={2}
                  value={editingExp.description || ""}
                  onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary/60 resize-none"
                  placeholder="Core mobile developer building production fintech apps..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">
                  Key Achievements (1 bullet point per line)
                </label>
                <textarea
                  rows={4}
                  value={expAchievementsText}
                  onChange={(e) => setExpAchievementsText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary/60 leading-relaxed"
                  placeholder="Implemented secure token auth supporting 150+ DAU&#10;Integrated 8+ financial APIs reducing latency by 30%"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={expTechStackText}
                  onChange={(e) => setExpTechStackText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary/60"
                  placeholder="React Native, TypeScript, Zustand, Token Auth, Financial APIs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingExp(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-background font-bold text-xs hover:brightness-110 shadow-lg shadow-primary/25 disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDUCATION MODAL */}
      {editingEdu && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-[32px] bg-[#0d1424] border border-white/15 shadow-2xl space-y-4 text-slate-100">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">
                {editingEdu.id === "new" ? "Add Education" : `Edit "${editingEdu.institution}"`}
              </h3>
              <button
                onClick={() => setEditingEdu(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdu} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">University / Institution *</label>
                <input
                  type="text"
                  required
                  value={editingEdu.institution || ""}
                  onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary/60"
                  placeholder="Unity University"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Degree *</label>
                  <input
                    type="text"
                    required
                    value={editingEdu.degree || ""}
                    onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary/60"
                    placeholder="Bachelor of Science"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Field of Study</label>
                  <input
                    type="text"
                    value={editingEdu.fieldOfStudy || ""}
                    onChange={(e) => setEditingEdu({ ...editingEdu, fieldOfStudy: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary/60"
                    placeholder="Computer Science"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Start Year</label>
                  <input
                    type="text"
                    value={editingEdu.startDate || ""}
                    onChange={(e) => setEditingEdu({ ...editingEdu, startDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary/60"
                    placeholder="2021"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">End Year</label>
                  <input
                    type="text"
                    value={editingEdu.endDate || ""}
                    onChange={(e) => setEditingEdu({ ...editingEdu, endDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary/60"
                    placeholder="2025"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Grade / Status</label>
                  <input
                    type="text"
                    value={editingEdu.grade || ""}
                    onChange={(e) => setEditingEdu({ ...editingEdu, grade: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary/60"
                    placeholder="Graduated"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Key Highlights / Activities (1 per line)</label>
                <textarea
                  rows={3}
                  value={eduActivitiesText}
                  onChange={(e) => setEduActivitiesText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary/60"
                  placeholder="Specialized in Mobile Architecture and Cryptography"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingEdu(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-background font-bold text-xs"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Education
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CERTIFICATION MODAL */}
      {editingCert && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-[32px] bg-[#0d1424] border border-white/15 shadow-2xl space-y-4 text-slate-100">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">
                {editingCert.id === "new" ? "Add Certification" : `Edit Certification`}
              </h3>
              <button
                onClick={() => setEditingCert(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCert} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Certification Name *</label>
                <input
                  type="text"
                  required
                  value={editingCert.title || ""}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary/60"
                  placeholder="Meta React Native Specialization"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Issuing Organization *</label>
                  <input
                    type="text"
                    required
                    value={editingCert.issuer || ""}
                    onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary/60"
                    placeholder="Coursera / Meta"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Issue Date</label>
                  <input
                    type="text"
                    value={editingCert.issueDate || ""}
                    onChange={(e) => setEditingCert({ ...editingCert, issueDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary/60"
                    placeholder="2024"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Verification URL</label>
                <input
                  type="url"
                  value={editingCert.credentialUrl || ""}
                  onChange={(e) => setEditingCert({ ...editingCert, credentialUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary/60"
                  placeholder="https://coursera.org/verify/..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingCert(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-background font-bold text-xs"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Certification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
