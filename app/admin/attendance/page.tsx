"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function AttendanceAdminPage() {
  const [activeMenu, setActiveMenu] = useState("Ирцийн бүртгэл");
  const [userType, setUserType] = useState<"admin" | "training" | "finance" | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

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

  const departments = [
    { id: "software", name: "Програм хангамж", icon: "💻", color: "from-blue-600 to-blue-800" },
    { id: "network", name: "Сүлжээний технологи", icon: "🌐", color: "from-emerald-600 to-emerald-800" },
    { id: "security", name: "Мэдээллийн аюулгүй байдал", icon: "🔒", color: "from-purple-600 to-purple-800" },
    { id: "information", name: "Мэдээлэл зүй", icon: "📊", color: "from-amber-600 to-amber-800" },
  ];

  const initialAttendanceData = [
    { 
      id: 1, 
      student: "Төртэмүүлэн", 
      department: "software", 
      totalHours: 180, 
      absentHours: 12, 
      status: "Идэвхтэй",
      email: "tortemuulen@indra.edu.mn",
      phone: "99001122",
      studentId: "2026001",
      warningsSent: 0
    },
    { 
      id: 2, 
      student: "Э.Батжаргал", 
      department: "software", 
      totalHours: 195, 
      absentHours: 5, 
      status: "Идэвхтэй",
      email: "batjargal@indra.edu.mn",
      phone: "99112233",
      studentId: "2026002",
      warningsSent: 0
    },
    { 
      id: 3, 
      student: "Ц.Мөнхбат", 
      department: "network", 
      totalHours: 150, 
      absentHours: 50, 
      status: "Идэвхтэй",
      email: "monkhbat@indra.edu.mn",
      phone: "99223344",
      studentId: "2026003",
      warningsSent: 0
    },
    { 
      id: 4, 
      student: "Д.Сүхбат", 
      department: "network", 
      totalHours: 190, 
      absentHours: 10, 
      status: "Идэвхтэй",
      email: "sukhbat@indra.edu.mn",
      phone: "99334455",
      studentId: "2026004",
      warningsSent: 0
    },
    { 
      id: 5, 
      student: "Б.Ганбаяр", 
      department: "security", 
      totalHours: 100, 
      absentHours: 220, 
      status: "Тасалсан",
      email: "ganbayar@indra.edu.mn",
      phone: "99445566",
      studentId: "2026005",
      warningsSent: 0
    },
    { 
      id: 6, 
      student: "Н.Энхжаргал", 
      department: "information", 
      totalHours: 185, 
      absentHours: 15, 
      status: "Идэвхтэй",
      email: "enkhjargal@indra.edu.mn",
      phone: "99556677",
      studentId: "2026006",
      warningsSent: 0
    },
    { 
      id: 7, 
      student: "С.Болормаа", 
      department: "software", 
      totalHours: 80, 
      absentHours: 205, 
      status: "Тасалсан",
      email: "bolormaa@indra.edu.mn",
      phone: "99667788",
      studentId: "2026007",
      warningsSent: 0
    },
    { 
      id: 8, 
      student: "Г.Төмөрбаатар", 
      department: "security", 
      totalHours: 175, 
      absentHours: 25, 
      status: "Идэвхтэй",
      email: "tumorbaatar@indra.edu.mn",
      phone: "99778899",
      studentId: "2026008",
      warningsSent: 0
    },
  ];

  const [students, setStudents] = useState(initialAttendanceData);

  const handleSendWarning = (studentId: number) => {
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === studentId 
          ? { ...student, warningsSent: student.warningsSent + 1 }
          : student
      )
    );
    setSelectedStudent((prev: any) => 
      prev && prev.id === studentId 
        ? { ...prev, warningsSent: prev.warningsSent + 1 }
        : prev
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Идэвхтэй": return "bg-emerald-500/10 text-emerald-400";
      case "Тасалсан": return "bg-red-500/10 text-red-400";
      default: return "bg-gray-500/10 text-gray-400";
    }
  };

  const getAttendanceRate = (totalHours: number, absentHours: number) => {
    const attendedHours = totalHours;
    const totalPossibleHours = totalHours + absentHours;
    return totalPossibleHours > 0 ? ((attendedHours / totalPossibleHours) * 100).toFixed(1) : "0.0";
  };

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
            backgroundSize: "cover",
          }}
        >
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Department Selection & Attendance List */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="mb-6">
                <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">Тэнхимээр ирц харах</h2>
              </div>
              
              {/* Department Buttons */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                {departments.map((dept) => {
                  const deptStudents = students.filter(a => a.department === dept.id);
                  // Сануулга аваагүй 200+ эсвэл сануулга авсан 400+ оюутнууд
                  const hasIssues = deptStudents.some(s => 
                    (s.absentHours >= 200 && s.warningsSent === 0) || 
                    (s.absentHours >= 400 && s.warningsSent > 0)
                  );
                  const issueCount = deptStudents.filter(s => 
                    (s.absentHours >= 200 && s.warningsSent === 0) || 
                    (s.absentHours >= 400 && s.warningsSent > 0)
                  ).length;
                  
                  return (
                    <button
                      key={dept.id}
                      onClick={() => setSelectedDepartment(dept.id)}
                      className={`rounded-xl border p-4 text-left transition-all relative ${
                        selectedDepartment === dept.id
                          ? "border-blue-400/50 bg-blue-500/20"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      {/* Issue Badge */}
                      {hasIssues && (
                        <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center border-2 border-[#081120]">
                          <span className="text-xs font-bold text-white">{issueCount}</span>
                        </div>
                      )}
                      
                      <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${dept.color} flex items-center justify-center mb-3`}>
                        <span className="text-2xl">{dept.icon}</span>
                      </div>
                      <h3 className="font-bold text-white mb-1">{dept.name}</h3>
                      <p className="text-sm text-white/50">
                        {deptStudents.length} оюутан
                      </p>
                      {hasIssues && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-red-400">
                          <span>⚠️</span>
                          <span>Ирцийн асуудалтай</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Attendance Cards - Shows when department is selected */}
              {selectedDepartment && (
                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white">
                      {departments.find(d => d.id === selectedDepartment)?.name}
                    </h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {students
                      .filter(item => item.department === selectedDepartment)
                      .map((item) => {
                        const attendanceRate = getAttendanceRate(item.totalHours, item.absentHours);
                        const isAbsentOver200 = item.absentHours >= 200;
                        const isAbsentOver400 = item.absentHours >= 400;
                        const hasWarning = item.warningsSent > 0;
                        // Сануулга авсан боловч 400+ цаг тасалсан бол улаан
                        const needsUrgentWarning = hasWarning && isAbsentOver400;
                        
                        return (
                          <div 
                            key={item.id} 
                            className={`rounded-xl border p-5 ${
                              needsUrgentWarning
                                ? 'border-red-400/30 bg-red-500/5'
                                : hasWarning && isAbsentOver200
                                ? 'border-amber-400/30 bg-amber-500/5'
                                : isAbsentOver200 
                                ? 'border-red-400/30 bg-red-500/5' 
                                : 'border-white/10 bg-white/5'
                            }`}
                          >
                            {/* Student Header */}
                            <div className="flex items-center gap-3 mb-4">
                              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                                <span className="text-lg font-semibold text-white">{item.student.charAt(0)}</span>
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-bold text-white">{item.student}</p>
                                <p className="text-xs text-white/50">ID: {item.studentId}</p>
                              </div>
                            </div>

                            {/* Status Badge */}
                            <div className="mb-4">
                              <span className={`rounded-full border px-3 py-1 text-xs ${getStatusColor(item.status)}`}>
                                {item.status}
                              </span>
                              {isAbsentOver200 && !hasWarning && (
                                <div className="mt-2 flex items-center gap-1 text-xs text-red-400">
                                  <span>⚠️</span>
                                  <span>200+ цаг тасалсан</span>
                                </div>
                              )}
                              {needsUrgentWarning && (
                                <div className="mt-2 flex items-center gap-1 text-xs text-red-400">
                                  <span>🚨</span>
                                  <span>400+ цаг! Дахин сануулах</span>
                                </div>
                              )}
                              {hasWarning && isAbsentOver200 && !needsUrgentWarning && (
                                <div className="mt-2 flex items-center gap-1 text-xs text-amber-400">
                                  <span>📩</span>
                                  <span>Сануулга илгээсэн ({item.warningsSent})</span>
                                </div>
                              )}
                            </div>

                            {/* Attendance Stats */}
                            <div className="space-y-3 mb-4">
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs text-white/50">Нийт ирсэн цаг</span>
                                  <span className="text-sm font-bold text-emerald-400">{item.totalHours} цаг</span>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs text-white/50">Тасалсан цаг</span>
                                  <span className={`text-sm font-bold ${isAbsentOver200 ? 'text-red-400' : 'text-amber-400'}`}>
                                    {item.absentHours} цаг
                                  </span>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs text-white/50">Ирцийн хувь</span>
                                  <span className="text-sm font-bold text-white">{attendanceRate}%</span>
                                </div>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${parseFloat(attendanceRate) >= 80 ? 'bg-emerald-500' : parseFloat(attendanceRate) >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                                    style={{ width: `${attendanceRate}%` }}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Action Button */}
                            <button
                              onClick={() => {
                                setSelectedStudent(item);
                                setShowDetailModal(true);
                              }}
                              className="w-full rounded-lg border border-blue-400/30 bg-blue-500/15 px-4 py-2 text-sm font-medium text-blue-200 hover:bg-blue-500/25"
                            >
                              Дэлгэрэнгүй
                            </button>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Message when no department selected */}
              {!selectedDepartment && (
                <div className="text-center py-12">
                  <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">📋</span>
                  </div>
                  <p className="text-white/70">Тэнхим сонгоно уу</p>
                  <p className="text-sm text-white/50 mt-1">Тэнхимийн оюутнуудын ирц харагдана</p>
                </div>
              )}
            </div>
          </div>

          {/* Student Detail Modal */}
          {showDetailModal && selectedStudent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[24px] border border-white/10 bg-[#0a1628] p-6">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{selectedStudent.student.charAt(0)}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedStudent.student}</h2>
                      <p className="text-sm text-white/50">Оюутны ID: {selectedStudent.studentId}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      setSelectedStudent(null);
                    }}
                    className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                {/* Status Badge */}
                <div className="mb-6">
                  <span className={`rounded-full border px-4 py-2 text-sm ${getStatusColor(selectedStudent.status)}`}>
                    {selectedStudent.status}
                  </span>
                  {selectedStudent.absentHours >= 200 && (
                    <span className="ml-3 rounded-full border border-red-400/30 bg-red-500/15 px-4 py-2 text-sm text-red-400">
                      ⚠️ 200+ цаг тасалсан
                    </span>
                  )}
                </div>

                {/* Contact Information */}
                <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70 mb-4">Холбоо барих мэдээлэл</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-xs text-white/50 mb-1">Имэйл</p>
                      <p className="text-sm text-white">{selectedStudent.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50 mb-1">Утас</p>
                      <p className="text-sm text-white">{selectedStudent.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Department Information */}
                <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70 mb-4">Сургалтын мэдээлэл</h3>
                  <div>
                    <p className="text-xs text-white/50 mb-1">Тэнхим</p>
                    <p className="text-sm text-white">
                      {departments.find(d => d.id === selectedStudent.department)?.name}
                    </p>
                  </div>
                </div>

                {/* Attendance Statistics */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70 mb-4">Ирцийн статистик</h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <p className="text-xs text-white/50 mb-1">Нийт ирсэн цаг</p>
                      <p className="text-2xl font-bold text-emerald-400">{selectedStudent.totalHours}</p>
                      <p className="text-xs text-white/50 mt-1">цаг</p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <p className="text-xs text-white/50 mb-1">Тасалсан цаг</p>
                      <p className={`text-2xl font-bold ${selectedStudent.absentHours >= 200 ? 'text-red-400' : 'text-amber-400'}`}>
                        {selectedStudent.absentHours}
                      </p>
                      <p className="text-xs text-white/50 mt-1">цаг</p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <p className="text-xs text-white/50 mb-1">Ирцийн хувь</p>
                      <p className="text-2xl font-bold text-blue-400">
                        {getAttendanceRate(selectedStudent.totalHours, selectedStudent.absentHours)}%
                      </p>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-2">
                        <div 
                          className={`h-full ${parseFloat(getAttendanceRate(selectedStudent.totalHours, selectedStudent.absentHours)) >= 80 ? 'bg-emerald-500' : parseFloat(getAttendanceRate(selectedStudent.totalHours, selectedStudent.absentHours)) >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${getAttendanceRate(selectedStudent.totalHours, selectedStudent.absentHours)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => {
                      handleSendWarning(selectedStudent.id);
                      alert("Чат хуудас руу шилжиж, сануулга илгээх боломжтой болно.");
                      setShowDetailModal(false);
                      setSelectedStudent(null);
                    }}
                    className="flex-1 rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-4 py-3 text-sm font-medium text-emerald-200 hover:bg-emerald-500/25"
                  >
                    💬 Сануулга илгээх
                  </button>
                  <button
                    onClick={() => alert("Ирц засах функц удахгүй нэмэгдэнэ.")}
                    className="flex-1 rounded-lg border border-blue-400/30 bg-blue-500/15 px-4 py-3 text-sm font-medium text-blue-200 hover:bg-blue-500/25"
                  >
                    Ирц засах
                  </button>
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      setSelectedStudent(null);
                    }}
                    className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm text-white/70 hover:text-white"
                  >
                    Хаах
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}