"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function RoleManagement() {
  const [activeMenu, setActiveMenu] = useState("Роль удирдлага");
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [] as string[]
  });
  
  // Set user type to admin in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("userType", "admin");
      localStorage.setItem("adminType", "full-admin");
    }
  }, []);

  const roles = [
    {
      id: 1,
      name: "Бүрэн эрхт админ",
      description: "Бүх системийн удирдлага, тохиргоо, хэрэглэгчийн эрх",
      userCount: 3,
      createdAt: "2023-01-15",
      status: "active",
      permissions: 12,
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 2,
      name: "Сургалтын албаны админ",
      description: "Сургалтын удирдлага, оюутны бүртгэл, хичээлийн хуваарь",
      userCount: 5,
      createdAt: "2023-03-20",
      status: "active",
      permissions: 8,
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: 3,
      name: "Санхүүгийн албаны админ",
      description: "Төлбөрийн мэдээлэл, цалин, санхүүгийн тайлан, төсөв",
      userCount: 4,
      createdAt: "2023-04-10",
      status: "active",
      permissions: 7,
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: 4,
      name: "Багш",
      description: "Хичээл заах, ирц бүртгэх, дүн оруулах, сургалтын материал",
      userCount: 48,
      createdAt: "2023-01-01",
      status: "active",
      permissions: 5,
      color: "from-amber-500 to-orange-600"
    },
    {
      id: 5,
      name: "Оюутан",
      description: "Хичээл үзэх, дүн харах, төлбөрийн мэдээлэл, ирцийн мэдээлэл",
      userCount: 1245,
      createdAt: "2023-01-01",
      status: "active",
      permissions: 4,
      color: "from-indigo-500 to-blue-600"
    },
    {
      id: 6,
      name: "Эцэг/эх",
      description: "Хүүхдийн дүн, ирцийн мэдээлэл, төлбөрийн мэдээлэл, мэдэгдэл",
      userCount: 890,
      createdAt: "2023-02-15",
      status: "active",
      permissions: 4,
      color: "from-rose-500 to-red-600"
    },
    {
      id: 7,
      name: "Системийн админ",
      description: "Системийн техник дэмжлэг, мониторинг, нөөц хуулбар",
      userCount: 2,
      createdAt: "2023-05-01",
      status: "active",
      permissions: 6,
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: 8,
      name: "Тайлангийн админ",
      description: "Төрөл бүрийн тайлан үзэх, гаргах, шинжилгээ хийх",
      userCount: 3,
      createdAt: "2023-06-15",
      status: "inactive",
      permissions: 3,
      color: "from-gray-500 to-gray-600"
    },
  ];

  const availablePermissions = [
    "Системийн тохиргоо",
    "Хэрэглэгчийн удирдлага",
    "Роль удирдлага",
    "Эрх удирдлага",
    "Оюутны удирдлага",
    "Багш нарын удирдлага",
    "Хичээлийн удирдлага",
    "Төлбөрийн удирдлага",
    "Цалин удирдлага",
    "Тайлан үзэх",
    "Өгөгдлийн удирдлага",
    "Системийн мониторинг",
    "Нөөц хуулбар",
    "Аудитын бүртгэл",
  ];

  const handleAddRole = () => {
    // In a real app, this would make an API call
    console.log("Adding new role:", newRole);
    setShowAddRoleModal(false);
    setNewRole({ name: "", description: "", permissions: [] });
  };

  const togglePermission = (permission: string) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
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
              "linear-gradient(rgba(8, 14, 30, 0.9), rgba(8, 12, 24, 0.95)), url('/indra-bg.jpg')",
            backgroundPosition: "center center",
            backgroundSize: "72%",
          }}
        >
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white">Роль удирдлага</h1>
                <p className="mt-1 text-sm text-white/50">Роль нэмэх, засах, устгах, эрх оноох</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2">
                  <p className="text-sm font-medium text-white">Бүрэн эрхт админ</p>
                  <p className="text-xs text-white/40">Роль удирдлага</p>
                </div>
                <button 
                  onClick={() => setShowAddRoleModal(true)}
                  className="rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/70 hover:text-white"
                >
                  Шинэ роль нэмэх
                </button>
                <Link href="/admin/dashboard" className="rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/70 hover:text-white">
                  Буцах
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Нийт роль", value: "8", icon: "👥", color: "bg-blue-500" },
                { label: "Идэвхтэй роль", value: "7", icon: "✅", color: "bg-emerald-500" },
                { label: "Нийт хэрэглэгч", value: "2,200", icon: "👤", color: "bg-amber-500" },
                { label: "Дундаж эрх", value: "6.1", icon: "🔑", color: "bg-purple-500" },
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

            {/* Roles List */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
              <h2 className="text-lg font-semibold text-white mb-6">Роль жагсаалт</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Роль</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Тайлбар</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Хэрэглэгч</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Эрх</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Статус</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Үйлдэл</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map(role => (
                      <tr key={role.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${role.color} flex items-center justify-center`}>
                              <span className="text-lg">👑</span>
                            </div>
                            <div>
                              <p className="font-medium text-white">{role.name}</p>
                              <p className="text-xs text-white/50">ID: {role.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <p className="text-sm text-white/70 max-w-xs">{role.description}</p>
                          <p className="text-xs text-white/50">{role.createdAt}</p>
                        </td>
                        <td className="py-4">
                          <p className="text-lg font-bold text-white">{role.userCount}</p>
                        </td>
                        <td className="py-4">
                          <p className="text-lg font-bold text-white">{role.permissions}</p>
                        </td>
                        <td className="py-4">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            role.status === "active" 
                              ? "bg-emerald-500/10 text-emerald-400" 
                              : "bg-gray-500/10 text-gray-400"
                          }`}>
                            <span className={`mr-1 h-1.5 w-1.5 rounded-full ${
                              role.status === "active" ? "bg-emerald-400" : "bg-gray-400"
                            }`}></span>
                            {role.status === "active" ? "Идэвхтэй" : "Идэвхгүй"}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            <button className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-white/70 hover:text-white">
                              Засах
                            </button>
                            <button className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-white/70 hover:text-white">
                              Эрх
                            </button>
                            <button className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-white/70 hover:text-white">
                              Устгах
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Role Distribution */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
              <h2 className="text-lg font-semibold text-white mb-4">Роль тархалт</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { role: "Оюутан", count: 1245, percentage: 57, color: "bg-indigo-500" },
                  { role: "Эцэг/эх", count: 890, percentage: 40, color: "bg-rose-500" },
                  { role: "Багш", count: 48, percentage: 2, color: "bg-amber-500" },
                  { role: "Админ", count: 12, percentage: 1, color: "bg-blue-500" },
                ].map((item, index) => (
                  <div key={index} className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-white">{item.role}</p>
                        <p className="text-2xl font-bold text-white">{item.count}</p>
                      </div>
                      <div className={`h-10 w-10 rounded-full ${item.color} flex items-center justify-center`}>
                        <span className="text-lg">👥</span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden">
                      <div 
                        className={`h-full ${item.color} rounded-full`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <p className="mt-2 text-sm text-white/50">{item.percentage}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Role Modal */}
      {showAddRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0118] p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">Шинэ роль нэмэх</h2>
              <p className="mt-1 text-sm text-white/50">Роль нэмэх, эрх оноох</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/50 mb-2">Роль нэр</label>
                <input
                  type="text"
                  value={newRole.name}
                  onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Роль нэр оруулах"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2.5 text-white placeholder:text-white/30 focus:border-white/20 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm text-white/50 mb-2">Тайлбар</label>
                <textarea
                  value={newRole.description}
                  onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Роль тайлбар оруулах"
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2.5 text-white placeholder:text-white/30 focus:border-white/20 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm text-white/50 mb-2">Эрхүүд</label>
                <div className="max-h-48 overflow-y-auto rounded-lg border border-white/10 bg-white/[0.06] p-3">
                  {availablePermissions.map(permission => (
                    <div key={permission} className="flex items-center gap-2 py-1.5">
                      <input
                        type="checkbox"
                        id={`perm-${permission}`}
                        checked={newRole.permissions.includes(permission)}
                        onChange={() => togglePermission(permission)}
                        className="h-4 w-4 rounded border-white/10 bg-white/[0.06] text-blue-500 focus:ring-blue-500"
                      />
                      <label htmlFor={`perm-${permission}`} className="text-sm text-white/70">
                        {permission}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleAddRole}
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                Нэмэх
              </button>
              <button
                onClick={() => setShowAddRoleModal(false)}
                className="flex-1 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white/70 hover:text-white"
              >
                Цуцлах
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}