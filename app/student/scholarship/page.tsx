"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

type ScholarshipItem = {
  id: number;
  name: string;
  amount: string;
  deadline: string;
  status: "нээлттэй" | "хаагдсан" | "хүлээгдэж буй";
  desc: string;
  requirements: string[];
};

const statusTw = {
  нээлттэй:        "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
  хаагдсан:        "border-red-400/25 bg-red-400/10 text-red-300",
  "хүлээгдэж буй": "border-amber-400/25 bg-amber-400/10 text-amber-300",
};

const sections = [
  {
    key: "dotood", title: "Дотоодын тэтгэлэг",
    tw: "border-blue-400/25 bg-blue-500/10", text: "text-blue-300", dot: "bg-blue-400",
    items: [
      { id: 1, name: "Indra Cyber шилдэг сурагч тэтгэлэг", amount: "₮500,000", deadline: "2024-12-31", status: "нээлттэй",        desc: "Тайлангийн хугацааны шилдэг сурагчдад олгох дотоодын тэтгэлэг.", requirements: ["Дундаж дүн 90%+", "Ирц 95%+", "Идэвхтэй оролцоо"] },
      { id: 2, name: "Явцын амжилтын тэтгэлэг",           amount: "₮300,000", deadline: "2024-11-30", status: "нээлттэй",        desc: "Тогтмол ирц болон явцын оноогоор тодорхойлогдох тэтгэлэг.",     requirements: ["Дундаж дүн 80%+", "Ирц 90%+"] },
      { id: 3, name: "Урамшуулал тэтгэлэг",                amount: "₮200,000", deadline: "2024-10-15", status: "хаагдсан",        desc: "Хичээлийн жилийн эхний улирлын шилдэг сурагчдад.",              requirements: ["Дундаж дүн 85%+"] },
    ] as ScholarshipItem[],
  },
  {
    key: "gadaad", title: "Гадаадын тэтгэлэг",
    tw: "border-fuchsia-400/25 bg-fuchsia-500/10", text: "text-fuchsia-300", dot: "bg-fuchsia-400",
    items: [
      { id: 4, name: "KOICA Солонгос засгийн газрын тэтгэлэг", amount: "Бүрэн тэтгэлэг", deadline: "2025-02-28", status: "нээлттэй",        desc: "Солонгосын засгийн газрын санхүүжилттэй IT чиглэлийн тэтгэлэг.", requirements: ["IELTS 5.5+", "Дундаж дүн 85%+", "Нас 18-35"] },
      { id: 5, name: "JICA Японы техникийн тэтгэлэг",          amount: "Бүрэн тэтгэлэг", deadline: "2025-01-15", status: "хүлээгдэж буй", desc: "Японы олон улсын хамтын ажиллагааны агентлагийн тэтгэлэг.",     requirements: ["Япон хэл N4+", "IT мэргэжил", "Дундаж дүн 80%+"] },
      { id: 6, name: "DAAD Германы солилцооны тэтгэлэг",       amount: "€850/сар",        deadline: "2024-11-01", status: "хаагдсан",        desc: "Германы академик солилцооны тэтгэлэг.",                         requirements: ["Герман/Англи хэл", "Дундаж дүн 90%+"] },
    ] as ScholarshipItem[],
  },
  {
    key: "toriisan", title: "Төрийн сангийн тэтгэлэг",
    tw: "border-emerald-400/25 bg-emerald-500/10", text: "text-emerald-300", dot: "bg-emerald-400",
    items: [
      { id: 7, name: "Монгол улсын засгийн газрын тэтгэлэг", amount: "₮800,000", deadline: "2025-03-01", status: "нээлттэй",        desc: "Мэдээллийн технологийн чиглэлээр суралцагчдад олгох төрийн тэтгэлэг.", requirements: ["Иргэний үнэмлэх", "Дундаж дүн 85%+", "18-30 нас"] },
      { id: 8, name: "Хөдөлмөр эрхлэлтийн сан тэтгэлэг",    amount: "₮600,000", deadline: "2025-01-31", status: "хүлээгдэж буй", desc: "Ажилгүй иргэдийг давтан сургах зорилготой тэтгэлэг.",             requirements: ["Ажилгүй иргэн", "25-45 нас", "Суурь боловсрол"] },
    ] as ScholarshipItem[],
  },
  {
    key: "butsaltgui", title: "Буцалтгүй тусламж",
    tw: "border-amber-400/25 bg-amber-500/10", text: "text-amber-300", dot: "bg-amber-400",
    items: [
      { id: 9,  name: "Онцгой тохиолдлын тусламж",    amount: "₮200,000 хүртэл", deadline: "Тасралтгүй", status: "нээлттэй",        desc: "Гэнэтийн хүндрэлтэй нөхцөлд орсон сурагчдад нэг удаагийн тусламж.", requirements: ["Өргөдөл гаргах", "Баримт бичиг"] },
      { id: 10, name: "Сурах бичгийн тусламж",         amount: "₮100,000",        deadline: "2024-09-30", status: "хаагдсан",        desc: "Хичээлийн жилийн эхэнд сурах бичиг, хэрэглэгдэхүүний зардалд.",    requirements: ["Дундаж дүн 70%+", "Өргөдөл"] },
      { id: 11, name: "Тоног төхөөрөмжийн тусламж",   amount: "₮500,000 хүртэл", deadline: "2025-02-01", status: "хүлээгдэж буй", desc: "Компьютер болон хэрэгслийн зардлыг хэсэгчлэн санхүүжүүлэх.",       requirements: ["Орлогын баримт", "Дундаж дүн 75%+"] },
    ] as ScholarshipItem[],
  },
];

export default function ScholarshipPage() {
  const [activeMenu, setActiveMenu] = useState("Тэтгэлэг");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ dotood: true });
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const totalOpen = sections.reduce((a, s) => a + s.items.filter((i) => i.status === "нээлттэй").length, 0);
  const totalPending = sections.reduce((a, s) => a + s.items.filter((i) => i.status === "хүлээгдэж буй").length, 0);
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
            backgroundAttachment: "scroll",
            backgroundSize: "72%",
          }}
        >
          <div className="mx-auto max-w-3xl space-y-5">

            {/* Header */}
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Оюутан</p>
                <h1 className="mt-1 text-2xl font-semibold text-white">Тэтгэлэг</h1>
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {totalOpen} нээлттэй тэтгэлэг
              </span>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Нийт тэтгэлэг",  value: totalAll,     color: "text-violet-300" },
                { label: "Нээлттэй",        value: totalOpen,    color: "text-emerald-300" },
                { label: "Хүлээгдэж буй",   value: totalPending, color: "text-amber-300" },
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
                const openCount = sec.items.filter((i) => i.status === "нээлттэй").length;
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
                        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-300">
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
                                  <p className="truncate text-sm font-medium text-white/85">{item.name}</p>
                                  <div className="mt-1 flex flex-wrap items-center gap-2">
                                    <span className={`text-sm font-bold ${sec.text}`}>{item.amount}</span>
                                    <span className="text-white/20">·</span>
                                    <span className="text-[11px] text-white/35">Хугацаа: {item.deadline}</span>
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
                                  {item.status === "нээлттэй" && (
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
