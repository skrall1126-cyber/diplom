"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

type InternshipItem = {
  id: number;
  company: string;
  role: string;
  duration: string;
  start: string;
  end: string;
  status: "Хүлээгдэж байна" | "Дууссан" | "Идэвхтэй";
  desc: string;
  requirements: string[];
};

const statusTw = {
  "Хүлээгдэж байна": "border-amber-400/25 bg-amber-400/10 text-amber-300",
  "Дууссан": "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
  "Идэвхтэй": "border-blue-400/25 bg-blue-400/10 text-blue-300",
};

const sections = [
  {
    key: "myInternships",
    title: "Миний дадлага",
    tw: "border-blue-400/25 bg-blue-500/10",
    text: "text-blue-300",
    dot: "bg-blue-400",
    items: [
      {
        id: 1,
        company: "Datacom Mongolia",
        role: "Junior Developer",
        duration: "3 сар",
        start: "2025-06-01",
        end: "2025-08-31",
        status: "Хүлээгдэж байна",
        desc: "Веб хөгжүүлэлтийн чиглэлээр практик туршлага олж, бодит төслүүд дээр ажиллах боломж.",
        requirements: ["HTML, CSS, JavaScript мэдлэг", "React эсвэл Vue.js туршлага", "Git ашиглах чадвар"]
      },
      {
        id: 2,
        company: "MCS Electronics",
        role: "IT Support",
        duration: "2 сар",
        start: "2024-07-01",
        end: "2024-08-31",
        status: "Дууссан",
        desc: "Компьютерийн техник хангамж, сүлжээний дэмжлэг үйлчилгээ, хэрэглэгчийн тусламж.",
        requirements: ["Windows, Linux системийн мэдлэг", "Сүлжээний үндсэн ойлголт", "Хэрэглэгчид туслах чадвар"]
      },
    ] as InternshipItem[],
  },
  {
    key: "openPositions",
    title: "Нээлттэй байршлууд",
    tw: "border-violet-400/25 bg-violet-500/10",
    text: "text-violet-300",
    dot: "bg-violet-400",
    items: [
      {
        id: 3,
        company: "Mongolian National Broadcaster",
        role: "Web Developer Intern",
        duration: "4 сар",
        start: "2025-06-15",
        end: "2025-10-15",
        status: "Хүлээгдэж байна",
        desc: "Монголын Үндэсний Телевизийн вэбсайт, дотоод системүүдийн хөгжүүлэлтэд оролцох.",
        requirements: ["PHP, Laravel мэдлэг", "MySQL мэдлэг", "Веб дизайны үндэс"]
      },
      {
        id: 4,
        company: "Khan Bank",
        role: "IT Security Intern",
        duration: "3 сар",
        start: "2025-07-01",
        end: "2025-09-30",
        status: "Хүлээгдэж байна",
        desc: "Банкны мэдээллийн аюулгүй байдлын системийн мониторинг, шинжилгээ.",
        requirements: ["Мэдээллийн аюулгүй байдлын үндэс", "Linux системийн мэдлэг", "Аналитик сэтгэлгээ"]
      },
      {
        id: 5,
        company: "Unitel",
        role: "Network Engineer Intern",
        duration: "3 сар",
        start: "2025-06-01",
        end: "2025-08-31",
        status: "Хүлээгдэж байна",
        desc: "Сүлжээний тоног төхөөрөмжийн тохиргоо, засвар үйлчилгээ, мониторинг.",
        requirements: ["Сүлжээний үндсэн ойлголт", "Cisco эсвэл Juniper тоног төхөөрөмж", "Проблем шийдвэрлэх чадвар"]
      },
      {
        id: 6,
        company: "Golomt Bank",
        role: "Frontend Developer Intern",
        duration: "3 сар",
        start: "2025-06-01",
        end: "2025-08-31",
        status: "Хүлээгдэж байна",
        desc: "Банкны вэб аппликейшн, мобайл аппликейшны интерфэйс хөгжүүлэлт.",
        requirements: ["React эсвэл Angular мэдлэг", "TypeScript туршлага", "REST API ашиглах чадвар"]
      },
    ] as InternshipItem[],
  },
  {
    key: "completed",
    title: "Дууссан дадлага",
    tw: "border-emerald-400/25 bg-emerald-500/10",
    text: "text-emerald-300",
    dot: "bg-emerald-400",
    items: [
      {
        id: 7,
        company: "SkyTech Solutions",
        role: "Software Testing Intern",
        duration: "2 сар",
        start: "2023-06-01",
        end: "2023-07-31",
        status: "Дууссан",
        desc: "Програм хангамжийн тестлэгээ, алдаа илрүүлэх, баталгаажуулалтын ажил.",
        requirements: ["Тестлэгээний үндсэн ойлголт", "JIRA эсвэл Trello ашиглах", "Нарийвчлалтай ажиллах чадвар"]
      },
      {
        id: 8,
        company: "DataPro Analytics",
        role: "Data Analysis Intern",
        duration: "3 сар",
        start: "2023-09-01",
        end: "2023-11-30",
        status: "Дууссан",
        desc: "Өгөгдөл цуглуулах, шинжилгээ хийх, тайлан бэлтгэх, визуалчлал.",
        requirements: ["Excel дээрх өндөр мэдлэг", "SQL үндсэн мэдлэг", "Өгөгдөлд дүн шинжилгээ хийх чадвар"]
      },
    ] as InternshipItem[],
  },
];

export default function InternshipPage() {
  const [activeMenu, setActiveMenu] = useState("Дадлага");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ myInternships: true });
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const totalOpen = sections.reduce((a, s) => a + s.items.filter((i) => i.status === "Хүлээгдэж байна").length, 0);
  const totalCompleted = sections.reduce((a, s) => a + s.items.filter((i) => i.status === "Дууссан").length, 0);
  const totalAll = sections.reduce((a, s) => a + s.items.length, 0);

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
            {/* Header */}
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Оюутан</p>
                <h1 className="mt-1 text-2xl font-semibold text-white">Дадлага</h1>
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-blue-400/25 bg-blue-400/10 px-3 py-1.5 text-[11px] font-medium text-blue-300">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                {totalOpen} нээлттэй байршил
              </span>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Нийт дадлага", value: totalAll, color: "text-violet-300" },
                { label: "Нээлттэй", value: totalOpen, color: "text-blue-300" },
                { label: "Дууссан", value: totalCompleted, color: "text-emerald-300" },
              ].map((s) => (
                <div key={s.label} className="rounded-[20px] border border-white/10 bg-[#081120]/70 p-4 text-center backdrop-blur-md">
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/35">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Accordion sections */}
            <div className="space-y-3">
              {sections.map((sec) => {
                const isOpen = !!openSections[sec.key];
                const openCount = sec.items.filter((i) => i.status === "Хүлээгдэж байна").length;
                return (
                  <div key={sec.key} className={`overflow-hidden rounded-[24px] border transition-all ${isOpen ? sec.tw : "border-white/[0.07] bg-white/[0.02]"}`}>
                    {/* Section header */}
                    <button
                      onClick={() => setOpenSections((p) => ({ ...p, [sec.key]: !p[sec.key] }))}
                      className="flex w-full items-center gap-3 px-5 py-4 text-left"
                    >
                      <div className={`h-2.5 w-2.5 rounded-full ${sec.dot}`} />
                      <span className={`flex-1 text-sm font-semibold ${isOpen ? sec.text : "text-white/70"}`}>
                        {sec.title}
                      </span>
                      {openCount > 0 && (
                        <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-2.5 py-0.5 text-[10px] font-medium text-blue-300">
                          {openCount} нээлттэй
                        </span>
                      )}
                      <svg
                        width="14" height="14" viewBox="0 0 14 14" fill="none"
                        className={`shrink-0 text-white/30 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      >
                        <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {/* Items */}
                    {isOpen && (
                      <div className="border-t border-white/[0.07]">
                        {sec.items.map((item, idx) => {
                          const isExpanded = expandedItem === item.id;
                          return (
                            <div key={item.id} className={idx < sec.items.length - 1 ? "border-b border-white/[0.05]" : ""}>
                              <button
                                onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                                className={`flex w-full items-center gap-3 px-5 py-4 text-left transition-colors ${isExpanded ? "bg-white/[0.03]" : "hover:bg-white/[0.02]"}`}
                              >
                                <div className="flex-1 min-w-0">
                                  <p className="truncate text-sm font-medium text-white/85">{item.company} - {item.role}</p>
                                  <div className="mt-1 flex flex-wrap items-center gap-2">
                                    <span className={`text-sm font-bold ${sec.text}`}>{item.duration}</span>
                                    <span className="text-white/20">·</span>
                                    <span className="text-[11px] text-white/35">Эхлэх: {item.start}</span>
                                    <span className="text-white/20">·</span>
                                    <span className="text-[11px] text-white/35">Дуусах: {item.end}</span>
                                  </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-2">
                                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${statusTw[item.status]}`}>
                                    {item.status}
                                  </span>
                                  <svg
                                    width="13" height="13" viewBox="0 0 13 13" fill="none"
                                    className={`text-white/25 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                                  >
                                    <path d="M2.5 4.5l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </div>
                              </button>

                              {/* Expanded detail */}
                              {isExpanded && (
                                <div className="bg-white/[0.02] px-5 pb-5">
                                  <p className="mb-3 text-sm leading-6 text-white/50">{item.desc}</p>
                                  <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-white/30">Шаардлага</p>
                                  <div className="mb-4 space-y-1.5">
                                    {item.requirements.map((r) => (
                                      <div key={r} className="flex items-center gap-2">
                                        <div className={`h-1.5 w-1.5 shrink-0 rounded-full ${sec.dot}`} />
                                        <span className="text-sm text-white/60">{r}</span>
                                      </div>
                                    ))}
                                  </div>
                                  {item.status === "Хүлээгдэж байна" && (
                                    <button className={`rounded-2xl border px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80 ${sec.tw} ${sec.text}`}>
                                      Өргөдөл илгээх →
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}