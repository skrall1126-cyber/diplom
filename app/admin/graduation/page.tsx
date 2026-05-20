"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function GraduationAdminPage() {
  const [activeMenu, setActiveMenu] = useState("Төгсөлт");
  const [userType, setUserType] = useState<"admin" | "training" | "finance" | null>(null);
  const [showRequirementModal, setShowRequirementModal] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState<string | null>(null);

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

  const graduationData = [
    { id: 1, student: "Төртэмүүлэн", program: "Програм хангамжийн инженерчлэл", year: "2026", status: "Төгсөхөд бэлэн", gpa: 3.8, credits: 120, tuitionPaid: true, diplomaRequested: true },
    { id: 2, student: "Э.Батжаргал", program: "Програм хангамжийн инженерчлэл", year: "2026", status: "Төгсөхөд бэлэн", gpa: 3.5, credits: 120, tuitionPaid: true, diplomaRequested: true },
    { id: 3, student: "Ц.Мөнхбат", program: "Сүлжээний технологи", year: "2026", status: "Төгсөхөд бэлэн", gpa: 3.2, credits: 120, tuitionPaid: true, diplomaRequested: false },
    { id: 4, student: "Д.Сүхбат", program: "Сүлжээний технологи", year: "2026", status: "Төгсөхөд бэлэн", gpa: 3.6, credits: 120, tuitionPaid: false, diplomaRequested: true },
    { id: 5, student: "Б.Ганбаяр", program: "Мэдээллийн аюулгүй байдал", year: "2026", status: "Төгсөхөд бэлэн", gpa: 3.9, credits: 120, tuitionPaid: true, diplomaRequested: true },
    { id: 6, student: "Н.Энхжаргал", program: "Мэдээллийн аюулгүй байдал", year: "2026", status: "Төгсөхөд бэлэн", gpa: 3.7, credits: 115, tuitionPaid: true, diplomaRequested: true },
  ];

  // Автоматаар шаардлага тооцоолох
  const calculateRequirements = () => {
    const totalStudents = graduationData.length;
    
    // Кредитийн шаардлага (120 кредит)
    const creditsMetCount = graduationData.filter(s => s.credits >= 120).length;
    const creditsStatus = creditsMetCount === totalStudents ? "Бүгд хангасан" : `${creditsMetCount}/${totalStudents} хангасан`;
    
    // GPA шаардлага (2.0+)
    const gpaMetCount = graduationData.filter(s => s.gpa >= 2.0).length;
    const gpaStatus = gpaMetCount === totalStudents ? "Бүгд хангасан" : `${gpaMetCount}/${totalStudents} хангасан`;
    
    // Төлбөрийн шаардлага
    const tuitionMetCount = graduationData.filter(s => s.tuitionPaid).length;
    const tuitionStatus = tuitionMetCount === totalStudents ? "Бүгд хангасан" : `${tuitionMetCount}/${totalStudents} төлсөн`;
    
    // Дипломын хүсэлт
    const diplomaMetCount = graduationData.filter(s => s.diplomaRequested).length;
    const diplomaStatus = diplomaMetCount === totalStudents ? "Бүгд хангасан" : `${diplomaMetCount}/${totalStudents} илгээсэн`;
    
    return {
      credits: { count: creditsMetCount, total: totalStudents, status: creditsStatus, allMet: creditsMetCount === totalStudents },
      gpa: { count: gpaMetCount, total: totalStudents, status: gpaStatus, allMet: gpaMetCount === totalStudents },
      tuition: { count: tuitionMetCount, total: totalStudents, status: tuitionStatus, allMet: tuitionMetCount === totalStudents },
      diploma: { count: diplomaMetCount, total: totalStudents, status: diplomaStatus, allMet: diplomaMetCount === totalStudents },
    };
  };

  const requirements = calculateRequirements();

  // Шаардлага хангаагүй оюутнуудыг олох
  const getStudentsNotMeetingRequirement = (type: string) => {
    switch(type) {
      case 'credits':
        return graduationData.filter(s => s.credits < 120);
      case 'gpa':
        return graduationData.filter(s => s.gpa < 2.0);
      case 'tuition':
        return graduationData.filter(s => !s.tuitionPaid);
      case 'diploma':
        return graduationData.filter(s => !s.diplomaRequested);
      default:
        return [];
    }
  };

  const handleRequirementClick = (type: string) => {
    setSelectedRequirement(type);
    setShowRequirementModal(true);
  };

  const getRequirementTitle = (type: string) => {
    switch(type) {
      case 'credits': return 'Кредитийн шаардлага';
      case 'gpa': return 'GPA шаардлага';
      case 'tuition': return 'Сүүлийн төлбөр';
      case 'diploma': return 'Дипломын хүсэлт';
      default: return '';
    }
  };

  const getRequirementIssue = (type: string, student: any) => {
    switch(type) {
      case 'credits': return `${student.credits}/120 кредит`;
      case 'gpa': return `GPA: ${student.gpa}`;
      case 'tuition': return 'Төлбөр төлөөгүй';
      case 'diploma': return 'Хүсэлт илгээгээгүй';
      default: return '';
    }
  };

  const upcomingCeremonies = [
    { id: 1, date: "2026-06-15", time: "10:00", location: "Үндсэн танхим", students: 45 },
    { id: 2, date: "2026-06-16", time: "14:00", location: "Үндсэн танхим", students: 38 },
  ];

  const getStatusColor = (status: string) => {
    return status === "Төгсөхөд бэлэн" 
      ? "bg-emerald-500/10 text-emerald-400" 
      : "bg-amber-500/10 text-amber-400";
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
            backgroundAttachment: "scroll",
            backgroundSize: "72%",
          }}
        >
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Graduation List */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">Төгсөгч оюутнууд</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Оюутан</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Хөтөлбөр</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Он</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">GPA</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Кредит</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Төлөв</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Үйлдэл</th>
                    </tr>
                  </thead>
                  <tbody>
                    {graduationData.map((item) => (
                      <tr key={item.id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                              <span className="text-sm font-semibold text-white">{item.student.charAt(0)}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{item.student}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-white/70">{item.program}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-white">{item.year}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-bold text-white">{item.gpa}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-white/70">{item.credits}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full border px-3 py-1 text-xs ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:text-white">
                              Засах
                            </button>
                            <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:text-white">
                              Харах
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Upcoming Ceremonies */}
            <div className="grid gap-5 lg:grid-cols-1">
              {/* Graduation Requirements */}
              <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70 mb-4">Төгсөлтийн шаардлага</h2>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {[
                    { 
                      name: "Кредитийн шаардлага", 
                      description: "120 кредит",
                      icon: "📚",
                      color: "from-blue-500 to-cyan-600",
                      status: requirements.credits.status,
                      allMet: requirements.credits.allMet,
                      type: 'credits'
                    },
                    { 
                      name: "GPA шаардлага", 
                      description: "2.0 ба түүнээс дээш",
                      icon: "📊",
                      color: "from-emerald-500 to-teal-600",
                      status: requirements.gpa.status,
                      allMet: requirements.gpa.allMet,
                      type: 'gpa'
                    },
                    { 
                      name: "Сүүлийн төлбөр", 
                      description: "Төлсөн",
                      icon: "💰",
                      color: "from-amber-500 to-orange-600",
                      status: requirements.tuition.status,
                      allMet: requirements.tuition.allMet,
                      type: 'tuition'
                    },
                    { 
                      name: "Дипломын хүсэлт", 
                      description: "Илгээсэн",
                      icon: "📋",
                      color: "from-purple-500 to-pink-600",
                      status: requirements.diploma.status,
                      allMet: requirements.diploma.allMet,
                      type: 'diploma'
                    },
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleRequirementClick(item.type)}
                      className="rounded-xl border border-white/10 bg-white/5 p-4 text-left hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                          <span className="text-xl">{item.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{item.name}</h3>
                          <p className="text-sm text-white/50">{item.description}</p>
                        </div>
                      </div>
                      <div className={`w-full rounded-lg px-4 py-2 text-sm text-center ${
                        item.allMet
                          ? "border border-emerald-400/30 bg-emerald-500/10 text-emerald-300" 
                          : "border border-amber-400/30 bg-amber-500/10 text-amber-300"
                      }`}>
                        {item.status}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Requirement Details Modal */}
          {showRequirementModal && selectedRequirement && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[24px] border border-white/10 bg-[#0a1628] p-6">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{getRequirementTitle(selectedRequirement)}</h2>
                    <p className="text-sm text-white/50 mt-1">Шаардлага хангаагүй оюутнууд</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowRequirementModal(false);
                      setSelectedRequirement(null);
                    }}
                    className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                {/* Students List */}
                <div className="space-y-3">
                  {getStudentsNotMeetingRequirement(selectedRequirement).length === 0 ? (
                    <div className="text-center py-12">
                      <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">✅</span>
                      </div>
                      <p className="text-white/70">Бүх оюутан шаардлага хангасан байна</p>
                    </div>
                  ) : (
                    getStudentsNotMeetingRequirement(selectedRequirement).map((student) => (
                      <div key={student.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                              <span className="text-lg font-semibold text-white">{student.student.charAt(0)}</span>
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white">{student.student}</p>
                              <p className="text-xs text-white/50">{student.program}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-xs text-red-300">
                              {getRequirementIssue(selectedRequirement, student)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Close Button */}
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setShowRequirementModal(false);
                      setSelectedRequirement(null);
                    }}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 hover:text-white"
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