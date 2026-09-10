"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeSettings, AccentPreset, BackgroundPattern, GlassIntensity, BorderRadiusSize, FontFamilyChoice, GlowIntensity } from "@/types";

interface ThemeContextType {
  settings: ThemeSettings;
  updateSettings: (newSettings: Partial<ThemeSettings>) => void;
  setPreset: (preset: AccentPreset) => void;
  setMode: (mode: "dark" | "light") => void;
  setCustomColor: (primary: string, secondary?: string) => void;
  setBackgroundPattern: (pattern: BackgroundPattern) => void;
  setGlassIntensity: (intensity: GlassIntensity) => void;
  setBorderRadius: (radius: BorderRadiusSize) => void;
  setFontFamily: (font: FontFamilyChoice) => void;
  setGlowIntensity: (glow: GlowIntensity) => void;
  togglePhoneMockup: (show: boolean) => void;
  toggleStatusBadge: (show: boolean) => void;
  toggleAnimations: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const PRESET_COLORS: Record<AccentPreset, { primary: string; secondary: string; name: string }> = {
  emerald: { primary: "#10b981", secondary: "#06b6d4", name: "FinTech Emerald" },
  cyan: { primary: "#06b6d4", secondary: "#3b82f6", name: "React Native Cyan" },
  violet: { primary: "#8b5cf6", secondary: "#ec4899", name: "Apple Swift Violet" },
  amber: { primary: "#f59e0b", secondary: "#ef4444", name: "Solar Amber" },
  rose: { primary: "#f43f5e", secondary: "#fb923c", name: "Neon Crimson" },
  slate: { primary: "#38bdf8", secondary: "#64748b", name: "Nordic Minimal" },
  indigo: { primary: "#6366f1", secondary: "#a855f7", name: "Deep Indigo" },
  crimson: { primary: "#dc2626", secondary: "#ea580c", name: "Vibrant Flame" },
  custom: { primary: "#10b981", secondary: "#06b6d4", name: "Custom Brand" },
};

export function ThemeProvider({
  initialSettings,
  children,
}: {
  initialSettings: ThemeSettings;
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<ThemeSettings>(initialSettings);

  useEffect(() => {
    const root = document.documentElement;
    const preset = settings.preset || settings.accentColor || "emerald";

    // 1. Data attributes
    root.setAttribute("data-accent", preset);
    root.setAttribute("data-theme", settings.mode);
    root.setAttribute("data-pattern", settings.backgroundPattern || "grid");
    root.setAttribute("data-glass", settings.glassIntensity || "medium");
    root.setAttribute("data-radius", settings.borderRadius || "lg");
    root.setAttribute("data-glow", settings.glowIntensity || "vibrant");

    // 2. Dark / Light class
    if (settings.mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // 3. Custom primary & secondary color overrides
    if (preset === "custom" && settings.customPrimaryColor) {
      root.style.setProperty("--primary", settings.customPrimaryColor);
      root.style.setProperty("--ring", settings.customPrimaryColor);
      root.style.setProperty(
        "--primary-glow-start",
        `${settings.customPrimaryColor}59`
      );
      root.style.setProperty(
        "--primary-glow-end",
        `${settings.customPrimaryColor}99`
      );
    } else if (PRESET_COLORS[preset]) {
      root.style.removeProperty("--primary");
      root.style.removeProperty("--ring");
      root.style.removeProperty("--primary-glow-start");
      root.style.removeProperty("--primary-glow-end");
    }

    // 4. Border Radius dynamic mapping
    const radiusMap: Record<BorderRadiusSize, string> = {
      none: "0rem",
      sm: "0.375rem",
      md: "0.75rem",
      lg: "1.25rem",
      full: "2rem",
    };
    root.style.setProperty("--radius", radiusMap[settings.borderRadius || "lg"]);
  }, [settings]);

  const updateSettings = (newSettings: Partial<ThemeSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const setPreset = (preset: AccentPreset) => {
    const presetData = PRESET_COLORS[preset];
    setSettings((prev) => ({
      ...prev,
      preset,
      accentColor: preset,
      customPrimaryColor: presetData?.primary || prev.customPrimaryColor,
      customSecondaryColor: presetData?.secondary || prev.customSecondaryColor,
    }));
  };

  const setMode = (mode: "dark" | "light") => {
    setSettings((prev) => ({ ...prev, mode }));
  };

  const setCustomColor = (primary: string, secondary?: string) => {
    setSettings((prev) => ({
      ...prev,
      preset: "custom",
      accentColor: "custom",
      customPrimaryColor: primary,
      customSecondaryColor: secondary || prev.customSecondaryColor,
    }));
  };

  const setBackgroundPattern = (backgroundPattern: BackgroundPattern) => {
    setSettings((prev) => ({ ...prev, backgroundPattern }));
  };

  const setGlassIntensity = (glassIntensity: GlassIntensity) => {
    setSettings((prev) => ({
      ...prev,
      glassIntensity,
      glassmorphism: glassIntensity !== "none",
    }));
  };

  const setBorderRadius = (borderRadius: BorderRadiusSize) => {
    setSettings((prev) => ({ ...prev, borderRadius }));
  };

  const setFontFamily = (fontFamily: FontFamilyChoice) => {
    setSettings((prev) => ({ ...prev, fontFamily }));
  };

  const setGlowIntensity = (glowIntensity: GlowIntensity) => {
    setSettings((prev) => ({ ...prev, glowIntensity }));
  };

  const togglePhoneMockup = (showPhoneMockup: boolean) => {
    setSettings((prev) => ({ ...prev, showPhoneMockup }));
  };

  const toggleStatusBadge = (showLiveStatusBadge: boolean) => {
    setSettings((prev) => ({ ...prev, showLiveStatusBadge }));
  };

  const toggleAnimations = (enableAnimations: boolean) => {
    setSettings((prev) => ({ ...prev, enableAnimations }));
  };

  return (
    <ThemeContext.Provider
      value={{
        settings,
        updateSettings,
        setPreset,
        setMode,
        setCustomColor,
        setBackgroundPattern,
        setGlassIntensity,
        setBorderRadius,
        setFontFamily,
        setGlowIntensity,
        togglePhoneMockup,
        toggleStatusBadge,
        toggleAnimations,
      }}
    >
      <div
        className={`min-h-screen ${
          settings.fontFamily === "mono"
            ? "font-mono"
            : settings.fontFamily === "serif"
            ? "font-serif"
            : "font-sans"
        }`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
