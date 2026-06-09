import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Pill, ProgressBar, RadialScore, Section, StatCard } from "@/components/ui-bits";
import {
  student, healthCategories, readinessScore, universities, upcomingDeadlines,
  alerts, badges, todayTasks, satScores, readinessEvolution,
} from "@/lib/mock-data";
import {
  AlertTriangle, ArrowUpRight, Award, Calendar, ChevronRight, Compass,
  GraduationCap, Mail, PenLine, Sparkles, Target, TrendingUp, Wallet, Zap,
} from "lucide-react";
import {
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { getBottlenecks } from "@/lib/bottleneck-engine";
import { getCriticalPathTasks } from "@/lib/critical-path-engine";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mission Control | AdmitOS" },
      { name: "description", content: "Your admissions dashboard: deadlines, readiness, essays, and daily priorities." },
    ],
  }),
  component: Dashboard,
});

const iconMap = { Compass, Award, Target, PenLine, Mail, Wallet };

function Dashboard() {
  const xpPct = (student.xp / student.xpToNext) * 100;
  const tier = readinessScore >= 85 ? "Elite Applicant" : readinessScore >= 70 ? "Competitive Applicant" : readinessScore >= 50 ? "Developing Applicant" : "Early Stage";
  const bottlenecks = getBottlenecks();
  const criticalTasks = getCriticalPathTasks();

  return (
    <AppShell
      title={`Welcome back, ${student.name.split(" ")[0]}`}
      subtitle={`${student.classYear} · Targeting ${student.major}`}
    >
      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <div className="lg:col-span-2 relative overflow-hidden rounded-3xl gradient-hero p-7 text-primary-foreground shadow-floating">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] opacity-80">
              <Sparkles className="h-3.5 w-3.5" /> Application Cycle {student.cycle}
            </div>
            <h2 className="mt-3 text-2xl md:text-4xl font-semibold tracking-tight leading-tight">
              You're <span className="opacity-90">{tier}</span>. <br className="hidden md:block" />
              7 days to your first ED deadline.
            </h2>
            <p className="mt-3 max-w-xl text-sm md:text-base opacity-90 leading-relaxed">
              Stay on track: focus today on closing your NYU 'Why Us' essay and submitting your CSS Profile parent section.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to="/today" className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-primary shadow-elegant hover:scale-[1.02] transition-transform">
                Enter Today Mode <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link to="/essays" className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 backdrop-blur px-4 py-2 text-sm font-medium hover:bg-white/25 transition">
                Essay Pipeline
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 max-w-md">
              <div><div className="text-2xl font-semibold">{student.gpa}</div><div className="text-xs opacity-75">GPA</div></div>
              <div><div className="text-2xl font-semibold">{student.satCurrent} <span className="text-sm opacity-70">/ {student.satGoal}</span></div><div className="text-xs opacity-75">SAT</div></div>
              <div><div className="text-2xl font-semibold">{student.detCurrent} <span className="text-sm opacity-70">/ {student.detGoal}</span></div><div className="text-xs opacity-75">DET</div></div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-card flex flex-col">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Application Readiness</div>
          <div className="flex items-center justify-center flex-1 py-4">
            <RadialScore value={readinessScore} size={200} />
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-primary">{tier}</div>
            <p className="text-xs text-muted-foreground mt-1">+11 points in 14 days</p>
          </div>
          <div className="mt-4 rounded-xl bg-secondary p-3 flex items-center gap-3">
            <Zap className="h-4 w-4 text-primary" />
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">Level {student.level}</span>
                <span className="text-muted-foreground">{student.xp.toLocaleString()} / {student.xpToNext.toLocaleString()} XP</span>
              </div>
              <div className="mt-1.5"><ProgressBar value={xpPct} /></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Universities" value="8" sublabel="3 ED/EA · 5 RD" icon={<GraduationCap className="h-4 w-4 text-primary" />} />
        <StatCard label="Essays in Flight" value="10" sublabel="3 ready · 1 submitted" icon={<PenLine className="h-4 w-4 text-info" />} accent="info" />
        <StatCard label="Next Deadline" value="7d" sublabel="Nov 1 — NYU ED" icon={<AlertTriangle className="h-4 w-4 text-warning" />} accent="warning" />
        <StatCard label="Active Alerts" value={alerts.length} sublabel="2 red · 2 yellow" icon={<AlertTriangle className="h-4 w-4 text-destructive" />} accent="destructive" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Top Bottlenecks */}
        <Section
          title="Top Bottlenecks"
          subtitle="Derived risk analysis of blockers in your application cycle"
          className="xl:col-span-2"
          action={<Pill tone="destructive">Calculated</Pill>}
        >
          <div className="space-y-3">
            {bottlenecks.slice(0, 3).map((b) => {
              const severityTone = b.severity === "high" ? "destructive" : b.severity === "medium" ? "warning" : "muted";
              return (
                <div key={b.title} className="rounded-xl border border-border bg-surface-elevated p-4 flex flex-col md:flex-row gap-4 justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold tracking-tight text-foreground">{b.title}</span>
                      <Pill tone={severityTone}>{b.severity.toUpperCase()} SEVERITY</Pill>
                      <Pill tone="primary">Impact: {b.impact_score}</Pill>
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      {b.description}
                    </p>
                    <div className="mt-3 flex items-center gap-2.5 rounded-lg bg-accent/40 px-3 py-2 border border-border/50">
                      <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="text-xs font-medium text-foreground"><span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider mr-1">Recommended Action:</span>{b.recommended_action}</span>
                    </div>
                  </div>
                  <div className="flex md:flex-col items-end justify-between w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-border md:text-right gap-2">
                    <div className="flex flex-row md:flex-col justify-between w-full md:w-auto md:text-right">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Blocked Tasks</div>
                      <div className="text-xs font-semibold tabular-nums text-foreground mt-0.5">{b.blocked_tasks_count} {b.blocked_tasks_count === 1 ? 'requirement' : 'requirements'}</div>
                    </div>
                    <div className="flex flex-row md:flex-col justify-between w-full md:w-auto md:text-right">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Est. Delay</div>
                      <div className="text-xs font-semibold tabular-nums text-foreground mt-0.5">{b.estimated_delay_days} {b.estimated_delay_days === 1 ? 'day' : 'days'}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Today */}
        <Section title="Today's Priorities" subtitle="Top 3 high-leverage tasks" action={<Link to="/today" className="text-xs text-primary font-medium inline-flex items-center gap-0.5">Open <ChevronRight className="h-3 w-3" /></Link>}>
          <div className="space-y-3">
            {todayTasks.map((t, i) => (
              <div key={t.id} className="flex items-start gap-3 rounded-xl border border-border bg-surface-elevated p-3">
                <div className="grid h-8 w-8 place-items-center rounded-lg gradient-primary text-primary-foreground text-xs font-semibold shrink-0">{i + 1}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{t.title}</div>
                  <div className="mt-1 flex items-center gap-1.5">
                    <Pill tone="primary">{t.time}</Pill>
                    <Pill tone="info">{t.impact} impact</Pill>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Health */}
        <Section
          title="Global Application Health"
          subtitle="Weighted across six pillars"
          className="xl:col-span-2"
          action={<Pill tone="primary">Live</Pill>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {healthCategories.map((c) => {
              const Icon = (iconMap as any)[c.icon] ?? Compass;
              const tone = c.risk === "green" ? "success" : c.risk === "yellow" ? "warning" : "destructive";
              return (
                <div key={c.key} className="rounded-xl border border-border bg-surface-elevated p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary"><Icon className="h-4 w-4" /></div>
                      <div>
                        <div className="text-sm font-semibold">{c.label}</div>
                        <div className="text-[11px] text-muted-foreground">Weight {c.weight}%</div>
                      </div>
                    </div>
                    <Pill tone={tone as any}>{c.risk === "green" ? "On Track" : c.risk === "yellow" ? "At Risk" : "Critical"}</Pill>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex-1"><ProgressBar value={c.progress} tone={tone as any} /></div>
                    <div className="text-sm font-semibold tabular-nums">{c.progress}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Alerts */}
        <Section title="Smart Alerts" subtitle="Auto-detected risks">
          <div className="space-y-3">
            {alerts.map((a) => (
              <div key={a.id} className="flex gap-3 rounded-xl border border-border bg-surface-elevated p-3">
                <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${a.level === "red" ? "bg-destructive" : "bg-warning"}`} />
                <div>
                  <div className="text-sm font-medium leading-tight">{a.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{a.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Highest Leverage Actions */}
        <Section
          title="Highest Leverage Actions"
          subtitle="Computed task priority by ROI (Impact / Effort)"
          className="xl:col-span-2"
          action={<Link to="/war-room" className="text-xs text-primary font-medium inline-flex items-center gap-0.5">Open War Room <ChevronRight className="h-3 w-3" /></Link>}
        >
          <div className="space-y-3">
            {criticalTasks.slice(0, 3).map((t) => {
              const roiTone = t.roi_score >= 2.0 ? "success" : t.roi_score >= 1.2 ? "primary" : "muted";
              return (
                <div key={t.title} className="rounded-xl border border-border bg-surface-elevated p-4 flex flex-col sm:flex-row gap-4 justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold tracking-tight text-foreground">{t.title}</span>
                      <Pill tone={roiTone}>ROI: {t.roi_score}</Pill>
                      <Pill tone="default">{t.estimated_time}</Pill>
                    </div>
                    <div className="mt-2.5 flex items-center gap-2 text-xs text-muted-foreground">
                      <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>Unlocks: <span className="font-medium text-foreground">{t.unlocked_tasks}</span></span>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-end gap-1 shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-border sm:text-right">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Impact / Effort</div>
                    <div className="text-xs font-semibold tabular-nums text-foreground">{t.impact_score} / {t.effort_score}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Score evolution */}
        <Section title="Readiness Evolution" subtitle="8 week trend" action={<Pill tone="success"><TrendingUp className="h-3 w-3" /> +42</Pill>}>
          <div className="h-44 -ml-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={readinessEvolution}>
                <defs>
                  <linearGradient id="gp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#57068C" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#57068C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={28} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 }} />
                <Area type="monotone" dataKey="score" stroke="#57068C" strokeWidth={2.5} fill="url(#gp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* Deadline radar */}
        <Section title="Deadline Radar" subtitle="Next 90 days" className="xl:col-span-2">
          <div className="space-y-2">
            {upcomingDeadlines.slice(0, 6).map((d) => {
              const tone = d.daysOut <= 14 ? "destructive" : d.daysOut <= 30 ? "warning" : "info";
              return (
                <div key={d.id} className="grid grid-cols-12 items-center gap-3 rounded-xl border border-border bg-surface-elevated px-4 py-3">
                  <div className="col-span-6 md:col-span-5 min-w-0">
                    <div className="text-sm font-medium truncate">{d.task}</div>
                    <div className="text-xs text-muted-foreground">{d.university} · {d.category}</div>
                  </div>
                  <div className="col-span-3 md:col-span-2"><Pill tone={d.priority === "P0" ? "destructive" : d.priority === "P1" ? "warning" : "muted"}>{d.priority}</Pill></div>
                  <div className="col-span-3 md:col-span-3 text-right md:text-left text-xs text-muted-foreground tabular-nums">{d.due}</div>
                  <div className="col-span-12 md:col-span-2 md:text-right">
                    <Pill tone={tone as any}>in {d.daysOut}d</Pill>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* SAT progress */}
        <Section title="SAT Trajectory" subtitle={`Latest ${student.satCurrent} · Goal ${student.satGoal}`} action={<Link to="/testing" className="text-xs text-primary font-medium">Open</Link>}>
          <div className="h-44 -ml-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={satScores}>
                <defs>
                  <linearGradient id="gs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={32} domain={[1300, 1600]} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 }} />
                <Area type="monotone" dataKey="score" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#gs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* University quick view */}
        <Section title="University CRM" subtitle="Top targets by fit score" className="xl:col-span-2" action={<Link to="/universities" className="text-xs text-primary font-medium">View all</Link>}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {universities.slice(0, 4).map((u) => (
              <Link key={u.id} to="/universities/$id" params={{ id: u.id }} className="group flex items-center gap-3 rounded-xl border border-border bg-surface-elevated p-3 hover:border-primary/40 hover:shadow-elegant transition">
                <div className="grid h-11 w-11 place-items-center rounded-xl text-sm font-semibold text-white shrink-0" style={{ background: u.color }}>{u.short}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold truncate">{u.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{u.location} · {u.acceptance}% accept</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold tabular-nums">{u.fitScore}</div>
                  <Pill tone={u.type === "ED" ? "primary" : u.type === "EA" || u.type === "REA" ? "info" : "muted"}>{u.type}</Pill>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        {/* Badges */}
        <Section title="Badges & Milestones" subtitle={`${badges.filter((b) => b.unlocked).length} of ${badges.length} unlocked`} className="xl:col-span-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {badges.map((b) => (
              <div key={b.id} className={`rounded-xl border p-4 text-center transition ${b.unlocked ? "border-primary/30 bg-gradient-to-b from-primary/8 to-transparent" : "border-border bg-surface-elevated opacity-60"}`}>
                <div className={`mx-auto grid h-12 w-12 place-items-center rounded-2xl ${b.unlocked ? "gradient-primary text-primary-foreground shadow-glow" : "bg-muted text-muted-foreground"}`}>
                  <Award className="h-5 w-5" />
                </div>
                <div className="mt-2 text-xs font-semibold">{b.name}</div>
                <div className="text-[10px] text-muted-foreground mt-1 leading-snug">{b.desc}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">Built with focus. Apply with confidence.</p>
    </AppShell>
  );
}
