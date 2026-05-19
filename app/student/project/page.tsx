"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

const projects = [
  {
    title: "Student Management System",
    tech: ["Python", "SQLite", "Tkinter"],
    status: "Хийгдэж байна",
    progress: 65,
    desc: "Оюутны бүртгэл, дүн, ирцийг удирдах desktop апп.",
    color: "from-violet-500/20 to-violet-600/10 border-violet-500/20",
    accent: "text-violet-300",
  },
  {
    title: "Portfolio Website",
    tech: ["React", "Tailwind", "Next.js"],
    status: "Дууссан",
    progress: 100,
    desc: "Хувийн portfolio вэбсайт — ажлын туршлага, төслүүд.",
    color: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/20",
    accent: "text-cyan-300",
  },
  {
    title: "Network Scanner Tool",
    tech: ["Python", "Scapy", "CLI"],
    status: "Төлөвлөгдсөн",
    progress: 10,
    desc: "Локал сүлжээний төхөөрөмжүүдийг скан хийх хэрэгсэл.",
    color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/20",
    accent: "text-emerald-300",
  },
];

const statusColor: Record<string, string> = {
  "Дууссан": "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  "Хийгдэж байна": "border-violet-400/20 bg-violet-400/10 text-violet-300",
  "Төлөвлөгдсөн": "border-white/10 bg-white/[0.04] text-white/50",
};

export default function ProjectPage() {
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

            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Оюутан</p>
                <h1 className="mt-1 text-2xl font-semibold text-white">My Project</h1>
              </div>
              <button className="rounded-2xl border border-violet-400/25 bg-violet-500/10 px-4 py-2 text-sm text-violet-200 transition-all hover:bg-violet-500/20">
                + Шинэ төсөл
              </button>
            </div>

            <div className="grid gap-4">
              {projects.map((p) => (
                <div
                  key={p.title}
                  className={`rounded-[24px] border bg-gradient-to-br ${p.color} p-5 backdrop-blur-md`}
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h2 className="text-base font-semibold text-white">{p.title}</h2>
                    <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-medium ${statusColor[p.status]}`}>
                      {p.status}
                    </span>
                  </div>

                  <p className="mb-4 text-sm leading-6 text-white/55">{p.desc}</p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-lg border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] text-white/60">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-[11px] text-white/35">Явц</span>
                      <span className={`text-[11px] font-medium ${p.accent}`}>{p.progress}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-white/60 transition-all"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
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
