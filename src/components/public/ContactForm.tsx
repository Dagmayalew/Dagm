"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2, Mail, MessageSquare, User } from "lucide-react";
import { ProfileData } from "@/types";

export function ContactForm({
  profile,
  title,
  subtitle,
}: {
  profile: ProfileData;
  title?: string;
  subtitle?: string;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ success: true, message: data.message });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ success: false, message: data.error || "Failed to send message." });
      }
    } catch (err) {
      setStatus({
        success: false,
        message: "Failed to send message. Please email directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 relative scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Card Box */}
        <div className="p-6 sm:p-10 rounded-2xl bg-[#0c1220] border border-white/10 shadow-lg relative">
          
          <div className="space-y-2 mb-8 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <Send className="w-3.5 h-3.5" /> Direct Contact
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              {title || "Get In Touch"}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              {subtitle || "Interested in discussing a mobile engineering project, senior role, or technical collaboration? Send a message below or reach out directly at "}
              <a href={`mailto:${profile.email}`} className="text-primary hover:underline font-medium">
                {profile.email}
              </a>.
            </p>
          </div>

          {status?.success ? (
            <div className="p-6 rounded-xl bg-primary/10 border border-primary/30 text-center space-y-2.5 animate-fade-in">
              <div className="w-10 h-10 rounded-full bg-primary text-background flex items-center justify-center mx-auto font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Message Delivered</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Thank you for reaching out. I will get back to your inbox as soon as possible.
              </p>
              <button
                onClick={() => setStatus(null)}
                className="mt-2 px-3.5 py-1.5 rounded-lg bg-white/10 text-xs font-semibold text-white hover:bg-white/20"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-primary" /> Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary text-xs transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-primary" /> Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary text-xs transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mobile Engineering Role / Contract Project"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary text-xs transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-primary" /> Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Briefly describe your project requirements, timeline, or role..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary text-xs transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-primary text-background font-bold text-xs hover:brightness-110 shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
