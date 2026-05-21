export interface LeaderboardEntry {
  id: string;
  exam: string;
  language: string;
  score: number;
  total: number;
  percentage: number;
  timeTaken: number;
  streak: number;
  date: string;
}

const KEY = "mock_test_leaderboard";

export function getLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as LeaderboardEntry[];
  } catch {
    return [];
  }
}

export function saveResult(entry: Omit<LeaderboardEntry, "id">): void {
  const existing = getLeaderboard();
  const newEntry: LeaderboardEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  };
  const updated = [newEntry, ...existing].slice(0, 50);
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function clearLeaderboard(): void {
  localStorage.removeItem(KEY);
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function getGrade(pct: number): { label: string; color: string } {
  if (pct >= 90) return { label: "Excellent", color: "text-emerald-400" };
  if (pct >= 75) return { label: "Very Good", color: "text-sky-400" };
  if (pct >= 60) return { label: "Good", color: "text-yellow-400" };
  if (pct >= 40) return { label: "Average", color: "text-orange-400" };
  return { label: "Needs Work", color: "text-red-400" };
}
