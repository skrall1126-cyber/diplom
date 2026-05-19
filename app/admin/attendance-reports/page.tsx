"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AttendanceReportsPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState("Энэ сар");
  const [selectedDepartment, setSelectedDepartment] = useState("Бүгд");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedType = localStorage.getItem("userType");
      setUserType(savedType);

      // Зөвхөн бүрэн эрхт админ эсвэл сургалтын албаны админ энэ хуудсыг харж болно
      if (savedType !== "admin" && savedType !== "training") {
        router.push("/admin/dashboard");
      }
    }
  }, [router]);

  const backLink = userType === "admin" ? "/admin/dashboard" : 
                   userType === "training" ? "/admin/training-dashboard" : 
                   "/admin/dashboard";

  const periods = ["Энэ сар", "Өнгөрсөн сар", "Энэ улирал", "Өнгөрсөн улирал", "Энэ жил"];
  const departments = ["Бүгд", "Мэдээлэл технологи", "Санхүү", "Хууль", "Менежмент", "Маркетинг", "Инженеринг"];

  const attendanceData = [
    { department: "Мэдээлэл технологи", total: 240, present: 215, absent: 15, late: 10, rate: 89.6 },
    { department: "Санхүү", total: 180, present: 168, absent: 8, late: 4, rate: 93.3 },
    { department: "Хууль", total: 150, present: 142, absent: 5, late: 3, rate: 94.7 },
    { department: "Менежмент", total: 200, present: 185, absent: 10, late: 5, rate: 92.5 },
    { department: "Маркетинг", total: 120, present: 110, absent: 6, late: 4, rate: 91.7 },
    { department: "Инженеринг", total: 160, present: 148, absent: 8, late: 4, rate: 92.5 },
  ];

  const filteredData = selectedDepartment === "Бүгд" 
    ? attendanceData 
    : attendanceData.filter(item => item.department === selectedDepartment);

  const totalStats = filteredData.reduce((acc, item) => ({
    total: acc.total + item.total,
    present: acc.present + item.present,
    absent: acc.absent + item.absent,
    late: acc.late + item.late,
  }), { total: 0, present: 0, absent: 0, late: 0 });

  const overallRate = totalStats.total > 0 ? (totalStats.present / totalStats.total) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0118] to-[#1a0b2e] p-6">
      <div className="mx-auto max-w-6xl">
        {/* Буцах холбоос */}
        <div className="mb-6">
          <Link
            href={backLink}
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Буцах
          </Link>
        </div>

        {/* Гарчиг */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Ирцийн тайлан</h1>
          <p className="text-white/60">
            Тэнхим, ангийн ирцийн статистик мэдээлэл, тайлан
          </p>
        </div>

        {/* Шүүлтүүр */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-sm font-medium text-white/70 mb-2">
              Хугацаа
            </label>
            <div className="flex flex-wrap gap-2">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    selectedPeriod === period
                      ? "bg-violet-600 text-white"
                      : "bg-white/[0.08] text-white/70 hover:bg-white/[0.12] hover:text-white"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full md:w-64">
            <label className="block text-sm font-medium text-white/70 mb-2">
              Тэнхим
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Нийт статистик */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Нийт ирц</h3>
              <div className="p-2 bg-violet-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1v18M1 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">{totalStats.total}</div>
              <div className="text-sm text-white/60">Оюутан</div>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Ирсэн</h3>
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16 6l-8 8-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">{totalStats.present}</div>
              <div className="text-sm text-white/60">Оюутан</div>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Ирээгүй</h3>
              <div className="p-2 bg-rose-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">{totalStats.absent}</div>
              <div className="text-sm text-white/60">Оюутан</div>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Ирцийн хувь</h3>
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10 6v8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">{overallRate.toFixed(1)}%</div>
              <div className="text-sm text-white/60">Нийт дундаж</div>
            </div>
          </div>
        </div>

        {/* Тэнхимийн ирцийн хүснэгт */}
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-8">
          <div className="p-5 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Тэнхимийн ирцийн тайлан</h3>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors">
                PDF тайлан татах
              </button>
              <button className="px-4 py-2 text-sm bg-white/[0.08] hover:bg-white/[0.12] text-white/80 hover:text-white rounded-lg transition-colors">
                Excel тайлан татах
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-white/70 font-medium">Тэнхим</th>
                  <th className="text-left p-4 text-white/70 font-medium">Нийт оюутан</th>
                  <th className="text-left p-4 text-white/70 font-medium">Ирсэн</th>
                  <th className="text-left p-4 text-white/70 font-medium">Ирээгүй</th>
                  <th className="text-left p-4 text-white/70 font-medium">Хоцорсон</th>
                  <th className="text-left p-4 text-white/70 font-medium">Ирцийн хувь</th>
                  <th className="text-left p-4 text-white/70 font-medium">Төлөв</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((dept, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="p-4 text-white">{dept.department}</td>
                    <td className="p-4 text-white">{dept.total}</td>
                    <td className="p-4 text-emerald-300">{dept.present}</td>
                    <td className="p-4 text-rose-300">{dept.absent}</td>
                    <td className="p-4 text-amber-300">{dept.late}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              dept.rate >= 90 ? "bg-emerald-500" : 
                              dept.rate >= 80 ? "bg-amber-500" : 
                              "bg-rose-500"
                            }`}
                            style={{ width: `${dept.rate}%` }}
                          />
                        </div>
                        <span className="text-white">{dept.rate.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        dept.rate >= 90 ? "bg-emerald-500/20 text-emerald-300" :
                        dept.rate >= 80 ? "bg-amber-500/20 text-amber-300" :
                        "bg-rose-500/20 text-rose-300"
                      }`}>
                        {dept.rate >= 90 ? "Сайн" : dept.rate >= 80 ? "Дунд" : "Муу"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* График ба диаграм */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h3 className="text-xl font-semibold text-white mb-6">Ирцийн хувь хэмжээ</h3>
            <div className="space-y-4">
              {filteredData.map((dept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">{dept.department}</span>
                    <span className="text-white">{dept.rate.toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        dept.rate >= 90 ? "bg-emerald-500" : 
                        dept.rate >= 80 ? "bg-amber-500" : 
                        "bg-rose-500"
                      }`}
                      style={{ width: `${dept.rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h3 className="text-xl font-semibold text-white mb-6">Ирээгүй оюутны шалтгаан</h3>
            <div className="space-y-4">
              {[
                { reason: "Өвдсөн", count: 28, percent: 40 },
                { reason: "Гэр бүлийн шалтгаан", count: 15, percent: 21 },
                { reason: "Тээврийн асуудал", count: 12, percent: 17 },
                { reason: "Бусад", count: 10, percent: 14 },
                { reason: "Мэдээлээгүй", count: 5, percent: 7 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">{item.reason}</span>
                    <span className="text-white">{item.count} хүн ({item.percent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-violet-500"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Тайлбар */}
        <div className="mt-8 p-5 bg-white/[0.02] border border-white/10 rounded-xl">
          <h4 className="text-lg font-semibold text-white mb-3">Ирцийн тайлангийн тайлбар</h4>
          <ul className="space-y-2 text-white/60 text-sm">
            <li>• Ирцийн тайланг сар бүр шинэчлэн гаргана</li>
            <li>• Ирцийн шаардлагатай хувь: 75% (энэ хувиас бага ирцтэй оюутнууд шалгалтанд суух эрхгүй)</li>
            <li>• Ирээгүй шалтгааныг 3 хоногийн дотор мэдээлэх шаардлагатай</li>
            <li>• Хоцорсон тохиолдолд хичээлийн цагийн эхний 15 минутанд тооцно</li>
            <li>• Тайланг PDF, Excel форматаар татаж авах боломжтой</li>
          </ul>
        </div>
      </div>
    </div>
  );
}