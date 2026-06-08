import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Pill, ProgressBar, Section } from "@/components/ui-bits";
import { todayTasks, quickWins, student } from "@/lib/mock-data";
import { CheckCircle2, Circle, Coffee, Moon, Sun, Sparkles, Clock } from "lucide-react";

export const Route = createFileRoute("/today")({
  head: () => ({ meta: [{ title: "Today | AdmitOS" }] }),
  component: TodayPage,
});

function TodayPage() {
  const date = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  const blocks = [
    { icon: Coffee, label: "Morning", time: "8:00 – 10:30", task: "Deep work: NYU 'Why Us' final revision", color: "warning" },
    { icon: Sun, label: "Afternoon", time: "1:00 – 3:00", task: "CSS Profile parent income + tax docs", color: "info" },
    { icon: Moon, label: "Night", time: "8:00 – 9:00", task: "SAT Reading practice (35 min) + reflection", color: "primary" },
  ];

  return (
    <AppShell title="Today" subtitle={date}>
      <div className="relative overflow-hidden rounded-3xl gradient-hero p-7 text-primary-foreground shadow-floating mb-6">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <div className="text-xs uppercase tracking-[0.18em] opacity-80 flex items-center gap-2"><Sparkles className="h-3.5 w-3.5" /> Daily Execution Mode</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold leading-tight">3 tasks. 2 hours of deep work. One closer to NYU.</h2>
          <p className="mt-3 opacity-90">Focus on what compounds. Everything else can wait until tomorrow.</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <Pill tone="default"><Clock className="h-3 w-3" /> Est. 2h 20m</Pill>
            <Pill tone="default">Streak {student.streak} 🔥</Pill>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Section title="Top 3 Tasks" subtitle="Ranked by impact × urgency" className="lg:col-span-2">
          <div className="space-y-3">
            {todayTasks.map((t, i) => (
              <div key={t.id} className="flex items-center gap-4 rounded-xl border border-border bg-surface-elevated p-4 hover:border-primary/40 transition">
                <button className="text-muted-foreground hover:text-primary"><Circle className="h-5 w-5" /></button>
                <div className="grid h-8 w-8 place-items-center rounded-lg gradient-primary text-primary-foreground text-xs font-semibold">{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{t.title}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <Pill tone="primary">{t.time}</Pill>
                    <Pill tone="info">{t.impact} impact</Pill>
                    <Pill tone="muted">P{t.priority}</Pill>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Quick Wins" subtitle="Under 10 minutes each">
          <div className="space-y-2">
            {quickWins.map((q, i) => (
              <button key={i} className="w-full flex items-center gap-2.5 rounded-lg border border-border bg-surface-elevated px-3 py-2.5 text-sm text-left hover:border-primary/40 transition">
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                <span className="flex-1">{q}</span>
              </button>
            ))}
          </div>
        </Section>

        <Section title="Deep Work Blocks" className="lg:col-span-2">
          <div className="space-y-3">
            {blocks.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.label} className="flex items-center gap-4 rounded-xl border border-border bg-surface-elevated p-4">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{b.label} · {b.time}</div>
                    <div className="text-sm font-medium mt-0.5">{b.task}</div>
                  </div>
                  <Pill tone={b.color as any}>Focus</Pill>
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="Daily Reflection">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">What did I complete?</label>
              <textarea className="mt-1.5 w-full rounded-lg border border-border bg-surface-elevated p-3 text-sm outline-none focus:border-primary/50" rows={2} placeholder="Wrapped Common App personal statement…" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">What is blocked?</label>
              <textarea className="mt-1.5 w-full rounded-lg border border-border bg-surface-elevated p-3 text-sm outline-none focus:border-primary/50" rows={2} placeholder="Waiting on Dr. Patel rec…" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">What's next?</label>
              <textarea className="mt-1.5 w-full rounded-lg border border-border bg-surface-elevated p-3 text-sm outline-none focus:border-primary/50" rows={2} placeholder="MIT Maker portfolio draft…" />
            </div>
            <div className="rounded-xl bg-secondary p-3">
              <div className="text-xs font-medium text-muted-foreground">Today's progress</div>
              <div className="mt-2"><ProgressBar value={42} /></div>
              <div className="mt-2 text-xs text-muted-foreground">1 of 3 tasks complete · +120 XP earned</div>
            </div>
          </div>
        </Section>
      </div>
    </AppShell>
  );
}
