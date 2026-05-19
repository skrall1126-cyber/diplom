"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function TuitionInvoices() {
  const [activeMenu, setActiveMenu] = useState("Төлбөрийн нэхэмжлэх");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Set user type to finance admin in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("userType", "finance");
      localStorage.setItem("adminType", "finance-admin");
    }
  }, []);

  const invoices = [
    {
      id: "INV-2024-001245",
      student: "Б.Бат-Эрдэнэ",
      studentId: "S2024001",
      amount: "₮ 1,200,000",
      dueDate: "2024-05-15",
      status: "paid",
      issuedDate: "2024-05-01",
      paymentDate: "2024-05-05",
      description: "2024 оны хавар улирлын сургалтын төлбөр",
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "INV-2024-001246",
      student: "Ц.Энхтулга",
      studentId: "S2024002",
      amount: "₮ 1,200,000",
      dueDate: "2024-05-15",
      status: "pending",
      issuedDate: "2024-05-01",
      paymentDate: "",
      description: "2024 оны хавар улирлын сургалтын төлбөр",
      color: "from-amber-500 to-orange-600"
    },
    {
      id: "INV-2024-001247",
      student: "Л.Нямдаваа",
      studentId: "S2024003",
      amount: "₮ 1,200,000",
      dueDate: "2024-05-15",
      status: "paid",
      issuedDate: "2024-05-01",
      paymentDate: "2024-05-04",
      description: "2024 оны хавар улирлын сургалтын төлбөр",
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "INV-2024-001248",
      student: "Д.Ганбаатар",
      studentId: "S2024004",
      amount: "₮ 1,200,000",
      dueDate: "2024-05-15",
      status: "overdue",
      issuedDate: "2024-05-01",
      paymentDate: "",
      description: "2024 оны хавар улирлын сургалтын төлбөр",
      color: "from-red-500 to-pink-600"
    },
    {
      id: "INV-2024-001249",
      student: "С.Эрдэнэтуяа",
      studentId: "S2024005",
      amount: "₮ 1,200,000",
      dueDate: "2024-05-15",
      status: "paid",
      issuedDate: "2024-05-01",
      paymentDate: "2024-05-03",
      description: "2024 оны хавар улирлын сургалтын төлбөр",
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "INV-2024-001250",
      student: "Ж.Батжаргал",
      studentId: "S2024006",
      amount: "₮ 1,200,000",
      dueDate: "2024-05-15",
      status: "pending",
      issuedDate: "2024-05-01",
      paymentDate: "",
      description: "2024 оны хавар улирлын сургалтын төлбөр",
      color: "from-amber-500 to-orange-600"
    },
    {
      id: "INV-2024-001251",
      student: "Б.Гантулга",
      studentId: "S2024007",
      amount: "₮ 1,200,000",
      dueDate: "2024-05-15",
      status: "paid",
      issuedDate: "2024-05-01",
      paymentDate: "2024-05-02",
      description: "2024 оны хавар улирлын сургалтын төлбөр",
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "INV-2024-001252",
      student: "Ц.Энхтуяа",
      studentId: "S2024008",
      amount: "₮ 1,200,000",
      dueDate: "2024-05-15",
      status: "overdue",
      issuedDate: "2024-05-01",
      paymentDate: "",
      description: "2024 оны хавар улирлын сургалтын төлбөр",
      color: "from-red-500 to-pink-600"
    },
    {
      id: "INV-2024-001253",
      student: "Л.Нямдаваа",
      studentId: "S2024009",
      amount: "₮ 1,200,000",
      dueDate: "2024-05-15",
      status: "paid",
      issuedDate: "2024-05-01",
      paymentDate: "2024-05-01",
      description: "2024 оны хавар улирлын сургалтын төлбөр",
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "INV-2024-001254",
      student: "Д.Энхбаяр",
      studentId: "S2024010",
      amount: "₮ 1,200,000",
      dueDate: "2024-05-15",
      status: "pending",
      issuedDate: "2024-05-01",
      paymentDate: "",
      description: "2024 оны хавар улирлын сургалтын төлбөр",
      color: "from-amber-500 to-orange-600"
    },
  ];

  const statuses = [
    { value: "all", label: "Бүх статус" },
    { value: "paid", label: "Төлсөн" },
    { value: "pending", label: "Хүлээгдэж байгаа" },
    { value: "overdue", label: "Хугацаа хэтэрсэн" },
  ];

  const filteredInvoices = invoices.filter(invoice => {
    return filterStatus === "all" || invoice.status === filterStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-emerald-500/10 text-emerald-400";
      case "pending": return "bg-amber-500/10 text-amber-400";
      case "overdue": return "bg-red-500/10 text-red-400";
      default: return "bg-gray-500/10 text-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid": return "Төлсөн";
      case "pending": return "Хүлээгдэж байгаа";
      case "overdue": return "Хугацаа хэтэрсэн";
      default: return "Тодорхойгүй";
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
              "linear-gradient(rgba(8, 14, 30, 0.9), rgba(8, 12, 24, 0.95)), url('/indra-bg.jpg')",
            backgroundPosition: "center center",
            backgroundSize: "72%",
          }}
        >
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Filters */}
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="flex flex-col md:flex-row gap-4">
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
                { label: "Нийт нэхэмжлэх", value: "10", icon: "📄", color: "bg-blue-500" },
                { label: "Төлсөн", value: "5", icon: "✅", color: "bg-emerald-500" },
                { label: "Хүлээгдэж байгаа", value: "3", icon: "⏳", color: "bg-amber-500" },
                { label: "Хугацаа хэтэрсэн", value: "2", icon: "⚠️", color: "bg-red-500" },
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

            {/* Invoices List */}
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Нэхэмжлэхийн жагсаалт</h2>
                <p className="text-sm text-white/50">{filteredInvoices.length} нэхэмжлэх</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Нэхэмжлэхийн дугаар</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Оюутан</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Дүн</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Төлөх эцсийн хугацаа</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Статус</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Үүсгэсэн</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Тайлбар</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Үйлдэл</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.map(invoice => (
                      <tr key={invoice.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${invoice.color} flex items-center justify-center`}>
                              <span className="text-lg">💰</span>
                            </div>
                            <div>
                              <p className="font-medium text-white">{invoice.id}</p>
                              <p className="text-xs text-white/50">Оюутны ID: {invoice.studentId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <p className="text-white">{invoice.student}</p>
                        </td>
                        <td className="py-4">
                          <p className="text-lg font-bold text-white">{invoice.amount}</p>
                        </td>
                        <td className="py-4">
                          <p className="text-white">{invoice.dueDate}</p>
                        </td>
                        <td className="py-4">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(invoice.status)}`}>
                            {getStatusText(invoice.status)}
                          </span>
                        </td>
                        <td className="py-4">
                          <p className="text-white">{invoice.issuedDate}</p>
                          {invoice.paymentDate && (
                            <p className="text-xs text-white/50">Төлсөн: {invoice.paymentDate}</p>
                          )}
                        </td>
                        <td className="py-4">
                          <p className="text-sm text-white/70 max-w-xs">{invoice.description}</p>
                        </td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            <button className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-white/70 hover:text-white">
                              Харах
                            </button>
                            <button className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-white/70 hover:text-white">
                              Засах
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredInvoices.length === 0 && (
                <div className="py-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-800 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Нэхэмжлэх олдсонгүй</h3>
                  <p className="text-sm text-white/50">Хайлтын үр дүнд тохирох нэхэмжлэх олдсонгүй</p>
                </div>
              )}
            </div>

            {/* Financial Summary */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                <h2 className="text-lg font-semibold text-white mb-4">Төлбөрийн хуваарь</h2>
                <div className="space-y-4">
                  {[
                    { period: "2024 оны хавар улирал", total: "₮ 12,000,000", paid: "₮ 6,000,000", pending: "₮ 3,600,000", overdue: "₮ 2,400,000" },
                    { period: "2024 оны намрын улирал", total: "₮ 12,000,000", paid: "₮ 0", pending: "₮ 12,000,000", overdue: "₮ 0" },
                    { period: "2023 оны өвлийн улирал", total: "₮ 12,000,000", paid: "₮ 11,400,000", pending: "₮ 0", overdue: "₮ 600,000" },
                    { period: "2023 оны намар улирал", total: "₮ 12,000,000", paid: "₮ 12,000,000", pending: "₮ 0", overdue: "₮ 0" },
                  ].map((item, index) => (
                    <div key={index} className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
                      <h3 className="font-bold text-white mb-3">{item.period}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-white/50">Нийт дүн:</span>
                          <span className="text-sm text-white">{item.total}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-white/50">Төлсөн:</span>
                          <span className="text-sm text-emerald-400">{item.paid}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-white/50">Хүлээгдэж байгаа:</span>
                          <span className="text-sm text-amber-400">{item.pending}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-white/50">Хугацаа хэтэрсэн:</span>
                          <span className="text-sm text-red-400">{item.overdue}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                <h2 className="text-lg font-semibold text-white mb-4">Төлбөрийн статистик</h2>
                <div className="space-y-4">
                  {[
                    { label: "Төлбөрийн дундаж хугацаа", value: "4.2 хоног", icon: "⏱️", color: "bg-blue-500" },
                    { label: "Төлбөрийн дундаж хэмжээ", value: "₮ 1,200,000", icon: "💰", color: "bg-emerald-500" },
                    { label: "Төлбөрийн амжилтын түвшин", value: "85%", icon: "📈", color: "bg-amber-500" },
                    { label: "Хугацаа хэтэрсэн төлбөр", value: "15%", icon: "⚠️", color: "bg-red-500" },
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

            {/* Invoice Generation Tools */}
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <h2 className="text-lg font-semibold text-white mb-4">Нэхэмжлэх үүсгэх хэрэгслүүд</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { 
                    name: "Ганц нэхэмжлэх үүсгэх", 
                    description: "Нэг оюутны төлбөрийн нэхэмжлэх үүсгэх",
                    icon: "📄",
                    color: "from-blue-500 to-cyan-600"
                  },
                  { 
                    name: "Бүлэг нэхэмжлэх үүсгэх", 
                    description: "Олон оюутны төлбөрийн нэхэмжлэх үүсгэх",
                    icon: "📑",
                    color: "from-emerald-500 to-teal-600"
                  },
                  { 
                    name: "Автомат нэхэмжлэх", 
                    description: "Өдөр тутмын автомат нэхэмжлэх үүсгэх",
                    icon: "⚡",
                    color: "from-amber-500 to-orange-600"
                  },
                  { 
                    name: "Нэхэмжлэх загвар", 
                    description: "Нэхэмжлэхийн загвар үүсгэх, засах",
                    icon: "🎨",
                    color: "from-purple-500 to-pink-600"
                  },
                  { 
                    name: "Нэхэмжлэх илгээх", 
                    description: "Нэхэмжлэхийг имэйлээр илгээх",
                    icon: "📧",
                    color: "from-indigo-500 to-blue-600"
                  },
                  { 
                    name: "Нэхэмжлэх хэвлэх", 
                    description: "Нэхэмжлэхийг хэвлэх, PDF болгох",
                    icon: "🖨️",
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