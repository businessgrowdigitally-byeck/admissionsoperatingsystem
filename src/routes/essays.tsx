import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Pill, ProgressBar, Section, StatCard } from "@/components/ui-bits";
import { essays, essayColumns } from "@/lib/mock-data";
import { PenLine, Plus, FileText, GripVertical, Sparkles } from "lucide-react";

export const Route = createFileRoute("/essays")({
  head: () => ({ meta: [{ title: "Essays — NYU Application OS" }] }),
  component: EssaysPage,
});

function EssaysPage() {
  const total = essays.length;
  const submitted = essays.filter((e) => e.status === "Submitted").length;
  const ready = essays.filter((e) => e.status === "Ready").length;
  const wordsWritten = essays.reduce((a, e) => a + e.wordCount, 0);

  return (
    <AppShell title="Essay Command Center" subtitle="Personal · Supplemental · Scholarship">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <StatCard label="Total Essays" value={total} icon={<FileText className="h-4 w-4 text-primary" />} />
        <StatCard label="Ready" value={ready} accent="info" sublabel="Awaiting submit" />
        <StatCard label="Submitted" value={submitted} accent="success" />
        <StatCard label="Words Written" value={wordsWritten.toLocaleString()} accent="warning" />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Drag essays across the pipeline. Auto-saves with version history.
        </div>
        <button className="flex items-center gap-1.5 rounded-xl gradient-primary text-primary-foreground px-3 py-2 text-sm font-medium shadow-elegant"><Plus className="h-4 w-4" /> New Essay</button>
      </div>

      {/* Kanban */}
      <div className="overflow-x-auto -mx-4 md:-mx-8 px-4 md:px-8 pb-4">
        <div className="flex gap-4 min-w-max">
          {essayColumns.map((col) => {
            const items = essays.filter((e) => e.status === col);
            return (
              <div key={col} className="w-72 shrink-0">
                <div className="flex items-center justify-between mb-2 px-1">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <h4 className="text-xs font-semibold uppercase tracking-[0.14em]">{col}</h4>
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums">{items.length}</span>
                </div>
                <div className="rounded-2xl border border-border bg-secondary/40 p-2 min-h-[300px] space-y-2">
                  {items.map((e) => {
                    const pct = (e.wordCount / e.wordLimit) * 100;
                    return (
                      <div key={e.id} className="group rounded-xl border border-border bg-card p-3 shadow-card hover:shadow-elegant hover:border-primary/40 transition cursor-grab">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <Pill tone={e.type === "Personal" ? "primary" : e.type === "Supplemental" ? "info" : e.type === "Scholarship" ? "warning" : "muted"}>{e.university}</Pill>
                            <div className="mt-1.5 text-sm font-semibold leading-tight">{e.title}</div>
                          </div>
                          <GripVertical className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
                        </div>
                        <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{e.prompt}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex-1"><ProgressBar value={pct} tone={pct >= 95 ? "success" : pct >= 50 ? "primary" : "warning"} /></div>
                          <div className="text-[11px] tabular-nums text-muted-foreground">{e.wordCount}/{e.wordLimit}</div>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                          <span>Due {e.due}</span>
                          <span>{e.type}</span>
                        </div>
                      </div>
                    );
                  })}
                  {items.length === 0 && <div className="grid place-items-center h-24 text-xs text-muted-foreground">Empty</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
