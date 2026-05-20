"use client";

import { useState, useEffect } from "react";
import { withAuth } from '@/contexts/AuthContext';
import Navbar from "@/components/Navbar";
import { withAuth } from '@/contexts/AuthContext';
import Sidebar from "@/components/Sidebar";
import { withAuth } from '@/contexts/AuthContext';
import Link from "next/link";
import { withAuth } from '@/contexts/AuthContext';

function StaffSalaries() {
  const [activeMenu, setActiveMenu] = useState("Багш, ажилчдын цалин");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCalculationModal, setShowCalculationModal] = useState(false);
  const [calculationEmployee, setCalculationEmployee] = useState<any>(null);
  
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
      baseSalary: 2500000,
      bonus: 300000,
      deductions: 250000,
      netSalary: 2550000,
      status: "paid",
      paymentDate: "2024-05-05",
      attendance: "98%",
      workload: "24 цаг",
      color: "from-blue-500 to-cyan-600",
      email: "enkhbayar@indra.edu.mn",
      phone: "9999-1111",
      bankAccount: "5302 8642 8100",
      bankName: "Хаан банк",
      taxId: "УБ12345678",
      socialInsurance: 200000,
      healthInsurance: 50000,
      courses: ["Python үндэс", "JavaScript", "React"],
      teachingHours: 24,
      overtimeHours: 4,
      bonusReason: "Сургалтын чанар сайн"
    },
    {
      id: "SAL-2024-001246",
      employee: "Б.Батбаяр",
      position: "Сүлжээний технологийн багш",
      department: "Сүлжээний технологийн тэнхим",
      baseSalary: 2400000,
      bonus: 250000,
      deductions: 240000,
      netSalary: 2410000,
      status: "paid",
      paymentDate: "2024-05-05",
      attendance: "96%",
      workload: "22 цаг",
      color: "from-emerald-500 to-teal-600",
      email: "batbayar@indra.edu.mn",
      phone: "9999-2222",
      bankAccount: "5302 8642 8200",
      bankName: "Голомт банк",
      taxId: "УБ23456789",
      socialInsurance: 192000,
      healthInsurance: 48000,
      courses: ["Сүлжээний үндэс", "Cisco CCNA", "Network Security"],
      teachingHours: 22,
      overtimeHours: 2,
      bonusReason: "Сертификат олгох сургалт"
    },
    {
      id: "SAL-2024-001247",
      employee: "Ц.Ганбаатар",
      position: "Мэдээллийн аюулгүй байдлын багш",
      department: "Мэдээллийн аюулгүй байдлын тэнхим",
      baseSalary: 2600000,
      bonus: 350000,
      deductions: 260000,
      netSalary: 2690000,
      status: "paid",
      paymentDate: "2024-05-05",
      attendance: "100%",
      workload: "26 цаг",
      color: "from-amber-500 to-orange-600",
      email: "ganbaatar@indra.edu.mn",
      phone: "9999-3333",
      bankAccount: "5302 8642 8300",
      bankName: "Хаан банк",
      taxId: "УБ34567890",
      socialInsurance: 208000,
      healthInsurance: 52000,
      courses: ["Ethical Hacking", "Cybersecurity", "Penetration Testing"],
      teachingHours: 26,
      overtimeHours: 6,
      bonusReason: "Олон улсын сертификат"
    },
    {
      id: "SAL-2024-001248",
      employee: "Л.Нямдаваа",
      position: "Мэдээлэл зүйн багш",
      department: "Мэдээлэл зүйн тэнхим",
      baseSalary: 2300000,
      bonus: 200000,
      deductions: 230000,
      netSalary: 2270000,
      status: "paid",
      paymentDate: "2024-05-05",
      attendance: "94%",
      workload: "20 цаг",
      color: "from-purple-500 to-pink-600",
      email: "nyamdavaa@indra.edu.mn",
      phone: "9999-4444",
      bankAccount: "5302 8642 8400",
      bankName: "Төрийн банк",
      taxId: "УБ45678901",
      socialInsurance: 184000,
      healthInsurance: 46000,
      courses: ["Database Management", "SQL", "Data Analytics"],
      teachingHours: 20,
      overtimeHours: 0,
      bonusReason: "Оюутны үнэлгээ өндөр"
    },
    {
      id: "SAL-2024-001249",
      employee: "С.Эрдэнэтуяа",
      position: "Дижитал маркетингийн багш",
      department: "Дижитал маркетингийн тэнхим",
      baseSalary: 2200000,
      bonus: 180000,
      deductions: 220000,
      netSalary: 2160000,
      status: "paid",
      paymentDate: "2024-05-05",
      attendance: "92%",
      workload: "18 цаг",
      color: "from-indigo-500 to-blue-600",
      email: "erdentuya@indra.edu.mn",
      phone: "9999-5555",
      bankAccount: "5302 8642 8500",
      bankName: "Голомт банк",
      taxId: "УБ56789012",
      socialInsurance: 176000,
      healthInsurance: 44000,
      courses: ["Digital Marketing", "SEO/SEM", "Social Media Marketing"],
      teachingHours: 18,
      overtimeHours: 0,
      bonusReason: "Шинэ хөтөлбөр боловсруулсан"
    },
    {
      id: "SAL-2024-001250",
      employee: "Ж.Батжаргал",
      position: "Системийн инженерийн багш",
      department: "Системийн инженерийн тэнхим",
      baseSalary: 2700000,
      bonus: 400000,
      deductions: 270000,
      netSalary: 2830000,
      status: "pending",
      paymentDate: "2024-05-10",
      attendance: "100%",
      workload: "28 цаг",
      color: "from-rose-500 to-red-600",
      email: "batjargal@indra.edu.mn",
      phone: "9999-6666",
      bankAccount: "5302 8642 8600",
      bankName: "Хаан банк",
      taxId: "УБ67890123",
      socialInsurance: 216000,
      healthInsurance: 54000,
      courses: ["Linux System Admin", "DevOps", "Cloud Computing"],
      teachingHours: 28,
      overtimeHours: 8,
      bonusReason: "Лаборатори тохируулга"
    },
    {
      id: "SAL-2024-001251",
      employee: "Б.Ганбаатар",
      position: "Сургалтын албаны дарга",
      department: "Сургалтын алба",
      baseSalary: 3500000,
      bonus: 500000,
      deductions: 350000,
      netSalary: 3650000,
      status: "pending",
      paymentDate: "2024-05-10",
      attendance: "100%",
      workload: "40 цаг",
      color: "from-cyan-500 to-blue-600",
      email: "ganbaatar.b@indra.edu.mn",
      phone: "9999-7777",
      bankAccount: "5302 8642 8700",
      bankName: "Төрийн банк",
      taxId: "УБ78901234",
      socialInsurance: 280000,
      healthInsurance: 70000,
      courses: [],
      teachingHours: 0,
      overtimeHours: 10,
      bonusReason: "Удирдлагын үр дүн"
    },
    {
      id: "SAL-2024-001252",
      employee: "Ц.Энхтуяа",
      position: "Санхүүгийн албаны дарга",
      department: "Санхүүгийн алба",
      baseSalary: 3200000,
      bonus: 400000,
      deductions: 320000,
      netSalary: 3280000,
      status: "pending",
      paymentDate: "2024-05-10",
      attendance: "98%",
      workload: "40 цаг",
      color: "from-lime-500 to-green-600",
      email: "enkhtuya@indra.edu.mn",
      phone: "9999-8888",
      bankAccount: "5302 8642 8800",
      bankName: "Голомт банк",
      taxId: "УБ89012345",
      socialInsurance: 256000,
      healthInsurance: 64000,
      courses: [],
      teachingHours: 0,
      overtimeHours: 8,
      bonusReason: "Санхүүгийн тайлан чанартай"
    },
    {
      id: "SAL-2024-001253",
      employee: "Л.Нямдаваа",
      position: "Хүний нөөцийн албаны дарга",
      department: "Хүний нөөцийн алба",
      baseSalary: 3000000,
      bonus: 350000,
      deductions: 300000,
      netSalary: 3050000,
      status: "pending",
      paymentDate: "2024-05-10",
      attendance: "96%",
      workload: "40 цаг",
      color: "from-violet-500 to-purple-600",
      email: "nyamdavaa.l@indra.edu.mn",
      phone: "9999-9999",
      bankAccount: "5302 9864 2900",
      bankName: "Хаан банк",
      taxId: "УБ90123456",
      socialInsurance: 240000,
      healthInsurance: 60000,
      courses: [],
      teachingHours: 0,
      overtimeHours: 3,
      bonusReason: "Шинэ ажилчдын сургалт зохион байгуулсан"
    },
    {
      id: "SAL-2024-001254",
      employee: "Д.Батбаяр",
      position: "Захирал",
      department: "Удирдлага",
      baseSalary: 5000000,
      bonus: 1000000,
      deductions: 500000,
      netSalary: 5500000,
      status: "pending",
      paymentDate: "2024-05-10",
      attendance: "100%",
      workload: "50 цаг",
      color: "from-gray-500 to-gray-600",
      email: "batbayar.d@indra.edu.mn",
      phone: "9999-0000",
      bankAccount: "5302 8753 1000",
      bankName: "Төрийн банк",
      taxId: "УБ01234567",
      socialInsurance: 400000,
      healthInsurance: 100000,
      courses: [],
      teachingHours: 0,
      overtimeHours: 15,
      bonusReason: "Байгууллагын стратеги төлөвлөгөө амжилттай хэрэгжүүлсэн"
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
    const matchesSearch = searchQuery === "" || 
      salary.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salary.employee.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesStatus && matchesSearch;
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
              "linear-gradient(rgba(8, 14, 30, 0.75), rgba(8, 12, 24, 0.8)), url('/indra-bg.jpg')",
            backgroundPosition: "center center",
            backgroundAttachment: "scroll",
            backgroundSize: "72%",
          }}
        >
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Filters */}
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-white/50 mb-2">Багш/Ажилтны ID хайх</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="SAL-2024-001245"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2.5 text-white placeholder:text-white/40 focus:border-white/20 focus:outline-none"
                  />
                </div>
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
                      <th className="pb-3 text-left text-sm font-medium text-white/50">Багшийн ID</th>
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
                          <p className="font-medium text-white">{salary.id}</p>
                        </td>
                        <td className="py-4">
                          <p className="text-white">{salary.employee}</p>
                        </td>
                        <td className="py-4">
                          <p className="text-white">{salary.position}</p>
                        </td>
                        <td className="py-4">
                          <p className="text-lg font-bold text-white">₮ {salary.baseSalary.toLocaleString()}</p>
                        </td>
                        <td className="py-4">
                          <p className="text-emerald-400">₮ {salary.bonus.toLocaleString()}</p>
                        </td>
                        <td className="py-4">
                          <p className="text-amber-400">₮ {salary.deductions.toLocaleString()}</p>
                        </td>
                        <td className="py-4">
                          <p className="text-2xl font-bold text-white">₮ {salary.netSalary.toLocaleString()}</p>
                        </td>
                        <td className="py-4">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(salary.status)}`}>
                            {getStatusText(salary.status)}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                setSelectedEmployee(salary);
                                setShowDetailModal(true);
                              }}
                              className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-white/70 hover:text-white"
                            >
                              Дэлгэрэнгүй
                            </button>
                            <button 
                              onClick={() => {
                                setCalculationEmployee(salary);
                                setShowCalculationModal(true);
                              }}
                              className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-white/70 hover:text-white"
                            >
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
                  <h3 className="text-lg font-semibold text-white mb-2">Цалин олдсонгүй</h3>
                  <p className="text-sm text-white/50">Хайлтын үр дүнд тохирох цалин олдсонгүй</p>
                </div>
              )}
            </div>

            {/* Stats and Distribution */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Stats */}
              <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                <h2 className="text-lg font-semibold text-white mb-4">Цалингийн статистик</h2>
                <div className="space-y-4">
                  {[
                    { label: "Нийт цалин", value: "₮ 30,300,000", percentage: 100, color: "bg-blue-500" },
                    { label: "Нийт ажилчин", value: "10 хүн", percentage: 100, color: "bg-emerald-500" },
                    { label: "Төлсөн цалин", value: "₮ 13,100,000", percentage: 43, color: "bg-green-500" },
                    { label: "Хүлээгдэж байгаа", value: "₮ 17,200,000", percentage: 57, color: "bg-amber-500" },
                  ].map((stat, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-40">
                        <p className="text-sm font-medium text-white">{stat.label}</p>
                      </div>
                      <div className="flex-1">
                        <div className="h-3 w-full rounded-full bg-white/[0.06] overflow-hidden">
                          <div 
                            className={`h-full ${stat.color} rounded-full`}
                            style={{ width: `${stat.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-36 text-right">
                        <p className="text-sm font-bold text-white">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Salary Distribution */}
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
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex items-center gap-3 w-48">
                        <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                        <span className="text-sm text-white/70">{item.department}</span>
                      </div>
                      <div className="flex-1">
                        <div className="h-3 w-full rounded-full bg-white/[0.06] overflow-hidden">
                          <div 
                            className={`h-full ${item.color} rounded-full`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm text-white/50 w-32 text-right">{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* Employee Detail Modal */}
      {showDetailModal && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-[#0a1628] via-[#081120] to-[#0a1628] shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-blue-500/5 to-transparent pointer-events-none" />
            
            {/* Close button */}
            <div className="absolute right-4 top-4 flex gap-2 z-20">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedEmployee(null);
                }}
                className="group rounded-xl border border-white/20 bg-white/10 p-2.5 text-white/70 hover:text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200 shadow-lg"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="group-hover:rotate-90 transition-transform duration-200">
                  <path d="M5 5l10 10M15 5l-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="relative max-h-[92vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 z-10 border-b border-white/10 bg-gradient-to-r from-emerald-600/20 via-blue-600/20 to-emerald-600/20 backdrop-blur-xl px-8 py-6">
                <div className="flex items-center gap-5">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-1">{selectedEmployee.employee}</h2>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm text-white/60 font-mono">{selectedEmployee.id}</span>
                      <span className="h-1 w-1 rounded-full bg-white/30" />
                      <span className="text-sm text-white/60">{selectedEmployee.position}</span>
                      <span className="h-1 w-1 rounded-full bg-white/30" />
                      <span className="text-sm text-white/60">{selectedEmployee.department}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/50 mb-1">Цэвэр цалин</p>
                    <p className="text-3xl font-bold text-emerald-300">₮ {selectedEmployee.netSalary.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Personal & Contact Information */}
              <div className="px-8 py-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-1 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Хувийн мэдээлэл</h3>
                </div>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-6 backdrop-blur-sm">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Овог нэр</p>
                      <p className="text-base font-medium text-white group-hover:text-blue-300 transition-colors">{selectedEmployee.employee}</p>
                    </div>
                    <div className="group">
                      <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Албан тушаал</p>
                      <p className="text-base font-medium text-white group-hover:text-blue-300 transition-colors">{selectedEmployee.position}</p>
                    </div>
                    {selectedEmployee.email && (
                      <div className="group">
                        <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Имэйл хаяг</p>
                        <p className="text-base font-medium text-white group-hover:text-blue-300 transition-colors">{selectedEmployee.email}</p>
                      </div>
                    )}
                    {selectedEmployee.phone && (
                      <div className="group">
                        <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Утасны дугаар</p>
                        <p className="text-base font-medium text-white group-hover:text-blue-300 transition-colors">{selectedEmployee.phone}</p>
                      </div>
                    )}
                    {selectedEmployee.taxId && (
                      <div className="group">
                        <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Татварын дугаар</p>
                        <p className="text-base font-mono font-medium text-white/60">{selectedEmployee.taxId}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bank Information */}
              {selectedEmployee.bankAccount && (
                <div className="px-8 py-6 bg-gradient-to-br from-emerald-500/5 to-transparent">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-1 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600" />
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Банкны мэдээлэл</h3>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-6 backdrop-blur-sm">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="group">
                        <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Банкны нэр</p>
                        <p className="text-base font-medium text-white group-hover:text-emerald-300 transition-colors">{selectedEmployee.bankName}</p>
                      </div>
                      <div className="group">
                        <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Дансны дугаар</p>
                        <p className="text-base font-mono font-medium text-white group-hover:text-emerald-300 transition-colors">{selectedEmployee.bankAccount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Salary Breakdown */}
              <div className="px-8 py-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-1 w-10 rounded-full bg-gradient-to-r from-amber-500 to-amber-600" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Цалингийн задаргаа</h3>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-5">
                    <p className="text-sm text-white/60 mb-3">Үндсэн цалин</p>
                    <p className="text-2xl font-bold text-white">₮ {selectedEmployee.baseSalary.toLocaleString()}</p>
                  </div>
                  
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 p-5">
                    <p className="text-sm text-white/60 mb-3">Урамшуулал</p>
                    <p className="text-2xl font-bold text-emerald-300">₮ {selectedEmployee.bonus.toLocaleString()}</p>
                    {selectedEmployee.bonusReason && (
                      <p className="text-xs text-white/50 mt-2">{selectedEmployee.bonusReason}</p>
                    )}
                  </div>
                  
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-amber-500/10 to-amber-600/5 p-5">
                    <p className="text-sm text-white/60 mb-3">Суутгал</p>
                    <p className="text-2xl font-bold text-amber-300">₮ {selectedEmployee.deductions.toLocaleString()}</p>
                    {selectedEmployee.socialInsurance && (
                      <div className="mt-3 space-y-1 text-xs text-white/50">
                        <p>НДШ: ₮ {selectedEmployee.socialInsurance.toLocaleString()}</p>
                        {selectedEmployee.healthInsurance && (
                          <p>ЭМД: ₮ {selectedEmployee.healthInsurance.toLocaleString()}</p>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="rounded-xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 p-5">
                    <p className="text-sm text-emerald-300 mb-3">Цэвэр цалин</p>
                    <p className="text-3xl font-bold text-emerald-300">₮ {selectedEmployee.netSalary.toLocaleString()}</p>
                    <p className="text-xs text-emerald-300/70 mt-2">Төлөх: {selectedEmployee.paymentDate}</p>
                  </div>
                </div>
              </div>

              {/* Work Information */}
              {selectedEmployee.courses && (
                <div className="px-8 py-6 bg-gradient-to-br from-purple-500/5 to-transparent">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-1 w-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600" />
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Ажлын мэдээлэл</h3>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-6 backdrop-blur-sm">
                    <div className="grid gap-5 md:grid-cols-3 mb-5">
                      <div>
                        <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Ирц</p>
                        <p className="text-2xl font-bold text-white">{selectedEmployee.attendance}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Цагийн ачаалал</p>
                        <p className="text-2xl font-bold text-white">{selectedEmployee.workload}</p>
                      </div>
                      {selectedEmployee.overtimeHours && (
                        <div>
                          <p className="text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Илүү цаг</p>
                          <p className="text-2xl font-bold text-amber-400">{selectedEmployee.overtimeHours} цаг</p>
                        </div>
                      )}
                    </div>
                    
                    {selectedEmployee.courses.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-white/40 mb-3 uppercase tracking-wide">Заадаг хичээлүүд</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedEmployee.courses.map((course: string, index: number) => (
                            <div key={index} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                              <p className="text-sm font-medium text-white">{course}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Payment Status */}
              <div className="px-8 py-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-1 w-10 rounded-full bg-gradient-to-r from-rose-500 to-rose-600" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Төлбөрийн төлөв</h3>
                </div>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/60 mb-2">Төлбөрийн статус</p>
                      <span className={`inline-block rounded-xl px-4 py-2 text-sm font-medium ${
                        selectedEmployee.status === "paid" 
                          ? "border border-emerald-400/40 bg-emerald-500/20 text-emerald-300" 
                          : "border border-amber-400/40 bg-amber-500/20 text-amber-300"
                      }`}>
                        {selectedEmployee.status === "paid" ? "Төлсөн" : "Хүлээгдэж байгаа"}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/60 mb-2">Төлбөрийн огноо</p>
                      <p className="text-lg font-bold text-white">{selectedEmployee.paymentDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calculation Modal */}
      {showCalculationModal && calculationEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-[#0a1628] via-[#081120] to-[#0a1628] shadow-2xl">
            
            {/* Close button */}
            <div className="absolute right-4 top-4 z-20">
              <button
                onClick={() => {
                  setShowCalculationModal(false);
                  setCalculationEmployee(null);
                }}
                className="group rounded-xl border border-white/20 bg-white/10 p-2.5 text-white/70 hover:text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="group-hover:rotate-90 transition-transform duration-200">
                  <path d="M5 5l10 10M15 5l-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="relative max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 z-10 border-b border-white/10 bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-blue-600/20 backdrop-blur-xl px-8 py-6">
                <h2 className="text-2xl font-bold text-white mb-1">Цалингийн тооцоолол</h2>
                <p className="text-sm text-white/60">{calculationEmployee.employee} - {calculationEmployee.position}</p>
              </div>

              {/* Calculation Details */}
              <div className="px-8 py-6 space-y-6">
                
                {/* Base Salary Calculation */}
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Үндсэн цалин</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Албан тушаалын цалин</span>
                      <span className="text-lg font-bold text-white">₮ {calculationEmployee.baseSalary.toLocaleString()}</span>
                    </div>
                    {calculationEmployee.teachingHours > 0 && (
                      <>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-white/50">Заах цаг</span>
                          <span className="text-white/70">{calculationEmployee.teachingHours} цаг</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-white/50">Цагийн хөлс</span>
                          <span className="text-white/70">₮ {Math.round(calculationEmployee.baseSalary / calculationEmployee.teachingHours).toLocaleString()} / цаг</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Bonus Calculation */}
                <div className="rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 p-6">
                  <h3 className="text-lg font-semibold text-emerald-300 mb-4">Урамшуулал</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Нийт урамшуулал</span>
                      <span className="text-lg font-bold text-emerald-300">₮ {calculationEmployee.bonus.toLocaleString()}</span>
                    </div>
                    {calculationEmployee.bonusReason && (
                      <div className="text-sm">
                        <span className="text-white/50">Шалтгаан: </span>
                        <span className="text-white/70">{calculationEmployee.bonusReason}</span>
                      </div>
                    )}
                    {calculationEmployee.overtimeHours > 0 && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/50">Илүү цагийн урамшуулал</span>
                        <span className="text-emerald-400">₮ {Math.round(calculationEmployee.bonus * 0.3).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Deductions Calculation */}
                <div className="rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-500/10 to-amber-600/5 p-6">
                  <h3 className="text-lg font-semibold text-amber-300 mb-4">Суутгал</h3>
                  <div className="space-y-3">
                    {calculationEmployee.socialInsurance && (
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-white/70">Нийгмийн даатгал (НДШ)</span>
                          <p className="text-xs text-white/50">Үндсэн цалингийн 8%</p>
                        </div>
                        <span className="text-lg font-bold text-amber-300">₮ {calculationEmployee.socialInsurance.toLocaleString()}</span>
                      </div>
                    )}
                    {calculationEmployee.healthInsurance && (
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-white/70">Эрүүл мэндийн даатгал (ЭМД)</span>
                          <p className="text-xs text-white/50">Үндсэн цалингийн 2%</p>
                        </div>
                        <span className="text-lg font-bold text-amber-300">₮ {calculationEmployee.healthInsurance.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="pt-3 border-t border-white/10">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70 font-medium">Нийт суутгал</span>
                        <span className="text-xl font-bold text-amber-300">₮ {calculationEmployee.deductions.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Calculation */}
                <div className="rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-500/20 to-cyan-600/10 p-6">
                  <h3 className="text-lg font-semibold text-blue-300 mb-4">Эцсийн тооцоолол</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/70">Үндсэн цалин</span>
                      <span className="text-white">₮ {calculationEmployee.baseSalary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-emerald-400">+ Урамшуулал</span>
                      <span className="text-emerald-400">₮ {calculationEmployee.bonus.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-amber-400">- Суутгал</span>
                      <span className="text-amber-400">₮ {calculationEmployee.deductions.toLocaleString()}</span>
                    </div>
                    <div className="pt-4 border-t border-blue-400/30">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-blue-300">Цэвэр цалин</span>
                        <span className="text-3xl font-bold text-blue-300">₮ {calculationEmployee.netSalary.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-white/50 mt-2 text-right">Төлбөрийн огноо: {calculationEmployee.paymentDate}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Protected page - only SUPER_ADMIN, FINANCE_ADMIN can access
export default withAuth(StaffSalaries, ['SUPER_ADMIN', 'FINANCE_ADMIN']);
