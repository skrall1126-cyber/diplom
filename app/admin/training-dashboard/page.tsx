"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function TrainingAdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("Нүүр хуудас");
  
  // Set user type to training in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("userType", "training");
      localStorage.setItem("adminType", "training-admin");
    }
  }, []);

  const stats = [
    { label: "Ирц бүртгэл", value: "1,245", change: "Өнөөдөр", color: "bg-blue-500", icon: "📊" },
    { label: "Дүнгийн мэдээлэл", value: "48", change: "Шинэчлэгдсэн", color: "bg-emerald-500", icon: "📈" },
    { label: "Сургалтын төлөвлөгөө", value: "156", change: "Идэвхтэй", color: "bg-amber-500", icon: "📅" },
    { label: "Оюутны дутагдал", value: "23", change: "-5%", color: "bg-red-500", icon: "⚠️" },
  ];

  const quickActions = [
    { label: "Ирц бүртгэх", description: "Өнөөдөр", icon: "📝", color: "from-blue-600 to-blue-800", link: "/admin/attendance" },
    { label: "Дүн оруулах", description: "Шинэчлэх", icon: "📈", color: "from-emerald-600 to-emerald-800", link: "/admin/grades" },
    { label: "Төлөвлөгөө", description: "Засах", icon: "📅", color: "from-amber-600 to-amber-800", link: "/admin/training-plan" },
    { label: "Мэдэгдэл", description: "Илгээх", icon: "📢", color: "from-purple-600 to-purple-800", link: "#" },
  ];

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
            backgroundSize: "72%",
          }}
        >
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Stats grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                    onClick={() => {
                      if (action.link === "#") {
                        alert("Мэдэгдэл илгээх функц удахгүй нэмэгдэнэ.");
                      } else {
                        window.location.href = action.link;
                      }
                    }}
                    className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4 text-center hover:bg-white/[0.1] transition-colors"
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

            {/* Training specific content */}
            <div className="grid gap-6 lg:grid-cols-2">
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
                  <button 
                    onClick={() => {
                      alert("Арга хэмжээний жагсаалт удахгүй нэмэгдэнэ.");
                    }}
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
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
                      className="flex items-center justify-between rounded-[22px] border border-white/5 bg-white/[0.03] p-3"
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

            {/* Recent activities */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">Сүүлийн үйлдлүүд</h2>
                <button 
                  onClick={() => {
                    alert("Үйлдлийн түүх удахгүй нэмэгдэнэ.");
                  }}
                  className="text-sm text-violet-400 hover:text-violet-300"
                >
                  Бүгдийг харах
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { user: "Б.Ганбат", action: "Шинэ хичээл нэмэв", time: "10 мин өмнө", role: "Багш" },
                  { user: "Төртэмүүлэн", action: "Ирц бүртгэв", time: "25 мин өмнө", role: "Оюутан" },
                  { user: "Ц.Энхтуяа", action: "Дүн шинэчиллээ", time: "1 цаг өмнө", role: "Багш" },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-[22px] border border-white/5 bg-white/[0.03] p-3"
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
        </main>
      </div>
    </div>
  );
}