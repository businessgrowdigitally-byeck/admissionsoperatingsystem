import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Pill, Section, StatCard } from "@/components/ui-bits";
import { recommendations } from "@/lib/mock-data";
import { Mail, CheckCircle2, Clock, Heart, Plus, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/recommendations")({
  head: () => ({ meta: [{ title: "Recommendations — NYU Application OS" }] }),
  component: RecsPage,
});

function RecsPage() {
  const submitted = recommendations.filter((r) => r.submitted).length;
  return (
    <AppShell title="Recommendation Letter Hub">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <StatCard label="Recommenders" value={recommendations.length} icon={<Mail className="h-4 w-4 text-primary" />} />
        <StatCard label="Accepted" value={recommendations.filter((r) => r.accepted).length} accent="info" />
        <StatCard label="Submitted" value={submitted} accent="success" />
        <StatCard label="Pending Thanks" value={recommendations.filter((r) => r.submitted && !r.thanked).length} accent="warning" />
      </div>

      <Section title="Recommenders" action={<button className="flex items-center gap-1.5 rounded-lg gradient-primary text-primary-foreground px-3 py-1.5 text-xs font-medium"><Plus className="h-3.5 w-3.5" /> Add</button>}>
        <div className="space-y-3">
          {recommendations.map((r) => (
            <div key={r.id} className="rounded-xl border border-border bg-surface-elevated p-4">
              <div className="flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl gradient-primary text-primary-foreground text-sm font-semibold shrink-0">{r.teacher.split(" ").map((p) => p[0]).join("").slice(0, 2)}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="text-sm font-semibold">{r.teacher}</div>
                    <Pill tone="muted">{r.subject}</Pill>
                    <Pill tone="primary">
                      <Heart className="h-3 w-3 fill-current" /> {r.strength}/5 rapport
                    </Pill>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><Mail className="h-3 w-3" /> {r.email}</div>
                </div>
                <div className="hidden md:flex gap-1.5">
                  <StatusDot label="Requested" on={r.requested} />
                  <StatusDot label="Accepted" on={r.accepted} />
                  <StatusDot label="Submitted" on={r.submitted} />
                  <StatusDot label="Thanked" on={r.thanked} />
                </div>
                <button className="rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium hover:border-primary/40">
                  <MessageSquare className="h-3.5 w-3.5 inline mr-1" /> Follow up
                </button>
              </div>
              <div className="mt-3 md:hidden flex flex-wrap gap-1.5">
                <StatusDot label="Requested" on={r.requested} />
                <StatusDot label="Accepted" on={r.accepted} />
                <StatusDot label="Submitted" on={r.submitted} />
                <StatusDot label="Thanked" on={r.thanked} />
              </div>
            </div>
          ))}
        </div>
      </Section>
    </AppShell>
  );
}

function StatusDot({ label, on }: { label: string; on: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${on ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
      {on ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />} {label}
    </div>
  );
}
