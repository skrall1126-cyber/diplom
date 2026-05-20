"use client";

import { useState, useEffect } from "react";
import { withAuth } from '@/contexts/AuthContext';
import { paymentsApi, salariesApi } from '@/lib/api';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

function FinanceAdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("Нүүр хуудас");
  const [payments, setPayments] = useState<any[]>([]);
  const [salaries, setSalaries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Set user type to finance in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("userType", "finance");
      localStorage.setItem("adminType", "finance-admin");
    }
    loadFinanceData();
  }, []);

  const loadFinanceData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load payments and salaries in parallel
      const [paymentsResult, salariesResult] = await Promise.all([
        paymentsApi.getAll(),
        salariesApi.getAll()
      ]);

      if (paymentsResult.error) {
        setError(paymentsResult.error);
        return;
      }

      if (salariesResult.error) {
        setError(salariesResult.error);
        return;
      }

      if (paymentsResult.data) {
        setPayments(paymentsResult.data.payments || []);
      }

      if (salariesResult.data) {
        setSalaries(salariesResult.data.salaries || []);
      }
    } catch (err: any) {
      setError(err.message || 'Санхүүгийн өгөгдөл ачаалахад алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#06030f]">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Санхүүгийн өгөгдөл ачаалж байна...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#06030f]">
        <div className="text-white text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-red-400 mb-4 text-xl">Алдаа гарлаа</p>
          <p className="text-white/60 mb-6">{error}</p>
          <button 
            onClick={loadFinanceData}
            className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Дахин оролдох
          </button>
        </div>
      </div>
    );
  }

  // Calculate stats from API data
  const paidPayments = payments.filter(p => p.status === 'PAID').length;
  const overduePayments = payments.filter(p => p.status === 'OVERDUE').length;
  const totalIncome = payments.filter(p => p.status === 'PAID').reduce((sum, p) => sum + (p.amount || 0), 0);
  const totalExpenses = salaries.filter(s => s.status === 'PAID').reduce((sum, s) => sum + (s.net_salary || 0), 0);

  const stats = [
    { label: "Төлбөрийн мэдээлэл", value: paidPayments.toString(), change: "Төлсөн", color: "bg-emerald-500", icon: "💰" },
    { label: "Хүлээгдэж буй төлбөр", value: overduePayments.toString(), change: "Хугацаа хэтэрсэн", color: "bg-red-500", icon: "⏰" },
    { label: "Нийт орлого", value: `₮ ${totalIncome.toLocaleString()}`, change: "Энэ сар", color: "bg-blue-500", icon: "📋" },
    { label: "Нийт зарлага", value: `₮ ${totalExpenses.toLocaleString()}`, change: "Энэ сар", color: "bg-purple-500", icon: "👁️" },
  ];

  const quickActions = [
    { label: "Төлбөр бүртгэх", description: "Шинэ", icon: "💰", color: "from-emerald-600 to-emerald-800" },
    { label: "Тайлан гаргах", description: "Сар бүр", icon: "📋", color: "from-blue-600 to-blue-800" },
    { label: "Хяналт хийх", description: "Шинэчлэх", icon: "👁️", color: "from-purple-600 to-purple-800" },
    { label: "Тохиргоо", description: "Засах", icon: "⚙️", color: "from-gray-600 to-gray-800" },
  ];

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
            {/* Stats grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{stat.icon}</span>
                        <p className="text-sm text-white/50">{stat.label}</p>
                      </div>
                      <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`h-12 w-12 rounded-full ${stat.color} flex items-center justify-center`}>
                      <span className="text-lg font-bold text-white">+</span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-emerald-400">{stat.change}</p>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70 mb-4">Түргэн үйлдлүүд</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {quickActions.map((action, index) => (
                  <button 
                    key={index}
                    className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4 text-center hover:bg-white/[0.1] transition-colors"
                  >
                    <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${action.color} flex items-center justify-center mx-auto mb-2`}>
                      <span className="text-lg">{action.icon}</span>
                    </div>
                    <p className="text-sm font-medium text-white">{action.label}</p>
                    <p className="text-xs text-white/50 mt-1">{action.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Finance specific content */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Financial overview */}
              <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70 mb-4">Санхүүгийн тойм</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/50">Нийт орлого</span>
                    <span className="text-sm font-medium text-emerald-400">₮ 245,800,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/50">Нийт зарлага</span>
                    <span className="text-sm font-medium text-red-400">₮ 198,500,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/50">Цэвэр ашиг</span>
                    <span className="text-sm font-medium text-emerald-400">₮ 47,300,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/50">Төлбөрийн дутагдал</span>
                    <span className="text-sm font-medium text-amber-400">₮ 12,500,000</span>
                  </div>
                </div>
              </div>

              {/* Recent payments */}
              <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">Сүүлийн төлбөрүүд</h2>
                  <button className="text-sm text-emerald-400 hover:text-emerald-300">
                    Бүгдийг харах
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { student: "Төртэмүүлэн", amount: "₮ 2,500,000", date: "Өнөөдөр", status: "Төлсөн" },
                    { student: "Э.Батжаргал", amount: "₮ 2,500,000", date: "Өчигдөр", status: "Төлсөн" },
                    { student: "Ц.Мөнхбат", amount: "₮ 2,500,000", date: "2 хоног", status: "Хүлээгдэж" },
                  ].map((payment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-[22px] border border-white/5 bg-white/[0.03] p-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-white">{payment.student}</p>
                        <p className="text-xs text-white/50">{payment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-white">{payment.amount}</p>
                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs ${
                          payment.status === "Төлсөн" 
                            ? "bg-emerald-500/10 text-emerald-300" 
                            : "bg-amber-500/10 text-amber-300"
                        }`}>
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment statistics */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70 mb-4">Төлбөрийн статистик</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Төлсөн", value: "₮ 198,500,000", percentage: "85%", color: "bg-emerald-500" },
                  { label: "Хүлээгдэж", value: "₮ 25,300,000", percentage: "11%", color: "bg-amber-500" },
                  { label: "Хугацаа хэтэрсэн", value: "₮ 12,500,000", percentage: "5%", color: "bg-red-500" },
                  { label: "Цуцлагдсан", value: "₮ 1,200,000", percentage: "1%", color: "bg-gray-500" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`h-16 w-16 rounded-full ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                      <span className="text-lg font-bold text-white">{stat.percentage}</span>
                    </div>
                    <p className="text-sm font-medium text-white">{stat.label}</p>
                    <p className="text-xs text-white/50">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activities */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">Сүүлийн үйлдлүүд</h2>
                <button className="text-sm text-violet-400 hover:text-violet-300">
                  Бүгдийг харах
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { user: "Төртэмүүлэн", action: "Төлбөр төлсөн", time: "10 мин өмнө", amount: "₮ 2,500,000" },
                  { user: "Э.Батжаргал", action: "Төлбөр бүртгэв", time: "25 мин өмнө", amount: "₮ 2,500,000" },
                  { user: "Ц.Мөнхбат", action: "Төлбөрийн мэдэгдэл", time: "1 цаг өмнө", amount: "₮ 2,500,000" },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-600 to-green-800 flex items-center justify-center">
                        <span className="text-sm font-semibold text-white">
                          {activity.user.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{activity.user}</p>
                        <p className="text-xs text-white/50">{activity.action}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/40">{activity.time}</p>
                      <p className="text-sm font-bold text-emerald-300">{activity.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

// Protected page - only SUPER_ADMIN, FINANCE_ADMIN can access
export default withAuth(FinanceAdminDashboard, ['SUPER_ADMIN', 'FINANCE_ADMIN']);
