"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("Нүүр хуудас");
  const [adminType, setAdminType] = useState("Бүрэн эрхт админ");
  const [adminTypeKey, setAdminTypeKey] = useState("full-admin");
  
  // Админы төрлийг localStorage-с унших
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Set user type to admin for full admin
      localStorage.setItem("userType", "admin");
      
      const storedAdminType = localStorage.getItem("adminType");
      if (storedAdminType) {
        setAdminTypeKey(storedAdminType);
        if (storedAdminType === "full-admin") {
          setAdminType("Бүрэн эрхт админ");
        } else if (storedAdminType === "training-admin") {
          setAdminType("Сургалтын албаны админ");
          // Redirect training admin to their own dashboard
          window.location.href = "/admin/training-dashboard";
        } else if (storedAdminType === "finance-admin") {
          setAdminType("Санхүүгийн албаны админ");
          // Redirect finance admin to their own dashboard
          window.location.href = "/admin/finance-dashboard";
        }
      } else {
        // Default to full admin if no type stored
        localStorage.setItem("adminType", "full-admin");
        setAdminTypeKey("full-admin");
        setAdminType("Бүрэн эрхт админ");
      }
    }
  }, []);

  // Админы төрлөөс хамааран өөр өөр статистик
  const getStats = () => {
    if (adminTypeKey === "full-admin") {
      return [
        { label: "Нийт оюутан", value: "1,245", change: "+12%", color: "bg-violet-500", icon: "👨‍🎓" },
        { label: "Нийт багш", value: "48", change: "+3", color: "bg-emerald-500", icon: "🧑‍🏫" },
        { label: "Идэвхтэй хичээл", value: "156", change: "+8", color: "bg-amber-500", icon: "📚" },
        { label: "Системийн хэрэглэгч", value: "1,293", change: "+5%", color: "bg-blue-500", icon: "👥" },
      ];
    } else if (adminTypeKey === "training-admin") {
      return [
        { label: "Ирц бүртгэл", value: "1,245", change: "Өнөөдөр", color: "bg-blue-500", icon: "📊" },
        { label: "Дүнгийн мэдээлэл", value: "48", change: "Шинэчлэгдсэн", color: "bg-emerald-500", icon: "📈" },
        { label: "Сургалтын төлөвлөгөө", value: "156", change: "Идэвхтэй", color: "bg-amber-500", icon: "📅" },
        { label: "Оюутны дутагдал", value: "23", change: "-5%", color: "bg-red-500", icon: "⚠️" },
      ];
    } else {
      return [
        { label: "Төлбөрийн мэдээлэл", value: "1,245", change: "Төлсөн", color: "bg-emerald-500", icon: "💰" },
        { label: "Хүлээгдэж буй төлбөр", value: "48", change: "Хугацаа хэтэрсэн", color: "bg-red-500", icon: "⏰" },
        { label: "Санхүүгийн тайлан", value: "156", change: "Сар бүр", color: "bg-blue-500", icon: "📋" },
        { label: "Хяналтын мэдээлэл", value: "12", change: "Шинэ", color: "bg-purple-500", icon: "👁️" },
      ];
    }
  };

  const stats = getStats();

  // Админы төрлөөс хамааран өөр өөр хурдан үйлдлүүд
  const getQuickActions = () => {
    if (adminTypeKey === "full-admin") {
      return [
        { label: "Шинэ хэрэглэгч", description: "Нэмэх", icon: "👤", color: "from-violet-600 to-purple-800" },
        { label: "Backup авах", description: "Өнөөдөр", icon: "💾", color: "from-emerald-600 to-emerald-800" },
        { label: "Системийн лог", description: "Шинэчлэх", icon: "📋", color: "from-amber-600 to-amber-800" },
        { label: "Мониторинг", description: "Шинэчлэх", icon: "📊", color: "from-blue-600 to-blue-800" },
      ];
    } else if (adminTypeKey === "training-admin") {
      return [
        { label: "Ирц бүртгэх", description: "Өнөөдөр", icon: "📝", color: "from-blue-600 to-blue-800" },
        { label: "Дүн оруулах", description: "Шинэчлэх", icon: "📈", color: "from-emerald-600 to-emerald-800" },
        { label: "Төлөвлөгөө", description: "Засах", icon: "📅", color: "from-amber-600 to-amber-800" },
        { label: "Мэдэгдэл", description: "Илгээх", icon: "📢", color: "from-purple-600 to-purple-800" },
      ];
    } else {
      return [
        { label: "Төлбөр бүртгэх", description: "Шинэ", icon: "💰", color: "from-emerald-600 to-emerald-800" },
        { label: "Тайлан гаргах", description: "Сар бүр", icon: "📋", color: "from-blue-600 to-blue-800" },
        { label: "Хяналт хийх", description: "Шинэчлэх", icon: "👁️", color: "from-purple-600 to-purple-800" },
        { label: "Тохиргоо", description: "Засах", icon: "⚙️", color: "from-gray-600 to-gray-800" },
      ];
    }
  };

  const quickActions = getQuickActions();

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
          role="main" 
          aria-label="Үндсэн контент"
        >
          <div className="mx-auto max-w-7xl space-y-5">
            {/* Header */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">Админ удирдлага</h1>
                  <p className="mt-1 text-xs text-white/45">
                    {adminTypeKey === "full-admin" 
                      ? "Системийн бүрэн эрхийн удирдлага" 
                      : adminTypeKey === "training-admin"
                      ? "Сургалтын албаны удирдлага"
                      : "Санхүүгийн албаны удирдлага"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2">
                    <p className="text-sm font-medium text-white">Админ</p>
                    <p className="text-xs text-white/40">{adminType}</p>
                  </div>
                  <button 
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        localStorage.removeItem("userType");
                        localStorage.removeItem("adminType");
                        window.location.href = "/admin/login";
                      }
                    }}
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:text-white"
                  >
                    Гарах
                  </button>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md"
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
                  <p className="mt-3 text-sm text-emerald-400">{stat.change}</p>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70 mb-4">Түргэн үйлдлүүд</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {quickActions.map((action, index) => (
                  <button 
                    key={index}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 text-center hover:bg-white/10 transition-colors"
                  >
                    <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${action.color} flex items-center justify-center mx-auto mb-2`}>
                      <span className="text-lg">{action.icon}</span>
                    </div>
                    <p className="text-sm font-medium text-white">{action.label}</p>
                    <p className="text-xs text-white/50 mt-1">{action.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Admin type specific content */}
            {adminTypeKey === "full-admin" && (
              <div className="grid gap-5 xl:grid-cols-2">
                {/* System overview */}
                <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                  <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70 mb-4">Системийн тойм</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/50">Системийн хувилбар</span>
                      <span className="text-sm font-medium text-white">v2.5.1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/50">Сүүлийн backup</span>
                      <span className="text-sm font-medium text-white">2026-04-26 23:00</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/50">Идэвхтэй хэрэглэгч</span>
                      <span className="text-sm font-medium text-white">342</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/50">Системийн ачаалал</span>
                      <span className="text-sm font-medium text-emerald-400">42%</span>
                    </div>
                  </div>
                </div>

                {/* Recent activities */}
                <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">Сүүлийн үйлдлүүд</h2>
                    <button className="text-sm text-violet-400 hover:text-violet-300">
                      Бүгдийг харах
                    </button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { user: "Б.Ганбат", action: "Шинэ хичээл нэмэв", time: "10 мин өмнө", role: "Багш" },
                      { user: "Төртэмүүлэн", action: "Төлбөр төлсөн", time: "25 мин өмнө", role: "Оюутан" },
                      { user: "Ц.Энхтуяа", action: "Дүн шинэчиллээ", time: "1 цаг өмнө", role: "Багш" },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center">
                            <span className="text-sm font-semibold text-white">
                              {activity.user.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{activity.user}</p>
                            <p className="text-xs text-white/50">{activity.action}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-white/40">{activity.time}</p>
                          <span className="inline-block rounded-full bg-white/5 px-2 py-0.5 text-xs text-white/60">
                            {activity.role}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {adminTypeKey === "training-admin" && (
              <div className="grid gap-5 xl:grid-cols-2">
                {/* Training statistics */}
                <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                  <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70 mb-4">Сургалтын статистик</h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-white/50">Ирцийн дундаж</span>
                        <span className="text-sm font-medium text-white">85%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-green-300" style={{ width: "85%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-white/50">Дүнгийн дундаж</span>
                        <span className="text-sm font-medium text-white">78%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-300" style={{ width: "78%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-white/50">Дутагдал</span>
                        <span className="text-sm font-medium text-white">5%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-gradient-to-r from-red-400 to-orange-300" style={{ width: "5%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming training events */}
                <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">Дараагийн арга хэмжээ</h2>
                    <button className="text-sm text-blue-400 hover:text-blue-300">
                      Бүгдийг харах
                    </button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { event: "Мэргэжлийн сургалт", date: "2026-05-10", participants: 45 },
                      { event: "Шалгалтын хурал", date: "2026-05-15", participants: 120 },
                      { event: "Багийн уулзалт", date: "2026-05-20", participants: 25 },
                    ].map((event, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-white">{event.event}</p>
                          <p className="text-xs text-white/50">{event.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-white">{event.participants}</p>
                          <p className="text-xs text-white/50">оролцогч</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {adminTypeKey === "finance-admin" && (
              <div className="grid gap-5 xl:grid-cols-2">
                {/* Financial overview */}
                <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                  <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70 mb-4">Санхүүгийн тойм</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/50">Нийт орлого</span>
                      <span className="text-sm font-medium text-emerald-400">₮ 245,800,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/50">Нийт зарлага</span>
                      <span className="text-sm font-medium text-red-400">₮ 198,500,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/50">Цэвэр ашиг</span>
                      <span className="text-sm font-medium text-emerald-400">₮ 47,300,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/50">Төлбөрийн дутагдал</span>
                      <span className="text-sm font-medium text-amber-400">₮ 12,500,000</span>
                    </div>
                  </div>
                </div>

                {/* Recent payments */}
                <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">Сүүлийн төлбөрүүд</h2>
                    <button className="text-sm text-emerald-400 hover:text-emerald-300">
                      Бүгдийг харах
                    </button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { student: "Төртэмүүлэн", amount: "₮ 2,500,000", date: "Өнөөдөр", status: "Төлсөн" },
                      { student: "Э.Батжаргал", amount: "₮ 2,500,000", date: "Өчигдөр", status: "Төлсөн" },
                      { student: "Ц.Мөнхбат", amount: "₮ 2,500,000", date: "2 хоног", status: "Хүлээгдэж" },
                    ].map((payment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-white">{payment.student}</p>
                          <p className="text-xs text-white/50">{payment.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-white">{payment.amount}</p>
                          <span className={`inline-block rounded-full px-2 py-0.5 text-xs ${
                            payment.status === "Төлсөн" 
                              ? "bg-emerald-500/10 text-emerald-300" 
                              : "bg-amber-500/10 text-amber-300"
                          }`}>
                            {payment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}


          </div>
        </main>
      </div>
    </div>
  );
}