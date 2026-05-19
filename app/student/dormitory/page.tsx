"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

const rooms = [
  { id: "A-201", type: "2 хүний өрөө", floor: "2-р давхар", status: "Захиалсан", price: "₮150,000/сар", tw: "border-emerald-400/25 bg-emerald-500/10 text-emerald-300" },
  { id: "A-202", type: "2 хүний өрөө", floor: "2-р давхар", status: "Чөлөөтэй", price: "₮150,000/сар", tw: "border-white/10 bg-white/[0.03] text-white/60" },
  { id: "B-101", type: "4 хүний өрөө", floor: "1-р давхар", status: "Дүүрсэн",  price: "₮100,000/сар", tw: "border-red-400/25 bg-red-500/10 text-red-300" },
  { id: "B-102", type: "4 хүний өрөө", floor: "1-р давхар", status: "Чөлөөтэй", price: "₮100,000/сар", tw: "border-white/10 bg-white/[0.03] text-white/60" },
];

const myRoom = {
  id: "A-201", building: "А байр", floor: "2-р давхар", type: "2 хүний өрөө",
  roommate: "Батбаяр Дорж", checkIn: "2024-09-01", checkOut: "2025-06-30",
  price: "₮150,000/сар", status: "Идэвхтэй",
};

const payments = [
  { month: "2025 4-р сар", amount: "₮150,000", status: "Төлсөн",           date: "2025-04-01" },
  { month: "2025 3-р сар", amount: "₮150,000", status: "Төлсөн",           date: "2025-03-01" },
  { month: "2025 5-р сар", amount: "₮150,000", status: "Хүлээгдэж байна",  date: "—" },
];

export default function DormitoryPage() {
  const [activeMenu, setActiveMenu] = useState("Дотуур байр");

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <div className="flex">
        <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
        <main
          className="flex-1 overflow-y-auto bg-no-repeat px-4 py-6 md:px-6"
          style={{
            backgroundImage: "linear-gradient(rgba(8,14,30,0.9),rgba(8,12,24,0.95)),url('/indra-bg.jpg')",
            backgroundPosition: "center center",
            backgroundSize: "72%",
          }}
        >
          <div className="mx-auto max-w-3xl space-y-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Оюутан</p>
              <h1 className="mt-1 text-2xl font-semibold text-white">Дотуур байр</h1>
            </div>

            {/* My room */}
            <div className="rounded-[24px] border border-emerald-400/20 bg-emerald-500/10 p-5 backdrop-blur-md">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-emerald-300">Миний өрөө</p>
                <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-300">{myRoom.status}</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { label: "Өрөөний дугаар", value: myRoom.id },
                  { label: "Байр, давхар",   value: `${myRoom.building}, ${myRoom.floor}` },
                  { label: "Өрөөний төрөл",  value: myRoom.type },
                  { label: "Хамрагч",        value: myRoom.roommate },
                  { label: "Орсон огноо",    value: myRoom.checkIn },
                  { label: "Гарах огноо",    value: myRoom.checkOut },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">{item.label}</p>
                    <p className="mt-1 text-sm text-white/85">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment history */}
            <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#081120]/70 backdrop-blur-md">
              <div className="border-b border-white/10 bg-white/[0.03] px-5 py-3">
                <p className="text-sm font-medium text-white/80">Төлбөрийн түүх</p>
              </div>
              {payments.map((p, i) => (
                <div key={p.month} className={`flex items-center justify-between px-5 py-4 transition-colors hover:bg-white/[0.02] ${i < payments.length - 1 ? "border-b border-white/[0.05]" : ""}`}>
                  <div>
                    <p className="text-sm font-medium text-white/85">{p.month}</p>
                    <p className="mt-0.5 text-xs text-white/35">{p.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white/70">{p.amount}</p>
                    <span className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium ${p.status === "Төлсөн" ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300" : "border-amber-400/20 bg-amber-400/10 text-amber-300"}`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Available rooms */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 backdrop-blur-md overflow-hidden">
              <div className="border-b border-white/10 bg-white/[0.03] px-5 py-3">
                <p className="text-sm font-medium text-white/80">Өрөөний жагсаалт</p>
              </div>
              <div className="grid gap-3 p-4 sm:grid-cols-2">
                {rooms.map((r) => (
                  <div key={r.id} className={`rounded-[20px] border p-4 ${r.tw}`}>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-sm font-semibold">{r.id}</p>
                      <span className="text-[10px]">{r.status}</span>
                    </div>
                    <p className="text-xs text-white/50">{r.type} · {r.floor}</p>
                    <p className="mt-1 text-xs font-medium text-white/70">{r.price}</p>
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
