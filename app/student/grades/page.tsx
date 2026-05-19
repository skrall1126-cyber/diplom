"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

const student = {
  name: "Төртэмүүлэн",
  id: "B211930019",
  class: "Software Engineering",
  avatar: "Т",
};

const grades = [
  { subject: "Python undes",        score: 92, attendance: 95, total: 24, done: 22, quiz1: 9, quiz1Max: 10, quiz2: 9.5, quiz2Max: 10, ircMax: 10, biydaalt: 27, biydaaltMax: 30, yvts: 9, yvtsMax: 10, shalgalt: 28, shalgaltMax: 30, totalScore: 92, totalMax: 100, tw: "border-blue-400/30 bg-blue-500/15",      dot: "bg-blue-400",    text: "text-blue-300"    },
  { subject: "JavaScript",          score: 76, attendance: 85, total: 20, done: 17, quiz1: 7.5, quiz1Max: 10, quiz2: 7, quiz2Max: 10, ircMax: 10, biydaalt: 22, biydaaltMax: 30, yvts: 7.5, yvtsMax: 10, shalgalt: 23, shalgaltMax: 30, totalScore: 76, totalMax: 100, tw: "border-amber-400/30 bg-amber-500/15",    dot: "bg-amber-400",   text: "text-amber-300"   },
  { subject: "Networking",          score: 81, attendance: 88, total: 16, done: 14, quiz1: 8.5, quiz1Max: 10, quiz2: 8, quiz2Max: 10, ircMax: 10, biydaalt: 24, biydaaltMax: 30, yvts: 8, yvtsMax: 10, shalgalt: 25, shalgaltMax: 30, totalScore: 81, totalMax: 100, tw: "border-emerald-400/30 bg-emerald-500/15",dot: "bg-emerald-400", text: "text-emerald-300"  },
  { subject: "Database",            score: 70, attendance: 80, total: 22, done: 18, quiz1: 7, quiz1Max: 10, quiz2: 6.5, quiz2Max: 10, ircMax: 10, biydaalt: 20, biydaaltMax: 30, yvts: 7, yvtsMax: 10, shalgalt: 21, shalgaltMax: 30, totalScore: 70, totalMax: 100, tw: "border-orange-400/30 bg-orange-500/15",  dot: "bg-orange-400",  text: "text-orange-300"  },
  { subject: "UI/UX design",        score: 94, attendance: 92, total: 14, done: 13, quiz1: 10, quiz1Max: 10, quiz2: 9.5, quiz2Max: 10, ircMax: 10, biydaalt: 28, biydaaltMax: 30, yvts: 9.5, yvtsMax: 10, shalgalt: 29, shalgaltMax: 30, totalScore: 94, totalMax: 100, tw: "border-pink-400/30 bg-pink-500/15",      dot: "bg-pink-400",    text: "text-pink-300"    },
  { subject: "Cyber security",      score: 88, attendance: 75, total: 20, done: 15, quiz1: 8, quiz1Max: 10, quiz2: 8.5, quiz2Max: 10, ircMax: 10, biydaalt: 25, biydaaltMax: 30, yvts: 8.5, yvtsMax: 10, shalgalt: 27, shalgaltMax: 30, totalScore: 88, totalMax: 100, tw: "border-red-400/30 bg-red-500/15",        dot: "bg-red-400",     text: "text-red-300"     },
  { subject: "Java fundamentals",   score: 73, attendance: 83, total: 16, done: 13, quiz1: 7, quiz1Max: 10, quiz2: 7.5, quiz2Max: 10, ircMax: 10, biydaalt: 21, biydaaltMax: 30, yvts: 7, yvtsMax: 10, shalgalt: 22, shalgaltMax: 30, totalScore: 73, totalMax: 100, tw: "border-indigo-400/30 bg-indigo-500/15",  dot: "bg-indigo-400",  text: "text-indigo-300"  },
  { subject: "React development",   score: 85, attendance: 90, total: 16, done: 14, quiz1: 8.5, quiz1Max: 10, quiz2: 9, quiz2Max: 10, ircMax: 10, biydaalt: 25, biydaaltMax: 30, yvts: 8.5, yvtsMax: 10, shalgalt: 26, shalgaltMax: 30, totalScore: 85, totalMax: 100, tw: "border-cyan-400/30 bg-cyan-500/15",      dot: "bg-cyan-400",    text: "text-cyan-300"    },
  { subject: "Linux administration",score: 79, attendance: 87, total: 16, done: 14, quiz1: 7.5, quiz1Max: 10, quiz2: 8, quiz2Max: 10, ircMax: 10, biydaalt: 23, biydaaltMax: 30, yvts: 7.5, yvtsMax: 10, shalgalt: 24, shalgaltMax: 30, totalScore: 79, totalMax: 100, tw: "border-lime-400/30 bg-lime-500/15",      dot: "bg-lime-400",    text: "text-lime-300"    },
];

function gradeLabel(score: number) {
  if (score >= 90) return { label: "A",  tw: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300" };
  if (score >= 80) return { label: "B",  tw: "border-blue-400/25 bg-blue-400/10 text-blue-300" };
  if (score >= 70) return { label: "C",  tw: "border-amber-400/25 bg-amber-400/10 text-amber-300" };
  if (score >= 60) return { label: "D",  tw: "border-orange-400/25 bg-orange-400/10 text-orange-300" };
  return                  { label: "F",  tw: "border-red-400/25 bg-red-400/10 text-red-300" };
}

function attendanceColor(pct: number) {
  if (pct >= 90) return "text-emerald-300";
  if (pct >= 75) return "text-amber-300";
  return "text-red-300";
}

function attendanceBar(pct: number) {
  if (pct >= 90) return "from-emerald-400 to-teal-400";
  if (pct >= 75) return "from-amber-400 to-orange-400";
  return "from-red-400 to-rose-400";
}

function scoreBarColor(score: number) {
  if (score >= 90) return { bg: "bg-emerald-400", text: "text-emerald-300", shadow: "shadow-[0_0_20px_rgba(34,197,94,0.4)]" };
  if (score >= 80) return { bg: "bg-yellow-400", text: "text-yellow-300", shadow: "shadow-[0_0_20px_rgba(250,204,21,0.4)]" };
  if (score >= 70) return { bg: "bg-orange-400", text: "text-orange-300", shadow: "shadow-[0_0_20px_rgba(251,146,60,0.4)]" };
  return { bg: "bg-red-400", text: "text-red-300", shadow: "shadow-[0_0_20px_rgba(239,68,68,0.4)]" };
}

export default function GradesPage() {
  const [activeMenu, setActiveMenu] = useState("Оюутан");
  const [view, setView] = useState<"table" | "card">("table");
  const [tab, setTab] = useState<"grades">("grades");

  const avgScore      = Math.round(grades.reduce((a, g) => a + g.score, 0) / grades.length);
  const avgAttendance = Math.round(grades.reduce((a, g) => a + g.attendance, 0) / grades.length);
  const best          = grades.reduce((a, b) => a.score > b.score ? a : b);
  const worst         = grades.reduce((a, b) => a.score < b.score ? a : b);
  const overallGrade  = gradeLabel(avgScore);

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
            backgroundAttachment: "scroll",
            backgroundSize: "72%",
          }}
        >
          <div className="mx-auto max-w-5xl space-y-5">

            {/* Page header */}
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Оюутан</p>
                <h1 className="mt-1 text-2xl font-semibold text-white">Дүн & Ирц</h1>
              </div>
              {/* View toggle */}
              <div className="flex gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-1">
                {(["table", "card"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                      view === v
                        ? "bg-gradient-to-b from-violet-500 to-violet-700 text-white shadow-[0_4px_12px_rgba(124,58,237,0.35)]"
                        : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    {v === "table" ? "Хүснэгт" : "Карт"}
                  </button>
                ))}
              </div>
            </div>

            {/* Grade Graph - Title Split Vertical Chart */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white/80">Дүнгийн график</p>
                  <p className="mt-1 text-xs text-white/40">Хичээл тус бүрийн дүнгийн харьцуулалт</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/30">{grades.length} хичээл</span>
                </div>
              </div>

              {/* Horizontal Bar Chart - Rotated Design */}
              <div className="relative">
                {/* Grid background - vertical lines */}
                <div className="absolute inset-0 flex justify-between pl-32">
                  {[0, 20, 40, 60, 80, 100].map((line) => (
                    <div key={line} className="relative">
                      <div className="h-full border-l border-white/5"></div>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white/20">
                        {line}%
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4 relative z-10">
                  {grades.map((grade) => {
                    const width = (grade.score / 100) * 100;
                    const barColor = grade.text.replace('text-', 'bg-');
                    const scoreColor = scoreBarColor(grade.score);
                    const gradeInfo = gradeLabel(grade.score);
                    
                    // Title split into two lines
                    const titleWords = grade.subject.split(' ');
                    const firstLine = titleWords[0];
                    const secondLine = titleWords.slice(1).join(' ');
                    
                    return (
                      <div key={grade.subject} className="flex items-center gap-3 group">
                        {/* Subject name on left - vertical text */}
                        <div className="w-28 flex-shrink-0 text-right pr-3">
                          <p className={`text-[11px] font-medium leading-tight ${grade.text}`}>
                            {firstLine}
                          </p>
                          {secondLine && (
                            <p className={`text-[10px] leading-tight opacity-70 ${grade.text}`}>
                              {secondLine}
                            </p>
                          )}
                        </div>
                        
                        {/* Bar container */}
                        <div className="flex-1 relative h-12 flex items-center">
                          {/* Horizontal bar with score-based shadow */}
                          <div 
                            className={`h-full rounded-r-lg transition-all duration-300 group-hover:opacity-90 relative ${barColor} ${scoreColor.shadow}`}
                            style={{ width: `${width}%` }}
                          >
                            {/* Bar inner gradient */}
                            <div className="absolute inset-0 rounded-r-lg bg-gradient-to-r from-black/20 to-transparent"></div>
                            
                            {/* Score inside bar */}
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                              <span className={`text-sm font-bold text-white drop-shadow-lg`}>
                                {grade.score}%
                              </span>
                              <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${gradeInfo.tw}`}>
                                {gradeInfo.label}
                              </span>
                            </div>
                          </div>
                          
                          {/* Hover tooltip - color based on score */}
                          <div className="absolute left-0 -top-10 hidden group-hover:block z-20">
                            <div className={`rounded-lg border px-3 py-1.5 text-xs font-bold ${scoreColor.text} border-white/10 bg-black/80 backdrop-blur-sm whitespace-nowrap`}>
                              {grade.subject}: {grade.score}%
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Bottom statistics */}
                <div className="mt-8 border-t border-white/10 pt-6">
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <p className="text-[10px] text-white/30">Хамгийн бага</p>
                      <p className={`text-base font-bold ${worst.text}`}>{worst.score}%</p>
                      <p className="text-[9px] text-white/40 mt-0.5">{worst.subject}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-white/30">Дундаж</p>
                      <p className="text-base font-bold text-violet-300">{avgScore}%</p>
                      <p className="text-[9px] text-white/40 mt-0.5">{grades.length} хичээл</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-white/30">Хамгийн өндөр</p>
                      <p className={`text-base font-bold ${best.text}`}>{best.score}%</p>
                      <p className="text-[9px] text-white/40 mt-0.5">{best.subject}</p>
                    </div>
                  </div>
                </div>
              </div>



              {/* Statistics - Improved */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { 
                    label: "Дундаж дүн", 
                    value: `${avgScore}%`, 
                    color: "text-violet-300",
                    border: "border-violet-400/20 bg-violet-500/10",
                    icon: "📊",
                    trend: avgScore > 75 ? "+" : "-"
                  },
                  { 
                    label: "А үнэлгээ", 
                    value: grades.filter(g => g.score >= 90).length, 
                    color: "text-emerald-300",
                    border: "border-emerald-400/20 bg-emerald-500/10",
                    sub: "хичээл",
                    icon: "⭐",
                    trend: "+"
                  },
                  { 
                    label: "В үнэлгээ", 
                    value: grades.filter(g => g.score >= 80 && g.score < 90).length, 
                    color: "text-blue-300",
                    border: "border-blue-400/20 bg-blue-500/10",
                    sub: "хичээл",
                    icon: "📈",
                    trend: "+"
                  },
                  { 
                    label: "С доош", 
                    value: grades.filter(g => g.score < 70).length, 
                    color: "text-red-300",
                    border: "border-red-400/20 bg-red-500/10",
                    sub: "хичээл",
                    icon: "⚠️",
                    trend: "-"
                  },
                ].map((stat) => (
                  <div key={stat.label} className={`rounded-xl border p-4 ${stat.border} transition-transform hover:scale-[1.02]`}>
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{stat.icon}</span>
                      <span className={`text-xs font-bold ${stat.trend === "+" ? "text-emerald-400" : "text-red-400"}`}>
                        {stat.trend}
                      </span>
                    </div>
                    <p className="mt-2 text-[10px] text-white/30">{stat.label}</p>
                    <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                    {stat.sub && <p className="mt-0.5 text-[10px] text-white/30">{stat.sub}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* ── GRADES TAB ── */}
            {view === "table" && (
              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#081120]/70 backdrop-blur-md">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[780px] border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.03]">
                        {["#", "Хичээл", "Сорил 1", "Сорил 2", "Ирц", "Явц", "Бие даалт", "Шалгалт", "Нийт", "Үнэлгээ"].map((h) => (
                          <th key={h} className="px-4 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white/35 text-center first:text-left whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {grades.map((g, i) => {
                        const gi = gradeLabel(g.score);
                        return (
                          <tr key={g.subject} className={`border-b border-white/[0.05] transition-colors hover:bg-white/[0.02] ${i % 2 === 1 ? "bg-white/[0.01]" : ""}`}>
                            <td className="px-4 py-3 text-[11px] text-white/25">{i + 1}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className={`h-2 w-2 shrink-0 rounded-full ${g.dot}`} />
                                <span className="text-sm font-medium text-white/85">{g.subject}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center text-sm text-white/60">{g.quiz1}/{g.quiz1Max}</td>
                            <td className="px-4 py-3 text-center text-sm text-white/60">{g.quiz2}/{g.quiz2Max}</td>
                            <td className="px-4 py-3 text-center">
                              <span className={`text-sm font-semibold ${attendanceColor(g.attendance)}`}>{Math.round(g.attendance * g.ircMax / 100)}/{g.ircMax}</span>
                            </td>
                            <td className="px-4 py-3 text-center text-sm text-white/60">{g.yvts}/{g.yvtsMax}</td>
                            <td className="px-4 py-3 text-center text-sm text-white/60">{g.biydaalt}/{g.biydaaltMax}</td>
                            <td className="px-4 py-3 text-center">
                              <span className={`text-sm font-semibold ${g.text}`}>{g.shalgalt}/{g.shalgaltMax}</span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`text-sm font-bold ${g.text}`}>{g.totalScore}/{g.totalMax}</span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`rounded-lg border px-2.5 py-0.5 text-[11px] font-bold ${gi.tw}`}>
                                {gi.label}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {view === "card" && (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {grades.map((g) => {
                  const gi = gradeLabel(g.score);
                  return (
                    <div key={g.subject} className={`rounded-[22px] border p-5 ${g.tw}`}>
                      <div className="mb-4 flex items-start justify-between gap-2">
                        <p className={`text-sm font-semibold ${g.text}`}>{g.subject}</p>
                        <span className={`shrink-0 rounded-lg border px-2 py-0.5 text-[11px] font-bold ${gi.tw}`}>
                          {gi.label}
                        </span>
                      </div>
                      {/* Score bar */}
                      <div className="mb-3">
                        <div className="mb-1.5 flex justify-between text-[11px]">
                          <span className="text-white/40">Дүн</span>
                          <span className={`font-semibold ${g.text}`}>{g.score}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div className={`h-full rounded-full bg-gradient-to-r ${g.dot.replace("bg-", "from-").replace("-400", "-400")} to-white/30`} style={{ width: `${g.score}%` }} />
                        </div>
                      </div>
                      {/* Attendance bar */}
                      <div className="mb-3">
                        <div className="mb-1.5 flex justify-between text-[11px]">
                          <span className="text-white/40">Ирц</span>
                          <span className={`font-semibold ${attendanceColor(g.attendance)}`}>{g.attendance}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${attendanceBar(g.attendance)}`}
                            style={{ width: `${g.attendance}%` }}
                          />
                        </div>
                      </div>
                      {/* Quizzes */}
                      <div className="mb-3 grid grid-cols-3 gap-2">
                        {[
                          { label: "Сорил 1", value: `${g.quiz1}/${g.quiz1Max}` },
                          { label: "Сорил 2", value: `${g.quiz2}/${g.quiz2Max}` },
                          { label: "Ирц",     value: `${Math.round(g.attendance * g.ircMax / 100)}/${g.ircMax}` },
                          { label: "Явц",     value: `${g.yvts}/${g.yvtsMax}` },
                          { label: "Бие даалт", value: `${g.biydaalt}/${g.biydaaltMax}` },
                          { label: "Шалгалт", value: `${g.shalgalt}/${g.shalgaltMax}` },
                        ].map((item) => (
                          <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.04] py-2 text-center">
                            <p className="text-[10px] text-white/30">{item.label}</p>
                            <p className={`text-sm font-semibold ${g.text}`}>{item.value}</p>
                          </div>
                        ))}
                      </div>
                      {/* Total Score */}
                      <div className="mb-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center">
                        <p className="text-[10px] text-white/30">Нийт оноо</p>
                        <p className={`text-lg font-bold ${g.text}`}>{g.totalScore}/{g.totalMax}</p>
                      </div>
                      <div className="flex justify-between border-t border-white/10 pt-3 text-[11px]">
                        <span className="text-white/35">Хичээл</span>
                        <span className={`font-medium ${g.text}`}>{g.done}/{g.total} дууссан</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
