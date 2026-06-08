import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Pill, Section } from "@/components/ui-bits";
import { universities } from "@/lib/mock-data";
import { MapPin, Calendar, ExternalLink, Star, Filter, Plus, Search } from "lucide-react";

export const Route = createFileRoute("/universities/")({
  head: () => ({ meta: [{ title: "Universities — NYU Application OS" }] }),
  component: UniversityList,
});

function UniversityList() {
  return (
    <AppShell title="University CRM" subtitle={`${universities.length} target schools · Cycle 2025-26`}>
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-elevated px-3 py-2 text-sm flex-1 min-w-[200px]">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input className="bg-transparent outline-none flex-1" placeholder="Search universities…" />
        </div>
        <button className="flex items-center gap-1.5 rounded-xl border border-border bg-surface-elevated px-3 py-2 text-sm font-medium">
          <Filter className="h-4 w-4" /> Filter
        </button>
        <button className="flex items-center gap-1.5 rounded-xl gradient-primary text-primary-foreground px-3 py-2 text-sm font-medium shadow-elegant">
          <Plus className="h-4 w-4" /> Add University
        </button>
      </div>

      <Section title="All Targets" subtitle="Sorted by application deadline">
        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.14em] text-muted-foreground border-b border-border">
                <th className="py-3 pl-5 font-medium">University</th>
                <th className="py-3 font-medium">Type</th>
                <th className="py-3 font-medium">Deadline</th>
                <th className="py-3 font-medium">Accept</th>
                <th className="py-3 font-medium">Fit</th>
                <th className="py-3 font-medium">Interest</th>
                <th className="py-3 pr-5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {universities.map((u) => (
                <tr key={u.id} className="border-b border-border/60 hover:bg-secondary/40 transition">
                  <td className="py-3 pl-5">
                    <Link to="/universities/$id" params={{ id: u.id }} className="flex items-center gap-3 group">
                      <div className="grid h-10 w-10 place-items-center rounded-xl text-xs font-semibold text-white shrink-0" style={{ background: u.color }}>{u.short}</div>
                      <div>
                        <div className="font-medium group-hover:text-primary transition">{u.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {u.location}</div>
                      </div>
                    </Link>
                  </td>
                  <td><Pill tone={u.type === "ED" ? "primary" : u.type === "EA" || u.type === "REA" ? "info" : "muted"}>{u.type}</Pill></td>
                  <td className="tabular-nums text-muted-foreground">{u.deadline}</td>
                  <td className="tabular-nums">{u.acceptance}%</td>
                  <td><span className="font-semibold tabular-nums">{u.fitScore}</span><span className="text-muted-foreground">/100</span></td>
                  <td>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < u.interest ? "fill-warning text-warning" : "text-muted"}`} />
                      ))}
                    </div>
                  </td>
                  <td className="pr-5"><Pill tone={u.status === "Applying" ? "primary" : u.status === "Submitted" || u.status === "Accepted" ? "success" : "muted"}>{u.status}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </AppShell>
  );
}
