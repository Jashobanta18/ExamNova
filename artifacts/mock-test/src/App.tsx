import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Setup from "@/pages/Setup";
import Quiz from "@/pages/Quiz";
import Results from "@/pages/Results";
import Leaderboard from "@/pages/Leaderboard";
import { allQuestions, Language } from "@/data/questions";
import { saveResult } from "@/data/leaderboard";

const queryClient = new QueryClient();

type Screen = "setup" | "quiz" | "results" | "leaderboard";

interface TestConfig {
  exam: string;
  language: Language;
  count: number;
  minutes: number;
}

interface TestResult {
  answers: (number | null)[];
  score: number;
  timeTaken: number;
  streak: number;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function AppInner() {
  const [screen, setScreen] = useState<Screen>("setup");
  const [config, setConfig] = useState<TestConfig | null>(null);
  const [questions, setQuestions] = useState(allQuestions.slice(0, 10));
  const [result, setResult] = useState<TestResult | null>(null);

  function handleStart(cfg: TestConfig) {
    const filtered = allQuestions.filter((q) => q.exam === cfg.exam);
    const shuffled = shuffleArray(filtered).slice(0, cfg.count);
    setQuestions(shuffled);
    setConfig(cfg);
    setResult(null);
    setScreen("quiz");
  }

  function handleFinish(res: TestResult) {
    if (!config) return;
    const pct = Math.round((res.score / questions.length) * 100);
    saveResult({
      exam: config.exam,
      language: config.language,
      score: res.score,
      total: questions.length,
      percentage: pct,
      timeTaken: res.timeTaken,
      streak: res.streak,
      date: new Date().toISOString(),
    });
    setResult(res);
    setScreen("results");
  }

  function handleRestart() {
    setScreen("setup");
  }

  if (screen === "quiz" && config) {
    return (
      <Quiz
        questions={questions}
        language={config.language}
        totalSeconds={config.minutes * 60}
        onFinish={handleFinish}
      />
    );
  }

  if (screen === "results" && result && config) {
    return (
      <Results
        questions={questions}
        answers={result.answers}
        score={result.score}
        timeTaken={result.timeTaken}
        totalSeconds={config.minutes * 60}
        streak={result.streak}
        exam={config.exam}
        language={config.language}
        onRestart={handleRestart}
        onLeaderboard={() => setScreen("leaderboard")}
      />
    );
  }

  if (screen === "leaderboard") {
    return <Leaderboard onBack={() => setScreen("setup")} />;
  }

  return (
    <Setup
      onStart={handleStart}
      onLeaderboard={() => setScreen("leaderboard")}
    />
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInner />
    </QueryClientProvider>
  );
}
