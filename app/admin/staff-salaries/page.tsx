"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function StaffSalaries() {
  const [activeMenu, setActiveMenu] = useState("Багш, ажилчдын цалин");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Set user type to finance admin in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("userType", "finance");
      localStorage.setItem("adminType", "finance-admin");
    }
  }, []);

  const salaries = [
    {
      id: "SAL-2024-001245",
      employee: "Д.Энхбаяр",
      position: "Програм хангамжийн багш",
      department: "Програм хангамжийн тэнхим",
      baseSalary: "₮ 2,500,000",
      bonus: "₮ 300,000",
      deductions: "₮ 250,000",
      netSalary: "₮ 2,550,000",
      status: "paid",
      paymentDate: "2024-05-05",
      attendance: "98%",
      workload: "24 цаг",
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: "SAL-2024-001246",
      employee: "Б.Батбаяр",
      position: "Сүлжээний технологийн багш",
      department: "Сүлжээний технологийн тэнхим",
      baseSalary: "₮ 2,400,000",
      bonus: "₮ 250,000",
      deductions: "₮ 240,000",
      netSalary: "₮ 2,410,000",
      status: "paid",
      paymentDate: "2024-05-05",
      attendance: "96%",
      workload: "22 цаг",
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "SAL-2024-001247",
      employee: "Ц.Ганбаатар",
      position: "Мэдээллийн аюулгүй байдлын багш",
      department: "Мэдээллийн аюулгүй байдлын тэнхим",
      baseSalary: "₮ 2,600,000",
      bonus: "₮ 350,000",
      deductions: "₮ 260,000",
      netSalary: "₮ 2,690,000",
      status: "paid",
      paymentDate: "2024-05-05",
      attendance: "100%",
      workload: "26 цаг",
      color: "from-amber-500 to-orange-600"
    },
    {
      id: "SAL-2024-001248",
      employee: "Л.Нямдаваа",
      position: "Мэдээлэл зүйн багш",
      department: "Мэдээлэл зүйн тэнхим",
      baseSalary: "₮ 2,300,000",
      bonus: "₮ 200,000",
      deductions: "₮ 230,000",
      netSalary: "₮ 2,270,000",
      status: "paid",
      paymentDate: "2024-05-05",
      attendance: "94%",
      workload: "20 цаг",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: "SAL-2024-001249",
      employee: "С.Эрдэнэтуяа",
      position: "Дижитал маркетингийн багш",
      department: "Дижитал маркетингийн тэнхим",
      baseSalary: "₮ 2,200,000",
      bonus: "₮ 180,000",
      deductions: "₮ 220,000",
      netSalary: "₮ 2,160,000",
      status: "paid",
      paymentDate: "2024-05-05",
      attendance: "92%",
      workload: "18 цаг",
      color: "from-indigo-500 to-blue-600"
    },
    {
      id: "SAL-2024-001250",
      employee: "Ж.Батжаргал",
      position: "Системийн инженерийн багш",
      department: "Системийн инженерийн тэнхим",
      baseSalary: "₮ 2,700,000",
      bonus: "₮ 400,000",
      deductions: "₮ 270,000",
      netSalary: "₮ 2,830,000",
      status: "pending",
      paymentDate: "2024-05-10",
      attendance: "100%",
      workload: "28 цаг",
      color: "from-rose-500 to-red-600"
    },
    {
      id: "SAL-2024-001251",
      employee: "Б.Ганбаатар",
      position: "Сургалтын албаны дарга",
      department: "Сургалтын алба",
      baseSalary: "₮ 3,500,000",
      bonus: "₮ 500,000",
      deductions: "₮ 350,000",
      netSalary: "₮ 3,650,000",
      status: "pending",
      paymentDate: "2024-05-10",
      attendance: "100%",
      workload: "40 цаг",
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: "SAL-2024-001252",
      employee: "Ц.Энхтуяа",
      position: "Санхүүгийн албаны дарга",
      department: "Санхүүгийн алба",
      baseSalary: "₮ 3,200,000",
      bonus: "₮ 400,000",
      deductions: "₮ 320,000",
      netSalary: "₮ 3,280,000",
      status: "pending",
      paymentDate: "2024-05-10",
      attendance: "98%",
      workload: "40 цаг",
      color: "from-lime-500 to-green-600"
    },
    {
      id: "SAL-2024-001253",
      employee: "Л.Нямдаваа",
      position: "Хүний нөөцийн албаны дарга",
      department: "Хүний нөөцийн алба",
      baseSalary: "₮ 3,000,000",
      bonus: "₮ 350,000",
      deductions: "₮ 300,000",
      netSalary: "₮ 3,050,000",
      status: "pending",
      paymentDate: "2024-05-10",
      attendance: "96%",
      workload: "40 цаг",
      color: "from-violet-500 to-purple-600"
    },
    {
      id: "SAL-2024-001254",
      employee: "Д.Батбаяр",
      position: "Захирал",
      department: "Удирдлага",
      baseSalary: "₮ 5,000,000",
      bonus: "₮ 1,000,000",
      deductions: "₮ 500,000",
      netSalary: "₮ 5,500,000",
      status: "pending",
      paymentDate: "2024-05-10",
      attendance: "100%",
      workload: "50 цаг",
      color: "from-gray-500 to-gray-600"
    },
  ];

  const departments = [
    { value: "all", label: "Бүх алба, тэнхим" },
    { value: "Програм хангамжийн тэнхим", label: "Програм хангамжийн тэнхим" },
    { value: "Сүлжээний технологийн тэнхим", label: "Сүлжээний технологийн тэнхим" },
    { value: "Мэдээллийн аюулгүй байдлын тэнхим", label: "Мэдээллийн аюулгүй байдлын тэнхим" },
    { value: "Мэдээлэл зүйн тэнхим", label: "Мэдээлэл зүйн тэнхим" },
    { value: "Дижитал маркетингийн тэнхим", label: "Дижитал маркетингийн тэнхим" },
    { value: "Системийн инженерийн тэнхим", label: "Системийн инженерийн тэнхим" },
    { value: "Сургалтын алба", label: "Сургалтын алба" },
    { value: "Санхүүгийн алба", label: "Санхүүгийн алба" },
    { value: "Хүний нө��цийн алба", label: "Хүний нөөцийн алба" },
    { value: "Удирдлага", label: "Удирдлага" },
  ];

  const statuses = [
    { value: "all", label: "Бүх статус" },
    { value: "paid", label: "Төлсөн" },
    { value: "pending", label: "Хүлээгдэж байгаа" },
  ];

  const filteredSalaries = salaries.filter(salary => {
    const matchesDepartment = filterDepartment === "all" || salary.department === filterDepartment;
    const matchesStatus = filterStatus === "all" || salary.status === filterStatus;
    return matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    return status === "paid" 
      ? "bg-emerald-500/10 text-emerald-400" 
      : "bg-amber-500/10 text-amber-400";
  };

  const getStatusText = (status: string) => {
    return status === "paid" ? "Төлсөн" : "Хүлээгдэж байгаа";
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
                  <label className="block text-sm text-white/50 mb-2">Алба, тэнхимээр шүүх</label>
                  <select
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2.5 text-white focus:border-white/20 focus:outline-none"
                  >
                    {departments.map(dept => (
                      <option key={dept.value} value={dept.value}>{dept.label}</option>
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
                { label: "Нийт цалин", value: "₮ 30.3M", icon: "💰", color: "bg-blue-500" },
                { label: "Нийт ажилчин", value: "10", icon: "👥", color: "bg-emerald-500" },
                { label: "Төлсөн цалин", value: "₮ 13.1M", icon: "✅", color: "bg-amber-500" },
                { label: "Хүлээгдэж байгаа", value: "₮ 17.2M", icon: "⏳", color: "bg-purple-500" },
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

            {/* Salaries List */}
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Цалингийн жагсаалт</h2>
                <p className="text-sm text-white/50">{filteredSalaries.length} цалин</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Цалингийн дугаар</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Ажилчин</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Албан тушаал</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Үндсэн цалин</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Урамшуулал</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Суутгал</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Цэвэр цалин</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Статус</th>
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Үйлдэл</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSalaries.map(salary => (
                      <tr key={salary.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${salary.color} flex items-center justify-center`}>
                              <span className="text-lg">💰</span>
                            </div>
                            <div>
                              <p className="font-medium text-white">{salary.id}</p>
                              <p className="text-xs text-white/50">{salary.department}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <p className="text-white">{salary.employee}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-white/50">Ирц: {salary.attendance}</span>
                            <span className="text-xs text-white/50">•</span>
                            <span className="text-xs text-white/50">Ачаалал: {salary.workload}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <p className="text-white">{salary.position}</p>
                        </td>
                        <td className="py-4">
                          <p className="text-lg font-bold text-white">{salary.baseSalary}</p>
                        </td>
                        <td className="py-4">
                          <p className="text-emerald-400">{salary.bonus}</p>
                        </td>
                        <td className="py-4">
                          <p className="text-amber-400">{salary.deductions}</p>
                        </td>
                        <td className="py-4">
                          <p className="text-2xl font-bold text-white">{salary.netSalary}</p>
                          <p className="text-xs text-white/50">Төлөх: {salary.paymentDate}</p>
                        </td>
                        <td className="py-4">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(salary.status)}`}>
                            {getStatusText(salary.status)}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            <button className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-white/70 hover:text-white">
                              Харах
                            </button>
                            <button className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-white/70 hover:text-white">
                              Тооцоолол
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredSalaries.length === 0 && (
                <div className="py-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-800 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Цалин олдсонгүй</h3>
                  <p className="text-sm text-white/50">Хайлтын үр дүнд тохирох цалин олдсонгүй</p>
                </div>
              )}
            </div>

            {/* Salary Distribution */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                <h2 className="text-lg font-semibold text-white mb-4">Алба, тэнхимийн цалингийн тархалт</h2>
                <div className="space-y-4">
                  {[
                    { department: "Удирдлага", amount: "₮ 5,500,000", percentage: 18, color: "bg-gray-500" },
                    { department: "Сургалтын алба", amount: "₮ 3,650,000", percentage: 12, color: "bg-blue-500" },
                    { department: "Санхүүгийн алба", amount: "₮ 3,280,000", percentage: 11, color: "bg-emerald-500" },
                    { department: "Хүний нөөцийн алба", amount: "₮ 3,050,000", percentage: 10, color: "bg-amber-500" },
                    { department: "Багш нар", amount: "₮ 14,820,000", percentage: 49, color: "bg-purple-500" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                        <span className="text-sm text-white/70">{item.department}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-32 rounded-full bg-white/[0.06] overflow-hidden">
                          <div 
                            className={`h-full ${item.color} rounded-full`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-white/50 w-24 text-right">{item.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                <h2 className="text-lg font-semibold text-white mb-4">Цалингийн бүрэлдэхүүн</h2>
                <div className="space-y-4">
                  {[
                    { component: "Үндсэн цалин", amount: "₮ 28,400,000", percentage: 94, color: "bg-blue-500" },
                    { component: "Урамшуулал", amount: "₮ 4,030,000", percentage: 13, color: "bg-emerald-500" },
                    { component: "Суутгал", amount: "₮ 2,840,000", percentage: 9, color: "bg-amber-500" },
                    { component: "Цэвэр цалин", amount: "₮ 30,290,000", percentage: 100, color: "bg-purple-500" },
                  ].map((item, index) => (
                    <div key={index} className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-medium text-white">{item.component}</p>
                          <p className="text-2xl font-bold text-white">{item.amount}</p>
                        </div>
                        <div className={`h-10 w-10 rounded-full ${item.color} flex items-center justify-center`}>
                          <span className="text-lg">💰</span>
                        </div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden">
                        <div 
                          className={`h-full ${item.color} rounded-full`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <p className="mt-2 text-sm text-white/50">{item.percentage}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Salary Calculation Tools */}
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <h2 className="text-lg font-semibold text-white mb-4">Цалин тооцооллын хэрэгслүүд</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { 
                    name: "Ирцийн мэдээлэл", 
                    description: "Сургалтын албаны ирцийн мэдээлэл авах",
                    icon: "📅",
                    color: "from-blue-500 to-cyan-600"
                  },
                  { 
                    name: "Цагийн ачаалал", 
                    description: "Багш нарын цагийн ачааллын мэдээлэл",
                    icon: "⏰",
                    color: "from-emerald-500 to-teal-600"
                  },
                  { 
                    name: "Цалин тооцоолол", 
                    description: "Цалингийн автомат тооцоолол хийх",
                    icon: "🧮",
                    color: "from-amber-500 to-orange-600"
                  },
                  { 
                    name: "Урамшуулал тооцоолол", 
                    description: "Урамшууллын тооцоолол хийх",
                    icon: "⭐",
                    color: "from-purple-500 to-pink-600"
                  },
                  { 
                    name: "Суутгал тооцоолол", 
                    description: "НДШ, ХХОАТ-ын тооцоолол хийх",
                    icon: "📋",
                    color: "from-indigo-500 to-blue-600"
                  },
                  { 
                    name: "Цалингийн тайлан", 
                    description: "Цалингийн тайлан үүсгэх, хэвлэх",
                    icon: "📊",
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