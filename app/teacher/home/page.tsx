"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const teacherCourses = [
  { id: "python-basics", name: "Python үндэс", students: 24, color: "border-blue-400/30 bg-blue-500/15", progress: 78 },
  { id: "javascript", name: "JavaScript", students: 20, color: "border-amber-400/30 bg-amber-500/15", progress: 85 },
  { id: "networking", name: "Networking", students: 16, color: "border-emerald-400/30 bg-emerald-500/15", progress: 92 },
  { id: "database", name: "Database", students: 22, color: "border-orange-400/30 bg-orange-500/15", progress: 65 },
];

const recentActivities = [
  { id: 1, time: "Өнөөдөр 08:00", action: "Python хичээлийн ирц бүртгэсэн", course: "Python үндэс" },
  { id: 2, time: "Өнөөдөр 10:30", action: "JavaScript хичээлийн дүн оруулсан", course: "JavaScript" },
  { id: 3, time: "Өчигдөр 14:00", action: "Networking хичээлийн материал нэмсэн", course: "Networking" },
  { id: 4, time: "Өчигдөр 16:30", action: "Database хичээлийн даалгавар өгсөн", course: "Database" },
];

const upcomingClasses = [
  { id: 1, time: "14:00", course: "Python үндэс", room: "A-201", duration: "1.5 цаг" },
  { id: 2, time: "16:00", course: "JavaScript", room: "B-105", duration: "1.5 цаг" },
  { id: 3, time: "09:30", course: "Networking", room: "C-302", duration: "2 цаг" },
];

export default function TeacherHomePage() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("Нүүр хуудас");

  const totalStudents = teacherCourses.reduce((sum, course) => sum + course.students, 0);
  const averageProgress = Math.round(teacherCourses.reduce((sum, course) => sum + course.progress, 0) / teacherCourses.length);

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
                <h1 className="mt-1 text-2xl font-semibold text-white">Багшийн самбар</h1>
                <p className="mt-1 text-sm text-white/50">Сайн байна уу, Батбаяр багш</p>
              </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { 
                  label: "Нийт оюутан", 
                  value: totalStudents, 
                  sub: "оюутан", 
                  color: "text-violet-300", 
                  border: "border-violet-400/20 bg-violet-500/10",
                  icon: "👨‍🎓"
                },
                { 
                  label: "Хичээл", 
                  value: teacherCourses.length, 
                  sub: "хичээл", 
                  color: "text-emerald-300", 
                  border: "border-emerald-400/20 bg-emerald-500/10",
                  icon: "📚"
                },
                { 
                  label: "Дундаж ирц", 
                  value: `${averageProgress}%`, 
                  sub: "нийт", 
                  color: "text-amber-300", 
                  border: "border-amber-400/20 bg-amber-500/10",
                  icon: "📊"
                },
                { 
                  label: "Шалгах даалгавар", 
                  value: 8, 
                  sub: "даалгавар", 
                  color: "text-red-300", 
                  border: "border-red-400/20 bg-red-500/10",
                  icon: "📝"
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

            <div className="grid gap-5 lg:grid-cols-2">
              {/* Left column */}
              <div className="space-y-5">
                {/* My Courses */}
                <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white/80">Миний хичээлүүд</p>
                      <p className="mt-1 text-xs text-white/40">Багшилж буй хичээлүүд</p>
                    </div>
                    <span className="text-xs text-white/30">{teacherCourses.length} хичээл</span>
                  </div>

                  <div className="space-y-3">
                    {teacherCourses.map((course) => (
                      <div key={course.id} className={`rounded-2xl border p-4 ${course.color}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-white/90">{course.name}</p>
                            <p className="mt-1 text-xs text-white/50">{course.students} оюутан</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-white">{course.progress}%</p>
                            <p className="text-[10px] text-white/30">Ирц</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="mb-1.5 flex justify-between text-[11px]">
                            <span className="text-white/40">Хичээлийн явц</span>
                            <span className="font-bold text-white/70">{course.progress}%</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button 
                            onClick={() => router.push("/teacher/attendance")}
                            className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] py-2 text-xs font-medium text-white/60 transition-colors hover:bg-white/[0.08]"
                          >
                            Ирц харах
                          </button>
                          <button 
                            onClick={() => router.push("/teacher/grades")}
                            className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] py-2 text-xs font-medium text-white/60 transition-colors hover:bg-white/[0.08]"
                          >
                            Дүн оруулах
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white/80">Сүүлийн үйлдлүүд</p>
                      <p className="mt-1 text-xs text-white/40">Таны хийсэн үйлдлүүд</p>
                    </div>
                    <span className="text-xs text-white/30">{recentActivities.length} үйлдэл</span>
                  </div>

                  <div className="space-y-3">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 h-2 w-2 rounded-full bg-emerald-500" />
                          <div className="flex-1">
                            <p className="text-sm text-white/85">{activity.action}</p>
                            <div className="mt-1 flex items-center justify-between">
                              <span className="text-xs text-white/40">{activity.course}</span>
                              <span className="text-xs text-white/30">{activity.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-5">
                {/* Upcoming Classes */}
                <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white/80">Дараагийн хичээлүүд</p>
                      <p className="mt-1 text-xs text-white/40">Өнөөдрийн цагийн хуваарь</p>
                    </div>
                    <span className="text-xs text-white/30">{upcomingClasses.length} хичээл</span>
                  </div>

                  <div className="space-y-3">
                    {upcomingClasses.map((cls) => (
                      <div key={cls.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                        <div>
                          <p className="text-sm font-semibold text-white/90">{cls.course}</p>
                          <p className="mt-1 text-xs text-white/50">{cls.room} - {cls.duration}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-white">{cls.time}</p>
                          <p className="text-[10px] text-white/30">Цаг</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => router.push("/teacher/schedule")}
                    className="mt-4 w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.08]"
                  >
                    Бүх цагийн хуваарийг харах
                  </button>
                </div>

                {/* Pending Assignments */}
                <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white/80">Шалгах даалгавар</p>
                      <p className="mt-1 text-xs text-white/40">Шалгах дутуу байгаа даалгаврууд</p>
                    </div>
                    <span className="text-xs text-white/30">8 даалгавар</span>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: 1, course: "Python үндэс", assignment: "Лаб 3: Функц", students: 5, due: "Өнөөдөр" },
                      { id: 2, course: "JavaScript", assignment: "Проект 1: DOM манипуляци", students: 3, due: "Маргааш" },
                      { id: 3, course: "Networking", assignment: "TCP/IP сүлжээний загвар", students: 2, due: "2 хоног" },
                      { id: 4, course: "Database", assignment: "SQL query optimization", students: 4, due: "3 хоног" },
                    ].map((assignment) => (
                      <div key={assignment.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-semibold text-white/90">{assignment.assignment}</p>
                            <p className="mt-0.5 text-xs text-white/50">{assignment.course}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-red-300">{assignment.students} оюутан</p>
                            <p className="text-[10px] text-white/30">Дуусах: {assignment.due}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => router.push("/teacher/grades")}
                          className="mt-3 w-full rounded-xl border border-violet-400/30 bg-violet-500/15 py-2 text-xs font-medium text-violet-200 transition-colors hover:bg-violet-500/25"
                        >
                          Шалгах
                        </button>
                      </div>
                    ))}
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