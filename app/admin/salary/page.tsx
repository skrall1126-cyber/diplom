"use client";


import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SalaryPage() {
  const [activeMenu, setActiveMenu] = useState("Багш");
  const router = useRouter();
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedType = localStorage.getItem("userType");
      setUserType(savedType);

      // Зөвхөн бүрэн эрхт админ эсвэл санхүүгийн албаны админ энэ хуудсыг харж болно
      if (savedType !== "admin" && savedType !== "finance") {
        router.push("/admin/dashboard");
      }
    }
  }, [router]);

  const backLink = userType === "admin" ? "/admin/dashboard" : 
                   userType === "finance" ? "/admin/finance-dashboard" : 
                   "/admin/dashboard";

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
          <div className="mx-auto max-w-7xl space-y-5">
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
          <h1 className="text-3xl font-bold text-white mb-2">Цалин урамшуулал</h1>
          <p className="text-white/60">
            Багш, ажилчдын цалингийн тооцоо, урамшуулал, суутгалын удирдлага
          </p>
        </div>

        {/* Цалингийн статистик */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Нийт цалингийн сан */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Нийт цалин</h3>
              <div className="p-2 bg-violet-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1v18M1 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">₮ 245,800,000</div>
              <div className="text-sm text-white/60">Сар бүр</div>
            </div>
          </div>

          {/* Дундаж цалин */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Дундаж цалин</h3>
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1v18M1 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">₮ 3,850,000</div>
              <div className="text-sm text-white/60">Багш бүр</div>
            </div>
          </div>

          {/* Урамшууллын сан */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Урамшууллын сан</h3>
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1v18M1 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">₮ 12,500,000</div>
              <div className="text-sm text-white/60">Энэ сар</div>
            </div>
          </div>

          {/* Ажилчдын тоо */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Ажилчдын тоо</h3>
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M15 16c0-2.5-2-4-5-4s-5 1.5-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">64 хүн</div>
              <div className="text-sm text-white/60">Багш: 24, Ажилтан: 40</div>
            </div>
          </div>
        </div>

        {/* Цалингийн хүснэгт */}
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-8">
          <div className="p-5 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Цалингийн жагсаалт</h3>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors">
                Цалин тооцоо хийх
              </button>
              <button className="px-4 py-2 text-sm bg-white/[0.08] hover:bg-white/[0.12] text-white/80 hover:text-white rounded-lg transition-colors">
                Тайлан татах
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-white/70 font-medium">Нэр</th>
                  <th className="text-left p-4 text-white/70 font-medium">Албан тушаал</th>
                  <th className="text-left p-4 text-white/70 font-medium">Үндсэн цалин</th>
                  <th className="text-left p-4 text-white/70 font-medium">Урамшуулал</th>
                  <th className="text-left p-4 text-white/70 font-medium">НДШ</th>
                  <th className="text-left p-4 text-white/70 font-medium">ХХОАТ</th>
                  <th className="text-left p-4 text-white/70 font-medium">Цэвэр цалин</th>
                  <th className="text-left p-4 text-white/70 font-medium">Төлөв</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Б. Ганбат", position: "Профессор", base: 4500000, bonus: 500000, ndsh: 450000, hhoat: 675000, net: 3875000, status: "Төлөгдсөн" },
                  { name: "Ц. Энхтуяа", position: "Дэд профессор", base: 3800000, bonus: 300000, ndsh: 380000, hhoat: 570000, net: 3250000, status: "Төлөгдсөн" },
                  { name: "Д. Батцэцэг", position: "Профессор", base: 4200000, bonus: 400000, ndsh: 420000, hhoat: 630000, net: 3550000, status: "Төлөгдсөн" },
                  { name: "Н. Болд", position: "Багш", base: 3200000, bonus: 200000, ndsh: 320000, hhoat: 480000, net: 2600000, status: "Төлөгдсөн" },
                  { name: "О. Цэцэгмаа", position: "Багш", base: 3100000, bonus: 150000, ndsh: 310000, hhoat: 465000, net: 2475000, status: "Хүлээгдэж буй" },
                  { name: "С. Мөнхбат", position: "Туслах багш", base: 2800000, bonus: 100000, ndsh: 280000, hhoat: 420000, net: 2200000, status: "Хүлээгдэж буй" },
                ].map((employee, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="p-4 text-white">{employee.name}</td>
                    <td className="p-4 text-white/70">{employee.position}</td>
                    <td className="p-4 text-white">₮ {employee.base.toLocaleString()}</td>
                    <td className="p-4 text-emerald-300">₮ {employee.bonus.toLocaleString()}</td>
                    <td className="p-4 text-rose-300">₮ {employee.ndsh.toLocaleString()}</td>
                    <td className="p-4 text-rose-300">₮ {employee.hhoat.toLocaleString()}</td>
                    <td className="p-4 text-white font-semibold">₮ {employee.net.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        employee.status === "Төлөгдсөн" ? "bg-emerald-500/20 text-emerald-300" :
                        "bg-amber-500/20 text-amber-300"
                      }`}>
                        {employee.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Урамшууллын хүснэгт */}
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-white/10">
            <h3 className="text-xl font-semibold text-white">Урамшууллын төлөвлөгөө</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-white/70 font-medium">Урамшууллын төрөл</th>
                  <th className="text-left p-4 text-white/70 font-medium">Шалгуур</th>
                  <th className="text-left p-4 text-white/70 font-medium">Хэмжээ</th>
                  <th className="text-left p-4 text-white/70 font-medium">Хүлээн авагчид</th>
                  <th className="text-left p-4 text-white/70 font-medium">Хугацаа</th>
                  <th className="text-left p-4 text-white/70 font-medium">Төлөв</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "Амжилтын урамшуулал", criteria: "Оюутны үнэлгээ 4.5+", amount: "₮ 500,000", recipients: "8 багш", period: "Сар бүр", status: "Идэвхтэй" },
                  { type: "Судалгааны урамшуулал", criteria: "НИЙТЛЭЛ 2+", amount: "₮ 300,000", recipients: "5 багш", period: "Улирал бүр", status: "Идэвхтэй" },
                  { type: "Хичээлийн чанарын урамшуулал", criteria: "Үнэлгээ 95%+", amount: "₮ 200,000", recipients: "12 багш", period: "Сар бүр", status: "Идэвхтэй" },
                  { type: "Жилийн урамшуулал", criteria: "1 жил тасралтгүй ажилласан", amount: "₮ 1,000,000", recipients: "18 багш", period: "Жил бүр", status: "Идэвхтэй" },
                  { type: "Төгсөлтийн урамшуулал", criteria: "Төгсөгчдийн тоо 50+", amount: "₮ 400,000", recipients: "6 багш", period: "Жил бүр", status: "Төлөвлөгдсөн" },
                ].map((bonus, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="p-4 text-white">{bonus.type}</td>
                    <td className="p-4 text-white/70">{bonus.criteria}</td>
                    <td className="p-4 text-emerald-300">{bonus.amount}</td>
                    <td className="p-4 text-white/70">{bonus.recipients}</td>
                    <td className="p-4 text-white/70">{bonus.period}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        bonus.status === "Идэвхтэй" ? "bg-emerald-500/20 text-emerald-300" :
                        "bg-blue-500/20 text-blue-300"
                      }`}>
                        {bonus.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Тайлбар */}
        <div className="mt-8 p-5 bg-white/[0.02] border border-white/10 rounded-xl">
          <h4 className="text-lg font-semibold text-white mb-3">Цалингийн бодлогын тайлбар</h4>
          <ul className="space-y-2 text-white/60 text-sm">
            <li>• Цалингийн тооцоог сарын эхний 5 хоногт хийнэ</li>
            <li>• Төлбөрийг сарын 15-ны өдөр хийгдэнэ</li>
            <li>• НДШ: Нийгмийн даатгалын шимтгэл (10%)</li>
            <li>• ХХОАТ: Хөдөлмөрийн хөлсний орлогын албан татвар (15%)</li>
            <li>• Урамшууллын төлбөрийг амжилтын үндсэн дээр тодорхойлно</li>
          </ul>
                </div>
          </div>
        </main>
      </div>
    </div>
  );
}