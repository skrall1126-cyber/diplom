"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

// Хичээл тус бүрийн сорилын оноо — авсан / нийт
const scores = [
  {
    subject: "Python undes",
    dot: "bg-blue-400",
    text: "text-blue-300",
    tw: "border-blue-400/30 bg-blue-500/15",
    quizzes: [
      { name: "Сорил 1", got: 18, max: 20 },
      { name: "Сорил 2", got: 19, max: 20 },
      { name: "Сорил 3", got: 17, max: 20 },
      { name: "Сорил 4", got: 20, max: 20 },
    ],
  },
  {
    subject: "JavaScript",
    dot: "bg-amber-400",
    text: "text-amber-300",
    tw: "border-amber-400/30 bg-amber-500/15",
    quizzes: [
      { name: "Сорил 1", got: 15, max: 20 },
      { name: "Сорил 2", got: 14, max: 20 },
      { name: "Сорил 3", got: 16, max: 20 },
    ],
  },
  {
    subject: "Networking",
    dot: "bg-emerald-400",
    text: "text-emerald-300",
    tw: "border-emerald-400/30 bg-emerald-500/15",
    quizzes: [
      { name: "Сорил 1", got: 17, max: 20 },
      { name: "Сорил 2", got: 16, max: 20 },
      { name: "Сорил 3", got: 18, max: 20 },
    ],
  },
  {
    subject: "Database",
    dot: "bg-orange-400",
    text: "text-orange-300",
    tw: "border-orange-400/30 bg-orange-500/15",
    quizzes: [
      { name: "Сорил 1", got: 14, max: 20 },
      { name: "Сорил 2", got: 13, max: 20 },
      { name: "Сорил 3", got: 15, max: 20 },
    ],
  },
  {
    subject: "UI/UX design",
    dot: "bg-pink-400",
    text: "text-pink-300",
    tw: "border-pink-400/30 bg-pink-500/15",
    quizzes: [
      { name: "Сорил 1", got: 20, max: 20 },
      { name: "Сорил 2", got: 19, max: 20 },
      { name: "Сорил 3", got: 20, max: 20 },
      { name: "Сорил 4", got: 18, max: 20 },
    ],
  },
  {
    subject: "Cyber security",
    dot: "bg-red-400",
    text: "text-red-300",
    tw: "border-red-400/30 bg-red-500/15",
    quizzes: [
      { name: "Сорил 1", got: 16, max: 20 },
      { name: "Сорил 2", got: 17, max: 20 },
      { name: "Сорил 3", got: 14, max: 20 },
    ],
  },
  {
    subject: "Java fundamentals",
    dot: "bg-indigo-400",
    text: "text-indigo-300",
    tw: "border-indigo-400/30 bg-indigo-500/15",
    quizzes: [
      { name: "Сорил 1", got: 14, max: 20 },
      { name: "Сорил 2", got: 15, max: 20 },
      { name: "Сорил 3", got: 13, max: 20 },
    ],
  },
  {
    subject: "React development",
    dot: "bg-cyan-400",
    text: "text-cyan-300",
    tw: "border-cyan-400/30 bg-cyan-500/15",
    quizzes: [
      { name: "Сорил 1", got: 17, max: 20 },
      { name: "Сорил 2", got: 18, max: 20 },
      { name: "Сорил 3", got: 16, max: 20 },
    ],
  },
  {
    subject: "Linux administration",
    dot: "bg-lime-400",
    text: "text-lime-300",
    tw: "border-lime-400/30 bg-lime-500/15",
    quizzes: [
      { name: "Сорил 1", got: 15, max: 20 },
      { name: "Сорил 2", got: 16, max: 20 },
      { name: "Сорил 3", got: 17, max: 20 },
    ],
  },
];

function quizColor(got: number, max: number) {
  const pct = (got / max) * 100;
  if (pct >= 85) return "text-emerald-300";
  if (pct >= 65) return "text-amber-300";
  return "text-red-300";
}

function quizBarColor(got: number, max: number) {
  const pct = (got / max) * 100;
  if (pct >= 85) return "from-emerald-400 to-teal-400";
  if (pct >= 65) return "from-amber-400 to-orange-400";
  return "from-red-400 to-rose-400";
}

export default function ScoresPage() {
  const [activeMenu, setActiveMenu] = useState("Оюутан");
  const [selected, setSelected] = useState(scores[0].subject);

  const current = scores.find((s) => s.subject === selected) ?? scores[0];
  const totalGot = current.quizzes.reduce((a, q) => a + q.got, 0);
  const totalMax = current.quizzes.reduce((a, q) => a + q.max, 0);
  const totalPct = Math.round((totalGot / totalMax) * 100);

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <div className="flex">
        <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
        <main
          className="flex-1 overflow-y-auto bg-no-repeat px-4 py-6 md:px-6"
          style={{
            backgroundImage: "linear-gradient(rgba(8,14,30,0.9),rgba(8,12,24,0.95)),url('/indra-bg.jpg')",
            backgroundPosition: "center center",
            backgroundSize: "72%",
          }}
        >
          <div className="mx-auto max-w-4xl space-y-5">

            {/* Header */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Оюутан</p>
              <h1 className="mt-1 text-2xl font-semibold text-white">Сорил явцын оноо</h1>
            </div>

            <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">

              {/* Left — subject list */}
              <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-3 backdrop-blur-md">
                <p className="mb-2 px-2 text-[10px] uppercase tracking-[0.28em] text-white/30">Хичээлүүд</p>
                <div className="flex flex-col gap-1">
                  {scores.map((s) => {
                    const got = s.quizzes.reduce((a, q) => a + q.got, 0);
                    const max = s.quizzes.reduce((a, q) => a + q.max, 0);
                    const pct = Math.round((got / max) * 100);
                    const isActive = s.subject === selected;
                    return (
                      <button
                        key={s.subject}
                        onClick={() => setSelected(s.subject)}
                        className={`flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition-all ${
                          isActive
                            ? `${s.tw} border-opacity-60`
                            : "border-transparent hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className={`h-2 w-2 shrink-0 rounded-full ${s.dot}`} />
                        <span className={`flex-1 truncate text-sm ${isActive ? s.text : "text-white/60"}`}>
                          {s.subject}
                        </span>
                        <span className={`text-xs font-medium ${quizColor(got, max)}`}>{pct}%</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right — quiz detail */}
              <div className="space-y-4">

                {/* Subject header */}
                <div className={`flex items-center justify-between rounded-[24px] border p-5 backdrop-blur-md ${current.tw}`}>
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${current.dot}`} />
                    <p className={`text-base font-semibold ${current.text}`}>{current.subject}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${quizColor(totalGot, totalMax)}`}>
                      {totalGot} <span className="text-sm font-normal text-white/30">/ {totalMax}</span>
                    </p>
                    <p className="text-[11px] text-white/35">{totalPct}% нийт</p>
                  </div>
                </div>

                {/* Quiz cards */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {current.quizzes.map((q) => {
                    const pct = Math.round((q.got / q.max) * 100);
                    return (
                      <div
                        key={q.name}
                        className="rounded-[20px] border border-white/10 bg-[#081120]/70 p-4 backdrop-blur-md"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-sm font-medium text-white/80">{q.name}</p>
                          <span className={`text-xs text-white/35`}>/ {q.max} оноо</span>
                        </div>

                        {/* Big score */}
                        <div className="mb-3 flex items-end gap-1">
                          <span className={`text-4xl font-bold ${quizColor(q.got, q.max)}`}>{q.got}</span>
                          <span className="mb-1 text-sm text-white/30">/ {q.max}</span>
                        </div>

                        {/* Progress bar */}
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${quizBarColor(q.got, q.max)} transition-all duration-500`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <p className={`mt-1.5 text-right text-[11px] font-medium ${quizColor(q.got, q.max)}`}>
                          {pct}%
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Total summary bar */}
                <div className="rounded-[20px] border border-white/10 bg-[#081120]/70 p-4 backdrop-blur-md">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-medium text-white/60">Нийт дүн</p>
                    <span className={`text-sm font-bold ${quizColor(totalGot, totalMax)}`}>
                      {totalGot} / {totalMax}
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${quizBarColor(totalGot, totalMax)} transition-all duration-500`}
                      style={{ width: `${totalPct}%` }}
                    />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
