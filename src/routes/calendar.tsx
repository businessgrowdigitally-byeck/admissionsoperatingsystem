import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Pill, Section } from "@/components/ui-bits";
import { upcomingDeadlines } from "@/lib/mock-data";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

export const Route = createFileRoute("/calendar")({
  head: () => ({ meta: [{ title: "Calendar — NYU Application OS" }] }),
  component: CalendarPage,
});

const CATEGORY_COLOR: Record<string, string> = {
  Essay: "#8B5CF6",
  Application: "#1E3A8A",
  Testing: "#10B981",
  "Financial Aid": "#F59E0B",
  Urgent: "#EF4444",
};

function CalendarPage() {
  // Render November 2025
  const year = 2025, month = 10; // Nov (0-indexed)
  const first = new Date(year, month, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const eventsByDay = upcomingDeadlines.reduce<Record<number, typeof upcomingDeadlines>>((acc, d) => {
    const date = new Date(d.due);
    if (date.getFullYear() === year && date.getMonth() === month) {
      const day = date.getDate();
      (acc[day] ||= []).push(d);
    }
    return acc;
  }, {});

  return (
    <AppShell title="Application Calendar" subtitle="November 2025 · Crunch month">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {["Month", "Week", "Day", "Agenda"].map((v, i) => (
            <button key={v} className={`px-3 py-1.5 text-xs font-medium rounded-lg ${i === 0 ? "bg-primary text-primary-foreground shadow-elegant" : "border border-border bg-surface-elevated"}`}>{v}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-surface-elevated"><ChevronLeft className="h-4 w-4" /></button>
          <div className="text-sm font-semibold tracking-tight">November 2025</div>
          <button className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-surface-elevated"><ChevronRight className="h-4 w-4" /></button>
        </div>
        <div className="hidden md:flex items-center gap-3 text-xs">
          {Object.entries(CATEGORY_COLOR).map(([k, v]) => (
            <div key={k} className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-sm" style={{ background: v }} /> {k}</div>
          ))}
        </div>
      </div>

      <Section title="" subtitle="" className="p-0">
        <div className="grid grid-cols-7 border-b border-border text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="px-3 py-2 border-r border-border last:border-0">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((d, i) => {
            const events = d ? eventsByDay[d] ?? [] : [];
            const isToday = d === 25; // mock today = Oct 25; show none, but keep highlight on Nov 1
            const isHot = d === 1;
            return (
              <div key={i} className={`min-h-[110px] border-r border-b border-border last:border-r-0 p-2 ${isHot ? "bg-destructive/5" : ""}`}>
                <div className={`text-xs font-semibold tabular-nums ${isHot ? "text-destructive" : "text-muted-foreground"}`}>{d ?? ""}</div>
                <div className="mt-1.5 space-y-1">
                  {events.slice(0, 3).map((e) => (
                    <div key={e.id} className="rounded-md px-1.5 py-0.5 text-[10px] font-medium text-white truncate" style={{ background: CATEGORY_COLOR[e.category] ?? "#57068C" }}>
                      {e.task}
                    </div>
                  ))}
                  {events.length > 3 && <div className="text-[10px] text-muted-foreground">+{events.length - 3} more</div>}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <div className="h-5" />
      <Section title="Agenda" subtitle="Next 14 days">
        <div className="space-y-2">
          {upcomingDeadlines.slice(0, 6).map((d) => (
            <div key={d.id} className="flex items-center gap-3 rounded-xl border border-border bg-surface-elevated px-4 py-3">
              <div className="h-8 w-1 rounded-full" style={{ background: CATEGORY_COLOR[d.category] }} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{d.task}</div>
                <div className="text-xs text-muted-foreground">{d.university} · {d.category}</div>
              </div>
              <div className="text-xs text-muted-foreground tabular-nums">{d.due}</div>
              <Pill tone={d.daysOut <= 14 ? "destructive" : d.daysOut <= 30 ? "warning" : "info"}>in {d.daysOut}d</Pill>
            </div>
          ))}
        </div>
      </Section>
    </AppShell>
  );
}
