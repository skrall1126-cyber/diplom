"use client";

import { useState, useEffect } from "react";
import { withAuth } from '@/contexts/AuthContext';
import Navbar from "@/components/Navbar";
import { withAuth } from '@/contexts/AuthContext';
import Sidebar from "@/components/Sidebar";
import { withAuth } from '@/contexts/AuthContext';
import Link from "next/link";
import { withAuth } from '@/contexts/AuthContext';

function Inventory() {
  const [activeMenu, setActiveMenu] = useState("Эд хөрөнгийн бүртгэл");
  const [userType, setUserType] = useState<"admin" | "training" | "finance" | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedType = localStorage.getItem("userType") as "admin" | "training" | "finance" | null;
      setUserType(savedType);
      
      // Set user type if not set (default to finance for finance admin pages)
      if (!savedType && window.location.pathname.startsWith("/admin/")) {
        localStorage.setItem("userType", "finance");
        setUserType("finance");
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

  const inventoryData = [
    { id: 1, name: "Dell Latitude 5420", category: "Компьютер", quantity: 25, value: "₮ 75,000,000", location: "Програм хангамжийн тэнхим", status: "Ашиглагдаж", lastMaintenance: "2026-04-15", condition: "Сайн" },
    { id: 2, name: "HP ProBook 450 G8", category: "Компьютер", quantity: 20, value: "₮ 60,000,000", location: "Сүлжээний технологийн тэнхим", status: "Ашиглагдаж", lastMaintenance: "2026-04-10", condition: "Сайн" },
    { id: 3, name: "Cisco Catalyst 2960", category: "Сүлжээний тоног төхөөрөмж", quantity: 8, value: "₮ 40,000,000", location: "Сүлжээний лаборатори", status: "Ашиглагдаж", lastMaintenance: "2026-03-20", condition: "Сайн" },
    { id: 4, name: "Epson Projector", category: "Проектор", quantity: 12, value: "₮ 24,000,000", location: "Лекцийн танхимууд", status: "Ашиглагдаж", lastMaintenance: "2026-04-05", condition: "Дунд" },
    { id: 5, name: "Conference Table", category: "Тавилга", quantity: 15, value: "₮ 15,000,000", location: "Хурлын өрөө", status: "Ашиглагдаж", lastMaintenance: "2026-01-30", condition: "Сайн" },
    { id: 6, name: "Office Chair", category: "Тавилга", quantity: 50, value: "₮ 25,000,000", location: "Оффисууд", status: "Ашиглагдаж", lastMaintenance: "2026-02-15", condition: "Дунд" },
    { id: 7, name: "Canon Printer", category: "Хэвлэгч", quantity: 6, value: "₮ 12,000,000", location: "Оффисууд", status: "Засварт", lastMaintenance: "2026-03-10", condition: "Муу" },
    { id: 8, name: "Server Rack", category: "Серверийн тоног төхөөрөмж", quantity: 3, value: "₮ 30,000,000", location: "Мэдээллийн төв", status: "Ашиглагдаж", lastMaintenance: "2026-04-01", condition: "Сайн" },
  ];

  const summaryStats = {
    totalValue: "₮ 281,000,000",
    totalItems: 139,
    categories: 4,
    maintenanceDue: 2
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ашиглагдаж": return "bg-emerald-500/10 text-emerald-400";
      case "Засварт": return "bg-amber-500/10 text-amber-400";
      case "Хадгалалт": return "bg-blue-500/10 text-blue-400";
      default: return "bg-gray-500/10 text-gray-400";
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Сайн": return "text-emerald-400";
      case "Дунд": return "text-amber-400";
      case "Муу": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Компьютер": return "💻";
      case "Сүлжээний тоног төхөөрөмж": return "🌐";
      case "Проектор": return "📽️";
      case "Тавилга": return "🪑";
      case "Хэвлэгч": return "🖨️";
      case "Серверийн тоног төхөөрөмж": return "🖥️";
      default: return "📦";
    }
  };

  const openDetailModal = (item: any) => {
    setSelectedItem(item);
    setIsDetailModalOpen(true);
    setIsEditing(false);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedItem(null);
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    // Засвар хадгалах логик энд байна
    setIsEditing(false);
    alert("Мэдээлэл амжилттай хадгалагдлаа");
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
            {/* Inventory List */}
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Эд хөрөнгийн жагсаалт</h2>
                <button className="rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-500/25">
                  Шинэ эд хөрөнгө нэмэх
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Нэр</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Ангилал</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Тоо</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Үнэ цэнэ</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Байршил</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Төлөв</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Сүүлийн засвар</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Нөхцөл</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Үйлдэл</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryData.map((item) => (
                      <tr key={item.id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                              <span className="text-sm font-semibold text-white">{getCategoryIcon(item.category)}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{item.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-bold text-white">{item.quantity}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-bold text-emerald-400">{item.value}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-white/80">{item.location}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full border px-3 py-1 text-xs ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-white/80">{item.lastMaintenance}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className={`text-sm font-bold ${getConditionColor(item.condition)}`}>
                            {item.condition}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <button 
                            onClick={() => openDetailModal(item)}
                            className="rounded-lg border border-blue-400/30 bg-blue-500/15 px-4 py-1.5 text-xs font-medium text-blue-200 hover:bg-blue-500/25"
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

            {/* Maintenance Schedule */}
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <h2 className="text-lg font-semibold text-white mb-4">Засварын хуваарь</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Эд хөрөнгө</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Сүүлийн засвар</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Дараагийн засвар</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Засварын төрөл</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Төлөв</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Үйлдэл</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { item: "Canon Printer", last: "2026-03-10", next: "2026-05-10", type: "Гол засвар", status: "Хүлээгдэж", color: "bg-amber-500/10 text-amber-400" },
                      { item: "Epson Projector", last: "2026-04-05", next: "2026-07-05", type: "Түр засвар", status: "Төлөвлөгдсөн", color: "bg-blue-500/10 text-blue-400" },
                      { item: "Dell Latitude 5420", last: "2026-04-15", next: "2026-07-15", type: "Түр засвар", status: "Төлөвлөгдсөн", color: "bg-blue-500/10 text-blue-400" },
                      { item: "HP ProBook 450 G8", last: "2026-04-10", next: "2026-07-10", type: "Түр засвар", status: "Төлөвлөгдсөн", color: "bg-blue-500/10 text-blue-400" },
                      { item: "Cisco Catalyst 2960", last: "2026-03-20", next: "2026-06-20", type: "Түр засвар", status: "Төлөвлөгдсөн", color: "bg-blue-500/10 text-blue-400" },
                    ].map((item, index) => (
                      <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-white">{item.item}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-white/80">{item.last}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-white/80">{item.next}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-white/80">{item.type}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full border px-3 py-1 text-xs ${item.color}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:text-white">
                              Төлөвлөх
                            </button>
                            <button className="rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-3 py-1.5 text-xs font-medium text-emerald-200 hover:bg-emerald-500/25">
                              Засвар бүртгэх
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Asset Depreciation */}
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <h2 className="text-lg font-semibold text-white mb-4">Эд хөрөнгийн элэгдэл</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-blue-400/20 bg-blue-500/10 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-lg">📉</span>
                    </div>
                    <h3 className="font-bold text-white">Элэгдлийн тооцоо</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      <span>Компьютер: 3 жилийн ашиглалтын хугацаа</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      <span>Сүлжээний тоног төхөөрөмж: 5 жилийн ашиглалтын хугацаа</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      <span>Проектор: 4 жилийн ашиглалтын хугацаа</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      <span>Тавилга: 8 жилийн ашиглалтын хугацаа</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <span className="text-lg">💰</span>
                    </div>
                    <h3 className="font-bold text-white">Элэгдлийн дүн</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>Жилийн элэгдэл: ₮ 56,200,000</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>Нийт элэгдэл: ₮ 168,600,000</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>Үлдэгдэл үнэ: ₮ 112,400,000</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>Элэгдлийн хувь: 60%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Дэлгэрэнгүй мэдээллийн Modal */}
      {isDetailModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0a1628] p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-3xl">
                  {getCategoryIcon(selectedItem.category)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedItem.name}</h2>
                  <p className="text-sm text-white/50 mt-1">ID: {selectedItem.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="h-10 w-10 rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white flex items-center justify-center text-lg"
                    title="Засах"
                  >
                    ✎
                  </button>
                )}
                <button
                  onClick={closeDetailModal}
                  className="h-10 w-10 rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="space-y-6">
              {/* Үндсэн мэдээлэл */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-lg font-semibold text-white mb-4">Үндсэн мэдээлэл</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm text-white/50 block mb-2">Нэр</label>
                    {isEditing ? (
                      <input
                        type="text"
                        defaultValue={selectedItem.name}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-blue-400 focus:outline-none"
                      />
                    ) : (
                      <p className="text-white font-medium">{selectedItem.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-white/50 block mb-2">Ангилал</label>
                    {isEditing ? (
                      <input
                        type="text"
                        defaultValue={selectedItem.category}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-blue-400 focus:outline-none"
                      />
                    ) : (
                      <p className="text-white font-medium">{selectedItem.category}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-white/50 block mb-2">Тоо ширхэг</label>
                    {isEditing ? (
                      <input
                        type="number"
                        defaultValue={selectedItem.quantity}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-blue-400 focus:outline-none"
                      />
                    ) : (
                      <p className="text-white font-medium">{selectedItem.quantity}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-white/50 block mb-2">Үнэ цэнэ</label>
                    {isEditing ? (
                      <input
                        type="text"
                        defaultValue={selectedItem.value}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-blue-400 focus:outline-none"
                      />
                    ) : (
                      <p className="text-emerald-400 font-bold">{selectedItem.value}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-white/50 block mb-2">Байршил</label>
                    {isEditing ? (
                      <input
                        type="text"
                        defaultValue={selectedItem.location}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-blue-400 focus:outline-none"
                      />
                    ) : (
                      <p className="text-white font-medium">{selectedItem.location}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-white/50 block mb-2">Төлөв</label>
                    {isEditing ? (
                      <input
                        type="text"
                        defaultValue={selectedItem.status}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-blue-400 focus:outline-none"
                      />
                    ) : (
                      <span className={`inline-block rounded-full border px-3 py-1 text-xs ${getStatusColor(selectedItem.status)}`}>
                        {selectedItem.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Засвар үйлчилгээний мэдээлэл */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-lg font-semibold text-white mb-4">Засвар үйлчилгээ</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm text-white/50 block mb-2">Сүүлийн засвар</label>
                    {isEditing ? (
                      <input
                        type="date"
                        defaultValue={selectedItem.lastMaintenance}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-blue-400 focus:outline-none"
                      />
                    ) : (
                      <p className="text-white font-medium">{selectedItem.lastMaintenance}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-white/50 block mb-2">Нөхцөл байдал</label>
                    {isEditing ? (
                      <input
                        type="text"
                        defaultValue={selectedItem.condition}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-blue-400 focus:outline-none"
                      />
                    ) : (
                      <p className={`font-bold ${getConditionColor(selectedItem.condition)}`}>
                        {selectedItem.condition}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Нэмэлт мэдээлэл */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-lg font-semibold text-white mb-4">Нэмэлт мэдээлэл</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-white/50">Бүртгэсэн огноо</span>
                    <span className="text-sm text-white font-medium">2024-01-15</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-white/50">Баталгаат хугацаа</span>
                    <span className="text-sm text-white font-medium">2027-01-15 хүртэл</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-white/50">Хариуцагч</span>
                    <span className="text-sm text-white font-medium">Б.Болд</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-white/50">Үйлдвэрлэгч</span>
                    <span className="text-sm text-white font-medium">Dell Inc.</span>
                  </div>
                </div>
              </div>

              {/* Засварын түүх */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-lg font-semibold text-white mb-4">Засварын түүх</h3>
                <div className="space-y-3">
                  {[
                    { date: "2026-04-15", type: "Түр засвар", description: "Цэвэрлэгээ, програм хангамж шинэчлэх", cost: "₮ 50,000" },
                    { date: "2026-01-10", type: "Гол засвар", description: "Хатуу диск солих", cost: "₮ 350,000" },
                    { date: "2025-10-05", type: "Түр засвар", description: "Цэвэрлэгээ", cost: "₮ 30,000" },
                  ].map((maintenance, index) => (
                    <div key={index} className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm font-medium text-white">{maintenance.type}</p>
                          <p className="text-xs text-white/50 mt-1">{maintenance.date}</p>
                        </div>
                        <span className="text-sm font-bold text-emerald-400">{maintenance.cost}</span>
                      </div>
                      <p className="text-xs text-white/60">{maintenance.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/10">
              {isEditing && (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:text-white"
                  >
                    Цуцлах
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-500/25"
                  >
                    Хадгалах
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Protected page - only SUPER_ADMIN, TRAINING_ADMIN, FINANCE_ADMIN can access
export default withAuth(Inventory, ['SUPER_ADMIN', 'TRAINING_ADMIN', 'FINANCE_ADMIN']);
