"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function FinanceAdminPage() {
  const [activeMenu, setActiveMenu] = useState("Төлбөрийн мэдээлэл");
  const [startDate, setStartDate] = useState("2025-05-01");
  const [endDate, setEndDate] = useState("2025-05-31");
  const [activeTab, setActiveTab] = useState<"all" | "income" | "expense">("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("userType", "finance");
      localStorage.setItem("adminType", "finance-admin");
    }
  }, []);

  // Sample data - гүйлгээний түүх
  const allTransactions = [
    { id: 1, date: "2025-05-18", time: "16:57:14", type: "Зардал", category: "Багшийн цалин", description: "Б.Батбаяр багш - Сарын цалин", amount: 2500000, method: "Банкны шилжүүлэг", reference: "TXN025704192559621" },
    { id: 2, date: "2025-05-18", time: "04:19:09", type: "Зардал", category: "Цахилгааны төлбөр", description: "Улаанбаатар цахилгаан түгээх сүлжээ", amount: 850000, method: "Банкны шилжүүлэг", reference: "TXN203790342043495" },
    { id: 3, date: "2025-05-18", time: "04:11:58", type: "Зардал", category: "Интернет", description: "Unitel - Сарын төлбөр", amount: 450000, method: "Банкны шилжүүлэг", reference: "TXN352305321737758" },
    { id: 4, date: "2025-05-17", time: "14:23:45", type: "Орлого", category: "Сургалтын төлбөр", description: "Төртэмүүлэн (B211930019) - 2-р улирал", amount: 1125000, method: "Банкны шилжүүлэг", reference: "TXN847392847392847" },
    { id: 5, date: "2025-05-17", time: "11:08:22", type: "Орлого", category: "Сургалтын төлбөр", description: "Э.Батжаргал (B211930020) - 2-р улирал", amount: 1125000, method: "Картаар", reference: "TXN938475938475938" },
    { id: 6, date: "2025-05-16", time: "09:45:33", type: "Орлого", category: "Сургалтын төлбөр", description: "Ц.Мөнхбат (B211930021) - 2-р улирал", amount: 1125000, method: "Банкны шилжүүлэг", reference: "TXN029384029384029" },
    { id: 7, date: "2025-05-15", time: "16:12:08", type: "Зардал", category: "Хоол үйлдвэрлэл", description: "Өдрийн хоолны зардал", amount: 1200000, method: "Бэлэн мөнгө", reference: "TXN847362847362847" },
    { id: 8, date: "2025-05-15", time: "10:30:15", type: "Орлого", category: "Сургалтын төлбөр", description: "Д.Сүхбат (B211930022) - 2-р улирал", amount: 1125000, method: "Банкны шилжүүлэг", reference: "TXN192837192837192" },
    { id: 9, date: "2025-05-14", time: "13:55:42", type: "Орлого", category: "Сургалтын төлбөр", description: "Б.Ганбаяр (B211930023) - 2-р улирал", amount: 1125000, method: "Картаар", reference: "TXN564738564738564" },
    { id: 10, date: "2025-05-13", time: "15:20:18", type: "Зардал", category: "Багшийн цалин", description: "Л.Энхтуяа багш - Сарын цалин", amount: 2300000, method: "Банкны шилжүүлэг", reference: "TXN738291738291738" },
    { id: 11, date: "2025-05-12", time: "11:40:55", type: "Орлого", category: "Сургалтын төлбөр", description: "Н.Энхжаргал (B211930024) - 2-р улирал", amount: 1125000, method: "Банкны шилжүүлэг", reference: "TXN928374928374928" },
    { id: 12, date: "2025-05-10", time: "09:15:30", type: "Зардал", category: "Засвар үйлчилгээ", description: "Компьютер засвар", amount: 980000, method: "Бэлэн мөнгө", reference: "TXN473829473829473" },
  ];

  // Огнооны интервалаар шүүх
  const filteredByDate = allTransactions.filter(t => {
    const transactionDate = new Date(t.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return transactionDate >= start && transactionDate <= end;
  });

  // Төрлөөр шүүх
  const filteredByType = activeTab === "all" 
    ? filteredByDate 
    : filteredByDate.filter(t => 
        activeTab === "income" ? t.type === "Орлого" : t.type === "Зардал"
      );

  // Хайлтаар шүүх
  const filteredTransactions = searchTerm
    ? filteredByType.filter(t => 
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.reference.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredByType;

  // Нийт орлого, зардал тооцоолох
  const totalIncome = filteredByDate
    .filter(t => t.type === "Орлого")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredByDate
    .filter(t => t.type === "Зардал")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const formatMoney = (amount: number) => {
    return `${amount.toLocaleString()} ₮`;
  };

  // Quick date range buttons
  const setQuickRange = (range: string) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    
    switch(range) {
      case "today":
        const todayStr = today.toISOString().split('T')[0];
        setStartDate(todayStr);
        setEndDate(todayStr);
        break;
      case "week":
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        setStartDate(weekAgo.toISOString().split('T')[0]);
        setEndDate(today.toISOString().split('T')[0]);
        break;
      case "month":
        setStartDate(`${year}-${String(month).padStart(2, '0')}-01`);
        setEndDate(`${year}-${String(month).padStart(2, '0')}-${new Date(year, month, 0).getDate()}`);
        break;
      case "3months":
        const threeMonthsAgo = new Date(today);
        threeMonthsAgo.setMonth(today.getMonth() - 3);
        setStartDate(threeMonthsAgo.toISOString().split('T')[0]);
        setEndDate(today.toISOString().split('T')[0]);
        break;
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
            backgroundAttachment: "scroll",
            backgroundSize: "72%",
          }}
        >
          <div className="mx-auto max-w-4xl space-y-5">
            
            {/* Account Header - Bank style */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-white/50 mb-1">ДАНС / ACCOUNT</p>
                  <p className="text-sm font-mono text-white/80">5302 864 281</p>
                </div>
                <button className="text-white/60 hover:text-white transition-colors">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M6 9l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <p className="text-3xl font-bold text-white mb-1">
                {formatMoney(balance)}
              </p>
              <p className="text-xs text-white/50">Үлдэгдэл</p>
            </div>

            {/* Date Range */}
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <p className="text-xs text-white/50 mb-3">Огноо</p>
              
              {/* Quick buttons */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setQuickRange("today")}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 transition-all"
                >
                  Өнөөдөр
                </button>
                <button
                  onClick={() => setQuickRange("week")}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 transition-all"
                >
                  7 хоног
                </button>
                <button
                  onClick={() => setQuickRange("month")}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 transition-all"
                >
                  1 сар
                </button>
                <button
                  onClick={() => setQuickRange("3months")}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 transition-all"
                >
                  3 сар
                </button>
              </div>

              {/* Date inputs */}
              <div className="flex items-center gap-3">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400/40"
                />
                <span className="text-white/40">-</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400/40"
                />
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-[#081120]/70 p-4 backdrop-blur-md">
                <p className="text-xs text-white/50 mb-2">Нийт орлого</p>
                <p className="text-xl font-bold text-emerald-400">
                  {formatMoney(totalIncome)}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#081120]/70 p-4 backdrop-blur-md">
                <p className="text-xs text-white/50 mb-2">Нийт зардал</p>
                <p className="text-xl font-bold text-red-400">
                  {formatMoney(totalExpense)}
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-[#081120]/70 rounded-xl p-1 border border-white/10">
              <button
                onClick={() => setActiveTab("all")}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === "all"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Бүгд
              </button>
              <button
                onClick={() => setActiveTab("income")}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === "income"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Орлого
              </button>
              <button
                onClick={() => setActiveTab("expense")}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === "expense"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Зардал
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
              >
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Дүн, утгаар хайх"
                className="w-full rounded-xl border border-white/10 bg-[#081120]/70 pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-400/40"
              />
            </div>

            {/* Transaction List */}
            <div className="space-y-3">
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-12 rounded-xl border border-white/10 bg-[#081120]/70">
                  <p className="text-white/40 text-sm">Гүйлгээ олдсонгүй</p>
                </div>
              ) : (
                filteredTransactions.map((transaction, index) => {
                  const showDate = index === 0 || transaction.date !== filteredTransactions[index - 1].date;
                  
                  return (
                    <div key={transaction.id}>
                      {showDate && (
                        <p className="text-sm font-medium text-emerald-400 mb-2 mt-4">
                          {transaction.date}
                        </p>
                      )}
                      <div className="rounded-xl border border-white/10 bg-[#081120]/70 p-4 hover:bg-white/[0.03] transition-colors">
                        <div className="flex items-start gap-3">
                          <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            transaction.type === "Орлого" 
                              ? "bg-emerald-500/20 text-emerald-400" 
                              : "bg-red-500/20 text-red-400"
                          }`}>
                            {transaction.type === "Орлого" ? "↓" : "↑"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <p className="text-sm font-medium text-white">
                                {transaction.time}
                              </p>
                              <p className={`text-base font-bold whitespace-nowrap ${
                                transaction.type === "Орлого" ? "text-emerald-400" : "text-red-400"
                              }`}>
                                {transaction.type === "Орлого" ? "+" : "-"}{formatMoney(transaction.amount)}
                              </p>
                            </div>
                            <p className="text-xs text-white/80 mb-1">{transaction.description}</p>
                            <p className="text-xs text-white/40 truncate">{transaction.reference}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
