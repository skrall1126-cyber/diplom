"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function GradesAdminPage() {
  const [activeMenu, setActiveMenu] = useState("Дүнгийн хуудас");
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

  const gradesData = [
    { 
      id: 1, 
      student: "Төртэмүүлэн", 
      department: "software",
      midterm: 85, 
      final: 92, 
      total: 89, 
      grade: "А",
      email: "tortemuulen@indra.edu.mn",
      phone: "99001122",
      studentId: "2026001",
      courses: [
        { name: "Python үндэс", quiz1: 8.5, quiz2: 9, attendance: 9.5, progress: 9, assignment: 27, exam: 28, total: 89, grade: "А" },
        { name: "JavaScript", quiz1: 8.8, quiz2: 9, attendance: 9, progress: 8.5, assignment: 28, exam: 29, total: 89, grade: "А" },
        { name: "Database Systems", quiz1: 8.2, quiz2: 8.6, attendance: 8.5, progress: 8, assignment: 25, exam: 26, total: 84, grade: "Б" },
      ]
    },
    { 
      id: 2, 
      student: "Э.Батжаргал", 
      department: "software",
      midterm: 78, 
      final: 85, 
      total: 82, 
      grade: "Б",
      email: "batjargal@indra.edu.mn",
      phone: "99112233",
      studentId: "2026002",
      courses: [
        { name: "Python үндэс", midterm: 78, final: 85, total: 82, grade: "Б" },
        { name: "JavaScript", midterm: 80, final: 84, total: 82, grade: "Б" },
        { name: "Database Systems", midterm: 75, final: 80, total: 78, grade: "Б" },
      ]
    },
    { 
      id: 3, 
      student: "Ц.Мөнхбат", 
      department: "network",
      midterm: 65, 
      final: 70, 
      total: 68, 
      grade: "В",
      email: "monkhbat@indra.edu.mn",
      phone: "99223344",
      studentId: "2026003",
      courses: [
        { name: "Python үндэс", midterm: 65, final: 70, total: 68, grade: "В" },
        { name: "Network Security", midterm: 70, final: 72, total: 71, grade: "В" },
        { name: "Linux Systems", midterm: 68, final: 70, total: 69, grade: "В" },
      ]
    },
    { 
      id: 4, 
      student: "Д.Сүхбат", 
      department: "network",
      midterm: 90, 
      final: 88, 
      total: 89, 
      grade: "А",
      email: "sukhbat@indra.edu.mn",
      phone: "99334455",
      studentId: "2026004",
      courses: [
        { name: "Python үндэс", midterm: 90, final: 88, total: 89, grade: "А" },
        { name: "Network Security", midterm: 92, final: 90, total: 91, grade: "А" },
        { name: "Linux Systems", midterm: 88, final: 86, total: 87, grade: "А" },
      ]
    },
    { 
      id: 5, 
      student: "Б.Ганбаяр", 
      department: "security",
      midterm: 72, 
      final: 75, 
      total: 74, 
      grade: "В",
      email: "ganbayar@indra.edu.mn",
      phone: "99445566",
      studentId: "2026005",
      courses: [
        { name: "Cybersecurity", midterm: 72, final: 75, total: 74, grade: "В" },
        { name: "Ethical Hacking", midterm: 70, final: 73, total: 72, grade: "В" },
        { name: "Cryptography", midterm: 68, final: 72, total: 70, grade: "В" },
      ]
    },
    { 
      id: 6, 
      student: "Н.Энхжаргал", 
      department: "information",
      midterm: 88, 
      final: 92, 
      total: 90, 
      grade: "А",
      email: "enkhjargal@indra.edu.mn",
      phone: "99556677",
      studentId: "2026006",
      courses: [
        { name: "Data Science", midterm: 88, final: 92, total: 90, grade: "А" },
        { name: "Machine Learning", midterm: 90, final: 94, total: 92, grade: "А" },
        { name: "Statistics", midterm: 85, final: 88, total: 87, grade: "А" },
      ]
    },
    { 
      id: 7, 
      student: "С.Болормаа", 
      department: "software",
      midterm: 45, 
      final: 50, 
      total: 48, 
      grade: "Д",
      email: "bolormaa@indra.edu.mn",
      phone: "99667788",
      studentId: "2026007",
      courses: [
        { name: "Python үндэс", midterm: 45, final: 50, total: 48, grade: "Д" },
        { name: "JavaScript", midterm: 50, final: 52, total: 51, grade: "Д" },
        { name: "Database Systems", midterm: 48, final: 55, total: 52, grade: "Д" },
      ]
    },
    { 
      id: 8, 
      student: "Г.Төмөрбаатар", 
      department: "security",
      midterm: 82, 
      final: 86, 
      total: 84, 
      grade: "Б",
      email: "tumorbaatar@indra.edu.mn",
      phone: "99778899",
      studentId: "2026008",
      courses: [
        { name: "Cybersecurity", midterm: 82, final: 86, total: 84, grade: "Б" },
        { name: "Ethical Hacking", midterm: 85, final: 88, total: 87, grade: "А" },
        { name: "Cryptography", midterm: 80, final: 82, total: 81, grade: "Б" },
      ]
    },
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "А": return "bg-emerald-500/10 text-emerald-400";
      case "Б": return "bg-blue-500/10 text-blue-400";
      case "В": return "bg-amber-500/10 text-amber-400";
      case "Г": return "bg-orange-500/10 text-orange-400";
      case "Д": return "bg-red-500/10 text-red-400";
      default: return "bg-gray-500/10 text-gray-400";
    }
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
              "linear-gradient(rgba(8, 14, 30, 0.9), rgba(8, 12, 24, 0.95)), url('/indra-bg.jpg')",
            backgroundPosition: "center center",
            backgroundSize: "72%",
          }}
        >
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Department Selection & Grades List */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="mb-6">
                <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">Тэнхимээр дүн харах</h2>
              </div>
              
              {/* Department Buttons */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                {departments.map((dept) => {
                  const deptStudents = gradesData.filter(g => g.department === dept.id);
                  const failedStudents = deptStudents.filter(s => s.courses.some((c: any) => c.total < 60));
                  const hasIssues = failedStudents.length > 0;
                  
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
                          <span className="text-xs font-bold text-white">{failedStudents.length}</span>
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
                          <span>Тэнцээгүй</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Grades Cards - Shows when department is selected */}
              {selectedDepartment && (
                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white">
                      {departments.find(d => d.id === selectedDepartment)?.name}
                    </h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {gradesData
                      .filter(item => item.department === selectedDepartment)
                      .map((item) => {
                        const failedCourses = item.courses.filter((c: any) => c.total < 60);
                        const hasFailed = failedCourses.length > 0;
                        
                        return (
                          <div 
                            key={item.id} 
                            className={`rounded-xl border p-5 ${
                              hasFailed 
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

                            {/* Grade Badge */}
                            <div className="mb-4">
                              <span className={`rounded-full border px-3 py-1 text-xs ${getGradeColor(item.grade)}`}>
                                Үнэлгээ: {item.grade}
                              </span>
                              {hasFailed && (
                                <div className="mt-2 flex items-center gap-1 text-xs text-red-400">
                                  <span>⚠️</span>
                                  <span>{failedCourses.length} хичээлд тэнцээгүй</span>
                                </div>
                              )}
                            </div>

                            {/* Grade Stats */}
                            <div className="space-y-3 mb-4">
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs text-white/50">Дундын шалгалт</span>
                                  <span className="text-sm font-bold text-blue-400">{item.midterm}</span>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs text-white/50">Эцсийн шалгалт</span>
                                  <span className="text-sm font-bold text-emerald-400">{item.final}</span>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs text-white/50">Нийт дүн</span>
                                  <span className="text-sm font-bold text-white">{item.total}</span>
                                </div>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${item.total >= 90 ? 'bg-emerald-500' : item.total >= 80 ? 'bg-blue-500' : item.total >= 70 ? 'bg-amber-500' : item.total >= 60 ? 'bg-orange-500' : 'bg-red-500'}`}
                                    style={{ width: `${item.total}%` }}
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
                    <span className="text-3xl">📊</span>
                  </div>
                  <p className="text-white/70">Тэнхим сонгоно уу</p>
                  <p className="text-sm text-white/50 mt-1">Тэнхимийн оюутнуудын дүн харагдана</p>
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

                {/* Grade Badge */}
                <div className="mb-6">
                  <span className={`rounded-full border px-4 py-2 text-sm ${getGradeColor(selectedStudent.grade)}`}>
                    Үнэлгээ: {selectedStudent.grade}
                  </span>
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

                {/* Grade Statistics - Table Format */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">Дүнгийн статистик</h3>
                    {/* Overall GPA */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-white/50">Нийт голч (GPA)</p>
                        <p className="text-2xl font-bold text-white">
                          {(selectedStudent.courses.reduce((sum: number, c: any) => sum + c.total, 0) / selectedStudent.courses.length / 25).toFixed(2)}
                        </p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center">
                        <span className={`text-lg font-bold text-white`}>
                          {selectedStudent.grade}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                          <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Хичээл</th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-white/70">Сорил 1</th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-white/70">Сорил 2</th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-white/70">Ирц</th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-white/70">Явц</th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-white/70">Бие даалт</th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-white/70">Шалгалт</th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-white/70">Нийт</th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-white/70">Үнэлгээ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedStudent.courses.map((course: any, index: number) => (
                          <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                            <td className="px-4 py-3">
                              <p className="text-sm font-medium text-white">{course.name}</p>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <p className="text-sm text-white/70">{course.quiz1}/10</p>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <p className="text-sm text-white/70">{course.quiz2}/10</p>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <p className="text-sm font-semibold text-emerald-400">{course.attendance}/10</p>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <p className="text-sm text-white/70">{course.progress}/10</p>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <p className="text-sm text-white/70">{course.assignment}/30</p>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <p className="text-sm font-semibold text-blue-400">{course.exam}/30</p>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <p className="text-sm font-bold text-white">{course.total}/100</p>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`rounded-full border px-3 py-1 text-xs ${getGradeColor(course.grade)}`}>
                                {course.grade}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t-2 border-white/20 bg-white/5">
                          <td className="px-4 py-3">
                            <p className="text-sm font-bold text-white">Голч</p>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <p className="text-sm font-bold text-white/70">
                              {(selectedStudent.courses.reduce((sum: number, c: any) => sum + c.quiz1, 0) / selectedStudent.courses.length).toFixed(1)}/10
                            </p>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <p className="text-sm font-bold text-white/70">
                              {(selectedStudent.courses.reduce((sum: number, c: any) => sum + c.quiz2, 0) / selectedStudent.courses.length).toFixed(1)}/10
                            </p>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <p className="text-sm font-bold text-emerald-400">
                              {(selectedStudent.courses.reduce((sum: number, c: any) => sum + c.attendance, 0) / selectedStudent.courses.length).toFixed(1)}/10
                            </p>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <p className="text-sm font-bold text-white/70">
                              {(selectedStudent.courses.reduce((sum: number, c: any) => sum + c.progress, 0) / selectedStudent.courses.length).toFixed(1)}/10
                            </p>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <p className="text-sm font-bold text-white/70">
                              {(selectedStudent.courses.reduce((sum: number, c: any) => sum + c.assignment, 0) / selectedStudent.courses.length).toFixed(1)}/30
                            </p>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <p className="text-sm font-bold text-blue-400">
                              {(selectedStudent.courses.reduce((sum: number, c: any) => sum + c.exam, 0) / selectedStudent.courses.length).toFixed(1)}/30
                            </p>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <p className="text-sm font-bold text-white">
                              {Math.round(selectedStudent.courses.reduce((sum: number, c: any) => sum + c.total, 0) / selectedStudent.courses.length)}/100
                            </p>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`rounded-full border px-3 py-1 text-xs ${getGradeColor(selectedStudent.grade)}`}>
                              {selectedStudent.grade}
                            </span>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => {
                      const failedCourses = selectedStudent.courses.filter((c: any) => c.total < 60);
                      if (failedCourses.length > 0) {
                        alert(`⚠️ Анхааруулга илгээх\n\n${selectedStudent.student} дараах хичээлд тэнцээгүй байна:\n\n${failedCourses.map((c: any) => `• ${c.name}: ${c.total}/100 (${c.grade})`).join('\n')}\n\nЧат хуудас руу шилжиж, мэдэгдэл илгээх боломжтой болно.`);
                      } else {
                        alert("✅ Энэ оюутан бүх хичээлд тэнцсэн байна.\n\nМэдэгдэл илгээх шаардлагагүй.");
                      }
                    }}
                    className="flex-1 rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-4 py-3 text-sm font-medium text-emerald-200 hover:bg-emerald-500/25"
                  >
                    💬 Дүнгийн мэдэгдэл илгээх
                  </button>
                  <button
                    onClick={() => alert("Дүн засах функц удахгүй нэмэгдэнэ.")}
                    className="flex-1 rounded-lg border border-blue-400/30 bg-blue-500/15 px-4 py-3 text-sm font-medium text-blue-200 hover:bg-blue-500/25"
                  >
                    Дүн засах
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