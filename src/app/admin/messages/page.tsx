"use client";

import { useState, useEffect } from "react";
import { ContactMessageData } from "@/types";
import { MessageSquare, Mail, Trash2, CheckCircle2, Reply, Clock, User, Check, Calendar } from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<ContactMessageData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contact-messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data || []);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkRead = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/contact-messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead: !currentStatus }),
      });
      if (res.ok) await fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this contact message permanently?")) return;
    try {
      const res = await fetch(`/api/contact-messages?id=${id}`, { method: "DELETE" });
      if (res.ok) await fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5" /> Inbound Inquiries CMS
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Contact Messages Inbox
          </h1>
          <p className="text-xs text-slate-400">
            Client proposals, recruiter messages, and freelance inquiries submitted via your public contact form.
          </p>
        </div>

        {unreadCount > 0 && (
          <div className="px-4 py-2 rounded-xl bg-primary/20 border border-primary/40 text-primary font-bold text-xs flex items-center gap-2 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            {unreadCount} Unread {unreadCount === 1 ? "Inquiry" : "Inquiries"}
          </div>
        )}
      </div>

      {messages.length === 0 ? (
        <div className="p-16 rounded-[32px] bg-[#0d1424] border border-white/10 text-center space-y-4 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-slate-400">
            <Mail className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white">Your inbox is clear</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            When recruiters, engineering leads, or startup founders message you through the contact form, their notes will arrive here with 1-click email response.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => {
            let timeStr = "";
            try {
              timeStr = formatDistanceToNow(typeof msg.createdAt === "string" ? parseISO(msg.createdAt) : new Date(msg.createdAt), { addSuffix: true });
            } catch {
              timeStr = "Recently";
            }

            return (
              <div
                key={msg.id}
                className={`p-6 sm:p-7 rounded-[32px] border transition-all space-y-4 shadow-xl ${
                  msg.isRead
                    ? "bg-[#0d1424]/80 border-white/10"
                    : "bg-[#0f172a] border-primary/40 ring-1 ring-primary/20"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary/80 to-primary text-background flex items-center justify-center font-black text-sm shadow-md">
                      {msg.name ? msg.name[0].toUpperCase() : "U"}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        {msg.name}
                        {!msg.isRead && (
                          <span className="px-2 py-0.5 rounded-full bg-primary text-background text-[10px] font-black uppercase tracking-wider">
                            NEW
                          </span>
                        )}
                      </h3>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-xs text-primary hover:underline font-medium"
                      >
                        {msg.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400 self-end sm:self-auto">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" /> {timeStr}
                    </span>
                  </div>
                </div>

                {/* Subject & Message Content */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Subject: <strong className="text-slate-200 font-semibold">{msg.subject || "General Inquiry"}</strong>
                  </span>
                  <div className="p-4 rounded-2xl bg-black/20 border border-white/5 text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.message}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || "Your message to Dagm Ayalew")}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-background font-bold text-xs hover:brightness-110 shadow-lg shadow-primary/25 transition-all"
                  >
                    <Reply className="w-3.5 h-3.5" /> Reply to {msg.name}
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleMarkRead(msg.id, msg.isRead)}
                      className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                      {msg.isRead ? "Mark as Unread" : "Mark as Read"}
                    </button>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
