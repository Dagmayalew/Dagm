"use client";

import { useState, useEffect } from "react";
import { LifeUpdateData } from "@/types";
import { DEFAULT_LIFE_UPDATES } from "@/lib/constants";
import { Clock, Plus, Trash2, Send, Loader2, Calendar } from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function LifeFeedAdminPage() {
  const [updates, setUpdates] = useState<LifeUpdateData[]>(DEFAULT_LIFE_UPDATES);
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<LifeUpdateData["tag"]>("BUILDING");
  const [emoji, setEmoji] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUpdates = async () => {
    try {
      const res = await fetch("/api/life-updates");
      if (res.ok) {
        const data = await res.json();
        setUpdates(data || DEFAULT_LIFE_UPDATES);
      }
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/life-updates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, tag, emoji }),
      });

      if (res.ok) {
        setContent("");
        await fetchUpdates();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this life log entry?")) return;
    try {
      const res = await fetch(`/api/life-updates?id=${id}`, { method: "DELETE" });
      if (res.ok) await fetchUpdates();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2">
          <Clock className="w-3.5 h-3.5" /> Day-to-Day Log CMS
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Life Feed & Micro-Updates (/now)
        </h1>
        <p className="text-xs text-slate-400">
          Post what you&apos;re currently experimenting with, reading, or building. Shown live on your /now page and portfolio pulse widget.
        </p>
      </div>

      {/* Create New Micro-post */}
      <div className="p-6 sm:p-8 rounded-[32px] bg-[#0d1424] border border-white/10 shadow-xl space-y-5">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Send className="w-4 h-4 text-primary" /> Post New Real-Time Status / Micro-Blog
        </h3>

        <form onSubmit={handleCreate} className="space-y-4">
          <textarea
            required
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-primary/60 resize-none leading-relaxed"
            placeholder="e.g. Exploring react-native-quick-sqlite performance benchmarks against Realm DB for offline financial transaction caching..."
          />

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Category Tag Selector */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400">Tag</label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value as LifeUpdateData["tag"])}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs outline-none"
                >
                  <option value="BUILDING">BUILDING</option>
                  <option value="LEARNING">LEARNING</option>
                  <option value="READING">READING</option>
                  <option value="MILESTONE">MILESTONE</option>
                  <option value="LIFE">LIFE</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-background font-bold text-xs hover:brightness-110 shadow-lg shadow-primary/25 disabled:opacity-50 transition-all self-end"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Publish to /now Feed
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" /> Published Updates History ({updates.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {updates.map((up) => {
            let relativeTime = "";
            try {
              relativeTime = formatDistanceToNow(typeof up.createdAt === "string" ? parseISO(up.createdAt) : new Date(up.createdAt), { addSuffix: true });
            } catch {
              relativeTime = "Recently";
            }

            return (
              <div
                key={up.id}
                className="p-5 rounded-3xl bg-[#0d1424] border border-white/10 space-y-3 flex flex-col justify-between shadow-xl hover:border-white/20 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {up.emoji && <span className="text-lg">{up.emoji}</span>}
                      <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                        {up.tag}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" /> {relativeTime}
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {up.content}
                  </p>
                </div>

                <div className="flex justify-end pt-2 border-t border-white/5">
                  <button
                    onClick={() => handleDelete(up.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Delete Update"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
