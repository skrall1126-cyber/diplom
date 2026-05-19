"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function AuditLogs() {
  const [activeMenu, setActiveMenu] = useState("Системийн бүртгэл");
  const [filterAction, setFilterAction] = useState("all");
  const [filterUser, setFilterUser] = useState("");
  
  // Set user type to admin in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("userType", "admin");
      localStorage.setItem("adminType", "full-admin");
    }
  }, []);

  const logs = [
    {
      id: 1,
      timestamp: "2024-05-05 14:30:25",
      user: "Д.Батбаяр",
      action: "Роль нэмэв",
      details: "Сургалтын албаны админ роль нэмэв",
      ip: "192.168.1.100",
      status: "success",
      severity: "medium"
    },
    {
      id: 2,
      timestamp: "2024-05-05 13:15:42",
      user: "Б.Ганбаатар",
      action: "Оюутан нэмэв",
      details: "Шинэ оюутан бүртгэв: Б.Бат-Эрдэнэ",
      ip: "192.168.1.101",
      status: "success",
      severity: "low"
    },
    {
      id: 3,
      timestamp: "2024-05-05 11:45:18",
      user: "Ц.Энхтуяа",
      action: "Төлбөр бүртгэв",
      details: "Төлбөрийн мэдээлэл шинэчлэв: ID 2456",
      ip: "192.168.1.102",
      status: "success",
      severity: "low"
    },
    {
      id: 4,
      timestamp: "2024-05-05 10:20:33",
      user: "Д.Энхбаяр",
      action: "Хичээл зассан",
      details: "Програм хангамжийн хичээлийн мэдээлэл шинэчлэв",
      ip: "192.168.1.103",
      status: "success",
      severity: "low"
    },
    {
      id: 5,
      timestamp: "2024-05-05 09:05:12",
      user: "Б.Батбаяр",
      action: "Системийн тохиргоо",
      details: "Системийн тохиргоог шинэчлэв",
      ip: "192.168.1.104",
      status: "success",
      severity: "high"
    },
    {
      id: 6,
      timestamp: "2024-05-04 16:40:55",
      user: "unknown",
      action: "Нэвтрэх оролдлого",
      details: "Буруу нууц үгээр нэвтрэх оролдлого",
      ip: "103.21.244.0",
      status: "failed",
      severity: "high"
    },
    {
      id: 7,
      timestamp: "2024-05-04 15:25:30",
      user: "Л.Нямдаваа",
      action: "Эрх өөрчилсөн",
      details: "Хэрэглэгчийн эрх өөрчилсөн: ID 123",
      ip: "192.168.1.105",
      status: "success",
      severity: "medium"
    },
    {
      id: 8,
      timestamp: "2024-05-04 14:10:45",
      user: "С.Эрдэнэтуяа",
      action: "Тайлан үүсгэв",
      details: "Сар бүрийн тайлан үүсгэв",
      ip: "192.168.1.106",
      status: "success",
      severity: "low"
    },
    {
      id: 9,
      timestamp: "2024-05-04 12:55:20",
      user: "Ж.Батжаргал",
      action: "Өгөгдлийн нөөц хуулбар",
      details: "Өгөгдлийн сангийн нөөц хуулбар авсан",
      ip: "192.168.1.107",
      status: "success",
      severity: "high"
    },
    {
      id: 10,
      timestamp: "2024-05-04 11:30:15",
      user: "Б.Гантулга",
      action: "Салбар сургууль нэмэв",
      details: "Шинэ салбар сургууль нэмэв: Чингэлтэй дүүрэг",
      ip: "192.168.1.108",
      status: "success",
      severity: "medium"
    },
    {
      id: 11,
      timestamp: "2024-05-04 10:15:05",
      user: "Ц.Энхтуяа",
      action: "Цалин бүртгэв",
      details: "Багш нарын цалингийн мэдээлэл шинэчлэв",
      ip: "192.168.1.102",
      status: "success",
      severity: "medium"
    },
    {
      id: 12,
      timestamp: "2024-05-04 09:00:50",
      user: "Д.Батбаяр",
      action: "Системийн мониторинг",
      details: "Системийн мониторингийн тохиргоог шинэчлэв",
      ip: "192.168.1.100",
      status: "success",
      severity: "high"
    },
  ];

  const actions = [
    { value: "all", label: "Бүх үйлдэл" },
    { value: "Нэвтрэх оролдлого", label: "Нэвтрэх оролдлого" },
    { value: "Роль нэмэв", label: "Роль нэмэх" },
    { value: "Оюутан нэмэв", label: "Оюутан нэмэх" },
    { value: "Төлбөр бүртгэв", label: "Төлбөр бүртгэл" },
    { value: "Хичээл зассан", label: "Хичээл засах" },
    { value: "Системийн тохиргоо", label: "Системийн тохиргоо" },
    { value: "Эрх өөрчилсөн", label: "Эрх өөрчлөх" },
    { value: "Тайлан үүсгэв", label: "Тайлан үүсгэх" },
    { value: "Өгөгдлийн нөөц хуулбар", label: "Нөөц хуулбар" },
  ];

  const filteredLogs = logs.filter(log => {
    const matchesAction = filterAction === "all" || log.action === filterAction;
    const matchesUser = filterUser === "" || log.user.toLowerCase().includes(filterUser.toLowerCase());
    return matchesAction && matchesUser;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-500/10 text-red-400";
      case "medium": return "bg-amber-500/10 text-amber-400";
      case "low": return "bg-emerald-500/10 text-emerald-400";
      default: return "bg-gray-500/10 text-gray-400";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "success" 
      ? "bg-emerald-500/10 text-emerald-400" 
      : "bg-red-500/10 text-red-400";
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
            backgroundSize: "cover",
          }}
        >
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Header */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">Системийн бүртгэл</h1>
                  <p className="mt-1 text-xs text-white/45">Системийн бүх үйлдлийн бүртгэл, аудитын мэдээлэл</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2">
                    <p className="text-sm font-medium text-white">Бүрэн эрхт админ</p>
                    <p className="text-xs text-white/40">Аудитын бүртгэл</p>
                  </div>
                  <Link href="/admin/dashboard" className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:text-white">
                    Буцах
                  </Link>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-white/50 mb-2">Хэрэглэгчээр хайх</label>
                  <input
                    type="text"
                    placeholder="Хэрэглэгчийн нэр..."
                    value={filterUser}
                    onChange={(e) => setFilterUser(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/30 focus:border-white/20 focus:outline-none"
                  />
                </div>
                <div className="md:w-64">
                  <label className="block text-sm text-white/50 mb-2">Үйлдлээр шүүх</label>
                  <select
                    value={filterAction}
                    onChange={(e) => setFilterAction(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-white/20 focus:outline-none"
                  >
                    {actions.map(action => (
                      <option key={action.value} value={action.value}>{action.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Өнөөдрийн бүртгэл", value: "12", icon: "📊", color: "bg-blue-500" },
                { label: "Амжилттай", value: "11", icon: "✅", color: "bg-emerald-500" },
                { label: "Амжилтгүй", value: "1", icon: "❌", color: "bg-red-500" },
                { label: "Дээд аюултай", value: "3", icon: "⚠️", color: "bg-amber-500" },
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

            {/* Logs Table */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">Аудитын бүртгэл</h2>
                <p className="text-sm text-white/50">{filteredLogs.length} бүртгэл</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Огноо</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Хэрэглэгч</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Үйлдэл</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Дэлгэрэнгүй</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">IP хаяг</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Статус</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Аюултай байдал</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.map(log => (
                      <tr key={log.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                        <td className="py-3">
                          <p className="text-white">{log.timestamp}</p>
                        </td>
                        <td className="py-3">
                          <p className="text-white">{log.user}</p>
                        </td>
                        <td className="py-3">
                          <p className="text-white">{log.action}</p>
                        </td>
                        <td className="py-3">
                          <p className="text-sm text-white/70 max-w-xs">{log.details}</p>
                        </td>
                        <td className="py-3">
                          <p className="text-white">{log.ip}</p>
                        </td>
                        <td className="py-3">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(log.status)}`}>
                            {log.status === "success" ? "Амжилттай" : "Амжилтгүй"}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getSeverityColor(log.severity)}`}>
                            {log.severity === "high" ? "Дээд" : 
                             log.severity === "medium" ? "Дунд" : "Доод"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredLogs.length === 0 && (
                <div className="py-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-800 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Бүртгэл олдсонгүй</h3>
                  <p className="text-sm text-white/50">Хайлтын үр дүнд тохирох бүртгэл олдсонгүй</p>
                </div>
              )}
            </div>

            {/* Statistics */}
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70 mb-4">Үйлдлийн тархалт</h2>
                <div className="space-y-4">
                  {[
                    { action: "Төлбөр бүртгэв", count: 24, percentage: 20, color: "bg-blue-500" },
                    { action: "Хичээл зассан", count: 18, percentage: 15, color: "bg-emerald-500" },
                    { action: "Оюутан нэмэв", count: 15, percentage: 12.5, color: "bg-amber-500" },
                    { action: "Тайлан үүсгэв", count: 12, percentage: 10, color: "bg-purple-500" },
                    { action: "Системийн тохиргоо", count: 8, percentage: 6.7, color: "bg-cyan-500" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                        <span className="text-sm text-white/70">{item.action}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-32 rounded-full bg-white/10 overflow-hidden">
                          <div 
                            className={`h-full ${item.color} rounded-full`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-white/50 w-10 text-right">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70 mb-4">Аюултай байдлын тархалт</h2>
                <div className="space-y-4">
                  {[
                    { level: "Доод аюултай", count: 65, percentage: 54, color: "bg-emerald-500" },
                    { level: "Дунд аюултай", count: 32, percentage: 27, color: "bg-amber-500" },
                    { level: "Дээд аюултай", count: 23, percentage: 19, color: "bg-red-500" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                        <span className="text-sm text-white/70">{item.level}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-32 rounded-full bg-white/10 overflow-hidden">
                          <div 
                            className={`h-full ${item.color} rounded-full`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-white/50 w-10 text-right">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}