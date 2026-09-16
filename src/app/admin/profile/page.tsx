"use client";

import { useState, useEffect } from "react";
import { ProfileData } from "@/types";
import { DEFAULT_PROFILE } from "@/lib/constants";
import {
  User,
  Save,
  Loader2,
  Check,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Radio,
  Phone,
  Briefcase,
  AlertCircle,
  FileText,
} from "lucide-react";

export default function ProfileAdminPage() {
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // Fetch initial profile
    fetch("/api/profile")
      .then((res) => (res.ok ? res.json() : DEFAULT_PROFILE))
      .then((data) => setProfile(data))
      .catch(() => setProfile(DEFAULT_PROFILE));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      } else {
        setErrorMsg(data.error || "Failed to update profile");
      }
    } catch (err) {
      console.error("Failed to update profile:", err);
      setErrorMsg("Network error saving profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <User className="w-3.5 h-3.5" /> Identity & Bio
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Profile & Social Channels
          </h1>
          <p className="text-xs text-slate-400">
            Edit your developer bio, contact channels, LinkedIn sync link, and live status message.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-background font-bold text-xs hover:brightness-110 shadow-lg shadow-primary/25 transition-all disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Updating...
            </>
          ) : savedSuccess ? (
            <>
              <Check className="w-4 h-4" />
              Saved Successfully!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Profile Changes
            </>
          )}
        </button>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Core Bio & Title */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0d1424] border border-white/10 shadow-xl space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" /> Basic Information & Hero Headline
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Full Name</label>
              <input
                type="text"
                required
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Professional Title</label>
              <input
                type="text"
                required
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Hero Tagline / Pitch</label>
            <input
              type="text"
              required
              value={profile.tagline}
              onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">About Me / Summary (Rendered on CV & Profile)</label>
            <textarea
              rows={4}
              value={profile.aboutMe}
              onChange={(e) => setProfile({ ...profile, aboutMe: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary resize-none"
            />
          </div>
        </div>

        {/* Section 2: Live Status & Availability */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0d1424] border border-white/10 shadow-xl space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Radio className="w-4 h-4 text-primary" /> Live Day-to-Day Status & Availability
          </h3>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Current Status Message (Shown in Live Pulse Widget)</label>
            <input
              type="text"
              value={profile.statusMessage}
              onChange={(e) => setProfile({ ...profile, statusMessage: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary"
              placeholder="e.g. Senior Mobile Developer at Eaglelion | Building React Native & FinTech apps"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="isOpenToWork"
              checked={profile.isOpenToWork}
              onChange={(e) => setProfile({ ...profile, isOpenToWork: e.target.checked })}
              className="w-4 h-4 rounded text-primary focus:ring-primary bg-white/5 border-white/10"
            />
            <label htmlFor="isOpenToWork" className="text-xs font-semibold text-slate-200 cursor-pointer">
              Mark as &quot;Open to Work / Available for Contracts&quot; (shows glowing badge on homepage)
            </label>
          </div>
        </div>

        {/* Section 3: Social & Contact Links */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0d1424] border border-white/10 shadow-xl space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-primary" /> Contact & Social Integrations
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-primary" /> Email Address
              </label>
              <input
                type="email"
                required
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-primary" /> Phone Number
              </label>
              <input
                type="text"
                value={profile.phone || ""}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-primary" /> LinkedIn URL
              </label>
              <input
                type="url"
                value={profile.linkedinUrl || ""}
                onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary"
                placeholder="https://linkedin.com/in/dagmay-ayalew"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-primary" /> GitHub Profile URL
              </label>
              <input
                type="url"
                value={profile.githubUrl || ""}
                onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary"
                placeholder="https://github.com/dagmayalew"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" /> Location / Availability
              </label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Twitter className="w-3.5 h-3.5 text-primary" /> Twitter / X Profile URL
              </label>
              <input
                type="url"
                value={profile.twitterUrl || ""}
                onChange={(e) => setProfile({ ...profile, twitterUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-primary" /> External PDF Resume Link (Optional)
              </label>
              <input
                type="text"
                value={profile.resumeUrl || ""}
                onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary"
                placeholder="e.g. /cv or https://drive.google.com/... (Defaults to dynamic 1-click ATS PDF generator)"
              />
              <p className="text-[11px] text-slate-400">
                Leave empty or set to <code className="text-primary font-mono">/cv</code> to use the interactive dynamic ATS CV generator. You can also paste a direct link to a hosted PDF.
              </p>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
