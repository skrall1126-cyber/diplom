"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";

// Constants
const DAYS = ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан"] as const;
const TIMES = ["08:00", "09:30", "11:00", "13:00", "14:30", "16:00"] as const;

// Course styles mapping
const COURSE_STYLES: Record<string, { tw: string; dot: string }> = {
  "python-basics":     { tw: "border-blue-400/30 bg-blue-500/15 text-blue-200",     dot: "bg-blue-400" },
  "javascript":        { tw: "border-amber-400/30 bg-amber-500/15 text-amber-200",   dot: "bg-amber-400" },
  "networking":        { tw: "border-emerald-400/30 bg-emerald-500/15 text-emerald-200", dot: "bg-emerald-400" },
  "database":          { tw: "border-orange-400/30 bg-orange-500/15 text-orange-200", dot: "bg-orange-400" },
  "ui-ux":             { tw: "border-pink-400/30 bg-pink-500/15 text-pink-200",       dot: "bg-pink-400" },
  "cyber-security":    { tw: "border-red-400/30 bg-red-500/15 text-red-200",          dot: "bg-red-400" },
  "java-fundamentals": { tw: "border-indigo-400/30 bg-indigo-500/15 text-indigo-200", dot: "bg-indigo-400" },
  "react-development": { tw: "border-cyan-400/30 bg-cyan-500/15 text-cyan-200",       dot: "bg-cyan-400" },
  "linux-admin":       { tw: "border-lime-400/30 bg-lime-500/15 text-lime-200",       dot: "bg-lime-400" },
};

// Course slot type
interface CourseSlot {
  id: string;
  title: string;
  short: string;
  instructor: string;
  room: string;
  time: string;
  endTime: string;
}

type Slot = CourseSlot | null;

// Schedule data
const SCHEDULE: Record<string, Slot[]> = {
  "08:00": [
    { id: "python-basics",     title: "Python үндэс",        short: "Py",   instructor: "Batbayar",    room: "A-201", time: "08:00", endTime: "09:30" },
    null,
    { id: "networking",        title: "Networking",          short: "Net",  instructor: "Ganbayar",    room: "C-302", time: "08:00", endTime: "09:30" },
    null,
    { id: "linux-admin",       title: "Linux administration",short: "Lx",   instructor: "Tuvshin",     room: "B-104", time: "08:00", endTime: "09:30" },
  ],
  "09:30": [
    null,
    { id: "javascript",        title: "JavaScript",          short: "JS",   instructor: "Dorj",        room: "B-105", time: "09:30", endTime: "11:00" },
    null,
    { id: "database",          title: "Database",            short: "DB",   instructor: "Batbayar",    room: "A-104", time: "09:30", endTime: "11:00" },
    null,
  ],
  "11:00": [
    { id: "ui-ux",             title: "UI/UX design",        short: "UI",   instructor: "Narantsetseg",room: "D-201", time: "11:00", endTime: "12:30" },
    null,
    { id: "python-basics",     title: "Python үндэс",        short: "Py",   instructor: "Batbayar",    room: "A-201", time: "11:00", endTime: "12:30" },
    null,
    { id: "javascript",        title: "JavaScript",          short: "JS",   instructor: "Dorj",        room: "B-105", time: "11:00", endTime: "12:30" },
  ],
  "13:00": [
    { id: "cyber-security",    title: "Cyber security",      short: "Sec",  instructor: "Tumur",       room: "B-302", time: "13:00", endTime: "14:30" },
    { id: "networking",        title: "Networking",          short: "Net",  instructor: "Ganbayar",    room: "C-302", time: "13:00", endTime: "14:30" },
    null,
    { id: "react-development", title: "React development",   short: "Rx",   instructor: "Ariunaa",     room: "C-201", time: "13:00", endTime: "14:30" },
    null,
  ],
  "14:30": [
    null,
    { id: "java-fundamentals", title: "Java fundamentals",   short: "Java", instructor: "Enkhbayar",   room: "A-302", time: "14:30", endTime: "16:00" },
    { id: "ui-ux",             title: "UI/UX design",        short: "UI",   instructor: "Narantsetseg",room: "D-201", time: "14:30", endTime: "16:00" },
    null,
    { id: "cyber-security",    title: "Cyber security",      short: "Sec",  instructor: "Tumur",       room: "B-302", time: "14:30", endTime: "16:00" },
  ],
  "16:00": [
    { id: "react-development", title: "React development",   short: "Rx",   instructor: "Ariunaa",     room: "C-201", time: "16:00", endTime: "17:30" },
    null,
    { id: "java-fundamentals", title: "Java fundamentals",   short: "Java", instructor: "Enkhbayar",   room: "A-302", time: "16:00", endTime: "17:30" },
    { id: "linux-admin",       title: "Linux administration",short: "Lx",   instructor: "Tuvshin",     room: "B-104", time: "16:00", endTime: "17:30" },
    { id: "database",          title: "Database",            short: "DB",   instructor: "Batbayar",    room: "A-104", time: "16:00", endTime: "17:30" },
  ],
};

// Legend courses
const LEGEND_COURSES = [
  { id: "python-basics",     title: "Python үндэс" },
  { id: "javascript",        title: "JavaScript" },
  { id: "networking",        title: "Networking" },
  { id: "database",          title: "Database" },
  { id: "ui-ux",             title: "UI/UX design" },
  { id: "cyber-security",    title: "Cyber security" },
  { id: "java-fundamentals", title: "Java fundamentals" },
  { id: "react-development", title: "React development" },
  { id: "linux-admin",       title: "Linux administration" },
];

// View type
type ViewType = "table" | "card";

// Teacher update type
interface TeacherUpdate {
  courseName?: string;
  day: string;
  time: string;
  room: string;
}

export default function TimetablePage() {
  const [activeMenu, setActiveMenu] = useState("Хичээл");
  const [view, setView] = useState<ViewType>("table");
  const [selectedDay, setSelectedDay] = useState(0);
  const [teacherUpdate, setTeacherUpdate] = useState<TeacherUpdate | null>(null);
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [timetableData, setTimetableData] = useState<Record<string, Slot[]>>(SCHEDULE);

  // Handle menu change
  const handleMenuChange = useCallback((menu: string) => {
    setActiveMenu(menu);
  }, []);

  // Check for teacher schedule updates and load saved data
  useEffect(() => {
    const checkForUpdates = () => {
      const update = localStorage.getItem('teacherScheduleUpdate');
      if (update) {
        try {
          const parsedUpdate = JSON.parse(update);
          setTeacherUpdate(parsedUpdate);
          setShowUpdateNotification(true);
          
          // Clear the update after showing
          setTimeout(() => {
            localStorage.removeItem('teacherScheduleUpdate');
          }, 5000);
        } catch (error) {
          console.error('Error parsing teacher update:', error);
        }
      }
    };

    // Load saved timetable data from localStorage
    const savedTimetableData = localStorage.getItem('studentTimetableData');
    if (savedTimetableData) {
      try {
        const parsedData = JSON.parse(savedTimetableData);
        // Merge saved data with default schedule
        const mergedData = { ...SCHEDULE };
        Object.keys(parsedData).forEach(time => {
          if (mergedData[time]) {
            parsedData[time].forEach((slot: Slot, index: number) => {
              if (slot !== null && slot !== undefined) {
                mergedData[time][index] = slot;
              }
            });
          }
        });
        setTimetableData(mergedData);
      } catch (error) {
        console.error('Error parsing timetable data:', error);
      }
    }

    checkForUpdates();
    const interval = setInterval(checkForUpdates, 3000);
    return () => clearInterval(interval);
  }, []);

  // Background style
  const backgroundStyle = useMemo(() => ({
    backgroundImage: "linear-gradient(rgba(8,14,30,0.9),rgba(8,12,24,0.95)),url('/indra-bg.jpg')",
    backgroundPosition: "center center",
    backgroundAttachment: "scroll",
            backgroundSize: "72%",
  }), []);

  // Table view component
  const TableView = useMemo(() => (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#081120]/70 backdrop-blur-md">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              <th className="w-20 px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.24em] text-white/35">
                Цаг
              </th>
              {DAYS.map((day) => (
                <th key={day} className="px-3 py-3 text-center text-[12px] font-semibold text-white/70">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIMES.map((time, timeIndex) => (
              <tr
                key={time}
                className={`border-b border-white/[0.05] transition-colors hover:bg-white/[0.02] ${
                  timeIndex % 2 === 1 ? "bg-white/[0.01]" : ""
                }`}
              >
                <td className="px-4 py-3 text-[12px] tabular-nums text-white/35 whitespace-nowrap">
                  {time}
                  <span className="block text-[10px] text-white/20">
                    –{timetableData[time].find(Boolean)?.endTime ?? ""}
                  </span>
                </td>
                {timetableData[time].map((slot, dayIndex) => {
                  const style = slot ? COURSE_STYLES[slot.id] : null;
                  return (
                    <td key={dayIndex} className="px-2 py-2">
                      {slot && style ? (
                        <Link
                          href={`/course/${slot.id}`}
                          className={`flex w-full flex-col gap-1 rounded-2xl border px-3 py-3 transition-all hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white/30 ${style.tw}`}
                          aria-label={`${slot.title} хичээл, ${slot.instructor} багш, ${slot.room} өрөө`}
                        >
                          <span className="text-[12px] font-semibold leading-tight">{slot.title}</span>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] opacity-60">{slot.instructor}</span>
                            <span className="text-[10px] opacity-60">{slot.room}</span>
                          </div>
                        </Link>
                      ) : (
                        <div className="flex w-full items-center justify-center rounded-2xl border border-white/[0.04] bg-white/[0.01] py-3">
                          <span className="text-[11px] text-white/10">—</span>
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
  ), [timetableData]);

  // Card view component
  const CardView = useMemo(() => (
    <div className="space-y-4">
      {/* Day tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {DAYS.map((day, index) => (
          <button
            key={day}
            onClick={() => setSelectedDay(index)}
            className={`shrink-0 rounded-2xl border px-4 py-2 text-sm font-medium transition-all duration-200 ${
              selectedDay === index
                ? "border-violet-400/30 bg-violet-500/15 text-violet-200"
                : "border-white/[0.07] bg-white/[0.03] text-white/45 hover:text-white/70"
            }`}
            aria-label={`${day} гараг сонгох`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Slots */}
      <div className="space-y-2">
        {TIMES.map((time) => {
          const slot = timetableData[time][selectedDay];
          const style = slot ? COURSE_STYLES[slot.id] : null;
          return (
            <div
              key={time}
              className={`flex items-center gap-4 rounded-2xl border p-4 transition-all ${
                style ? style.tw : "border-white/[0.05] bg-white/[0.02]"
              }`}
            >
              {/* Time */}
              <div className="w-16 shrink-0 text-center">
                <p className="text-sm font-semibold tabular-nums text-white/70">{time}</p>
                <p className="text-[10px] text-white/25">
                  –{slot?.endTime ?? timetableData[time].find(Boolean)?.endTime ?? ""}
                </p>
              </div>

              {/* Divider */}
              <div className={`h-10 w-0.5 shrink-0 rounded-full ${slot ? "bg-white/20" : "bg-white/[0.05]"}`} />

              {/* Content */}
              {slot && style ? (
                <>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/course/${slot.id}`}
                      className="text-sm font-semibold hover:underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-white/30 rounded"
                    >
                      {slot.title}
                    </Link>
                    <p className="mt-0.5 text-[11px] opacity-60">{slot.instructor} багш</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className={`inline-block rounded-lg border px-2 py-0.5 text-[10px] font-medium ${style.tw}`}>
                      {slot.room}
                    </span>
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
  ), [selectedDay, timetableData]);

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <div className="flex">
        <Sidebar activeMenu={activeMenu} onMenuChange={handleMenuChange} />
        <main
          className="flex-1 overflow-y-auto bg-no-repeat px-4 py-6 md:px-6"
          style={backgroundStyle}
          role="main"
          aria-label="Хичээлийн хуваарь"
        >
          <div className="mx-auto max-w-6xl space-y-5">
            {/* Teacher Update Notification */}
            {showUpdateNotification && teacherUpdate && (
              <div className="rounded-[24px] border border-violet-400/30 bg-violet-500/15 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full border border-violet-400/30 bg-violet-500/20 p-1.5">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-violet-300">
                        <path d="M8 1v6M8 13v-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                        <circle cx="8" cy="10" r="1" fill="currentColor"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-violet-200">Хичээлийн хуваарь шинэчлэгдлээ</p>
                      <p className="mt-1 text-xs text-violet-300/70">
                        {teacherUpdate.courseName ? (
                          <>
                            <span className="font-medium">{teacherUpdate.courseName}</span> хичээл {teacherUpdate.day} гараг {teacherUpdate.time} цагт 
                            <span className="font-medium"> {teacherUpdate.room} </span> өрөөнд шилжинэ.
                          </>
                        ) : (
                          <>
                            {teacherUpdate.day} гараг {teacherUpdate.time} цагт байсан хичээл устгагдлаа.
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowUpdateNotification(false)}
                    className="rounded-full border border-violet-400/30 bg-violet-500/20 p-1 text-violet-300 hover:bg-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    aria-label="Мэдэгдлийг хаах"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Header */}
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Хичээл</p>
                <h1 className="mt-1 text-2xl font-semibold text-white">Хичээлийн хуваарь</h1>
              </div>
              
              {/* View toggle */}
              <div className="flex gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-1">
                {(["table", "card"] as const).map((viewType) => (
                  <button
                    key={viewType}
                    onClick={() => setView(viewType)}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 ${
                      view === viewType
                        ? "bg-gradient-to-b from-violet-500 to-violet-700 text-white shadow-[0_4px_12px_rgba(124,58,237,0.35)]"
                        : "text-white/40 hover:text-white/70"
                    }`}
                    aria-label={`${viewType === "table" ? "Хүснэгт" : "Карт"} харах`}
                  >
                    {viewType === "table" ? (
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

            {/* Legend */}
            <div className="flex flex-wrap gap-2">
              {LEGEND_COURSES.map((course) => {
                const style = COURSE_STYLES[course.id];
                return (
                  <Link
                    key={course.id}
                    href={`/course/${course.id}`}
                    className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white/30 ${style.tw}`}
                    aria-label={`${course.title} хичээл`}
                  >
                    <div className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                    {course.title}
                  </Link>
                );
              })}
            </div>

            {/* View Content */}
            {view === "table" ? TableView : CardView}
          </div>
        </main>
      </div>
    </div>
  );
}