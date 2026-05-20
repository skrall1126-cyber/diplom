"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function TimetableAdminPage() {
  const [activeMenu, setActiveMenu] = useState("Хичээлийн хуваарь");
  const [userType, setUserType] = useState<"admin" | "training" | "finance" | null>(null);
  const [showAddTimetableModal, setShowAddTimetableModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTimetable, setSelectedTimetable] = useState<any>(null);
  const [editTimetableData, setEditTimetableData] = useState<any>(null);
  const [newTimetable, setNewTimetable] = useState({
    days: [] as string[],
    startTime: "",
    endTime: "",
    course: "",
    teacher: "",
    room: "",
    class: "",
    startDate: "",
    endDate: ""
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedType = localStorage.getItem("userType") as "admin" | "training" | "finance" | null;
      setUserType(savedType);
      
      // Set user type if not set (default to admin)
      if (!savedType) {
        localStorage.setItem("userType", "admin");
        setUserType("admin");
      }
    }
  }, []);

  const getBackLink = () => {
    if (userType === "training") return "/admin/training-dashboard";
    if (userType === "finance") return "/admin/finance-dashboard";
    return "/admin/dashboard";
  };

  const getAdminTitle = () => {
    if (userType === "training") return "Сургалтын админ";
    if (userType === "finance") return "Санхүүгийн админ";
    return "Бүрэн эрхт админ";
  };

  const timetable = [
    { day: "Даваа", time: "08:00-09:30", course: "Python үндэс", teacher: "Б.Ганбат", room: "301", class: "PSW-101" },
    { day: "Даваа", time: "10:00-11:30", course: "JavaScript", teacher: "Ц.Энхтуяа", room: "302", class: "NET-201" },
    { day: "Мягмар", time: "08:00-09:30", course: "Database Systems", teacher: "Д.Батжаргал", room: "303", class: "CS-301" },
    { day: "Мягмар", time: "10:00-11:30", course: "Networking", teacher: "Э.Түмэн", room: "304", class: "IS-401" },
    { day: "Лхагва", time: "08:00-09:30", course: "Cybersecurity", teacher: "Х.Сүхбат", room: "305", class: "DM-201" },
    { day: "Лхагва", time: "10:00-11:30", course: "Mobile App Development", teacher: "Л.Эрдэнэ", room: "306", class: "SE-301" },
    { day: "Пүрэв", time: "08:00-09:30", course: "Web Development", teacher: "Б.Ганбат", room: "301", class: "PSW-101" },
    { day: "Пүрэв", time: "10:00-11:30", course: "Data Structures", teacher: "Ц.Энхтуяа", room: "302", class: "NET-201" },
  ];

  const days = ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан"];
  const timeSlots = ["08:00-09:30", "10:00-11:30", "13:00-14:30", "15:00-16:30"];

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
            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Нийт хичээл", value: timetable.length, icon: "📚", color: "bg-blue-500" },
                { label: "Нийт багш", value: new Set(timetable.map(item => item.teacher)).size, icon: "👨‍🏫", color: "bg-emerald-500" },
                { label: "Нийт өрөө", value: new Set(timetable.map(item => item.room)).size, icon: "🏫", color: "bg-amber-500" },
                { label: "Нийт цаг", value: `${timetable.length * 1.5} цаг`, icon: "⏰", color: "bg-purple-500" },
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

            {/* Timetable */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">Хичээлийн хуваарь</h2>
                <button 
                  onClick={() => setShowAddTimetableModal(true)}
                  className="rounded-lg border border-blue-400/30 bg-blue-500/15 px-4 py-2 text-sm font-medium text-blue-200 hover:bg-blue-500/25"
                >
                  Шинэ хуваарь үүсгэх
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Өдөр</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Цаг</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Хичээл</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Багш</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Өрөө</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Анги</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Үйлдэл</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timetable.map((item, index) => (
                      <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                              <span className="text-sm font-semibold text-white">{item.day.charAt(0)}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{item.day}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-white">{item.time}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-white">{item.course}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-white/70">{item.teacher}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                            {item.room}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-white/70">{item.class}</p>
                        </td>
                        <td className="px-4 py-3">
                          <button 
                            onClick={() => {
                              setSelectedTimetable(item);
                              setShowDetailModal(true);
                            }}
                            className="rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:bg-emerald-500/25"
                          >
                            Дэлгэрэнгүй
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Timetable Grid View */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70 mb-4">Хуваарийн сүлжээ</h2>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Цаг</th>
                      {days.map(day => (
                        <th key={day} className="px-4 py-3 text-center text-sm font-medium text-white/70">{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map(timeSlot => (
                      <tr key={timeSlot} className="border-b border-white/10">
                        <td className="px-4 py-3 text-sm font-medium text-white">{timeSlot}</td>
                        {days.map(day => {
                          const classes = timetable.filter(item => item.day === day && item.time === timeSlot);
                          return (
                            <td key={`${day}-${timeSlot}`} className="px-4 py-3">
                              {classes.length > 0 ? (
                                <div className="rounded-lg border border-blue-400/30 bg-blue-500/15 p-2">
                                  <p className="text-xs font-medium text-white">{classes[0].course}</p>
                                  <p className="text-xs text-white/50">{classes[0].teacher}</p>
                                  <p className="text-xs text-white/40">{classes[0].room}</p>
                                </div>
                              ) : (
                                <div className="rounded-lg border border-white/5 bg-white/[0.03] p-2 text-center">
                                  <p className="text-xs text-white/30">Чөлөө</p>
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Timetable Modal */}
      {showAddTimetableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border border-white/10 bg-[#0a1628] shadow-2xl">
            {/* Modal Header */}
            <div className="relative overflow-hidden rounded-t-2xl border-b border-white/10 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 px-6 py-5">
              <div className="relative z-10">
                <h2 className="text-xl font-bold text-white">Шинэ хуваарь үүсгэх</h2>
                <p className="mt-1 text-sm text-white/70">Хичээлийн хуваарийн мэдээллийг оруулна уу</p>
              </div>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Course */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Хичээл <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={newTimetable.course}
                  onChange={(e) => setNewTimetable({ ...newTimetable, course: e.target.value })}
                  placeholder="Жишээ: Python үндэс"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                />
              </div>

              {/* Teacher */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Багш <span className="text-red-400">*</span>
                </label>
                <select
                  value={newTimetable.teacher}
                  onChange={(e) => setNewTimetable({ ...newTimetable, teacher: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                >
                  <option value="" className="bg-[#0a1628]">Багш сонгох...</option>
                  <option value="Л.Энхтуяа" className="bg-[#0a1628] text-white">Л.Энхтуяа - Мэдээлэл зүй</option>
                  <option value="Н.Түмэнжаргал" className="bg-[#0a1628] text-white">Н.Түмэнжаргал - Програм хангамж</option>
                  <option value="С.Болормаа" className="bg-[#0a1628] text-white">С.Болормаа - Сүлжээний технологи</option>
                  <option value="Б.Оюунгэрэл" className="bg-[#0a1628] text-white">Б.Оюунгэрэл - Мэдээллийн аюулгүй байдал</option>
                </select>
                {newTimetable.teacher && (
                  <p className="mt-2 text-xs text-emerald-400">
                    ✅ Сонгогдсон: {newTimetable.teacher}
                  </p>
                )}
                <p className="mt-2 text-xs text-white/50">
                  💡 Зөвхөн ангид хамааралгүй сул багш нар харагдаж байна
                </p>
              </div>

              {/* Class */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Анги <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={newTimetable.class}
                  onChange={(e) => setNewTimetable({ ...newTimetable, class: e.target.value })}
                  placeholder="Жишээ: PSW-101"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                />
              </div>

              {/* Room */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Өрөө <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={newTimetable.room}
                  onChange={(e) => setNewTimetable({ ...newTimetable, room: e.target.value })}
                  placeholder="Жишээ: 301"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                />
              </div>

              {/* Days - Multiple Selection */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Өдрүүд <span className="text-red-400">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан"].map((day) => (
                    <label
                      key={day}
                      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={newTimetable.days.includes(day)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewTimetable({ ...newTimetable, days: [...newTimetable.days, day] });
                          } else {
                            setNewTimetable({ ...newTimetable, days: newTimetable.days.filter(d => d !== day) });
                          }
                        }}
                        className="h-4 w-4 rounded border-white/20 bg-white/10 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm text-white">{day}</span>
                    </label>
                  ))}
                </div>
                {newTimetable.days.length > 0 && (
                  <p className="mt-2 text-xs text-blue-400">
                    {newTimetable.days.length} өдөр сонгогдсон: {newTimetable.days.join(", ")}
                  </p>
                )}
              </div>

              {/* Date Range */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80">
                    Эхлэх огноо <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    value={newTimetable.startDate}
                    onChange={(e) => setNewTimetable({ ...newTimetable, startDate: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80">
                    Дуусах огноо <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    value={newTimetable.endDate}
                    onChange={(e) => setNewTimetable({ ...newTimetable, endDate: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  />
                </div>
              </div>
              {newTimetable.startDate && newTimetable.endDate && (
                <p className="text-xs text-blue-400">
                  Хичээлийн хугацаа: {newTimetable.startDate} - {newTimetable.endDate}
                </p>
              )}

              {/* Time - Manual Input */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80">
                    Эхлэх цаг <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="time"
                    value={newTimetable.startTime}
                    onChange={(e) => setNewTimetable({ ...newTimetable, startTime: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80">
                    Дуусах цаг <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="time"
                    value={newTimetable.endTime}
                    onChange={(e) => setNewTimetable({ ...newTimetable, endTime: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  />
                </div>
              </div>
              {newTimetable.startTime && newTimetable.endTime && (
                <p className="text-xs text-blue-400">
                  Хичээлийн үргэлжлэх хугацаа: {newTimetable.startTime} - {newTimetable.endTime}
                </p>
              )}
            </div>

            {/* Modal Footer - Fixed at bottom */}
            <div className="flex gap-3 border-t border-white/10 bg-[#0a1628] px-6 py-4 rounded-b-2xl">
              <button
                onClick={() => {
                  setShowAddTimetableModal(false);
                  setNewTimetable({ days: [], startTime: "", endTime: "", course: "", teacher: "", room: "", class: "", startDate: "", endDate: "" });
                }}
                className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/20 hover:text-white transition-all"
              >
                Болих
              </button>
              <button
                onClick={() => {
                  if (newTimetable.days.length === 0 || !newTimetable.startTime || !newTimetable.endTime || !newTimetable.course || !newTimetable.teacher || !newTimetable.room || !newTimetable.class || !newTimetable.startDate || !newTimetable.endDate) {
                    alert("Бүх талбарыг бөглөнө үү!");
                    return;
                  }
                  const timeRange = `${newTimetable.startTime}-${newTimetable.endTime}`;
                  const dateRange = `${newTimetable.startDate} - ${newTimetable.endDate}`;
                  alert(`Шинэ хуваарь нэмэгдлээ:\n\nХичээл: ${newTimetable.course}\nБагш: ${newTimetable.teacher}\nАнги: ${newTimetable.class}\nӨрөө: ${newTimetable.room}\nӨдрүүд: ${newTimetable.days.join(", ")}\nОгноо: ${dateRange}\nЦаг: ${timeRange}`);
                  setShowAddTimetableModal(false);
                  setNewTimetable({ days: [], startTime: "", endTime: "", course: "", teacher: "", room: "", class: "", startDate: "", endDate: "" });
                }}
                className="flex-1 rounded-lg border border-blue-400/40 bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-blue-500/20"
              >
                Үүсгэх
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


      {/* Detail Modal */}
      {showDetailModal && selectedTimetable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-2xl rounded-2xl border border-white/20 bg-[#081120] p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">{selectedTimetable.course}</h2>
                <p className="mt-1 text-sm text-white/50">{selectedTimetable.day} • {selectedTimetable.time}</p>
              </div>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedTimetable(null);
                }}
                className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5l10 10M15 5l-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Хичээл", value: selectedTimetable.course },
                { label: "Багш", value: selectedTimetable.teacher },
                { label: "Өдөр", value: selectedTimetable.day },
                { label: "Цаг", value: selectedTimetable.time },
                { label: "Өрөө", value: selectedTimetable.room },
                { label: "Анги", value: selectedTimetable.class },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs text-white/40">{item.label}</p>
                  <p className="mt-1 text-sm font-medium text-white/90">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedTimetable(null);
                }}
                className="rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/70 hover:text-white"
              >
                Хаах
              </button>
              <button
                onClick={() => {
                  setEditTimetableData(selectedTimetable);
                  setShowEditModal(true);
                  setShowDetailModal(false);
                }}
                className="rounded-lg border border-blue-400/30 bg-blue-500/15 px-4 py-2 text-sm font-medium text-blue-300 hover:bg-blue-500/25"
              >
                Засах
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editTimetableData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/20 bg-[#081120] p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-white">Хуваарь засах</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditTimetableData(null);
                }}
                className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5l10 10M15 5l-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Хичээл *</label>
                <input
                  type="text"
                  value={editTimetableData.course}
                  onChange={(e) => setEditTimetableData({ ...editTimetableData, course: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/40"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Багш *</label>
                <input
                  type="text"
                  value={editTimetableData.teacher}
                  onChange={(e) => setEditTimetableData({ ...editTimetableData, teacher: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/40"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Өдөр *</label>
                  <select
                    value={editTimetableData.day}
                    onChange={(e) => setEditTimetableData({ ...editTimetableData, day: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400/40"
                  >
                    <option value="Даваа">Даваа</option>
                    <option value="Мягмар">Мягмар</option>
                    <option value="Лхагва">Лхагва</option>
                    <option value="Пүрэв">Пүрэв</option>
                    <option value="Баасан">Баасан</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Цаг *</label>
                  <input
                    type="text"
                    value={editTimetableData.time}
                    onChange={(e) => setEditTimetableData({ ...editTimetableData, time: e.target.value })}
                    placeholder="08:00-09:30"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/40"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Өрөө *</label>
                  <input
                    type="text"
                    value={editTimetableData.room}
                    onChange={(e) => setEditTimetableData({ ...editTimetableData, room: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/40"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Анги *</label>
                  <input
                    type="text"
                    value={editTimetableData.class}
                    onChange={(e) => setEditTimetableData({ ...editTimetableData, class: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/40"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditTimetableData(null);
                  }}
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/70 hover:text-white"
                >
                  Цуцлах
                </button>
                <button
                  onClick={() => {
                    alert(`${editTimetableData.course} хуваарь амжилттай шинэчлэгдлээ!`);
                    setShowEditModal(false);
                    setEditTimetableData(null);
                    setSelectedTimetable(null);
                  }}
                  className="flex-1 rounded-lg border border-blue-400/30 bg-gradient-to-b from-blue-500 to-blue-700 px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
                >
                  Хадгалах
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
