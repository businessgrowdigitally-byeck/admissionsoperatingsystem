import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Pill, Section } from "@/components/ui-bits";
import { getCriticalPathTasks } from "@/lib/critical-path-engine";
import { Sparkles, Target, Zap, ShieldAlert, Award, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/war-room")({
  head: () => ({ meta: [{ title: "War Room | AdmitOS" }] }),
  component: WarRoomPage,
});

function WarRoomPage() {
  const tasks = getCriticalPathTasks();

  return (
    <AppShell 
      title="War Room" 
      subtitle="Critical Path prioritization engine for maximum admission return on effort"
    >
      <div className="relative overflow-hidden rounded-3xl gradient-hero p-7 text-primary-foreground shadow-floating mb-6">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <div className="text-xs uppercase tracking-[0.18em] opacity-80 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4" /> Tactical Execution Center
          </div>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold leading-tight">
            Prioritize by ROI. <br />Execute on what unlocks admissions doors.
          </h2>
          <p className="mt-3 opacity-90 text-sm md:text-base">
            This dashboard dynamically computes task ROI (Impact ÷ Effort) and downstream dependencies. Focus on the top cards first to compound your progress.
          </p>
        </div>
      </div>

      <Section 
        title="Highest Leverage Actions" 
        subtitle="Ranked by computed ROI score (Impact / Effort)"
        action={<Pill tone="primary">Real-time Prioritization</Pill>}
      >
        <div className="space-y-4">
          {tasks.map((t) => {
            // High ROI (> 1.5) gets success/green border, medium warning, etc.
            const roiTone = t.roi_score >= 2.0 ? "success" : t.roi_score >= 1.2 ? "primary" : "muted";
            
            return (
              <div 
                key={t.title} 
                className="rounded-xl border border-border bg-surface-elevated p-4 flex flex-col md:flex-row gap-4 justify-between items-start hover:border-primary/40 hover:shadow-elegant transition"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold tracking-tight text-foreground">{t.title}</span>
                    <Pill tone={roiTone}>ROI: {t.roi_score}</Pill>
                    <Pill tone="default">Est. Time: {t.estimated_time}</Pill>
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    Provides an impact rating of <span className="font-semibold text-foreground">{t.impact_score}/100</span> with an effort score of <span className="font-semibold text-foreground">{t.effort_score}/100</span>.
                  </p>
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-accent/30 px-3 py-1.5 border border-border/50 max-w-xl">
                    <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span className="text-xs font-medium text-foreground">
                      <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider mr-1">Unlocks:</span>
                      {t.unlocked_tasks}
                    </span>
                  </div>
                </div>
                
                <div className="flex md:flex-col items-end justify-between w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-border md:text-right gap-2">
                  <div className="flex flex-row md:flex-col justify-between w-full md:w-auto md:text-right">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Dependencies Unlocked</div>
                    <div className="text-xs font-semibold tabular-nums text-foreground mt-0.5">
                      {t.unlocked_tasks_count} {t.unlocked_tasks_count === 1 ? 'task' : 'tasks'}
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col justify-between w-full md:w-auto md:text-right">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Priority Rating</div>
                    <div className="text-xs font-semibold text-primary mt-0.5">
                      {t.roi_score >= 2.0 ? 'CRITICAL' : t.roi_score >= 1.2 ? 'HIGH' : 'STANDARD'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </AppShell>
  );
}
