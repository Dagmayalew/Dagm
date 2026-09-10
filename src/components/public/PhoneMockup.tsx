"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { PhoneMockupSettings } from "@/types";
import {
  Wifi,
  Signal,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownLeft,
  QrCode,
  CreditCard,
  Building2,
  ShoppingBag,
  Navigation,
  Smartphone,
  Fingerprint,
  Zap,
  Receipt,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PhoneMockupProps {
  className?: string;
  customSettings?: PhoneMockupSettings;
}

const FRAME_GRADIENTS: Record<string, string> = {
  "titanium-dark": "from-[#3a4454] via-[#1f2937] to-[#111827]",
  "titanium-natural": "from-[#78716c] via-[#44403c] to-[#1c1917]",
  "midnight-black": "from-[#18181b] via-[#09090b] to-[#000000]",
  "emerald-glow": "from-[#065f46] via-[#064e3b] to-[#022c22]",
};

function normalizeApp(app?: string): "dashen" | "ethiopost" | "order" {
  if (app === "banking" || app === "dashen") return "dashen";
  if (app === "crypto" || app === "ethiopost") return "ethiopost";
  if (app === "delivery" || app === "order") return "order";
  return "dashen";
}

export function PhoneMockup({ className, customSettings }: PhoneMockupProps) {
  const { settings } = useTheme();
  const cfg = customSettings || settings.phoneMockupSettings || {};

  const [activeApp, setActiveApp] = useState<"dashen" | "ethiopost" | "order">(() =>
    normalizeApp(cfg.defaultApp)
  );
  const [activeBottomTab, setActiveBottomTab] = useState<"app" | "cards" | "history">("app");
  const [currentTime, setCurrentTime] = useState("20:14");

  // Keep activeApp updated if customSettings changes
  useEffect(() => {
    if (cfg.defaultApp) {
      setActiveApp(normalizeApp(cfg.defaultApp));
    }
  }, [cfg.defaultApp]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  const frameClass =
    FRAME_GRADIENTS[cfg.frameStyle || "titanium-dark"] ||
    FRAME_GRADIENTS["titanium-dark"];

  return (
    <div className={cn("relative mx-auto select-none", className)}>
      {/* Ambient Backlight Glow */}
      <div className="absolute -inset-3 bg-primary/15 rounded-[56px] blur-2xl opacity-60 -z-10 pointer-events-none" />

      {/* iPhone 16 Pro Hardware Chassis */}
      <div
        className={cn(
          "relative w-[295px] sm:w-[330px] h-[610px] sm:h-[640px] rounded-[50px] bg-gradient-to-b p-[9px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-white/15",
          frameClass
        )}
      >
        {/* Physical Hardware Buttons */}
        {/* Action Button */}
        <div className="absolute -left-[3.5px] top-[95px] w-[3.5px] h-[24px] bg-[#475569] rounded-l-sm" />
        {/* Volume Up */}
        <div className="absolute -left-[3.5px] top-[132px] w-[3.5px] h-[46px] bg-[#475569] rounded-l-sm" />
        {/* Volume Down */}
        <div className="absolute -left-[3.5px] top-[188px] w-[3.5px] h-[46px] bg-[#475569] rounded-l-sm" />
        {/* Power Button */}
        <div className="absolute -right-[3.5px] top-[148px] w-[3.5px] h-[58px] bg-[#475569] rounded-r-sm" />

        {/* OLED Screen Inner Frame */}
        <div className="relative w-full h-full bg-[#070b14] rounded-[41px] overflow-hidden flex flex-col border border-black/80 shadow-[inset_0_0_12px_rgba(0,0,0,0.9)]">
          {/* Top Speaker Slit */}
          <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-10 h-[3px] bg-[#1e293b] rounded-full z-40" />

          {/* 1. iOS Status Bar & Dynamic Island */}
          <div className="pt-2.5 px-5 flex items-center justify-between z-40 text-[10px] text-slate-200 font-semibold shrink-0">
            <span className="font-mono tracking-tight text-[11px]">{currentTime}</span>

            {/* Dynamic Island Capsule */}
            <div className="bg-black rounded-full flex items-center justify-between px-2.5 h-[22px] w-[105px] border border-white/10 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-[#0a0f18] border border-white/10 shrink-0" />
              <span className="text-[8px] text-slate-200 font-medium truncate px-1">
                {activeApp === "dashen" ? "Dashen Super App" : activeApp === "ethiopost" ? "Ethio Post" : "Order ET"}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-primary/80 shrink-0" />
            </div>

            {/* Status Icons */}
            <div className="flex items-center gap-1.5 text-slate-300">
              <Signal className="w-2.5 h-2.5 fill-current" />
              <Wifi className="w-2.5 h-2.5" />
              <div className="w-4 h-2 rounded-[2px] border border-slate-300 p-[1px] flex items-center">
                <div className="w-2.5 h-full bg-primary rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* 2. Top Interactive App Switcher Segment */}
          <div className="px-3 pt-2 pb-1.5 flex items-center justify-center gap-1 z-20 shrink-0 border-b border-white/5 bg-[#070b14]/90 backdrop-blur-md">
            {[
              { id: "dashen", label: "Dashen Bank", icon: CreditCard },
              { id: "ethiopost", label: "Ethio Post", icon: Building2 },
              { id: "order", label: "Order Ethiopia", icon: ShoppingBag },
            ].map((app) => {
              const Icon = app.icon;
              const isActive = activeApp === app.id;
              return (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => setActiveApp(app.id as typeof activeApp)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded-full text-[9px] font-semibold transition-all cursor-pointer",
                    isActive
                      ? "bg-primary text-background font-bold shadow-md shadow-primary/20"
                      : "bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]"
                  )}
                >
                  <Icon className="w-2.5 h-2.5" />
                  <span className="truncate">{app.label}</span>
                </button>
              );
            })}
          </div>

          {/* 3. Main In-App Scrollable Body */}
          <div className="flex-1 px-3 py-2.5 overflow-y-auto no-scrollbar space-y-3">
            {/* APP 1: DASHEN BANK SUPER APP */}
            {activeApp === "dashen" && (
              <div className="space-y-3 animate-fade-in">
                {/* User Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary text-background flex items-center justify-center font-black text-[10px] shadow-sm">
                      DA
                    </div>
                    <div>
                      <p className="text-[8px] text-slate-400">Dashen Bank</p>
                      <p className="text-[11px] font-bold text-white leading-none">Dagm Ayalew</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[8px] font-bold">
                    {cfg.bankingKycBadge || "Fayda Verified"}
                  </span>
                </div>

                {/* Platinum Debit Card */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#0d2238] via-[#091524] to-[#040a12] border border-primary/30 shadow-lg space-y-2.5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none" />

                  <div className="flex items-start justify-between relative z-10">
                    <div>
                      <span className="text-[8px] text-slate-400 uppercase font-medium tracking-wider">
                        Available Balance
                      </span>
                      <h4 className="text-lg font-black text-white tracking-tight mt-0.5">
                        {cfg.bankingBalance || "248,500.00"}{" "}
                        <span className="text-[10px] text-primary font-bold">
                          {cfg.bankingCurrency || "ETB"}
                        </span>
                      </h4>
                    </div>
                    <div className="w-6 h-6 rounded-lg bg-primary/20 text-primary border border-primary/40 flex items-center justify-center">
                      <Zap className="w-3.5 h-3.5 fill-primary" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono pt-1 relative z-10">
                    <span className="tracking-widest text-slate-300">•••• 8828</span>
                    <span className="text-[8px] text-primary font-sans font-bold">1M+ Downloads</span>
                  </div>
                </div>

                {/* Quick Action Grid */}
                <div className="grid grid-cols-4 gap-1.5 text-center">
                  {[
                    { label: "Transfer", icon: ArrowUpRight },
                    { label: "Pay QR", icon: QrCode },
                    { label: "Utilities", icon: Zap },
                    { label: "Fayda KYC", icon: Fingerprint },
                  ].map((act, idx) => {
                    const Icon = act.icon;
                    return (
                      <div
                        key={idx}
                        className="p-2 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary/40 transition-colors space-y-1 cursor-pointer"
                      >
                        <div className="w-6 h-6 rounded-lg mx-auto bg-primary/15 text-primary flex items-center justify-center">
                          <Icon className="w-3 h-3" />
                        </div>
                        <span className="text-[8px] text-slate-200 block truncate font-medium">
                          {act.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Recent Transactions List */}
                <div className="space-y-1.5 pt-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                      Recent Activity
                    </span>
                    <span className="text-[8px] text-primary font-semibold">View All</span>
                  </div>

                  {[
                    { title: "Telecom Airtime", time: "Today, 14:20", amount: "-150.00 ETB", isCredit: false },
                    { title: "Merchant Payment", time: "Yesterday", amount: "-420.00 ETB", isCredit: false },
                    { title: "Salary Settlement", time: "28 Aug", amount: "+45,000.00 ETB", isCredit: true },
                  ].map((tx, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded-lg flex items-center justify-center ${
                            tx.isCredit
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-white/5 text-slate-300"
                          }`}
                        >
                          {tx.isCredit ? (
                            <ArrowDownLeft className="w-3 h-3" />
                          ) : (
                            <ArrowUpRight className="w-3 h-3" />
                          )}
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-white leading-tight">{tx.title}</p>
                          <p className="text-[7px] text-slate-500">{tx.time}</p>
                        </div>
                      </div>
                      <span
                        className={`text-[9px] font-mono font-bold ${
                          tx.isCredit ? "text-emerald-400" : "text-slate-200"
                        }`}
                      >
                        {tx.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* APP 2: ETHIO POST AGENT BANKING */}
            {activeApp === "ethiopost" && (
              <div className="space-y-3 animate-fade-in">
                {/* Agent Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-[10px]">
                      EP
                    </div>
                    <div>
                      <p className="text-[8px] text-slate-400">Postal Agent</p>
                      <p className="text-[11px] font-bold text-white leading-none">Agent #048</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[8px] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-2.5 h-2.5" /> Biometric
                  </span>
                </div>

                {/* Agent Shift Flow Card */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#241a09] via-[#160f04] to-[#0a0702] border border-amber-500/30 shadow-lg space-y-2 relative overflow-hidden">
                  <span className="text-[8px] font-bold uppercase tracking-wider text-amber-400">
                    Agent Shift Vault
                  </span>
                  <div className="flex items-baseline justify-between">
                    <h4 className="text-lg font-black text-white tracking-tight">
                      48,200.00 <span className="text-[10px] text-amber-400">ETB</span>
                    </h4>
                    <span className="text-[8px] text-slate-400 font-medium">14 Operations</span>
                  </div>
                </div>

                {/* Operations Tiles */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Cash In (Deposit)", desc: "Customer Account", icon: ArrowDownLeft },
                    { label: "Cash Out", desc: "PIN / Biometric", icon: ArrowUpRight },
                    { label: "Utility Bills", desc: "Water & Electric", icon: Receipt },
                    { label: "Agent KYC", desc: "Identity Check", icon: Fingerprint },
                  ].map((srv, idx) => {
                    const Icon = srv.icon;
                    return (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-amber-500/30 transition-colors space-y-1 cursor-pointer"
                      >
                        <div className="flex items-center gap-1.5 text-amber-400">
                          <Icon className="w-3.5 h-3.5" />
                          <span className="text-[9px] font-bold text-white leading-tight">{srv.label}</span>
                        </div>
                        <p className="text-[7px] text-slate-400 pl-5">{srv.desc}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Agent Activity Logs */}
                <div className="space-y-1.5 pt-0.5">
                  <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                    Branch Logs
                  </span>
                  {[
                    { title: "Cash Deposit #8841", time: "10:42", amount: "+1,200.00 ETB" },
                    { title: "Withdrawal #8840", time: "09:15", amount: "-500.00 ETB" },
                  ].map((log, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-[9px] font-bold text-white">{log.title}</p>
                        <p className="text-[7px] text-slate-500">{log.time}</p>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-amber-400">{log.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* APP 3: ORDER ETHIOPIA */}
            {activeApp === "order" && (
              <div className="space-y-3 animate-fade-in">
                {/* Live Delivery Route Card */}
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#0b1d33] via-[#061221] to-[#030912] border border-cyan-500/30 space-y-2 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-cyan-400 text-[9px] font-bold">
                      <Navigation className="w-3 h-3" />
                      Gebeta Maps GPS
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 border border-cyan-400/30 text-cyan-300 text-[8px] font-bold">
                      {cfg.deliveryEta || "ETA 8 MIN"}
                    </span>
                  </div>

                  <p className="text-[9px] text-slate-200 font-medium truncate">
                    {cfg.deliveryRoute || "Bole Medhanialem → Kazanchis"}
                  </p>

                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full w-[70%] rounded-full" />
                  </div>
                </div>

                {/* Catalog Feed */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                      Merchant Catalog
                    </span>
                    <span className="text-[8px] text-cyan-400 font-semibold">Discovery</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: "Coffee & Pastry", price: "280 ETB", store: "Tomoca Coffee" },
                      { name: "Electronics POS", price: "3,400 ETB", store: "Bole Tech Hub" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 transition-colors space-y-1"
                      >
                        <div className="h-7 rounded-lg bg-white/5 flex items-center justify-center text-cyan-400">
                          <Store className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-[9px] font-bold text-white truncate">{item.name}</p>
                        <div className="flex items-center justify-between pt-0.5">
                          <p className="text-[8px] font-mono text-primary font-bold">{item.price}</p>
                          <span className="w-4 h-4 rounded bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">
                            +
                          </span>
                        </div>
                        <p className="text-[7px] text-slate-500 truncate">{item.store}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 4. Pinned In-App Bottom Tab Bar */}
          <div className="px-4 py-2 border-t border-white/10 bg-[#090e1a]/95 backdrop-blur-md flex items-center justify-around text-slate-400 shrink-0 z-30">
            <button
              type="button"
              onClick={() => setActiveBottomTab("app")}
              className={cn(
                "flex flex-col items-center gap-0.5 cursor-pointer transition-colors",
                activeBottomTab === "app" ? "text-primary" : "text-slate-500 hover:text-slate-300"
              )}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="text-[7.5px] font-bold">Home</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveBottomTab("cards")}
              className={cn(
                "flex flex-col items-center gap-0.5 cursor-pointer transition-colors",
                activeBottomTab === "cards" ? "text-primary" : "text-slate-500 hover:text-slate-300"
              )}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span className="text-[7.5px] font-bold">Cards</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveBottomTab("history")}
              className={cn(
                "flex flex-col items-center gap-0.5 cursor-pointer transition-colors",
                activeBottomTab === "history" ? "text-primary" : "text-slate-500 hover:text-slate-300"
              )}
            >
              <Receipt className="w-3.5 h-3.5" />
              <span className="text-[7.5px] font-bold">Activity</span>
            </button>
          </div>

          {/* 5. Pinned iOS Home Indicator Bar */}
          <div className="pb-2 pt-1 flex justify-center bg-[#090e1a] shrink-0 z-30">
            <div className="w-24 h-[3px] bg-slate-400/60 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
