"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const months = [
  "1-р сар", "2-р сар", "3-р сар", "4-р сар", 
  "5-р сар", "6-р сар", "7-р сар", "8-р сар",
  "9-р сар", "10-р сар", "11-р сар", "12-р сар"
];

const currentYear = 2025;

// Academic calendar events
const academicEvents = [
  { id: 1, title: "Хаврын улирлын эхлэл", date: "2025-02-01", type: "academic-start", color: "border-emerald-400/30 bg-emerald-500/15 text-emerald-200" },
  { id: 2, title: "Хичээлийн эхний долоо хоног", date: "2025-02-03", type: "teaching-week", color: "border-blue-400/30 bg-blue-500/15 text-blue-200" },
  { id: 3, title: "Дунд шалгалт", date: "2025-03-15", type: "exam", color: "border-amber-400/30 bg-amber-500/15 text-amber-200" },
  { id: 4, title: "Багийн ажлын эцсийн хугацаа", date: "2025-04-10", type: "deadline", color: "border-red-400/30 bg-red-500/15 text-red-200" },
  { id: 5, title: "Улирлын эцсийн шалгалт", date: "2025-05-12", type: "exam", color: "border-amber-400/30 bg-amber-500/15 text-amber-200" },
  { id: 6, title: "Дүнгийн хураангуй", date: "2025-05-30", type: "grading", color: "border-violet-400/30 bg-violet-500/15 text-violet-200" },
  { id: 7, title: "Зуны амралт", date: "2025-06-01", type: "holiday", color: "border-cyan-400/30 bg-cyan-500/15 text-cyan-200" },
  { id: 8, title: "Намрын улирлын эхлэл", date: "2025-09-01", type: "academic-start", color: "border-emerald-400/30 bg-emerald-500/15 text-emerald-200" },
  { id: 9, title: "Багийн ажлын эхлэл", date: "2025-09-15", type: "project-start", color: "border-indigo-400/30 bg-indigo-500/15 text-indigo-200" },
  { id: 10, title: "Дунд шалгалт", date: "2025-10-20", type: "exam", color: "border-amber-400/30 bg-amber-500/15 text-amber-200" },
  { id: 11, title: "Улирлын эцсийн шалгалт", date: "2025-12-10", type: "exam", color: "border-amber-400/30 bg-amber-500/15 text-amber-200" },
  { id: 12, title: "Өвлийн амралт", date: "2025-12-20", type: "holiday", color: "border-cyan-400/30 bg-cyan-500/15 text-cyan-200" },
];

// Holidays and special days
const holidays = [
  { date: "2025-01-01", title: "Шинэ жил", type: "holiday" },
  { date: "2025-02-11", title: "Цагаан сар", type: "holiday" },
  { date: "2025-03-08", title: "Эмэгтэйчүүдийн олон улсын өдөр", type: "holiday" },
  { date: "2025-05-01", title: "Ажилчдын баяр", type: "holiday" },
  { date: "2025-07-11", title: "Наадам", type: "holiday" },
  { date: "2025-11-26", title: "Үндэсний баяр", type: "holiday" },
  { date: "2025-12-31", title: "Шинэ жилийн өмнөх өдөр", type: "holiday" },
];

// Teacher's personal events
const personalEvents = [
  { id: 101, title: "Багшийн зөвлөгөөн", date: "2025-02-15", type: "meeting", color: "border-purple-400/30 bg-purple-500/15 text-purple-200" },
  { id: 102, title: "Сургалтын материал бэлтгэх", date: "2025-03-01", type: "preparation", color: "border-orange-400/30 bg-orange-500/15 text-orange-200" },
  { id: 103, title: "Оюутнуудтай уулзалт", date: "2025-04-05", type: "meeting", color: "border-purple-400/30 bg-purple-500/15 text-purple-200" },
  { id: 104, title: "Семинар", date: "2025-05-20", type: "seminar", color: "border-pink-400/30 bg-pink-500/15 text-pink-200" },
  { id: 105, title: "Мэргэжлийн хөгжлийн сургалт", date: "2025-08-15", type: "training", color: "border-teal-400/30 bg-teal-500/15 text-teal-200" },
];

// Generate calendar days for a month
const generateMonthDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  const days = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDay; i++) {
    days.push(null);
  }
  
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    
    // Find events for this day
    const dayEvents = [
      ...academicEvents.filter(e => e.date === dateStr),
      ...holidays.filter(h => h.date === dateStr).map(h => ({
        id: h.date,
        title: h.title,
        date: h.date,
        type: h.type,
        color: "border-cyan-400/30 bg-cyan-500/15 text-cyan-200"
      })),
      ...personalEvents.filter(p => p.date === dateStr)
    ];
    
    days.push({
      date: dateStr,
      day: i,
      isToday: false, // You could calculate this
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      events: dayEvents
    });
  }
  
  return days;
};

export default function TeacherCalendarPage() {
  const [activeMenu, setActiveMenu] = useState("Сургалтын хуанли");
  const [selectedMonth, setSelectedMonth] = useState(1); // February (0-indexed)
  const [view, setView] = useState<"month" | "list">("month");
  const [selectedEventType, setSelectedEventType] = useState<string>("all");
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    type: "meeting",
    description: ""
  });
  
  const monthDays = generateMonthDays(currentYear, selectedMonth);
  const weeks = [];
  
  // Split days into weeks
  for (let i = 0; i < monthDays.length; i += 7) {
    weeks.push(monthDays.slice(i, i + 7));
  }
  
  // Filter events based on selected type
  const filteredEvents = selectedEventType === "all" 
    ? [...academicEvents, ...personalEvents]
    : selectedEventType === "academic" 
      ? academicEvents
      : selectedEventType === "personal"
        ? personalEvents
        : selectedEventType === "holiday"
          ? holidays.map(h => ({
              id: h.date,
              title: h.title,
              date: h.date,
              type: h.type,
              color: "border-cyan-400/30 bg-cyan-500/15 text-cyan-200"
            }))
          : [];
  
  // Event type counts
  const eventTypeCounts = {
    all: academicEvents.length + personalEvents.length + holidays.length,
    academic: academicEvents.length,
    personal: personalEvents.length,
    holiday: holidays.length
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
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Багш</p>
                <h1 className="mt-1 text-2xl font-semibold text-white">Сургалтын хуанли</h1>
                <p className="mt-1 text-sm text-white/50">Академик хуанли, амралтын өдрүүд, чухал үйл явдлууд</p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* View toggle */}
                <div className="flex gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-1">
                  {(["month", "list"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                        view === v
                          ? "bg-gradient-to-b from-violet-500 to-violet-700 text-white shadow-[0_4px_12px_rgba(124,58,237,0.35)]"
                          : "text-white/40 hover:text-white/70"
                      }`}
                    >
                      {v === "month" ? "Сар" : "Жагсаалт"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Month selector and filters */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Month selector */}
                <div className="flex gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-1">
                  <button
                    onClick={() => setSelectedMonth(prev => Math.max(0, prev - 1))}
                    className="rounded-xl p-1.5 text-white/40 hover:text-white/70"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M9 3l-4 4 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    className="rounded-xl border-0 bg-[#0a1428] px-3 py-1.5 text-sm text-white focus:outline-none"
                  >
                    {months.map((month, index) => (
                      <option key={index} value={index}>{month} {currentYear}</option>
                    ))}
                  </select>
                  
                  <button
                    onClick={() => setSelectedMonth(prev => Math.min(11, prev + 1))}
                    className="rounded-xl p-1.5 text-white/40 hover:text-white/70"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                
                {/* Event type filter */}
                <div className="flex gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-1">
                  {([
                    { key: "all", label: "Бүгд", count: eventTypeCounts.all },
                    { key: "academic", label: "Академик", count: eventTypeCounts.academic },
                    { key: "personal", label: "Хувийн", count: eventTypeCounts.personal },
                    { key: "holiday", label: "Амралт", count: eventTypeCounts.holiday }
                  ] as const).map((type) => (
                    <button
                      key={type.key}
                      onClick={() => setSelectedEventType(type.key)}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                        selectedEventType === type.key
                          ? "bg-gradient-to-b from-violet-500 to-violet-700 text-white shadow-[0_4px_12px_rgba(124,58,237,0.35)]"
                          : "text-white/40 hover:text-white/70"
                      }`}
                    >
                      {type.label}
                      <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">
                        {type.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => setShowEventModal(true)}
                className="rounded-2xl border border-violet-400/30 bg-violet-500/15 px-4 py-2 text-sm font-medium text-violet-200 transition-colors hover:bg-violet-500/25"
              >
                + Үйл явдал нэмэх
              </button>
            </div>

            {/* ── MONTH VIEW ── */}
            {view === "month" && (
              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#081120]/70 backdrop-blur-md">
                {/* Weekday headers */}
                <div className="grid grid-cols-7 border-b border-white/10 bg-white/[0.03]">
                  {["Ням", "Дав", "Мяг", "Лха", "Пүр", "Баа", "Бям"].map((day) => (
                    <div key={day} className="px-3 py-3 text-center text-[12px] font-semibold text-white/70">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar grid */}
                <div className="p-2">
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="grid grid-cols-7 gap-1 mb-1">
                      {week.map((day, dayIndex) => (
                        <div
                          key={dayIndex}
                          className={`min-h-24 rounded-xl border p-2 transition-colors ${
                            day
                              ? day.isWeekend
                                ? "border-white/[0.05] bg-white/[0.01]"
                                : "border-white/[0.08] bg-white/[0.02]"
                              : "border-transparent"
                          }`}
                        >
                          {day && (
                            <>
                              {/* Day number */}
                              <div className="mb-1 flex items-center justify-between">
                                <span className={`text-sm font-medium ${day.isWeekend ? "text-white/40" : "text-white/70"}`}>
                                  {day.day}
                                </span>
                                {day.events.length > 0 && (
                                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                                )}
                              </div>
                              
                              {/* Events */}
                              <div className="space-y-1">
                                {day.events.slice(0, 2).map((event) => (
                                  <div
                                    key={event.id}
                                    className={`rounded-lg border px-2 py-1 text-[10px] ${event.color}`}
                                    title={event.title}
                                  >
                                    <p className="truncate font-medium">{event.title}</p>
                                  </div>
                                ))}
                                {day.events.length > 2 && (
                                  <div className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] text-white/40">
                                    +{day.events.length - 2} үйл явдал
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── LIST VIEW ── */}
            {view === "list" && (
              <div className="space-y-4">
                {/* Upcoming events */}
                <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white/80">Ирэх үйл явдлууд</p>
                      <p className="mt-1 text-xs text-white/40">Дараагийн 30 хоногийн чухал үйл явдлууд</p>
                    </div>
                    <span className="text-xs text-white/30">{filteredEvents.length} үйл явдал</span>
                  </div>
                  
                  <div className="space-y-3">
                    {filteredEvents.map((event) => {
                      const eventDate = new Date(event.date);
                      const today = new Date();
                      const daysDiff = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                      
                      return (
                        <div key={event.id} className={`rounded-2xl border p-4 ${event.color}`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-semibold text-white/90">{event.title}</p>
                              <p className="mt-1 text-xs text-white/50">
                                {eventDate.toLocaleDateString("mn-MN", { year: 'numeric', month: 'long', day: 'numeric' })}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-white">
                                {daysDiff > 0 ? `${daysDiff} хоног` : "Өнөөдөр"}
                              </p>
                              <p className="text-[10px] text-white/30">
                                {daysDiff > 0 ? "үлдлээ" : "болно"}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Event statistics */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    { 
                      label: "Академик үйл явдал", 
                      value: academicEvents.length, 
                      color: "text-emerald-300", 
                      border: "border-emerald-400/20 bg-emerald-500/10",
                      icon: "📚"
                    },
                    { 
                      label: "Хувийн үйл явдал", 
                      value: personalEvents.length, 
                      color: "text-purple-300", 
                      border: "border-purple-400/20 bg-purple-500/10",
                      icon: "👤"
                    },
                    { 
                      label: "Амралтын өдөр", 
                      value: holidays.length, 
                      color: "text-cyan-300", 
                      border: "border-cyan-400/20 bg-cyan-500/10",
                      icon: "🎉"
                    },
                    { 
                      label: "Шалгалтын өдөр", 
                      value: academicEvents.filter(e => e.type === "exam").length, 
                      color: "text-amber-300", 
                      border: "border-amber-400/20 bg-amber-500/10",
                      icon: "📝"
                    },
                  ].map((s) => (
                    <div key={s.label} className={`rounded-[22px] border p-4 backdrop-blur-md ${s.border}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-lg">{s.icon}</span>
                        <div className="text-right">
                          <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                          <p className="mt-0.5 text-[10px] text-white/30">нийт</p>
                        </div>
                      </div>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/50">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Event Creation Modal */}
            {showEventModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#0a1428] p-6 shadow-2xl">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white/90">Үйл явдал нэмэх</p>
                      <p className="mt-0.5 text-xs text-white/40">Хувийн эсвэл хичээлийн үйл явдал</p>
                    </div>
                    <button
                      onClick={() => setShowEventModal(false)}
                      className="rounded-full border border-white/10 bg-white/[0.04] p-1.5 text-white/40 hover:text-white/70"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium text-white/35">
                        Үйл явдлын нэр
                      </label>
                      <input
                        type="text"
                        value={eventForm.title}
                        onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder-white/20 focus:border-violet-400/40 focus:outline-none"
                        placeholder="Жишээ нь: Багшийн зөвлөгөөн"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium text-white/35">
                        Огноо
                      </label>
                      <input
                        type="date"
                        value={eventForm.date}
                        onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white focus:border-violet-400/40 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium text-white/35">
                        Төрөл
                      </label>
                      <select
                        value={eventForm.type}
                        onChange={(e) => setEventForm({...eventForm, type: e.target.value})}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white focus:border-violet-400/40 focus:outline-none"
                      >
                        <option value="meeting">Уулзалт</option>
                        <option value="preparation">Бэлтгэл</option>
                        <option value="seminar">Семинар</option>
                        <option value="training">Сургалт</option>
                        <option value="deadline">Хугацаа</option>
                        <option value="other">Бусад</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium text-white/35">
                        Тайлбар
                      </label>
                      <textarea
                        value={eventForm.description}
                        onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder-white/20 focus:border-violet-400/40 focus:outline-none"
                        placeholder="Үйл явдлын дэлгэрэнгүй мэдээлэл..."
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setShowEventModal(false)}
                        className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.08]"
                      >
                        Цуцлах
                      </button>
                      <button
                        onClick={() => {
                          if (eventForm.title && eventForm.date) {
                            alert(`Үйл явдал "${eventForm.title}" амжилттай нэмэгдлээ!`);
                            setEventForm({ title: "", date: "", type: "meeting", description: "" });
                            setShowEventModal(false);
                          } else {
                            alert("Нэр болон огноо оруулна уу!");
                          }
                        }}
                        className="flex-1 rounded-xl border border-violet-400/30 bg-gradient-to-b from-violet-500 to-violet-700 px-4 py-2.5 text-sm font-medium text-white shadow-[0_4px_12px_rgba(124,58,237,0.35)] transition-all hover:opacity-90"
                      >
                        Нэмэх
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}