"use client";

import { useState, useEffect } from "react";
import { useTheme, PRESET_COLORS } from "@/components/theme/ThemeProvider";
import { PhoneMockup } from "@/components/public/PhoneMockup";
import {
  ThemeSettings,
  AccentPreset,
  BackgroundPattern,
  GlassIntensity,
  BorderRadiusSize,
  FontFamilyChoice,
  GlowIntensity,
  PhoneMockupSettings,
} from "@/types";
import {
  Palette,
  Check,
  Save,
  Loader2,
  AlertCircle,
  Sun,
  Moon,
  Layers,
  Smartphone,
  RotateCcw,
  Sliders,
  Eye,
  Zap,
  Grid,
  CircleDot,
  Brush,
  CreditCard,
  Building2,
  Navigation,
  Lock,
  Fingerprint,
  Monitor,
} from "lucide-react";

const THEME_PACKS: {
  id: string;
  name: string;
  description: string;
  badge: string;
  settings: Partial<ThemeSettings>;
}[] = [
  {
    id: "fintech-emerald",
    name: "FinTech Emerald",
    description: "Modern banking & mobile native aesthetic with smooth grid overlays.",
    badge: "Recommended",
    settings: {
      preset: "emerald",
      accentColor: "emerald",
      customPrimaryColor: "#10b981",
      customSecondaryColor: "#06b6d4",
      mode: "dark",
      glassmorphism: true,
      glassIntensity: "medium",
      borderRadius: "lg",
      fontFamily: "sans",
      backgroundPattern: "grid",
      glowIntensity: "vibrant",
      showPhoneMockup: true,
      showLiveStatusBadge: true,
      enableAnimations: true,
      heroHeadlineStyle: "gradient",
    },
  },
  {
    id: "cyber-cyan",
    name: "React Native Cyber",
    description: "High-tech neon cyan with dot matrix background and ultra-frosted cards.",
    badge: "High Tech",
    settings: {
      preset: "cyan",
      accentColor: "cyan",
      customPrimaryColor: "#06b6d4",
      customSecondaryColor: "#3b82f6",
      mode: "dark",
      glassmorphism: true,
      glassIntensity: "ultra",
      borderRadius: "lg",
      fontFamily: "mono",
      backgroundPattern: "dots",
      glowIntensity: "vibrant",
      showPhoneMockup: true,
      showLiveStatusBadge: true,
      enableAnimations: true,
      heroHeadlineStyle: "gradient",
    },
  },
  {
    id: "apple-titanium",
    name: "Apple Swift Titanium",
    description: "Sleek iOS violet & pink tones with ambient mesh lighting.",
    badge: "Sleek iOS",
    settings: {
      preset: "violet",
      accentColor: "violet",
      customPrimaryColor: "#8b5cf6",
      customSecondaryColor: "#ec4899",
      mode: "dark",
      glassmorphism: true,
      glassIntensity: "medium",
      borderRadius: "full",
      fontFamily: "sans",
      backgroundPattern: "mesh",
      glowIntensity: "subtle",
      showPhoneMockup: true,
      showLiveStatusBadge: true,
      enableAnimations: true,
      heroHeadlineStyle: "glow",
    },
  },
  {
    id: "solar-amber",
    name: "Solar Amber Executive",
    description: "Warm gold & crimson accents with crisp, high-contrast borders.",
    badge: "Bold",
    settings: {
      preset: "amber",
      accentColor: "amber",
      customPrimaryColor: "#f59e0b",
      customSecondaryColor: "#ef4444",
      mode: "dark",
      glassmorphism: true,
      glassIntensity: "low",
      borderRadius: "md",
      fontFamily: "sans",
      backgroundPattern: "grid",
      glowIntensity: "vibrant",
      showPhoneMockup: true,
      showLiveStatusBadge: true,
      enableAnimations: true,
      heroHeadlineStyle: "gradient",
    },
  },
  {
    id: "nordic-clean",
    name: "Nordic Minimalist Light",
    description: "Clean paper white layout with sharp borders and zero distractions.",
    badge: "Light Minimal",
    settings: {
      preset: "slate",
      accentColor: "slate",
      customPrimaryColor: "#0284c7",
      customSecondaryColor: "#64748b",
      mode: "light",
      glassmorphism: false,
      glassIntensity: "none",
      borderRadius: "sm",
      fontFamily: "sans",
      backgroundPattern: "clean",
      glowIntensity: "off",
      showPhoneMockup: false,
      showLiveStatusBadge: true,
      enableAnimations: false,
      heroHeadlineStyle: "solid",
    },
  },
];

const DEFAULT_PHONE_CONFIG: PhoneMockupSettings = {
  defaultApp: "dashen",
  frameStyle: "titanium-dark",
  dynamicIslandText: "Dashen Super App",
  bankingBalance: "248,500.00",
  bankingCurrency: "ETB",
  bankingCardholder: "Dagm Ayalew",
  bankingKycBadge: "Fayda Verified",
  deliveryRoute: "Bole Medhanialem → Kazanchis",
  deliveryEta: "ETA 8 MIN",
  cryptoAlgorithm: "Biometric & Token Auth",
};

export default function ThemeCustomizerPage() {
  const { settings, updateSettings } = useTheme();
  const [current, setCurrent] = useState<ThemeSettings>(settings);
  const [activeTab, setActiveTab] = useState<"phone" | "theme" | "packs">("phone");
  const [previewMode, setPreviewMode] = useState<"phone" | "components">("phone");
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setCurrent(settings);
  }, [settings]);

  const phoneCfg: PhoneMockupSettings = {
    ...DEFAULT_PHONE_CONFIG,
    ...(current.phoneMockupSettings || {}),
  };

  const handleChange = (partial: Partial<ThemeSettings>) => {
    const updated = { ...current, ...partial };
    setCurrent(updated);
    updateSettings(partial);
  };

  const handlePhoneChange = (partialPhone: Partial<PhoneMockupSettings>) => {
    const updatedPhone = { ...phoneCfg, ...partialPhone };
    const updatedTheme: ThemeSettings = {
      ...current,
      phoneMockupSettings: updatedPhone,
    };
    setCurrent(updatedTheme);
    updateSettings({ phoneMockupSettings: updatedPhone });
  };

  const applyThemePack = (packSettings: Partial<ThemeSettings>) => {
    const updated = { ...current, ...packSettings };
    setCurrent(updated);
    updateSettings(packSettings);
  };

  const handleSave = async () => {
    setSaving(true);
    setSavedSuccess(false);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(current),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3500);
      } else {
        if (res.status === 401) {
          setErrorMessage("Admin session expired. Please refresh or sign in again.");
        } else {
          setErrorMessage(data.error || "Failed to save theme configuration.");
        }
      }
    } catch (err) {
      console.error("Failed to save theme settings:", err);
      setErrorMessage("Network error while saving theme.");
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
            <Smartphone className="w-3.5 h-3.5" /> Studio & Appearance Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Phone Mockup Studio & Visual Theme
          </h1>
          <p className="text-xs text-slate-400">
            Customize your realistic iPhone 16 Pro showcase, apps, dynamic island, and portfolio theme styling.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              applyThemePack(THEME_PACKS[0].settings);
              handlePhoneChange(DEFAULT_PHONE_CONFIG);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-all"
            title="Reset to default theme"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-background font-bold text-xs hover:brightness-110 shadow-lg shadow-primary/25 transition-all disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving to Database...
              </>
            ) : savedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                Saved to PostgreSQL!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save All Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status Banners */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} className="text-red-400 hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30 text-primary text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4" /> Phone Mockup and Theme configuration successfully saved to your PostgreSQL database!
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab("phone")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "phone"
              ? "bg-primary text-background shadow-lg shadow-primary/25"
              : "bg-[#0d1424] text-slate-300 hover:text-white border border-white/5"
          }`}
        >
          <Smartphone className="w-4 h-4" /> Realistic Phone Mockup Studio
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
            activeTab === "phone" ? "bg-black/20 text-black font-extrabold" : "bg-primary/20 text-primary"
          }`}>
            Interactive
          </span>
        </button>

        <button
          onClick={() => setActiveTab("theme")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "theme"
              ? "bg-primary text-background shadow-lg shadow-primary/25"
              : "bg-[#0d1424] text-slate-300 hover:text-white border border-white/5"
          }`}
        >
          <Palette className="w-4 h-4" /> Colors & Visual Styling
        </button>

        <button
          onClick={() => setActiveTab("packs")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "packs"
              ? "bg-primary text-background shadow-lg shadow-primary/25"
              : "bg-[#0d1424] text-slate-300 hover:text-white border border-white/5"
          }`}
        >
          <Zap className="w-4 h-4" /> 1-Click Theme Packs
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Studio Controls */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* TAB 1: PHONE MOCKUP STUDIO */}
          {activeTab === "phone" && (
            <div className="space-y-6 animate-fade-in">
              
              {/* 1. Phone Hero Display Toggle */}
              <div className="p-6 rounded-3xl bg-[#0d1424] border border-white/10 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-primary" /> Display iPhone 16 Pro in Hero
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Renders the interactive 3D device frame with native mobile simulators on your homepage.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={current.showPhoneMockup !== false}
                      onChange={(e) => handleChange({ showPhoneMockup: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              {/* 2. Chassis Hardware Finish */}
              <div className="p-6 rounded-3xl bg-[#0d1424] border border-white/10 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-primary" /> iPhone 16 Pro Titanium Finish
                  </h3>
                  <span className="text-xs font-mono text-primary font-bold capitalize">
                    {phoneCfg.frameStyle?.replace("-", " ") || "Titanium Dark"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "titanium-dark", name: "Titanium Dark", color: "from-[#3a4454] to-[#111827]", desc: "Space Gray" },
                    { id: "titanium-natural", name: "Titanium Natural", color: "from-[#78716c] to-[#1c1917]", desc: "Raw Metal" },
                    { id: "midnight-black", name: "Midnight Black", color: "from-[#18181b] to-[#000000]", desc: "Obsidian" },
                    { id: "emerald-glow", name: "Emerald Glow", color: "from-[#065f46] to-[#022c22]", desc: "FinTech" },
                  ].map((style) => {
                    const isSelected = (phoneCfg.frameStyle || "titanium-dark") === style.id;
                    return (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => handlePhoneChange({ frameStyle: style.id as PhoneMockupSettings["frameStyle"] })}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? "bg-white/10 border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                            : "bg-white/[0.02] border-white/5 hover:border-white/20"
                        }`}
                      >
                        <div className={`w-full h-4 rounded-lg bg-gradient-to-r ${style.color} mb-2 border border-white/10`} />
                        <p className="text-xs font-bold text-white">{style.name}</p>
                        <p className="text-[10px] text-slate-400">{style.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Default In-App Experience on Load */}
              <div className="p-6 rounded-3xl bg-[#0d1424] border border-white/10 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary" /> Default Simulator Screen on Load
                  </h3>
                  <span className="text-[10px] text-slate-400">Visitors can still switch apps interactively</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "dashen", label: "Dashen Super App", icon: CreditCard, sub: "FinTech & Fayda KYC" },
                    { id: "ethiopost", label: "Ethio Post", icon: Building2, sub: "Agency Banking & Biometrics" },
                    { id: "order", label: "Order Ethiopia", icon: Navigation, sub: "Gebeta Maps GPS" },
                  ].map((app) => {
                    const Icon = app.icon;
                    const isSelected = (phoneCfg.defaultApp || "dashen") === app.id;
                    return (
                      <button
                        key={app.id}
                        type="button"
                        onClick={() => handlePhoneChange({ defaultApp: app.id as PhoneMockupSettings["defaultApp"] })}
                        className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                          isSelected
                            ? "bg-primary/10 border-primary shadow-lg shadow-primary/20"
                            : "bg-white/[0.02] border-white/5 hover:border-white/20"
                        }`}
                      >
                        <div className={`p-2 rounded-xl shrink-0 ${isSelected ? "bg-primary text-background" : "bg-white/10 text-slate-300"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">{app.label}</p>
                          <p className="text-[10px] text-slate-400">{app.sub}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Dynamic Island 2.0 Live Text */}
              <div className="p-6 rounded-3xl bg-[#0d1424] border border-white/10 shadow-xl space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Fingerprint className="w-4 h-4 text-primary" /> Dynamic Island 2.0 Telemetry Text
                </h3>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">
                    Pill Headline (Displayed in iOS status capsule on hero)
                  </label>
                  <input
                    type="text"
                    value={phoneCfg.dynamicIslandText || "60 FPS FlashList"}
                    onChange={(e) => handlePhoneChange({ dynamicIslandText: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-primary"
                    placeholder="e.g. 60 FPS FlashList"
                  />
                </div>

                {/* Quick Presets */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">1-Click Presets:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "60 FPS FlashList",
                      "Gebeta GPS Active",
                      "Fayda KYC Verified",
                      "secp256k1 ECDH",
                      "Quick-SQLite 0.4ms",
                    ].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handlePhoneChange({ dynamicIslandText: preset })}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-mono text-slate-300 hover:text-white transition-all"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 5. In-App Data Customizer */}
              <div className="p-6 rounded-3xl bg-[#0d1424] border border-white/10 shadow-xl space-y-5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-primary" /> In-App Simulator Content & Data
                </h3>

                {/* Dashen FinTech Settings */}
                <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <CreditCard className="w-4 h-4 text-primary" /> Dashen FinTech Card Settings
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Cardholder Name</label>
                      <input
                        type="text"
                        value={phoneCfg.bankingCardholder || "Dagm Ayalew"}
                        onChange={(e) => handlePhoneChange({ bankingCardholder: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">KYC Badge Label</label>
                      <input
                        type="text"
                        value={phoneCfg.bankingKycBadge || "Fayda KYC"}
                        onChange={(e) => handlePhoneChange({ bankingKycBadge: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Display Balance</label>
                      <input
                        type="text"
                        value={phoneCfg.bankingBalance || "248,500.00"}
                        onChange={(e) => handlePhoneChange({ bankingBalance: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Currency Symbol</label>
                      <input
                        type="text"
                        value={phoneCfg.bankingCurrency || "ETB"}
                        onChange={(e) => handlePhoneChange({ bankingCurrency: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Order Ethiopia Delivery Settings */}
                <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <Navigation className="w-4 h-4 text-cyan-400" /> Order Ethiopia GPS Route Settings
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Delivery Route Path</label>
                      <input
                        type="text"
                        value={phoneCfg.deliveryRoute || "Bole Medhanialem → Kazanchis"}
                        onChange={(e) => handlePhoneChange({ deliveryRoute: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">ETA Status Pill</label>
                      <input
                        type="text"
                        value={phoneCfg.deliveryEta || "ETA 8 MIN"}
                        onChange={(e) => handlePhoneChange({ deliveryEta: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* secp256k1 Cryptography Settings */}
                <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <Lock className="w-4 h-4 text-purple-400" /> Cryptography Engine Header
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Cryptographic Standard Name</label>
                    <input
                      type="text"
                      value={phoneCfg.cryptoAlgorithm || "secp256k1 & AES-256"}
                      onChange={(e) => handlePhoneChange({ cryptoAlgorithm: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: COLOR & THEME STYLING */}
          {activeTab === "theme" && (
            <div className="space-y-6 animate-fade-in">
              
              {/* 1. Color Palette & Custom Hex Picker */}
              <div className="p-6 rounded-3xl bg-[#0d1424] border border-white/10 shadow-xl space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Brush className="w-4 h-4 text-primary" /> Primary Accent Palette
                  </h3>
                  <span className="text-xs font-mono text-primary font-bold">
                    {current.customPrimaryColor || PRESET_COLORS[current.preset || "emerald"]?.primary}
                  </span>
                </div>

                {/* Presets Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(Object.keys(PRESET_COLORS) as AccentPreset[]).map((key) => {
                    const item = PRESET_COLORS[key];
                    const isSelected = current.preset === key;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          handleChange({
                            preset: key,
                            accentColor: key,
                            customPrimaryColor: item.primary,
                            customSecondaryColor: item.secondary,
                          });
                        }}
                        className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                          isSelected
                            ? "bg-white/10 border-primary shadow-md shadow-primary/20"
                            : "bg-white/[0.02] border-white/5 hover:border-white/20"
                        }`}
                      >
                        <div
                          className="w-4 h-4 rounded-full shrink-0 shadow-inner"
                          style={{ backgroundColor: item.primary }}
                        />
                        <span className="text-xs font-semibold text-white truncate">
                          {item.name.split(" ")[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Hex Color Pickers */}
                <div className="pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                      <span>Custom Primary Color</span>
                      <span className="text-[10px] text-slate-500 font-mono">Hex Code</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={current.customPrimaryColor || "#10b981"}
                        onChange={(e) =>
                          handleChange({
                            preset: "custom",
                            accentColor: "custom",
                            customPrimaryColor: e.target.value,
                          })
                        }
                        className="w-9 h-9 rounded-xl bg-transparent cursor-pointer border border-white/20"
                      />
                      <input
                        type="text"
                        value={current.customPrimaryColor || "#10b981"}
                        onChange={(e) =>
                          handleChange({
                            preset: "custom",
                            accentColor: "custom",
                            customPrimaryColor: e.target.value,
                          })
                        }
                        className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                      <span>Secondary Gradient Color</span>
                      <span className="text-[10px] text-slate-500 font-mono">Hex Code</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={current.customSecondaryColor || "#06b6d4"}
                        onChange={(e) =>
                          handleChange({
                            customSecondaryColor: e.target.value,
                          })
                        }
                        className="w-9 h-9 rounded-xl bg-transparent cursor-pointer border border-white/20"
                      />
                      <input
                        type="text"
                        value={current.customSecondaryColor || "#06b6d4"}
                        onChange={(e) =>
                          handleChange({
                            customSecondaryColor: e.target.value,
                          })
                        }
                        className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Display Mode & Background Atmosphere */}
              <div className="p-6 rounded-3xl bg-[#0d1424] border border-white/10 shadow-xl space-y-5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-primary" /> Theme Mode & Background Atmosphere
                </h3>

                {/* Mode: Dark vs Light */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleChange({ mode: "dark" })}
                    className={`p-3.5 rounded-2xl border text-center space-y-1 transition-all flex items-center justify-center gap-2 ${
                      current.mode === "dark"
                        ? "bg-white/10 border-primary shadow-md"
                        : "bg-white/[0.02] border-white/5 text-slate-400"
                    }`}
                  >
                    <Moon className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-white">Dark Mode</span>
                  </button>

                  <button
                    onClick={() => handleChange({ mode: "light" })}
                    className={`p-3.5 rounded-2xl border text-center space-y-1 transition-all flex items-center justify-center gap-2 ${
                      current.mode === "light"
                        ? "bg-white/10 border-primary shadow-md"
                        : "bg-white/[0.02] border-white/5 text-slate-400"
                    }`}
                  >
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white">Light Mode</span>
                  </button>
                </div>

                {/* Background Pattern */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-semibold text-slate-300">
                    Background Texture Pattern
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "grid", label: "Grid Lines", icon: Grid },
                      { id: "dots", label: "Dot Matrix", icon: CircleDot },
                      { id: "mesh", label: "Aurora Mesh", icon: Palette },
                      { id: "clean", label: "Clean Matte", icon: Layers },
                    ].map((pat) => {
                      const Icon = pat.icon;
                      const isSelected = current.backgroundPattern === pat.id;
                      return (
                        <button
                          key={pat.id}
                          onClick={() =>
                            handleChange({ backgroundPattern: pat.id as BackgroundPattern })
                          }
                          className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                            isSelected
                              ? "bg-primary text-background border-primary font-bold shadow-md shadow-primary/20"
                              : "bg-white/[0.02] border-white/5 text-slate-300 hover:text-white"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {pat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Glow Ambient Intensity */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-semibold text-slate-300">
                    Ambient Glow Lighting
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "vibrant", label: "Vibrant Glow" },
                      { id: "subtle", label: "Subtle Ambient" },
                      { id: "off", label: "Off (Pure Matte)" },
                    ].map((glow) => (
                      <button
                        key={glow.id}
                        onClick={() =>
                          handleChange({ glowIntensity: glow.id as GlowIntensity })
                        }
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                          current.glowIntensity === glow.id
                            ? "bg-white/10 border-primary text-white"
                            : "bg-white/[0.02] border-white/5 text-slate-400"
                        }`}
                      >
                        {glow.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Surface, Glassmorphism & Border Radius */}
              <div className="p-6 rounded-3xl bg-[#0d1424] border border-white/10 shadow-xl space-y-5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" /> Glassmorphism & Corner Curvature
                </h3>

                {/* Glass Intensity */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">
                    Frosted Glass Blur Level
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "none", label: "None (Solid)" },
                      { id: "low", label: "Low (8px)" },
                      { id: "medium", label: "Medium (16px)" },
                      { id: "ultra", label: "Ultra (28px)" },
                    ].map((glass) => (
                      <button
                        key={glass.id}
                        onClick={() =>
                          handleChange({
                            glassIntensity: glass.id as GlassIntensity,
                            glassmorphism: glass.id !== "none",
                          })
                        }
                        className={`py-2 px-2.5 rounded-xl border text-xs font-semibold transition-all ${
                          current.glassIntensity === glass.id
                            ? "bg-primary text-background border-primary font-bold shadow-md shadow-primary/20"
                            : "bg-white/[0.02] border-white/5 text-slate-300 hover:text-white"
                        }`}
                      >
                        {glass.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Corner Radius */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-semibold text-slate-300">
                    Card & Button Corner Curvature
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { id: "none", label: "Sharp" },
                      { id: "sm", label: "Subtle (6px)" },
                      { id: "md", label: "Modern (12px)" },
                      { id: "lg", label: "Curved (20px)" },
                      { id: "full", label: "Pill (32px)" },
                    ].map((rad) => (
                      <button
                        key={rad.id}
                        onClick={() =>
                          handleChange({ borderRadius: rad.id as BorderRadiusSize })
                        }
                        className={`py-2 px-2 rounded-xl border text-xs font-semibold transition-all ${
                          current.borderRadius === rad.id
                            ? "bg-white/10 border-primary text-white"
                            : "bg-white/[0.02] border-white/5 text-slate-400"
                        }`}
                      >
                        {rad.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Typography Selection */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-semibold text-slate-300">
                    Primary Typography Style
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "sans", label: "Inter / Sans-serif" },
                      { id: "mono", label: "JetBrains / Code Mono" },
                      { id: "serif", label: "Editorial Serif" },
                    ].map((font) => (
                      <button
                        key={font.id}
                        onClick={() =>
                          handleChange({ fontFamily: font.id as FontFamilyChoice })
                        }
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                          current.fontFamily === font.id
                            ? "bg-white/10 border-primary text-white font-bold"
                            : "bg-white/[0.02] border-white/5 text-slate-400"
                        }`}
                      >
                        {font.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Layout Features & Interactive FX */}
              <div className="p-6 rounded-3xl bg-[#0d1424] border border-white/10 shadow-xl space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" /> Layout & Animation Toggles
                </h3>

                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] cursor-pointer">
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Show Phone Hardware Mockup in Hero
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Display the interactive floating iPhone 16 Pro hardware frame on the home page hero.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={current.showPhoneMockup !== false}
                      onChange={(e) => handleChange({ showPhoneMockup: e.target.checked })}
                      className="w-4 h-4 rounded text-primary focus:ring-primary bg-white/5"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] cursor-pointer">
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Show Live Status Pulse Badge
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Displays &ldquo;Available for hire&rdquo; pulse indicator on navbar and hero.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={current.showLiveStatusBadge !== false}
                      onChange={(e) => handleChange({ showLiveStatusBadge: e.target.checked })}
                      className="w-4 h-4 rounded text-primary focus:ring-primary bg-white/5"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] cursor-pointer">
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Enable Floating Micro-Animations
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Enables smooth floating tags, pulse badges, and micro-interactions.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={current.enableAnimations !== false}
                      onChange={(e) => handleChange({ enableAnimations: e.target.checked })}
                      className="w-4 h-4 rounded text-primary focus:ring-primary bg-white/5"
                    />
                  </label>
                </div>

                {/* Section Visibility Switches */}
                <div className="space-y-3 pt-3 border-t border-white/5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Home Page Section Visibility
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { key: "showHero", label: "Hero & Bio Section" },
                      { key: "showProjects", label: "Selected Work / Projects" },
                      { key: "showExperience", label: "Career History / CV" },
                      { key: "showSkills", label: "Technical Arsenal / Skills" },
                      { key: "showContact", label: "Direct Contact CTA" },
                    ].map((sec) => {
                      const vis = current.sectionVisibility || {};
                      const isVisible = vis[sec.key as keyof typeof vis] !== false;
                      return (
                        <label
                          key={sec.key}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] cursor-pointer"
                        >
                          <span className="text-xs font-semibold text-white">{sec.label}</span>
                          <input
                            type="checkbox"
                            checked={isVisible}
                            onChange={(e) => {
                              const updatedVis = { ...vis, [sec.key]: e.target.checked };
                              handleChange({ sectionVisibility: updatedVis });
                            }}
                            className="w-4 h-4 rounded text-primary focus:ring-primary bg-white/5"
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Section Headings & Descriptions */}
                <div className="space-y-3 pt-3 border-t border-white/5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Section Titles & Subtitles
                  </h4>

                  {/* Selected Work Title */}
                  <div className="space-y-2 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <label className="text-xs font-bold text-white block">Selected Work Header</label>
                    <input
                      type="text"
                      value={current.sectionContent?.projectsTitle || ""}
                      onChange={(e) => {
                        const sc = { ...(current.sectionContent || {}), projectsTitle: e.target.value };
                        handleChange({ sectionContent: sc });
                      }}
                      placeholder="e.g. Featured Mobile Projects"
                      className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary"
                    />
                    <textarea
                      rows={2}
                      value={current.sectionContent?.projectsSubtitle || ""}
                      onChange={(e) => {
                        const sc = { ...(current.sectionContent || {}), projectsSubtitle: e.target.value };
                        handleChange({ sectionContent: sc });
                      }}
                      placeholder="e.g. Production React Native and mobile applications built for scale..."
                      className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary resize-none"
                    />
                  </div>

                  {/* Experience Title */}
                  <div className="space-y-2 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <label className="text-xs font-bold text-white block">Career History Header</label>
                    <input
                      type="text"
                      value={current.sectionContent?.experienceTitle || ""}
                      onChange={(e) => {
                        const sc = { ...(current.sectionContent || {}), experienceTitle: e.target.value };
                        handleChange({ sectionContent: sc });
                      }}
                      placeholder="e.g. Work Experience"
                      className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary"
                    />
                    <textarea
                      rows={2}
                      value={current.sectionContent?.experienceSubtitle || ""}
                      onChange={(e) => {
                        const sc = { ...(current.sectionContent || {}), experienceSubtitle: e.target.value };
                        handleChange({ sectionContent: sc });
                      }}
                      placeholder="e.g. Track record of shipping production mobile applications..."
                      className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary resize-none"
                    />
                  </div>

                  {/* Skills Title */}
                  <div className="space-y-2 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <label className="text-xs font-bold text-white block">Technical Arsenal Header</label>
                    <input
                      type="text"
                      value={current.sectionContent?.skillsTitle || ""}
                      onChange={(e) => {
                        const sc = { ...(current.sectionContent || {}), skillsTitle: e.target.value };
                        handleChange({ sectionContent: sc });
                      }}
                      placeholder="e.g. Technologies & Tools"
                      className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary"
                    />
                    <textarea
                      rows={2}
                      value={current.sectionContent?.skillsSubtitle || ""}
                      onChange={(e) => {
                        const sc = { ...(current.sectionContent || {}), skillsSubtitle: e.target.value };
                        handleChange({ sectionContent: sc });
                      }}
                      placeholder="e.g. Focused on production React Native mobile architectures..."
                      className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary resize-none"
                    />
                  </div>

                  {/* Contact Title */}
                  <div className="space-y-2 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <label className="text-xs font-bold text-white block">Contact CTA Header</label>
                    <input
                      type="text"
                      value={current.sectionContent?.contactTitle || ""}
                      onChange={(e) => {
                        const sc = { ...(current.sectionContent || {}), contactTitle: e.target.value };
                        handleChange({ sectionContent: sc });
                      }}
                      placeholder="e.g. Get In Touch"
                      className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary"
                    />
                    <textarea
                      rows={2}
                      value={current.sectionContent?.contactSubtitle || ""}
                      onChange={(e) => {
                        const sc = { ...(current.sectionContent || {}), contactSubtitle: e.target.value };
                        handleChange({ sectionContent: sc });
                      }}
                      placeholder="e.g. Interested in discussing a mobile engineering project..."
                      className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary resize-none"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: 1-CLICK THEME PACKS */}
          {activeTab === "packs" && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-6 rounded-3xl bg-[#0d1424] border border-white/10 shadow-xl space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" /> 1-Click Curated Theme Packs
                  </h3>
                  <p className="text-xs text-slate-400">
                    Instantly transform your portfolio with hand-crafted aesthetics designed for mobile developers.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {THEME_PACKS.map((pack) => (
                    <button
                      key={pack.id}
                      onClick={() => applyThemePack(pack.settings)}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/50 text-left transition-all space-y-2 shadow-lg group hover:scale-[1.02]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-bold">
                          {pack.badge}
                        </span>
                        <Zap className="w-3.5 h-3.5 text-primary opacity-60 group-hover:opacity-100" />
                      </div>
                      <h4 className="text-xs font-bold text-white group-hover:text-primary transition-colors">
                        {pack.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {pack.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Live Interactive Playground & Device Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-6 space-y-4">
            
            {/* Mode Switcher Header */}
            <div className="flex items-center justify-between bg-[#0d1424] p-1.5 rounded-2xl border border-white/10">
              <button
                type="button"
                onClick={() => setPreviewMode("phone")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  previewMode === "phone"
                    ? "bg-primary text-background shadow-md shadow-primary/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> 3D Phone Live
              </button>

              <button
                type="button"
                onClick={() => setPreviewMode("components")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  previewMode === "components"
                    ? "bg-primary text-background shadow-md shadow-primary/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" /> Components UI
              </button>
            </div>

            {/* PREVIEW MODE 1: 3D REALISTIC PHONE MOCKUP */}
            {previewMode === "phone" && (
              <div className="p-4 rounded-3xl bg-[#090e1a] border border-white/10 shadow-2xl flex flex-col items-center justify-center animate-fade-in relative overflow-hidden">
                <div className="w-full flex items-center justify-between text-[11px] font-bold text-slate-400 mb-2 px-2">
                  <span className="flex items-center gap-1 text-primary">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping" /> Real-time Interactive Simulator
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">iPhone 16 Pro</span>
                </div>

                <div className="py-2 scale-[0.92] sm:scale-100 transition-transform origin-top">
                  <PhoneMockup customSettings={current.phoneMockupSettings} />
                </div>
              </div>
            )}

            {/* PREVIEW MODE 2: UI COMPONENTS */}
            {previewMode === "components" && (
              <div
                className="p-6 rounded-3xl bg-[#0f172a] border border-primary/40 shadow-2xl space-y-6 relative overflow-hidden transition-all animate-fade-in"
                style={{
                  borderRadius:
                    current.borderRadius === "none"
                      ? "0rem"
                      : current.borderRadius === "sm"
                      ? "0.5rem"
                      : current.borderRadius === "md"
                      ? "0.75rem"
                      : current.borderRadius === "full"
                      ? "2rem"
                      : "1.25rem",
                }}
              >
                {/* Glow Accent in preview */}
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-70 pointer-events-none"
                  style={{ backgroundColor: current.customPrimaryColor || "#10b981" }}
                />

                {/* Sample Header */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs text-background shadow-md"
                      style={{ backgroundColor: current.customPrimaryColor || "#10b981" }}
                    >
                      DA
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Dagm Ayalew</h4>
                      <p
                        className="text-[10px] font-semibold"
                        style={{ color: current.customPrimaryColor || "#10b981" }}
                      >
                        Mobile App Developer
                      </p>
                    </div>
                  </div>

                  {current.showLiveStatusBadge && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-200">
                      <span
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: current.customPrimaryColor || "#10b981" }}
                      />
                      Available
                    </div>
                  )}
                </div>

                {/* Sample Headline */}
                <div className="space-y-1.5 relative z-10">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    Featured FinTech Mobile Case Study
                  </p>
                  <h3 className="text-xl font-black text-white leading-tight">
                    Dashen Bank <br />
                    <span
                      style={{
                        background: `linear-gradient(135deg, ${
                          current.customPrimaryColor || "#10b981"
                        } 0%, ${current.customSecondaryColor || "#06b6d4"} 100%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Super App & Wallet
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    React Native app with secp256k1 elliptic curve cryptography, Fayda KYC onboarding, and 60 FPS UX.
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 relative z-10">
                  {["React Native", "TypeScript", "Zustand", "Quick-SQLite"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-bold border"
                      style={{
                        backgroundColor: `${current.customPrimaryColor || "#10b981"}15`,
                        borderColor: `${current.customPrimaryColor || "#10b981"}40`,
                        color: current.customPrimaryColor || "#10b981",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Progress Bar sample */}
                <div className="space-y-1 relative z-10">
                  <div className="flex justify-between text-[10px] font-semibold text-slate-400">
                    <span>React Native & TypeScript</span>
                    <span className="font-mono">96%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden border border-white/5">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: "96%",
                        background: `linear-gradient(to right, ${
                          current.customPrimaryColor || "#10b981"
                        }, ${current.customSecondaryColor || "#06b6d4"})`,
                      }}
                    />
                  </div>
                </div>

                {/* Sample Buttons */}
                <div className="pt-2 flex items-center gap-3 relative z-10">
                  <button
                    className="flex-1 py-2.5 rounded-xl font-bold text-xs text-background shadow-lg transition-all hover:brightness-110"
                    style={{
                      backgroundColor: current.customPrimaryColor || "#10b981",
                      boxShadow: `0 4px 14px 0 ${current.customPrimaryColor || "#10b981"}40`,
                    }}
                  >
                    Primary Action
                  </button>
                  <button className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-all">
                    Outline
                  </button>
                </div>
              </div>
            )}

            {/* Quick Summary Card */}
            <div className="p-4 rounded-2xl bg-[#0d1424] border border-white/10 space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Active Accent:</span>
                <strong className="text-white font-mono">{current.preset || "Custom"}</strong>
              </div>
              <div className="flex justify-between">
                <span>Phone Chassis:</span>
                <strong className="text-primary font-mono capitalize">{phoneCfg.frameStyle || "titanium-dark"}</strong>
              </div>
              <div className="flex justify-between">
                <span>Default In-App:</span>
                <strong className="text-white capitalize">{phoneCfg.defaultApp || "dashen"}</strong>
              </div>
              <div className="flex justify-between">
                <span>Dynamic Island:</span>
                <strong className="text-primary font-mono truncate max-w-[140px]">{phoneCfg.dynamicIslandText || "Dashen Super App"}</strong>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
