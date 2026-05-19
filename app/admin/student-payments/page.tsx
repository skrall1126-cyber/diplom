"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function StudentPayments() {
  const [activeMenu, setActiveMenu] = useState("Оюутны төлбөр");
  const [activeTab, setActiveTab] = useState<"invoices" | "balance" | "overdue" | "history" | "discount" | "scholarship">("invoices");
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("userType", "finance");
      localStorage.setItem("adminType", "finance-admin");
    }
  }, []);

  const tabs = [
    { id: "invoices", label: "Ерөнхий мэдээлэл", icon: "📄" },
    { id: "balance", label: "Үлдэгдэл", icon: "💰" },
    { id: "overdue", label: "Хугацаа хэтэрсэн", icon: "⚠️" },
    { id: "history", label: "Гүйлгээний түүх", icon: "📋" },
    { id: "discount", label: "Хөнгөлөлт", icon: "🎁" },
    { id: "scholarship", label: "Тэтгэлэг", icon: "🏆" },
  ];

  // Sample data
  const students = [
    { id: "S2024001", name: "Б.Бат-Эрдэнэ", total: 2500000, paid: 2500000, balance: 0, status: "paid", discount: 0, scholarship: 0, lastPayment: "2024-05-05" },
    { id: "S2024002", name: "Ц.Энхтулга", total: 2500000, paid: 1500000, balance: 1000000, status: "partial", discount: 0, scholarship: 0, lastPayment: "2024-04-15" },
    { id: "S2024003", name: "Л.Нямдаваа", total: 2500000, paid: 2500000, balance: 0, status: "paid", discount: 0, scholarship: 0, lastPayment: "2024-05-04" },
    { id: "S2024004", name: "Д.Ганбаатар", total: 2500000, paid: 500000, balance: 2000000, status: "overdue", discount: 0, scholarship: 0, lastPayment: "2024-03-10" },
    { id: "S2024005", name: "С.Эрдэнэтуяа", total: 2500000, paid: 2500000, balance: 0, status: "paid", discount: 200000, scholarship: 0, lastPayment: "2024-05-03" },
    { id: "S2024006", name: "Ж.Батжаргал", total: 2500000, paid: 1000000, balance: 1500000, status: "partial", discount: 0, scholarship: 500000, lastPayment: "2024-04-20" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-emerald-500/10 text-emerald-400";
      case "partial": return "bg-amber-500/10 text-amber-400";
      case "overdue": return "bg-red-500/10 text-red-400";
      default: return "bg-gray-500/10 text-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid": return "Төлсөн";
      case "partial": return "Хэсэгчлэн";
      case "overdue": return "Хугацаа хэтэрсэн";
      default: return "Тодорхойгүй";
    }
  };

  const formatMoney = (amount: number) => {
    return `₮ ${amount.toLocaleString()}`;
  };

  const renderContent = () => {
    switch (activeTab) {
      case "invoices":
        return (
          <div className="space-y-6">
            {/* Оюутны төлбөрийн мэдээлэл */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Оюутны төлбөрийн мэдээлэл</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Оюутан</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Төлөлтийн явц</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Нийт төлбөр</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Төлсөн</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Үлдэгдэл</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(student => {
                      const progress = (student.paid / student.total) * 100;
                      return (
                        <tr key={student.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                          <td className="py-4">
                            <div>
                              <p className="font-medium text-white">{student.name}</p>
                              <p className="text-xs text-white/50">{student.id}</p>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="w-32">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold text-white">{progress.toFixed(0)}%</span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${progress === 100 ? 'bg-emerald-500' : progress > 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 text-white">{formatMoney(student.total)}</td>
                          <td className="py-4 text-emerald-400">{formatMoney(student.paid)}</td>
                          <td className="py-4 text-amber-400">{formatMoney(student.balance)}</td>
                          <td className="py-4">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(student.status)}`}>
                              {getStatusText(student.status)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Банкны дансны мэдээлэл */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-white/50 mb-1">ДАНС / ACCOUNT</p>
                  <p className="text-sm font-mono text-white/80">5302 864 281</p>
                </div>
                <button className="text-white/60 hover:text-white transition-colors">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M6 9l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <p className="text-3xl font-bold text-white mb-1">
                ₮ 47,300,000
              </p>
              <p className="text-xs text-white/50">Үлдэгдэл</p>
            </div>

            {/* Санхүүгийн тойм */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[#081120]/70 p-4 backdrop-blur-md">
                <p className="text-xs text-white/50 mb-2">Нийт орлого</p>
                <p className="text-xl font-bold text-emerald-400">₮ 245,800,000</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#081120]/70 p-4 backdrop-blur-md">
                <p className="text-xs text-white/50 mb-2">Нийт зардал</p>
                <p className="text-xl font-bold text-red-400">₮ 198,500,000</p>
              </div>
            </div>
          </div>
        );

      case "balance":
        const studentsWithBalance = students.filter(s => s.balance > 0);
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Үлдэгдэл</h3>
            {studentsWithBalance.length === 0 ? (
              <div className="text-center py-12 rounded-xl border border-white/10 bg-[#081120]/70">
                <p className="text-white/40 text-sm">Үлдэгдэлтэй оюутан байхгүй</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {studentsWithBalance.map(student => (
                  <div key={student.id} className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-white">{student.name}</p>
                        <p className="text-xs text-white/50">{student.id}</p>
                      </div>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(student.status)}`}>
                        {getStatusText(student.status)}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-white/50">Нийт:</span>
                        <span className="text-sm text-white">{formatMoney(student.total)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-white/50">Төлсөн:</span>
                        <span className="text-sm text-emerald-400">{formatMoney(student.paid)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-white/50">Үлдэгдэл:</span>
                        <span className="text-sm font-bold text-amber-400">{formatMoney(student.balance)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "overdue":
        const overdueStudents = students.filter(s => s.status === "overdue");
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Хугацаа хэтэрсэн төлбөр</h3>
            {overdueStudents.length === 0 ? (
              <div className="text-center py-12 rounded-xl border border-white/10 bg-[#081120]/70">
                <p className="text-white/40 text-sm">Хугацаа хэтэрсэн төлбөр байхгүй</p>
              </div>
            ) : (
              <div className="space-y-4">
                {overdueStudents.map(student => (
                  <div key={student.id} className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-white">{student.name}</p>
                        <p className="text-xs text-white/50">{student.id}</p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-400">
                        Хугацаа хэтэрсэн
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-white/50">Үлдэгдэл:</span>
                        <span className="text-sm font-bold text-red-400">{formatMoney(student.balance)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-white/50">Сүүлийн төлбөр:</span>
                        <span className="text-sm text-white/70">{student.lastPayment}</span>
                      </div>
                    </div>
                    <button className="mt-3 w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/70 hover:text-white">
                      Мэдэгдэл илгээх
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "history":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Гүйлгээний түүх</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-3 text-left text-sm font-medium text-white/50">Огноо</th>
                    <th className="pb-3 text-left text-sm font-medium text-white/50">Оюутан</th>
                    <th className="pb-3 text-left text-sm font-medium text-white/50">Дүн</th>
                    <th className="pb-3 text-left text-sm font-medium text-white/50">Төлбөрийн арга</th>
                    <th className="pb-3 text-left text-sm font-medium text-white/50">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {students.filter(s => s.paid > 0).map(student => (
                    <tr key={student.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="py-4 text-white">{student.lastPayment}</td>
                      <td className="py-4">
                        <div>
                          <p className="font-medium text-white">{student.name}</p>
                          <p className="text-xs text-white/50">{student.id}</p>
                        </div>
                      </td>
                      <td className="py-4 text-emerald-400">{formatMoney(student.paid)}</td>
                      <td className="py-4 text-white/70">Банкны шилжүүлэг</td>
                      <td className="py-4">
                        <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                          Амжилттай
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "discount":
        const discountStudents = students.filter(s => s.discount > 0);
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Хөнгөлөлтийн удирдлага</h3>
            {discountStudents.length === 0 ? (
              <div className="text-center py-12 rounded-xl border border-white/10 bg-[#081120]/70">
                <p className="text-white/40 text-sm">Хөнгөлөлт авсан оюутан байхгүй</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {discountStudents.map(student => (
                  <div key={student.id} className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-white">{student.name}</p>
                        <p className="text-xs text-white/50">{student.id}</p>
                      </div>
                      <span className="text-lg">🎁</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-white/50">Хөнгөлөлт:</span>
                        <span className="text-sm font-bold text-emerald-400">{formatMoney(student.discount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-white/50">Төрөл:</span>
                        <span className="text-sm text-white/70">Дундаж дүн</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "scholarship":
        const scholarshipStudents = students.filter(s => s.scholarship > 0);
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Тэтгэлгийн жагсаалт</h3>
            {scholarshipStudents.length === 0 ? (
              <div className="text-center py-12 rounded-xl border border-white/10 bg-[#081120]/70">
                <p className="text-white/40 text-sm">Тэтгэлэг авсан оюутан байхгүй</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {scholarshipStudents.map(student => (
                  <div key={student.id} className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-white">{student.name}</p>
                        <p className="text-xs text-white/50">{student.id}</p>
                      </div>
                      <span className="text-lg">🏆</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-white/50">Тэтгэлэг:</span>
                        <span className="text-sm font-bold text-amber-400">{formatMoney(student.scholarship)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-white/50">Төрөл:</span>
                        <span className="text-sm text-white/70">Сурлагын тэтгэлэг</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
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
            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Нийт оюутан", value: students.length, icon: "👥", color: "bg-blue-500" },
                { label: "Төлсөн", value: students.filter(s => s.status === "paid").length, icon: "✅", color: "bg-emerald-500" },
                { label: "Хэсэгчлэн", value: students.filter(s => s.status === "partial").length, icon: "⏳", color: "bg-amber-500" },
                { label: "Хугацаа хэтэрсэн", value: students.filter(s => s.status === "overdue").length, icon: "⚠️", color: "bg-red-500" },
              ].map((stat, index) => (
                <div key={index} className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
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

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto bg-[#081120]/70 rounded-xl p-1 border border-white/10">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
