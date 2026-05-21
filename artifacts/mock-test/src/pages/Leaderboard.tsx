import { useState } from "react";
import { motion } from "framer-motion";
import { getLeaderboard, clearLeaderboard, formatTime, getGrade, LeaderboardEntry } from "../data/leaderboard";

interface LeaderboardProps {
  onBack: () => void;
}

export default function Leaderboard({ onBack }: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(getLeaderboard());

  function handleClear() {
    if (confirm("Clear all leaderboard history?")) {
      clearLeaderboard();
      setEntries([]);
    }
  }

  const best = entries.reduce<LeaderboardEntry | null>((acc, e) => {
    if (!acc || e.percentage > acc.percentage) return e;
    return acc;
  }, null);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0f172a" }}>
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-all"
          >
            <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <div className="font-bold text-white text-lg leading-tight">Leaderboard</div>
            <div className="text-xs text-slate-500">Your personal test history</div>
          </div>
        </div>
        {entries.length > 0 && (
          <button
            onClick={handleClear}
            className="px-3 py-1.5 rounded-lg text-xs text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-all"
          >
            Clear All
          </button>
        )}
      </header>

      <div className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full space-y-5">
        {entries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-64 text-center space-y-3"
          >
            <div className="text-5xl">🏆</div>
            <p className="text-slate-300 font-semibold text-lg">No tests yet!</p>
            <p className="text-slate-500 text-sm">Complete a mock test to see your score here.</p>
            <button
              onClick={onBack}
              className="mt-2 px-6 py-2.5 rounded-xl bg-sky-500 text-white font-medium text-sm hover:bg-sky-400 transition-all"
            >
              Take a Test
            </button>
          </motion.div>
        ) : (
          <>
            {/* Personal best */}
            {best && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl bg-gradient-to-r from-yellow-500/20 to-amber-500/10 border border-yellow-500/30 p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-yellow-400 text-lg">🏆</span>
                  <span className="text-yellow-400 font-bold text-sm uppercase tracking-wide">Personal Best</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-bold text-lg">{best.exam}</div>
                    <div className="text-slate-400 text-xs mt-0.5">{best.language} · {new Date(best.date).toLocaleDateString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-extrabold text-yellow-400">{best.percentage}%</div>
                    <div className="text-slate-400 text-xs">{best.score}/{best.total}</div>
                  </div>
                </div>
                <div className="mt-3 flex gap-4 text-xs text-slate-400">
                  <span>Time: <span className="text-slate-300">{formatTime(best.timeTaken)}</span></span>
                  {best.streak > 1 && <span>Best streak: <span className="text-orange-400">{best.streak} 🔥</span></span>}
                </div>
              </motion.div>
            )}

            {/* Stats summary */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Tests Taken", value: entries.length, color: "text-sky-400" },
                {
                  label: "Avg Score",
                  value: `${Math.round(entries.reduce((s, e) => s + e.percentage, 0) / entries.length)}%`,
                  color: "text-emerald-400",
                },
                {
                  label: "Best Streak",
                  value: Math.max(...entries.map((e) => e.streak || 0)),
                  color: "text-orange-400",
                },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-slate-800 border border-slate-700 p-3 text-center">
                  <div className={`text-xl font-extrabold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* History list */}
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">History</h3>
              <div className="space-y-2">
                {entries.map((entry, i) => {
                  const grade = getGrade(entry.percentage);
                  return (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="rounded-xl bg-slate-800/60 border border-slate-700/50 p-4 flex items-center gap-4"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold shrink-0"
                        style={{
                          background:
                            entry.percentage >= 75
                              ? "rgba(34,197,94,0.15)"
                              : entry.percentage >= 50
                              ? "rgba(245,158,11,0.15)"
                              : "rgba(239,68,68,0.15)",
                          color:
                            entry.percentage >= 75
                              ? "#4ade80"
                              : entry.percentage >= 50
                              ? "#fbbf24"
                              : "#f87171",
                        }}
                      >
                        {entry.percentage}%
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium text-sm truncate">{entry.exam}</div>
                        <div className="text-slate-500 text-xs flex items-center gap-2 mt-0.5">
                          <span>{entry.score}/{entry.total}</span>
                          <span>·</span>
                          <span>{entry.language}</span>
                          <span>·</span>
                          <span>{formatTime(entry.timeTaken)}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className={`text-xs font-semibold ${grade.color}`}>{grade.label}</div>
                        {entry.streak > 1 && (
                          <div className="text-xs text-orange-400">{entry.streak}x 🔥</div>
                        )}
                        <div className="text-xs text-slate-600 mt-0.5">
                          {new Date(entry.date).toLocaleDateString()}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
