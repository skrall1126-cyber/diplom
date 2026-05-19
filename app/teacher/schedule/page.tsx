"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const days = ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан"];

type ClassData = {
  id: string;
  name: string;
  room: string;
  duration: string;
} | null;

type ScheduleData = {
  [key: string]: ClassData[];
};

const teacherSchedule: ScheduleData = {
  "08:00": [
    { id: "python-basics", name: "Python үндэс", room: "A-201", duration: "1.5 цаг" },
    null,
    { id: "networking", name: "Networking", room: "C-302", duration: "1.5 цаг" },
    null,
    null,
  ],
  "09:30": [
    null,
    { id: "javascript", name: "JavaScript", room: "B-105", duration: "1.5 цаг" },
    null,
    { id: "database", name: "Database", room: "A-104", duration: "1.5 цаг" },
    null,
  ],
  "11:00": [
    null,
    null,
    { id: "python-basics", name: "Python үндэс", room: "A-201", duration: "1.5 цаг" },
    null,
    { id: "javascript", name: "JavaScript", room: "B-105", duration: "1.5 цаг" },
  ],
  "13:00": [
    null,
    { id: "networking", name: "Networking", room: "C-302", duration: "1.5 цаг" },
    null,
    null,
    null,
  ],
  "14:30": [
    null,
    null,
    { id: "database", name: "Database", room: "A-104", duration: "1.5 цаг" },
    null,
    { id: "networking", name: "Networking", room: "C-302", duration: "1.5 цаг" },
  ],
  "16:00": [
    null,
    null,
    null,
    { id: "python-basics", name: "Python үндэс", room: "A-201", duration: "1.5 цаг" },
    null,
  ],
};

const courseColors: Record<string, { tw: string; dot: string }> = {
  "python-basics": { tw: "border-blue-400/30 bg-blue-500/15 text-blue-200", dot: "bg-blue-400" },
  "javascript": { tw: "border-amber-400/30 bg-amber-500/15 text-amber-200", dot: "bg-amber-400" },
  "networking": { tw: "border-emerald-400/30 bg-emerald-500/15 text-emerald-200", dot: "bg-emerald-400" },
  "database": { tw: "border-orange-400/30 bg-orange-500/15 text-orange-200", dot: "bg-orange-400" },
};

const times: (keyof ScheduleData)[] = Object.keys(teacherSchedule) as (keyof ScheduleData)[];

export default function TeacherSchedulePage() {
  const [activeMenu, setActiveMenu] = useState("Хичээлийн хуваарь");
  const [view, setView] = useState<"table" | "calendar">("table");
  const [selectedDay, setSelectedDay] = useState(0);
  const [scheduleData] = useState<ScheduleData>(teacherSchedule);

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
          <div className="mx-auto max-w-6xl space-y-5">
            {/* Header */}
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Багш</p>
                <h1 className="mt-1 text-2xl font-semibold text-white">Хичээлийн хуваарь</h1>
                <p className="mt-1 text-sm text-white/50">Миний багшилж буй хичээлүүдийн цагийн хуваарь</p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* View toggle */}
                <div className="flex gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-1">
                  {(["table", "calendar"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                        view === v
                          ? "bg-gradient-to-b from-violet-500 to-violet-700 text-white shadow-[0_4px_12px_rgba(124,58,237,0.35)]"
                          : "text-white/40 hover:text-white/70"
                      }`}
                    >
                      {v === "table" ? (
                        <>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <rect x="1" y="1" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.1"/>
                            <rect x="7" y="1" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.1"/>
                            <rect x="1" y="7" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.1"/>
                            <rect x="7" y="7" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.1"/>
                          </svg>
                          Хүснэгт
                        </>
                      ) : (
                        <>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <rect x="1" y="1" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.1"/>
                            <rect x="3" y="3" width="2" height="2" rx="0.5" fill="currentColor"/>
                            <rect x="7" y="3" width="2" height="2" rx="0.5" fill="currentColor"/>
                            <rect x="3" y="7" width="2" height="2" rx="0.5" fill="currentColor"/>
                            <rect x="7" y="7" width="2" height="2" rx="0.5" fill="currentColor"/>
                          </svg>
                          Календар
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { 
                  label: "Нийт хичээл", 
                  value: times.reduce((total: number, time) => total + scheduleData[time].filter(Boolean).length, 0), 
                  sub: "хичээл", 
                  color: "text-violet-300", 
                  border: "border-violet-400/20 bg-violet-500/10",
                  icon: "📚"
                },
                { 
                  label: "Өдөр тутмын", 
                  value: Math.round(times.reduce((total: number, time) => total + scheduleData[time].filter(Boolean).length, 0) / 5), 
                  sub: "хичээл/өдөр", 
                  color: "text-emerald-300", 
                  border: "border-emerald-400/20 bg-emerald-500/10",
                  icon: "📅"
                },
                { 
                  label: "Нийт цаг", 
                  value: times.reduce((total: number, time) => total + (scheduleData[time].filter(Boolean).length * 1.5), 0), 
                  sub: "цаг/долоо", 
                  color: "text-amber-300", 
                  border: "border-amber-400/20 bg-amber-500/10",
                  icon: "⏰"
                },
                { 
                  label: "Чөлөөт цаг", 
                  value: times.reduce((total: number, time) => total + scheduleData[time].filter((c: ClassData) => !c).length, 0), 
                  sub: "цаг/долоо", 
                  color: "text-cyan-300", 
                  border: "border-cyan-400/20 bg-cyan-500/10",
                  icon: "🆓"
                },
              ].map((s) => (
                <div key={s.label} className={`rounded-[22px] border p-4 backdrop-blur-md ${s.border}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{s.icon}</span>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                      <p className="mt-0.5 text-[10px] text-white/30">{s.sub}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/50">{s.label}</p>
                </div>
              ))}
            </div>

            {/* ── TABLE VIEW ── */}
            {view === "table" && (
              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#081120]/70 backdrop-blur-md">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.03]">
                        <th className="w-20 px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.24em] text-white/35">
                          Цаг
                        </th>
                        {days.map((d) => (
                          <th key={d} className="px-3 py-3 text-center text-[12px] font-semibold text-white/70">
                            {d}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {times.map((time, ti) => (
                        <tr
                          key={time}
                          className={`border-b border-white/[0.05] transition-colors hover:bg-white/[0.02] ${
                            ti % 2 === 1 ? "bg-white/[0.01]" : ""
                          }`}
                        >
                          <td className="px-4 py-3 text-[12px] tabular-nums text-white/35 whitespace-nowrap">
                            {time}
                            <span className="block text-[10px] text-white/20">
                              –{parseInt((time as string).split(":")[0]) + 1}:30
                            </span>
                          </td>
                          {scheduleData[time].map((classData, di) => {
                            const color = classData ? courseColors[classData.id] : null;
                            return (
                              <td key={di} className="px-2 py-2">
                                {classData && color ? (
                                  <div
                                    className={`flex w-full flex-col gap-1 rounded-2xl border px-3 py-3 ${color.tw}`}
                                  >
                                    <span className="text-[12px] font-semibold leading-tight">{classData.name}</span>
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="text-[10px] opacity-60">{classData.room}</span>
                                      <span className="text-[10px] opacity-60">{classData.duration}</span>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex w-full items-center justify-center rounded-2xl border border-white/[0.04] bg-white/[0.01] py-3">
                                    <span className="text-[11px] text-white/10">Чөлөөт</span>
                                  </div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── CALENDAR VIEW ── */}
            {view === "calendar" && (
              <div className="space-y-4">
                {/* Day tabs */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {days.map((d, i) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDay(i)}
                      className={`shrink-0 rounded-2xl border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        selectedDay === i
                          ? "border-violet-400/30 bg-violet-500/15 text-violet-200"
                          : "border-white/[0.07] bg-white/[0.03] text-white/45 hover:text-white/70"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                {/* Slots */}
                <div className="space-y-2">
                  {times.map((time) => {
                    const classData = scheduleData[time][selectedDay];
                    const color = classData ? courseColors[classData.id] : null;
                    return (
                      <div
                        key={time}
                        className={`flex items-center gap-4 rounded-2xl border p-4 transition-all ${
                          color ? color.tw : "border-white/[0.05] bg-white/[0.02]"
                        }`}
                      >
                        {/* Time */}
                        <div className="w-16 shrink-0 text-center">
                          <p className="text-sm font-semibold tabular-nums text-white/70">{time}</p>
                          <p className="text-[10px] text-white/25">–{parseInt((time as string).split(":")[0]) + 1}:30</p>
                        </div>

                        {/* Divider */}
                        <div className={`h-10 w-0.5 shrink-0 rounded-full ${classData ? "bg-white/20" : "bg-white/[0.05]"}`} />

                        {/* Content */}
                        {classData && color ? (
                          <>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold">{classData.name}</p>
                              <p className="mt-0.5 text-[11px] opacity-60">{classData.room} • {classData.duration}</p>
                            </div>
                          </>
                        ) : (
                          <p className="flex-1 text-sm text-white/20">Чөлөөт цаг</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
