"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function AdminProfilePage() {
  const [activeMenu, setActiveMenu] = useState("Хувийн мэдээлэл");
  const [userType, setUserType] = useState<"admin" | "training" | "finance" | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Б.Батбаяр",
    email: "batbayar@indra.edu.mn",
    phone: "9999-0000",
    position: "Системийн админ",
    department: "IT хэлтэс",
    employeeId: "EMP-2021-001",
    birthDate: "1990-05-15",
    address: "УБ, СХД, 3-р хороо",
    registrationNumber: "УБ90051512345",
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedType = localStorage.getItem("userType") as "admin" | "training" | "finance" | null;
      setUserType(savedType);
      
      if (!savedType && window.location.pathname.startsWith("/admin/")) {
        localStorage.setItem("userType", "admin");
        setUserType("admin");
      }
    }
  }, []);

  const getAdminTitle = () => {
    if (userType === "training") return "Сургалтын админ";
    if (userType === "finance") return "Санхүүгийн админ";
    return "Бүрэн эрхт админ";
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
            backgroundSize: "72%",
          }}
        >
          <div className="mx-auto max-w-5xl space-y-6">
            {/* Profile Header */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center ring-4 ring-blue-500/30 shadow-xl">
                      <span className="text-4xl font-bold text-white">{profileData.name.charAt(0)}</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-emerald-500 border-2 border-[#081120] flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7l2.5 2.5L11 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-1">{profileData.name}</h1>
                    <p className="text-sm text-white/60">{profileData.position}</p>
                    <p className="text-xs text-white/40 mt-1">ID: {profileData.employeeId}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="rounded-lg border border-blue-400/30 bg-blue-500/15 px-4 py-2 text-sm font-medium text-blue-200 hover:bg-blue-500/25"
                >
                  {isEditing ? "Хадгалах" : "Засах"}
                </button>
              </div>
            </div>

            {/* Personal Information */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-6 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-1 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-white/90">Хувийн мэдээлэл</h2>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="group">
                  <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Овог нэр</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400/40"
                    />
                  ) : (
                    <p className="text-base font-medium text-white group-hover:text-blue-300 transition-colors">{profileData.name}</p>
                  )}
                </div>
                <div className="group">
                  <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Ажилтны ID</p>
                  <p className="text-base font-mono font-medium text-white/60">{profileData.employeeId}</p>
                </div>
                <div className="group">
                  <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Имэйл хаяг</p>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400/40"
                    />
                  ) : (
                    <p className="text-base font-medium text-white group-hover:text-blue-300 transition-colors">{profileData.email}</p>
                  )}
                </div>
                <div className="group">
                  <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Утасны дугаар</p>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400/40"
                    />
                  ) : (
                    <p className="text-base font-medium text-white group-hover:text-blue-300 transition-colors">{profileData.phone}</p>
                  )}
                </div>
                <div className="group">
                  <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Төрсөн огноо</p>
                  {isEditing ? (
                    <input
                      type="date"
                      value={profileData.birthDate}
                      onChange={(e) => setProfileData({ ...profileData, birthDate: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400/40"
                    />
                  ) : (
                    <p className="text-base font-medium text-white group-hover:text-blue-300 transition-colors">{profileData.birthDate}</p>
                  )}
                </div>
                <div className="group">
                  <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Регистрийн дугаар</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.registrationNumber}
                      onChange={(e) => setProfileData({ ...profileData, registrationNumber: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400/40"
                    />
                  ) : (
                    <p className="text-base font-mono font-medium text-white group-hover:text-blue-300 transition-colors">{profileData.registrationNumber}</p>
                  )}
                </div>
                <div className="group md:col-span-2">
                  <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Гэрийн хаяг</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400/40"
                    />
                  ) : (
                    <p className="text-base font-medium text-white group-hover:text-blue-300 transition-colors">{profileData.address}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Work Information */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-6 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-1 w-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-white/90">Ажлын мэдээлэл</h2>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="group">
                  <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Албан тушаал</p>
                  <p className="text-base font-medium text-white group-hover:text-purple-300 transition-colors">{profileData.position}</p>
                </div>
                <div className="group">
                  <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Хэлтэс</p>
                  <p className="text-base font-medium text-white group-hover:text-purple-300 transition-colors">{profileData.department}</p>
                </div>
                <div className="group">
                  <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Эрхийн түвшин</p>
                  <span className="inline-block rounded-xl border border-emerald-400/40 bg-emerald-500/20 px-4 py-1.5 text-sm font-medium text-emerald-300">
                    {getAdminTitle()}
                  </span>
                </div>
                <div className="group">
                  <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Төлөв</p>
                  <span className="inline-block rounded-xl border border-emerald-400/40 bg-emerald-500/20 px-4 py-1.5 text-sm font-medium text-emerald-300">
                    Идэвхтэй
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
