"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const courses = [
  { id: "python-basics", name: "Python үндэс", color: "border-blue-400/30 bg-blue-500/15" },
  { id: "javascript", name: "JavaScript", color: "border-amber-400/30 bg-amber-500/15" },
  { id: "networking", name: "Networking", color: "border-emerald-400/30 bg-emerald-500/15" },
  { id: "database", name: "Database", color: "border-orange-400/30 bg-orange-500/15" },
];

const studentGrades = [
  { id: "B211930001", name: "Бат-Эрдэнэ", course: "Python үндэс", assignments: [85, 90, 78, 92, 88], exam: 87, final: 86 },
  { id: "B211930002", name: "Ганбат", course: "Python үндэс", assignments: [72, 68, 75, 80, 70], exam: 74, final: 73 },
  { id: "B211930003", name: "Дорж", course: "JavaScript", assignments: [88, 92, 85, 90, 87], exam: 89, final: 88 },
  { id: "B211930004", name: "Энхбаяр", course: "JavaScript", assignments: [95, 98, 92, 96, 94], exam: 97, final: 96 },
  { id: "B211930005", name: "Нараа", course: "Networking", assignments: [92, 94, 90, 95, 93], exam: 94, final: 93 },
  { id: "B211930006", name: "Сүхбаатар", course: "Networking", assignments: [85, 88, 82, 87, 84], exam: 86, final: 85 },
  { id: "B211930007", name: "Түвшин", course: "Database", assignments: [78, 82, 75, 80, 77], exam: 79, final: 78 },
  { id: "B211930008", name: "Уянга", course: "Database", assignments: [90, 92, 88, 94, 91], exam: 93, final: 92 },
];

const assignmentTypes = [
  { id: 1, name: "Даалгавар 1", weight: 10 },
  { id: 2, name: "Даалгавар 2", weight: 10 },
  { id: 3, name: "Даалгавар 3", weight: 15 },
  { id: 4, name: "Даалгавар 4", weight: 15 },
  { id: 5, name: "Даалгавар 5", weight: 20 },
  { id: 6, name: "Шалгалт", weight: 30 },
];

export default function TeacherGradesPage() {
  const [activeMenu, setActiveMenu] = useState("Дүнгийн жагсаалт");
  const [selectedCourse, setSelectedCourse] = useState("python-basics");
  const [view, setView] = useState<"students" | "assignments" | "exams">("students");
  const [editingGrade, setEditingGrade] = useState<{studentId: string, assignmentIndex: number} | null>(null);
  const [gradeValue, setGradeValue] = useState("");
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<{studentId: string, studentName: string, assignment: string} | null>(null);
  const [submissionReview, setSubmissionReview] = useState({
    grade: "",
    feedback: "",
    status: "pending"
  });

  const selectedCourseData = courses.find(c => c.id === selectedCourse);
  const filteredStudents = studentGrades.filter(s => 
    s.course === courses.find(c => c.id === selectedCourse)?.name
  );

  const calculateAverage = (assignments: number[], exam: number) => {
    const assignmentAvg = assignments.reduce((sum, grade) => sum + grade, 0) / assignments.length;
    return Math.round((assignmentAvg * 0.7) + (exam * 0.3));
  };

  const handleEditGrade = (studentId: string, assignmentIndex: number, currentGrade: number) => {
    setEditingGrade({ studentId, assignmentIndex });
    setGradeValue(currentGrade.toString());
  };

  const handleSaveGrade = () => {
    if (editingGrade && gradeValue) {
      const gradeNum = parseInt(gradeValue);
      if (!isNaN(gradeNum) && gradeNum >= 0 && gradeNum <= 100) {
        alert(`${editingGrade.studentId} оюутны дүн ${gradeNum} болж шинэчлэгдлээ.`);
        setEditingGrade(null);
        setGradeValue("");
      } else {
        alert("Дүн 0-100 хооронд байх ёстой.");
      }
    }
  };

  const handleExportGrades = () => {
    // Create CSV content
    const headers = ["Оюутны код", "Нэр", "Даалгавар 1", "Даалгавар 2", "Даалгавар 3", "Даалгавар 4", "Даалгавар 5", "Шалгалт", "Дундаж"];
    const rows = filteredStudents.map(student => {
      const avg = calculateAverage(student.assignments, student.exam);
      return [
        student.id,
        student.name,
        ...student.assignments,
        student.exam,
        avg
      ].join(",");
    });
    
    const csvContent = [headers.join(","), ...rows].join("\n");
    
    // Add BOM for UTF-8 encoding (for Excel compatibility)
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
    
    // Create download link
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${selectedCourseData?.name}_Дүнгийн_жагсаалт_${new Date().toISOString().split('T')[0]}.csv`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadSubmissions = () => {
    // Create a text file with submission list
    const content = filteredStudents.map(student => {
      return `${student.id} - ${student.name}\n` +
             `  Даалгавар 1: ${student.assignments[0]} оноо\n` +
             `  Даалгавар 2: ${student.assignments[1]} оноо\n` +
             `  Даалгавар 3: ${student.assignments[2]} оноо\n` +
             `  Даалгавар 4: ${student.assignments[3]} оноо\n` +
             `  Даалгавар 5: ${student.assignments[4]} оноо\n` +
             `  Шалгалт: ${student.exam} оноо\n` +
             `  Дундаж: ${calculateAverage(student.assignments, student.exam)} оноо\n\n`;
    }).join("");
    
    const header = `${selectedCourseData?.name} - Оюутны ирүүлсэн даалгаврын жагсаалт\n` +
                   `Огноо: ${new Date().toLocaleDateString('mn-MN')}\n` +
                   `Нийт оюутан: ${filteredStudents.length}\n\n` +
                   `${'='.repeat(60)}\n\n`;
    
    const fullContent = header + content;
    
    // Add BOM for UTF-8 encoding
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + fullContent], { type: "text/plain;charset=utf-8;" });
    
    // Create download link
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${selectedCourseData?.name}_Даалгаврын_жагсаалт_${new Date().toISOString().split('T')[0]}.txt`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReviewSubmission = (studentId: string, studentName: string, assignment: string) => {
    setSelectedSubmission({ studentId, studentName, assignment });
    setSubmissionReview({
      grade: "",
      feedback: "",
      status: "pending"
    });
    setShowSubmissionModal(true);
  };

  const handleSubmitReview = () => {
    if (!submissionReview.grade || !submissionReview.feedback) {
      alert("Дүн болон сэтгэгдэл оруулна уу!");
      return;
    }

    const gradeNum = parseInt(submissionReview.grade);
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100) {
      alert("Дүн 0-100 хооронд байх ёстой.");
      return;
    }

    alert(`${selectedSubmission?.studentName} оюутны ${selectedSubmission?.assignment} даалгаврын дүн ${gradeNum} болж, сэтгэгдэл амжилттай бүртгэгдлээ.`);
    setShowSubmissionModal(false);
    setSelectedSubmission(null);
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
                <h1 className="mt-1 text-2xl font-semibold text-white">Дүнгийн жагсаалт</h1>
                <p className="mt-1 text-sm text-white/50">Хичээл тус бүрийн оюутны дүнгийн мэдээлэл</p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* View toggle */}
                <div className="flex gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-1">
                  {(["students", "assignments", "exams"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                        view === v
                          ? "bg-gradient-to-b from-violet-500 to-violet-700 text-white shadow-[0_4px_12px_rgba(124,58,237,0.35)]"
                          : "text-white/40 hover:text-white/70"
                      }`}
                    >
                      {v === "students" ? (
                        <>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <circle cx="6" cy="4" r="2" stroke="currentColor" strokeWidth="1.1"/>
                            <path d="M1 10c0-2.5 2-4 5-4s5 1.5 5 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                          </svg>
                          Оюутан
                        </>
                      ) : v === "assignments" ? (
                        <>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <rect x="1" y="1" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.1"/>
                          </svg>
                          Даалгавар
                        </>
                      ) : (
                        <>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 3h8M2 6h8M2 9h5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                          </svg>
                          Сорил шалгалт
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
                  label: "Дундаж дүн", 
                  value: `${Math.round(filteredStudents.reduce((sum, s) => sum + s.final, 0) / filteredStudents.length)}%`, 
                  sub: "нийт", 
                  color: "text-emerald-300", 
                  border: "border-emerald-400/20 bg-emerald-500/10",
                  icon: "📊"
                },
                { 
                  label: "А ба үнэлгээ", 
                  value: filteredStudents.filter(s => s.final >= 90).length, 
                  sub: "оюутан", 
                  color: "text-cyan-300", 
                  border: "border-cyan-400/20 bg-cyan-500/10",
                  icon: "⭐"
                },
                { 
                  label: "Дунджаас доош", 
                  value: filteredStudents.filter(s => s.final < 70).length, 
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

            {/* ── STUDENTS VIEW ── */}
            {view === "students" && (
              <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white/80">{selectedCourseData?.name} хичээлийн дүн</p>
                    <p className="mt-1 text-xs text-white/40">Оюутны дүнгийн мэдээлэл</p>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={handleDownloadSubmissions}
                      className="rounded-xl border border-cyan-400/30 bg-cyan-500/15 px-4 py-2 text-sm font-medium text-cyan-200 transition-colors hover:bg-cyan-500/25"
                    >
                      Файл татах
                    </button>
                    <button
                      onClick={handleExportGrades}
                      className="rounded-xl border border-violet-400/30 bg-violet-500/15 px-4 py-2 text-sm font-medium text-violet-200 transition-colors hover:bg-violet-500/25"
                    >
                      Дүн экспортлох
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px] border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02]">
                        {["Оюутны ID", "Нэр", "Даалгавар 1", "Даалгавар 2", "Даалгавар 3", "Даалгавар 4", "Даалгавар 5", "Шалгалт", "Эцсийн дүн", "Үйлдэл"].map((h) => (
                          <th key={h} className="px-3 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white/35 text-center first:text-left whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student, i) => {
                        const average = calculateAverage(student.assignments, student.exam);
                        return (
                          <tr key={student.id} className={`border-b border-white/[0.05] transition-colors hover:bg-white/[0.02] ${i % 2 === 1 ? "bg-white/[0.01]" : ""}`}>
                            <td className="px-3 py-3">
                              <p className="text-sm font-mono text-white/85">{student.id}</p>
                            </td>
                            <td className="px-3 py-3">
                              <p className="text-sm font-medium text-white/85">{student.name}</p>
                            </td>
                            {student.assignments.map((grade, idx) => (
                              <td key={idx} className="px-3 py-3 text-center">
                                {editingGrade?.studentId === student.id && editingGrade?.assignmentIndex === idx ? (
                                  <div className="flex items-center gap-1">
                                    <input
                                      type="number"
                                      value={gradeValue}
                                      onChange={(e) => setGradeValue(e.target.value)}
                                      className="w-16 rounded border border-white/20 bg-[#0a1428] px-2 py-1 text-center text-sm text-white"
                                      min="0"
                                      max="100"
                                    />
                                    <button
                                      onClick={handleSaveGrade}
                                      className="rounded border border-emerald-400/30 bg-emerald-500/15 px-2 py-1 text-xs text-emerald-300"
                                    >
                                      ✓
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => handleEditGrade(student.id, idx, grade)}
                                    className={`text-sm font-medium ${grade >= 80 ? "text-emerald-300" : grade >= 70 ? "text-amber-300" : "text-red-300"}`}
                                  >
                                    {grade}%
                                  </button>
                                )}
                              </td>
                            ))}
                            <td className="px-3 py-3 text-center">
                              <span className={`text-sm font-bold ${student.exam >= 80 ? "text-emerald-300" : student.exam >= 70 ? "text-amber-300" : "text-red-300"}`}>
                                {student.exam}%
                              </span>
                            </td>
                            <td className="px-3 py-3 text-center">
                              <span className={`text-base font-bold ${average >= 80 ? "text-emerald-300" : average >= 70 ? "text-amber-300" : "text-red-300"}`}>
                                {average}%
                              </span>
                            </td>
                            <td className="px-3 py-3">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditGrade(student.id, 0, student.assignments[0])}
                                  className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:bg-white/[0.08]"
                                >
                                  Засах
                                </button>
                                <button
                                  onClick={() => handleReviewSubmission(student.id, student.name, "Даалгавар 1")}
                                  className="rounded-xl border border-cyan-400/30 bg-cyan-500/15 px-3 py-1.5 text-xs font-medium text-cyan-300 transition-colors hover:bg-cyan-500/25"
                                >
                                  Шалгах
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── ASSIGNMENTS VIEW ── */}
            {view === "assignments" && (
              <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                <div className="mb-4">
                  <p className="text-sm font-semibold text-white/80">{selectedCourseData?.name} хичээлийн даалгавар</p>
                  <p className="mt-1 text-xs text-white/40">Даалгаврын дүн оруулах</p>
                </div>

                <div className="space-y-4">
                  {/* Assignment types */}
                  {assignmentTypes.map((assignment) => (
                    <div key={assignment.id} className="rounded-[22px] border border-white/10 bg-[#0a1428] p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-white/90">{assignment.name}</p>
                          <p className="mt-0.5 text-xs text-white/50">{assignment.weight}% жин</p>
                        </div>
                        <button
                          onClick={() => alert(`${assignment.name}-ын дүн оруулах цонх нээгдэнэ.`)}
                          className="rounded-xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-2 text-xs font-medium text-emerald-300 transition-colors hover:bg-emerald-500/25"
                        >
                          Дүн илгээх
                        </button>
                      </div>

                      {/* Students table */}
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="px-3 py-2 text-left text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">Оюутны ID</th>
                              <th className="px-3 py-2 text-left text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">Нэр</th>
                              <th className="px-3 py-2 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">Дүн</th>
                              <th className="px-3 py-2 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">Үйлдэл</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredStudents.map((student, i) => {
                              // Get assignment grade
                              const assignmentGrade = assignment.id <= 5 ? student.assignments[assignment.id - 1] : student.exam;
                              
                              return (
                                <tr key={student.id} className={`border-b border-white/[0.05] ${i % 2 === 1 ? "bg-white/[0.01]" : ""}`}>
                                  <td className="px-3 py-2">
                                    <p className="text-xs font-mono text-white/70">{student.id}</p>
                                  </td>
                                  <td className="px-3 py-2">
                                    <p className="text-xs text-white/80">{student.name}</p>
                                  </td>
                                  <td className="px-3 py-2 text-center">
                                    <span className={`text-sm font-bold ${assignmentGrade >= 80 ? "text-emerald-300" : assignmentGrade >= 70 ? "text-amber-300" : "text-red-300"}`}>
                                      {assignmentGrade}%
                                    </span>
                                  </td>
                                  <td className="px-3 py-2 text-center">
                                    <button
                                      onClick={() => alert(`${student.name} оюутны ${assignment.name}-ын дүн засагдана.`)}
                                      className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/60 transition-colors hover:bg-white/[0.08]"
                                    >
                                      Засах
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── EXAMS VIEW ── */}
            {view === "exams" && (
              <div className="space-y-4">
                {/* Exam types */}
                {[
                  { id: "midterm", name: "Дунд шалгалт", weight: 30, date: "2025-03-15" },
                  { id: "final", name: "Улирлын шалгалт", weight: 40, date: "2025-05-20" },
                  { id: "quiz1", name: "Сорил 1", weight: 10, date: "2025-02-10" },
                  { id: "quiz2", name: "Сорил 2", weight: 10, date: "2025-04-05" },
                  { id: "practical", name: "Практик шалгалт", weight: 10, date: "2025-04-25" },
                ].map((exam) => (
                  <div key={exam.id} className="rounded-[22px] border border-white/10 bg-[#0a1428] p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white/90">{exam.name}</p>
                        <p className="mt-0.5 text-xs text-white/50">{exam.weight}% жин • {exam.date}</p>
                      </div>
                      <button
                        onClick={() => alert(`${exam.name}-ын дүн оруулах цонх нээгдэнэ.`)}
                        className="rounded-xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-2 text-xs font-medium text-emerald-300 transition-colors hover:bg-emerald-500/25"
                      >
                        Дүн илгээх
                      </button>
                    </div>

                    {/* Students table */}
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="px-3 py-2 text-left text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">Оюутны ID</th>
                            <th className="px-3 py-2 text-left text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">Нэр</th>
                            <th className="px-3 py-2 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">Дүн</th>
                            <th className="px-3 py-2 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">Үйлдэл</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredStudents.map((student, i) => {
                            // Mock exam grade
                            const examGrade = exam.id === "midterm" ? student.exam : 
                                             exam.id === "final" ? student.final :
                                             Math.floor(Math.random() * 30) + 70;
                            
                            return (
                              <tr key={student.id} className={`border-b border-white/[0.05] ${i % 2 === 1 ? "bg-white/[0.01]" : ""}`}>
                                <td className="px-3 py-2">
                                  <p className="text-xs font-mono text-white/70">{student.id}</p>
                                </td>
                                <td className="px-3 py-2">
                                  <p className="text-xs text-white/80">{student.name}</p>
                                </td>
                                <td className="px-3 py-2 text-center">
                                  <span className={`text-sm font-bold ${examGrade >= 80 ? "text-emerald-300" : examGrade >= 70 ? "text-amber-300" : "text-red-300"}`}>
                                    {examGrade}%
                                  </span>
                                </td>
                                <td className="px-3 py-2 text-center">
                                  <button
                                    onClick={() => alert(`${student.name} оюутны ${exam.name}-ын дүн засагдана.`)}
                                    className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/60 transition-colors hover:bg-white/[0.08]"
                                  >
                                    Засах
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Submission Review Modal */}
            {showSubmissionModal && selectedSubmission && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#0a1428] p-6 shadow-2xl">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white/90">Ирүүлсэн даалгавар шалгах</p>
                      <p className="mt-0.5 text-xs text-white/40">
                        {selectedSubmission.studentName} - {selectedSubmission.assignment}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowSubmissionModal(false)}
                      className="rounded-full border border-white/10 bg-white/[0.04] p-1.5 text-white/40 hover:text-white/70"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* File preview */}
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-cyan-400">
                          <path d="M9 2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7l-5-5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                          <path d="M9 2v5h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className="text-sm font-medium text-white/80">Ирүүлсэн файл</p>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0a1428] px-3 py-2">
                        <div>
                          <p className="text-sm text-white/70">{selectedSubmission.studentName}_Даалгавар1.pdf</p>
                          <p className="text-xs text-white/30">2.4 MB • 2 өдрийн өмнө ирүүлсэн</p>
                        </div>
                        <button className="rounded-lg border border-cyan-400/30 bg-cyan-500/15 px-3 py-1 text-xs font-medium text-cyan-300 hover:bg-cyan-500/25">
                          Татах
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium text-white/35">
                        Дүн (0-100)
                      </label>
                      <input
                        type="number"
                        value={submissionReview.grade}
                        onChange={(e) => setSubmissionReview({...submissionReview, grade: e.target.value})}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder-white/20 focus:border-cyan-400/40 focus:outline-none"
                        placeholder="Жишээ нь: 85"
                        min="0"
                        max="100"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium text-white/35">
                        Сэтгэгдэл
                      </label>
                      <textarea
                        value={submissionReview.feedback}
                        onChange={(e) => setSubmissionReview({...submissionReview, feedback: e.target.value})}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder-white/20 focus:border-cyan-400/40 focus:outline-none"
                        placeholder="Даалгаврын талаарх сэтгэгдэл..."
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium text-white/35">
                        Төлөв
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: "approved", label: "Зөвшөөрсөн", color: "border-emerald-400/30 bg-emerald-500/15 text-emerald-300" },
                          { value: "revision", label: "Дахин хийх", color: "border-amber-400/30 bg-amber-500/15 text-amber-300" },
                          { value: "rejected", label: "Татгалзсан", color: "border-red-400/30 bg-red-500/15 text-red-300" },
                        ].map((status) => (
                          <button
                            key={status.value}
                            onClick={() => setSubmissionReview({...submissionReview, status: status.value})}
                            className={`rounded-xl border py-2 text-xs font-medium transition-all ${status.color} ${submissionReview.status === status.value ? "ring-2 ring-white/30" : ""}`}
                          >
                            {status.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setShowSubmissionModal(false)}
                        className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.08]"
                      >
                        Цуцлах
                      </button>
                      <button
                        onClick={handleSubmitReview}
                        className="flex-1 rounded-xl border border-cyan-400/30 bg-gradient-to-b from-cyan-500 to-cyan-700 px-4 py-2.5 text-sm font-medium text-white shadow-[0_4px_12px_rgba(34,211,238,0.35)] transition-all hover:opacity-90"
                      >
                        Хадгалах
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