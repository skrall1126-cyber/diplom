"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

const exams = [
  { subject: "Python undes", date: "2025-05-12", time: "09:00–11:00", room: "A-201", type: "Улирлын шалгалт" },
  { subject: "JavaScript", date: "2025-05-14", time: "13:00–15:00", room: "B-105", type: "Улирлын шалгалт" },
  { subject: "Networking", date: "2025-05-16", time: "09:00–11:00", room: "C-302", type: "Улирлын шалгалт" },
  { subject: "Database", date: "2025-05-19", time: "10:00–12:00", room: "A-104", type: "Улирлын шалгалт" },
  { subject: "UI/UX Design", date: "2025-05-21", time: "14:00–16:00", room: "D-201", type: "Улирлын шалгалт" },
  { subject: "Cyber Security", date: "2025-05-23", time: "09:00–11:00", room: "B-302", type: "Улирлын шалгалт" },
];

const colors = [
  "border-violet-400/25 bg-violet-500/10 text-violet-300",
  "border-amber-400/25 bg-amber-500/10 text-amber-300",
  "border-emerald-400/25 bg-emerald-500/10 text-emerald-300",
  "border-orange-400/25 bg-orange-500/10 text-orange-300",
  "border-pink-400/25 bg-pink-500/10 text-pink-300",
  "border-cyan-400/25 bg-cyan-500/10 text-cyan-300",
];

export default function SchedulePage() {
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
              <h1 className="mt-1 text-2xl font-semibold text-white">Шалгалтын хуваарь</h1>
            </div>

            <div className="grid gap-3">
              {exams.map((e, i) => (
                <div
                  key={e.subject}
                  className={`flex items-center gap-4 rounded-[20px] border ${colors[i % colors.length]} p-4 backdrop-blur-md`}
                >
                  {/* Date badge */}
                  <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] py-2">
                    <p className="text-[10px] uppercase tracking-widest text-white/35">
                      {new Date(e.date).toLocaleString("mn", { month: "short" })}
                    </p>
                    <p className="text-xl font-semibold text-white">
                      {new Date(e.date).getDate()}
                    </p>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white/90">{e.subject}</p>
                    <p className="mt-0.5 text-xs text-white/40">{e.type}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-sm font-medium text-white/80">{e.time}</p>
                    <p className="mt-0.5 text-xs text-white/40">Өрөө: {e.room}</p>
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
