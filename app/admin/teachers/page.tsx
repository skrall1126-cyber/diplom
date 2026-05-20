"use client";

import { useState, useEffect } from "react";
import { withAuth } from '@/contexts/AuthContext';
import { teachersApi } from '@/lib/api';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

function TeachersPage() {
  const [activeMenu, setActiveMenu] = useState("Багшийн жагсаалт");
  const [userType, setUserType] = useState<"admin" | "training" | "finance" | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // API state
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedTeacher, setSelectedTeacher] = useState<any | null>(null);

  // Load teachers from API
  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await teachersApi.getAll();
      
      if (result.error) {
        setError(result.error);
        return;
      }
      
      if (result.data) {
        setTeachers(result.data.teachers || []);
      }
    } catch (err: any) {
      setError(err.message || 'Багш нарыг ачаалахад алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedType = localStorage.getItem("userType") as "admin" | "training" | "finance" | null;
      setUserType(savedType);
      
      if (!savedType && window.location.pathname.startsWith("/admin/")) {
        localStorage.setItem("userType", "admin");
        setUserType("admin");
      }
    }
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#06030f]">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Багш нарыг ачаалж байна...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#06030f]">
        <div className="text-white text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-red-400 mb-4 text-xl">Алдаа гарлаа</p>
          <p className="text-white/60 mb-6">{error}</p>
          <button 
            onClick={loadTeachers}
            className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Дахин оролдох
          </button>
        </div>
      </div>
    );
  }

  const teachersData = teachers;

  const summaryStats = {
    totalTeachers: teachersData.length,
    active: teachersData.filter((t: any) => t.user?.status === "ACTIVE").length,
    averageRating: teachersData.length > 0 ? 4.5 : 0, // Mock rating for now
    totalStudents: 0 // Will be calculated from actual data
  };

  const filteredTeachers = teachersData.filter((teacher: any) => {
    const searchLower = searchTerm.toLowerCase();
    const fullName = `${teacher.user?.first_name} ${teacher.user?.last_name}`.toLowerCase();
    return (
      fullName.includes(searchLower) ||
      teacher.teacher_id?.toLowerCase().includes(searchLower) ||
      teacher.department?.name?.toLowerCase().includes(searchLower) ||
      teacher.user?.email?.toLowerCase().includes(searchLower) ||
      teacher.user?.phone?.includes(searchTerm)
    );
  });

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
            {/* Teachers List */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">Багш нарын жагсаалт</h2>
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
                    placeholder="Багшийн нэр, ID, тэнхим, имэйл, утас, хичээлээр хайх..."
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
                    {filteredTeachers.length === teachersData.length 
                      ? `Нийт ${teachersData.length} багш`
                      : `${filteredTeachers.length} багш олдлоо (нийт ${teachersData.length})`
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
                {filteredTeachers.map((teacher) => (
                  <div key={teacher.id} className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">{teacher.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{teacher.name}</p>
                          <p className="text-xs text-white/50">{teacher.idNumber}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/50">Тэнхим:</span>
                        <span className="text-xs text-white/80">{teacher.department}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/50">Албан тушаал:</span>
                        <span className="text-xs text-white/80">{teacher.position}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/50">Туршлага:</span>
                        <span className="text-sm font-bold text-blue-400">{teacher.experience} жил</span>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-3 mb-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white/40">
                            <path d="M2 2h8v8H2V2z" stroke="currentColor" strokeWidth="1" />
                            <path d="M4 1v2M8 1v2M2 4h8" stroke="currentColor" strokeWidth="1" />
                          </svg>
                          <span className="text-xs text-white/60">{teacher.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white/40">
                            <path d="M2 2h8v8H2V2z" stroke="currentColor" strokeWidth="1" />
                          </svg>
                          <span className="text-xs text-white/60">{teacher.phone}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setSelectedTeacher(teacher)}
                      className="w-full rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-3 py-2.5 text-sm font-medium text-emerald-300 hover:bg-emerald-500/25 transition-colors"
                    >
                      Дэлгэрэнгүй
                    </button>
                  </div>
                ))}
              </div>
              
              {/* No results message */}
              {filteredTeachers.length === 0 && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/40">
                      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" />
                      <path d="M15 15l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="text-white/70 mb-2">Хайлтын үр дүн олдсонгүй</p>
                  <p className="text-sm text-white/50">"{searchTerm}" гэсэн утгатай багш олдсонгүй</p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="mt-4 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:text-white"
                  >
                    Хайлт цэвэрлэх
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Teacher Detail Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-[#0a1628] via-[#081120] to-[#0a1628] shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent pointer-events-none" />
            
            {/* Close button */}
            <div className="absolute right-4 top-4 flex gap-2 z-20">
              <button
                onClick={() => setSelectedTeacher(null)}
                className="group rounded-xl border border-white/20 bg-white/10 p-2.5 text-white/70 hover:text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200 shadow-lg"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="group-hover:rotate-90 transition-transform duration-200">
                  <path d="M5 5l10 10M15 5l-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="relative max-h-[92vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 z-10 border-b border-white/10 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 backdrop-blur-xl px-8 py-6">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center ring-4 ring-blue-500/30 shadow-xl">
                      <span className="text-3xl font-bold text-white">{selectedTeacher.name.charAt(0)}</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-emerald-500 border-2 border-[#081120] flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 6l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-1">{selectedTeacher.name}</h2>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm text-white/60 font-mono">{selectedTeacher.idNumber}</span>
                      <span className="h-1 w-1 rounded-full bg-white/30" />
                      <span className="text-sm text-white/60">{selectedTeacher.position}</span>
                      <span className="h-1 w-1 rounded-full bg-white/30" />
                      <span className="text-sm text-white/60">{selectedTeacher.department}</span>
                    </div>
                  </div>
                </div>
              </div>

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
                      <p className="text-base font-medium text-white group-hover:text-blue-300 transition-colors">{selectedTeacher.name}</p>
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Багшийн ID</p>
                      <p className="text-base font-mono font-medium text-white/60">{selectedTeacher.idNumber}</p>
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Имэйл хаяг</p>
                      <p className="text-base font-medium text-white group-hover:text-blue-300 transition-colors">{selectedTeacher.email}</p>
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Утасны дугаар</p>
                      <p className="text-base font-medium text-white group-hover:text-blue-300 transition-colors">{selectedTeacher.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Teaching Information */}
              <div className="px-8 py-6 bg-gradient-to-br from-purple-500/5 to-transparent">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-1 w-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Багшлах мэдээлэл</h3>
                </div>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-6 backdrop-blur-sm">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Тэнхим</p>
                      <p className="text-base font-medium text-white group-hover:text-purple-300 transition-colors">{selectedTeacher.department}</p>
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Албан тушаал</p>
                      <p className="text-base font-medium text-white group-hover:text-purple-300 transition-colors">{selectedTeacher.position}</p>
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Туршлага</p>
                      <p className="text-2xl font-bold text-blue-400">{selectedTeacher.experience} жил</p>
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Төлөв</p>
                      <span className="inline-block rounded-xl border border-emerald-400/40 bg-emerald-500/20 px-4 py-1.5 text-sm font-medium text-emerald-300">
                        {selectedTeacher.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Courses */}
              <div className="px-8 py-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-1 w-10 rounded-full bg-gradient-to-r from-amber-500 to-amber-600" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Заадаг хичээлүүд</h3>
                </div>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-6 backdrop-blur-sm">
                  <div className="flex flex-wrap gap-3">
                    {selectedTeacher.courses.map((course: any, index: number) => (
                      <div key={index} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                        <p className="text-sm font-medium text-white">{course}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Assigned Classes */}
              <div className="px-8 py-6 bg-gradient-to-br from-emerald-500/5 to-transparent">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-1 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Хамааралтай ангиуд</h3>
                </div>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-6 backdrop-blur-sm">
                  {selectedTeacher.assignedClasses && selectedTeacher.assignedClasses.length > 0 ? (
                    <div className="space-y-3">
                      {selectedTeacher.assignedClasses.map((className, index) => (
                        <div key={index} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
                              <span className="text-sm font-semibold text-white">{className.split('-')[0]}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{className}</p>
                              <p className="text-xs text-white/50">{selectedTeacher.department}</p>
                            </div>
                          </div>
                          {userType !== "finance" && (
                            <button
                              onClick={() => {
                                if (confirm(`${selectedTeacher.name} багшийг ${className} ангитай харилцахыг болиулах уу?`)) {
                                  alert(`${className} ангитай харилцах амжилттай болиулагдлаа.\n\nБагшийн хуваарь шинэчлэгдсэн.`);
                                }
                              }}
                              className="rounded-lg border border-red-400/30 bg-red-500/15 px-4 py-2 text-sm font-medium text-red-300 hover:bg-red-500/25 transition-colors"
                            >
                              Харилцах болиулах
                            </button>
                          )}
                        </div>
                      ))}
                      <div className="mt-4 rounded-lg border border-blue-400/30 bg-blue-500/10 p-4">
                        <p className="text-sm text-blue-300">
                          💡 Нийт {selectedTeacher.assignedClasses.length} ангид хамааралтай байна
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-white/40">
                          <path d="M16 8v8M16 20v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </div>
                      <p className="text-white/70 mb-2">Ангид хамааралгүй</p>
                      <p className="text-sm text-white/50">
                        Энэ багш одоогоор ямар ч ангид хамааралгүй байна
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// Protected page - only SUPER_ADMIN, TRAINING_ADMIN can access
export default withAuth(TeachersPage, ['SUPER_ADMIN', 'TRAINING_ADMIN']);
