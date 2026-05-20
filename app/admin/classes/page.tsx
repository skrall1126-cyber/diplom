"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function ClassesAdminPage() {
  const [activeMenu, setActiveMenu] = useState("Анги / Бүлэг");
  const [userType, setUserType] = useState<"admin" | "training" | "finance" | null>(null);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [newClass, setNewClass] = useState({
    name: "",
    code: "",
    year: "",
    teacher: "",
    room: ""
  });
  const [showQuickActionModal, setShowQuickActionModal] = useState(false);
  const [selectedQuickAction, setSelectedQuickAction] = useState<string | null>(null);
  const [showClassDetailModal, setShowClassDetailModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [showEditClassModal, setShowEditClassModal] = useState(false);
  const [editClassData, setEditClassData] = useState({
    name: "",
    code: "",
    year: "",
    teacher: "",
    room: ""
  });

  // All students (not assigned to any class yet)
  const allStudents = [
    { id: 1, name: "Л.Лхагва", code: "B211930010", gpa: "3.4", status: "Идэвхтэй", hasClass: false },
    { id: 2, name: "Н.Нарантуяа", code: "B211930011", gpa: "3.8", status: "Идэвхтэй", hasClass: false },
    { id: 3, name: "О.Отгонбаяр", code: "B211930012", gpa: "3.6", status: "Идэвхтэй", hasClass: false },
    { id: 4, name: "П.Пүрэвсүрэн", code: "B211930013", gpa: "3.9", status: "Идэвхтэй", hasClass: false },
    { id: 5, name: "Р.Ринчин", code: "B211930014", gpa: "3.5", status: "Идэвхтэй", hasClass: false },
    { id: 6, name: "С.Сайнбаяр", code: "B211930015", gpa: "3.7", status: "Идэвхтэй", hasClass: false },
    { id: 7, name: "Т.Төмөр", code: "B211930016", gpa: "3.3", status: "Идэвхтэй", hasClass: false },
    { id: 8, name: "У.Ууганбаяр", code: "B211930017", gpa: "3.8", status: "Идэвхтэй", hasClass: false },
    { id: 9, name: "Ф.Фүжин", code: "B211930018", gpa: "3.6", status: "Идэвхтэй", hasClass: false },
    { id: 10, name: "Х.Хулан", code: "B211930019", gpa: "3.4", status: "Идэвхтэй", hasClass: false },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedType = localStorage.getItem("userType") as "admin" | "training" | "finance" | null;
      setUserType(savedType);
      
      // Set user type if not set (default to admin)
      if (!savedType) {
        localStorage.setItem("userType", "admin");
        setUserType("admin");
      }
    }
  }, []);

  const getBackLink = () => {
    if (userType === "training") return "/admin/training-dashboard";
    if (userType === "finance") return "/admin/finance-dashboard";
    return "/admin/dashboard";
  };

  const getAdminTitle = () => {
    if (userType === "training") return "Сургалтын админ";
    if (userType === "finance") return "Санхүүгийн админ";
    return "Бүрэн эрхт админ";
  };

  const classes = [
    { id: 1, name: "Програм хангамж 1-р анги", code: "PSW-101", year: "1", students: 45, teacher: "Б.Ганбат", room: "301" },
    { id: 2, name: "Сүлжээний технологи 2-р анги", code: "NET-201", year: "2", students: 38, teacher: "Ц.Энхтуяа", room: "302" },
    { id: 3, name: "Мэдээллийн аюулгүй байдал 3-р анги", code: "CS-301", year: "3", students: 32, teacher: "Д.Батжаргал", room: "303" },
    { id: 4, name: "Мэдээлэл зүй 4-р анги", code: "IS-401", year: "4", students: 28, teacher: "Э.Түмэн", room: "304" },
    { id: 5, name: "Дижитал маркетинг 2-р анги", code: "DM-201", year: "2", students: 36, teacher: "Х.Сүхбат", room: "305" },
    { id: 6, name: "Системийн инженеринг 3-р анги", code: "SE-301", year: "3", students: 30, teacher: "Л.Эрдэнэ", room: "306" },
  ];

  return (
    <div className="min-h-screen font-sans text-white">
      <Navbar />
      <div className="flex">
        <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
        <main
          className="flex-1 overflow-y-auto bg-no-repeat px-4 py-5 md:px-6 md:py-6"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8, 14, 30, 0.75), rgba(8, 12, 24, 0.8)), url('/indra-bg.jpg')",
            backgroundPosition: "center center",
            backgroundAttachment: "scroll",
            backgroundSize: "72%",
          }}
        >
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Stats */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Нийт анги", value: classes.length, icon: "🏫", color: "bg-blue-500" },
                { label: "Нийт оюутан", value: classes.reduce((sum, cls) => sum + cls.students, 0), icon: "👨‍🎓", color: "bg-emerald-500" },
                { label: "Нийт багш", value: new Set(classes.map(cls => cls.teacher)).size, icon: "👨‍🏫", color: "bg-amber-500" },
                { label: "Дундаж оюутан", value: Math.round(classes.reduce((sum, cls) => sum + cls.students, 0) / classes.length), icon: "📊", color: "bg-purple-500" },
              ].map((stat, index) => (
                <div key={index} className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
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

            {/* Classes List */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">Ангиудын жагсаалт</h2>
                <button 
                  onClick={() => setShowAddClassModal(true)}
                  className="rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-500/25"
                >
                  Шинэ анги нэмэх
                </button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {classes.map(cls => (
                  <div key={cls.id} className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">{cls.code.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{cls.name}</p>
                          <p className="text-xs text-white/50">{cls.code}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/50">Оюутнууд:</span>
                        <span className="text-xs text-white/80">{cls.students} хүн</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/50">Багш:</span>
                        <span className="text-xs text-white/80">{cls.teacher}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/50">Өрөө:</span>
                        <span className="text-xs text-white/80">{cls.room}</span>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-3 mb-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white/40">
                            <path d="M2 2h8v8H2V2z" stroke="currentColor" strokeWidth="1" />
                            <path d="M4 1v2M8 1v2M2 4h8" stroke="currentColor" strokeWidth="1" />
                          </svg>
                          <span className="text-xs text-white/60">Багш: {cls.teacher}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white/40">
                            <path d="M2 2h8v8H2V2z" stroke="currentColor" strokeWidth="1" />
                          </svg>
                          <span className="text-xs text-white/60">Өрөө: {cls.room}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => {
                        setSelectedClass(cls);
                        setShowClassDetailModal(true);
                      }}
                      className="w-full rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-3 py-2.5 text-sm font-medium text-emerald-300 hover:bg-emerald-500/25 transition-colors"
                    >
                      Дэлгэрэнгүй
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Class Modal */}
      {showAddClassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0a1628] shadow-2xl">
            {/* Modal Header */}
            <div className="relative overflow-hidden rounded-t-2xl border-b border-white/10 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 px-6 py-5">
              <div className="relative z-10">
                <h2 className="text-xl font-bold text-white">Шинэ анги нэмэх</h2>
                <p className="mt-1 text-sm text-white/70">Ангийн мэдээллийг оруулна уу</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Class Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Ангийн нэр <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={newClass.name}
                  onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                  placeholder="Жишээ: Програм хангамж 1-р анги"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                />
              </div>

              {/* Class Code */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Ангийн код <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={newClass.code}
                  onChange={(e) => setNewClass({ ...newClass, code: e.target.value })}
                  placeholder="Жишээ: PSW-101"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                />
              </div>

              {/* Year/Course */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Нийт оюутны тоо <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  value={newClass.year}
                  onChange={(e) => setNewClass({ ...newClass, year: e.target.value })}
                  placeholder="Жишээ: 45"
                  min="1"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                />
              </div>

              {/* Teacher */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Багш <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={newClass.teacher}
                  onChange={(e) => setNewClass({ ...newClass, teacher: e.target.value })}
                  placeholder="Жишээ: Б.Ганбат"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                />
              </div>

              {/* Room */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Өрөө <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={newClass.room}
                  onChange={(e) => setNewClass({ ...newClass, room: e.target.value })}
                  placeholder="Жишээ: 301"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 border-t border-white/10 bg-white/5 px-6 py-4 rounded-b-2xl">
              <button
                onClick={() => {
                  setShowAddClassModal(false);
                  setNewClass({ name: "", code: "", year: "", teacher: "", room: "" });
                }}
                className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/20 hover:text-white transition-all"
              >
                Болих
              </button>
              <button
                onClick={() => {
                  if (!newClass.name || !newClass.code || !newClass.year || !newClass.teacher || !newClass.room) {
                    alert("Бүх талбарыг бөглөнө үү!");
                    return;
                  }
                  alert(`Шинэ анги нэмэгдлээ:\n\nНэр: ${newClass.name}\nКод: ${newClass.code}\nНийт оюутан: ${newClass.year}\nБагш: ${newClass.teacher}\nӨрөө: ${newClass.room}`);
                  setShowAddClassModal(false);
                  setNewClass({ name: "", code: "", year: "", teacher: "", room: "" });
                }}
                className="flex-1 rounded-lg border border-emerald-400/40 bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/20"
              >
                Нэмэх
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Class Detail Modal */}
      {showClassDetailModal && selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-4xl rounded-2xl border border-white/10 bg-[#0a1628] shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 relative overflow-hidden rounded-t-2xl border-b border-white/10 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 px-6 py-5">
              <div className="relative z-10">
                <h2 className="text-xl font-bold text-white">{selectedClass.name}</h2>
                <p className="mt-1 text-sm text-white/70">Ангийн дэлгэрэнгүй мэдээлэл</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Class Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-white/50 mb-1">Ангийн код</p>
                  <p className="text-lg font-semibold text-white">{selectedClass.code}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-white/50 mb-1">Анги</p>
                  <p className="text-lg font-semibold text-white">{selectedClass.year}-р анги</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-white/50 mb-1">Багш</p>
                  <p className="text-lg font-semibold text-white">{selectedClass.teacher}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-white/50 mb-1">Өрөө</p>
                  <p className="text-lg font-semibold text-white">{selectedClass.room}</p>
                </div>
              </div>

              {/* Students Section */}
              <div className="rounded-lg border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Оюутнуудын жагсаалт</h3>
                    <p className="text-sm text-white/50">Нийт {selectedClass.students} оюутан</p>
                  </div>
                  <button 
                    onClick={() => setShowAddStudentModal(true)}
                    className="rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-500/25"
                  >
                    + Оюутан нэмэх
                  </button>
                </div>

                {/* Students List */}
                <div className="space-y-3">
                  {[
                    { name: "Б.Болд", code: "B211930001", gpa: "3.8", status: "Идэвхтэй" },
                    { name: "Д.Дорж", code: "B211930002", gpa: "3.5", status: "Идэвхтэй" },
                    { name: "Г.Ганбат", code: "B211930003", gpa: "3.9", status: "Идэвхтэй" },
                    { name: "Э.Энхтуяа", code: "B211930004", gpa: "3.7", status: "Идэвхтэй" },
                    { name: "Ц.Цэцэг", code: "B211930005", gpa: "3.6", status: "Идэвхтэй" },
                  ].map((student, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">{student.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{student.name}</p>
                          <p className="text-xs text-white/50">{student.code}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xs text-white/50">Дундаж дүн</p>
                          <p className="text-sm font-semibold text-emerald-400">{student.gpa}</p>
                        </div>
                        <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                          {student.status}
                        </span>
                        <button 
                          onClick={() => alert(`${student.name}-ийн дэлгэрэнгүй мэдээлэл харах функц удахгүй нэмэгдэнэ.`)}
                          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:text-white"
                        >
                          Харах
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 flex gap-3 border-t border-white/10 bg-[#0a1628] px-6 py-4 rounded-b-2xl">
              <button
                onClick={() => {
                  setShowClassDetailModal(false);
                  setSelectedClass(null);
                }}
                className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/20 hover:text-white transition-all"
              >
                Хаах
              </button>
              <button
                onClick={() => {
                  if (selectedClass) {
                    setEditClassData({
                      name: selectedClass.name,
                      code: selectedClass.code,
                      year: selectedClass.year,
                      teacher: selectedClass.teacher,
                      room: selectedClass.room
                    });
                    setShowEditClassModal(true);
                    setShowClassDetailModal(false);
                  }
                }}
                className="flex-1 rounded-lg border border-blue-400/40 bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-blue-500/20"
              >
                Ангийн мэдээлэл засах
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Class Modal */}
      {showEditClassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0a1628] shadow-2xl">
            {/* Modal Header */}
            <div className="relative overflow-hidden rounded-t-2xl border-b border-white/10 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 px-6 py-5">
              <div className="relative z-10">
                <h2 className="text-xl font-bold text-white">Ангийн мэдээлэл засах</h2>
                <p className="mt-1 text-sm text-white/70">Ангийн мэдээллийг шинэчлэх</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Class Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Ангийн нэр <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={editClassData.name}
                  onChange={(e) => setEditClassData({ ...editClassData, name: e.target.value })}
                  placeholder="Жишээ: Програм хангамж 1-р анги"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                />
              </div>

              {/* Class Code */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Ангийн код <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={editClassData.code}
                  onChange={(e) => setEditClassData({ ...editClassData, code: e.target.value })}
                  placeholder="Жишээ: PSW-101"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                />
              </div>

              {/* Year/Course */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Анги <span className="text-red-400">*</span>
                </label>
                <select
                  value={editClassData.year}
                  onChange={(e) => setEditClassData({ ...editClassData, year: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                >
                  <option value="" className="bg-[#0a1628]">Анги сонгох</option>
                  <option value="1" className="bg-[#0a1628]">1-р анги</option>
                  <option value="2" className="bg-[#0a1628]">2-р анги</option>
                  <option value="3" className="bg-[#0a1628]">3-р анги</option>
                  <option value="4" className="bg-[#0a1628]">4-р анги</option>
                </select>
              </div>

              {/* Teacher */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Багш <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={editClassData.teacher}
                  onChange={(e) => setEditClassData({ ...editClassData, teacher: e.target.value })}
                  placeholder="Жишээ: Б.Ганбат"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                />
              </div>

              {/* Room */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Өрөө <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={editClassData.room}
                  onChange={(e) => setEditClassData({ ...editClassData, room: e.target.value })}
                  placeholder="Жишээ: 301"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 border-t border-white/10 bg-white/5 px-6 py-4 rounded-b-2xl">
              <button
                onClick={() => {
                  setShowEditClassModal(false);
                  setEditClassData({ name: "", code: "", year: "", teacher: "", room: "" });
                }}
                className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/20 hover:text-white transition-all"
              >
                Болих
              </button>
              <button
                onClick={() => {
                  if (!editClassData.name || !editClassData.code || !editClassData.year || !editClassData.teacher || !editClassData.room) {
                    alert("Бүх талбарыг бөглөнө үү!");
                    return;
                  }
                  alert(`Ангийн мэдээлэл шинэчлэгдлээ:\n\nНэр: ${editClassData.name}\nКод: ${editClassData.code}\nАнги: ${editClassData.year}\nБагш: ${editClassData.teacher}\nӨрөө: ${editClassData.room}`);
                  setShowEditClassModal(false);
                  setEditClassData({ name: "", code: "", year: "", teacher: "", room: "" });
                }}
                className="flex-1 rounded-lg border border-blue-400/40 bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-blue-500/20"
              >
                Хадгалах
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Student to Class Modal */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-[#0a1628] shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 relative overflow-hidden rounded-t-2xl border-b border-white/10 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 px-6 py-5">
              <div className="relative z-10">
                <h2 className="text-xl font-bold text-white">Оюутан нэмэх</h2>
                <p className="mt-1 text-sm text-white/70">
                  Ангид нэмэх оюутнуудыг сонгоно уу ({selectedStudents.length} сонгогдсон)
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Select All */}
              <div className="mb-4 flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedStudents.length === allStudents.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedStudents(allStudents.map(s => s.id));
                      } else {
                        setSelectedStudents([]);
                      }
                    }}
                    className="h-5 w-5 rounded border-white/20 bg-white/10 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-white">Бүгдийг сонгох</span>
                </label>
                <span className="text-sm text-white/50">
                  {allStudents.length} оюутан байна
                </span>
              </div>

              {/* Students List */}
              <div className="space-y-3">
                {allStudents.map((student) => (
                  <label
                    key={student.id}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedStudents([...selectedStudents, student.id]);
                          } else {
                            setSelectedStudents(selectedStudents.filter(id => id !== student.id));
                          }
                        }}
                        className="h-5 w-5 rounded border-white/20 bg-white/10 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                        <span className="text-sm font-semibold text-white">{student.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{student.name}</p>
                        <p className="text-xs text-white/50">{student.code}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-white/50">Дундаж дүн</p>
                        <p className="text-sm font-semibold text-emerald-400">{student.gpa}</p>
                      </div>
                      <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                        {student.status}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 flex gap-3 border-t border-white/10 bg-[#0a1628] px-6 py-4 rounded-b-2xl">
              <button
                onClick={() => {
                  setShowAddStudentModal(false);
                  setSelectedStudents([]);
                }}
                className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/20 hover:text-white transition-all"
              >
                Болих
              </button>
              <button
                onClick={() => {
                  if (selectedStudents.length === 0) {
                    alert("Оюутан сонгоно уу!");
                    return;
                  }
                  alert(`${selectedStudents.length} оюутан амжилттай нэмэгдлээ!`);
                  setShowAddStudentModal(false);
                  setSelectedStudents([]);
                }}
                disabled={selectedStudents.length === 0}
                className="flex-1 rounded-lg border border-emerald-400/40 bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Нэмэх ({selectedStudents.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Action Modal */}
      {showQuickActionModal && selectedQuickAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0a1628] shadow-2xl">
            {/* Modal Header */}
            <div className="relative overflow-hidden rounded-t-2xl border-b border-white/10 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 px-6 py-5">
              <div className="relative z-10">
                <h2 className="text-xl font-bold text-white">{selectedQuickAction}</h2>
                <p className="mt-1 text-sm text-white/70">
                  {selectedQuickAction === "Ангийн хуваарь" && "Ангийн хуваарь үүсгэх"}
                  {selectedQuickAction === "Оюутны бүртгэл" && "Шинэ оюутан бүртгэх"}
                  {selectedQuickAction === "Багшийн хуваарилалт" && "Багшийн хуваарилалт засах"}
                  {selectedQuickAction === "Өрөөний хуваарь" && "Өрөөний хуваарь харах"}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {selectedQuickAction === "Ангийн хуваарь" && (
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/80">
                      Анги сонгох <span className="text-red-400">*</span>
                    </label>
                    <select className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20">
                      <option value="" className="bg-[#0a1628]">Анги сонгох</option>
                      {classes.map(cls => (
                        <option key={cls.id} value={cls.id} className="bg-[#0a1628]">{cls.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/80">
                      Хичээлийн өдөр <span className="text-red-400">*</span>
                    </label>
                    <select className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20">
                      <option value="" className="bg-[#0a1628]">Өдөр сонгох</option>
                      <option value="monday" className="bg-[#0a1628]">Даваа</option>
                      <option value="tuesday" className="bg-[#0a1628]">Мягмар</option>
                      <option value="wednesday" className="bg-[#0a1628]">Лхагва</option>
                      <option value="thursday" className="bg-[#0a1628]">Пүрэв</option>
                      <option value="friday" className="bg-[#0a1628]">Баасан</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/80">
                      Цаг <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="time"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                    />
                  </div>
                </div>
              )}

              {selectedQuickAction === "Оюутны бүртгэл" && (
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/80">
                      Оюутны нэр <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Жишээ: Б.Болд"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/80">
                      Оюутны код <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Жишээ: B211930019"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/80">
                      Анги сонгох <span className="text-red-400">*</span>
                    </label>
                    <select className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20">
                      <option value="" className="bg-[#0a1628]">Анги сонгох</option>
                      {classes.map(cls => (
                        <option key={cls.id} value={cls.id} className="bg-[#0a1628]">{cls.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {selectedQuickAction === "Багшийн хуваарилалт" && (
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/80">
                      Багш сонгох <span className="text-red-400">*</span>
                    </label>
                    <select className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20">
                      <option value="" className="bg-[#0a1628]">Багш сонгох</option>
                      {Array.from(new Set(classes.map(cls => cls.teacher))).map((teacher, idx) => (
                        <option key={idx} value={teacher} className="bg-[#0a1628]">{teacher}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/80">
                      Анги сонгох <span className="text-red-400">*</span>
                    </label>
                    <select className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20">
                      <option value="" className="bg-[#0a1628]">Анги сонгох</option>
                      {classes.map(cls => (
                        <option key={cls.id} value={cls.id} className="bg-[#0a1628]">{cls.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/80">
                      Хичээл <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Жишээ: Програмчлалын үндэс"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                    />
                  </div>
                </div>
              )}

              {selectedQuickAction === "Өрөөний хуваарь" && (
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/80">
                      Өрөө сонгох <span className="text-red-400">*</span>
                    </label>
                    <select className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20">
                      <option value="" className="bg-[#0a1628]">Өрөө сонгох</option>
                      {Array.from(new Set(classes.map(cls => cls.room))).sort().map((room, idx) => (
                        <option key={idx} value={room} className="bg-[#0a1628]">Өрөө {room}</option>
                      ))}
                    </select>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <h3 className="text-sm font-medium text-white mb-3">Өрөөний мэдээлэл</h3>
                    <div className="space-y-2 text-sm text-white/70">
                      <p>• Суудлын тоо: 40</p>
                      <p>• Төхөөрөмж: Проектор, Самбар</p>
                      <p>• Төлөв: Идэвхтэй</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 border-t border-white/10 bg-white/5 px-6 py-4 rounded-b-2xl">
              <button
                onClick={() => {
                  setShowQuickActionModal(false);
                  setSelectedQuickAction(null);
                }}
                className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/20 hover:text-white transition-all"
              >
                Болих
              </button>
              <button
                onClick={() => {
                  alert(`${selectedQuickAction} үйлдэл амжилттай хадгалагдлаа!`);
                  setShowQuickActionModal(false);
                  setSelectedQuickAction(null);
                }}
                className="flex-1 rounded-lg border border-emerald-400/40 bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/20"
              >
                Хадгалах
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}