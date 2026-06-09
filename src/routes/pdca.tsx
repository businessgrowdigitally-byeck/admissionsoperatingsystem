import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Pill, Section, ProgressBar } from "@/components/ui-bits";
import { getPdcaData } from "@/lib/pdca-engine";
import { 
  Sparkles, Target, Zap, ShieldAlert, Award, Calendar, Compass, 
  ArrowUpRight, CheckCircle2, AlertTriangle, ArrowRight, RotateCw 
} from "lucide-react";
import { getGeminiPrioritizationAdvice } from "@/lib/api/gemini.functions";

export const Route = createFileRoute("/pdca")({
  head: () => ({ meta: [{ title: "PDCA Center | AdmitOS" }] }),
  component: PdcaPage,
});

function PdcaPage() {
  const data = getPdcaData();
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAskAI = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getGeminiPrioritizationAdvice({
        data: {
          studentName: "Alex Chen",
          targetMajor: "Computer Science & Economics",
          bottlenecks: data.check.bottlenecks.map(b => b.title),
          criticalTasks: data.act.priority_updates.map(t => t.title)
        }
      });
      if (result.success && result.text) {
        setAiResponse(result.text);
      } else {
        setError(result.error || "Failed to generate suggestions. Ensure GEMINI_API_KEY is configured in your .env file.");
      }
    } catch (err: any) {
      setError("Failed to reach server. Make sure the server environment is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell 
      title="PDCA Center" 
      subtitle="Plan-Do-Check-Act continuous optimization loop for your admissions cycle"
    >
      {/* Intro Hero */}
      <div className="relative overflow-hidden rounded-3xl gradient-hero p-7 text-primary-foreground shadow-floating mb-6">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <div className="text-xs uppercase tracking-[0.18em] opacity-80 flex items-center gap-2">
            <RotateCw className="h-4 w-4 animate-spin-slow" /> Continuous Optimization Engine
          </div>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold leading-tight">
            Plan. Do. Check. Act. <br />Iterate your way into elite universities.
          </h2>
          <p className="mt-3 opacity-90 text-sm">
            AdmitOS scans your active timeline and execution metrics, outputting data-driven retrospectives and corrective plans automatically.
          </p>
        </div>
      </div>

      {/* AI Strategy Consultant */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-elegant mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold tracking-tight flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-primary shrink-0" /> AI Strategy Consultant
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Query Gemini 1.5 Flash to generate an optimization plan based on your current metrics.
            </p>
          </div>
          <button
            onClick={handleAskAI}
            disabled={loading}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl gradient-primary text-primary-foreground px-4 py-2 text-xs font-semibold shadow-elegant hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? "Consulting AI..." : "Consult Gemini AI"} <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold">Gemini API Connection Note</div>
              <div className="mt-0.5">{error}</div>
            </div>
          </div>
        )}

        {aiResponse && (
          <div className="mt-4 p-4 rounded-xl bg-accent/40 border border-border flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="text-xs text-foreground leading-relaxed whitespace-pre-line">
              <div className="font-semibold text-primary uppercase text-[10px] tracking-wider mb-1">Gemini AI Recommendations:</div>
              {aiResponse}
            </div>
          </div>
        )}
      </div>

      {/* 2x2 Grid of the PDCA Loop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* PLAN */}
        <Section 
          title="PLAN — Establish Goals & Targets" 
          subtitle="Your academic baselines and target list"
          action={<Pill tone="primary">Planning Phase</Pill>}
        >
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Meta Target Milestones</h4>
              <div className="grid grid-cols-2 gap-3">
                {data.plan.goals.map((g) => (
                  <div key={g.label} className="rounded-xl border border-border bg-surface-elevated p-3">
                    <div className="text-[10px] uppercase text-muted-foreground">{g.label}</div>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-lg font-bold">{g.current}</span>
                      <span className="text-[10px] text-muted-foreground">target {g.target}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Upcoming Deadlines</h4>
              <div className="space-y-2">
                {data.plan.deadlines.map((d) => (
                  <div key={d.task} className="flex justify-between items-center text-xs p-2 rounded-lg bg-surface-elevated border border-border/60">
                    <span className="font-medium truncate">{d.task}</span>
                    <Pill tone={d.daysOut <= 7 ? "destructive" : "muted"}>in {d.daysOut}d</Pill>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* DO */}
        <Section 
          title="DO — Execution & Task Status" 
          subtitle="Tactical focus for today's sprints"
          action={<Pill tone="warning">Execution Phase</Pill>}
        >
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Today's Focus priorities</h4>
              <div className="space-y-2">
                {data.do.tasks.map((t, i) => (
                  <div key={t.title} className="flex items-center gap-2.5 text-xs p-2.5 rounded-lg bg-surface-elevated border border-border/60">
                    <div className="grid h-5 w-5 place-items-center rounded bg-primary/10 text-primary font-bold text-[10px]">{i + 1}</div>
                    <span className="flex-1 font-medium truncate">{t.title}</span>
                    <span className="text-[10px] text-muted-foreground">{t.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-secondary/30 p-3.5 border border-border">
              <div className="text-xs font-semibold text-primary flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Active Sprint Tracker
              </div>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {data.do.progress.value}. Execute these high-leverage tasks to unblock university applications.
              </p>
            </div>
          </div>
        </Section>

        {/* CHECK */}
        <Section 
          title="CHECK — Analyze Metrics & Gargalos" 
          subtitle="Evaluation of velocity and risk factors"
          action={<Pill tone="destructive">Check Phase</Pill>}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {data.check.weekly_metrics.map((m) => (
                <div key={m.label} className="rounded-xl border border-border bg-surface-elevated p-2 text-center">
                  <div className="text-[9px] uppercase text-muted-foreground truncate">{m.label}</div>
                  <div className="mt-1 text-base font-bold tabular-nums">{m.value}</div>
                  {m.change && <div className="text-[8px] text-success font-medium mt-0.5">{m.change}</div>}
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Unresolved Blockers (Gargalos)</h4>
              <div className="space-y-2">
                {data.check.bottlenecks.slice(0, 2).map((b) => (
                  <div key={b.title} className="p-3 rounded-lg bg-destructive/5 border border-destructive/15 text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-destructive truncate">{b.title}</span>
                      <Pill tone="destructive">Impact: {b.impact_score}</Pill>
                    </div>
                    <p className="text-[11px] text-muted-foreground line-clamp-1">{b.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ACT */}
        <Section 
          title="ACT — Strategy Adjustments" 
          subtitle="Improvement path and ROI prioritization updates"
          action={<Pill tone="success">Act Phase</Pill>}
        >
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Tactical Priority Updates</h4>
              <div className="space-y-2">
                {data.act.priority_updates.slice(0, 2).map((t) => (
                  <div key={t.title} className="flex justify-between items-center text-xs p-2 rounded-lg bg-surface-elevated border border-border/60">
                    <span className="font-medium truncate">{t.title}</span>
                    <Pill tone="success">ROI: {t.roi_score}</Pill>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Actionable Improvements</h4>
              <div className="space-y-2">
                {data.act.improvement_suggestions.map((imp, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] text-muted-foreground leading-normal">
                    <ArrowRight className="h-3 w-3 text-success shrink-0 mt-0.5" />
                    <span>{imp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* AUTOMATIC WEEKLY RETROSPECTIVE */}
      <Section 
        title="Weekly Retrospective & Strategic Reflection" 
        subtitle="Automatically generated summary of the past 7 days"
        className="mb-8"
        action={<Pill tone="info"><Sparkles className="h-3 w-3" /> Auto-Generated</Pill>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          
          {/* WINS */}
          <div className="rounded-2xl border border-border/80 bg-surface-elevated p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-success mb-3">
                <CheckCircle2 className="h-4 w-4" /> Weekly Wins
              </div>
              <ul className="space-y-2.5">
                {data.retro.wins.map((w, idx) => (
                  <li key={idx} className="text-xs text-muted-foreground leading-normal flex items-start gap-1.5">
                    <span className="text-success font-semibold">•</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* MISSED GOALS & ROOT CAUSES */}
          <div className="rounded-2xl border border-border/80 bg-surface-elevated p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-destructive mb-3">
                <AlertTriangle className="h-4 w-4" /> Missed Goals & Root Causes
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Gaps</div>
                  <ul className="space-y-1.5">
                    {data.retro.missed_goals.map((mg, idx) => (
                      <li key={idx} className="text-[11px] text-muted-foreground leading-normal">
                        <span className="text-destructive font-semibold mr-1.5">•</span>{mg}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-border pt-2">
                  <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Root Cause Analysis</div>
                  <ul className="space-y-1.5">
                    {data.retro.root_causes.map((rc, idx) => (
                      <li key={idx} className="text-[11px] text-muted-foreground leading-normal italic">
                        "{rc}"
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* STRATEGIC IMPROVEMENTS */}
          <div className="rounded-2xl border border-border/80 bg-surface-elevated p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-warning mb-3">
                <Zap className="h-4 w-4" /> Recommended Adjustments
              </div>
              <ul className="space-y-2.5">
                {data.retro.improvements.map((imp, idx) => (
                  <li key={idx} className="text-xs text-muted-foreground leading-normal flex items-start gap-1.5">
                    <span className="text-warning font-semibold">•</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* NEXT WEEK ACTION PLAN */}
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-3">
                <Target className="h-4 w-4" /> Next Week Action Plan
              </div>
              <ul className="space-y-2.5">
                {data.retro.next_week_action_plan.map((ap, idx) => (
                  <li key={idx} className="text-xs text-muted-foreground leading-normal flex items-start gap-1.5">
                    <span className="text-primary font-semibold">{idx + 1}.</span>
                    <span>{ap}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-border/40">
              <Link to="/today" className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl gradient-primary text-primary-foreground py-2 text-xs font-semibold shadow-elegant hover:scale-[1.01] transition-transform">
                Enter Execution Mode <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </Section>
    </AppShell>
  );
}
