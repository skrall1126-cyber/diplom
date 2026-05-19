"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function BonusDeductions() {
  const [activeMenu, setActiveMenu] = useState("Урамшуулал, суутгал");
  const [userType, setUserType] = useState<"admin" | "training" | "finance" | "hr" | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedType = localStorage.getItem("userType") as "admin" | "training" | "finance" | "hr" | null;
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
    if (userType === "hr") return "/admin/hr-dashboard";
    return "/admin/dashboard";
  };

  const getAdminTitle = () => {
    if (userType === "training") return "Сургалтын админ";
    if (userType === "finance") return "Санхүүгийн админ";
    if (userType === "hr") return "Хүний нөөцийн албаны админ";
    return "Бүрэн эрхт админ";
  };

  const bonusDeductionsData = [
    { id: 1, employee: "Б.Ганбаяр", type: "Урамшуулал", amount: 500000, reason: "Шилдэг ажилтан", date: "2024-03-15", status: "Төлсөн" },
    { id: 2, employee: "Н.Энхжаргал", type: "Суутгал", amount: 150000, reason: "Хожим ирсэн", date: "2024-03-14", status: "Хүлээгдэж буй" },
    { id: 3, employee: "Г.Бат-Эрдэнэ", type: "Урамшуулал", amount: 300000, reason: "Төсөл амжилттай", date: "2024-03-13", status: "Төлсөн" },
    { id: 4, employee: "Л.Хүслэн", type: "Суутгал", amount: 200000, reason: "Татвар", date: "2024-03-12", status: "Төлсөн" },
    { id: 5, employee: "Төртэмүүлэн", type: "Урамшуулал", amount: 400000, reason: "Шилдэг санаа", date: "2024-03-11", status: "Төлсөн" },
    { id: 6, employee: "Э.Батжаргал", type: "Суутгал", amount: 100000, reason: "Нэмэлт даатгал", date: "2024-03-10", status: "Хүлээгдэж буй" },
    { id: 7, employee: "Ц.Мөнхбат", type: "Урамшуулал", amount: 250000, reason: "Хамтын ажиллагаа", date: "2024-03-09", status: "Төлсөн" },
    { id: 8, employee: "Д.Сүхбат", type: "Суутгал", amount: 180000, reason: "Тэтгэмж суутгал", date: "2024-03-08", status: "Төлсөн" },
  ];

  const summaryStats = {
    totalBonus: 1450000,
    totalDeductions: 630000,
    pending: 2,
    employees: 8
  };

  const getTypeColor = (type: string) => {
    return type === "Урамшуулал" 
      ? "bg-emerald-500/10 text-emerald-400" 
      : "bg-rose-500/10 text-rose-400";
  };

  const getStatusColor = (status: string) => {
    return status === "Төлсөн" 
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
            {/* Header */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">Урамшуулал, суутгал</h1>
                  <p className="mt-1 text-xs text-white/45">Хүний нөөцийн албаны урамшуулал, суутгалын удирдлага</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2">
                    <p className="text-sm font-medium text-white">{getAdminTitle()}</p>
                    <p className="text-xs text-white/40">Урамшуулал, суутгал</p>
                  </div>
                  <Link href={getBackLink()} className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:text-white">
                    Буцах
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Нийт урамшуулал", value: `${(summaryStats.totalBonus / 1000000).toFixed(1)} сая ₮`, icon: "💰", color: "bg-emerald-500" },
                { label: "Нийт суутгал", value: `${(summaryStats.totalDeductions / 1000000).toFixed(1)} сая ₮`, icon: "📉", color: "bg-rose-500" },
                { label: "Хүлээгдэж буй", value: summaryStats.pending, icon: "⏳", color: "bg-amber-500" },
                { label: "Ажилтан", value: summaryStats.employees, icon: "👥", color: "bg-blue-500" },
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

            {/* Bonus & Deductions List */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">Урамшуулал, суутгалын жагсаалт</h2>
                <div className="flex gap-2">
                  <button className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:text-white">
                    Тайлан татах
                  </button>
                  <button className="rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-500/25">
                    Шинэ урамшуулал нэмэх
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Ажилтан</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Төрөл</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Дүн</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Шалтгаан</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Огноо</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Төлөв</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Үйлдэл</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bonusDeductionsData.map((item) => (
                      <tr key={item.id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                              <span className="text-sm font-semibold text-white">{item.employee.charAt(0)}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{item.employee}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full border px-3 py-1 text-xs ${getTypeColor(item.type)}`}>
                            {item.type}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <p className={`text-sm font-bold ${item.type === "Урамшуулал" ? "text-emerald-400" : "text-rose-400"}`}>
                            {item.amount.toLocaleString()} ₮
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-white/80">{item.reason}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-white/80">{item.date}</p>
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

            {/* Analysis */}
            <div className="grid gap-5 lg:grid-cols-2">
              {/* Type Distribution */}
              <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70 mb-4">Төрлийн тархалт</h2>
                <div className="space-y-4">
                  {[
                    { type: "Урамшуулал", count: 4, amount: 1450000, color: "from-emerald-400 to-green-300" },
                    { type: "Суутгал", count: 4, amount: 630000, color: "from-rose-400 to-red-300" },
                  ].map((item, index) => (
                    <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-white">{item.type}</p>
                        <span className="text-sm font-bold text-white">{item.count} бичлэг</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-white/50 mb-1">
                        <span>Нийт дүн: {item.amount.toLocaleString()} ₮</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                          style={{ width: `${(item.count / bonusDeductionsData.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Distribution */}
              <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70 mb-4">Төлөвийн тархалт</h2>
                <div className="space-y-4">
                  {[
                    { status: "Төлсөн", count: 6, color: "bg-emerald-500" },
                    { status: "Хүлээгдэж буй", count: 2, color: "bg-amber-500" },
                  ].map((item, index) => (
                    <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${item.color}`} />
                          <p className="text-sm font-medium text-white">{item.status}</p>
                        </div>
                        <span className="text-sm font-bold text-white">{item.count} бичлэг</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-white/50 mb-1">
                        <span>Нийт: {((item.count / bonusDeductionsData.length) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full ${item.color}`}
                          style={{ width: `${(item.count / bonusDeductionsData.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Management Tools */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70 mb-4">Удирдлагын хэрэгслүүд</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { 
                    name: "Урамшуулал нэмэх", 
                    description: "Шинэ урамшуулал бүртгэх",
                    icon: "💰",
                    color: "from-emerald-500 to-teal-600"
                  },
                  { 
                    name: "Суутгал нэмэх", 
                    description: "Шинэ суутгал бүртгэх",
                    icon: "📉",
                    color: "from-rose-500 to-red-600"
                  },
                  { 
                    name: "Тайлан гаргах", 
                    description: "Урамшуулал, суутгалын тайлан",
                    icon: "📊",
                    color: "from-amber-500 to-orange-600"
                  },
                  { 
                    name: "Төлбөр хийх", 
                    description: "Урамшуулал төлөх",
                    icon: "💳",
                    color: "from-blue-500 to-cyan-600"
                  },
                  { 
                    name: "Ажилтан сонгох", 
                    description: "Урамшуулал олгох ажилтан сонгох",
                    icon: "👥",
                    color: "from-purple-500 to-pink-600"
                  },
                  { 
                    name: "Татварын тайлан", 
                    description: "Татварын тайлан гаргах",
                    icon: "📋",
                    color: "from-indigo-500 to-blue-600"
                  },
                ].map((tool, index) => (
                  <div key={index} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${tool.color} flex items-center justify-center`}>
                        <span className="text-xl">{tool.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{tool.name}</h3>
                        <p className="text-sm text-white/50">{tool.description}</p>
                      </div>
                    </div>
                    <button className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:text-white">
                      Ашиглах
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}