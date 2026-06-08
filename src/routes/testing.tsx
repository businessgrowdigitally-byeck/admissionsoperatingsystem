import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Pill, ProgressBar, Section, StatCard } from "@/components/ui-bits";
import { satScores, detScores, student } from "@/lib/mock-data";
import { Target, TrendingUp, Calendar, Plus } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/testing")({
  head: () => ({ meta: [{ title: "Testing — NYU Application OS" }] }),
  component: TestingPage,
});

function TestingPage() {
  const satGap = student.satGoal - student.satCurrent;
  const detGap = student.detGoal - student.detCurrent;

  return (
    <AppShell title="SAT / DET Command Center" subtitle="Track scores, weaknesses, and projection">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <StatCard label="SAT — Current" value={student.satCurrent} sublabel={`Goal ${student.satGoal} · ${satGap > 0 ? `+${satGap} to go` : "Goal hit"}`} icon={<Target className="h-4 w-4 text-primary" />} />
        <StatCard label="DET — Current" value={student.detCurrent} sublabel={`Goal ${student.detGoal} · +${detGap} to go`} accent="info" />
        <StatCard label="Practice Tests" value={6} sublabel="last 90 days" accent="warning" />
        <StatCard label="Projected SAT" value={1530} sublabel="based on velocity" accent="success" icon={<TrendingUp className="h-4 w-4 text-success" />} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <Section title="SAT Score Evolution" subtitle="6 attempts" action={<Pill tone="success"><TrendingUp className="h-3 w-3" /> +130 pts</Pill>}>
          <div className="h-56 -ml-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={satScores}>
                <defs>
                  <linearGradient id="sat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#57068C" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#57068C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={36} domain={[1300, 1600]} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 }} />
                <Area type="monotone" dataKey="score" stroke="#57068C" strokeWidth={2.5} fill="url(#sat)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="DET Score Evolution" subtitle="5 attempts" action={<Pill tone="success"><TrendingUp className="h-3 w-3" /> +20 pts</Pill>}>
          <div className="h-56 -ml-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={detScores}>
                <defs>
                  <linearGradient id="det" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={36} domain={[80, 160]} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 }} />
                <Area type="monotone" dataKey="score" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#det)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="SAT — Section Breakdown">
          {[
            { name: "Math", score: 780, target: 800 },
            { name: "Reading", score: 360, target: 380 },
            { name: "Writing", score: 340, target: 370 },
          ].map((s) => (
            <div key={s.name} className="py-2">
              <div className="flex justify-between text-sm mb-1.5"><span className="font-medium">{s.name}</span><span className="tabular-nums text-muted-foreground">{s.score} / {s.target}</span></div>
              <ProgressBar value={(s.score / s.target) * 100} />
            </div>
          ))}
        </Section>

        <Section title="DET — Subscore Breakdown">
          {[
            { name: "Literacy", score: 130, target: 140 },
            { name: "Comprehension", score: 125, target: 135 },
            { name: "Conversation", score: 120, target: 130 },
            { name: "Production", score: 120, target: 135 },
          ].map((s) => (
            <div key={s.name} className="py-2">
              <div className="flex justify-between text-sm mb-1.5"><span className="font-medium">{s.name}</span><span className="tabular-nums text-muted-foreground">{s.score} / {s.target}</span></div>
              <ProgressBar value={(s.score / s.target) * 100} tone="success" />
            </div>
          ))}
        </Section>

        <Section title="Weaknesses to Drill" className="xl:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {["Inference questions on long passages", "Geometry: circle theorems", "Grammar: rhetorical synthesis"].map((w) => (
              <div key={w} className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                <Pill tone="destructive">Focus</Pill>
                <p className="mt-2 text-sm font-medium">{w}</p>
                <button className="mt-3 text-xs text-primary font-medium">Generate drill →</button>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </AppShell>
  );
}
