"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FinancialReportsPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<string | null>(null);
  const [reportType, setReportType] = useState("Балансын тайлан");
  const [period, setPeriod] = useState("Энэ сар");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedType = localStorage.getItem("userType");
      setUserType(savedType);

      // Зөвхөн бүрэн эрхт админ эсвэл санхүүгийн албаны админ энэ хуудсыг харж болно
      if (savedType !== "admin" && savedType !== "finance") {
        router.push("/admin/dashboard");
      }
    }
  }, [router]);

  const backLink = userType === "admin" ? "/admin/dashboard" : 
                   userType === "finance" ? "/admin/finance-dashboard" : 
                   "/admin/dashboard";

  const reportTypes = ["Балансын тайлан", "Орлогын тайлан", "Мөнгөн гүйлгээний тайлан", "Өөрчлөлтийн тайлан"];
  const periods = ["Энэ сар", "Өнгөрсөн сар", "Энэ улирал", "Өнгөрсөн улирал", "Энэ жил", "Өнгөрсөн жил"];

  const financialData = {
    assets: [
      { name: "Бэлэн мөнгө", amount: 125000000, change: 5.2 },
      { name: "Банкны данс", amount: 450000000, change: 8.7 },
      { name: "Авлагын үлдэгдэл", amount: 85000000, change: -3.1 },
      { name: "Нөөц материал", amount: 35000000, change: 2.4 },
      { name: "Үндсэн хөрөнгө", amount: 1200000000, change: 1.8 },
    ],
    liabilities: [
      { name: "Өр төлбөр", amount: 65000000, change: -2.3 },
      { name: "Банкны зээл", amount: 300000000, change: 0.0 },
      { name: "Цалингийн өр", amount: 24580000, change: 0.0 },
      { name: "Татварын өр", amount: 18500000, change: 4.5 },
    ],
    equity: [
      { name: "Хувьцааны капитал", amount: 800000000, change: 0.0 },
      { name: "Нөөц капитал", amount: 120000000, change: 3.2 },
      { name: "Хуримтлагдсан ашиг", amount: 285000000, change: 12.5 },
    ],
  };

  const totalAssets = financialData.assets.reduce((sum, item) => sum + item.amount, 0);
  const totalLiabilities = financialData.liabilities.reduce((sum, item) => sum + item.amount, 0);
  const totalEquity = financialData.equity.reduce((sum, item) => sum + item.amount, 0);
  const netIncome = 78500000; // Цэвэр ашиг

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0118] to-[#1a0b2e] p-6">
      <div className="mx-auto max-w-6xl">
        {/* Буцах холбоос */}
        <div className="mb-6">
          <Link
            href={backLink}
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Буцах
          </Link>
        </div>

        {/* Гарчиг */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Санхүүгийн тайлан</h1>
          <p className="text-white/60">
            Балансын тайлан, орлогын тайлан, мөнгөн гүйлгээний тайлан
          </p>
        </div>

        {/* Шүүлтүүр */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-sm font-medium text-white/70 mb-2">
              Тайлангийн төрөл
            </label>
            <div className="flex flex-wrap gap-2">
              {reportTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setReportType(type)}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    reportType === type
                      ? "bg-violet-600 text-white"
                      : "bg-white/[0.08] text-white/70 hover:bg-white/[0.12] hover:text-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full md:w-64">
            <label className="block text-sm font-medium text-white/70 mb-2">
              Хугацаа
            </label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30"
            >
              {periods.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Санхүүгийн үзүүлэлтүүд */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Нийт хөрөнгө</h3>
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1v18M1 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">₮ {totalAssets.toLocaleString()}</div>
              <div className="text-sm text-emerald-300">+5.2% өмнөх сараас</div>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Нийт өр төлбөр</h3>
              <div className="p-2 bg-rose-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1v18M1 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">₮ {totalLiabilities.toLocaleString()}</div>
              <div className="text-sm text-rose-300">-2.3% өмнөх сараас</div>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Өмчлөгчийн эрх</h3>
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1v18M1 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">₮ {totalEquity.toLocaleString()}</div>
              <div className="text-sm text-blue-300">+4.8% өмнөх сараас</div>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Цэвэр ашиг</h3>
              <div className="p-2 bg-violet-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1v18M1 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">₮ {netIncome.toLocaleString()}</div>
              <div className="text-sm text-violet-300">Энэ сар</div>
            </div>
          </div>
        </div>

        {/* Балансын тайлан */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Хөрөнгө */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h3 className="text-xl font-semibold text-white mb-6">Хөрөнгө</h3>
            <div className="space-y-4">
              {financialData.assets.map((asset, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg">
                  <div>
                    <div className="text-white font-medium">{asset.name}</div>
                    <div className="text-sm text-white/50">₮ {asset.amount.toLocaleString()}</div>
                  </div>
                  <div className={`text-sm ${asset.change >= 0 ? "text-emerald-300" : "text-rose-300"}`}>
                    {asset.change >= 0 ? "+" : ""}{asset.change}%
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="text-white font-semibold">Нийт хөрөнгө</div>
                  <div className="text-white font-bold">₮ {totalAssets.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Өр төлбөр ба өмчлөгчийн эрх */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h3 className="text-xl font-semibold text-white mb-6">Өр төлбөр ба өмчлөгчийн эрх</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-medium mb-4">Өр төлбөр</h4>
                <div className="space-y-3">
                  {financialData.liabilities.map((liability, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg">
                      <div>
                        <div className="text-white font-medium">{liability.name}</div>
                        <div className="text-sm text-white/50">₮ {liability.amount.toLocaleString()}</div>
                      </div>
                      <div className={`text-sm ${liability.change >= 0 ? "text-rose-300" : "text-emerald-300"}`}>
                        {liability.change >= 0 ? "+" : ""}{liability.change}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-4">Өмчлөгчийн эрх</h4>
                <div className="space-y-3">
                  {financialData.equity.map((equity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg">
                      <div>
                        <div className="text-white font-medium">{equity.name}</div>
                        <div className="text-sm text-white/50">₮ {equity.amount.toLocaleString()}</div>
                      </div>
                      <div className={`text-sm ${equity.change >= 0 ? "text-emerald-300" : "text-rose-300"}`}>
                        {equity.change >= 0 ? "+" : ""}{equity.change}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-white font-semibold">Нийт өр төлбөр</div>
                  <div className="text-white font-bold">₮ {totalLiabilities.toLocaleString()}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-white font-semibold">Нийт өмчлөгчийн эрх</div>
                  <div className="text-white font-bold">₮ {totalEquity.toLocaleString()}</div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="text-white font-semibold">Нийт өр төлбөр + өмчлөгчийн эрх</div>
                  <div className="text-white font-bold">₮ {(totalLiabilities + totalEquity).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Орлогын тайлан */}
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 mb-8">
          <h3 className="text-xl font-semibold text-white mb-6">Орлогын тайлан</h3>
          <div className="space-y-4">
            {[
              { category: "Орлого", items: [
                { name: "Сургалтын төлбөр", amount: 185000000 },
                { name: "Тэтгэлгийн төлбөр", amount: 25000000 },
                { name: "Номын сангийн торгууль", amount: 5000000 },
                { name: "Бусад орлого", amount: 10000000 },
              ]},
              { category: "Зардал", items: [
                { name: "Цалин", amount: 24580000 },
                { name: "Байрны түрээс", amount: 15000000 },
                { name: "Засвар үйлчилгээ", amount: 5000000 },
                { name: "Ном, материал", amount: 8000000 },
                { name: "Техник хэрэгсэл", amount: 12000000 },
                { name: "Бусад зардал", amount: 7000000 },
              ]},
            ].map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-3">
                <h4 className="text-white font-medium">{section.category}</h4>
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg">
                    <div className="text-white/80">{item.name}</div>
                    <div className={`font-medium ${section.category === "Орлого" ? "text-emerald-300" : "text-rose-300"}`}>
                      ₮ {item.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <div className="text-white font-semibold">Нийт {section.category.toLowerCase()}</div>
                  <div className={`font-bold ${section.category === "Орлого" ? "text-emerald-300" : "text-rose-300"}`}>
                    ₮ {section.items.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
            
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="text-white font-semibold">Цэвэр ашиг (алдагдал)</div>
                <div className="text-emerald-300 font-bold">₮ {netIncome.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Тайлан татах товч */}
        <div className="flex justify-end gap-4">
          <button className="px-6 py-3 text-sm bg-white/[0.08] hover:bg-white/[0.12] text-white/80 hover:text-white rounded-lg transition-colors">
            Excel тайлан татах
          </button>
          <button className="px-6 py-3 text-sm bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors">
            PDF тайлан татах
          </button>
        </div>
      </div>
    </div>
  );
}