import { essays, recommendations, finAidItems, student, upcomingDeadlines } from "./mock-data";

export interface Bottleneck {
  title: string;
  description: string;
  impact_score: number;
  blocked_tasks_count: number;
  estimated_delay_days: number;
  recommended_action: string;
  severity: "low" | "medium" | "high";
}

const MOCK_TODAY = "2025-10-25";

function getDaysBetween(dateString1: string, dateString2: string): number {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);
  const diffTime = date2.getTime() - date1.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getBottlenecks(): Bottleneck[] {
  const list: Bottleneck[] = [];

  // Helper to count tasks for a university
  const countTasksForUni = (uniShort: string) => {
    return upcomingDeadlines.filter(
      (d) => d.university.toLowerCase() === uniShort.toLowerCase()
    ).length;
  };

  // 1. Analyze Essays
  essays.forEach((e) => {
    if (e.status !== "Submitted" && e.status !== "Ready") {
      const daysOut = getDaysBetween(MOCK_TODAY, e.due);
      
      // Calculate impact score
      let impact = 45;
      if (e.type === "Personal") impact += 20;
      if (e.type === "Supplemental") impact += 10;
      
      const earlyStages = ["Ideas", "Brainstorming", "Draft 1"];
      if (earlyStages.includes(e.status)) impact += 20;
      
      // Deduct for days out
      impact -= daysOut * 1.2;
      impact = Math.max(15, Math.min(95, Math.round(impact)));

      const severity = daysOut <= 7 ? "high" : daysOut <= 14 ? "medium" : "low";
      const blockedCount = countTasksForUni(e.university) || 1;
      const estimatedDelay = Math.max(1, 14 - daysOut);

      let action = "Draft the next 150 words and focus on structured outlines.";
      if (e.status === "Ideas" || e.status === "Brainstorming") {
        action = `Outline the core narrative for your ${e.title} essay and start Draft 1.`;
      } else if (e.status === "Revision" || e.status === "Final Review") {
        action = `Perform a final line edit for word limit (${e.wordLimit}) and tone flow.`;
      }

      list.push({
        title: `Essay Progress Lagging: ${e.university} — ${e.title}`,
        description: `The ${e.title} is currently stuck in '${e.status}' stage with only ${e.wordCount}/${e.wordLimit} words, but is due in ${daysOut} days.`,
        impact_score: impact,
        blocked_tasks_count: blockedCount,
        estimated_delay_days: estimatedDelay,
        recommended_action: action,
        severity,
      });
    }
  });

  // 2. Analyze Recommendations
  recommendations.forEach((r) => {
    if (r.requested && !r.submitted) {
      // Recommendations generally block early action/early decision dates (Nov 1)
      const daysOut = getDaysBetween(MOCK_TODAY, "2025-11-01");
      const blockedCount = upcomingDeadlines.filter(
        (d) => d.category === "Application" && d.daysOut <= 14
      ).length;

      const severity = daysOut <= 7 ? "high" : daysOut <= 14 ? "medium" : "low";
      const impact = 88; // Letters of rec are crucial for final submission

      list.push({
        title: `Pending Recommendation Letter: ${r.teacher}`,
        description: `${r.teacher}'s recommendation letter for ${r.subject} is accepted but remains unsubmitted, blocking your November 1st applications.`,
        impact_score: impact,
        blocked_tasks_count: blockedCount || 2,
        estimated_delay_days: 7,
        recommended_action: `Send a polite reminder email to ${r.teacher} and attach your updated resume/brag sheet.`,
        severity,
      });
    }
  });

  // 3. Analyze Testing (SAT/DET Gaps)
  if (student.satCurrent < student.satGoal) {
    const gap = student.satGoal - student.satCurrent;
    list.push({
      title: "SAT Score Gap vs Goal",
      description: `Your current SAT score (${student.satCurrent}) is ${gap} points below your target goal (${student.satGoal}) for competitive applications.`,
      impact_score: 72,
      blocked_tasks_count: 3, // NYU, MIT, Stanford CS
      estimated_delay_days: 14,
      recommended_action: "Drill high-yield Math sub-categories and take one full reading section test today.",
      severity: "medium",
    });
  }

  if (student.detCurrent < student.detGoal) {
    const gap = student.detGoal - student.detCurrent;
    list.push({
      title: "DET Score Gap vs Goal",
      description: `Your latest DET score (${student.detCurrent}) is ${gap} points below your target goal of ${student.detGoal}.`,
      impact_score: 55,
      blocked_tasks_count: 1,
      estimated_delay_days: 10,
      recommended_action: "Schedule your Duolingo English Test and practice speaking/writing production drills.",
      severity: "low",
    });
  }

  // 4. Analyze Financial Aid
  finAidItems.forEach((f) => {
    if (f.status !== "complete" && f.status !== "submitted") {
      const daysOut = getDaysBetween(MOCK_TODAY, f.due);
      
      if (daysOut <= 30) {
        let impact = 80 - daysOut * 1.5;
        impact = Math.max(20, Math.min(90, Math.round(impact)));
        
        const severity = daysOut <= 7 ? "high" : daysOut <= 14 ? "medium" : "low";
        const action = f.name.includes("CSS") 
          ? "Access the College Board portal, compile parent tax forms, and finalize income inputs."
          : `Gather required financial records and submit the ${f.name} form.`;

        list.push({
          title: `Financial Aid Form Pending: ${f.name}`,
          description: `The ${f.name} form is currently in '${f.status === "not_started" ? "Not Started" : "In Progress"}' status with only ${daysOut} days until deadline.`,
          impact_score: impact,
          blocked_tasks_count: 1,
          estimated_delay_days: Math.max(1, 10 - daysOut),
          recommended_action: action,
          severity,
        });
      }
    }
  });

  // Sort by impact_score DESC
  return list.sort((a, b) => b.impact_score - a.impact_score);
}
