"use client";

import { useEffect, useState } from "react";
import { withAuth } from '@/contexts/AuthContext';
import { useRouter } from "next/navigation";
import { withAuth } from '@/contexts/AuthContext';
import Link from "next/link";
import { withAuth } from '@/contexts/AuthContext';
import Navbar from "@/components/Navbar";
import { withAuth } from '@/contexts/AuthContext';
import Sidebar from "@/components/Sidebar";
import { withAuth } from '@/contexts/AuthContext';

function SettingsPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState("Системийн тохиргоо");
  const [settings, setSettings] = useState({
    systemName: "Indra College",
    academicYear: "2024-2025",
    semester: "Хаврын улирал",
    maxStudentsPerClass: 30,
    attendanceThreshold: 75,
    gradingScale: 100,
    paymentDueDays: 30,
    notificationEnabled: true,
    autoBackupEnabled: true,
    maintenanceMode: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedType = localStorage.getItem("userType");
      setUserType(savedType);

      // Зөвхөн бүрэн эрхт админ энэ хуудсыг харж болно
      if (savedType !== "admin") {
        router.push("/admin/dashboard");
      }
    }
  }, [router]);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Энд тохиргоог хадгалах логик байх болно
    alert("Тохиргоо амжилттай хадгалагдлаа");
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
          role="main" 
          aria-label="Үндсэн контент"
        >
          <div className="mx-auto max-w-7xl space-y-5">
            {/* Гарчиг */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">Системийн тохиргоо</h1>
                  <p className="mt-1 text-xs text-white/45">Системийн ерөнхий тохиргоо, параметрүүдийг удирдах</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5">
                    <span className="text-xs font-medium text-violet-300">Бүрэн эрхт админ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ерөнхий тохиргоо */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <h3 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70 mb-6">Ерөнхий тохиргоо</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Системийн нэр
                  </label>
                  <input
                    type="text"
                    value={settings.systemName}
                    onChange={(e) => handleSettingChange("systemName", e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-violet-500/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Сургалтын жил
                  </label>
                  <input
                    type="text"
                    value={settings.academicYear}
                    onChange={(e) => handleSettingChange("academicYear", e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-violet-500/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Улирал
                  </label>
                  <select
                    value={settings.semester}
                    onChange={(e) => handleSettingChange("semester", e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-violet-500/50 focus:outline-none"
                  >
                    <option value="Намрын улирал">Намрын улирал</option>
                    <option value="Хаврын улирал">Хаврын улирал</option>
                    <option value="Зуны улирал">Зуны улирал</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Ангид оюутны дээд тоо
                  </label>
                  <input
                    type="number"
                    value={settings.maxStudentsPerClass}
                    onChange={(e) => handleSettingChange("maxStudentsPerClass", parseInt(e.target.value))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-violet-500/50 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Сургалтын тохиргоо */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <h3 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70 mb-6">Сургалтын тохиргоо</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Ирцийн шаардлагатай хувь (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={settings.attendanceThreshold}
                    onChange={(e) => handleSettingChange("attendanceThreshold", parseInt(e.target.value))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-violet-500/50 focus:outline-none"
                  />
                  <p className="mt-1 text-xs text-white/45">
                    Энэ хувиас бага ирцтэй оюутнууд шалгалтанд суух эрхгүй
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Дүнгийн хэмжүүр
                  </label>
                  <select
                    value={settings.gradingScale}
                    onChange={(e) => handleSettingChange("gradingScale", parseInt(e.target.value))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-violet-500/50 focus:outline-none"
                  >
                    <option value="100">100 онооны систем</option>
                    <option value="10">10 онооны систем</option>
                    <option value="4">4 онооны систем (GPA)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Төлбөрийн эцсийн хугацаа (өдөр)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={settings.paymentDueDays}
                    onChange={(e) => handleSettingChange("paymentDueDays", parseInt(e.target.value))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-violet-500/50 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Системийн тохиргоо */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <h3 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70 mb-6">Системийн тохиргоо</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Мэдэгдлийн систем</h4>
                    <p className="text-sm text-white/45">Имэйл, push мэдэгдэл илгээх</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange("notificationEnabled", !settings.notificationEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.notificationEnabled ? "bg-violet-600" : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.notificationEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Автомат нөөц хуулбар</h4>
                    <p className="text-sm text-white/45">Өдөр бүр автоматаар нөөц хуулбар авах</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange("autoBackupEnabled", !settings.autoBackupEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.autoBackupEnabled ? "bg-violet-600" : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.autoBackupEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Засварын горим</h4>
                    <p className="text-sm text-white/45">Системийг засварт оруулах</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange("maintenanceMode", !settings.maintenanceMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.maintenanceMode ? "bg-amber-600" : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.maintenanceMode ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Хэрэглэгчийн эрхийн тохиргоо */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <h3 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70 mb-6">Хэрэглэгчийн эрхийн тохиргоо</h3>
              <div className="space-y-4">
                {[
                  { role: "Бүрэн эрхт админ", permissions: ["Бүх эрх"], users: 3 },
                  { role: "Сургалтын албаны админ", permissions: ["Сургалтын удирдлага", "Оюутны мэдээлэл"], users: 5 },
                  { role: "Санхүүгийн албаны админ", permissions: ["Санхүүгийн удирдлага", "Төлбөрийн мэдээлэл"], users: 4 },
                  { role: "Багш", permissions: ["Хичээл удирдах", "Ирц бүртгэх", "Дүн оруулах"], users: 24 },
                  { role: "Оюутан", permissions: ["Хичээл үзэх", "Дүн харах", "Төлбөр харах"], users: 1200 },
                ].map((role, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">{role.role}</h4>
                      <p className="text-sm text-white/45">{role.permissions.join(", ")}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-white/70">{role.users} хэрэглэгч</span>
                      <button className="px-3 py-1.5 text-sm bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-lg transition-colors">
                        Тохируулах
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Хадгалах товч */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSettings({
                  systemName: "Indra College",
                  academicYear: "2024-2025",
                  semester: "Хаврын улирал",
                  maxStudentsPerClass: 30,
                  attendanceThreshold: 75,
                  gradingScale: 100,
                  paymentDueDays: 30,
                  notificationEnabled: true,
                  autoBackupEnabled: true,
                  maintenanceMode: false,
                })}
                className="px-6 py-3 text-sm bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-lg transition-colors"
              >
                Анхны утгад буцаах
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 text-sm bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
              >
                Тохиргоо хадгалах
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Protected page - only SUPER_ADMIN can access
export default withAuth(SettingsPage, ['SUPER_ADMIN']);
