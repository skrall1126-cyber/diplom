"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

const payments = [
  { term: "2024 хавар", amount: "850,000₮", status: "Төлсөн", date: "2024-02-15" },
  { term: "2024 намар", amount: "850,000₮", status: "Төлсөн", date: "2024-09-10" },
  { term: "2025 хавар", amount: "900,000₮", status: "Төлсөн", date: "2025-02-20" },
  { term: "2025 намар", amount: "900,000₮", status: "Хүлээгдэж байна", date: "—" },
];

export default function PaymentPage() {
  const [activeMenu, setActiveMenu] = useState("Оюутан");

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
            backgroundAttachment: "scroll",
            backgroundSize: "72%",
          }}
        >
          <div className="mx-auto max-w-3xl space-y-5">

            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Оюутан</p>
              <h1 className="mt-1 text-2xl font-semibold text-white">Төлбөрийн мэдээлэл</h1>
            </div>

            {/* Balance card */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Үлдэгдэл төлбөр</p>
                  <p className="mt-2 text-3xl font-semibold text-amber-300">900,000₮</p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <rect x="2" y="6" width="18" height="13" rx="2" stroke="#fbbf24" strokeWidth="1.5" />
                    <path d="M2 10h18" stroke="#fbbf24" strokeWidth="1.5" />
                    <circle cx="6" cy="14" r="1" fill="#fbbf24" />
                  </svg>
                </div>
              </div>
              <button className="mt-5 w-full rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 py-3 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(245,158,11,0.3)] transition-opacity hover:opacity-90">
                Төлбөр төлөх
              </button>
            </div>

            {/* History */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 backdrop-blur-md overflow-hidden">
              <div className="border-b border-white/10 px-5 py-4">
                <p className="text-sm font-medium text-white/80">Төлбөрийн түүх</p>
              </div>
              {payments.map((p, i) => (
                <div
                  key={p.term}
                  className={`flex items-center justify-between px-5 py-4 text-sm transition-colors hover:bg-white/[0.02] ${i !== payments.length - 1 ? "border-b border-white/[0.06]" : ""}`}
                >
                  <div>
                    <p className="font-medium text-white/85">{p.term}</p>
                    <p className="mt-0.5 text-xs text-white/35">{p.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white/80">{p.amount}</p>
                    <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      p.status === "Төлсөн"
                        ? "bg-emerald-400/10 text-emerald-300 border border-emerald-400/20"
                        : "bg-amber-400/10 text-amber-300 border border-amber-400/20"
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
