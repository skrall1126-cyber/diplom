"use client";

import { useState } from "react";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";

// Мэргэжлийн төрөл
interface Major {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

// Хичээлийн төрөл
interface Course {
  id: string;
  name: string;
  majorId: string;
  level: string;
  semester: string;
  status: string;
  students: number;
  teachers: number;
  hours: number;
  duration: string;
  startDate: string;
  endDate: string;
  instructor: string;
}

export default function TrainingPlanPage() {
  const [activeMenu, setActiveMenu] = useState("Сургалтын төлөвлөгөө");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMajor, setSelectedMajor] = useState<string>("all");
  const [showAddMajorModal, setShowAddMajorModal] = useState(false);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newMajorName, setNewMajorName] = useState("");
  const [newMajorDesc, setNewMajorDesc] = useState("");
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseMajor, setNewCourseMajor] = useState("");
  const [newCourseLevel, setNewCourseLevel] = useState("");
  const [newCourseHours, setNewCourseHours] = useState("");

  // Мэргэжлүүд
  const [majors, setMajors] = useState<Major[]>([
    { id: "prog", name: "Програм хангамж", description: "Програмчлал, веб хөгжүүлэлт", color: "from-blue-500 to-cyan-600", icon: "💻" },
    { id: "cyber", name: "Кибер аюулгүй байдал", description: "Сүлжээний аюулгүй байдал, мэдээллийн хамгаалалт", color: "from-red-500 to-orange-600", icon: "🔒" },
    { id: "data", name: "Өгөгдлийн шинжилгээ", description: "Өгөгдлийн сан, шинжилгээ", color: "from-purple-500 to-pink-600", icon: "📊" },
    { id: "network", name: "Сүлжээний технологи", description: "Сүлжээний удирдлага, архитектур", color: "from-emerald-500 to-teal-600", icon: "🌐" },
  ]);

  // Хичээлүүд
  const [courses, setCourses] = useState<Course[]>([
    { id: "C001", name: "Програмчлалын үндэс", majorId: "prog", level: "Эхлэгч", semester: "2026-2027 намар", status: "Баталгаажсан", students: 45, teachers: 3, hours: 120, duration: "12 долоо хоног", startDate: "2026-03-01", endDate: "2026-05-24", instructor: "Б.Батбаяр" },
    { id: "C002", name: "JavaScript", majorId: "prog", level: "Дунд", semester: "2026-2027 намар", status: "Явж байгаа", students: 20, teachers: 2, hours: 100, duration: "10 долоо хоног", startDate: "2026-03-15", endDate: "2026-05-31", instructor: "Д.Дорж" },
    { id: "C003", name: "React Development", majorId: "prog", level: "Дунд", semester: "2026-2027 хавар", status: "Төлөвлөгдсөн", students: 18, teachers: 1, hours: 115, duration: "10 долоо хоног", startDate: "2026-05-15", endDate: "2026-07-24", instructor: "А.Ариунаа" },
    { id: "C004", name: "Сүлжээний аюулгүй байдал", majorId: "cyber", level: "Ахисан", semester: "2026-2027 намар", status: "Хүлээгдэж байна", students: 32, teachers: 2, hours: 90, duration: "10 долоо хоног", startDate: "2026-03-15", endDate: "2026-05-31", instructor: "Д.Дорж" },
    { id: "C005", name: "Cyber Security", majorId: "cyber", level: "Ахисан", semester: "2026-2027 намар", status: "Явж байгаа", students: 20, teachers: 2, hours: 120, duration: "12 долоо хоног", startDate: "2026-03-20", endDate: "2026-06-12", instructor: "Т.Түмэнбаяр" },
    { id: "C006", name: "Өгөгдлийн сангийн удирдлага", majorId: "data", level: "Дунд", semester: "2026-2027 хавар", status: "Баталгаажсан", students: 38, teachers: 2, hours: 105, duration: "10 долоо хоног", startDate: "2026-03-10", endDate: "2026-05-19", instructor: "Г.Ганбаяр" },
  ]);

  // Шүүлтүүрлэх
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMajor = selectedMajor === "all" || course.majorId === selectedMajor;
    return matchesSearch && matchesMajor;
  });

  // Мэргэжил нэмэх
  const handleAddMajor = () => {
    if (newMajorName.trim()) {
      const newMajor: Major = {
        id: `major_${Date.now()}`,
        name: newMajorName,
        description: newMajorDesc,
        color: "from-indigo-500 to-blue-600",
        icon: "🎓"
      };
      setMajors([...majors, newMajor]);
      setNewMajorName("");
      setNewMajorDesc("");
      setShowAddMajorModal(false);
    }
  };

  // Хичээл нэмэх
  const handleAddCourse = () => {
    if (newCourseName.trim() && newCourseMajor && newCourseLevel && newCourseHours) {
      const newCourse: Course = {
        id: `C${String(courses.length + 1).padStart(3, '0')}`,
        name: newCourseName,
        majorId: newCourseMajor,
        level: newCourseLevel,
        semester: "2026-2027 намар",
        status: "Ноорог",
        students: 0,
        teachers: 1,
        hours: parseInt(newCourseHours),
        duration: "10 долоо хоног",
        startDate: "2026-03-01",
        endDate: "2026-05-24",
        instructor: "Багш томилогдоогүй"
      };
      setCourses([...courses, newCourse]);
      setNewCourseName("");
      setNewCourseMajor("");
      setNewCourseLevel("");
      setNewCourseHours("");
      setShowAddCourseModal(false);
    }
  };

  // Статистик
  const totalCourses = courses.length;
  const ongoingCourses = courses.filter(c => c.status === "Явж байгаа").length;
  const totalStudents = courses.reduce((sum, c) => sum + c.students, 0);

  return (
    <div className="min-h-screen font-sans text-white">
      <Navbar />
      <div className="flex">
        <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
        <main
          className="flex-1 overflow-y-auto bg-no-repeat px-4 py-5 md:px-6 md:py-6"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8, 14, 30, 0.9), rgba(8, 12, 24, 0.95)), url('/indra-bg.jpg')",
            backgroundPosition: "center center",
            backgroundSize: "72%",
          }}
        >
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Сургалтын төлөвлөгөө</h1>
                <p className="mt-1 text-sm text-white/50">Мэргэжил, хичээлийн удирдлага</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowAddMajorModal(true)}
                  className="rounded-lg border border-blue-400/30 bg-gradient-to-b from-blue-500 to-blue-700 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  Мэргэжил нэмэх
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Нийт мэргэжил", value: majors.length, color: "bg-blue-500", icon: "🎓" },
                { label: "Нийт хичээл", value: totalCourses, color: "bg-purple-500", icon: "📚" },
                { label: "Явж байгаа", value: ongoingCourses, color: "bg-emerald-500", icon: "✅" },
                { label: "Нийт оюутан", value: totalStudents, color: "bg-amber-500", icon: "👥" },
              ].map((stat, index) => (
                <div key={index} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/50">{stat.label}</p>
                      <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`h-12 w-12 rounded-full ${stat.color} flex items-center justify-center`}>
                      <span className="text-lg">{stat.icon}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Search */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
              <div className="relative">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                >
                  <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M11 11l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="Хичээлийн нэр, багш, ID-аар хайх..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.06] py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/40"
                />
              </div>
            </div>

            {/* Courses by Major */}
            {(selectedMajor === "all" ? majors : majors.filter(m => m.id === selectedMajor)).map((major) => {
              const majorCourses = filteredCourses.filter(c => c.majorId === major.id);
              if (majorCourses.length === 0) return null;

              return (
                <div key={major.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${major.color} flex items-center justify-center`}>
                      <span className="text-xl">{major.icon}</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">{major.name}</h2>
                      <p className="text-xs text-white/50">{majorCourses.length} хичээл</p>
                    </div>
                    <button
                      onClick={() => {
                        setNewCourseMajor(major.id);
                        setShowAddCourseModal(true);
                      }}
                      className="ml-auto rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:bg-emerald-500/25"
                    >
                      Хичээл нэмэх
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {majorCourses.map((course) => (
                      <div key={course.id} className="rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-600 to-orange-800 flex items-center justify-center">
                              <span className="text-sm font-semibold text-white">{course.name.charAt(0)}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-white">{course.name}</p>
                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                                  course.level === "Эхлэгч" ? "bg-blue-500/20 text-blue-300" :
                                  course.level === "Дунд" ? "bg-amber-500/20 text-amber-300" :
                                  "bg-red-500/20 text-red-300"
                                }`}>
                                  {course.level}
                                </span>
                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                                  course.status === "Баталгаажсан" || course.status === "Явж байгаа"
                                    ? "bg-emerald-500/20 text-emerald-300" 
                                    : course.status === "Хүлээгдэж байна"
                                    ? "bg-amber-500/20 text-amber-300"
                                    : course.status === "Төлөвлөгдсөн"
                                    ? "bg-blue-500/20 text-blue-300"
                                    : "bg-gray-500/20 text-gray-300"
                                }`}>
                                  {course.status}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 mt-1">
                                <span className="text-xs text-white/40">{course.id}</span>
                                <span className="text-xs text-white/40">👨‍🏫 {course.instructor}</span>
                                <span className="text-xs text-white/40">👥 {course.students} оюутан</span>
                                <span className="text-xs text-white/40">⏱️ {course.hours} цаг</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => alert(`${course.name} хичээлийн дэлгэрэнгүй мэдээлэл`)}
                              className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-white/70 hover:text-white"
                            >
                              Дэлгэрэнгүй
                            </button>
                            <button 
                              onClick={() => alert(`${course.name} хичээлийг засах`)}
                              className="rounded-lg border border-blue-400/30 bg-blue-500/15 px-3 py-1.5 text-xs font-medium text-blue-300 hover:bg-blue-500/25"
                            >
                              Засах
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* Add Major Modal */}
      {showAddMajorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md rounded-2xl border border-white/20 bg-[#081120] p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-white">Шинэ мэргэжил нэмэх</h2>
              <button
                onClick={() => setShowAddMajorModal(false)}
                className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5l10 10M15 5l-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Мэргэжлийн нэр *</label>
                <input
                  type="text"
                  placeholder="Жишээ: Digital Marketing"
                  value={newMajorName}
                  onChange={(e) => setNewMajorName(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/40"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Тайлбар</label>
                <textarea
                  placeholder="Мэргэжлийн товч тайлбар"
                  value={newMajorDesc}
                  onChange={(e) => setNewMajorDesc(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/40"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowAddMajorModal(false)}
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/70 hover:text-white"
                >
                  Цуцлах
                </button>
                <button
                  onClick={handleAddMajor}
                  className="flex-1 rounded-lg border border-emerald-400/30 bg-gradient-to-b from-emerald-500 to-emerald-700 px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
                >
                  Нэмэх
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md rounded-2xl border border-white/20 bg-[#081120] p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-white">Шинэ хичээл нэмэх</h2>
              <button
                onClick={() => setShowAddCourseModal(false)}
                className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5l10 10M15 5l-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Хичээлийн нэр *</label>
                <input
                  type="text"
                  placeholder="Жишээ: Social Media Marketing"
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/40"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Мэргэжил *</label>
                <select
                  value={newCourseMajor}
                  onChange={(e) => setNewCourseMajor(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400/40"
                >
                  <option value="">Мэргэжил сонгох</option>
                  {majors.map((major) => (
                    <option key={major.id} value={major.id}>{major.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Түвшин *</label>
                <select
                  value={newCourseLevel}
                  onChange={(e) => setNewCourseLevel(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400/40"
                >
                  <option value="">Түвшин сонгох</option>
                  <option value="Эхлэгч">Эхлэгч</option>
                  <option value="Дунд">Дунд</option>
                  <option value="Ахисан">Ахисан</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Нийт цаг *</label>
                <input
                  type="number"
                  placeholder="Жишээ: 120"
                  value={newCourseHours}
                  onChange={(e) => setNewCourseHours(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/40"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowAddCourseModal(false)}
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/70 hover:text-white"
                >
                  Цуцлах
                </button>
                <button
                  onClick={handleAddCourse}
                  className="flex-1 rounded-lg border border-emerald-400/30 bg-gradient-to-b from-emerald-500 to-emerald-700 px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
                >
                  Нэмэх
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
