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
<div style={{
textAlign:"center",
padding:"40px",
borderRadius:"20px",
boxShadow:"0 8px 20px rgba(0,0,0,0.2)",
margin:"20px",
background:"linear-gradient(135deg,#1e3c72,#2a5298)",
color:"white"
}}>

<img
src={founder}
alt="Founder"
style={{
width:"150px",
height:"150px",
borderRadius:"50%",
objectFit:"cover",
border:"5px solid white"
}}
/>

<h1 style={{fontSize:"32px",marginTop:"15px"}}>
Jashobanta Behera
</h1>

<h2>Founder & Creator of ExamNova</h2>

<p style={{
fontSize:"18px",
maxWidth:"700px",
margin:"auto",
lineHeight:"1.8"
}}>
ExamNova is an innovative online examination platform created to help
students prepare smarter for competitive exams like UPSC, IAS, IPS, OPCS, OPSI, NEET, JEE, OJEE, OSSC, OSSSC, OPSC,
CTET, OTET, SSC, Banking and more.
</p>

<p style={{marginTop:"20px"}}>
Empowering Odisha & India’s students through digital learning.
</p>

<button style={{
padding:"12px 25px",
borderRadius:"30px",
border:"none",
fontSize:"16px",
cursor:"pointer"
}}>
Explore ExamNova
</button>

</div>
