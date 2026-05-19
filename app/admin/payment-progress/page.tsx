"use client";


import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PaymentProgressPage() {
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

  const paymentProgressData = [
    { student: "Б. Бат-Эрдэнэ", course: "Python програмчлал", total: 1500000, paid: 1000000, progress: 67, status: "Төлөлт явагдаж байна", lastPayment: "2024-03-01", nextDue: "2024-04-01" },
    { student: "Ц. Энх-Амгалан", course: "Санхүүгийн удирдлага", total: 1800000, paid: 900000, progress: 50, status: "Төлөлт явагдаж байна", lastPayment: "2024-02-15", nextDue: "2024-03-15" },
    { student: "Д. Ган-Эрдэнэ", course: "Иргэний эрх зүй", total: 1200000, paid: 1200000, progress: 100, status: "Бүрэн төлөгдсөн", lastPayment: "2024-03-01", nextDue: "-" },
    { student: "Н. Болд-Эрдэнэ", course: "Бизнесийн стратеги", total: 2000000, paid: 1500000, progress: 75, status: "Төлөлт явагдаж байна", lastPayment: "2024-02-28", nextDue: "2024-03-28" },
    { student: "О. Цэцэг-Эрдэнэ", course: "Дижитал маркетинг", total: 1600000, paid: 800000, progress: 50, status: "Төлөлт явагдаж байна", lastPayment: "2024-02-20", nextDue: "2024-03-20" },
    { student: "С. Мөнх-Эрдэнэ", course: "Механик инженеринг", total: 2200000, paid: 2200000, progress: 100, status: "Бүрэн төлөгдсөн", lastPayment: "2024-02-28", nextDue: "-" },
  ];

  const totalStudents = paymentProgressData.length;
  const completedPayments = paymentProgressData.filter(item => item.progress === 100).length;
  const averageProgress = paymentProgressData.reduce((sum, item) => sum + item.progress, 0) / totalStudents;

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
          <h1 className="text-3xl font-bold text-white mb-2">Төлбөр төлөлтийн явц</h1>
          <p className="text-white/60">
            Оюутны төлбөр төлөлтийн явц, дүн шинжилгээ
          </p>
        </div>

        {/* Нийт статистик */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Нийт оюутан</h3>
              <div className="p-2 bg-violet-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M15 16c0-2.5-2-4-5-4s-5 1.5-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">{totalStudents}</div>
              <div className="text-sm text-white/60">Оюутан</div>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Бүрэн төлөгдсөн</h3>
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16 6l-8 8-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">{completedPayments}</div>
              <div className="text-sm text-white/60">Оюутан</div>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Дундаж явц</h3>
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10 6v8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">{averageProgress.toFixed(1)}%</div>
              <div className="text-sm text-white/60">Нийт дундаж</div>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Идэвхтэй төлөлт</h3>
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1v18M1 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">{totalStudents - completedPayments}</div>
              <div className="text-sm text-white/60">Оюутан</div>
            </div>
          </div>
        </div>

        {/* Төлбөрийн явцын хүснэгт */}
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Төлбөрийн явцын жагсаалт</h3>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors">
                Төлөлтийн төлөвлөгөө үүсгэх
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
                  <th className="text-left p-4 text-white/70 font-medium">Нийт төлбөр</th>
                  <th className="text-left p-4 text-white/70 font-medium">Төлсөн</th>
                  <th className="text-left p-4 text-white/70 font-medium">Явц</th>
                  <th className="text-left p-4 text-white/70 font-medium">Сүүлийн төлбөр</th>
                  <th className="text-left p-4 text-white/70 font-medium">Дараагийн төлбөр</th>
                  <th className="text-left p-4 text-white/70 font-medium">Төлөв</th>
                </tr>
              </thead>
              <tbody>
                {paymentProgressData.map((payment, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="p-4 text-white">{payment.student}</td>
                    <td className="p-4 text-white/70">{payment.course}</td>
                    <td className="p-4 text-white">₮ {payment.total.toLocaleString()}</td>
                    <td className="p-4 text-emerald-300">₮ {payment.paid.toLocaleString()}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              payment.progress >= 80 ? "bg-emerald-500" : 
                              payment.progress >= 50 ? "bg-amber-500" : 
                              "bg-rose-500"
                            }`}
                            style={{ width: `${payment.progress}%` }}
                          />
                        </div>
                        <span className="text-white">{payment.progress}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-white/70">{payment.lastPayment}</td>
                    <td className="p-4 text-white/70">{payment.nextDue}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        payment.status === "Бүрэн төлөгдсөн" ? "bg-emerald-500/20 text-emerald-300" :
                        payment.status === "Төлөлт явагдаж байна" ? "bg-amber-500/20 text-amber-300" :
                        "bg-rose-500/20 text-rose-300"
                      }`}>
                        {payment.status}
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
          <h4 className="text-lg font-semibold text-white mb-3">Төлбөр төлөлтийн явцын тайлбар</h4>
          <ul className="space-y-2 text-white/60 text-sm">
            <li>• Төлбөрийн явцыг сар бүр шинэчлэн гаргана</li>
            <li>• Явцын стандарт: 80%+ (Сайн), 50-79% (Дунд), 50%-аас бага (Муу)</li>
            <li>• Төлбөрийн төлөвлөгөөг автоматаар үүсгэнэ</li>
            <li>• Дараагийн төлбөрийн огнооноос 7 хоногийн өмнө сануулга илгээнэ</li>
            <li>• Төлбөрийн түүхийг бүрэн хадгална</li>
          </ul>
                </div>
          </div>
        </main>
      </div>
    </div>
  );
}