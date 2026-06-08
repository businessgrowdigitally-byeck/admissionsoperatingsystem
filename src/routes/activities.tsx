import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Pill, ProgressBar, Section, StatCard } from "@/components/ui-bits";
import { activities, honors } from "@/lib/mock-data";
import { Award, Plus, Trophy, Users, Clock } from "lucide-react";

export const Route = createFileRoute("/activities")({
  head: () => ({ meta: [{ title: "Activities — NYU Application OS" }] }),
  component: ActivitiesPage,
});

function ActivitiesPage() {
  const totalHours = activities.reduce((a, x) => a + x.hoursPerWeek * x.weeksPerYear, 0);
  return (
    <AppShell title="Activities & Honors" subtitle="Common App master database">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <StatCard label="Activities" value={activities.length} sublabel="of 10 allowed" icon={<Users className="h-4 w-4 text-primary" />} />
        <StatCard label="Honors" value={honors.length} sublabel="of 5 allowed" icon={<Trophy className="h-4 w-4 text-warning" />} accent="warning" />
        <StatCard label="Total Hours" value={totalHours.toLocaleString()} sublabel="across all years" icon={<Clock className="h-4 w-4 text-info" />} accent="info" />
        <StatCard label="Leadership Score" value="84" sublabel="elite tier" accent="success" />
      </div>

      <Section title="Activities" subtitle="Ranked by impact" action={<button className="flex items-center gap-1.5 rounded-lg gradient-primary text-primary-foreground px-3 py-1.5 text-xs font-medium"><Plus className="h-3.5 w-3.5" /> Add</button>}>
        <div className="space-y-3">
          {activities.map((a, i) => (
            <div key={a.id} className="rounded-xl border border-border bg-surface-elevated p-4">
              <div className="flex items-start gap-4">
                <div className="grid h-9 w-9 place-items-center rounded-lg gradient-primary text-primary-foreground text-xs font-semibold shrink-0">{i + 1}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="text-sm font-semibold">{a.name}</div>
                    <Pill tone="primary">{a.category}</Pill>
                    <Pill tone="muted">{a.position}</Pill>
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">{a.shortDesc}</p>
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div><div className="text-muted-foreground">Hrs/wk</div><div className="font-semibold tabular-nums">{a.hoursPerWeek}</div></div>
                    <div><div className="text-muted-foreground">Wks/yr</div><div className="font-semibold tabular-nums">{a.weeksPerYear}</div></div>
                    <div><div className="text-muted-foreground">Grades</div><div className="font-semibold tabular-nums">{a.grades}</div></div>
                    <div><div className="text-muted-foreground">Org</div><div className="font-medium truncate">{a.organization}</div></div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1"><span className="text-muted-foreground">Impact</span><span className="font-semibold tabular-nums">{a.impact}</span></div>
                      <ProgressBar value={a.impact} tone="primary" />
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1"><span className="text-muted-foreground">Leadership</span><span className="font-semibold tabular-nums">{a.leadership}</span></div>
                      <ProgressBar value={a.leadership} tone="success" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="h-5" />

      <Section title="Honors & Awards" action={<button className="flex items-center gap-1.5 rounded-lg gradient-primary text-primary-foreground px-3 py-1.5 text-xs font-medium"><Plus className="h-3.5 w-3.5" /> Add</button>}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {honors.map((h) => (
            <div key={h.id} className="flex items-start gap-3 rounded-xl border border-border bg-surface-elevated p-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-warning/15 text-warning shrink-0"><Award className="h-5 w-5" /></div>
              <div className="min-w-0">
                <div className="text-sm font-semibold">{h.award}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{h.desc}</div>
                <div className="mt-2 flex gap-1.5"><Pill tone={h.level === "National" || h.level === "International" ? "primary" : "info"}>{h.level}</Pill><Pill tone="muted">{h.year}</Pill></div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </AppShell>
  );
}
