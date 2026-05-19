"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const notifications = [
  { 
    id: 1, 
    title: "Python хичээлийн ирц дууслаа", 
    message: "Өнөөдрийн Python хичээлийн ирц амжилттай бүртгэгдлээ.", 
    time: "10 минут өмнө", 
    read: false,
    type: "attendance"
  },
  { 
    id: 2, 
    title: "Шинэ даалгавар нэмэгдлээ", 
    message: "JavaScript хичээлд шинэ даалгавар нэмэгдлээ. Эцсийн хугацаа: 3 хоног.", 
    time: "2 цаг өмнө", 
    read: false,
    type: "assignment"
  },
  { 
    id: 3, 
    title: "Оюутны асуулт", 
    message: "Бат-Эрдэнэ оюутан Database хичээлийн даалгаврын талаар асуулт илгээлээ.", 
    time: "5 цаг өмнө", 
    read: true,
    type: "question"
  },
  { 
    id: 4, 
    title: "Хичээлийн хуваарь өөрчлөгдлөө", 
    message: "Пүрэв гарагт 14:30-аас эхлэх Networking хичээл 15:00-д эхэлнэ.", 
    time: "1 өдөр өмнө", 
    read: true,
    type: "schedule"
  },
  { 
    id: 5, 
    title: "Дүнгийн мэдээлэл", 
    message: "Python хичээлийн дүнгийн мэдээлэл амжилттай экспортлогдлоо.", 
    time: "2 өдөр өмнө", 
    read: true,
    type: "grades"
  },
];

export default function TeacherNotificationsPage() {
  const [activeMenu, setActiveMenu] = useState("Мэдэгдэл");
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filteredNotifications = filter === "unread" 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: number) => {
    alert(`${id} дугаартай мэдэгдлийг уншсан гэж тэмдэглэлээ.`);
  };

  const handleMarkAllAsRead = () => {
    alert("Бүх мэдэгдлийг уншсан гэж тэмдэглэлээ.");
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case "attendance": return "border-emerald-400/30 bg-emerald-500/15 text-emerald-300";
      case "assignment": return "border-blue-400/30 bg-blue-500/15 text-blue-300";
      case "question": return "border-amber-400/30 bg-amber-500/15 text-amber-300";
      case "schedule": return "border-violet-400/30 bg-violet-500/15 text-violet-300";
      case "grades": return "border-cyan-400/30 bg-cyan-500/15 text-cyan-300";
      default: return "border-white/10 bg-white/[0.03] text-white/60";
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case "attendance": return "📋";
      case "assignment": return "📝";
      case "question": return "❓";
      case "schedule": return "📅";
      case "grades": return "📊";
      default: return "🔔";
    }
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
          <div className="mx-auto max-w-4xl space-y-5">
            {/* Header */}
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Багш</p>
                <h1 className="mt-1 text-2xl font-semibold text-white">Мэдэгдэл</h1>
                <p className="mt-1 text-sm text-white/50">Таны мэдэгдлийн түүх</p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Filter toggle */}
                <div className="flex gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-1">
                  {(["all", "unread"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                        filter === f
                          ? "bg-gradient-to-b from-violet-500 to-violet-700 text-white shadow-[0_4px_12px_rgba(124,58,237,0.35)]"
                          : "text-white/40 hover:text-white/70"
                      }`}
                    >
                      {f === "all" ? "Бүгд" : "Уншаагүй"}
                      {f === "unread" && unreadCount > 0 && (
                        <span className="rounded-full bg-pink-500/80 px-1.5 py-0.5 text-[10px] text-white">
                          {unreadCount}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { 
                  label: "Нийт мэдэгдэл", 
                  value: notifications.length, 
                  sub: "мэдэгдэл", 
                  color: "text-violet-300", 
                  border: "border-violet-400/20 bg-violet-500/10",
                  icon: "🔔"
                },
                { 
                  label: "Уншаагүй", 
                  value: unreadCount, 
                  sub: "мэдэгдэл", 
                  color: "text-amber-300", 
                  border: "border-amber-400/20 bg-amber-500/10",
                  icon: "📨"
                },
                { 
                  label: "Ирц", 
                  value: notifications.filter(n => n.type === "attendance").length, 
                  sub: "мэдэгдэл", 
                  color: "text-emerald-300", 
                  border: "border-emerald-400/20 bg-emerald-500/10",
                  icon: "📋"
                },
                { 
                  label: "Даалгавар", 
                  value: notifications.filter(n => n.type === "assignment").length, 
                  sub: "мэдэгдэл", 
                  color: "text-blue-300", 
                  border: "border-blue-400/20 bg-blue-500/10",
                  icon: "📝"
                },
              ].map((s) => (
                <div key={s.label} className={`rounded-[22px] border p-4 backdrop-blur-md ${s.border}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{s.icon}</span>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                      <p className="mt-0.5 text-[10px] text-white/30">{s.sub}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/50">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex justify-end">
              <button
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0}
                className="rounded-2xl border border-violet-400/30 bg-violet-500/15 px-4 py-2 text-sm font-medium text-violet-200 transition-colors hover:bg-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Бүгдийг уншсан гэж тэмдэглэх
              </button>
            </div>

            {/* Notifications list */}
            <div className="space-y-3">
              {filteredNotifications.length === 0 ? (
                <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-8 text-center backdrop-blur-md">
                  <p className="text-lg font-semibold text-white/60">Мэдэгдэл байхгүй</p>
                  <p className="mt-2 text-sm text-white/40">Уншаагүй мэдэгдэл байхгүй байна.</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`rounded-[22px] border p-5 backdrop-blur-md ${getTypeColor(notification.type)} ${notification.read ? "opacity-70" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-lg">
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-white/90">{notification.title}</p>
                            <p className="mt-1 text-sm text-white/60">{notification.message}</p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="text-[11px] text-white/30">{notification.time}</p>
                            {!notification.read && (
                              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />
                            )}
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:bg-white/[0.08]"
                          >
                            {notification.read ? "Дахин унших" : "Уншсан гэж тэмдэглэх"}
                          </button>
                          <button 
                            onClick={() => alert(`Мэдэгдэл: ${notification.title}\n\n${notification.message}`)}
                            className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:bg-white/[0.08]"
                          >
                            Дэлгэрэнгүй
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}