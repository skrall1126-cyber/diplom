"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const salaryData = {
  basicSalary: 2500000,
  overtime: 350000,
  bonus: 500000,
  deductions: 75000,
  netSalary: 3275000,
  currency: "MNT",
  paymentDate: "2025-04-30",
  bankAccount: "ХААН банк ****1234",
};

const salaryHistory = [
  { month: "2025-03", basic: 2500000, overtime: 300000, bonus: 450000, deductions: 70000, net: 3180000, status: "Төлөгдсөн" },
  { month: "2025-02", basic: 2500000, overtime: 280000, bonus: 400000, deductions: 65000, net: 3115000, status: "Төлөгдсөн" },
  { month: "2025-01", basic: 2500000, overtime: 320000, bonus: 550000, deductions: 80000, net: 3290000, status: "Төлөгдсөн" },
  { month: "2024-12", basic: 2400000, overtime: 350000, bonus: 600000, deductions: 90000, net: 3260000, status: "Төлөгдсөн" },
  { month: "2024-11", basic: 2400000, overtime: 300000, bonus: 500000, deductions: 75000, net: 3125000, status: "Төлөгдсөн" },
];

const upcomingBonuses = [
  { name: "Сар бүрийн гүйцэтгэлийн урамшуулал", amount: 200000, date: "2025-05-15", status: "Хүлээгдэж байна" },
  { name: "Оюутны үнэлгээний урамшуулал", amount: 300000, date: "2025-06-30", status: "Хүлээгдэж байна" },
  { name: "Хичээлийн материал бэлдсэний урамшуулал", amount: 150000, date: "2025-05-20", status: "Баталгаажсан" },
];

export default function TeacherSalaryPage() {
  const [activeMenu, setActiveMenu] = useState("Цалин урамшуулал");
  const [view, setView] = useState<"current" | "history">("current");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("mn-MN").format(amount) + " " + salaryData.currency;
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
                <h1 className="mt-1 text-2xl font-semibold text-white">Цалин & Урамшуулал</h1>
                <p className="mt-1 text-sm text-white/50">Багшийн цалин, урамшууллын мэдээлэл</p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* View toggle */}
                <div className="flex gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-1">
                  {(["current", "history"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                        view === v
                          ? "bg-gradient-to-b from-violet-500 to-violet-700 text-white shadow-[0_4px_12px_rgba(124,58,237,0.35)]"
                          : "text-white/40 hover:text-white/70"
                      }`}
                    >
                      {v === "current" ? "Одоогийн" : "Түүх"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── CURRENT VIEW ── */}
            {view === "current" && (
              <>
                {/* Current salary card */}
                <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-6 backdrop-blur-md">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white/80">Энэ сарын цалин</p>
                      <p className="mt-1 text-xs text-white/40">2025 оны 4-р сарын цалингийн мэдээлэл</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-emerald-300">{formatCurrency(salaryData.netSalary)}</p>
                      <p className="text-[10px] text-white/30">Цэвэр цалин</p>
                    </div>
                  </div>

                  {/* Salary breakdown */}
                  <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[
                      { label: "Үндсэн цалин", value: salaryData.basicSalary, color: "text-violet-300", icon: "💰" },
                      { label: "Нэмэлт цаг", value: salaryData.overtime, color: "text-amber-300", icon: "⏰" },
                      { label: "Урамшуулал", value: salaryData.bonus, color: "text-emerald-300", icon: "🎁" },
                      { label: "Хасалт", value: salaryData.deductions, color: "text-red-300", icon: "📉" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-xl border border-white/10 bg-[#0a1428] p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{s.icon}</span>
                          <div className="flex-1">
                            <p className="text-[10px] text-white/30">{s.label}</p>
                            <p className={`mt-1 text-lg font-bold ${s.color}`}>{formatCurrency(s.value)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Payment info */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-[#0a1428] p-4">
                      <p className="text-[11px] text-white/40">Төлбөрийн мэдээлэл</p>
                      <div className="mt-2 space-y-2">
                        {[
                          { label: "Төлбөрийн огноо", value: salaryData.paymentDate },
                          { label: "Банкны данс", value: salaryData.bankAccount },
                          { label: "Төлөх дүн", value: formatCurrency(salaryData.netSalary) },
                        ].map((item) => (
                          <div key={item.label} className="flex justify-between text-sm">
                            <span className="text-white/50">{item.label}</span>
                            <span className="font-medium text-white/80">{item.value}</span>
                          </div>
                        ))}
                      </div>
                      <a
                        href="/admin/salary"
                        className="mt-4 block w-full rounded-lg border border-blue-400/30 bg-blue-500/15 px-3 py-2 text-center text-xs font-medium text-blue-300 hover:bg-blue-500/25 transition-colors"
                      >
                        Дэлгэрэнгүй харах
                      </a>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-[#0a1428] p-4">
                      <p className="text-[11px] text-white/40">Төлбөрийн төлөв</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-emerald-400" />
                          <span className="text-sm font-medium text-emerald-300">Төлөгдөхөд бэлэн</span>
                        </div>
                        <span className="text-xs text-white/40">2025-04-30</span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" />
                      </div>
                      <p className="mt-2 text-center text-[10px] text-white/30">3 хоног үлдлээ</p>
                    </div>
                  </div>
                </div>

                {/* Upcoming bonuses */}
                <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white/80">Удахгүй төлөгдөх урамшуулал</p>
                      <p className="mt-1 text-xs text-white/40">Ирээдүйн урамшууллын мэдээлэл</p>
                    </div>
                    <span className="text-xs text-white/30">{upcomingBonuses.length} урамшуулал</span>
                  </div>

                  <div className="space-y-3">
                    {upcomingBonuses.map((bonus, index) => (
                      <div key={index} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-white/90">{bonus.name}</p>
                            <p className="mt-1 text-xs text-white/50">{bonus.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-emerald-300">{formatCurrency(bonus.amount)}</p>
                            <p className={`text-[10px] ${
                              bonus.status === "Баталгаажсан" ? "text-emerald-300" : "text-amber-300"
                            }`}>
                              {bonus.status}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ── HISTORY VIEW ── */}
            {view === "history" && (
              <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white/80">Цалингийн түүх</p>
                    <p className="mt-1 text-xs text-white/40">Өмнөх саруудын цалингийн мэдээлэл</p>
                  </div>
                  <span className="text-xs text-white/30">{salaryHistory.length} сар</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02]">
                        {["Сар", "Үндсэн цалин", "Нэмэлт цаг", "Урамшуулал", "Хасалт", "Цэвэр цалин", "Төлөв"].map((h) => (
                          <th key={h} className="px-3 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white/35 text-center first:text-left whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {salaryHistory.map((salary, i) => (
                        <tr key={salary.month} className={`border-b border-white/[0.05] transition-colors hover:bg-white/[0.02] ${i % 2 === 1 ? "bg-white/[0.01]" : ""}`}>
                          <td className="px-3 py-3">
                            <p className="text-sm font-medium text-white/85">{salary.month}</p>
                          </td>
                          <td className="px-3 py-3 text-center text-sm text-white/60">{formatCurrency(salary.basic)}</td>
                          <td className="px-3 py-3 text-center text-sm text-amber-300">{formatCurrency(salary.overtime)}</td>
                          <td className="px-3 py-3 text-center text-sm text-emerald-300">{formatCurrency(salary.bonus)}</td>
                          <td className="px-3 py-3 text-center text-sm text-red-300">{formatCurrency(salary.deductions)}</td>
                          <td className="px-3 py-3 text-center">
                            <span className="text-base font-bold text-white">{formatCurrency(salary.net)}</span>
                          </td>
                          <td className="px-3 py-3 text-center">
                            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-1 text-[10px] font-medium text-emerald-300">
                              {salary.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary */}
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    { 
                      label: "Нийт орлого", 
                      value: formatCurrency(salaryHistory.reduce((sum, s) => sum + s.net, 0)), 
                      color: "text-emerald-300",
                      icon: "📈"
                    },
                    { 
                      label: "Дундаж цалин", 
                      value: formatCurrency(Math.round(salaryHistory.reduce((sum, s) => sum + s.net, 0) / salaryHistory.length)), 
                      color: "text-violet-300",
                      icon: "📊"
                    },
                    { 
                      label: "Хамгийн өндөр", 
                      value: formatCurrency(Math.max(...salaryHistory.map(s => s.net))), 
                      color: "text-amber-300",
                      icon: "⭐"
                    },
                    { 
                      label: "Нийт урамшуулал", 
                      value: formatCurrency(salaryHistory.reduce((sum, s) => sum + s.bonus, 0)), 
                      color: "text-cyan-300",
                      icon: "🎁"
                    },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-white/10 bg-[#0a1428] p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{s.icon}</span>
                        <div className="flex-1">
                          <p className="text-[10px] text-white/30">{s.label}</p>
                          <p className={`mt-1 text-lg font-bold ${s.color}`}>{s.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}