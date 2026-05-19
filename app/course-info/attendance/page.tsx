"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

const attendance = [
  { 
    subject: "Python undes", 
    total: 24, 
    present: 22, 
    absent: 2, 
    late: 0, 
    excused: 0, 
    sick: 1, 
    color: "border-blue-400/30 bg-blue-500/15", 
    dot: "bg-blue-400",
    missedDates: [
      { date: "2025-04-15", status: "Тасалсан", reason: "" },
      { date: "2025-04-08", status: "Өвчтэй", reason: "Томуу" },
    ]
  },
  { 
    subject: "JavaScript", 
    total: 20, 
    present: 18, 
    absent: 1, 
    late: 1, 
    excused: 0, 
    sick: 0, 
    color: "border-amber-400/30 bg-amber-500/15", 
    dot: "bg-amber-400",
    missedDates: [
      { date: "2025-04-21", status: "Хоцорсон", reason: "Замын түгжрэл" },
      { date: "2025-04-10", status: "Тасалсан", reason: "" },
    ]
  },
  { 
    subject: "Networking", 
    total: 16, 
    present: 16, 
    absent: 0, 
    late: 0, 
    excused: 0, 
    sick: 0, 
    color: "border-emerald-400/30 bg-emerald-500/15", 
    dot: "bg-emerald-400",
    missedDates: []
  },
  { 
    subject: "Database", 
    total: 22, 
    present: 19, 
    absent: 2, 
    late: 1, 
    excused: 1, 
    sick: 0, 
    color: "border-orange-400/30 bg-orange-500/15", 
    dot: "bg-orange-400",
    missedDates: [
      { date: "2025-04-18", status: "Хоцорсон", reason: "" },
      { date: "2025-04-12", status: "Чөлөөтэй", reason: "Гэр бүлийн асуудал" },
      { date: "2025-04-05", status: "Тасалсан", reason: "" },
    ]
  },
  { 
    subject: "UI/UX Design", 
    total: 18, 
    present: 17, 
    absent: 0, 
    late: 1, 
    excused: 0, 
    sick: 0, 
    color: "border-pink-400/30 bg-pink-500/15", 
    dot: "bg-pink-400",
    missedDates: [
      { date: "2025-04-21", status: "Хоцорсон", reason: "Автобус хоцорсон" },
    ]
  },
  { 
    subject: "Cyber Security", 
    total: 20, 
    present: 15, 
    absent: 4, 
    late: 1, 
    excused: 2, 
    sick: 1, 
    color: "border-red-400/30 bg-red-500/15", 
    dot: "bg-red-400",
    missedDates: [
      { date: "2025-04-20", status: "Хоцорсон", reason: "" },
      { date: "2025-04-18", status: "Тасалсан", reason: "" },
      { date: "2025-04-13", status: "Чөлөөтэй", reason: "Эмнэлэгт очсон" },
      { date: "2025-04-11", status: "Өвчтэй", reason: "Ханиад" },
      { date: "2025-04-06", status: "Чөлөөтэй", reason: "Гэр бүлийн арга хэмжээ" },
      { date: "2025-04-02", status: "Тасалсан", reason: "" },
    ]
  },
];

const recentLog = [
  { id: 1, date: "2025-04-22", time: "08:00", subject: "Python undes", status: "Ирсэн", room: "A-201" },
  { id: 2, date: "2025-04-22", time: "11:00", subject: "Database", status: "Ирсэн", room: "A-104" },
  { id: 3, date: "2025-04-21", time: "09:30", subject: "JavaScript", status: "Хоцорсон", room: "B-105" },
  { id: 4, date: "2025-04-21", time: "14:30", subject: "UI/UX Design", status: "Ирсэн", room: "D-201" },
  { id: 5, date: "2025-04-18", time: "13:00", subject: "Cyber Security", status: "Тасалсан", room: "B-302" },
  { id: 6, date: "2025-04-17", time: "16:00", subject: "Networking", status: "Ирсэн", room: "C-302" },
];

const statusStyle: Record<string, { tw: string; icon: string }> = {
  "Ирсэн": { 
    tw: "border-emerald-400/25 bg-emerald-500/10 text-emerald-300",
    icon: "✓"
  },
  "Хоцорсон": { 
    tw: "border-amber-400/25 bg-amber-500/10 text-amber-300",
    icon: "⏰"
  },
  "Тасалсан": { 
    tw: "border-red-400/25 bg-red-500/10 text-red-300",
    icon: "✗"
  },
};

export default function AttendancePage() {
  const [activeMenu, setActiveMenu] = useState("Хичээл");
  const [view, setView] = useState<"table" | "card">("table");
  const [timeRange, setTimeRange] = useState<"week" | "month" | "semester">("week");
  const [attendanceStatus, setAttendanceStatus] = useState<string>("");

  const totalPresent = attendance.reduce((a, s) => a + s.present, 0);
  const totalAbsent = attendance.reduce((a, s) => a + s.absent, 0);
  const totalLate = attendance.reduce((a, s) => a + s.late, 0);
  const totalClasses = attendance.reduce((a, s) => a + s.total, 0);
  const overallPercentage = Math.round((totalPresent / totalClasses) * 100);

  const handleQuickAttendance = (status: string) => {
    setAttendanceStatus(status);
    
    // Simulate API call
    console.log(`Ирц бүртгэл: ${status}`);
    
    // Show success message
    alert(`Ирц ${status} гэж бүртгэгдлээ!`);
    
    // Reset after 2 seconds
    setTimeout(() => {
      setAttendanceStatus("");
    }, 2000);
  };

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
          <div className="mx-auto max-w-6xl space-y-5">

            {/* Header */}
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Хичээл</p>
                <h1 className="mt-1 text-2xl font-semibold text-white">Ирц бүртгэл</h1>
              </div>
              
              <div className="flex items-center gap-3">
                {/* View toggle */}
                <div className="flex gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-1">
                  {(["table", "card"] as const).map((v) => (
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
                            <rect x="1" y="1" width="10" height="3" rx="0.8" stroke="currentColor" strokeWidth="1.1"/>
                            <rect x="1" y="6" width="10" height="3" rx="0.8" stroke="currentColor" strokeWidth="1.1"/>
                          </svg>
                          Карт
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {[
                { 
                  label: "Дундаж ирц", 
                  value: `${overallPercentage}%`, 
                  sub: "нийт", 
                  color: "text-violet-300", 
                  border: "border-violet-400/20 bg-violet-500/10",
                  icon: "📈"
                },
                { 
                  label: "Өвчтэй", 
                  value: attendance.reduce((a, s) => a + s.sick, 0), 
                  sub: "хичээл", 
                  color: "text-purple-300", 
                  border: "border-purple-400/20 bg-purple-500/10",
                  icon: "🏥"
                },
                { 
                  label: "Чөлөөтэй", 
                  value: attendance.reduce((a, s) => a + s.excused, 0), 
                  sub: "хичээл", 
                  color: "text-blue-300", 
                  border: "border-blue-400/20 bg-blue-500/10",
                  icon: "📝"
                },
                { 
                  label: "Тасалсан", 
                  value: totalAbsent, 
                  sub: "хичээл", 
                  color: "text-red-300", 
                  border: "border-red-400/20 bg-red-500/10",
                  icon: "⚠️"
                },
                { 
                  label: "Хоцорсон", 
                  value: totalLate, 
                  sub: "удаа", 
                  color: "text-amber-300", 
                  border: "border-amber-400/20 bg-amber-500/10",
                  icon: "⏰"
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

            {/* QR Registration Section */}
            <div id="qr-registration-section" className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white/80">QR кодоор ирц бүртгэх</p>
                  <p className="mt-1 text-xs text-white/40">Камер ашиглан QR кодыг уншуулна уу</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs text-emerald-300">Идэвхтэй</span>
                </div>
              </div>

              <div className="grid gap-5">
                {/* QR Scanner - Full Width */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-violet-400">
                      <rect x="1.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                      <rect x="9.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                      <rect x="1.5" y="9.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                      <rect x="9.5" y="9.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                    </svg>
                    <p className="text-sm font-medium text-white/80">QR Сканнер</p>
                  </div>
                  
                  <div className="grid gap-5 lg:grid-cols-2">
                    {/* Left side - QR Scanner */}
                    <div className="space-y-3">
                      <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                        {/* QR Scanner Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="mx-auto mb-3 h-12 w-12 rounded-full border-2 border-dashed border-violet-400/40 bg-violet-500/10 p-2">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-violet-400">
                                <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                                <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                                <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                                <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                              </svg>
                            </div>
                            <p className="text-sm text-white/60">Камерыг асаана уу</p>
                          </div>
                        </div>
                        
                        {/* Scanner frame */}
                        <div className="absolute inset-8 border-2 border-violet-400/30 rounded-lg" />
                        <div className="absolute top-8 left-8 h-6 w-6 border-t-2 border-l-2 border-violet-400 rounded-tl" />
                        <div className="absolute top-8 right-8 h-6 w-6 border-t-2 border-r-2 border-violet-400 rounded-tr" />
                        <div className="absolute bottom-8 left-8 h-6 w-6 border-b-2 border-l-2 border-violet-400 rounded-bl" />
                        <div className="absolute bottom-8 right-8 h-6 w-6 border-b-2 border-r-2 border-violet-400 rounded-br" />
                      </div>

                      {/* Camera controls below scanner */}
                      <div className="flex gap-2">
                        <button className="flex-1 rounded-xl border border-violet-400/30 bg-violet-500/15 py-2 text-sm font-medium text-violet-200 transition-colors hover:bg-violet-500/25">
                          Камер асаах
                        </button>
                        <button className="flex-1 rounded-xl border border-white/10 bg-[#0a1428] py-2 text-sm font-medium text-white/60 transition-colors hover:bg-[#0c1a34]">
                          Зураг авах
                        </button>
                      </div>

                      {/* Quick Attendance Button below camera controls */}
                      <div>
                        <button
                          onClick={() => handleQuickAttendance("Ирсэн")}
                          disabled={attendanceStatus === "Ирсэн"}
                          className={`w-full flex items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 py-2 text-sm font-medium transition-all ${attendanceStatus === "Ирсэн" ? "ring-2 ring-white/30" : ""}`}
                        >
                          <span className="text-lg">✓</span>
                          Ирсэн гэж бүртгэх
                        </button>
                      </div>
                    </div>

                    {/* Right side - Recent attendance log */}
                    <div className="rounded-2xl border border-white/10 bg-[#0a1428]/50 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-white/80">Сүүлийн ирцийн бүртгэл</p>
                          <p className="mt-1 text-xs text-white/40">7 хоногийн түүх</p>
                        </div>
                        <span className="text-xs text-white/30">{recentLog.length}</span>
                      </div>

                      {/* Recent log list */}
                      <div className="space-y-2 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {recentLog.map((r) => {
                          const status = statusStyle[r.status];
                          const dateObj = new Date(r.date);
                          const dayNames = ["Ням", "Дав", "Мяг", "Лха", "Пүр", "Баа", "Бям"];
                          const dayName = dayNames[dateObj.getDay()];
                          const day = dateObj.getDate();
                          const month = dateObj.getMonth() + 1;
                          
                          return (
                            <div key={r.id} className={`rounded-xl border p-3 transition-all hover:scale-[1.02] ${status.tw.replace('text-', 'border-').replace('-300', '-400/30').replace('bg-', 'bg-').replace('-500/10', '-500/10')}`}>
                              {/* Date Header */}
                              <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="flex h-8 w-8 flex-col items-center justify-center rounded-lg border border-white/10 bg-white/[0.05]">
                                    <span className="text-[9px] font-medium text-white/40">{month}/{day}</span>
                                    <span className="text-[10px] font-bold text-white/80">{dayName}</span>
                                  </div>
                                  <span className="text-xs text-white/60">{r.time}</span>
                                </div>
                                <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-bold ${status.tw}`}>
                                  <span>{status.icon}</span>
                                  {r.status}
                                </span>
                              </div>

                              {/* Subject Info */}
                              <div className="space-y-1">
                                <p className="text-xs font-medium text-white/90">{r.subject}</p>
                                <p className="text-[10px] text-white/50">Өрөө: {r.room}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* End of QR Registration Section */}
            </div>

            {/* ── TABLE VIEW ── */}
            {view === "table" && (
              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#081120]/70 backdrop-blur-md">
                <div className="border-b border-white/10 bg-white/[0.03] px-5 py-3">
                  <p className="text-sm font-medium text-white/80">Хичээл тус бүрийн ирц</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02]">
                        {["Хичээл", "Нийт", "Ирсэн", "Тасалсан", "Хоцорсон", "Ирц %", "График"].map((h) => (
                          <th key={h} className="px-4 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white/35 text-center first:text-left whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {attendance.map((a, i) => {
                        const pct = Math.round((a.present / a.total) * 100);
                        return (
                          <tr key={a.subject} className={`border-b border-white/[0.05] transition-colors hover:bg-white/[0.02] ${i % 2 === 1 ? "bg-white/[0.01]" : ""}`}>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className={`h-2 w-2 shrink-0 rounded-full ${a.dot}`} />
                                <span className="text-sm font-medium text-white/85">{a.subject}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center text-sm text-white/50">{a.total}</td>
                            <td className="px-4 py-3 text-center text-sm text-emerald-300">{a.present}</td>
                            <td className="px-4 py-3 text-center text-sm text-red-300">{a.absent}</td>
                            <td className="px-4 py-3 text-center text-sm text-amber-300">{a.late}</td>
                            <td className="px-4 py-3 text-center">
                              <span className={`text-base font-bold ${pct >= 80 ? "text-emerald-300" : "text-amber-300"}`}>
                                {pct}%
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
                                <div
                                  className={`h-full rounded-full transition-all ${pct >= 80 ? "bg-gradient-to-r from-emerald-400 to-teal-400" : "bg-gradient-to-r from-amber-400 to-orange-400"}`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── CARD VIEW ── */}
            {view === "card" && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {attendance.map((a) => {
                  const pct = Math.round((a.present / a.total) * 100);
                  return (
                    <div key={a.subject} className={`rounded-[22px] border p-5 ${a.color}`}>
                      <div className="mb-4 flex items-center gap-2">
                        <div className={`h-2.5 w-2.5 rounded-full ${a.dot}`} />
                        <p className="text-sm font-semibold text-white/90">{a.subject}</p>
                      </div>
                      
                      {/* Main Stats Grid */}
                      <div className="mb-4 grid grid-cols-3 gap-2">
                        {[
                          { label: "Нийт", value: a.total, color: "text-white/60", icon: "📊" },
                          { label: "Ирсэн", value: a.present, color: "text-emerald-300", icon: "✓" },
                          { label: "Ирц", value: `${pct}%`, color: pct >= 80 ? "text-emerald-300" : "text-amber-300", icon: "📈" },
                        ].map((s) => (
                          <div key={s.label} className="rounded-xl border border-white/10 bg-[#0a1428] py-2 text-center">
                            <p className="text-[10px] text-white/30">{s.label}</p>
                            <div className="flex items-center justify-center gap-1">
                              <span className="text-xs">{s.icon}</span>
                              <p className={`text-sm font-semibold ${s.color}`}>{s.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Progress bar */}
                      <div className="mb-4">
                        <div className="mb-1.5 flex justify-between text-[11px]">
                          <span className="text-white/40">Ирцийн хувь</span>
                          <span className={`font-bold ${pct >= 80 ? "text-emerald-300" : "text-amber-300"}`}>{pct}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <div
                            className={`h-full rounded-full ${pct >= 80 ? "bg-gradient-to-r from-emerald-400 to-teal-400" : "bg-gradient-to-r from-amber-400 to-orange-400"}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>

                      {/* Missed Dates List */}
                      {a.missedDates.length > 0 ? (
                        <div className="space-y-2">
                          <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">Суугаагүй өдрүүд</p>
                          <div className="max-h-48 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            {a.missedDates.map((missed, idx) => {
                              const dateObj = new Date(missed.date);
                              const month = dateObj.getMonth() + 1;
                              const day = dateObj.getDate();
                              
                              // Status colors
                              const statusColors: Record<string, string> = {
                                "Тасалсан": "border-red-400/30 bg-red-500/10 text-red-300",
                                "Хоцорсон": "border-amber-400/30 bg-amber-500/10 text-amber-300",
                                "Чөлөөтэй": "border-blue-400/30 bg-blue-500/10 text-blue-300",
                                "Өвчтэй": "border-purple-400/30 bg-purple-500/10 text-purple-300",
                              };
                              
                              const statusIcons: Record<string, string> = {
                                "Тасалсан": "✗",
                                "Хоцорсон": "⏰",
                                "Чөлөөтэй": "📝",
                                "Өвчтэй": "🏥",
                              };
                              
                              return (
                                <div key={idx} className={`flex items-center justify-between rounded-lg border px-2.5 py-2 ${statusColors[missed.status]}`}>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs">{statusIcons[missed.status]}</span>
                                    <div>
                                      <p className="text-xs font-medium">{month}/{day} - {missed.status}</p>
                                      {missed.reason && (
                                        <p className="text-[10px] opacity-70">{missed.reason}</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-center">
                          <p className="text-xs text-emerald-300">✓ Бүх хичээлд ирсэн</p>
                        </div>
                      )}
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