"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function Students() {
  const [activeMenu, setActiveMenu] = useState("Оюутны жагсаалт");
  const [userType, setUserType] = useState<"admin" | "training" | "finance" | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<typeof studentsData[0] | null>(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [showChangeDepartmentModal, setShowChangeDepartmentModal] = useState(false);
  const [isEditingStudent, setIsEditingStudent] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<{status: string, leaveType: string | null} | null>(null);
  const [statusReason, setStatusReason] = useState("");
  const [editSearchTerm, setEditSearchTerm] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{sender: string, message: string, time: string}>>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedType = localStorage.getItem("userType") as "admin" | "training" | "finance" | null;
      setUserType(savedType);
      
      // Set user type if not set (default to admin for admin pages)
      if (!savedType && window.location.pathname.startsWith("/admin/")) {
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

  const studentsData = [
    { id: 1, name: "Төртэмүүлэн", idNumber: "B211930019", department: "Програм хангамж", gpa: 3.8, status: "Идэвхтэй", leaveType: null, email: "tortemuulen@indra.edu.mn", phone: "9999-9999" },
    { id: 2, name: "Э.Батжаргал", idNumber: "B211930020", department: "Програм хангамж", gpa: 3.7, status: "Идэвхтэй", leaveType: null, email: "batjargal@indra.edu.mn", phone: "8888-8888" },
    { id: 3, name: "Ц.Мөнхбат", idNumber: "B211930021", department: "Сүлжээний технологи", gpa: 3.9, status: "Идэвхтэй", leaveType: null, email: "monkhbat@indra.edu.mn", phone: "7777-7777" },
    { id: 4, name: "Д.Сүхбат", idNumber: "B211930022", department: "Сүлжээний технологи", gpa: 3.6, status: "Хагас жилийн чөлөө", leaveType: "half", email: "sukhbat@indra.edu.mn", phone: "6666-6666" },
    { id: 5, name: "Б.Ганбаяр", idNumber: "B211930023", department: "Мэдээллийн аюулгүй байдал", gpa: 3.5, status: "Бүтэн жилийн чөлөө", leaveType: "full", email: "ganbayar@indra.edu.mn", phone: "5555-5555" },
    { id: 6, name: "Н.Энхжаргал", idNumber: "B211930024", department: "Мэдээллийн аюулгүй байдал", gpa: 3.4, status: "Идэвхтэй", leaveType: null, email: "enkhjargal@indra.edu.mn", phone: "4444-4444" },
    { id: 7, name: "Г.Бат-Эрдэнэ", idNumber: "B211930025", department: "Мэдээлэл зүй", gpa: 3.8, status: "Идэвхтэй", leaveType: null, email: "baterdene@indra.edu.mn", phone: "3333-3333" },
    { id: 8, name: "Л.Хүслэн", idNumber: "B211930026", department: "Мэдээлэл зүй", gpa: 3.7, status: "Идэвхтэй", leaveType: null, email: "khuslen@indra.edu.mn", phone: "2222-2222" },
  ];

  const summaryStats = {
    totalStudents: 8,
    active: 6,
    averageGPA: 3.68,
    departments: 4
  };

  const getStatusColor = (status: string) => {
    if (status === "Идэвхтэй") return "bg-emerald-500/10 text-emerald-400";
    if (status === "Хагас жилийн чөлөө") return "bg-amber-500/10 text-amber-400";
    if (status === "Бүтэн жилийн чөлөө") return "bg-amber-500/10 text-amber-400";
    if (status === "Дүрэм зөрчсөн") return "bg-red-500/10 text-red-400";
    if (status === "Төлбөр төлөөгүй") return "bg-orange-500/10 text-orange-400";
    return "bg-gray-500/10 text-gray-400";
  };

  const getStatusText = (status: string, leaveType: string | null) => {
    return status;
  };

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.8) return "text-emerald-400";
    if (gpa >= 3.5) return "text-green-400";
    if (gpa >= 3.0) return "text-amber-400";
    return "text-red-400";
  };

  // Filter students based on search term
  const filteredStudents = studentsData.filter(student => {
    const searchLower = searchTerm.toLowerCase();
    return (
      student.name.toLowerCase().includes(searchLower) ||
      student.idNumber.toLowerCase().includes(searchLower) ||
      student.department.toLowerCase().includes(searchLower) ||
      student.email.toLowerCase().includes(searchLower) ||
      student.phone.includes(searchTerm)
    );
  });

  const handleSendMessage = () => {
    if (chatMessage.trim() && selectedStudent) {
      const newMessage = {
        sender: "Сургалтын алба",
        message: chatMessage,
        time: new Date().toLocaleTimeString('mn-MN', { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory([...chatHistory, newMessage]);
      setChatMessage("");
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
            {/* Students List */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">Оюутнуудын жагсаалт</h2>
                  {userType !== "finance" && (
                    <button 
                      onClick={() => setShowAddStudentModal(true)}
                      className="rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-500/25"
                    >
                      Шинэ оюутан нэмэх
                    </button>
                  )}
                </div>
                
                {/* Search Bar */}
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
                    placeholder="Оюутны нэр, ID, тэнхим, имэйл, утасаар хайх..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/40"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  )}
                </div>
                
                {/* Results count */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">
                    {filteredStudents.length === studentsData.length 
                      ? `Нийт ${studentsData.length} оюутан`
                      : `${filteredStudents.length} оюутан олдлоо (нийт ${studentsData.length})`
                    }
                  </span>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="text-emerald-400 hover:text-emerald-300"
                    >
                      Хайлт цэвэрлэх
                    </button>
                  )}
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">{student.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{student.name}</p>
                          <p className="text-xs text-white/50">{student.idNumber}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/50">Тэнхим:</span>
                        <span className="text-xs text-white/80">{student.department}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/50">Дундаж дүн:</span>
                        <span className={`text-sm font-bold ${getGPAColor(student.gpa)}`}>
                          {student.gpa.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/50">Төлөв:</span>
                        <span className={`rounded-full border px-2 py-0.5 text-xs ${getStatusColor(student.status)}`}>
                          {student.status}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-3 mb-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white/40">
                            <path d="M2 2h8v8H2V2z" stroke="currentColor" strokeWidth="1" />
                            <path d="M4 1v2M8 1v2M2 4h8" stroke="currentColor" strokeWidth="1" />
                          </svg>
                          <span className="text-xs text-white/60">{student.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white/40">
                            <path d="M2 2h8v8H2V2z" stroke="currentColor" strokeWidth="1" />
                          </svg>
                          <span className="text-xs text-white/60">{student.phone}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setSelectedStudent(student)}
                      className="w-full rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-3 py-2.5 text-sm font-medium text-emerald-300 hover:bg-emerald-500/25 transition-colors"
                    >
                      Дэлгэрэнгүй
                    </button>
                  </div>
                ))}
              </div>
              
              {/* No results message */}
              {filteredStudents.length === 0 && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/40">
                      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" />
                      <path d="M15 15l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="text-white/70 mb-2">Хайлтын үр дүн олдсонгүй</p>
                  <p className="text-sm text-white/50">"{searchTerm}" гэсэн утгатай оюутан олдсонгүй</p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="mt-4 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:text-white"
                  >
                    Хайлт цэвэрлэх
                  </button>
                </div>
              )}
            </div>

            {/* Student Analysis */}
            <div className="grid gap-5 lg:grid-cols-1">
              {/* Department Distribution */}
              <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70 mb-4">Тэнхимийн тархалт</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {[
                    { department: "Програм хангамж", count: 2, percentage: 25, color: "from-blue-400 to-cyan-300" },
                    { department: "Сүлжээний технологи", count: 2, percentage: 25, color: "from-emerald-400 to-green-300" },
                    { department: "Мэдээллийн аюулгүй байдал", count: 2, percentage: 25, color: "from-amber-400 to-yellow-300" },
                    { department: "Мэдээлэл зүй", count: 2, percentage: 25, color: "from-purple-400 to-pink-300" },
                  ].map((item, index) => (
                    <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-white">{item.department}</p>
                        <span className="text-sm font-bold text-white">{item.count} оюутан</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-white/50 mb-1">
                        <span>Нийт: {item.percentage}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-[#0a1628] via-[#081120] to-[#0a1628] shadow-2xl">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent pointer-events-none" />
            
            {/* Close and Chat buttons */}
            <div className="absolute right-4 top-4 flex gap-2 z-20">
              {userType !== "finance" && (
                <>
                  <button
                    onClick={() => setIsEditingStudent(!isEditingStudent)}
                    className="group rounded-xl border border-blue-400/40 bg-blue-500/20 p-2.5 text-blue-300 hover:bg-blue-500/30 hover:border-blue-400/60 transition-all duration-200 shadow-lg hover:shadow-blue-500/20"
                    title={isEditingStudent ? "Хадгалах" : "Засах"}
                  >
                    {isEditingStudent ? (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="group-hover:scale-110 transition-transform">
                        <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="group-hover:scale-110 transition-transform">
                        <path d="M13.5 6.5l-8 8V17h2.5l8-8m-2.5-2.5l2-2 2.5 2.5-2 2m-2.5-2.5l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setShowChatModal(true);
                      setChatHistory([]);
                    }}
                    className="group rounded-xl border border-emerald-400/40 bg-emerald-500/20 p-2.5 text-emerald-300 hover:bg-emerald-500/30 hover:border-emerald-400/60 transition-all duration-200 shadow-lg hover:shadow-emerald-500/20"
                    title="Оюутантай харилцах"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="group-hover:scale-110 transition-transform">
                      <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H6l-4 3V6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M6 9h8M6 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </>
              )}
              <button
                onClick={() => {
                  setSelectedStudent(null);
                  setIsEditingStudent(false);
                }}
                className="group rounded-xl border border-white/20 bg-white/10 p-2.5 text-white/70 hover:text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200 shadow-lg"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="group-hover:rotate-90 transition-transform duration-200">
                  <path d="M5 5l10 10M15 5l-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="relative max-h-[92vh] overflow-y-auto">
              {/* Header with gradient background */}
              <div className="sticky top-0 z-10 border-b border-white/10 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 backdrop-blur-xl px-8 py-6">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center ring-4 ring-blue-500/30 shadow-xl">
                      <span className="text-3xl font-bold text-white">{selectedStudent.name.charAt(0)}</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-emerald-500 border-2 border-[#081120] flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 6l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-1">{selectedStudent.name}</h2>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm text-white/60 font-mono">{selectedStudent.idNumber}</span>
                      <span className="h-1 w-1 rounded-full bg-white/30" />
                      <span className="text-sm text-white/60">{selectedStudent.department}</span>
                      <span className={`ml-2 rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(selectedStudent.status)}`}>
                        {selectedStudent.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {userType === "finance" ? (
                // Finance admin view - only payment information
                <>
                  {/* Payment Information */}
                  <div className="px-8 py-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="h-1 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600" />
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Төлбөрийн мэдээлэл</h3>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-6 backdrop-blur-sm">
                      <div className="grid gap-5 md:grid-cols-2">
                        <div className="group">
                          <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Төлбөрийн төлөв</p>
                          <span className="inline-block rounded-xl border border-emerald-400/40 bg-emerald-500/20 px-4 py-1.5 text-sm font-medium text-emerald-300">
                            Төлсөн
                          </span>
                        </div>
                        <div className="group">
                          <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Нийт төлбөр</p>
                          <p className="text-2xl font-bold text-white">₮4,500,000</p>
                        </div>
                        <div className="group">
                          <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Төлсөн дүн</p>
                          <p className="text-xl font-bold text-emerald-400">₮4,500,000</p>
                        </div>
                        <div className="group">
                          <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Үлдэгдэл</p>
                          <p className="text-xl font-bold text-white/60">₮0</p>
                        </div>
                        <div className="group">
                          <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Төлбөрийн нөхцөл</p>
                          <p className="text-base font-medium text-white group-hover:text-emerald-300 transition-colors">Улирал бүр</p>
                        </div>
                        <div className="group">
                          <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Сүүлд төлсөн огноо</p>
                          <p className="text-base font-medium text-white group-hover:text-emerald-300 transition-colors">2024-12-15</p>
                        </div>
                        <div className="group">
                          <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Хөнгөлөлт</p>
                          <p className="text-base font-medium text-amber-400">10% - Сурлагын амжилт</p>
                        </div>
                        <div className="group">
                          <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Тэтгэлэг</p>
                          <p className="text-base font-medium text-white group-hover:text-emerald-300 transition-colors">Байхгүй</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment History */}
                  <div className="px-8 py-6 bg-gradient-to-br from-blue-500/5 to-transparent">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="h-1 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" />
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Төлбөрийн түүх</h3>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-6 backdrop-blur-sm">
                      <div className="space-y-3">
                        {[
                          { date: "2024-12-15", amount: "₮1,125,000", method: "Банкны шилжүүлэг", status: "Амжилттай" },
                          { date: "2024-09-10", amount: "₮1,125,000", method: "Банкны шилжүүлэг", status: "Амжилттай" },
                          { date: "2024-06-05", amount: "₮1,125,000", method: "Банкны шилжүүлэг", status: "Амжилттай" },
                          { date: "2024-03-01", amount: "₮1,125,000", method: "Банкны шилжүүлэг", status: "Амжилттай" },
                        ].map((payment, index) => (
                          <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                            <div>
                              <p className="text-sm font-medium text-white">{payment.date}</p>
                              <p className="text-xs text-white/50 mt-1">{payment.method}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-base font-bold text-emerald-400">{payment.amount}</p>
                              <span className="inline-block mt-1 rounded-full border border-emerald-400/40 bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-300">
                                {payment.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // Full admin and training admin view - all information
                <>
                  {/* Personal Information */}
                  <div className="px-8 py-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-1 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Хувийн мэдээлэл</h3>
                </div>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-6 backdrop-blur-sm">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Овог нэр</p>
                      {isEditingStudent ? (
                        <input type="text" defaultValue={selectedStudent.name} className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400/40" />
                      ) : (
                        <p className="text-base font-medium text-white group-hover:text-blue-300 transition-colors">{selectedStudent.name}</p>
                      )}
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Оюутны ID</p>
                      <p className="text-base font-mono font-medium text-white/60">{selectedStudent.idNumber}</p>
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Имэйл хаяг</p>
                      {isEditingStudent ? (
                        <input type="email" defaultValue={selectedStudent.email} className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400/40" />
                      ) : (
                        <p className="text-base font-medium text-white group-hover:text-blue-300 transition-colors">{selectedStudent.email}</p>
                      )}
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Утасны дугаар</p>
                      {isEditingStudent ? (
                        <input type="tel" defaultValue={selectedStudent.phone} className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400/40" />
                      ) : (
                        <p className="text-base font-medium text-white group-hover:text-blue-300 transition-colors">{selectedStudent.phone}</p>
                      )}
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Төрсөн огноо</p>
                      {isEditingStudent ? (
                        <input type="date" defaultValue="1999-05-15" className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400/40" />
                      ) : (
                        <p className="text-base font-medium text-white group-hover:text-blue-300 transition-colors">1999-05-15</p>
                      )}
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Хүйс</p>
                      {isEditingStudent ? (
                        <select defaultValue="Эрэгтэй" className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400/40">
                          <option>Эрэгтэй</option>
                          <option>Эмэгтэй</option>
                        </select>
                      ) : (
                        <p className="text-base font-medium text-white group-hover:text-blue-300 transition-colors">Эрэгтэй</p>
                      )}
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Регистрийн дугаар</p>
                      {isEditingStudent ? (
                        <input type="text" defaultValue="УБ99051512345" className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400/40" />
                      ) : (
                        <p className="text-base font-mono font-medium text-white group-hover:text-blue-300 transition-colors">УБ99051512345</p>
                      )}
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Гэрийн хаяг</p>
                      {isEditingStudent ? (
                        <input type="text" defaultValue="УБ, СХД, 3-р хороо" className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400/40" />
                      ) : (
                        <p className="text-base font-medium text-white group-hover:text-blue-300 transition-colors">УБ, СХД, 3-р хороо</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="px-8 py-6 bg-gradient-to-br from-purple-500/5 to-transparent">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-1 w-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Сургалтын мэдээлэл</h3>
                </div>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-6 backdrop-blur-sm">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Тэнхим</p>
                      {isEditingStudent ? (
                        <select defaultValue={selectedStudent.department} className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400/40">
                          <option>Програм хангамж</option>
                          <option>Сүлжээний технологи</option>
                          <option>Мэдээллийн аюулгүй байдал</option>
                          <option>Мэдээлэл зүй</option>
                        </select>
                      ) : (
                        <p className="text-base font-medium text-white group-hover:text-purple-300 transition-colors">{selectedStudent.department}</p>
                      )}
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Дундаж дүн (GPA)</p>
                      <p className={`text-2xl font-bold ${getGPAColor(selectedStudent.gpa)}`}>
                        {selectedStudent.gpa.toFixed(2)}
                      </p>
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Элссэн он</p>
                      {isEditingStudent ? (
                        <input type="number" defaultValue="2021" className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400/40" />
                      ) : (
                        <p className="text-base font-medium text-white group-hover:text-purple-300 transition-colors">2021</p>
                      )}
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Төгсөх он</p>
                      {isEditingStudent ? (
                        <input type="number" defaultValue="2025" className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400/40" />
                      ) : (
                        <p className="text-base font-medium text-white group-hover:text-purple-300 transition-colors">2025</p>
                      )}
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Сургалтын хэлбэр</p>
                      {isEditingStudent ? (
                        <select defaultValue="Өдрийн" className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400/40">
                          <option>Өдрийн</option>
                          <option>Оройн</option>
                          <option>Зайн</option>
                        </select>
                      ) : (
                        <p className="text-base font-medium text-white group-hover:text-purple-300 transition-colors">Өдрийн</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Guardian Information */}
              <div className="px-8 py-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-1 w-10 rounded-full bg-gradient-to-r from-amber-500 to-amber-600" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Асран хамгаалагчийн мэдээлэл</h3>
                </div>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-6 backdrop-blur-sm">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Эцэг/эхийн нэр</p>
                      <p className="text-base font-medium text-white group-hover:text-amber-300 transition-colors">Б.Батбаяр</p>
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Утасны дугаар</p>
                      <p className="text-base font-medium text-white group-hover:text-amber-300 transition-colors">9911-1111</p>
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Имэйл хаяг</p>
                      <p className="text-base font-medium text-white group-hover:text-amber-300 transition-colors">batbayar@email.com</p>
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Ажлын байр</p>
                      <p className="text-base font-medium text-white group-hover:text-amber-300 transition-colors">Монгол банк</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="px-8 py-6 bg-gradient-to-br from-emerald-500/5 to-transparent">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-1 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Нэмэлт мэдээлэл</h3>
                </div>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-6 backdrop-blur-sm">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Бүртгүүлсэн огноо</p>
                      <p className="text-base font-medium text-white group-hover:text-emerald-300 transition-colors">2021-09-01</p>
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Ирцийн төлөв</p>
                      <div className="flex items-center gap-2">
                        <span className={`inline-block rounded-xl border px-4 py-1.5 text-sm font-medium ${getStatusColor(selectedStudent.status)}`}>
                          {selectedStudent.status}
                        </span>
                        <button
                          onClick={() => setShowStatusModal(true)}
                          className="rounded-lg border border-blue-400/30 bg-blue-500/15 px-3 py-1.5 text-xs font-medium text-blue-300 hover:bg-blue-500/25 transition-colors"
                        >
                          Өөрчлөх
                        </button>
                      </div>
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Төлбөрийн төлөв</p>
                      <span className="inline-block rounded-xl border border-emerald-400/40 bg-emerald-500/20 px-4 py-1.5 text-sm font-medium text-emerald-300">
                        Төлсөн
                      </span>
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Тэтгэлэг</p>
                      <p className="text-base font-medium text-white group-hover:text-emerald-300 transition-colors">Байхгүй</p>
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Идэвхтэй хичээл</p>
                      <p className="text-base font-medium text-white group-hover:text-emerald-300 transition-colors">
                        {selectedStudent.status === "Идэвхтэй" ? "6 хичээл" : "0 хичээл"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChatModal && selectedStudent && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl h-[600px] rounded-[24px] border border-white/10 bg-[#081120] shadow-2xl flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">{selectedStudent.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">{selectedStudent.name}</h3>
                  <p className="text-xs text-white/50">{selectedStudent.idNumber} • {selectedStudent.department}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowChatModal(false);
                  setChatHistory([]);
                }}
                className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white hover:bg-white/10"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5l10 10M15 5l-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-white/40">
                      <path d="M8 12h16M8 16h16M8 20h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <rect x="4" y="6" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                  <p className="text-white/70 mb-2">{selectedStudent.name}-тай харилцах</p>
                  <p className="text-sm text-white/50">
                    Ирц, дүн, төлбөр, бусад асуудлаар харилцана уу
                  </p>
                </div>
              ) : (
                chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === "Сургалтын алба" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        msg.sender === "Сургалтын алба"
                          ? "bg-white/5 border border-white/10"
                          : "bg-emerald-500/20 border border-emerald-400/30"
                      }`}
                    >
                      <p className="text-xs font-medium text-white/70 mb-1">{msg.sender}</p>
                      <p className="text-sm text-white">{msg.message}</p>
                      <p className="text-xs text-white/40 mt-1">{msg.time}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Chat Input */}
            <div className="border-t border-white/10 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Мессеж бичих..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                  className="flex-1 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/40"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!chatMessage.trim()}
                  className="rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-6 py-2.5 text-sm font-medium text-emerald-300 hover:bg-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Илгээх
                </button>
              </div>
              <p className="text-xs text-white/40 mt-2">
                💡 Оюутны ирц, дүн, төлбөр, бусад асуудлаар харилцана уу
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Status Change Modal */}
      {showStatusModal && selectedStudent && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md rounded-3xl border border-white/20 bg-gradient-to-br from-[#0a1628] via-[#081120] to-[#0a1628] p-6 shadow-2xl">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Ирцийн төлөв өөрчлөх</h3>
              <p className="text-sm text-white/60">{selectedStudent.name} - {selectedStudent.idNumber}</p>
              <p className="text-xs text-white/40 mt-2">Сургалтын албанаас оюутны төлөвийг өөрчлөх 5 боломж:</p>
            </div>

            {!selectedStatus ? (
              <>
                <div className="space-y-3 mb-6 max-h-[60vh] overflow-y-auto">
                  <button
                    onClick={() => setSelectedStatus({ status: "Идэвхтэй", leaveType: null })}
                    className={`w-full rounded-xl border p-4 text-left transition-all ${
                      selectedStudent.status === "Идэвхтэй"
                        ? "border-emerald-400/40 bg-emerald-500/20"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">1. Идэвхтэй</p>
                        <p className="text-xs text-white/50">Хичээлд суралцаж байна</p>
                      </div>
                      {selectedStudent.status === "Идэвхтэй" && (
                        <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l2.5 2.5L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedStatus({ status: "Хагас жилийн чөлөө", leaveType: "half" })}
                    className={`w-full rounded-xl border p-4 text-left transition-all ${
                      selectedStudent.status === "Хагас жилийн чөлөө"
                        ? "border-amber-400/40 bg-amber-500/20"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">2. Хагас жилийн чөлөө</p>
                        <p className="text-xs text-white/50">6 сарын хугацаагаар</p>
                      </div>
                      {selectedStudent.status === "Хагас жилийн чөлөө" && (
                        <div className="h-5 w-5 rounded-full bg-amber-500 flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l2.5 2.5L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedStatus({ status: "Бүтэн жилийн чөлөө", leaveType: "full" })}
                    className={`w-full rounded-xl border p-4 text-left transition-all ${
                      selectedStudent.status === "Бүтэн жилийн чөлөө"
                        ? "border-amber-400/40 bg-amber-500/20"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">3. Бүтэн жилийн чөлөө</p>
                        <p className="text-xs text-white/50">12 сарын хугацаагаар</p>
                      </div>
                      {selectedStudent.status === "Бүтэн жилийн чөлөө" && (
                        <div className="h-5 w-5 rounded-full bg-amber-500 flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l2.5 2.5L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedStatus({ status: "Дүрэм зөрчсөн", leaveType: null })}
                    className={`w-full rounded-xl border p-4 text-left transition-all ${
                      selectedStudent.status === "Дүрэм зөрчсөн"
                        ? "border-red-400/40 bg-red-500/20"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">4. Сургуулийн дотоод дүрэм журам зөрчсөн</p>
                        <p className="text-xs text-white/50">Идэвхгүй болсон</p>
                      </div>
                      {selectedStudent.status === "Дүрэм зөрчсөн" && (
                        <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l2.5 2.5L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedStatus({ status: "Төлбөр төлөөгүй", leaveType: null })}
                    className={`w-full rounded-xl border p-4 text-left transition-all ${
                      selectedStudent.status === "Төлбөр төлөөгүй"
                        ? "border-orange-400/40 bg-orange-500/20"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">5. Төлбөр төлөөгүй</p>
                        <p className="text-xs text-white/50">Санхүүгийн асуудал</p>
                      </div>
                      {selectedStudent.status === "Төлбөр төлөөгүй" && (
                        <div className="h-5 w-5 rounded-full bg-orange-500 flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l2.5 2.5L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                </div>

                <button
                  onClick={() => {
                    setShowStatusModal(false);
                    setSelectedStatus(null);
                    setStatusReason("");
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Хаах
                </button>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-4">
                    <p className="text-sm text-white/50 mb-1">Сонгосон төлөв:</p>
                    <p className="text-base font-medium text-white">{selectedStatus.status}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Төлөв өөрчлөх шалтгаан
                      <span className="text-red-400 ml-1">*</span>
                    </label>
                    <textarea
                      value={statusReason}
                      onChange={(e) => setStatusReason(e.target.value)}
                      placeholder="Жишээ нь: Ирц муу, Сахилгын зөрчил, Эрүүл мэндийн шалтгаан, Төлбөр төлөөгүй гэх мэт..."
                      rows={4}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-blue-400/40 resize-none"
                    />
                    <p className="text-xs text-white/40 mt-2">
                      💡 Төлөв өөрчлөх шалтгааныг тодорхой бичнэ үү
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedStatus(null);
                      setStatusReason("");
                    }}
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    Буцах
                  </button>
                  <button
                    onClick={() => {
                      if (!statusReason.trim()) {
                        alert("Шалтгаан бичнэ үү!");
                        return;
                      }
                      alert(`Төлөв өөрчлөгдлөө!\n\nШинэ төлөв: ${selectedStatus.status}\n\nШалтгаан: ${statusReason}\n\nФункц удахгүй нэмэгдэнэ.`);
                      setShowStatusModal(false);
                      setSelectedStatus(null);
                      setStatusReason("");
                    }}
                    disabled={!statusReason.trim()}
                    className="flex-1 rounded-xl border border-blue-400/30 bg-blue-500/20 px-4 py-3 text-sm font-medium text-blue-300 hover:bg-blue-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Баталгаажуулах
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-2xl rounded-3xl border border-white/20 bg-gradient-to-br from-[#0a1628] via-[#081120] to-[#0a1628] p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Шинэ оюутан нэмэх</h3>
            <p className="text-sm text-white/60 mb-6">Оюутны мэдээллийг оруулна уу</p>
            
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <input type="text" placeholder="Овог нэр" className="rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/40" />
              <input type="text" placeholder="Оюутны ID" className="rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/40" />
              <input type="email" placeholder="Имэйл" className="rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/40" />
              <input type="tel" placeholder="Утас" className="rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/40" />
              <select className="rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400/40 md:col-span-2">
                <option>Тэнхим сонгох</option>
                <option>Програм хангамж</option>
                <option>Сүлжээний технологи</option>
                <option>Мэдээллийн аюулгүй байдал</option>
                <option>Мэдээлэл зүй</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowAddStudentModal(false)} className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10">Хаах</button>
              <button onClick={() => { alert("Оюутан нэмэх функц удахгүй нэмэгдэнэ."); setShowAddStudentModal(false); }} className="flex-1 rounded-xl border border-emerald-400/30 bg-emerald-500/20 px-4 py-3 text-sm font-medium text-emerald-300 hover:bg-emerald-500/30">Нэмэх</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditStudentModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-2xl rounded-3xl border border-white/20 bg-gradient-to-br from-[#0a1628] via-[#081120] to-[#0a1628] p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Оюутан засах</h3>
            <p className="text-sm text-white/60 mb-4">Оюутны ID-аар хайж засах оюутныг сонгоно уу</p>
            
            {/* Search by ID */}
            <div className="relative mb-6">
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
                placeholder="Оюутны ID-аар хайх (жишээ нь: B211930019)..."
                value={editSearchTerm}
                onChange={(e) => setEditSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/[0.06] py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-blue-400/40"
              />
              {editSearchTerm && (
                <button
                  onClick={() => setEditSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>

            <div className="max-h-[400px] overflow-y-auto mb-6 space-y-2">
              {studentsData
                .filter(student => 
                  editSearchTerm === "" || 
                  student.idNumber.toLowerCase().includes(editSearchTerm.toLowerCase()) ||
                  student.name.toLowerCase().includes(editSearchTerm.toLowerCase())
                )
                .map((student) => (
                  <button
                    key={student.id}
                    onClick={() => {
                      setSelectedStudent(student);
                      setShowEditStudentModal(false);
                      setEditSearchTerm("");
                    }}
                    className="w-full rounded-lg border border-white/10 bg-white/5 p-4 text-left hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">{student.name}</p>
                        <p className="text-xs text-white/50">{student.idNumber} • {student.department}</p>
                      </div>
                      <span className={`rounded-full border px-2 py-0.5 text-xs ${getStatusColor(student.status)}`}>
                        {student.status}
                      </span>
                    </div>
                  </button>
                ))}
              
              {studentsData.filter(student => 
                editSearchTerm === "" || 
                student.idNumber.toLowerCase().includes(editSearchTerm.toLowerCase()) ||
                student.name.toLowerCase().includes(editSearchTerm.toLowerCase())
              ).length === 0 && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/40">
                      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" />
                      <path d="M15 15l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="text-white/70 mb-2">Оюутан олдсонгүй</p>
                  <p className="text-sm text-white/50">"{editSearchTerm}" гэсэн ID-тай оюутан олдсонгүй</p>
                </div>
              )}
            </div>

            <button 
              onClick={() => {
                setShowEditStudentModal(false);
                setEditSearchTerm("");
              }} 
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10"
            >
              Хаах
            </button>
          </div>
        </div>
      )}

      {/* Change Department Modal */}
      {showChangeDepartmentModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-2xl rounded-3xl border border-white/20 bg-gradient-to-br from-[#0a1628] via-[#081120] to-[#0a1628] p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Тэнхим солих</h3>
            <p className="text-sm text-white/60 mb-6">Оюутан сонгоод шинэ тэнхим сонгоно уу</p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/70 mb-2">Оюутан сонгох</label>
              <select className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-400/40 mb-4">
                <option>Оюутан сонгох</option>
                {studentsData.map((student) => (
                  <option key={student.id}>{student.name} - {student.idNumber}</option>
                ))}
              </select>

              <label className="block text-sm font-medium text-white/70 mb-2">Шинэ тэнхим</label>
              <select className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-400/40">
                <option>Тэнхим сонгох</option>
                <option>Програм хангамж</option>
                <option>Сүлжээний технологи</option>
                <option>Мэдээллийн аюулгүй байдал</option>
                <option>Мэдээлэл зүй</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowChangeDepartmentModal(false)} className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10">Хаах</button>
              <button onClick={() => { alert("Тэнхим солих функц удахгүй нэмэгдэнэ."); setShowChangeDepartmentModal(false); }} className="flex-1 rounded-xl border border-blue-400/30 bg-blue-500/20 px-4 py-3 text-sm font-medium text-blue-300 hover:bg-blue-500/30">Солих</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}