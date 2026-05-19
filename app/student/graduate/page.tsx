"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

const requirements = [
  { label: "Нийт кредит", required: 120, completed: 85, unit: "кредит" },
  { label: "Голч дүн", required: 2.0, completed: 3.8, unit: "GPA" },
  { label: "Дадлага", required: 1, completed: 0, unit: "удаа" },
  { label: "Төгсөлтийн ажил", required: 1, completed: 0, unit: "ажил" },
];

const checklist = [
  { label: "Сургалтын төлбөр бүрэн төлсөн", done: false },
  { label: "Номын санд өр байхгүй", done: true },
  { label: "Дадлагын тайлан хүлээлгэсэн", done: false },
  { label: "Төгсөлтийн ажил хамгаалсан", done: false },
  { label: "Бүх хичээлийн дүн бүрдсэн", done: true },
];

export default function GraduatePage() {
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
            backgroundSize: "72%",
          }}
        >
          <div className="mx-auto max-w-3xl space-y-5">

            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Оюутан</p>
              <h1 className="mt-1 text-2xl font-semibold text-white">Төгсөгч оюутны тойрох хуудас</h1>
            </div>

            {/* Progress cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {requirements.map((r) => {
                const pct = Math.min(100, Math.round((r.completed / r.required) * 100));
                const done = r.completed >= r.required;
                return (
                  <div key={r.label} className="rounded-[20px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-medium text-white/80">{r.label}</p>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium border ${done ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300" : "border-amber-400/20 bg-amber-400/10 text-amber-300"}`}>
                        {done ? "Биелсэн" : "Хүлээгдэж байна"}
                      </span>
                    </div>
                    <div className="mb-2 flex items-end justify-between">
                      <p className="text-2xl font-semibold text-white">{r.completed}</p>
                      <p className="text-xs text-white/35">/ {r.required} {r.unit}</p>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full transition-all ${done ? "bg-gradient-to-r from-emerald-400 to-teal-400" : "bg-gradient-to-r from-violet-500 to-fuchsia-500"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Checklist */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
              <p className="mb-4 text-sm font-medium text-white/80">Тойрох хуудасны жагсаалт</p>
              <div className="space-y-3">
                {checklist.map((c) => (
                  <div key={c.label} className="flex items-center gap-3">
                    <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${c.done ? "border-emerald-400/40 bg-emerald-400/15" : "border-white/15 bg-white/[0.03]"}`}>
                      {c.done && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2 2 4-4" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <p className={`text-sm ${c.done ? "text-white/60 line-through" : "text-white/80"}`}>{c.label}</p>
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
