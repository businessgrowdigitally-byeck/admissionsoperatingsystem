export type Status = "not_started" | "in_progress" | "review" | "complete" | "submitted";
export type Risk = "green" | "yellow" | "red";

export const student = {
  name: "Alex Chen",
  cycle: "2025-2026",
  classYear: "Class of 2026",
  major: "Computer Science & Economics",
  gpa: 3.94,
  satGoal: 1550,
  satCurrent: 1480,
  detGoal: 135,
  detCurrent: 125,
  level: 12,
  xp: 8420,
  xpToNext: 10000,
  streak: 47,
  avatar: "AC",
};

export const healthCategories = [
  { key: "research", label: "Research", icon: "Compass", progress: 88, risk: "green" as Risk, weight: 15 },
  { key: "activities", label: "Activities", icon: "Award", progress: 92, risk: "green" as Risk, weight: 15 },
  { key: "testing", label: "Testing", icon: "Target", progress: 72, risk: "yellow" as Risk, weight: 15 },
  { key: "essays", label: "Essays", icon: "PenLine", progress: 64, risk: "yellow" as Risk, weight: 25 },
  { key: "recommendations", label: "Recommendations", icon: "Mail", progress: 80, risk: "green" as Risk, weight: 15 },
  { key: "financial", label: "Financial Aid", icon: "Wallet", progress: 35, risk: "red" as Risk, weight: 15 },
];

export const readinessScore = Math.round(
  healthCategories.reduce((acc, c) => acc + (c.progress * c.weight) / 100, 0),
);

export type University = {
  id: string;
  name: string;
  short: string;
  type: "ED" | "EA" | "REA" | "RD";
  acceptance: number;
  location: string;
  deadline: string;
  faDeadline: string;
  supplementDeadline: string;
  portal: string;
  contact: string;
  interest: 1 | 2 | 3 | 4 | 5;
  fitScore: number;
  status: "Researching" | "Applying" | "Submitted" | "Accepted" | "Waitlisted";
  color: string;
  mission: string;
  programs: string[];
};

export const universities: University[] = [
  {
    id: "nyu", name: "New York University", short: "NYU", type: "ED", acceptance: 8, location: "New York, NY",
    deadline: "2025-11-01", faDeadline: "2025-11-15", supplementDeadline: "2025-11-01",
    portal: "applynow.nyu.edu", contact: "admissions@nyu.edu", interest: 5, fitScore: 96, status: "Applying",
    color: "#57068C",
    mission: "A private research university shaping the future through interdisciplinary scholarship in the heart of New York City.",
    programs: ["Computer Science", "Stern Business", "Tisch Arts", "Courant Math"],
  },
  {
    id: "columbia", name: "Columbia University", short: "CU", type: "RD", acceptance: 4, location: "New York, NY",
    deadline: "2026-01-01", faDeadline: "2026-02-15", supplementDeadline: "2026-01-01",
    portal: "apply.columbia.edu", contact: "ugrad-ask@columbia.edu", interest: 5, fitScore: 91, status: "Applying",
    color: "#1E3A8A",
    mission: "Ivy League research powerhouse blending classical core curriculum with global, urban opportunity.",
    programs: ["SEAS", "Columbia College", "Economics", "Data Science"],
  },
  {
    id: "mit", name: "MIT", short: "MIT", type: "EA", acceptance: 4, location: "Cambridge, MA",
    deadline: "2025-11-01", faDeadline: "2025-11-15", supplementDeadline: "2025-11-01",
    portal: "apply.mitadmissions.org", contact: "admissions@mit.edu", interest: 5, fitScore: 88, status: "Applying",
    color: "#8B0000",
    mission: "Advancing knowledge and educating students in science, technology, and other areas to serve the world.",
    programs: ["EECS", "Mathematics", "Sloan", "Physics"],
  },
  {
    id: "stanford", name: "Stanford University", short: "SU", type: "REA", acceptance: 4, location: "Stanford, CA",
    deadline: "2025-11-01", faDeadline: "2025-11-15", supplementDeadline: "2025-11-01",
    portal: "admission.stanford.edu", contact: "admission@stanford.edu", interest: 5, fitScore: 84, status: "Researching",
    color: "#8C1515",
    mission: "Cultivating leaders through rigorous research, entrepreneurship, and an interdisciplinary Silicon Valley culture.",
    programs: ["CS", "Symbolic Systems", "GSB Future", "Engineering"],
  },
  {
    id: "harvard", name: "Harvard University", short: "HU", type: "REA", acceptance: 3, location: "Cambridge, MA",
    deadline: "2025-11-01", faDeadline: "2025-11-01", supplementDeadline: "2025-11-01",
    portal: "college.harvard.edu", contact: "college@fas.harvard.edu", interest: 4, fitScore: 80, status: "Researching",
    color: "#A41034",
    mission: "Educating citizens and citizen-leaders for our society through liberal arts and sciences excellence.",
    programs: ["Applied Math", "Economics", "CS", "Statistics"],
  },
  {
    id: "yale", name: "Yale University", short: "YU", type: "RD", acceptance: 5, location: "New Haven, CT",
    deadline: "2026-01-02", faDeadline: "2026-03-01", supplementDeadline: "2026-01-02",
    portal: "admissions.yale.edu", contact: "student.questions@yale.edu", interest: 4, fitScore: 78, status: "Researching",
    color: "#0F4D92",
    mission: "Committed to improving the world today and for future generations through outstanding research and scholarship.",
    programs: ["Economics", "CS", "Global Affairs", "Mathematics"],
  },
  {
    id: "uchicago", name: "University of Chicago", short: "UC", type: "ED", acceptance: 5, location: "Chicago, IL",
    deadline: "2025-11-01", faDeadline: "2025-11-01", supplementDeadline: "2025-11-01",
    portal: "collegeadmissions.uchicago.edu", contact: "collegeadmissions@uchicago.edu", interest: 4, fitScore: 85, status: "Applying",
    color: "#800000",
    mission: "A community of scholars devoted to rigorous inquiry and a tradition of free, open intellectual debate.",
    programs: ["Economics", "CS", "Math", "Public Policy"],
  },
  {
    id: "princeton", name: "Princeton University", short: "PU", type: "RD", acceptance: 4, location: "Princeton, NJ",
    deadline: "2026-01-01", faDeadline: "2026-02-01", supplementDeadline: "2026-01-01",
    portal: "admission.princeton.edu", contact: "uaoffice@princeton.edu", interest: 4, fitScore: 82, status: "Researching",
    color: "#FF8F00",
    mission: "Advancing learning through scholarship, research, and teaching of unsurpassed quality.",
    programs: ["ORFE", "COS", "Economics", "SPIA"],
  },
];

export type Essay = {
  id: string;
  title: string;
  university: string;
  prompt: string;
  wordLimit: number;
  wordCount: number;
  status: "Ideas" | "Brainstorming" | "Draft 1" | "Draft 2" | "Revision" | "Final Review" | "Ready" | "Submitted";
  type: "Personal" | "Supplemental" | "Scholarship" | "Additional";
  due: string;
};

export const essays: Essay[] = [
  { id: "e1", title: "Personal Statement", university: "Common App", prompt: "Some students have a background...", wordLimit: 650, wordCount: 612, status: "Final Review", type: "Personal", due: "2025-11-01" },
  { id: "e2", title: "Why NYU?", university: "NYU", prompt: "We would like to know more about your interest in NYU.", wordLimit: 400, wordCount: 380, status: "Ready", type: "Supplemental", due: "2025-11-01" },
  { id: "e3", title: "Community Essay", university: "NYU", prompt: "NYU was founded on the belief that...", wordLimit: 250, wordCount: 240, status: "Revision", type: "Supplemental", due: "2025-11-01" },
  { id: "e4", title: "Why Columbia?", university: "Columbia", prompt: "Why are you interested in attending Columbia?", wordLimit: 200, wordCount: 145, status: "Draft 2", type: "Supplemental", due: "2026-01-01" },
  { id: "e5", title: "List: Books", university: "Columbia", prompt: "List the books you read for pleasure.", wordLimit: 100, wordCount: 80, status: "Draft 1", type: "Supplemental", due: "2026-01-01" },
  { id: "e6", title: "Maker Portfolio Essay", university: "MIT", prompt: "Tell us about something you do for the pleasure of it.", wordLimit: 250, wordCount: 110, status: "Brainstorming", type: "Supplemental", due: "2025-11-01" },
  { id: "e7", title: "World you come from", university: "Stanford", prompt: "The Stanford community is deeply curious...", wordLimit: 250, wordCount: 0, status: "Ideas", type: "Supplemental", due: "2025-11-01" },
  { id: "e8", title: "Intellectual Vitality", university: "Stanford", prompt: "Reflect on an idea or experience...", wordLimit: 250, wordCount: 0, status: "Ideas", type: "Supplemental", due: "2025-11-01" },
  { id: "e9", title: "UChicago Extended", university: "UChicago", prompt: "Mantis shrimp can perceive...", wordLimit: 650, wordCount: 320, status: "Draft 1", type: "Supplemental", due: "2025-11-01" },
  { id: "e10", title: "Coca-Cola Scholarship", university: "Coca-Cola", prompt: "Describe your leadership impact.", wordLimit: 500, wordCount: 500, status: "Submitted", type: "Scholarship", due: "2025-10-31" },
];

export const essayColumns: Essay["status"][] = [
  "Ideas", "Brainstorming", "Draft 1", "Draft 2", "Revision", "Final Review", "Ready", "Submitted",
];

export type Activity = {
  id: string;
  name: string;
  position: string;
  organization: string;
  hoursPerWeek: number;
  weeksPerYear: number;
  grades: string;
  category: string;
  impact: number;
  leadership: number;
  shortDesc: string;
};

export const activities: Activity[] = [
  { id: "a1", name: "Founder, AI for Civics", position: "Founder & CEO", organization: "AI4Civics Nonprofit", hoursPerWeek: 15, weeksPerYear: 48, grades: "11,12", category: "Community Service", impact: 95, leadership: 98, shortDesc: "Founded nonprofit using LLMs to translate civic docs; 12K users across 9 cities." },
  { id: "a2", name: "Varsity Debate Captain", position: "Captain", organization: "School Debate Team", hoursPerWeek: 10, weeksPerYear: 36, grades: "10,11,12", category: "Debate/Speech", impact: 88, leadership: 92, shortDesc: "Led team to State Finals; coached 14 novices; ranked top 30 nationally." },
  { id: "a3", name: "Research Intern – NYU CILVR Lab", position: "Research Intern", organization: "NYU Courant", hoursPerWeek: 20, weeksPerYear: 10, grades: "11", category: "Academic Research", impact: 90, leadership: 70, shortDesc: "Coauthored paper on RLHF preference modeling; presented at lab symposium." },
  { id: "a4", name: "USACO Gold Competitor", position: "Competitor", organization: "USACO", hoursPerWeek: 8, weeksPerYear: 30, grades: "10,11,12", category: "Competition", impact: 82, leadership: 60, shortDesc: "Gold division; finalist in HackMIT and CalHacks." },
  { id: "a5", name: "Editor, School Newspaper", position: "Editor-in-Chief", organization: "The Tribune", hoursPerWeek: 6, weeksPerYear: 32, grades: "11,12", category: "Journalism", impact: 75, leadership: 88, shortDesc: "Doubled readership; launched podcast spinoff with 8K monthly listens." },
  { id: "a6", name: "Volunteer Math Tutor", position: "Tutor", organization: "Title I Middle School", hoursPerWeek: 4, weeksPerYear: 30, grades: "10,11,12", category: "Community Service", impact: 70, leadership: 65, shortDesc: "Tutor 6th–8th graders weekly; designed Algebra readiness curriculum." },
];

export const honors = [
  { id: "h1", award: "Regeneron STS Scholar", level: "National", year: 2025, desc: "Top 300 of 2,500 entrants." },
  { id: "h2", award: "Coca-Cola Scholar Semifinalist", level: "National", year: 2025, desc: "Top 1,500 of 100K applicants." },
  { id: "h3", award: "USACO Gold Promotion", level: "National", year: 2024, desc: "Promoted to Gold Division." },
  { id: "h4", award: "State Debate Finalist", level: "Regional", year: 2024, desc: "Top 8 statewide in Lincoln-Douglas." },
  { id: "h5", award: "NCWIT Aspirations Winner", level: "Regional", year: 2024, desc: "Regional winner, women in tech." },
];

export const recommendations = [
  { id: "r1", teacher: "Dr. Patel", subject: "AP Calculus BC", strength: 5, email: "patel@school.edu", requested: true, accepted: true, submitted: false, thanked: false },
  { id: "r2", teacher: "Ms. Reyes", subject: "AP English Lit", strength: 5, email: "reyes@school.edu", requested: true, accepted: true, submitted: true, thanked: true },
  { id: "r3", teacher: "Mr. Okafor", subject: "AP Physics C", strength: 4, email: "okafor@school.edu", requested: true, accepted: true, submitted: false, thanked: false },
  { id: "r4", teacher: "Counselor: Ms. Lee", subject: "Counselor Rec", strength: 5, email: "lee@school.edu", requested: true, accepted: true, submitted: true, thanked: true },
];

export const satScores = [
  { date: "May", score: 1380 },
  { date: "Jun", score: 1420 },
  { date: "Aug", score: 1450 },
  { date: "Sep", score: 1460 },
  { date: "Oct", score: 1480 },
  { date: "Nov", score: 1510 },
];

export const detScores = [
  { date: "Jun", score: 105 },
  { date: "Jul", score: 115 },
  { date: "Aug", score: 120 },
  { date: "Sep", score: 122 },
  { date: "Oct", score: 125 },
];

export const finAidItems = [
  { id: "f1", name: "FAFSA", status: "in_progress" as Status, due: "2025-12-15" },
  { id: "f2", name: "CSS Profile", status: "in_progress" as Status, due: "2025-11-15" },
  { id: "f3", name: "NYU Financial Aid Form", status: "not_started" as Status, due: "2025-11-15" },
  { id: "f4", name: "Federal Tax Return (Parent)", status: "review" as Status, due: "2025-11-01" },
  { id: "f5", name: "W-2 Forms", status: "complete" as Status, due: "2025-11-01" },
  { id: "f6", name: "Bank Statements", status: "not_started" as Status, due: "2025-12-01" },
  { id: "f7", name: "QuestBridge Application", status: "submitted" as Status, due: "2025-09-26" },
];

export const todayTasks = [
  { id: "t1", title: "Finalize NYU 'Why Us' essay", impact: "High", time: "60 min", priority: 1 },
  { id: "t2", title: "Submit CSS Profile parent income section", impact: "High", time: "45 min", priority: 1 },
  { id: "t3", title: "Take SAT practice section: Reading", impact: "Medium", time: "35 min", priority: 2 },
];

export const quickWins = [
  "Email Dr. Patel a thank-you note",
  "Update Common App activities word counts",
  "Confirm DET test date for Nov 8",
  "Add scholarship deadline to calendar",
];

export const upcomingDeadlines = [
  { id: "d1", task: "NYU ED Application", university: "NYU", category: "Application", priority: "P0", due: "2025-11-01", daysOut: 7 },
  { id: "d2", task: "MIT EA Application", university: "MIT", category: "Application", priority: "P0", due: "2025-11-01", daysOut: 7 },
  { id: "d3", task: "Maker Portfolio Essay", university: "MIT", category: "Essay", priority: "P1", due: "2025-11-01", daysOut: 7 },
  { id: "d4", task: "CSS Profile", university: "All", category: "Financial Aid", priority: "P0", due: "2025-11-15", daysOut: 21 },
  { id: "d5", task: "Stanford REA Application", university: "Stanford", category: "Application", priority: "P0", due: "2025-11-01", daysOut: 7 },
  { id: "d6", task: "UChicago ED Supplement", university: "UChicago", category: "Essay", priority: "P1", due: "2025-11-01", daysOut: 7 },
  { id: "d7", task: "Columbia 'Why Us'", university: "Columbia", category: "Essay", priority: "P2", due: "2026-01-01", daysOut: 60 },
  { id: "d8", task: "Yale Application", university: "Yale", category: "Application", priority: "P2", due: "2026-01-02", daysOut: 61 },
  { id: "d9", task: "Princeton Application", university: "Princeton", category: "Application", priority: "P2", due: "2026-01-01", daysOut: 60 },
];

export const alerts = [
  { id: "al1", level: "red", title: "MIT Maker Portfolio Essay only 110/250 words", detail: "Due in 7 days." },
  { id: "al2", level: "red", title: "Dr. Patel rec not submitted", detail: "Send a gentle follow-up email." },
  { id: "al3", level: "yellow", title: "DET not scheduled within 30 days", detail: "Latest score 125; target 135." },
  { id: "al4", level: "yellow", title: "Stanford essays not started", detail: "2 supplements remain at 'Ideas' stage." },
];

export const badges = [
  { id: "b1", name: "Essay Master", unlocked: true, desc: "5 essays in Final Review or beyond" },
  { id: "b2", name: "Research Scholar", unlocked: true, desc: "Authored research with a faculty mentor" },
  { id: "b3", name: "Recommendation Expert", unlocked: false, desc: "All recs submitted" },
  { id: "b4", name: "Application Complete", unlocked: false, desc: "Submit 5 applications" },
  { id: "b5", name: "Streak Saint", unlocked: true, desc: "30-day execution streak" },
  { id: "b6", name: "Financial Ready", unlocked: false, desc: "Submit FAFSA + CSS" },
];

export const weeklyHours = [
  { day: "Mon", hours: 3.2 },
  { day: "Tue", hours: 2.5 },
  { day: "Wed", hours: 4.1 },
  { day: "Thu", hours: 3.0 },
  { day: "Fri", hours: 2.2 },
  { day: "Sat", hours: 5.6 },
  { day: "Sun", hours: 4.8 },
];

export const readinessEvolution = [
  { week: "W1", score: 42 },
  { week: "W2", score: 48 },
  { week: "W3", score: 55 },
  { week: "W4", score: 61 },
  { week: "W5", score: 68 },
  { week: "W6", score: 73 },
  { week: "W7", score: 78 },
  { week: "W8", score: readinessScore },
];
