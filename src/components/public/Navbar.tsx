"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Smartphone, FileText, Compass, Clock, Send, ShieldCheck, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileData } from "@/types";

export function Navbar({ profile }: { profile: ProfileData }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Portfolio", icon: Smartphone },
    { href: "/projects", label: "Mobile Apps", icon: Compass },
    { href: "/cv", label: "Dynamic CV", icon: FileText },
    { href: "/now", label: "Now / Life", icon: Clock },
    { href: "/contact", label: "Contact", icon: Send },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#090d16]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary/80 to-primary flex items-center justify-center text-background font-black text-lg shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            DA
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-white group-hover:text-primary transition-colors">
              {profile.name}
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              {profile.isOpenToWork ? "Available for hire" : "Senior Mobile Developer"}
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] p-1.5 rounded-full border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-background font-semibold shadow-md shadow-primary/25"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                )}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action & Admin entry */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/cv"
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg border border-primary/40 text-primary hover:bg-primary/10 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            Download CV
          </Link>
          <Link
            href="/admin"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
            title="Admin Dashboard"
          >
            <ShieldCheck className="w-5 h-5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/admin"
            className="p-2 rounded-lg text-slate-400 hover:text-white"
          >
            <ShieldCheck className="w-5 h-5" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090d16]/95 border-b border-white/10 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 animate-fade-in">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors",
                  isActive
                    ? "bg-primary text-background font-semibold"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/cv"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary/20 text-primary font-semibold text-center border border-primary/30"
            >
              <FileText className="w-4 h-4" />
              View & Download CV
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
