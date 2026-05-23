import { useState } from "react";
import { motion } from "framer-motion";
import { examNames, Language } from "../data/questions";
import { getLeaderboard } from "../data/leaderboard";

interface SetupProps {
  onStart: (config: {
    exam: string;
    language: Language;
    count: number;
    minutes: number;
  }) => void;
  onLeaderboard: () => void;
}

export default function Setup({ onStart, onLeaderboard }: SetupProps) {
  const [exam, setExam] = useState(examNames[0]);
  const [language, setLanguage] = useState<Language>("English");
  const [count, setCount] = useState(10);
  const [minutes, setMinutes] = useState(10);

  const topScores = getLeaderboard().slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0f172a" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center text-lg font-bold shadow-lg shadow-sky-500/30">
            M
          </div>
          <div>
            <div className="font-bold text-sky-400 text-lg leading-tight">MockTest India</div>
            <div className="text-xs text-slate-500">All India Competitive Exams</div>
          </div>
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

      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-lg space-y-5">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Ultimate{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
                Mock Test
              </span>{" "}
              Platform
            </h1>
            <p className="text-slate-400 mt-2 text-sm">
              Practice for 21 All India & State Exams · English / Hindi / Odia
            </p>
          </motion.div>

          {/* Recent scores mini-board */}
          {topScores.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-slate-800/60 border border-slate-700/60 p-4"
            >
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Your Recent Tests</p>
              <div className="flex gap-3">
                {topScores.map((s) => (
                  <div
                    key={s.id}
                    className="flex-1 rounded-xl bg-slate-700/60 p-3 text-center"
                  >
                    <div className="text-lg font-bold text-sky-400">{s.percentage}%</div>
                    <div className="text-xs text-slate-400 truncate">{s.exam}</div>
                    <div className="text-xs text-slate-500">{s.score}/{s.total}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Config card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl bg-slate-800/60 border border-slate-700/60 p-6 space-y-5"
          >
            <h2 className="font-semibold text-white text-base">Configure Your Test</h2>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Exam</label>
              <select
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
              >
                {examNames.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Language</label>
              <div className="grid grid-cols-3 gap-2">
                {(["English", "Hindi", "Odia"] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                      language === lang
                        ? "bg-sky-500 border-sky-400 text-white shadow-lg shadow-sky-500/30"
                        : "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Questions</label>
                <select
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                >
                  <option value={5}>5 Questions</option>
                  <option value={10}>10 Questions</option>
                  <option value={20}>20 Questions</option>
                  <option value={50}>50 Questions</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Duration</label>
                <select
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                >
                  <option value={5}>5 Minutes</option>
                  <option value={10}>10 Minutes</option>
                  <option value={15}>15 Minutes</option>
                  <option value={30}>30 Minutes</option>
                </select>
              </div>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStart({ exam, language, count, minutes })}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-bold text-lg shadow-xl shadow-sky-500/30 hover:shadow-sky-500/50 transition-all"
          >
            Start Free Mock Test
          </motion.button>

          <p className="text-center text-slate-500 text-xs">
            Made for India Students · 21 Exams · English / Hindi / Odia
          </p>
        </div>
      </div>
    </div>
  );
}
