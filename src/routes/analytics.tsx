import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Section, StatCard } from "@/components/ui-bits";
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Area, AreaChart,
} from "recharts";
import { weeklyHours, readinessEvolution, healthCategories } from "@/lib/mock-data";
import { Activity, Clock, Trophy, Zap } from "lucide-react";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics | AdmitOS" }] }),
  component: AnalyticsPage,
});

const COLORS = ["#57068C", "#8B5CF6", "#B57BFF", "#F59E0B", "#10B981", "#EF4444"];

function AnalyticsPage() {
  const totalHours = weeklyHours.reduce((a, x) => a + x.hours, 0).toFixed(1);
  const radar = healthCategories.map((h) => ({ name: h.label, value: h.progress }));
  const distribution = [
    { name: "Essays", value: 38 },
    { name: "Research", value: 18 },
    { name: "Testing", value: 22 },
    { name: "Apps", value: 12 },
    { name: "Fin Aid", value: 10 },
  ];

  return (
    <AppShell title="Analytics" subtitle="Insight into your application velocity">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <StatCard label="Hours This Week" value={totalHours} sublabel="+12% vs last" icon={<Clock className="h-4 w-4 text-primary" />} />
        <StatCard label="Tasks Completed" value={47} sublabel="last 14 days" accent="success" />
        <StatCard label="Avg Velocity" value="6.2/day" sublabel="elite tier" accent="info" icon={<Zap className="h-4 w-4 text-info" />} />
        <StatCard label="Milestones" value="3 / 5" sublabel="cycle progress" accent="warning" icon={<Trophy className="h-4 w-4 text-warning" />} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <Section title="Readiness Evolution" subtitle="8 weeks" className="xl:col-span-2">
          <div className="h-64 -ml-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={readinessEvolution}>
                <defs>
                  <linearGradient id="re" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#57068C" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#57068C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={32} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 }} />
                <Area type="monotone" dataKey="score" stroke="#57068C" strokeWidth={2.5} fill="url(#re)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="Pillar Balance">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radar}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar dataKey="value" stroke="#57068C" fill="#57068C" fillOpacity={0.35} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="Weekly Hours" subtitle="Deep work logged" className="xl:col-span-2">
          <div className="h-64 -ml-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyHours}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={28} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 }} />
                <Bar dataKey="hours" fill="#57068C" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="Time Distribution">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distribution} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={3}>
                  {distribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>
    </AppShell>
  );
}
