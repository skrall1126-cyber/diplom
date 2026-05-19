"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const courses = [
  { id: "python-basics", name: "Python үндэс", total: 24, present: 22, absent: 2, late: 0, color: "border-blue-400/30 bg-blue-500/15" },
  { id: "javascript", name: "JavaScript", total: 20, present: 18, absent: 1, late: 1, color: "border-amber-400/30 bg-amber-500/15" },
  { id: "networking", name: "Networking", total: 16, present: 16, absent: 0, late: 0, color: "border-emerald-400/30 bg-emerald-500/15" },
  { id: "database", name: "Database", total: 22, present: 19, absent: 2, late: 1, color: "border-orange-400/30 bg-orange-500/15" },
];

const studentAttendance = [
  { id: "B211930001", name: "Бат-Эрдэнэ", course: "Python үндэс", present: 22, absent: 2, late: 0, percentage: 92 },
  { id: "B211930002", name: "Ганбат", course: "Python үндэс", present: 20, absent: 4, late: 0, percentage: 83 },
  { id: "B211930003", name: "Дорж", course: "JavaScript", present: 18, absent: 1, late: 1, percentage: 90 },
  { id: "B211930004", name: "Энхбаяр", course: "JavaScript", present: 19, absent: 1, late: 0, percentage: 95 },
  { id: "B211930005", name: "Нараа", course: "Networking", present: 16, absent: 0, late: 0, percentage: 100 },
  { id: "B211930006", name: "Сүхбаатар", course: "Networking", present: 15, absent: 1, late: 0, percentage: 94 },
  { id: "B211930007", name: "Түвшин", course: "Database", present: 20, absent: 2, late: 0, percentage: 91 },
  { id: "B211930008", name: "Уянга", course: "Database", present: 18, absent: 3, late: 1, percentage: 82 },
];

export default function TeacherAttendancePage() {
  const [activeMenu, setActiveMenu] = useState("Ирц бүртгэл");
  const [selectedCourse, setSelectedCourse] = useState("python-basics");
  const [view, setView] = useState<"overview" | "students" | "qr">("overview");
  const [qrCode, setQrCode] = useState<string>("");
  const [qrActive, setQrActive] = useState(false);
  const [qrScans, setQrScans] = useState<Array<{id: string, name: string, time: string, status: string}>>([]);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<typeof studentAttendance[0] | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const selectedCourseData = courses.find(c => c.id === selectedCourse);
  const filteredStudents = studentAttendance.filter(s => 
    s.course === courses.find(c => c.id === selectedCourse)?.name
  );

  const handleMarkAttendance = (studentId: string, status: "present" | "absent" | "late") => {
    alert(`${studentId} оюутны ирц ${status === "present" ? "Ирсэн" : status === "absent" ? "Тасалсан" : "Хоцорсон"} гэж бүртгэгдлээ.`);
    setOpenDropdown(null);
  };

  const handleMarkAttendanceExtended = (studentId: string, status: "present" | "absent" | "late" | "sick" | "excused") => {
    const statusText = {
      present: "Ирсэн",
      late: "Хоцорсон",
      sick: "Өвчтэй",
      excused: "Чөлөөтэй",
      absent: "Тасалсан"
    };
    alert(`${studentId} оюутны ирц "${statusText[status]}" гэж бүртгэгдлээ.`);
    setOpenDropdown(null);
  };

  const handleShowStudentDetail = (student: typeof studentAttendance[0]) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  const handleBulkAttendance = () => {
    alert("Бүх оюутны ирц амжилттай бүртгэгдлээ.");
  };

  const generateQRCode = () => {
    // Generate a mock QR code data
    const courseId = selectedCourse;
    const timestamp = new Date().toISOString();
    const qrData = `INDRA_ATTENDANCE:${courseId}:${timestamp}:${Math.random().toString(36).substr(2, 9)}`;
    setQrCode(qrData);
    setQrActive(true);
    
    // Simulate QR code scans
    const mockScans = [
      { id: "B211930001", name: "Бат-Эрдэнэ", time: "08:15", status: "Ирсэн" },
      { id: "B211930002", name: "Ганбат", time: "08:20", status: "Ирсэн" },
      { id: "B211930003", name: "Дорж", time: "08:25", status: "Хоцорсон" },
    ];
    setQrScans(mockScans);
    
    alert(`${selectedCourseData?.name} хичээлийн QR код үүсгэгдлээ. Оюутнууд энэ QR кодыг уншуулж ирцээ бүртгүүлнэ.`);
  };

  const stopQRCode = () => {
    setQrActive(false);
    alert("QR код идэвхгүй боллоо.");
  };

  const handleManualQRScan = (studentId: string) => {
    const student = filteredStudents.find(s => s.id === studentId);
    if (student) {
      const newScan = {
        id: student.id,
        name: student.name,
        time: new Date().toLocaleTimeString("mn-MN", { hour: '2-digit', minute: '2-digit' }),
        status: "Ирсэн"
      };
      setQrScans(prev => [newScan, ...prev]);
      alert(`${student.name} оюутны ирц QR кодын тусламжтайгаар бүртгэгдлээ.`);
    }
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
                <h1 className="mt-1 text-2xl font-semibold text-white">Оюутны ирц бүртгэл</h1>
                <p className="mt-1 text-sm text-white/50">Хичээл тус бүрийн оюутны ирцийн мэдээлэл</p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* View toggle */}
                <div className="flex gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-1">
                  {(["overview", "students", "qr"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                        view === v
                          ? "bg-gradient-to-b from-violet-500 to-violet-700 text-white shadow-[0_4px_12px_rgba(124,58,237,0.35)]"
                          : "text-white/40 hover:text-white/70"
                      }`}
                    >
                      {v === "overview" ? (
                        <>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <rect x="1" y="1" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.1"/>
                          </svg>
                          Ерөнхий
                        </>
                      ) : v === "students" ? (
                        <>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <circle cx="6" cy="4" r="2" stroke="currentColor" strokeWidth="1.1"/>
                            <path d="M1 10c0-2.5 2-4 5-4s5 1.5 5 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                          </svg>
                          Оюутан
                        </>
                      ) : (
                        <>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <rect x="1" y="1" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.1"/>
                            <rect x="7" y="1" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.1"/>
                            <rect x="1" y="7" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.1"/>
                            <rect x="7" y="7" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.1"/>
                          </svg>
                          QR
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Course selector */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {courses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourse(course.id)}
                  className={`shrink-0 rounded-2xl border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    selectedCourse === course.id
                      ? "border-violet-400/30 bg-violet-500/15 text-violet-200"
                      : "border-white/[0.07] bg-white/[0.03] text-white/45 hover:text-white/70"
                  }`}
                >
                  {course.name}
                </button>
              ))}
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { 
                  label: "Нийт оюутан", 
                  value: filteredStudents.length, 
                  sub: "оюутан", 
                  color: "text-violet-300", 
                  border: "border-violet-400/20 bg-violet-500/10",
                  icon: "👨‍🎓"
                },
                { 
                  label: "Дундаж ирц", 
                  value: `${Math.round(filteredStudents.reduce((sum, s) => sum + s.percentage, 0) / filteredStudents.length)}%`, 
                  sub: "нийт", 
                  color: "text-emerald-300", 
                  border: "border-emerald-400/20 bg-emerald-500/10",
                  icon: "📊"
                },
                { 
                  label: "Бүрэн ирсэн", 
                  value: filteredStudents.filter(s => s.percentage === 100).length, 
                  sub: "оюутан", 
                  color: "text-cyan-300", 
                  border: "border-cyan-400/20 bg-cyan-500/10",
                  icon: "✅"
                },
                { 
                  label: "Ирээгүй", 
                  value: filteredStudents.filter(s => s.percentage < 80).length, 
                  sub: "оюутан", 
                  color: "text-amber-300", 
                  border: "border-amber-400/20 bg-amber-500/10",
                  icon: "⚠️"
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

            {/* ── OVERVIEW VIEW ── */}
            {view === "overview" && (
              <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                <div className="mb-4">
                  <p className="text-sm font-semibold text-white/80">{selectedCourseData?.name} хичээлийн ирц</p>
                  <p className="mt-1 text-xs text-white/40">Оюутны ирцийн ерөнхий мэдээлэл</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02]">
                        {["Оюутны ID", "Нэр", "Ирсэн", "Тасалсан", "Хоцорсон", "Ирц %", "Үйлдэл"].map((h) => (
                          <th key={h} className="px-4 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white/35 text-center first:text-left whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student, i) => (
                        <tr key={student.id} className={`border-b border-white/[0.05] transition-colors hover:bg-white/[0.02] ${i % 2 === 1 ? "bg-white/[0.01]" : ""}`}>
                          <td className="px-4 py-3">
                            <p className="text-sm font-mono text-white/85">{student.id}</p>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-sm font-medium text-white/85">{student.name}</p>
                          </td>
                          <td className="px-4 py-3 text-center text-sm text-emerald-300">{student.present}</td>
                          <td className="px-4 py-3 text-center text-sm text-red-300">{student.absent}</td>
                          <td className="px-4 py-3 text-center text-sm text-amber-300">{student.late}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`text-base font-bold ${student.percentage >= 80 ? "text-emerald-300" : "text-amber-300"}`}>
                              {student.percentage}%
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="relative">
                              <button
                                onClick={() => setOpenDropdown(openDropdown === student.id ? null : student.id)}
                                className="flex items-center gap-2 rounded-xl border border-violet-400/30 bg-violet-500/15 px-4 py-1.5 text-xs font-medium text-violet-300 transition-colors hover:bg-violet-500/25"
                              >
                                Ирц бүртгэх
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${openDropdown === student.id ? "rotate-180" : ""}`}>
                                  <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </button>
                              
                              {openDropdown === student.id && (
                                <div className="absolute right-0 top-full z-10 mt-1 w-40 rounded-xl border border-white/10 bg-[#0a1428] p-1 shadow-2xl">
                                  {[
                                    { status: "present", label: "Ирсэн", color: "text-emerald-300 hover:bg-emerald-500/15", icon: "✓" },
                                    { status: "late", label: "Хоцорсон", color: "text-amber-300 hover:bg-amber-500/15", icon: "⏰" },
                                    { status: "sick", label: "Өвчтэй", color: "text-blue-300 hover:bg-blue-500/15", icon: "🏥" },
                                    { status: "excused", label: "Чөлөөтэй", color: "text-cyan-300 hover:bg-cyan-500/15", icon: "📝" },
                                    { status: "absent", label: "Тасалсан", color: "text-red-300 hover:bg-red-500/15", icon: "✗" },
                                  ].map((item) => (
                                    <button
                                      key={item.status}
                                      onClick={() => handleMarkAttendanceExtended(student.id, item.status as any)}
                                      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${item.color}`}
                                    >
                                      <span>{item.icon}</span>
                                      {item.label}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── STUDENTS VIEW ── */}
            {view === "students" && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="rounded-[22px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white/90">{student.name}</p>
                        <p className="mt-0.5 text-xs text-white/50">{student.id}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${student.percentage >= 80 ? "text-emerald-300" : "text-amber-300"}`}>
                          {student.percentage}%
                        </p>
                        <p className="text-[10px] text-white/30">Ирц</p>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="mb-4 grid grid-cols-3 gap-2">
                      {[
                        { label: "Ирсэн", value: student.present, color: "text-emerald-300" },
                        { label: "Тасалсан", value: student.absent, color: "text-red-300" },
                        { label: "Хоцорсон", value: student.late, color: "text-amber-300" },
                      ].map((s) => (
                        <div key={s.label} className="rounded-xl border border-white/10 bg-[#0a1428] py-2 text-center">
                          <p className="text-[10px] text-white/30">{s.label}</p>
                          <p className={`text-sm font-semibold ${s.color}`}>{s.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Progress bar */}
                    <div className="mb-3">
                      <div className="mb-1.5 flex justify-between text-[11px]">
                        <span className="text-white/40">Ирцийн хувь</span>
                        <span className={`font-bold ${student.percentage >= 80 ? "text-emerald-300" : "text-amber-300"}`}>
                          {student.percentage}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full ${student.percentage >= 80 ? "bg-gradient-to-r from-emerald-400 to-teal-400" : "bg-gradient-to-r from-amber-400 to-orange-400"}`}
                          style={{ width: `${student.percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <button
                      onClick={() => handleShowStudentDetail(student)}
                      className="w-full rounded-xl border border-violet-400/30 bg-violet-500/15 py-2 text-xs font-medium text-violet-300 transition-colors hover:bg-violet-500/25"
                    >
                      Дэлгэрэнгүй харах
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Student Detail Modal */}
            {showStudentModal && selectedStudent && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                <div className="w-full max-w-lg rounded-[28px] border border-white/10 bg-[#0a1428] p-6 shadow-2xl">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white/90">Оюутны дэлгэрэнгүй мэдээлэл</p>
                      <p className="mt-0.5 text-xs text-white/40">{selectedStudent.course}</p>
                    </div>
                    <button
                      onClick={() => setShowStudentModal(false)}
                      className="rounded-full border border-white/10 bg-white/[0.04] p-1.5 text-white/40 hover:text-white/70"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Student Info */}
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-800 text-2xl font-bold text-white">
                          {selectedStudent.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="text-lg font-semibold text-white">{selectedStudent.name}</p>
                          <p className="mt-0.5 text-sm font-mono text-white/60">{selectedStudent.id}</p>
                          <p className="mt-1 text-xs text-white/40">{selectedStudent.course}</p>
                        </div>
                      </div>
                    </div>

                    {/* Attendance Stats */}
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { label: "Ирц %", value: `${selectedStudent.percentage}%`, color: "text-violet-300", border: "border-violet-400/20 bg-violet-500/10" },
                        { label: "Ирсэн", value: selectedStudent.present, color: "text-emerald-300", border: "border-emerald-400/20 bg-emerald-500/10" },
                        { label: "Тасалсан", value: selectedStudent.absent, color: "text-red-300", border: "border-red-400/20 bg-red-500/10" },
                        { label: "Хоцорсон", value: selectedStudent.late, color: "text-amber-300", border: "border-amber-400/20 bg-amber-500/10" },
                      ].map((stat) => (
                        <div key={stat.label} className={`rounded-xl border p-3 ${stat.border}`}>
                          <p className="text-[10px] text-white/30">{stat.label}</p>
                          <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="mb-2 flex justify-between text-xs">
                        <span className="text-white/40">Ирцийн хувь</span>
                        <span className={`font-bold ${selectedStudent.percentage >= 80 ? "text-emerald-300" : "text-amber-300"}`}>
                          {selectedStudent.percentage}%
                        </span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full ${selectedStudent.percentage >= 80 ? "bg-gradient-to-r from-emerald-400 to-teal-400" : "bg-gradient-to-r from-amber-400 to-orange-400"}`}
                          style={{ width: `${selectedStudent.percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={() => setShowStudentModal(false)}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.08]"
                    >
                      Хаах
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── QR VIEW ── */}
            {view === "qr" && (
              <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white/80">QR кодоор ирц бүртгэх</p>
                    <p className="mt-1 text-xs text-white/40">Оюутнууд QR кодыг уншуулж ирцээ бүртгүүлнэ</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${qrActive ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                    <span className={`text-xs ${qrActive ? "text-emerald-300" : "text-red-300"}`}>
                      {qrActive ? "Идэвхтэй" : "Идэвхгүй"}
                    </span>
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  {/* QR Code Generator */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-violet-400">
                        <rect x="1.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                        <rect x="9.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                        <rect x="1.5" y="9.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                        <rect x="9.5" y="9.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                      </svg>
                      <p className="text-sm font-medium text-white/80">QR код үүсгэх</p>
                    </div>
                    
                    <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                      {/* QR Code Display */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {qrActive ? (
                          <div className="text-center">
                            <div className="mx-auto mb-3 h-32 w-32 rounded-lg border-2 border-dashed border-violet-400/40 bg-violet-500/10 p-4">
                              <div className="grid h-full w-full grid-cols-4 gap-1">
                                {Array.from({ length: 16 }).map((_, i) => (
                                  <div 
                                    key={i} 
                                    className={`rounded-sm ${Math.random() > 0.3 ? "bg-violet-400" : "bg-transparent"}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-white/60">{selectedCourseData?.name}</p>
                            <p className="text-xs text-white/40">Хичээлийн QR код</p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="mx-auto mb-3 h-12 w-12 rounded-full border-2 border-dashed border-violet-400/40 bg-violet-500/10 p-2">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-violet-400">
                                <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                                <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                                <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                                <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                              </svg>
                            </div>
                            <p className="text-sm text-white/60">QR код үүсгэхгүй байна</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={generateQRCode}
                        disabled={qrActive}
                        className={`flex-1 rounded-xl border py-2 text-sm font-medium transition-colors ${
                          qrActive 
                            ? "border-white/10 bg-[#0a1428] text-white/30 cursor-not-allowed" 
                            : "border-violet-400/30 bg-violet-500/15 text-violet-200 hover:bg-violet-500/25"
                        }`}
                      >
                        QR код үүсгэх
                      </button>
                      <button
                        onClick={stopQRCode}
                        disabled={!qrActive}
                        className={`flex-1 rounded-xl border py-2 text-sm font-medium transition-colors ${
                          !qrActive 
                            ? "border-white/10 bg-[#0a1428] text-white/30 cursor-not-allowed" 
                            : "border-red-400/30 bg-red-500/15 text-red-300 hover:bg-red-500/25"
                        }`}
                      >
                        Зогсоох
                      </button>
                    </div>

                    {/* Manual QR Scan */}
                    <div className="pt-2">
                      <p className="mb-2 text-xs font-medium text-white/60">Гараар QR уншуулах</p>
                      <div className="grid grid-cols-2 gap-2">
                        {filteredStudents.slice(0, 4).map((student) => (
                          <button
                            key={student.id}
                            onClick={() => handleManualQRScan(student.id)}
                            className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-xs font-medium text-white/60 transition-colors hover:bg-white/[0.08]"
                          >
                            {student.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* QR Scans Log */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-emerald-400">
                        <rect x="1.5" y="1.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.2"/>
                        <path d="M4.5 5.5h7M4.5 8h7M4.5 10.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                      <p className="text-sm font-medium text-white/80">QR уншилтын бүртгэл</p>
                    </div>

                    <div className="space-y-2">
                      {qrScans.length > 0 ? (
                        qrScans.map((scan, i) => (
                          <div key={i} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2">
                            <div className="flex items-center gap-2">
                              <div className={`h-2 w-2 rounded-full ${scan.status === "Ирсэн" ? "bg-emerald-500" : "bg-amber-500"}`} />
                              <span className="text-xs text-white/70">{scan.time}</span>
                              <span className="text-xs text-white/50">{scan.name}</span>
                              <span className="text-xs text-white/40">({scan.id})</span>
                            </div>
                            <span className={`text-xs font-medium ${scan.status === "Ирсэн" ? "text-emerald-300" : "text-amber-300"}`}>
                              {scan.status}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-4 text-center">
                          <p className="text-sm text-white/40">QR уншилт байхгүй байна</p>
                          <p className="mt-1 text-xs text-white/20">QR код үүсгэсний дараа уншилтууд энд харагдана</p>
                        </div>
                      )}
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      {[
                        { 
                          label: "Нийт уншилт", 
                          value: qrScans.length, 
                          color: "text-violet-300",
                          border: "border-violet-400/20 bg-violet-500/10"
                        },
                        { 
                          label: "Ирсэн", 
                          value: qrScans.filter(s => s.status === "Ирсэн").length, 
                          color: "text-emerald-300",
                          border: "border-emerald-400/20 bg-emerald-500/10"
                        },
                        { 
                          label: "Хоцорсон", 
                          value: qrScans.filter(s => s.status === "Хоцорсон").length, 
                          color: "text-amber-300",
                          border: "border-amber-400/20 bg-amber-500/10"
                        },
                      ].map((stat) => (
                        <div key={stat.label} className={`rounded-xl border p-3 ${stat.border}`}>
                          <p className="text-[10px] text-white/30">{stat.label}</p>
                          <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                        </div>
                      ))}
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