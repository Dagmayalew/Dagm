"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ProjectData } from "@/types";
import { DEFAULT_PROJECTS } from "@/lib/constants";
import {
  Smartphone,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Save,
  Loader2,
  X,
  Star,
  Layers,
  Image as ImageIcon,
  Check,
  Zap,
  Download,
  Play,
  Github,
  Info,
} from "lucide-react";

const IMAGE_PRESETS = [
  {
    label: "FinTech / Super App",
    url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Agent Banking / Crypto",
    url: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "E-Commerce / Map Delivery",
    url: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Digital Wallet / Freelance",
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "High-Concurrency Backend",
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Mobile Education / Offline",
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [editing, setEditing] = useState<Partial<ProjectData> | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [screenshotsText, setScreenshotsText] = useState("");
  const [metricsDownloads, setMetricsDownloads] = useState("");
  const [metricsRating, setMetricsRating] = useState("");
  const [metricsActive, setMetricsActive] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      } else {
        setProjects(DEFAULT_PROJECTS);
      }
    } catch {
      setProjects(DEFAULT_PROJECTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openEditModal = (proj: Partial<ProjectData>) => {
    setEditing(proj);
    setScreenshotsText(proj.screenshots ? proj.screenshots.join("\n") : "");
    setMetricsDownloads(proj.keyMetrics?.downloads || "");
    setMetricsRating(proj.keyMetrics?.rating || "");
    setMetricsActive(proj.keyMetrics?.activeUsers || "");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.title || !editing?.slug) return;
    setSaving(true);
    try {
      const cleanScreenshots = screenshotsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      const keyMetrics = {
        ...(metricsDownloads ? { downloads: metricsDownloads } : {}),
        ...(metricsRating ? { rating: metricsRating } : {}),
        ...(metricsActive ? { activeUsers: metricsActive } : {}),
      };

      const payload = {
        ...editing,
        title: editing.title,
        slug: editing.slug,
        screenshots: cleanScreenshots,
        keyMetrics,
        techStack:
          typeof editing.techStack === "string"
            ? (editing.techStack as string).split(",").map((s) => s.trim()).filter(Boolean)
            : editing.techStack || [],
      };

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setEditing(null);
        await fetchProjects();
      }
    } catch (err) {
      console.error("Failed to save project:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchProjects();
      }
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Smartphone className="w-3.5 h-3.5" /> Mobile Project CMS
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Mobile Apps & Case Studies
          </h1>
          <p className="text-xs text-slate-400">
            Manage your mobile app catalog, high-resolution thumbnail images, engineering case studies, and store links.
          </p>
        </div>

        <button
          onClick={() =>
            openEditModal({
              id: "new",
              title: "",
              slug: "",
              summary: "",
              description: "",
              platform: "React Native / FinTech / Banking",
              thumbnail: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
              featured: true,
              techStack: ["React Native", "TypeScript", "secp256k1", "AES", "Quick-SQLite", "Zustand"],
              screenshots: [],
            })
          }
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-background font-bold text-xs hover:brightness-110 shadow-lg shadow-primary/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add New Mobile App
        </button>
      </div>

      {/* Editor Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="w-full max-w-3xl max-h-[92vh] overflow-y-auto p-6 sm:p-8 rounded-[32px] bg-[#0d1424] border border-white/15 shadow-2xl space-y-6 text-slate-100">
            
            {/* Modal Top Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {editing.id === "new" ? "Create New Mobile Application" : `Edit "${editing.title}"`}
                </h3>
                <p className="text-xs text-slate-400">
                  Configure thumbnail cover, case study architecture, metrics, and store links.
                </p>
              </div>
              <button
                onClick={() => setEditing(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              
              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">App Title *</label>
                  <input
                    type="text"
                    required
                    value={editing.title || ""}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        title: e.target.value,
                        slug: editing.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-primary/60 outline-none"
                    placeholder="Dashen Bank Super App"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Slug (URL identifier) *</label>
                  <input
                    type="text"
                    required
                    value={editing.slug || ""}
                    onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-primary/60 outline-none"
                    placeholder="dashen-bank-super-app"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Platform & Category Badge</label>
                <input
                  type="text"
                  value={editing.platform || ""}
                  onChange={(e) => setEditing({ ...editing, platform: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-primary/60 outline-none"
                  placeholder="React Native / FinTech / Banking"
                />
              </div>

              {/* Short Summary */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Short Summary (Card Preview)</label>
                <input
                  type="text"
                  value={editing.summary || ""}
                  onChange={(e) => setEditing({ ...editing, summary: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-primary/60 outline-none"
                  placeholder="High-security banking super app with elliptic curve cryptography and Fayda KYC."
                />
              </div>

              {/* Thumbnail Image Section with Live Preview & Presets */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-primary" /> Thumbnail Cover Image
                  </label>
                  <span className="text-[10px] text-slate-400">Direct Image URL (Unsplash, Cloudinary, Imgur, S3)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-8 space-y-2">
                    <input
                      type="url"
                      required
                      value={editing.thumbnail || ""}
                      onChange={(e) => setEditing({ ...editing, thumbnail: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-primary/60 outline-none"
                      placeholder="https://images.unsplash.com/photo-..."
                    />
                    
                    {/* Quick Image Presets */}
                    <div className="space-y-1">
                      <p className="text-[11px] font-semibold text-slate-400">1-Click High-Quality Presets:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {IMAGE_PRESETS.map((preset) => (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => setEditing({ ...editing, thumbnail: preset.url })}
                            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary border border-white/10 text-[10px] font-medium text-slate-300 transition-colors"
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail Live Preview */}
                  <div className="sm:col-span-4 relative h-28 rounded-xl overflow-hidden bg-slate-900 border border-white/15">
                    {editing.thumbnail ? (
                      <Image
                        src={editing.thumbnail}
                        alt="Thumbnail preview"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-slate-600 text-[10px]">
                        No image provided
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Full Case Study & Technical Architecture */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-primary" /> Engineering Case Study & Architecture Details
                  </label>
                  <span className="text-[10px] text-slate-400">Shown in full-screen deep-dive modal</span>
                </div>
                <textarea
                  rows={6}
                  value={editing.description || ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-primary/60 outline-none leading-relaxed"
                  placeholder="Detail the problem, architecture, cryptographic algorithms (e.g. secp256k1, AES), state management (Zustand, TanStack Query), offline sync (Quick-SQLite), and performance results..."
                />
              </div>

              {/* Key Metrics Stats */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-amber-400" /> Key Project Metrics & Performance
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400">Deployment / Scale</span>
                    <input
                      type="text"
                      value={metricsDownloads}
                      onChange={(e) => setMetricsDownloads(e.target.value)}
                      placeholder="e.g. Production / 150+ DAU"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary/60"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400">App Score / Rating</span>
                    <input
                      type="text"
                      value={metricsRating}
                      onChange={(e) => setMetricsRating(e.target.value)}
                      placeholder="e.g. Eaglelion System Tech"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary/60"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400">UX Scope / Concurrency</span>
                    <input
                      type="text"
                      value={metricsActive}
                      onChange={(e) => setMetricsActive(e.target.value)}
                      placeholder="e.g. 60 FPS UX / Sub-100ms"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary/60"
                    />
                  </div>
                </div>
              </div>

              {/* Screenshots Gallery URLs */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Screenshots Gallery (1 URL per line)
                </label>
                <textarea
                  rows={3}
                  value={screenshotsText}
                  onChange={(e) => setScreenshotsText(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&#10;https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono outline-none focus:border-primary/60 resize-none"
                />
              </div>

              {/* Tech Stack */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Technologies & Frameworks (comma separated)
                </label>
                <input
                  type="text"
                  value={Array.isArray(editing.techStack) ? editing.techStack.join(", ") : editing.techStack || ""}
                  onChange={(e) => setEditing({ ...editing, techStack: e.target.value as unknown as string[] })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-primary/60 outline-none"
                  placeholder="React Native, TypeScript, secp256k1, AES, Quick-SQLite, Zustand, Lottie"
                />
              </div>

              {/* Links Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Apple App Store Link</label>
                  <input
                    type="url"
                    value={editing.appStoreUrl || ""}
                    onChange={(e) => setEditing({ ...editing, appStoreUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none"
                    placeholder="https://apps.apple.com/app/..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Google Play Store Link</label>
                  <input
                    type="url"
                    value={editing.playStoreUrl || ""}
                    onChange={(e) => setEditing({ ...editing, playStoreUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none"
                    placeholder="https://play.google.com/store/apps/..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">GitHub Repository Link</label>
                  <input
                    type="url"
                    value={editing.githubUrl || ""}
                    onChange={(e) => setEditing({ ...editing, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none"
                    placeholder="https://github.com/dagmayalew/..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Live Demo / Web Portal Link</label>
                  <input
                    type="url"
                    value={editing.liveDemoUrl || ""}
                    onChange={(e) => setEditing({ ...editing, liveDemoUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none"
                    placeholder="https://www.dagmayalew.online"
                  />
                </div>
              </div>

              {/* Feature on Homepage Toggle */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={editing.featured || false}
                  onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-primary bg-white/5 cursor-pointer"
                />
                <label htmlFor="featured" className="text-xs font-bold text-slate-200 cursor-pointer">
                  Feature on Homepage Showcase (Top of Portfolio)
                </label>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-background text-xs font-bold hover:brightness-110 shadow-lg shadow-primary/25 disabled:opacity-50 transition-all"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving Project...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Application
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects List View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="p-5 rounded-3xl bg-[#0d1424] border border-white/10 space-y-4 flex flex-col justify-between shadow-xl hover:border-white/20 transition-all"
          >
            <div className="space-y-3">
              {/* Thumbnail thumbnail header */}
              <div className="relative h-36 rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
                <Image
                  src={proj.thumbnail || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"}
                  alt={proj.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/70 text-[10px] font-bold text-white border border-white/20 backdrop-blur-md">
                  {proj.platform}
                </div>
                {proj.featured && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-primary/20 border border-primary/40 text-[10px] font-bold text-primary backdrop-blur-md flex items-center gap-1">
                    <Star className="w-3 h-3 fill-primary" /> Featured
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{proj.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {proj.summary}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <button
                onClick={() => openEditModal(proj)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5 text-primary" /> Edit & Case Study
              </button>
              <button
                onClick={() => handleDelete(proj.id)}
                className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                title="Delete Project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
