import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Pill, ProgressBar, Section, StatCard } from "@/components/ui-bits";
import { finAidItems } from "@/lib/mock-data";
import { Wallet, CheckCircle2, Clock, FileCheck, AlertCircle, Plus } from "lucide-react";

export const Route = createFileRoute("/financial-aid")({
  head: () => ({ meta: [{ title: "Financial Aid — NYU Application OS" }] }),
  component: FAPage,
});

const toneFor = (s: string) =>
  s === "complete" || s === "submitted" ? "success" : s === "review" ? "info" : s === "in_progress" ? "warning" : "muted";

const labelFor = (s: string) =>
  ({ not_started: "Not Started", in_progress: "In Progress", review: "Awaiting Review", complete: "Verified", submitted: "Submitted" } as any)[s];

function FAPage() {
  const complete = finAidItems.filter((f) => f.status === "complete" || f.status === "submitted").length;
  const pct = Math.round((complete / finAidItems.length) * 100);
  return (
    <AppShell title="Financial Aid Center" subtitle="FAFSA · CSS · Scholarships">
      <div className="relative overflow-hidden rounded-3xl gradient-hero p-7 text-primary-foreground shadow-floating mb-6">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <div className="text-xs uppercase tracking-[0.18em] opacity-80">Financial Readiness</div>
          <div className="mt-2 flex items-end gap-3">
            <div className="text-5xl font-semibold tabular-nums">{pct}%</div>
            <div className="pb-2 opacity-80 text-sm">{complete} of {finAidItems.length} forms complete</div>
          </div>
          <p className="mt-3 opacity-90">FAFSA & CSS Profile both due in 21 days. Block 90 minutes Saturday to finalize.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <StatCard label="Forms" value={finAidItems.length} icon={<Wallet className="h-4 w-4 text-primary" />} />
        <StatCard label="Submitted" value={complete} accent="success" />
        <StatCard label="In Progress" value={finAidItems.filter((f) => f.status === "in_progress").length} accent="warning" />
        <StatCard label="Not Started" value={finAidItems.filter((f) => f.status === "not_started").length} accent="destructive" />
      </div>

      <Section title="Forms & Documents" action={<button className="flex items-center gap-1.5 rounded-lg gradient-primary text-primary-foreground px-3 py-1.5 text-xs font-medium"><Plus className="h-3.5 w-3.5" /> Add</button>}>
        <div className="space-y-2">
          {finAidItems.map((f) => (
            <div key={f.id} className="grid grid-cols-12 items-center gap-3 rounded-xl border border-border bg-surface-elevated px-4 py-3">
              <div className="col-span-1">
                {f.status === "complete" || f.status === "submitted" ? <CheckCircle2 className="h-4 w-4 text-success" /> : f.status === "in_progress" ? <Clock className="h-4 w-4 text-warning" /> : <AlertCircle className="h-4 w-4 text-destructive" />}
              </div>
              <div className="col-span-7 md:col-span-6 min-w-0">
                <div className="text-sm font-medium truncate">{f.name}</div>
                <div className="text-xs text-muted-foreground">Due {f.due}</div>
              </div>
              <div className="col-span-4 md:col-span-3"><Pill tone={toneFor(f.status) as any}>{labelFor(f.status)}</Pill></div>
              <div className="hidden md:flex col-span-2 justify-end gap-2">
                <button className="rounded-lg border border-border px-2.5 py-1 text-xs font-medium hover:border-primary/40">Open</button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="h-5" />

      <Section title="Scholarship Pipeline">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { name: "Coca-Cola Scholars", amount: "$20,000", status: "Semifinalist", tone: "success" },
            { name: "QuestBridge National", amount: "Full Ride", status: "Submitted", tone: "info" },
            { name: "Gates Scholarship", amount: "Full Ride", status: "Drafting", tone: "warning" },
          ].map((s) => (
            <div key={s.name} className="rounded-xl border border-border bg-surface-elevated p-4">
              <div className="text-sm font-semibold">{s.name}</div>
              <div className="text-2xl font-semibold mt-1 gradient-text">{s.amount}</div>
              <div className="mt-2"><Pill tone={s.tone as any}>{s.status}</Pill></div>
            </div>
          ))}
        </div>
      </Section>
    </AppShell>
  );
}
