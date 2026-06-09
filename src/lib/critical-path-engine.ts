import { todayTasks, upcomingDeadlines } from "./mock-data";

export interface CriticalPathTask {
  title: string;
  impact_score: number;
  effort_score: number;
  roi_score: number;
  estimated_time: string;
  unlocked_tasks_count: number;
  unlocked_tasks: string;
}

export function getCriticalPathTasks(): CriticalPathTask[] {
  // We define a map of computed scores and unlocks for the tasks in our system
  const taskMap: Record<string, { impact: number; effort: number; time: string; unlocks: string; count: number }> = {
    "Finalize NYU 'Why Us' essay": {
      impact: 95,
      effort: 40,
      time: "60 min",
      unlocks: "NYU ED Application, NYU Financial Aid review",
      count: 2,
    },
    "Submit CSS Profile parent income section": {
      impact: 92,
      effort: 30,
      time: "45 min",
      unlocks: "CSS Profile submission, financial aid packages",
      count: 3,
    },
    "Take SAT practice section: Reading": {
      impact: 70,
      effort: 50,
      time: "35 min",
      unlocks: "SAT trajectory analysis, weak sub-category drilling",
      count: 1,
    },
    "NYU ED Application": {
      impact: 98,
      effort: 90,
      time: "3 hours",
      unlocks: "NYU Admission Decision, Stern Scholarship eligibility",
      count: 2,
    },
    "MIT EA Application": {
      impact: 98,
      effort: 90,
      time: "3 hours",
      unlocks: "MIT Admission Decision",
      count: 1,
    },
    "Maker Portfolio Essay": {
      impact: 85,
      effort: 60,
      time: "2 hours",
      unlocks: "MIT Maker Portfolio completion, EA Application submission",
      count: 2,
    },
    "CSS Profile": {
      impact: 90,
      effort: 45,
      time: "90 min",
      unlocks: "FAFSA verification, institutional aid review",
      count: 2,
    },
    "Stanford REA Application": {
      impact: 96,
      effort: 95,
      time: "4 hours",
      unlocks: "Stanford REA Admission Decision",
      count: 1,
    },
    "UChicago ED Supplement": {
      impact: 85,
      effort: 70,
      time: "2 hours",
      unlocks: "UChicago ED Application completion",
      count: 1,
    },
  };

  const list: CriticalPathTask[] = [];

  // Gather tasks from todayTasks
  todayTasks.forEach((t) => {
    const computed = taskMap[t.title] || {
      impact: t.impact === "High" ? 90 : t.impact === "Medium" ? 70 : 40,
      effort: t.time === "60 min" ? 50 : 30,
      time: t.time,
      unlocks: "Next step in application cycle",
      count: 1,
    };
    
    list.push({
      title: t.title,
      impact_score: computed.impact,
      effort_score: computed.effort,
      roi_score: Number((computed.impact / computed.effort).toFixed(2)),
      estimated_time: computed.time,
      unlocked_tasks_count: computed.count,
      unlocked_tasks: computed.unlocks,
    });
  });

  // Gather tasks from upcomingDeadlines, avoiding duplication by title
  upcomingDeadlines.forEach((d) => {
    // Map deadline names to match keys in taskMap
    let matchedKey = d.task;
    if (d.task.includes("NYU ED Application")) matchedKey = "NYU ED Application";
    if (d.task.includes("MIT EA Application")) matchedKey = "MIT EA Application";
    if (d.task.includes("Stanford REA Application")) matchedKey = "Stanford REA Application";

    const alreadyAdded = list.some((x) => x.title.toLowerCase() === matchedKey.toLowerCase() || x.title.toLowerCase() === d.task.toLowerCase());
    if (!alreadyAdded) {
      const computed = taskMap[matchedKey] || taskMap[d.task] || {
        impact: d.priority === "P0" ? 90 : d.priority === "P1" ? 75 : 50,
        effort: 80,
        time: "3 hours",
        unlocks: "Next step in application cycle",
        count: 1,
      };

      list.push({
        title: d.task,
        impact_score: computed.impact,
        effort_score: computed.effort,
        roi_score: Number((computed.impact / computed.effort).toFixed(2)),
        estimated_time: computed.time,
        unlocked_tasks_count: computed.count,
        unlocked_tasks: computed.unlocks,
      });
    }
  });

  // Sort by roi_score DESC
  return list.sort((a, b) => b.roi_score - a.roi_score);
}
