"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const teacherInfo = {
  name: "Батбаяр",
  lastName: "Ганбат",
  fullName: "Батбаяр Ганбат",
  id: "T001",
  email: "batbayar.ganbat@indra.edu.mn",
  phone: "9911-2233",
  department: "Мэдээлэл технологийн багш",
  joinDate: "2020-09-01",
  degree: "Магистр",
  specialization: "Компьютерийн сүлжээ, кибер аюулгүй байдал",
  office: "А байр, 305 тоот",
  officeHours: "Даваа, Мягмар, Лхагва 14:00-16:00",
};

const coursesTeaching = [
  { id: "python-basics", name: "Python үндэс", code: "CS101", semester: "2025 Spring", students: 24 },
  { id: "javascript", name: "JavaScript", code: "CS202", semester: "2025 Spring", students: 20 },
  { id: "networking", name: "Networking", code: "CS303", semester: "2025 Spring", students: 16 },
  { id: "database", name: "Database", code: "CS404", semester: "2025 Spring", students: 22 },
];

export default function TeacherProfilePage() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("Хувийн мэдээлэл");
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: teacherInfo.phone,
    email: teacherInfo.email,
    officeHours: teacherInfo.officeHours,
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
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Багш</p>
                <h1 className="mt-1 text-2xl font-semibold text-white">Хувийн мэдээлэл</h1>
                <p className="mt-1 text-sm text-white/50">Багшийн хувийн мэдээлэл, тохиргоо</p>
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
                  Б
                </div>
                
                {/* Basic info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-white">{teacherInfo.fullName}</h2>
                      <p className="mt-1 text-sm text-white/60">{teacherInfo.department}</p>
                      <div className="mt-2 flex flex-wrap gap-3">
                        <span className="rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
                          {teacherInfo.degree}
                        </span>
                        <span className="rounded-full border border-blue-400/30 bg-blue-500/15 px-3 py-1 text-xs font-medium text-blue-300">
                          {teacherInfo.specialization}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm font-mono text-white/40">{teacherInfo.id}</p>
                      <p className="mt-1 text-xs text-white/30">Багшийн ID</p>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[
                      { label: "Хичээл", value: coursesTeaching.length, color: "text-violet-300" },
                      { label: "Оюутан", value: coursesTeaching.reduce((sum, c) => sum + c.students, 0), color: "text-emerald-300" },
                      { label: "Ажилд орсон", value: teacherInfo.joinDate, color: "text-amber-300" },
                      { label: "Өрөө", value: teacherInfo.office, color: "text-cyan-300" },
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
              {/* Contact information */}
              <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white/80">Холбоо барих мэдээлэл</p>
                    <p className="mt-1 text-xs text-white/40">Багшийн холбоо барих мэдээлэл</p>
                  </div>
                  <span className="text-xs text-white/30">3 мэдээлэл</span>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "И-мэйл", value: teacherInfo.email, icon: "✉️", field: "email" },
                    { label: "Утас", value: teacherInfo.phone, icon: "📱", field: "phone" },
                    { label: "Зөвлөгөөний цаг", value: teacherInfo.officeHours, icon: "🕒", field: "officeHours" },
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
                        ) : editing && item.field === "officeHours" ? (
                          <input
                            type="text"
                            value={formData.officeHours}
                            onChange={(e) => setFormData({...formData, officeHours: e.target.value})}
                            className="mt-1 w-full rounded border border-white/20 bg-[#0a1428] px-2 py-1 text-sm text-white"
                          />
                        ) : (
                          <p className="mt-1 text-sm font-medium text-white/85">
                            {item.field === "phone" ? formData.phone : 
                             item.field === "email" ? formData.email : 
                             formData.officeHours}
                          </p>
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

              {/* Teaching courses */}
              <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white/80">Багшилж буй хичээлүүд</p>
                    <p className="mt-1 text-xs text-white/40">Одоогийн улирлын хичээлүүд</p>
                  </div>
                  <span className="text-xs text-white/30">{coursesTeaching.length} хичээл</span>
                </div>

                <div className="space-y-3">
                  {coursesTeaching.map((course) => (
                    <div key={course.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-white/90">{course.name}</p>
                          <p className="mt-1 text-xs text-white/50">{course.code} • {course.semester}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-white">{course.students}</p>
                          <p className="text-[10px] text-white/30">оюутан</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => router.push("/teacher/courses")}
                  className="mt-4 w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.08]"
                >
                  Бүх хичээлүүдийг харах
                </button>
              </div>
            </div>


          </div>
        </main>
      </div>
    </div>
  );
}