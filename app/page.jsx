"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  GitBranch,
  RefreshCw,
  Zap,
  Copy,
  Tag,
  Check,
  Loader2,
  ChevronDown,
  Terminal,
  ArrowRight,
} from "lucide-react";

// ─── Utility ─────────────────────────────────────────────
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// ─── Copy Button ─────────────────────────────────────────
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all duration-150"
      style={{
        background: copied ? "rgba(16,185,129,0.12)" : "#27272a",
        border: `1px solid ${copied ? "rgba(16,185,129,0.3)" : "#3f3f46"}`,
        color: copied ? "#34d399" : "#a1a1aa",
      }}
    >
      {copied ? (
        <><Check style={{ width: 12, height: 12 }} />Copied!</>
      ) : (
        <><Copy style={{ width: 12, height: 12 }} />Copy</>
      )}
    </button>
  );
}

// ─── Navbar ───────────────────────────────────────────────
function Navbar() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 backdrop-blur-md bg-zinc-950/80">
      <div
        className="max-w-6xl mx-auto px-6"
        style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", height: "64px", gap: "16px" }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image src="/logo.png" alt="GitSay" width={140} height={70} style={{ objectFit: "contain", height: "64px", width: "auto" }} priority />
        </div>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {[{ label: "Tool", id: "tool" }, { label: "Working", id: "how-it-works" }, { label: "Features", id: "features" }].map(({ label, id }) => (
            <button key={id} onClick={() => scrollTo(id)}
              className="px-3.5 py-1.5 text-sm text-zinc-300 font-semibold hover:text-white rounded-md hover:bg-zinc-800/60 transition-all duration-150">
              {label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <a href="https://digitalheroesco.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg text-white transition-all duration-200"
            style={{ background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)", boxShadow: "0 0 16px rgba(168,85,247,0.35), 0 0 0 1px rgba(168,85,247,0.2)", flexShrink: 0 }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 28px rgba(168,85,247,0.6), 0 0 0 1px rgba(168,85,247,0.4)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 16px rgba(168,85,247,0.35), 0 0 0 1px rgba(168,85,247,0.2)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Built for Digital Heroes
          </a>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────
const featurePills = [
  "✓ Conventional Commits",
  "✓ Git Diff Support",
  "✓ 3 Style Variants",
  "✓ Copy in One Click",
];

const sampleCommit = `feat(auth): add password validation to login function

- Throw error when password field is empty
- Prevent unauthenticated form submission`;

function Hero({ onCTA }) {
  return (
    <section className="relative hero-grid overflow-hidden" style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center" }}>
      <div className="hero-glow" />
      <div className="relative w-full max-w-4xl mx-auto px-6 py-16 flex flex-col items-center text-center">

        {/* Badge */}
        <div className="animate-fade-in-up mb-5">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-medium rounded-full border text-zinc-300"
            style={{ borderColor: "rgba(167,139,250,0.35)", background: "rgba(167,139,250,0.05)" }}>
            ✦ AI-Powered Commit Messages
          </span>
        </div>

        {/* Heading */}
        <div className="animate-fade-in-up-delay-1 mb-4">
          <h1 className="font-bold tracking-tight text-white leading-tight" style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.2rem)" }}>
            Stop writing bad commit messages.
          </h1>
          <p className="font-bold tracking-tight leading-tight" style={{ fontSize: "clamp(1.6rem, 3.8vw, 2.7rem)", marginTop: "4px", color: "#71717a" }}>
            Let <span className="text-zinc-200">Git</span><span className="text-violet-400">Say</span> do it for you.
          </p>
        </div>

        {/* Description */}
        <p className="animate-fade-in-up-delay-2 text-zinc-400 max-w-xl leading-relaxed mb-6" style={{ fontSize: "1rem" }}>
          Describe your change or paste a git diff —{" "}
          <span className="text-zinc-200 font-medium">get a perfect conventional commit message in seconds.</span>
        </p>

        {/* Feature pills */}
        <div className="animate-fade-in-up-delay-2 flex flex-wrap items-center justify-center gap-2 mb-7">
          {featurePills.map((pill) => (
            <span key={pill}
              className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border border-zinc-700"
              style={{ background: "#111113", color: pill.startsWith("✓") ? "#a1a1a1" : "white" }}>
              {pill}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="animate-fade-in-up-delay-3 flex flex-col sm:flex-row items-center gap-3 mb-10">
          <button onClick={onCTA}
            className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-xl text-zinc-950 transition-all duration-200"
            style={{ background: "#ffffff", boxShadow: "0 0 0 1px rgba(255,255,255,0.1)" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = "#f0f0f0"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "#ffffff"; }}
          >
            Generate a Commit <ChevronDown className="h-4 w-4" />
          </button>
          <span className="text-sm" style={{ color: "#52525b" }}>Free · No signup · Instant</span>
        </div>

        {/* Sample output preview */}
        <div className="animate-fade-in-up-delay-3 w-full max-w-lg">
          <div className="rounded-xl border border-zinc-800 overflow-hidden text-left" style={{ background: "#0d0d0f" }}>
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800" style={{ background: "#111113" }}>
              <div className="flex gap-1.5">
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#3f3f46" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#3f3f46" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#3f3f46" }} />
              </div>
              <span className="text-xs text-zinc-600 font-mono ml-2">example output</span>
            </div>
            {/* Content */}
            <pre className="px-4 py-3.5 font-mono text-xs leading-relaxed" style={{ color: "#a1a1aa" }}>
              <span style={{ color: "#A78BFA" }}>feat</span>
              <span style={{ color: "#6b7280" }}>(auth)</span>
              <span style={{ color: "#e4e4e7" }}>: Add password validation to login function</span>
              {`\n\n`}
              <span style={{ color: "#4b5563" }}>- Throw error when password field is empty</span>
              {`\n`}
              <span style={{ color: "#4b5563" }}>- Prevent unauthenticated form submission</span>
            </pre>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", opacity: 0.25 }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#71717a", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, #52525b, transparent)" }} />
        </div>
      </div>
    </section>
  );
}

// ─── Tool Section ─────────────────────────────────────────
const COMMIT_TYPES = ["feat", "fix", "docs", "chore", "refactor", "style", "test", "perf", "ci"];

const styleLabels = {
  short:       { label: "Short",       class: "bg-zinc-800 text-zinc-300 border-zinc-700" },
  detailed:    { label: "Detailed",    class: "bg-zinc-800 text-zinc-300 border-zinc-700" },
  descriptive: { label: "Descriptive", class: "bg-zinc-800 text-zinc-300 border-zinc-700" },
  emoji:       { label: "Emoji",       class: "bg-zinc-800 text-zinc-300 border-zinc-700" },
};

function ToolSection() {
  const [mode, setMode] = useState("describe");
  const [input, setInput] = useState("");
  const [commitType, setCommitType] = useState("feat");
  const [scope, setScope] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAlt, setLoadingAlt] = useState(false);
  const [result, setResult] = useState(null);
  const [alternatives, setAlternatives] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("gitsay_history");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  }, []);

  const deleteHistoryItem = (id) => {
    setHistory((prev) => {
      const updated = prev.filter(item => item.id !== id);
      try {
        localStorage.setItem("gitsay_history", JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save history", e);
      }
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem("gitsay_history");
    } catch (e) {
      console.error("Failed to clear history", e);
    }
  };

  const call = async (getAlternatives) => {
    if (!input.trim()) return;
    if (getAlternatives) { setLoadingAlt(true); setAlternatives(null); }
    else { setLoading(true); setResult(null); setAlternatives(null); setError(null); }
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, input, type: commitType, scope, getAlternatives }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate");
      if (getAlternatives) setAlternatives(data.alternatives);
      else {
        setResult(data.primary);
        const newHistoryItem = {
          id: Date.now().toString(),
          message: data.primary,
          timestamp: new Date().toISOString(),
          type: commitType,
          scope: scope || null,
        };
        setHistory((prev) => {
          const updated = [newHistoryItem, ...prev].slice(0, 50);
          try {
            localStorage.setItem("gitsay_history", JSON.stringify(updated));
          } catch (e) {
            console.error("Failed to save history", e);
          }
          return updated;
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      if (getAlternatives) setLoadingAlt(false);
      else setLoading(false);
    }
  };

  return (
    <section id="tool" className="px-6" style={{ paddingTop: "96px", paddingBottom: "96px", borderTop: "1px solid #1c1c1f" }}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#a78bfa" }}>Try it now</p>
          <h2 className="text-2xl font-bold text-white">Generate your commit</h2>
          <p className="text-sm text-zinc-400 mt-1.5">Type what you changed, or paste a git diff</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-zinc-800 overflow-hidden" style={{ background: "#111113" }}>

          {/* Tab bar styled as a top panel */}
          <div className="border-b border-zinc-800 px-5 pt-4">
            <Tabs defaultValue="describe" onValueChange={(v) => { setMode(v); setResult(null); setAlternatives(null); setError(null); }}>
              <TabsList className="h-9 bg-transparent border-0 p-0 gap-0">
                <TabsTrigger value="describe"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent data-[state=active]:text-white text-zinc-500 text-sm px-4 pb-3 pt-0 h-9 font-medium">
                  ✍️ Describe
                </TabsTrigger>
                <TabsTrigger value="diff"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent data-[state=active]:text-white text-zinc-500 text-sm px-4 pb-3 pt-0 h-9 font-medium">
                  📑 Git Diff
                </TabsTrigger>
              </TabsList>

              {/* Textarea area */}
              <div className="pt-4 pb-5">
                <TabsContent value="describe" className="mt-0">
                  <Textarea rows={5} value={input} onChange={(e) => setInput(e.target.value)}
                    placeholder="e.g. Added password validation to the login function, throws error if empty"
                    className="bg-transparent border border-zinc-800 focus:border-zinc-600 text-zinc-100 placeholder:text-zinc-600 text-sm resize-none focus:ring-0 rounded-lg transition-colors w-full" />
                </TabsContent>
                <TabsContent value="diff" className="mt-0 space-y-2">
                  <Textarea rows={5} value={input} onChange={(e) => setInput(e.target.value)}
                    placeholder={"Paste your git diff output here...\n(run `git diff` in your terminal)"}
                    className="bg-transparent border border-zinc-800 focus:border-zinc-600 text-zinc-100 placeholder:text-zinc-600 font-mono text-xs resize-none focus:ring-0 rounded-lg transition-colors w-full" />
                  <p className="text-zinc-500 text-xs flex items-center gap-1.5">
                    <Terminal style={{ width: 12, height: 12 }} />
                    Run <code className="font-mono bg-zinc-900 px-1.5 py-0.5 rounded text-zinc-200 border border-zinc-700">git diff</code> in your terminal
                  </p>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Options + Generate */}
          <div className="px-5 py-4 border-b border-zinc-800 bg-zinc-950/40 flex flex-col gap-3">
            <div className="flex gap-2">
              <Select value={commitType} onValueChange={setCommitType}>
                <SelectTrigger className="w-28 bg-zinc-900 border-zinc-800 text-zinc-100 text-xs h-8 focus:ring-0 focus:border-zinc-700 rounded-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  {COMMIT_TYPES.map((t) => (
                    <SelectItem key={t} value={t} className="text-zinc-300 text-xs focus:bg-zinc-800 focus:text-white">{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input value={scope} onChange={(e) => setScope(e.target.value)} placeholder="scope (optional)"
                className="flex-1 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-700 text-xs h-8 focus:ring-0 focus-visible:ring-0 focus:border-zinc-700 rounded-md" />
            </div>

            <button onClick={() => call(false)} disabled={loading || !input.trim()}
              className="w-full h-10 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-35 disabled:cursor-not-allowed"
              style={{ background: "#ffffff", color: "#09090b" }}
              onMouseEnter={(e) => { if (!loading && input.trim()) e.currentTarget.style.background = "#f0f0f0"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#ffffff"; }}
            >
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" />Generating...</> : "Generate Commit Message"}
            </button>
          </div>

          {/* Output area */}
          <div className="px-5 py-5 space-y-4">

            {/* Error */}
            {error && (
              <div className="animate-fade-in rounded-lg px-4 py-3 text-sm text-red-400 border border-red-900/40 bg-red-950/20">
                {error}
              </div>
            )}

            {/* Empty state */}
            {!result && !error && (
              <div className="text-center py-8">
                <div className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center mx-auto mb-3">
                  <ArrowRight className="h-4 w-4 text-zinc-500" />
                </div>
                <p className="text-xs text-zinc-500">Your commit message will appear here</p>
              </div>
            )}

            {/* Primary result */}
            {result && (
              <div className="animate-fade-in space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Commit Message</span>
                  <span className="flex items-center gap-1 text-xs text-emerald-400">
                    <Check style={{ width: 11, height: 11 }} />Generated
                  </span>
                </div>

                {/* Code block */}
                <div className="rounded-lg border border-zinc-800 overflow-hidden" style={{ background: "#09090b" }}>
                  <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800/60" style={{ background: "#111113" }}>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                    </div>
                    <span className="text-xs text-zinc-500 font-mono">commit message</span>
                    <CopyButton text={result} />
                  </div>
                  <pre className="px-4 py-3.5 font-mono text-sm text-zinc-100 whitespace-pre-wrap break-words leading-relaxed">
                    {result}
                  </pre>
                </div>

                {/* Alternatives trigger */}
                <button onClick={() => call(true)} disabled={loadingAlt}
                  className="flex items-center gap-1.5 text-xs font-medium transition-colors disabled:opacity-40 rounded-md px-1"
                  style={{ paddingTop: "4px", paddingBottom: "4px", color: "#a78bfa" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#c4b5fd"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#a78bfa"; }}
                >
                  {loadingAlt
                    ? <><Loader2 className="h-3.5 w-3.5 animate-spin" />Generating alternatives...</>
                    : <><RefreshCw className="h-3.5 w-3.5" />Generate alternatives</>}
                </button>
              </div>
            )}

            {/* Alternatives */}
            {alternatives && alternatives.length > 0 && (
              <div className="animate-fade-in space-y-2.5 pt-1">
                <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "#a78bfa" }}>Alternatives</p>
                {alternatives.map((alt, i) => {
                  const meta = styleLabels[alt.style] || styleLabels.short;
                  return (
                    <div key={i} className="animate-fade-in rounded-lg border border-zinc-800 overflow-hidden" style={{ animationDelay: `${i * 0.07}s`, background: "#0d0d0f" }}>
                      <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800/60" style={{ background: "#111113" }}>
                        <span className={cn("inline-flex items-center rounded px-2 py-0.5 text-xs font-medium border bg-zinc-800/80 text-zinc-300 border-zinc-700")}>
                          {meta.label}
                        </span>
                        <CopyButton text={alt.message} />
                      </div>
                      <pre className="px-4 py-3 font-mono text-sm text-zinc-200 whitespace-pre-wrap break-words leading-relaxed">
                        {alt.message}
                      </pre>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* History Panel */}
        {history.length > 0 && (
          <div className="mt-8 animate-fade-in rounded-2xl border border-zinc-800 overflow-hidden" style={{ background: "#111113" }}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-zinc-950/40">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">Recent Commits</span>
                <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full font-medium">{history.length}</span>
              </div>
              <button onClick={clearHistory} className="text-xs text-zinc-500 hover:text-red-400 transition-colors font-semibold">
                Clear all
              </button>
            </div>
            <div className="divide-y divide-zinc-800/60 max-h-[320px] overflow-y-auto">
              {history.map((item) => (
                <div key={item.id} className="p-4 flex items-start justify-between gap-4 hover:bg-zinc-950/20 transition-colors group">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-300 border-zinc-700">
                        {item.type}
                      </span>
                      {item.scope && (
                        <span className="text-[10px] font-mono text-zinc-500">
                          ({item.scope})
                        </span>
                      )}
                      <span className="text-[10px] text-zinc-600 font-medium">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <pre className="font-mono text-xs text-zinc-300 break-words whitespace-pre-wrap leading-relaxed">
                      {item.message}
                    </pre>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <CopyButton text={item.message} />
                    <button onClick={() => deleteHistoryItem(item.id)} className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-800/40 rounded-md transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────
const steps = [
  { emoji: "✍️", step: "01", title: "Describe or Diff", description: "Type what you changed in plain English, or paste your raw git diff output." },
  { emoji: "⚡", step: "02", title: "GitSay Generates",  description: "Our AI reads your input and crafts a precise conventional commit message instantly." },
  { emoji: "📑", step: "03", title: "Copy & Commit",     description: "One click to copy. Paste it into your terminal. Done." },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6" style={{ paddingTop: "96px", paddingBottom: "96px", borderTop: "1px solid #1c1c1f" }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#a78bfa" }}>How it works</p>
          <h2 className="text-2xl font-bold text-white">Three steps to a perfect commit</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: "20px", alignItems: "stretch" }}>
              {/* Left: circle + connector */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: "44px" }}>
                <div className="step-card"
                  style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#18181b", border: "1px solid #27272a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>
                  {s.emoji}
                </div>
                {i < steps.length - 1 && (
                  <div style={{ width: "1px", flex: 1, minHeight: "28px", marginTop: "4px", marginBottom: "4px", background: "linear-gradient(to bottom, #27272a, #18181b)" }} />
                )}
              </div>

              {/* Right: content */}
              <div style={{ flex: 1, paddingBottom: i < steps.length - 1 ? "16px" : "0" }}>
                <div className="step-card rounded-xl p-5 border border-zinc-800 hover:border-zinc-700 transition-colors"
                  style={{ background: "#18181b" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span className="font-mono text-xs font-bold" style={{ letterSpacing: "0.1em", color: "#a78bfa" }}>{s.step}</span>
                    <h3 className="font-semibold text-white" style={{ fontSize: "15px" }}>{s.title}</h3>
                  </div>
                  <p className="text-zinc-400 leading-relaxed" style={{ fontSize: "14px" }}>{s.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features Grid ────────────────────────────────────────
const features = [
  { icon: GitBranch, title: "Conventional Commits", desc: "Follows the industry standard format — feat, fix, chore, and more." },
  { icon: Sparkles,  title: "Git Diff Mode",        desc: "Paste raw git diff output and let GitSay read your actual code changes." },
  { icon: RefreshCw, title: "Multiple Alternatives", desc: "Get short, detailed, and descriptive variants with one click." },
  { icon: Zap,       title: "Instant & Free",        desc: "Powered by ultra-fast inference. No signup, no cost. Instant Delivery." },
  { icon: Copy,      title: "Copy in One Click",     desc: "Copy any commit message to clipboard instantly with visual confirmation." },
  { icon: Tag,       title: "Scope & Type Control",  desc: "Select your commit type and scope for perfectly structured messages every time." },
];

function FeaturesGrid() {
  return (
    <section id="features" className="px-6" style={{ paddingTop: "96px", paddingBottom: "96px", borderTop: "1px solid #1c1c1f" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#a78bfa" }}>Features</p>
          <h2 className="text-3xl font-bold text-white mb-3">Everything you need</h2>
          <p className="text-zinc-400 max-w-md mx-auto" style={{ fontSize: "15px" }}>Purpose-built for developers who care about clean git history.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="feature-card rounded-xl p-6 border border-zinc-800" style={{ background: "#111113" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                  <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: "#1c1c1f", border: "1px solid #27272a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon style={{ width: "15px", height: "15px", color: "#a1a1aa" }} />
                  </div>
                  <h3 className="font-semibold text-white text-sm">{f.title}</h3>
                </div>
                <p className="text-zinc-400 leading-relaxed" style={{ fontSize: "13px" }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-zinc-800 px-6" style={{ paddingTop: "28px", paddingBottom: "28px" }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-zinc-500"><span className="text-white">Git</span><span className="text-violet-400">Say</span> - Built for developers who care about clean git history</p>
        <p className="text-sm text-zinc-500">
          made by <span className="text-zinc-400">Purav Kumar  ·</span>
          <a href="mailto:puravkumaryadav@email.com" className="hover:text-violet-400 transition-colors">  puravkumaryadav@gmail.com</a>
        </p>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────
export default function Home() {
  const scrollToTool = () => {
    const el = document.getElementById("tool");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#09090b" }}>
      <Navbar />
      <Hero onCTA={scrollToTool} />
      <ToolSection />
      <HowItWorks />
      <FeaturesGrid />
      <Footer />
    </main>
  );
}
