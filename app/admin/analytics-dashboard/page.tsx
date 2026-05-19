"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function AnalyticsDashboard() {
  const [activeMenu, setActiveMenu] = useState("Аналитик самбар");
  
  // Set user type to admin in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("userType", "admin");
      localStorage.setItem("adminType", "full-admin");
    }
  }, []);

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
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white">Аналитик самбар</h1>
                <p className="mt-1 text-sm text-white/50">Бүх системийн өгөгдлийн график дүрслэл</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2">
                  <p className="text-sm font-medium text-white">Бүрэн эрхт админ</p>
                  <p className="text-xs text-white/40">Аналитик хяналт</p>
                </div>
                <Link href="/admin/dashboard" className="rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/70 hover:text-white">
                  Буцах
                </Link>
              </div>
            </div>

            {/* Content */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm text-center">
              <div className="max-w-md mx-auto">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-800 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Аналитик самбар</h2>
                <p className="text-sm text-white/50 mb-6">
                  Системийн бүх өгөгдлийн график дүрслэл, статистик шинжилгээ
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm text-white/50 mb-1">Оюутны статистик</p>
                    <p className="text-lg font-bold text-white">1,245</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm text-white/50 mb-1">Багш нарын статистик</p>
                    <p className="text-lg font-bold text-white">48</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm text-white/50 mb-1">Ирцийн дундаж</p>
                    <p className="text-lg font-bold text-white">89%</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm text-white/50 mb-1">Дүнгийн дундаж</p>
                    <p className="text-lg font-bold text-white">78%</p>
                  </div>
                </div>
                <p className="text-xs text-white/30">
                  График, диаграм, статистик шинжилгээний хэсэг хөгжүүлэгдэж байна
                </p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Өдрийн идэвхтэй хэрэглэгч", value: "342", change: "+12%", color: "bg-blue-500", icon: "👥" },
                { label: "Системийн ачаалал", value: "42%", change: "-3%", color: "bg-emerald-500", icon: "⚡" },
                { label: "Өгөгдлийн хэмжээ", value: "4.2GB", change: "+0.8GB", color: "bg-amber-500", icon: "💾" },
                { label: "Дундаж хариу үйлдэл", value: "0.8с", change: "-0.2с", color: "bg-purple-500", icon: "⏱️" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{stat.icon}</span>
                        <p className="text-sm text-white/50">{stat.label}</p>
                      </div>
                      <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`h-12 w-12 rounded-full ${stat.color} flex items-center justify-center`}>
                      <span className="text-lg font-bold text-white">+</span>
                    </div>
                  </div>
                  <p className={`mt-3 text-sm ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stat.change}
                  </p>
                </div>
              ))}
            </div>

            {/* Coming soon features */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
              <h2 className="text-lg font-semibold text-white mb-4">Хөгжүүлэгдэж буй функцууд</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { label: "Оюутны ирцийн график", status: "Хөгжүүлэгдэж байна", icon: "📈" },
                  { label: "Дүнгийн статистик диаграм", status: "Төлөвлөгдсөн", icon: "📊" },
                  { label: "Санхүүгийн тайлангийн график", status: "Төлөвлөгдсөн", icon: "💰" },
                  { label: "Системийн мониторинг график", status: "Хөгжүүлэгдэж байна", icon: "👁️" },
                  { label: "HR статистик диаграм", status: "Төлөвлөгдсөн", icon: "👨‍💼" },
                  { label: "Цагийн цувааны шинжилгээ", status: "Төлөвлөгдсөн", icon: "⏰" },
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className="rounded-xl border border-white/10 bg-white/[0.06] p-4"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg">{feature.icon}</span>
                      <p className="text-sm font-medium text-white">{feature.label}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      feature.status === "Хөгжүүлэгдэж байна" 
                        ? "bg-blue-500/10 text-blue-300" 
                        : "bg-amber-500/10 text-amber-300"
                    }`}>
                      {feature.status}
                    </span>
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