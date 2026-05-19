"use client";


import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OverduePaymentsPage() {
  const [activeMenu, setActiveMenu] = useState("Оюутан");
  const router = useRouter();
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedType = localStorage.getItem("userType");
      setUserType(savedType);

      // Зөвхөн санхүүгийн албаны админ энэ хуудсыг харж болно
      if (savedType !== "finance") {
        router.push("/admin/dashboard");
      }
    }
  }, [router]);

  const backLink = "/admin/finance-dashboard";

  const overdueData = [
    { student: "Ц. Энх-Амгалан", course: "Санхүүгийн удирдлага", amount: 900000, dueDate: "2024-03-10", daysOverdue: 5, contact: "99999999", status: "Хүлээгдэж буй" },
    { student: "О. Цэцэг-Эрдэнэ", course: "Дижитал маркетинг", amount: 800000, dueDate: "2024-03-05", daysOverdue: 10, contact: "88888888", status: "Хүлээгдэж буй" },
    { student: "Б. Болд-Эрдэнэ", course: "Python програмчлал", amount: 500000, dueDate: "2024-02-28", daysOverdue: 15, contact: "77777777", status: "Сануулга илгээсэн" },
    { student: "Д. Ган-Эрдэнэ", course: "Иргэний эрх зүй", amount: 300000, dueDate: "2024-02-25", daysOverdue: 18, contact: "66666666", status: "Сануулга илгээсэн" },
    { student: "Н. Мөнх-Эрдэнэ", course: "Бизнесийн стратеги", amount: 400000, dueDate: "2024-02-20", daysOverdue: 23, contact: "55555555", status: "Эцэг эхтэй холбогдсон" },
  ];

  const totalOverdue = overdueData.reduce((sum, item) => sum + item.amount, 0);
  const criticalOverdue = overdueData.filter(item => item.daysOverdue > 15).reduce((sum, item) => sum + item.amount, 0);

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
          <h1 className="text-3xl font-bold text-white mb-2">Хугацаа хэтэрсэн төлбөр</h1>
          <p className="text-white/60">
            Хугацаа хэтэрсэн төлбөрийн мэдээлэл, удирдлага
          </p>
        </div>

        {/* Нийт статистик */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Нийт хэтэрсэн</h3>
              <div className="p-2 bg-rose-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1v18M1 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">₮ {totalOverdue.toLocaleString()}</div>
              <div className="text-sm text-white/60">5 оюутнаас</div>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Шийдвэрлэх шаардлагатай</h3>
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1v18M1 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">₮ {criticalOverdue.toLocaleString()}</div>
              <div className="text-sm text-white/60">3 оюутнаас</div>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Дундаж хэтэрсэн хоног</h3>
              <div className="p-2 bg-violet-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1v18M1 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">
                {Math.round(overdueData.reduce((sum, item) => sum + item.daysOverdue, 0) / overdueData.length)} хоног
              </div>
              <div className="text-sm text-white/60">Дундаж</div>
            </div>
          </div>
        </div>

        {/* Хугацаа хэтэрсэн төлбөрийн хүснэгт */}
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Хугацаа хэтэрсэн төлбөрийн жагсаалт</h3>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors">
                Сануулга илгээх
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
                  <th className="text-left p-4 text-white/70 font-medium">Оюутан</th>
                  <th className="text-left p-4 text-white/70 font-medium">Хичээл</th>
                  <th className="text-left p-4 text-white/70 font-medium">Хэмжээ</th>
                  <th className="text-left p-4 text-white/70 font-medium">Эцсийн хугацаа</th>
                  <th className="text-left p-4 text-white/70 font-medium">Хэтэрсэн хоног</th>
                  <th className="text-left p-4 text-white/70 font-medium">Холбоо барих</th>
                  <th className="text-left p-4 text-white/70 font-medium">Төлөв</th>
                  <th className="text-left p-4 text-white/70 font-medium">Үйлдэл</th>
                </tr>
              </thead>
              <tbody>
                {overdueData.map((payment, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="p-4 text-white">{payment.student}</td>
                    <td className="p-4 text-white/70">{payment.course}</td>
                    <td className="p-4 text-rose-300">₮ {payment.amount.toLocaleString()}</td>
                    <td className="p-4 text-white/70">{payment.dueDate}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        payment.daysOverdue <= 7 ? "bg-amber-500/20 text-amber-300" :
                        payment.daysOverdue <= 15 ? "bg-orange-500/20 text-orange-300" :
                        "bg-rose-500/20 text-rose-300"
                      }`}>
                        {payment.daysOverdue} хоног
                      </span>
                    </td>
                    <td className="p-4 text-white/70">{payment.contact}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        payment.status === "Хүлээгдэж буй" ? "bg-amber-500/20 text-amber-300" :
                        payment.status === "Сануулга илгээсэн" ? "bg-orange-500/20 text-orange-300" :
                        "bg-rose-500/20 text-rose-300"
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="px-3 py-1.5 text-sm bg-white/[0.08] hover:bg-white/[0.12] text-white/80 hover:text-white rounded-lg transition-colors">
                        Үйлдэл хийх
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Тайлбар */}
        <div className="mt-8 p-5 bg-white/[0.02] border border-white/10 rounded-xl">
          <h4 className="text-lg font-semibold text-white mb-3">Хугацаа хэтэрсэн төлбөрийн тайлбар</h4>
          <ul className="space-y-2 text-white/60 text-sm">
            <li>• Хугацаа хэтэрсэн төлбөрийг өдөр бүр шинэчлэн гаргана</li>
            <li>• 7 хоногоос дээш хэтэрсэн: Шар өнгөөр тэмдэглэнэ</li>
            <li>• 15 хоногоос дээш хэтэрсэн: Улаан өнгөөр тэмдэглэнэ</li>
            <li>• Сануулгыг автоматаар илгээнэ: 3, 7, 15 хоногийн дараа</li>
            <li>• Эцэг эхтэй холбогдох: 15 хоногоос дээш хэтэрсэн тохиолдолд</li>
            <li>• Хичээлээс хасах: 30 хоногоос дээш хэтэрсэн тохиолдолд</li>
          </ul>
                </div>
          </div>
        </main>
      </div>
    </div>
  );
}