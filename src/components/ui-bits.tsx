import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function StatCard({
  label, value, sublabel, icon, accent,
}: { label: string; value: ReactNode; sublabel?: ReactNode; icon?: ReactNode; accent?: "primary" | "success" | "warning" | "destructive" | "info" }) {
  const accents: Record<string, string> = {
    primary: "from-primary/10 to-primary/0 text-primary",
    success: "from-success/15 to-transparent text-success",
    warning: "from-warning/20 to-transparent text-warning",
    destructive: "from-destructive/15 to-transparent text-destructive",
    info: "from-info/15 to-transparent text-info",
  };
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60 pointer-events-none", accents[accent ?? "primary"])} />
      <div className="relative flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
          <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
          {sublabel && <div className="mt-1 text-xs text-muted-foreground">{sublabel}</div>}
        </div>
        {icon && <div className="grid h-9 w-9 place-items-center rounded-xl bg-surface-elevated border border-border">{icon}</div>}
      </div>
    </div>
  );
}

export function Section({ title, subtitle, action, children, className }: { title: string; subtitle?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-2xl border border-border bg-card shadow-card", className)}>
      <header className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function Pill({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "primary" | "success" | "warning" | "destructive" | "info" | "muted" }) {
  const tones: Record<string, string> = {
    default: "bg-secondary text-secondary-foreground",
    primary: "bg-primary/10 text-primary",
    success: "bg-success/15 text-success",
    warning: "bg-warning/20 text-foreground",
    destructive: "bg-destructive/15 text-destructive",
    info: "bg-info/15 text-info",
    muted: "bg-muted text-muted-foreground",
  };
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium", tones[tone])}>{children}</span>;
}

export function ProgressBar({ value, tone = "primary" }: { value: number; tone?: "primary" | "success" | "warning" | "destructive" }) {
  const tones: Record<string, string> = {
    primary: "gradient-primary",
    success: "bg-success",
    warning: "bg-warning",
    destructive: "bg-destructive",
  };
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div className={cn("h-full rounded-full transition-all", tones[tone])} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

export function RadialScore({ value, size = 180, label }: { value: number; size?: number; label?: string }) {
  const r = (size - 18) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#57068C" />
            <stop offset="100%" stopColor="#B57BFF" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--muted)" strokeWidth="10" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="url(#rg)" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 700ms ease" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-4xl font-semibold tracking-tight">{value}</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-1">{label ?? "Readiness"}</div>
        </div>
      </div>
    </div>
  );
}
