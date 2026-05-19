"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function LoginHistory() {
  const [activeMenu, setActiveMenu] = useState("Нэвтрэх түүх");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  
  // Set user type to admin in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("userType", "admin");
      localStorage.setItem("adminType", "full-admin");
    }
  }, []);

  const loginHistory = [
    {
      id: 1,
      timestamp: "2024-05-05 14:30:25",
      user: "Д.Батбаяр",
      role: "Бүрэн эрхт админ",
      ip: "192.168.1.100",
      device: "Windows 11, Chrome 123",
      location: "Улаанбаатар, Монгол",
      status: "success"
    },
    {
      id: 2,
      timestamp: "2024-05-05 13:15:42",
      user: "Б.Ганбаатар",
      role: "Сургалтын албаны админ",
      ip: "192.168.1.101",
      device: "macOS 14, Safari 17",
      location: "Улаанбаатар, Монгол",
      status: "success"
    },
    {
      id: 3,
      timestamp: "2024-05-05 11:45:18",
      user: "Ц.Энхтуяа",
      role: "Санхүүгийн албаны админ",
      ip: "192.168.1.102",
      device: "Windows 10, Firefox 125",
      location: "Улаанбаатар, Монгол",
      status: "success"
    },
    {
      id: 4,
      timestamp: "2024-05-05 10:20:33",
      user: "Д.Энхбаяр",
      role: "Багш",
      ip: "192.168.1.103",
      device: "Windows 11, Chrome 123",
      location: "Улаанбаатар, Монгол",
      status: "success"
    },
    {
      id: 5,
      timestamp: "2024-05-05 09:05:12",
      user: "Б.Бат-Эрдэнэ",
      role: "Оюутан",
      ip: "192.168.1.104",
      device: "Android 14, Chrome Mobile",
      location: "Улаанбаатар, Монгол",
      status: "success"
    },
    {
      id: 6,
      timestamp: "2024-05-05 08:40:55",
      user: "unknown",
      role: "unknown",
      ip: "103.21.244.0",
      device: "Unknown",
      location: "Хятад улс",
      status: "failed"
    },
    {
      id: 7,
      timestamp: "2024-05-04 16:25:30",
      user: "Л.Нямдаваа",
      role: "Эцэг/эх",
      ip: "192.168.1.105",
      device: "iOS 17, Safari Mobile",
      location: "Улаанбаатар, Монгол",
      status: "success"
    },
    {
      id: 8,
      timestamp: "2024-05-04 15:10:45",
      user: "С.Эрдэнэтуяа",
      role: "Багш",
      ip: "192.168.1.106",
      device: "Windows 10, Edge 123",
      location: "Улаанбаатар, Монгол",
      status: "success"
    },
    {
      id: 9,
      timestamp: "2024-05-04 14:55:20",
      user: "Ж.Батжаргал",
      role: "Багш",
      ip: "192.168.1.107",
      device: "macOS 14, Chrome 123",
      location: "Улаанбаатар, Монгол",
      status: "success"
    },
    {
      id: 10,
      timestamp: "2024-05-04 13:30:15",
      user: "Б.Гантулга",
      role: "Сургалтын албаны админ",
      ip: "192.168.1.108",
      device: "Windows 11, Chrome 123",
      location: "Улаанбаатар, Монгол",
      status: "success"
    },
    {
      id: 11,
      timestamp: "2024-05-04 12:15:05",
      user: "unknown",
      role: "unknown",
      ip: "45.76.89.123",
      device: "Unknown",
      location: "Америкийн Нэгдсэн Улс",
      status: "failed"
    },
    {
      id: 12,
      timestamp: "2024-05-04 11:00:50",
      user: "Ц.Энхтуяа",
      role: "Санхүүгийн албаны админ",
      ip: "192.168.1.102",
      device: "Windows 10, Firefox 125",
      location: "Улаанбаатар, Монгол",
      status: "success"
    },
    {
      id: 13,
      timestamp: "2024-05-04 09:45:35",
      user: "Д.Батбаяр",
      role: "Бүрэн эрхт админ",
      ip: "192.168.1.100",
      device: "Windows 11, Chrome 123",
      location: "Улаанбаатар, Монгол",
      status: "success"
    },
    {
      id: 14,
      timestamp: "2024-05-04 08:30:20",
      user: "Б.Ганбаатар",
      role: "Сургалтын албаны админ",
      ip: "192.168.1.101",
      device: "macOS 14, Safari 17",
      location: "Улаанбаатар, Монгол",
      status: "success"
    },
    {
      id: 15,
      timestamp: "2024-05-04 07:15:05",
      user: "unknown",
      role: "unknown",
      ip: "203.0.113.0",
      device: "Unknown",
      location: "Австрали улс",
      status: "failed"
    },
  ];

  const roles = [
    { value: "all", label: "Бүх роль" },
    { value: "Бүрэн эрхт админ", label: "Бүрэн эрхт админ" },
    { value: "Сургалтын албаны админ", label: "Сургалтын албаны админ" },
    { value: "Санхүүгийн албаны админ", label: "Санхүүгийн албаны админ" },
    { value: "Багш", label: "Багш" },
    { value: "Оюутан", label: "Оюутан" },
    { value: "Эцэг/эх", label: "Эцэг/эх" },
    { value: "unknown", label: "Тодорхойгүй" },
  ];

  const statuses = [
    { value: "all", label: "Бүх статус" },
    { value: "success", label: "Амжилттай" },
    { value: "failed", label: "Амжилтгүй" },
  ];

  const filteredHistory = loginHistory.filter(entry => {
    const matchesStatus = filterStatus === "all" || entry.status === filterStatus;
    const matchesRole = filterRole === "all" || entry.role === filterRole;
    return matchesStatus && matchesRole;
  });

  const getStatusColor = (status: string) => {
    return status === "success" 
      ? "bg-emerald-500/10 text-emerald-400" 
      : "bg-red-500/10 text-red-400";
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Бүрэн эрхт админ": return "from-purple-500 to-pink-600";
      case "Сургалтын албаны админ": return "from-blue-500 to-cyan-600";
      case "Санхүүгийн албаны админ": return "from-emerald-500 to-teal-600";
      case "Багш": return "from-amber-500 to-orange-600";
      case "Оюутан": return "from-indigo-500 to-blue-600";
      case "Эцэг/эх": return "from-rose-500 to-red-600";
      default: return "from-gray-500 to-gray-600";
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
              "linear-gradient(rgba(8, 14, 30, 0.75), rgba(8, 12, 24, 0.8)), url('/indra-bg.jpg')",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        >
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white">Нэвтрэх түүх</h1>
                <p className="mt-1 text-sm text-white/50">Системд нэвтрэх бүх оролдлогын түүх</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2">
                  <p className="text-sm font-medium text-white">Бүрэн эрхт админ</p>
                  <p className="text-xs text-white/40">Нэвтрэх түүх</p>
                </div>
                <Link href="/admin/dashboard" className="rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/70 hover:text-white">
                  Буцах
                </Link>
              </div>
            </div>

            {/* Filters */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-64">
                  <label className="block text-sm text-white/50 mb-2">Статусаар шүүх</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2.5 text-white focus:border-white/20 focus:outline-none"
                  >
                    {statuses.map(status => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                </div>
                <div className="md:w-64">
                  <label className="block text-sm text-white/50 mb-2">Рольоор шүүх</label>
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2.5 text-white focus:border-white/20 focus:outline-none"
                  >
                    {roles.map(role => (
                      <option key={role.value} value={role.value}>{role.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Өнөөдрийн нэвтрэлт", value: "6", icon: "📊", color: "bg-blue-500" },
                { label: "Амжилттай", value: "5", icon: "✅", color: "bg-emerald-500" },
                { label: "Амжилтгүй", value: "1", icon: "❌", color: "bg-red-500" },
                { label: "Өвөрмөц IP", value: "9", icon: "🌐", color: "bg-amber-500" },
              ].map((stat, index) => (
                <div key={index} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
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

            {/* Login History Table */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Нэвтрэх түүх</h2>
                <p className="text-sm text-white/50">{filteredHistory.length} бүртгэл</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Огноо</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Хэрэглэгч</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Роль</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">IP хаяг</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Төхөөрөмж</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Байршил</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHistory.map(entry => (
                      <tr key={entry.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                        <td className="py-3">
                          <p className="text-white">{entry.timestamp}</p>
                        </td>
                        <td className="py-3">
                          <p className="text-white">{entry.user}</p>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className={`h-3 w-3 rounded-full bg-gradient-to-br ${getRoleColor(entry.role)}`}></div>
                            <p className="text-white">{entry.role}</p>
                          </div>
                        </td>
                        <td className="py-3">
                          <p className="text-white">{entry.ip}</p>
                        </td>
                        <td className="py-3">
                          <p className="text-sm text-white/70 max-w-xs">{entry.device}</p>
                        </td>
                        <td className="py-3">
                          <p className="text-white">{entry.location}</p>
                        </td>
                        <td className="py-3">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(entry.status)}`}>
                            {entry.status === "success" ? "Амжилттай" : "Амжилтгүй"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredHistory.length === 0 && (
                <div className="py-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-800 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Түүх олдсонгүй</h3>
                  <p className="text-sm text-white/50">Хайлтын үр дүнд тохирох нэвтрэх түүх олдсонгүй</p>
                </div>
              )}
            </div>

            {/* Statistics */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-white mb-4">Роль тус бүрийн нэвтрэлт</h2>
                <div className="space-y-4">
                  {[
                    { role: "Багш", count: 42, percentage: 28, color: "bg-amber-500" },
                    { role: "Оюутан", count: 68, percentage: 45, color: "bg-indigo-500" },
                    { role: "Эцэг/эх", count: 25, percentage: 17, color: "bg-rose-500" },
                    { role: "Админ", count: 15, percentage: 10, color: "bg-blue-500" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                        <span className="text-sm text-white/70">{item.role}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-32 rounded-full bg-white/[0.06] overflow-hidden">
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
              
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-white mb-4">Төхөөрөмжийн тархалт</h2>
                <div className="space-y-4">
                  {[
                    { device: "Windows", count: 85, percentage: 57, color: "bg-blue-500" },
                    { device: "macOS", count: 32, percentage: 21, color: "bg-gray-500" },
                    { device: "Android", count: 18, percentage: 12, color: "bg-emerald-500" },
                    { device: "iOS", count: 15, percentage: 10, color: "bg-gray-700" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                        <span className="text-sm text-white/70">{item.device}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-32 rounded-full bg-white/[0.06] overflow-hidden">
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

            {/* Security Alerts */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
              <h2 className="text-lg font-semibold text-white mb-4">Аюулгүй байдлын анхааруулга</h2>
              <div className="space-y-3">
                {[
                  { 
                    title: "Олон улсын IP хаягаас нэвтрэх оролдлого", 
                    description: "Хятад, Америк, Австрали улсуудаас нэвтрэх оролдлого илэрлээ",
                    count: 3,
                    severity: "high",
                    date: "2024-05-04"
                  },
                  { 
                    title: "Тодорхойгүй төхөөрөмжөөс нэвтрэх оролдлого", 
                    description: "Тодорхойгүй төхөөрөмжөөс нэвтрэх оролдлого илэрлээ",
                    count: 3,
                    severity: "medium",
                    date: "2024-05-04"
                  },
                  { 
                    title: "Буруу нууц үгээр олон удаагийн оролдлого", 
                    description: "Нэг IP хаягаас 3 удаа буруу нууц үгээр оролдлого хийсэн",
                    count: 1,
                    severity: "low",
                    date: "2024-05-05"
                  },
                ].map((alert, index) => (
                  <div key={index} className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-white">{alert.title}</h3>
                        <p className="text-sm text-white/50 mt-1">{alert.description}</p>
                      </div>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        alert.severity === "high" ? "bg-red-500/10 text-red-400" :
                        alert.severity === "medium" ? "bg-amber-500/10 text-amber-400" :
                        "bg-blue-500/10 text-blue-400"
                      }`}>
                        {alert.severity === "high" ? "Дээд" : 
                         alert.severity === "medium" ? "Дунд" : "Доод"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/50">{alert.date}</span>
                      <span className="text-white">{alert.count} тохиолдол</span>
                    </div>
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