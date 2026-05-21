import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Question, Language } from "../data/questions";
import { formatTime } from "../data/leaderboard";

interface QuizProps {
  questions: Question[];
  language: Language;
  totalSeconds: number;
  onFinish: (result: {
    answers: (number | null)[];
    score: number;
    timeTaken: number;
    streak: number;
  }) => void;
}

export default function Quiz({ questions, language, totalSeconds, onFinish }: QuizProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [score, setScore] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [shakeWrong, setShakeWrong] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(Date.now());

  const finish = useCallback(
    (finalAnswers: (number | null)[], finalScore: number, finalStreak: number) => {
      if (timerRef.current) clearInterval(timerRef.current);
      const timeTaken = totalSeconds - timeLeft;
      onFinish({ answers: finalAnswers, score: finalScore, timeTaken, streak: finalStreak });
    },
    [onFinish, totalSeconds, timeLeft]
  );

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          finish(answers, score, bestStreak);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const timerPct = (timeLeft / totalSeconds) * 100;
  const timerColor =
    timerPct > 50 ? "#22c55e" : timerPct > 25 ? "#f59e0b" : "#ef4444";

  function selectOption(idx: number) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);

    const isCorrect = idx === questions[current].answer;
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);

    let newScore = score;
    let newStreak = currentStreak;
    let newBestStreak = bestStreak;

    if (isCorrect) {
      newScore = score + 1;
      newStreak = currentStreak + 1;
      newBestStreak = Math.max(bestStreak, newStreak);
      setScore(newScore);
    } else {
      setShakeWrong(true);
      setTimeout(() => setShakeWrong(false), 500);
      newStreak = 0;
    }
    setCurrentStreak(newStreak);
    setBestStreak(newBestStreak);
  }

  function next() {
    if (!answered) {
      setShakeWrong(true);
      setTimeout(() => setShakeWrong(false), 500);
      return;
    }
    proceed();
  }

  function skip() {
    if (answered) { proceed(); return; }
    const newAnswers = [...answers];
    newAnswers[current] = null;
    setAnswers(newAnswers);
    setCurrentStreak(0);
    proceed(newAnswers);
  }

  function proceed(forcedAnswers?: (number | null)[]) {
    const finalAnswers = forcedAnswers ?? answers;
    if (current + 1 >= questions.length) {
      finish(finalAnswers, score, bestStreak);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
      setShowExplanation(false);
    }
  }

  const q = questions[current];
  const progressPct = ((current) / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0f172a" }}>
      {/* Top bar */}
      <div className="px-4 pt-4 pb-2 space-y-3">
        {/* Meta row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Question</span>
            <span className="font-bold text-white">{current + 1}</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">{questions.length}</span>
          </div>

          {/* Streak */}
          {currentStreak >= 2 && (
            <motion.div
              key={currentStreak}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold"
            >
              <span>🔥</span> {currentStreak} Streak
            </motion.div>
          )}

          {/* Timer */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-bold"
            style={{
              background: timerPct <= 25 ? "rgba(239,68,68,0.2)" : "rgba(30,41,59,0.8)",
              color: timerColor,
              border: `1px solid ${timerColor}40`,
            }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <polyline points="12 6 12 12 16 14" strokeWidth="2" />
            </svg>
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Timer bar */}
        <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
          <div
            className="h-full rounded-full timer-bar-transition"
            style={{ width: `${timerPct}%`, background: timerColor }}
          />
        </div>

        {/* Score */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Progress {current}/{questions.length}</span>
          <span className="text-emerald-400 font-medium">Score: {score}</span>
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 px-4 pb-6 flex flex-col gap-4 max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {/* Question */}
            <div
              className={`rounded-2xl bg-slate-800/80 border border-slate-700 p-5 ${shakeWrong ? "animate-shake" : ""}`}
            >
              <p className="text-sm font-medium text-slate-400 mb-2">
                {q.exam}
              </p>
              <p className="text-white font-semibold text-lg leading-relaxed">
                {q.question[language]}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {q.options[language].map((opt, idx) => {
                const isCorrect = idx === q.answer;
                const isSelected = idx === selected;
                let optStyle = "bg-slate-800 border-slate-700 text-white hover:bg-slate-700 hover:border-slate-500";

                if (answered) {
                  if (isCorrect) {
                    optStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300";
                  } else if (isSelected && !isCorrect) {
                    optStyle = "bg-red-500/20 border-red-500 text-red-300";
                  } else {
                    optStyle = "bg-slate-800/50 border-slate-700/50 text-slate-500";
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    whileHover={!answered ? { scale: 1.01 } : {}}
                    whileTap={!answered ? { scale: 0.99 } : {}}
                    onClick={() => selectOption(idx)}
                    disabled={answered}
                    className={`w-full rounded-xl border p-4 text-left flex items-center gap-3 transition-all ${optStyle}`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        answered && isCorrect
                          ? "bg-emerald-500 text-white"
                          : answered && isSelected && !isCorrect
                          ? "bg-red-500 text-white"
                          : "bg-slate-700 text-slate-400"
                      }`}
                    >
                      {["A", "B", "C", "D"][idx]}
                    </span>
                    <span className="text-sm">{opt}</span>
                    {answered && isCorrect && (
                      <span className="ml-auto text-emerald-400">✓</span>
                    )}
                    {answered && isSelected && !isCorrect && (
                      <span className="ml-auto text-red-400">✗</span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation (if answered and exists) */}
            {answered && q.explanation && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl bg-sky-900/30 border border-sky-700/50 p-4"
              >
                <p className="text-xs font-semibold text-sky-400 mb-1 uppercase tracking-wide">Explanation</p>
                <p className="text-sm text-slate-300">{q.explanation[language]}</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Action buttons */}
        <div className="flex gap-3 mt-auto pt-2">
          <button
            onClick={skip}
            className="flex-1 py-3 rounded-xl border border-slate-600 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-sm font-medium transition-all"
          >
            {answered ? "Continue →" : "Skip"}
          </button>
          {!answered && (
            <button
              onClick={next}
              className="flex-2 flex-grow py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm transition-all shadow-lg shadow-sky-500/25"
            >
              Submit Answer
            </button>
          )}
          {answered && (
            <button
              onClick={() => proceed()}
              className="flex-2 flex-grow py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm transition-all shadow-lg shadow-sky-500/25"
            >
              Next Question →
            </button>
          )}
        </div>

        {/* Quit button */}
        <button
          onClick={() => finish(answers, score, bestStreak)}
          className="text-center text-xs text-slate-600 hover:text-slate-400 transition-colors py-1"
        >
          End Test Early
        </button>
      </div>
    </div>
  );
}
