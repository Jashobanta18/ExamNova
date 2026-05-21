import { useEffect } from "react";
import { motion } from "framer-motion";
import { Question, Language } from "../data/questions";
import { getGrade, formatTime } from "../data/leaderboard";

interface ResultsProps {
  questions: Question[];
  answers: (number | null)[];
  score: number;
  timeTaken: number;
  totalSeconds: number;
  streak: number;
  exam: string;
  language: Language;
  onRestart: () => void;
  onLeaderboard: () => void;
}

export default function Results({
  questions,
  answers,
  score,
  timeTaken,
  totalSeconds,
  streak,
  exam,
  language,
  onRestart,
  onLeaderboard,
}: ResultsProps) {
  const total = questions.length;
  const pct = Math.round((score / total) * 100);
  const wrong = answers.filter((a, i) => a !== null && a !== questions[i].answer).length;
  const skipped = answers.filter((a) => a === null).length;
  const grade = getGrade(pct);

  const circumference = 2 * Math.PI * 44;
  const strokeDash = ((pct / 100) * circumference).toFixed(1);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0f172a" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center text-lg font-bold shadow-lg shadow-sky-500/30">
            M
          </div>
          <div className="font-bold text-sky-400 text-lg">MockTest India</div>
        </div>
        <button
          onClick={onLeaderboard}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-sm font-medium text-slate-300 transition-all"
        >
          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Leaderboard
        </button>
      </header>

      <div className="flex-1 px-4 py-8 max-w-2xl mx-auto w-full space-y-6">
        {/* Score circle + grade */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h1 className="text-2xl font-extrabold text-white mb-1">Test Completed!</h1>
          <p className="text-slate-400 text-sm">{exam} · {language}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center"
        >
          <div className="relative w-36 h-36">
            <svg className="w-36 h-36 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="#1e293b" strokeWidth="10" />
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke={pct >= 75 ? "#22c55e" : pct >= 50 ? "#f59e0b" : "#ef4444"}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${strokeDash} ${circumference}`}
                style={{ transition: "stroke-dasharray 1s ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-white">{pct}%</span>
              <span className={`text-xs font-semibold ${grade.color}`}>{grade.label}</span>
            </div>
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {[
            { label: "Correct", value: score, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30" },
            { label: "Wrong", value: wrong, color: "text-red-400", bg: "bg-red-500/10 border-red-500/30" },
            { label: "Skipped", value: skipped, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/30" },
            { label: "Best Streak", value: streak, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/30" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-xl border p-3 text-center ${stat.bg}`}
            >
              <div className={`text-2xl font-extrabold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex gap-2 text-xs text-slate-500 justify-center"
        >
          <span>Time used: <span className="text-slate-300">{formatTime(timeTaken)}</span></span>
          <span>·</span>
          <span>Total: <span className="text-slate-300">{formatTime(totalSeconds)}</span></span>
        </motion.div>

        {/* Answer review */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h2 className="font-bold text-white text-base">Answer Review</h2>
          {questions.map((q, idx) => {
            const userAns = answers[idx];
            const correct = q.answer;
            const isCorrect = userAns === correct;
            const isSkipped = userAns === null;

            return (
              <div
                key={idx}
                className={`rounded-xl border p-4 space-y-2 ${
                  isSkipped
                    ? "bg-slate-800/40 border-slate-700/50"
                    : isCorrect
                    ? "bg-emerald-500/10 border-emerald-500/30"
                    : "bg-red-500/10 border-red-500/30"
                }`}
              >
                <div className="flex items-start gap-2">
                  <span
                    className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                      isSkipped
                        ? "bg-slate-700 text-slate-400"
                        : isCorrect
                        ? "bg-emerald-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {isSkipped ? "—" : isCorrect ? "✓" : "✗"}
                  </span>
                  <p className="text-sm text-white font-medium leading-snug">
                    Q{idx + 1}: {q.question[language]}
                  </p>
                </div>

                <div className="ml-8 space-y-1 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400 font-medium">Correct:</span>
                    <span className="text-slate-300">{q.options[language][correct]}</span>
                  </div>
                  {!isSkipped && !isCorrect && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-red-400 font-medium">Your answer:</span>
                      <span className="text-slate-400">{q.options[language][userAns!]}</span>
                    </div>
                  )}
                  {isSkipped && (
                    <div className="text-slate-500 italic">Skipped</div>
                  )}
                  {q.explanation && (
                    <div className="mt-1.5 text-slate-400 bg-slate-800/50 rounded-lg p-2 leading-relaxed">
                      {q.explanation[language]}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3 pt-2 pb-8"
        >
          <button
            onClick={onLeaderboard}
            className="flex-1 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-medium text-sm transition-all"
          >
            View Leaderboard
          </button>
          <button
            onClick={onRestart}
            className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-bold text-sm shadow-lg shadow-sky-500/25 hover:shadow-sky-500/50 transition-all"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    </div>
  );
}
