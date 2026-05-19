"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const teacherCourses = [
  { 
    id: "python-basics", 
    name: "Python үндэс", 
    code: "CS101", 
    students: 24, 
    semester: "2025 Spring",
    color: "border-blue-400/30 bg-blue-500/15",
    attendance: 78,
    averageGrade: 85,
    materials: 12,
    assignments: 5
  },
  { 
    id: "javascript", 
    name: "JavaScript", 
    code: "CS202", 
    students: 20, 
    semester: "2025 Spring",
    color: "border-amber-400/30 bg-amber-500/15",
    attendance: 85,
    averageGrade: 88,
    materials: 8,
    assignments: 4
  },
  { 
    id: "networking", 
    name: "Networking", 
    code: "CS303", 
    students: 16, 
    semester: "2025 Spring",
    color: "border-emerald-400/30 bg-emerald-500/15",
    attendance: 92,
    averageGrade: 91,
    materials: 10,
    assignments: 6
  },
  { 
    id: "database", 
    name: "Database", 
    code: "CS404", 
    students: 22, 
    semester: "2025 Spring",
    color: "border-orange-400/30 bg-orange-500/15",
    attendance: 65,
    averageGrade: 78,
    materials: 6,
    assignments: 3
  },
  { 
    id: "ui-ux", 
    name: "UI/UX Design", 
    code: "CS505", 
    students: 18, 
    semester: "2025 Spring",
    color: "border-pink-400/30 bg-pink-500/15",
    attendance: 80,
    averageGrade: 82,
    materials: 9,
    assignments: 4
  },
  { 
    id: "cyber-security", 
    name: "Cyber Security", 
    code: "CS606", 
    students: 20, 
    semester: "2025 Spring",
    color: "border-red-400/30 bg-red-500/15",
    attendance: 75,
    averageGrade: 79,
    materials: 7,
    assignments: 5
  },
];

export default function TeacherCoursesPage() {
  const [activeMenu, setActiveMenu] = useState("Хичээл");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedSemester, setSelectedSemester] = useState("2025 Spring");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showHomeworkModal, setShowHomeworkModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    fileType: "pdf",
    file: null as File | null
  });
  const [assignmentForm, setAssignmentForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    points: 100,
    type: "individual",
    file: null as File | null
  });
  const [homeworkForm, setHomeworkForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    points: 100,
    type: "individual",
    file: null as File | null
  });

  const semesters = ["2025 Spring", "2024 Fall", "2024 Spring", "2023 Fall"];

  const handleUploadMaterial = (courseId: string) => {
    setSelectedCourse(courseId);
    setShowUploadModal(true);
  };

  const handleCreateAssignment = (courseId: string) => {
    setSelectedCourse(courseId);
    setShowAssignmentModal(true);
  };

  const handleCreateHomework = (courseId: string) => {
    setSelectedCourse(courseId);
    setShowHomeworkModal(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadForm({...uploadForm, file});
    }
  };

  const handleAssignmentFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAssignmentForm({...assignmentForm, file});
    }
  };

  const handleHomeworkFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHomeworkForm({...homeworkForm, file});
    }
  };

  const handleSubmitUpload = () => {
    if (!uploadForm.title || !uploadForm.file) {
      alert("Гарчиг болон файл оруулна уу!");
      return;
    }

    const course = teacherCourses.find(c => c.id === selectedCourse);
    alert(`${course?.name} хичээлд "${uploadForm.title}" материал амжилттай орууллаа!`);
    
    setShowUploadModal(false);
    setUploadForm({
      title: "",
      description: "",
      fileType: "pdf",
      file: null
    });
  };

  const handleSubmitAssignment = () => {
    if (!assignmentForm.title || !assignmentForm.dueDate) {
      alert("Гарчиг болон дуусах хугацаа оруулна уу!");
      return;
    }

    const course = teacherCourses.find(c => c.id === selectedCourse);
    alert(`${course?.name} хичээлд "${assignmentForm.title}" даалгавар амжилттай үүсгэлээ!`);
    
    setShowAssignmentModal(false);
    setAssignmentForm({
      title: "",
      description: "",
      dueDate: "",
      points: 100,
      type: "individual",
      file: null
    });
  };

  const handleSubmitHomework = () => {
    if (!homeworkForm.title || !homeworkForm.dueDate) {
      alert("Гарчиг болон дуусах хугацаа оруулна уу!");
      return;
    }

    const course = teacherCourses.find(c => c.id === selectedCourse);
    alert(`${course?.name} хичээлд "${homeworkForm.title}" бие даалт амжилттай үүсгэлээ!`);
    
    setShowHomeworkModal(false);
    setHomeworkForm({
      title: "",
      description: "",
      dueDate: "",
      points: 100,
      type: "individual",
      file: null
    });
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
                <h1 className="mt-1 text-2xl font-semibold text-white">Миний хичээлүүд</h1>
                <p className="mt-1 text-sm text-white/50">Багшилж буй хичээлүүдийн мэдээлэл</p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* View toggle */}
                <div className="flex gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-1">
                  {(["grid", "list"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                        view === v
                          ? "bg-gradient-to-b from-violet-500 to-violet-700 text-white shadow-[0_4px_12px_rgba(124,58,237,0.35)]"
                          : "text-white/40 hover:text-white/70"
                      }`}
                    >
                      {v === "grid" ? (
                        <>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <rect x="1" y="1" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.1"/>
                            <rect x="7" y="1" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.1"/>
                            <rect x="1" y="7" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.1"/>
                            <rect x="7" y="7" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.1"/>
                          </svg>
                          Сүлжээ
                        </>
                      ) : (
                        <>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <rect x="1" y="1" width="10" height="3" rx="0.8" stroke="currentColor" strokeWidth="1.1"/>
                            <rect x="1" y="6" width="10" height="3" rx="0.8" stroke="currentColor" strokeWidth="1.1"/>
                          </svg>
                          Жагсаалт
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Semester selector and action buttons */}
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { 
                  label: "Нийт хичээл", 
                  value: teacherCourses.length, 
                  sub: "хичээл", 
                  color: "text-violet-300", 
                  border: "border-violet-400/20 bg-violet-500/10",
                  icon: "📚"
                },
                { 
                  label: "Нийт оюутан", 
                  value: teacherCourses.reduce((sum, c) => sum + c.students, 0), 
                  sub: "оюутан", 
                  color: "text-emerald-300", 
                  border: "border-emerald-400/20 bg-emerald-500/10",
                  icon: "👨‍🎓"
                },
                { 
                  label: "Дундаж ирц", 
                  value: `${Math.round(teacherCourses.reduce((sum, c) => sum + c.attendance, 0) / teacherCourses.length)}%`, 
                  sub: "нийт", 
                  color: "text-amber-300", 
                  border: "border-amber-400/20 bg-amber-500/10",
                  icon: "📊"
                },
                { 
                  label: "Дундаж дүн", 
                  value: `${Math.round(teacherCourses.reduce((sum, c) => sum + c.averageGrade, 0) / teacherCourses.length)}%`, 
                  sub: "нийт", 
                  color: "text-cyan-300", 
                  border: "border-cyan-400/20 bg-cyan-500/10",
                  icon: "⭐"
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

            {/* ── GRID VIEW ── */}
            {view === "grid" && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {teacherCourses.map((course) => (
                  <div key={course.id} className={`rounded-[22px] border p-5 ${course.color}`}>
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white/90">{course.name}</p>
                        <p className="mt-0.5 text-xs text-white/50">{course.code} • {course.semester}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-white">{course.students}</p>
                        <p className="text-[10px] text-white/30">оюутан</p>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="mb-4 grid grid-cols-2 gap-2">
                      {[
                        { label: "Ирц", value: `${course.attendance}%`, color: "text-emerald-300" },
                        { label: "Дундаж дүн", value: `${course.averageGrade}%`, color: "text-amber-300" },
                        { label: "Материал", value: course.materials, color: "text-cyan-300" },
                        { label: "Даалгавар", value: course.assignments, color: "text-violet-300" },
                      ].map((s) => (
                        <div key={s.label} className="rounded-xl border border-white/10 bg-[#0a1428] py-2 text-center">
                          <p className="text-[10px] text-white/30">{s.label}</p>
                          <p className={`text-sm font-semibold ${s.color}`}>{s.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Progress bars */}
                    <div className="mb-4 space-y-2">
                      <div>
                        <div className="mb-1 flex justify-between text-[11px]">
                          <span className="text-white/40">Ирц</span>
                          <span className="font-bold text-emerald-300">{course.attendance}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
                            style={{ width: `${course.attendance}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between text-[11px]">
                          <span className="text-white/40">Дундаж дүн</span>
                          <span className="font-bold text-amber-300">{course.averageGrade}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400"
                            style={{ width: `${course.averageGrade}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleUploadMaterial(course.id)}
                        className="flex-1 rounded-xl border border-emerald-400/30 bg-emerald-500/15 py-2 text-xs font-medium text-emerald-300 transition-colors hover:bg-emerald-500/25"
                      >
                        Материал
                      </button>
                      <button 
                        onClick={() => handleCreateAssignment(course.id)}
                        className="flex-1 rounded-xl border border-violet-400/30 bg-violet-500/15 py-2 text-xs font-medium text-violet-300 transition-colors hover:bg-violet-500/25"
                      >
                        Даалгавар
                      </button>
                      <button 
                        onClick={() => handleCreateHomework(course.id)}
                        className="flex-1 rounded-xl border border-amber-400/30 bg-amber-500/15 py-2 text-xs font-medium text-amber-300 transition-colors hover:bg-amber-500/25"
                      >
                        Бие даалт
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── LIST VIEW ── */}
            {view === "list" && (
              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#081120]/70 backdrop-blur-md">
                <div className="border-b border-white/10 bg-white/[0.03] px-5 py-3">
                  <p className="text-sm font-medium text-white/80">Хичээлүүдийн жагсаалт</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02]">
                        {["Хичээл", "Код", "Семестер", "Оюутан", "Ирц", "Дундаж дүн", "Үйлдэл"].map((h) => (
                          <th key={h} className="px-4 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white/35 text-center first:text-left whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {teacherCourses.map((course, i) => (
                        <tr key={course.id} className={`border-b border-white/[0.05] transition-colors hover:bg-white/[0.02] ${i % 2 === 1 ? "bg-white/[0.01]" : ""}`}>
                          <td className="px-4 py-3">
                            <p className="text-sm font-medium text-white/85">{course.name}</p>
                          </td>
                          <td className="px-4 py-3 text-center text-sm text-white/50">{course.code}</td>
                          <td className="px-4 py-3 text-center text-sm text-white/50">{course.semester}</td>
                          <td className="px-4 py-3 text-center text-sm text-white/50">{course.students}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`text-base font-bold ${course.attendance >= 80 ? "text-emerald-300" : "text-amber-300"}`}>
                              {course.attendance}%
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`text-base font-bold ${course.averageGrade >= 80 ? "text-emerald-300" : "text-amber-300"}`}>
                              {course.averageGrade}%
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:bg-white/[0.08]">
                                Ирц
                              </button>
                              <button className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:bg-white/[0.08]">
                                Дүн
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Upload Material Modal */}
            {showUploadModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#0a1428] p-6 shadow-2xl">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white/90">Материал оруулах</p>
                      <p className="mt-0.5 text-xs text-white/40">
                        {selectedCourse ? teacherCourses.find(c => c.id === selectedCourse)?.name : "Бүх хичээлд"}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowUploadModal(false)}
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
                        Гарчиг
                      </label>
                      <input
                        type="text"
                        value={uploadForm.title}
                        onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder-white/20 focus:border-emerald-400/40 focus:outline-none"
                        placeholder="Жишээ нь: Лекц 1 - Python үндэс"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium text-white/35">
                        Тайлбар
                      </label>
                      <textarea
                        value={uploadForm.description}
                        onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder-white/20 focus:border-emerald-400/40 focus:outline-none"
                        placeholder="Материалын тайлбар..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium text-white/35">
                        Файлын төрөл
                      </label>
                      <select
                        value={uploadForm.fileType}
                        onChange={(e) => setUploadForm({...uploadForm, fileType: e.target.value})}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white focus:border-emerald-400/40 focus:outline-none"
                      >
                        <option value="pdf">PDF</option>
                        <option value="ppt">PowerPoint</option>
                        <option value="video">Видео</option>
                        <option value="zip">ZIP архив</option>
                        <option value="other">Бусад</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium text-white/35">
                        Файл сонгох
                      </label>
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
                        <input
                          type="file"
                          id="file-upload"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <div className="mx-auto mb-2 h-12 w-12 rounded-full border-2 border-dashed border-emerald-400/40 bg-emerald-500/10 p-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <p className="text-sm text-white/60">
                            {uploadForm.file ? uploadForm.file.name : "Файл сонгох"}
                          </p>
                          <p className="mt-1 text-xs text-white/30">Дээд тал: 100MB</p>
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setShowUploadModal(false)}
                        className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.08]"
                      >
                        Цуцлах
                      </button>
                      <button
                        onClick={handleSubmitUpload}
                        className="flex-1 rounded-xl border border-emerald-400/30 bg-gradient-to-b from-emerald-500 to-teal-700 px-4 py-2.5 text-sm font-medium text-white shadow-[0_4px_12px_rgba(16,185,129,0.35)] transition-all hover:opacity-90"
                      >
                        Оруулах
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Create Assignment Modal */}
            {showAssignmentModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#0a1428] p-6 shadow-2xl">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white/90">Даалгавар үүсгэх</p>
                      <p className="mt-0.5 text-xs text-white/40">
                        {selectedCourse ? teacherCourses.find(c => c.id === selectedCourse)?.name : "Бүх хичээлд"}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAssignmentModal(false)}
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
                        Даалгаврын нэр
                      </label>
                      <input
                        type="text"
                        value={assignmentForm.title}
                        onChange={(e) => setAssignmentForm({...assignmentForm, title: e.target.value})}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder-white/20 focus:border-violet-400/40 focus:outline-none"
                        placeholder="Жишээ нь: Лабораторийн ажил 1"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium text-white/35">
                        Тайлбар
                      </label>
                      <textarea
                        value={assignmentForm.description}
                        onChange={(e) => setAssignmentForm({...assignmentForm, description: e.target.value})}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder-white/20 focus:border-violet-400/40 focus:outline-none"
                        placeholder="Даалгаврын дэлгэрэнгүй мэдээлэл..."
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1.5 block text-[11px] font-medium text-white/35">
                          Дуусах хугацаа
                        </label>
                        <input
                          type="datetime-local"
                          value={assignmentForm.dueDate}
                          onChange={(e) => setAssignmentForm({...assignmentForm, dueDate: e.target.value})}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white focus:border-violet-400/40 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-[11px] font-medium text-white/35">
                          Оноо
                        </label>
                        <input
                          type="number"
                          value={assignmentForm.points}
                          onChange={(e) => setAssignmentForm({...assignmentForm, points: parseInt(e.target.value)})}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white focus:border-violet-400/40 focus:outline-none"
                          min="1"
                          max="1000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium text-white/35">
                        Төрөл
                      </label>
                      <select
                        value={assignmentForm.type}
                        onChange={(e) => setAssignmentForm({...assignmentForm, type: e.target.value})}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white focus:border-violet-400/40 focus:outline-none"
                      >
                        <option value="individual">Хувь хүн</option>
                        <option value="group">Баг</option>
                        <option value="pair">Хос</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium text-white/35">
                        Файл хавсаргах (заавал биш)
                      </label>
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
                        <input
                          type="file"
                          id="assignment-file-upload"
                          onChange={handleAssignmentFileUpload}
                          className="hidden"
                        />
                        <label htmlFor="assignment-file-upload" className="cursor-pointer">
                          <div className="mx-auto mb-2 h-12 w-12 rounded-full border-2 border-dashed border-violet-400/40 bg-violet-500/10 p-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-violet-400">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <p className="text-sm text-white/60">
                            {assignmentForm.file ? assignmentForm.file.name : "Файл сонгох"}
                          </p>
                          <p className="mt-1 text-xs text-white/30">Дээд тал: 100MB</p>
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setShowAssignmentModal(false)}
                        className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.08]"
                      >
                        Цуцлах
                      </button>
                      <button
                        onClick={handleSubmitAssignment}
                        className="flex-1 rounded-xl border border-violet-400/30 bg-gradient-to-b from-violet-500 to-violet-700 px-4 py-2.5 text-sm font-medium text-white shadow-[0_4px_12px_rgba(124,58,237,0.35)] transition-all hover:opacity-90"
                      >
                        Үүсгэх
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Create Homework Modal */}
            {showHomeworkModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#0a1428] p-6 shadow-2xl">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white/90">Бие даалт оруулах</p>
                      <p className="mt-0.5 text-xs text-white/40">
                        {selectedCourse ? teacherCourses.find(c => c.id === selectedCourse)?.name : "Бүх хичээлд"}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowHomeworkModal(false)}
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
                        Бие даалтын нэр
                      </label>
                      <input
                        type="text"
                        value={homeworkForm.title}
                        onChange={(e) => setHomeworkForm({...homeworkForm, title: e.target.value})}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder-white/20 focus:border-amber-400/40 focus:outline-none"
                        placeholder="Жишээ нь: 1-р бүлгийн бие даалт"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium text-white/35">
                        Тайлбар
                      </label>
                      <textarea
                        value={homeworkForm.description}
                        onChange={(e) => setHomeworkForm({...homeworkForm, description: e.target.value})}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder-white/20 focus:border-amber-400/40 focus:outline-none"
                        placeholder="Бие даалтын дэлгэрэнгүй мэдээлэл..."
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1.5 block text-[11px] font-medium text-white/35">
                          Дуусах хугацаа
                        </label>
                        <input
                          type="datetime-local"
                          value={homeworkForm.dueDate}
                          onChange={(e) => setHomeworkForm({...homeworkForm, dueDate: e.target.value})}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white focus:border-amber-400/40 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-[11px] font-medium text-white/35">
                          Оноо
                        </label>
                        <input
                          type="number"
                          value={homeworkForm.points}
                          onChange={(e) => setHomeworkForm({...homeworkForm, points: parseInt(e.target.value)})}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white focus:border-amber-400/40 focus:outline-none"
                          min="1"
                          max="1000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium text-white/35">
                        Төрөл
                      </label>
                      <select
                        value={homeworkForm.type}
                        onChange={(e) => setHomeworkForm({...homeworkForm, type: e.target.value})}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white focus:border-amber-400/40 focus:outline-none"
                      >
                        <option value="individual">Хувь хүн</option>
                        <option value="group">Баг</option>
                        <option value="pair">Хос</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium text-white/35">
                        Файл хавсаргах (заавал биш)
                      </label>
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
                        <input
                          type="file"
                          id="homework-file-upload"
                          onChange={handleHomeworkFileUpload}
                          className="hidden"
                        />
                        <label htmlFor="homework-file-upload" className="cursor-pointer">
                          <div className="mx-auto mb-2 h-12 w-12 rounded-full border-2 border-dashed border-amber-400/40 bg-amber-500/10 p-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-amber-400">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <p className="text-sm text-white/60">
                            {homeworkForm.file ? homeworkForm.file.name : "Файл сонгох"}
                          </p>
                          <p className="mt-1 text-xs text-white/30">Дээд тал: 100MB</p>
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setShowHomeworkModal(false)}
                        className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.08]"
                      >
                        Цуцлах
                      </button>
                      <button
                        onClick={handleSubmitHomework}
                        className="flex-1 rounded-xl border border-amber-400/30 bg-gradient-to-b from-amber-500 to-amber-700 px-4 py-2.5 text-sm font-medium text-white shadow-[0_4px_12px_rgba(251,146,60,0.35)] transition-all hover:opacity-90"
                      >
                        Үүсгэх
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