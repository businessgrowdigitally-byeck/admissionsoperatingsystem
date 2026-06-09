import { student, universities, upcomingDeadlines, todayTasks, badges, weeklyHours } from "./mock-data";
import { getBottlenecks, Bottleneck } from "./bottleneck-engine";
import { getCriticalPathTasks, CriticalPathTask } from "./critical-path-engine";

export interface PdcaPlan {
  goals: { label: string; current: string | number; target: string | number }[];
  target_universities: { name: string; type: string; deadline: string }[];
  deadlines: { task: string; due: string; daysOut: number }[];
}

export interface PdcaDo {
  tasks: { title: string; priority: number; time: string }[];
  progress: { label: string; value: string | number };
}

export interface PdcaCheck {
  weekly_metrics: { label: string; value: string | number; change?: string }[];
  completed_vs_planned: { planned: number; completed: number; ratio: number };
  bottlenecks: Bottleneck[];
}

export interface PdcaAct {
  improvement_suggestions: string[];
  priority_updates: CriticalPathTask[];
}

export interface WeeklyRetro {
  wins: string[];
  missed_goals: string[];
  root_causes: string[];
  improvements: string[];
  next_week_action_plan: string[];
}

export interface PdcaData {
  plan: PdcaPlan;
  do: PdcaDo;
  check: PdcaCheck;
  act: PdcaAct;
  retro: WeeklyRetro;
}

export function getPdcaData(): PdcaData {
  const bottlenecks = getBottlenecks();
  const criticalTasks = getCriticalPathTasks();

  // 1. PLAN
  const plan: PdcaPlan = {
    goals: [
      { label: "SAT Score", current: student.satCurrent, target: student.satGoal },
      { label: "DET Score", current: student.detCurrent, target: student.detGoal },
      { label: "GPA", current: student.gpa, target: "4.00" },
      { label: "Streak Day Goal", current: student.streak, target: "60 days" },
    ],
    target_universities: universities.map((u) => ({
      name: u.name,
      type: u.type,
      deadline: u.deadline,
    })),
    deadlines: upcomingDeadlines.slice(0, 3).map((d) => ({
      task: d.task,
      due: d.due,
      daysOut: d.daysOut,
    })),
  };

  // 2. DO
  const pdcaDo: PdcaDo = {
    tasks: todayTasks.map((t) => ({
      title: t.title,
      priority: t.priority,
      time: t.time,
    })),
    progress: {
      label: "Active tasks status",
      value: `${todayTasks.length} tasks assigned for today`,
    },
  };

  // 3. CHECK
  const totalHours = weeklyHours.reduce((acc, curr) => acc + curr.hours, 0);
  const completedCount = 47; // from analytics.tsx static text
  const plannedCount = 55; // assumed planned
  const check: PdcaCheck = {
    weekly_metrics: [
      { label: "Weekly Study Hours", value: `${totalHours.toFixed(1)} hrs`, change: "+12% vs last week" },
      { label: "Tasks Completed", value: completedCount, change: "Last 14 days" },
      { label: "Avg Velocity", value: "6.2 tasks/day", change: "Elite velocity" },
    ],
    completed_vs_planned: {
      planned: plannedCount,
      completed: completedCount,
      ratio: Math.round((completedCount / plannedCount) * 100),
    },
    bottlenecks: bottlenecks,
  };

  // 4. ACT
  const improvement_suggestions: string[] = [];
  if (student.satCurrent < student.satGoal) {
    improvement_suggestions.push("Focus next week on daily 35-minute SAT reading section practice and geometry drill sessions.");
  }
  if (bottlenecks.some(b => b.title.includes("CSS Profile"))) {
    improvement_suggestions.push("Schedule a 90-minute block on Saturday to finalize parent financial details for the CSS Profile.");
  }
  if (bottlenecks.some(b => b.title.includes("Recommendation"))) {
    improvement_suggestions.push("Send a polite, brief reminder email to your recommenders who haven't submitted letters yet.");
  }
  if (improvement_suggestions.length === 0) {
    improvement_suggestions.push("Maintain current velocity and focus on next cycle milestones.");
  }

  const act: PdcaAct = {
    improvement_suggestions,
    priority_updates: criticalTasks,
  };

  // 5. WEEKLY RETRO
  const unlockedBadges = badges.filter((b) => b.unlocked).map((b) => b.name);
  const wins = [
    `Achieved a ${student.streak}-day application execution streak.`,
    `Unlocked milestones: ${unlockedBadges.slice(0, 3).join(", ")}.`,
    `Increased application readiness score by +11 points in the last fortnight.`,
    `Successfully drafted and finalized NYU 'Why Us' supplemental essay.`,
  ];

  const missed_goals = [
    `SAT current score (${student.satCurrent}) is still 70 points short of target (${student.satGoal}).`,
    `DET current score (${student.detCurrent}) is 10 points short of goal (${student.detGoal}).`,
    `Stanford supplemental essays remain in 'Ideas' stage with deadlines approaching.`,
  ];

  const root_causes = [
    "SAT gap: Insufficient daily drills on Geometry and Reading inference questions.",
    "Stanford lag: Procrastination in starting supplemental brainstorming due to prioritizing early decision applications (NYU).",
  ];

  const improvements = [
    "Dedicate 35 minutes daily to targeted SAT Reading practice.",
    "Schedule and pay for the Duolingo English Test (DET) to commit to a hard test date.",
    "Utilize pre-drafted Common App outlines to kickstart Stanford prompts.",
  ];

  const next_week_action_plan = criticalTasks.slice(0, 3).map((t) => {
    return `${t.title} (ROI: ${t.roi_score}) — Est. ${t.estimated_time}`;
  });

  const retro: WeeklyRetro = {
    wins,
    missed_goals,
    root_causes,
    improvements,
    next_week_action_plan,
  };

  return {
    plan,
    do: pdcaDo,
    check,
    act,
    retro,
  };
}
