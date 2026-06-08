import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Pill, ProgressBar, Section, StatCard } from "@/components/ui-bits";
import { universities, essays } from "@/lib/mock-data";
import { ArrowLeft, Calendar, ExternalLink, Mail, MapPin, Phone, Star, Target } from "lucide-react";

export const Route = createFileRoute("/universities/$id")({
  head: ({ params }) => {
    const u = universities.find((x) => x.id === params.id);
    return { meta: [{ title: `${u?.name ?? "University"} — NYU Application OS` }] };
  },
  loader: ({ params }) => {
    const u = universities.find((x) => x.id === params.id);
    if (!u) throw notFound();
    return { university: u };
  },
  component: UniversityDetail,
  notFoundComponent: () => <AppShell title="Not Found">University not in your list yet.</AppShell>,
  errorComponent: ({ error }) => <AppShell title="Error">{error.message}</AppShell>,
});

function UniversityDetail() {
  const { university: u } = Route.useLoaderData();
  const supplements = essays.filter((e) => e.university === u.short || e.university === u.name);

  return (
    <AppShell title={u.name} subtitle={`${u.location} · ${u.type} · ${u.acceptance}% acceptance`}>
      <Link to="/universities" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"><ArrowLeft className="h-4 w-4" /> Back to all universities</Link>

      <div className="relative overflow-hidden rounded-3xl p-8 text-white shadow-floating mb-6" style={{ background: `linear-gradient(135deg, ${u.color}, ${u.color}cc 60%, #1E1E1E)` }}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]" />
        <div className="relative flex items-start gap-5">
          <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white/15 backdrop-blur text-2xl font-bold">{u.short}</div>
          <div className="flex-1">
            <Pill tone="default">{u.type}</Pill>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">{u.name}</h2>
            <p className="mt-2 max-w-2xl opacity-90 leading-relaxed">{u.mission}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm opacity-90">
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {u.location}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Due {u.deadline}</span>
              <a href={`https://${u.portal}`} className="flex items-center gap-1.5 underline-offset-2 hover:underline"><ExternalLink className="h-3.5 w-3.5" /> {u.portal}</a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <StatCard label="Fit Score" value={`${u.fitScore}/100`} sublabel="Strong match" icon={<Target className="h-4 w-4 text-primary" />} />
        <StatCard label="Acceptance" value={`${u.acceptance}%`} sublabel="Highly selective" accent="warning" />
        <StatCard label="Interest" value={`${u.interest}/5`} sublabel="★ ★ ★ ★ ★" accent="info" />
        <StatCard label="Status" value={u.status} sublabel={u.type} accent="primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Section title="Application Timeline" className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { label: "Application Deadline", date: u.deadline, tone: "destructive" as const },
              { label: "Supplement Due", date: u.supplementDeadline, tone: "warning" as const },
              { label: "Financial Aid", date: u.faDeadline, tone: "info" as const },
            ].map((d) => (
              <div key={d.label} className="rounded-xl border border-border bg-surface-elevated p-4">
                <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{d.label}</div>
                <div className="mt-2 text-lg font-semibold tabular-nums">{d.date}</div>
                <div className="mt-2"><Pill tone={d.tone}>Upcoming</Pill></div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Admissions Contact">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-muted-foreground" /> {u.contact}</div>
            <div className="flex items-center gap-2 text-sm"><ExternalLink className="h-4 w-4 text-muted-foreground" /> <a className="hover:text-primary" href={`https://${u.portal}`}>{u.portal}</a></div>
            <div className="rounded-xl bg-secondary p-3 text-xs text-muted-foreground">Last emailed 6 days ago · 2 emails in thread</div>
          </div>
        </Section>

        <Section title="Academic Programs" subtitle="Of interest to you">
          <div className="flex flex-wrap gap-2">
            {u.programs.map((p: string) => (<Pill key={p} tone="primary">{p}</Pill>))}
          </div>
        </Section>

        <Section title="Supplemental Essays" className="lg:col-span-2">
          {supplements.length === 0 ? (
            <p className="text-sm text-muted-foreground">No supplements tracked yet.</p>
          ) : (
            <div className="space-y-3">
              {supplements.map((e) => (
                <div key={e.id} className="rounded-xl border border-border bg-surface-elevated p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate">{e.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{e.prompt}</div>
                    </div>
                    <Pill tone="primary">{e.status}</Pill>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex-1"><ProgressBar value={(e.wordCount / e.wordLimit) * 100} /></div>
                    <div className="text-xs tabular-nums text-muted-foreground">{e.wordCount}/{e.wordLimit}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>

        <Section title="Admissions Notes">
          <textarea className="w-full rounded-lg border border-border bg-surface-elevated p-3 text-sm outline-none focus:border-primary/50" rows={8} defaultValue={`Visited campus Sept 12. Loved Stern's quantitative finance focus. Reach out to Prof. Lin about CILVR lab. Mention AI4Civics in 'Why Us'.`} />
        </Section>
      </div>
    </AppShell>
  );
}
