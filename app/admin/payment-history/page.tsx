"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function PaymentHistory() {
  const [activeMenu, setActiveMenu] = useState("Гүйлгээний түүх");
  const [filterMethod, setFilterMethod] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Set user type to finance admin in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("userType", "finance");
      localStorage.setItem("adminType", "finance-admin");
    }
  }, []);

  const payments = [
    {
      id: "PAY-2024-001245",
      invoiceId: "INV-2024-001245",
      student: "Б.Бат-Эрдэнэ",
      amount: "₮ 1,200,000",
      method: "bank",
      status: "completed",
      date: "2024-05-05 14:30",
      reference: "BANK-REF-001245",
      description: "2024 оны хавар улирлын сургалтын төлбөр",
      bankVerified: true,
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "PAY-2024-001246",
      invoiceId: "INV-2024-001247",
      student: "Л.Нямдаваа",
      amount: "₮ 1,200,000",
      method: "card",
      status: "completed",
      date: "2024-05-04 11:15",
      reference: "CARD-REF-001247",
      description: "2024 оны хавар улирлын сургалтын төлбөр",
      bankVerified: true,
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "PAY-2024-001247",
      invoiceId: "INV-2024-001249",
      student: "С.Эрдэнэтуяа",
      amount: "₮ 1,200,000",
      method: "bank",
      status: "completed",
      date: "2024-05-03 09:45",
      reference: "BANK-REF-001249",
      description: "2024 оны хавар улирлын сургалтын төлбөр",
      bankVerified: true,
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "PAY-2024-001248",
      invoiceId: "INV-2024-001251",
      student: "Б.Гантулга",
      amount: "₮ 1,200,000",
      method: "cash",
      status: "completed",
      date: "2024-05-02 16:20",
      reference: "CASH-REF-001251",
      description: "2024 оны хавар улирлын сургалтын төлбөр",
      bankVerified: false,
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "PAY-2024-001249",
      invoiceId: "INV-2024-001253",
      student: "Л.Нямдаваа",
      amount: "₮ 1,200,000",
      method: "bank",
      status: "completed",
      date: "2024-05-01 13:10",
      reference: "BANK-REF-001253",
      description: "2024 оны хавар улирлын төлбөр",
      bankVerified: true,
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "PAY-2024-001250",
      invoiceId: "INV-2024-001246",
      student: "Ц.Энхтулга",
      amount: "₮ 1,200,000",
      method: "bank",
      status: "pending",
      date: "2024-05-05 10:30",
      reference: "BANK-REF-001246",
      description: "2024 оны хавар улирлын сургалтын төлбөр",
      bankVerified: false,
      color: "from-amber-500 to-orange-600"
    },
    {
      id: "PAY-2024-001251",
      invoiceId: "INV-2024-001250",
      student: "Ж.Батжаргал",
      amount: "₮ 1,200,000",
      method: "card",
      status: "pending",
      date: "2024-05-04 15:45",
      reference: "CARD-REF-001250",
      description: "2024 оны хавар улирлын сургалтын төлбөр",
      bankVerified: false,
      color: "from-amber-500 to-orange-600"
    },
    {
      id: "PAY-2024-001252",
      invoiceId: "INV-2024-001254",
      student: "Д.Энхбаяр",
      amount: "₮ 1,200,000",
      method: "bank",
      status: "pending",
      date: "2024-05-03 12:20",
      reference: "BANK-REF-001254",
      description: "2024 оны хавар улирлын төлбөр",
      bankVerified: false,
      color: "from-amber-500 to-orange-600"
    },
    {
      id: "PAY-2024-001253",
      invoiceId: "INV-2024-001248",
      student: "Д.Ганбаатар",
      amount: "₮ 1,200,000",
      method: "bank",
      status: "failed",
      date: "2024-05-02 14:15",
      reference: "BANK-REF-001248",
      description: "2024 оны хавар улирлын төлбөр",
      bankVerified: false,
      color: "from-red-500 to-pink-600"
    },
    {
      id: "PAY-2024-001254",
      invoiceId: "INV-2024-001252",
      student: "Ц.Энхтуяа",
      amount: "₮ 1,200,000",
      method: "card",
      status: "failed",
      date: "2024-05-01 11:30",
      reference: "CARD-REF-001252",
      description: "2024 оны хавар улирлын төлбөр",
      bankVerified: false,
      color: "from-red-500 to-pink-600"
    },
  ];

  const methods = [
    { value: "all", label: "Бүх төлбөрийн арга" },
    { value: "bank", label: "Банкны шилжүүлэг" },
    { value: "card", label: "Картаар төлөлт" },
    { value: "cash", label: "Бэлнээр төлөлт" },
  ];

  const statuses = [
    { value: "all", label: "Бүх статус" },
    { value: "completed", label: "Амжилттай" },
    { value: "pending", label: "Хүлээгдэж байгаа" },
    { value: "failed", label: "Амжилтгүй" },
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesMethod = filterMethod === "all" || payment.method === filterMethod;
    const matchesStatus = filterStatus === "all" || payment.status === filterStatus;
    return matchesMethod && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-emerald-500/10 text-emerald-400";
      case "pending": return "bg-amber-500/10 text-amber-400";
      case "failed": return "bg-red-500/10 text-red-400";
      default: return "bg-gray-500/10 text-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Амжилттай";
      case "pending": return "Хүлээгдэж байгаа";
      case "failed": return "Амжилтгүй";
      default: return "Тодорхойгүй";
    }
  };

  const getMethodText = (method: string) => {
    switch (method) {
      case "bank": return "Банкны шилжүүлэг";
      case "card": return "Картаар төлөлт";
      case "cash": return "Бэлнээр төлөлт";
      default: return "Тодорхойгүй";
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "bank": return "🏦";
      case "card": return "💳";
      case "cash": return "💵";
      default: return "💰";
    }
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
            backgroundSize: "cover",
          }}
        >
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Filters */}
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-64">
                  <label className="block text-sm text-white/50 mb-2">Төлбөрийн аргаар шүүх</label>
                  <select
                    value={filterMethod}
                    onChange={(e) => setFilterMethod(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2.5 text-white focus:border-white/20 focus:outline-none"
                  >
                    {methods.map(method => (
                      <option key={method.value} value={method.value}>{method.label}</option>
                    ))}
                  </select>
                </div>
                <div className="md:w-64">
                  <label className="block text-sm text-white/50 mb-2">Статусаар шүүх</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2.5 text-white focus:border-white/20 focus:outline-none"
                  >
                    {statuses.map(status => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Нийт гүйлгээ", value: "10", icon: "📊", color: "bg-blue-500" },
                { label: "Нийт дүн", value: "₮ 12M", icon: "💰", color: "bg-emerald-500" },
                { label: "Амжилттай", value: "5", icon: "✅", color: "bg-amber-500" },
                { label: "Банкны баталгаажсан", value: "4", icon: "🏦", color: "bg-purple-500" },
              ].map((stat, index) => (
                <div key={index} className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
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

            {/* Payments List */}
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Гүйлгээний жагсаалт</h2>
                <p className="text-sm text-white/50">{filteredPayments.length} гүйлгээ</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Гүйлгээний дугаар</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Оюутан</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Дүн</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Төлбөрийн арга</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Статус</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Огноо</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Лавлагаа</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Банкны баталгаа</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Үйлдэл</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map(payment => (
                      <tr key={payment.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${payment.color} flex items-center justify-center`}>
                              <span className="text-lg">{getMethodIcon(payment.method)}</span>
                            </div>
                            <div>
                              <p className="font-medium text-white">{payment.id}</p>
                              <p className="text-xs text-white/50">Нэхэмжлэх: {payment.invoiceId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <p className="text-white">{payment.student}</p>
                        </td>
                        <td className="py-4">
                          <p className="text-lg font-bold text-white">{payment.amount}</p>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{getMethodIcon(payment.method)}</span>
                            <p className="text-white">{getMethodText(payment.method)}</p>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(payment.status)}`}>
                            {getStatusText(payment.status)}
                          </span>
                        </td>
                        <td className="py-4">
                          <p className="text-white">{payment.date}</p>
                        </td>
                        <td className="py-4">
                          <p className="text-sm text-white/70">{payment.reference}</p>
                          <p className="text-xs text-white/50 max-w-xs">{payment.description}</p>
                        </td>
                        <td className="py-4">
                          {payment.bankVerified ? (
                            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                              Баталгаажсан
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400">
                              Баталгаажаагүй
                            </span>
                          )}
                        </td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            <button className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-white/70 hover:text-white">
                              Харах
                            </button>
                            <button className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-white/70 hover:text-white">
                              Баталгаажуулах
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredPayments.length === 0 && (
                <div className="py-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-800 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Гүйлгээ олдсонгүй</h3>
                  <p className="text-sm text-white/50">Хайлтын үр дүнд тохирох гүйлгээ олдсонгүй</p>
                </div>
              )}
            </div>

            {/* Bank Reconciliation */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                <h2 className="text-lg font-semibold text-white mb-4">Банкны хуулгатай тулгах</h2>
                <div className="space-y-4">
                  {[
                    { bank: "Хаан банк", matched: 8, unmatched: 2, total: 10, color: "bg-blue-500" },
                    { bank: "Төрийн банк", matched: 5, unmatched: 1, total: 6, color: "bg-emerald-500" },
                    { bank: "Голомт банк", matched: 3, unmatched: 0, total: 3, color: "bg-amber-500" },
                    { bank: "Худалдаа хөгжлийн банк", matched: 2, unmatched: 1, total: 3, color: "bg-purple-500" },
                  ].map((item, index) => (
                    <div key={index} className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-white">{item.bank}</h3>
                          <p className="text-sm text-white/50">Нийт: {item.total} гүйлгээ</p>
                        </div>
                        <div className={`h-10 w-10 rounded-full ${item.color} flex items-center justify-center`}>
                          <span className="text-lg">🏦</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-white/50">Тулаагдсан:</span>
                          <span className="text-sm text-emerald-400">{item.matched}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-white/50">Тулаагдаагүй:</span>
                          <span className="text-sm text-amber-400">{item.unmatched}</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full"
                            style={{ width: `${(item.matched / item.total) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-white/50 text-right">{Math.round((item.matched / item.total) * 100)}% тулаагдсан</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                <h2 className="text-lg font-semibold text-white mb-4">Гүйлгээний статистик</h2>
                <div className="space-y-4">
                  {[
                    { label: "Дундаж гүйлгээний хэмжээ", value: "₮ 1,200,000", icon: "💰", color: "bg-blue-500" },
                    { label: "Гүйлгээний дундаж хугацаа", value: "2.4 хоног", icon: "⏱️", color: "bg-emerald-500" },
                    { label: "Банкны баталгаажилтын хувь", value: "80%", icon: "✅", color: "bg-amber-500" },
                    { label: "Тулалдааны хувь", value: "85%", icon: "📊", color: "bg-purple-500" },
                  ].map((stat, index) => (
                    <div key={index} className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
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
              </div>
            </div>

            {/* Import Tools */}
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <h2 className="text-lg font-semibold text-white mb-4">Банкны хуулга импортлох хэрэгслүүд</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { 
                    name: "CSV файл импортлох", 
                    description: "CSV форматын банкны хуулга импортлох",
                    icon: "📄",
                    color: "from-blue-500 to-cyan-600"
                  },
                  { 
                    name: "Excel файл импортлох", 
                    description: "Excel форматын банкны хуулга импортлох",
                    icon: "📊",
                    color: "from-emerald-500 to-teal-600"
                  },
                  { 
                    name: "PDF файл импортлох", 
                    description: "PDF форматын банкны хуулга импортлох",
                    icon: "📑",
                    color: "from-amber-500 to-orange-600"
                  },
                  { 
                    name: "API холболт", 
                    description: "Банкны API-аар шууд холбогдох",
                    icon: "🔌",
                    color: "from-purple-500 to-pink-600"
                  },
                  { 
                    name: "Автомат тулгах", 
                    description: "Гүйлгээг автоматаар тулгах",
                    icon: "⚡",
                    color: "from-indigo-500 to-blue-600"
                  },
                  { 
                    name: "Гарын үсэгтэй тулгах", 
                    description: "Гарын үсгээр гүйлгээ тулгах",
                    icon: "✍️",
                    color: "from-rose-500 to-red-600"
                  },
                ].map((tool, index) => (
                  <div key={index} className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${tool.color} flex items-center justify-center`}>
                        <span className="text-xl">{tool.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{tool.name}</h3>
                        <p className="text-sm text-white/50">{tool.description}</p>
                      </div>
                    </div>
                    <button className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/70 hover:text-white">
                      Ашиглах
                    </button>
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