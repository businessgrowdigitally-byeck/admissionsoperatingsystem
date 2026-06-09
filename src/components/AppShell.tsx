import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard, GraduationCap, PenLine, Award, Mail, Target,
  Wallet, CalendarDays, BarChart3, Sparkles, Sun, Search, Bell,
  Sparkle, Flame, Menu, X, ShieldAlert, RotateCw,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { student } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Mission Control", icon: LayoutDashboard, exact: true },
  { to: "/war-room", label: "War Room", icon: ShieldAlert },
  { to: "/pdca", label: "PDCA Center", icon: RotateCw },
  { to: "/today", label: "Today", icon: Sun },
  { to: "/universities", label: "Universities", icon: GraduationCap },
  { to: "/essays", label: "Essays", icon: PenLine },
  { to: "/activities", label: "Activities & Honors", icon: Award },
  { to: "/recommendations", label: "Recommendations", icon: Mail },
  { to: "/testing", label: "Testing", icon: Target },
  { to: "/financial-aid", label: "Financial Aid", icon: Wallet },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
];

export function AppShell({ children, title, subtitle, actions }: { children: ReactNode; title: string; subtitle?: string; actions?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 border-r border-sidebar-border bg-sidebar transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary shadow-glow">
              <Sparkle className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">AdmitOS</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">NYU · Cycle 25/26</div>
            </div>
          </Link>
          <button className="lg:hidden text-muted-foreground" onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
        </div>

        <nav className="px-3 py-4 space-y-0.5">
          {nav.map((item) => {
            const active = item.exact ? loc.pathname === item.to : loc.pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  active
                    ? "bg-sidebar-accent text-primary shadow-card"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-foreground",
                )}
              >
                <Icon className={cn("h-4 w-4 transition-colors", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                <span>{item.label}</span>
                {active && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
              </Link>
            );
          })}
        </nav>

        <div className="absolute inset-x-3 bottom-4">
          <div className="rounded-2xl border border-sidebar-border bg-gradient-to-br from-accent to-secondary p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> AI Copilot
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              "Finish your NYU 'Why Us' draft — you're 96% of the way there."
            </p>
            <button className="mt-3 w-full rounded-lg gradient-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-elegant transition-transform hover:scale-[1.02]">
              Open Copilot
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-72">
        {/* Topbar */}
        <header className="sticky top-0 z-30 glass-strong border-b border-border">
          <div className="flex h-16 items-center gap-4 px-4 md:px-8">
            <button className="lg:hidden text-foreground" onClick={() => setOpen(true)}><Menu className="h-5 w-5" /></button>
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-base md:text-lg font-semibold tracking-tight">{title}</h1>
              {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
            </div>
            <div className="hidden md:flex items-center gap-2 rounded-xl border border-border bg-surface-elevated px-3 py-1.5 text-sm text-muted-foreground w-72">
              <Search className="h-4 w-4" />
              <input className="bg-transparent outline-none flex-1 placeholder:text-muted-foreground/70" placeholder="Search anything…" />
              <kbd className="hidden md:inline rounded border border-border bg-muted px-1.5 text-[10px]">⌘K</kbd>
            </div>
            <button className="relative grid h-9 w-9 place-items-center rounded-xl border border-border bg-surface-elevated text-muted-foreground hover:text-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
            </button>
            <div className="hidden md:flex items-center gap-2 rounded-xl border border-border bg-surface-elevated px-2 py-1">
              <Flame className="h-4 w-4 text-warning" />
              <span className="text-xs font-semibold">{student.streak}</span>
              <span className="text-xs text-muted-foreground">day streak</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-full gradient-primary text-sm font-semibold text-primary-foreground shadow-elegant">
                {student.avatar}
              </div>
              <div className="hidden md:block leading-tight">
                <div className="text-sm font-semibold">{student.name}</div>
                <div className="text-[11px] text-muted-foreground">Level {student.level} · {student.xp.toLocaleString()} XP</div>
              </div>
            </div>
          </div>
          {actions && <div className="px-4 md:px-8 pb-3">{actions}</div>}
        </header>

        <main className="px-4 md:px-8 py-6 md:py-8 max-w-[1480px] mx-auto">
          {children}
        </main>
      </div>

      {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}
    </div>
  );
}
