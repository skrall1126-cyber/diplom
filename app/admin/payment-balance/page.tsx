"use client";


import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PaymentBalancePage() {
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

  const paymentData = [
    { student: "Б. Бат-Эрдэнэ", course: "Python програмчлал", total: 1500000, paid: 1000000, balance: 500000, dueDate: "2024-03-15", status: "Хугацаа хэтрээгүй" },
    { student: "Ц. Энх-Амгалан", course: "Санхүүгийн удирдлага", total: 1800000, paid: 900000, balance: 900000, dueDate: "2024-03-10", status: "Хугацаа хэтэрсэн" },
    { student: "Д. Ган-Эрдэнэ", course: "Иргэний эрх зүй", total: 1200000, paid: 1200000, balance: 0, dueDate: "2024-03-01", status: "Төлөгдсөн" },
    { student: "Н. Болд-Эрдэнэ", course: "Бизнесийн стратеги", total: 2000000, paid: 1500000, balance: 500000, dueDate: "2024-03-20", status: "Хугацаа хэтрээгүй" },
    { student: "О. Цэцэг-Эрдэнэ", course: "Дижитал маркетинг", total: 1600000, paid: 800000, balance: 800000, dueDate: "2024-03-05", status: "Хугацаа хэтэрсэн" },
    { student: "С. Мөнх-Эрдэнэ", course: "Механик инженеринг", total: 2200000, paid: 2200000, balance: 0, dueDate: "2024-02-28", status: "Төлөгдсөн" },
  ];

  const totalBalance = paymentData.reduce((sum, item) => sum + item.balance, 0);
  const overdueBalance = paymentData
    .filter(item => item.status === "Хугацаа хэтэрсэн")
    .reduce((sum, item) => sum + item.balance, 0);

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
          <h1 className="text-3xl font-bold text-white mb-2">Төлбөрийн үлдэгдэл</h1>
          <p className="text-white/60">
            Оюутны төлбөрийн үлдэгдэл, хугацаа хэтэрсэн төлбөрийн мэдээлэл
          </p>
        </div>

        {/* Нийт статистик */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Нийт үлдэгдэл</h3>
              <div className="p-2 bg-rose-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1v18M1 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">₮ {totalBalance.toLocaleString()}</div>
              <div className="text-sm text-white/60">6 оюутнаас</div>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Хугацаа хэтэрсэн</h3>
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1v18M1 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">₮ {overdueBalance.toLocaleString()}</div>
              <div className="text-sm text-white/60">2 оюутнаас</div>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Төлөгдсөн</h3>
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1v18M1 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">2 оюутан</div>
              <div className="text-sm text-white/60">Бүрэн төлөгдсөн</div>
            </div>
          </div>
        </div>

        {/* Төлбөрийн үлдэгдлийн хүснэгт */}
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Төлбөрийн үлдэгдлийн жагсаалт</h3>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors">
                Мэдэгдэл илгээх
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
                  <th className="text-left p-4 text-white/70 font-medium">Үлдэгдэл</th>
                  <th className="text-left p-4 text-white/70 font-medium">Эцсийн хугацаа</th>
                  <th className="text-left p-4 text-white/70 font-medium">Төлөв</th>
                  <th className="text-left p-4 text-white/70 font-medium">Үйлдэл</th>
                </tr>
              </thead>
              <tbody>
                {paymentData.map((payment, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="p-4 text-white">{payment.student}</td>
                    <td className="p-4 text-white/70">{payment.course}</td>
                    <td className="p-4 text-white">₮ {payment.total.toLocaleString()}</td>
                    <td className="p-4 text-emerald-300">₮ {payment.paid.toLocaleString()}</td>
                    <td className="p-4 text-rose-300">₮ {payment.balance.toLocaleString()}</td>
                    <td className="p-4 text-white/70">{payment.dueDate}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        payment.status === "Төлөгдсөн" ? "bg-emerald-500/20 text-emerald-300" :
                        payment.status === "Хугацаа хэтэрсэн" ? "bg-rose-500/20 text-rose-300" :
                        "bg-amber-500/20 text-amber-300"
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="px-3 py-1.5 text-sm bg-white/[0.08] hover:bg-white/[0.12] text-white/80 hover:text-white rounded-lg transition-colors">
                        Дэлгэрэнгүй
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
          <h4 className="text-lg font-semibold text-white mb-3">Төлбөрийн үлдэгдлийн тайлбар</h4>
          <ul className="space-y-2 text-white/60 text-sm">
            <li>• Төлбөрийн үлдэгдлийг сар бүр шинэчлэн гаргана</li>
            <li>• Хугацаа хэтэрсэн төлбөрийг улаан өнгөөр тэмдэглэнэ</li>
            <li>• Эцсийн хугацаанаас 7 хоногийн өмнө сануулга илгээнэ</li>
            <li>• Төлбөр төлөлтийн явцыг бодит цагт хянана</li>
            <li>• Оюутнуудын төлбөрийн түүхийг хадгална</li>
          </ul>
                </div>
          </div>
        </main>
      </div>
    </div>
  );
}