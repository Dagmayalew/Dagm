"use client";

import { useState, useRef } from "react";
import {
  Terminal,
  Maximize2,
  Minimize2,
  RotateCw,
  ExternalLink,
  Sparkles,
  Command,
  Loader2,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TerminalViewerProps {
  src?: string;
  className?: string;
  heightClassName?: string;
  defaultFullscreen?: boolean;
}

export function TerminalViewer({
  src = "https://terminal.dagmayalew.online/",
  className,
  heightClassName = "h-[620px] sm:h-[680px]",
  defaultFullscreen = false,
}: TerminalViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(defaultFullscreen);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleReload = () => {
    setIsLoading(true);
    setReloadKey((prev) => prev + 1);
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(src);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const commonCommands = ["help", "projects", "about", "skills", "experience", "contact", "clear"];

  return (
    <div
      className={cn(
        "transition-all duration-300 flex flex-col",
        isFullscreen
          ? "fixed inset-0 z-50 bg-black/90 p-2 sm:p-6 backdrop-blur-xl flex flex-col justify-center items-center"
          : "relative w-full",
        className
      )}
    >
      {/* Outer Shell Window */}
      <div
        className={cn(
          "w-full flex flex-col rounded-2xl overflow-hidden border border-white/15 bg-[#090d16] shadow-2xl shadow-black/80 transition-all duration-300",
          isFullscreen ? "h-full max-w-7xl max-h-[96vh]" : heightClassName
        )}
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0d131f] border-b border-white/10 select-none shrink-0">
          {/* Traffic Lights Window Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReload}
              title="Reset Terminal"
              className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer flex items-center justify-center group"
            >
              <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-black leading-none">
                ×
              </span>
            </button>
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? "Restore size" : "Maximize view"}
              className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors cursor-pointer flex items-center justify-center group"
            >
              <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-black leading-none">
                –
              </span>
            </button>
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title="Toggle Fullscreen"
              className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors cursor-pointer flex items-center justify-center group"
            >
              <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-black leading-none">
                +
              </span>
            </button>
          </div>

          {/* Centered Title with Terminal Host Prompt */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 truncate px-2">
            <Terminal className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="font-semibold text-white">dagm@portfolio</span>
            <span className="text-slate-500">:</span>
            <span className="text-primary font-mono text-[11px]">~ (terminal.dagmayalew.online)</span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleCopyUrl}
              title="Copy URL"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors text-xs"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>

            <button
              type="button"
              onClick={handleReload}
              title="Reload Terminal Session"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <RotateCw className={cn("w-3.5 h-3.5", isLoading && "animate-spin text-primary")} />
            </button>

            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5 text-primary" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>

            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              title="Open standalone site in new tab"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div className="relative flex-1 w-full bg-[#050811] overflow-hidden">
          {/* Simulated Loading State */}
          {isLoading && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#070b14] space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-primary">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="font-bold">Initializing terminal environment...</span>
              </div>
              <div className="text-slate-400 text-[11px] space-y-1 text-center">
                <p>&gt; Connecting to remote shell: terminal.dagmayalew.online</p>
                <p>&gt; Loading interactive command-line interface...</p>
              </div>
            </div>
          )}

          {/* Embedded Terminal iFrame */}
          <iframe
            key={reloadKey}
            ref={iframeRef}
            src={src}
            title="Dagm Ayalew Interactive Terminal Portfolio"
            onLoad={() => setIsLoading(false)}
            className="w-full h-full border-0 bg-[#050811]"
            allow="clipboard-read; clipboard-write; fullscreen"
          />
        </div>

        {/* Terminal Footer with Quick Command Chips */}
        <div className="px-4 py-2.5 bg-[#0a0f1c] border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono select-none shrink-0">
          <div className="flex items-center gap-2 text-slate-400">
            <Command className="w-3.5 h-3.5 text-primary" />
            <span className="text-slate-300 font-semibold">Suggested commands:</span>
            <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
              {commonCommands.map((cmd) => (
                <span
                  key={cmd}
                  className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-slate-300 text-[10px] font-mono hover:border-primary/40 hover:text-primary transition-colors cursor-default"
                >
                  {cmd}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-[10px]">
            <span className="hidden md:inline">Click inside terminal to type commands</span>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1 font-semibold"
            >
              <Sparkles className="w-3 h-3" /> Standalone Site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
