"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const studentInfo = {
  name: "Төртэмүүлэн",
  lastName: "Батбаяр",
  fullName: "Төртэмүүлэн Батбаяр",
  id: "B211930019",
  email: "tortemuulen.batbayar@indra.edu.mn",
  phone: "9900-1122",
  birthDate: "2003-05-15",
  gender: "Эрэгтэй",
  address: "Улаанбаатар хот, Баянзүрх дүүрэг, 11-р хороо",
  major: "Програм хангамжийн инженерчлэл",
  class: "SE-2021",
  enrollmentYear: "2021",
  semester: "8-р семестер",
  advisor: "Б. Ганбат багш",
  scholarship: "Тэтгэлэгтэй",
  dormitory: "A байр, 305 тоот",
};

const currentCourses = [
  { 
    id: "python-basics", 
    name: "Python үндэс", 
    code: "CS101", 
    credits: 3, 
    grade: "A", 
    instructor: "Б. Ганбат",
    schedule: "Даваа, Пүрэв 10:00-11:30",
    room: "A-201",
    progress: 85,
    attendance: "92%"
  },
  { 
    id: "javascript", 
    name: "JavaScript", 
    code: "CS202", 
    credits: 4, 
    grade: "B+", 
    instructor: "Ц. Энхбаяр",
    schedule: "Мягмар, Баасан 14:00-15:30",
    room: "B-105",
    progress: 78,
    attendance: "88%"
  },
  { 
    id: "networking", 
    name: "Networking", 
    code: "CS303", 
    credits: 3, 
    grade: "A-", 
    instructor: "Д. Наранцэцэг",
    schedule: "Лхагва 08:00-10:30",
    room: "C-302",
    progress: 92,
    attendance: "95%"
  },
  { 
    id: "database", 
    name: "Database", 
    code: "CS404", 
    credits: 4, 
    grade: "B", 
    instructor: "Ж. Болдбаатар",
    schedule: "Пүрэв, Баасан 16:00-17:30",
    room: "A-104",
    progress: 70,
    attendance: "82%"
  },
  { 
    id: "ui-ux", 
    name: "UI/UX Design", 
    code: "CS505", 
    credits: 3, 
    grade: "A", 
    instructor: "Г. Уянга",
    schedule: "Мягмар 11:00-12:30",
    room: "D-201",
    progress: 88,
    attendance: "90%"
  },
  { 
    id: "cyber-security", 
    name: "Cyber Security", 
    code: "CS606", 
    credits: 4, 
    grade: "B+", 
    instructor: "Н. Батбаяр",
    schedule: "Лхагва 13:00-15:00",
    room: "B-302",
    progress: 81,
    attendance: "85%"
  },
];

export default function StudentProfilePage() {
  const [activeMenu, setActiveMenu] = useState("Хувийн мэдээлэл");
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: studentInfo.phone,
    email: studentInfo.email,
    address: studentInfo.address,
  });

  const handleSave = () => {
    alert("Хувийн мэдээлэл амжилттай хадгалагдлаа.");
    setEditing(false);
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
          <div className="mx-auto max-w-4xl space-y-5">
            {/* Header */}
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Оюутан</p>
                <h1 className="mt-1 text-2xl font-semibold text-white">Хувийн мэдээлэл</h1>
                <p className="mt-1 text-sm text-white/50">Оюутны хувийн мэдээлэл, сургалтын мэдээлэл</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setEditing(!editing)}
                  className="rounded-2xl border border-violet-400/30 bg-violet-500/15 px-4 py-2 text-sm font-medium text-violet-200 transition-colors hover:bg-violet-500/25"
                >
                  {editing ? "Цуцлах" : "Мэдээлэл засах"}
                </button>
              </div>
            </div>

            {/* Profile card */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-6 backdrop-blur-md">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                {/* Avatar */}
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-800 to-violet-800 text-3xl font-bold text-white">
                  Т
                </div>
                
                {/* Basic info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-white">{studentInfo.fullName}</h2>
                      <p className="mt-1 text-sm text-white/60">{studentInfo.major} · {studentInfo.class}</p>
                      <div className="mt-2 flex flex-wrap gap-3">
                        <span className="rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
                          {studentInfo.scholarship}
                        </span>
                        <span className="rounded-full border border-blue-400/30 bg-blue-500/15 px-3 py-1 text-xs font-medium text-blue-300">
                          {studentInfo.semester}
                        </span>
                        <span className="rounded-full border border-amber-400/30 bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-300">
                          {studentInfo.dormitory}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm font-mono text-white/40">{studentInfo.id}</p>
                      <p className="mt-1 text-xs text-white/30">Оюутны ID</p>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[
                      { label: "Үзэж буй хичээл", value: currentCourses.length, color: "text-violet-300" },
                      { label: "Нийт кредит", value: currentCourses.reduce((sum, c) => sum + c.credits, 0), color: "text-emerald-300" },
                      { label: "Дундаж явц", value: `${Math.round(currentCourses.reduce((sum, c) => sum + c.progress, 0) / currentCourses.length)}%`, color: "text-amber-300" },
                      { label: "Дундаж ирц", value: `${Math.round(currentCourses.reduce((sum, c) => sum + parseInt(c.attendance), 0) / currentCourses.length)}%`, color: "text-cyan-300" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-xl border border-white/10 bg-[#0a1428] p-3 text-center">
                        <p className="text-[10px] text-white/30">{s.label}</p>
                        <p className={`mt-1 text-lg font-bold ${s.color}`}>{s.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {/* Personal information */}
              <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white/80">Хувийн мэдээлэл</p>
                    <p className="mt-1 text-xs text-white/40">Оюутны хувийн мэдээлэл</p>
                  </div>
                  <span className="text-xs text-white/30">6 мэдээлэл</span>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "Төрсө�� огноо", value: studentInfo.birthDate, icon: "🎂", field: "birthDate" },
                    { label: "Хүйс", value: studentInfo.gender, icon: "👤", field: "gender" },
                    { label: "И-мэйл", value: studentInfo.email, icon: "✉️", field: "email" },
                    { label: "Утас", value: studentInfo.phone, icon: "📱", field: "phone" },
                    { label: "Гэрийн хаяг", value: studentInfo.address, icon: "🏠", field: "address" },
                    { label: "Мэргэжил", value: studentInfo.major, icon: "🎓", field: "major" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                      <span className="text-lg">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white/40">{item.label}</p>
                        {editing && item.field === "phone" ? (
                          <input
                            type="text"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="mt-1 w-full rounded border border-white/20 bg-[#0a1428] px-2 py-1 text-sm text-white"
                          />
                        ) : editing && item.field === "email" ? (
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="mt-1 w-full rounded border border-white/20 bg-[#0a1428] px-2 py-1 text-sm text-white"
                          />
                        ) : editing && item.field === "address" ? (
                          <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                            className="mt-1 w-full rounded border border-white/20 bg-[#0a1428] px-2 py-1 text-sm text-white"
                          />
                        ) : (
                          <p className="mt-1 text-sm font-medium text-white/85">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {editing && (
                  <button
                    onClick={handleSave}
                    className="mt-4 w-full rounded-xl border border-emerald-400/30 bg-emerald-500/15 py-2.5 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/25"
                  >
                    Хадгалах
                  </button>
                )}
              </div>

              {/* Current courses */}
              <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white/80">Одоо үзэж буй хичээлүүд</p>
                    <p className="mt-1 text-xs text-white/40">Энэ улирлын үзэж буй хичээлүүд</p>
                  </div>
                  <span className="text-xs text-white/30">{currentCourses.length} хичээл</span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {currentCourses.map((course) => (
                    <div key={course.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white/90">{course.name}</p>
                          <p className="mt-1 text-xs text-white/50">{course.code} · {course.instructor}</p>
                          
                          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                            <div className="flex items-center gap-1">
                              <span className="text-white/40">Цаг:</span>
                              <span className="text-white/70">{course.schedule}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-white/40">Өрөө:</span>
                              <span className="text-white/70">{course.room}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-white/40">Явц:</span>
                              <span className={`font-medium ${
                                course.progress >= 80 ? "text-emerald-300" :
                                course.progress >= 70 ? "text-amber-300" : "text-red-300"
                              }`}>
                                {course.progress}%
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-white/40">Ирц:</span>
                              <span className={`font-medium ${
                                parseInt(course.attendance) >= 90 ? "text-emerald-300" :
                                parseInt(course.attendance) >= 80 ? "text-amber-300" : "text-red-300"
                              }`}>
                                {course.attendance}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="ml-3 shrink-0 text-right">
                          <p className={`text-lg font-bold ${
                            course.grade === "A" ? "text-emerald-300" :
                            course.grade === "B+" ? "text-blue-300" :
                            course.grade === "A-" ? "text-emerald-300" :
                            "text-amber-300"
                          }`}>
                            {course.grade}
                          </p>
                          <p className="text-[10px] text-white/30">{course.credits} кредит</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-4 w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.08]">
                  Бүх хичээлүүдийг харах
                </button>
              </div>
            </div>

            {/* Academic progress */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white/80">Сургалтын явц</p>
                  <p className="mt-1 text-xs text-white/40">Оюутны сургалтын явцын мэдээлэл</p>
                </div>
                <span className="text-xs text-white/30">Дундаж дүн: 3.7</span>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { label: "Дууссан кредит", value: "98", sub: "/120", color: "text-emerald-300", progress: 82 },
                  { label: "Дундаж дүн", value: "3.7", sub: "/4.0", color: "text-blue-300", progress: 93 },
                  { label: "Дууссан хичээл", value: "32", sub: "/40", color: "text-amber-300", progress: 80 },
                  { label: "Ирцийн хувь", value: "92%", sub: "нийт", color: "text-cyan-300", progress: 92 },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-white/10 bg-[#0a1428] p-4">
                    <div className="mb-2 flex justify-between text-[11px]">
                      <span className="text-white/40">{s.label}</span>
                      <span className={`font-bold ${s.color}`}>{s.value} {s.sub}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full ${s.color.replace("text-", "bg-").replace("-300", "-400")}`}
                        style={{ width: `${s.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}