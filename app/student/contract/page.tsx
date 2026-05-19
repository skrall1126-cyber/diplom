"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

type ContractItem = {
  id: number;
  name: string;
  type: string;
  date: string;
  expires: string;
  status: "Хүчинтэй" | "Дууссан" | "Хүлээгдэж буй";
  desc: string;
  requirements: string[];
};

const statusTw = {
  "Хүчинтэй": "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
  "Дууссан": "border-white/10 bg-white/[0.03] text-white/45",
  "Хүлээгдэж буй": "border-amber-400/25 bg-amber-400/10 text-amber-300",
};

const sections = [
  {
    key: "myContracts",
    title: "Миний гэрээнүүд",
    tw: "border-blue-400/25 bg-blue-500/10",
    text: "text-blue-300",
    dot: "bg-blue-400",
    items: [
      {
        id: 1,
        name: "Суралцах гэрээ 2024-2025",
        type: "Суралцах гэрээ",
        date: "2024-09-01",
        expires: "2025-08-31",
        status: "Хүчинтэй",
        desc: "Indra Cyber College-д суралцах үндсэн гэрээ. Гэрээнд сургалтын төлбөр, төлөх хугацаа, суралцах эрх, үүрэг зэрэг зүйлс тусгагдсан.",
        requirements: ["Иргэний үнэмлэх", "Төгсөлтийн гэрчилгээ", "Эцэг эхийн зөвшөөрөл", "Эрүүл мэндийн үнэмлэх"]
      },
      {
        id: 2,
        name: "Дотуур байрны гэрээ",
        type: "Дотуур байр",
        date: "2024-09-01",
        expires: "2025-06-30",
        status: "Хүчинтэй",
        desc: "Indra Cyber College дотуур байранд суух гэрээ. Гэрээнд байрны дугаар, төлбөр, дүрэм журам, эрүүл ахуйн шаардлага зэрэг зүйлс тусгагдсан.",
        requirements: ["Суралцах гэрээ", "Иргэний үнэмлэх", "Эрүүл мэндийн үнэмлэх", "Гэр бүлийн орлогын мэдүүлэг"]
      },
      {
        id: 3,
        name: "Суралцах гэрээ 2023-2024",
        type: "Суралцах гэрээ",
        date: "2023-09-01",
        expires: "2024-08-31",
        status: "Дууссан",
        desc: "Өнгөрсөн хичээлийн жилийн суралцах гэрээ. Гэрээний хугацаа дууссан бөгөөд шинэ гэрээгээр солигдсон.",
        requirements: ["Иргэний үнэмлэх", "Төгсөлтийн гэрчилгээ", "Эцэг эхийн зөвшөөрөл"]
      },
    ] as ContractItem[],
  },
  {
    key: "rulesRegulations",
    title: "Дүрэм журам",
    tw: "border-violet-400/25 bg-violet-500/10",
    text: "text-violet-300",
    dot: "bg-violet-400",
    items: [
      {
        id: 4,
        name: "Сургалтын журам",
        type: "Дүрэм",
        date: "2024-09-01",
        expires: "Тогтмол",
        status: "Хүчинтэй",
        desc: "Indra Cyber College-ийн сургалтын журам. Сурагчдын эрх, үүрэг, хичээлд ирэх, дүнгийн үнэлгээ, шалгалтын дүрэм зэрэг зүйлс тусгагдсан.",
        requirements: ["Бүх сурагчид мэдэх ёстой", "Гэрээний нэг хэсэг", "Хууль ёсны хүчинтэй"]
      },
      {
        id: 5,
        name: "Дотуур байрны дүрэм",
        type: "Дүрэм",
        date: "2024-09-01",
        expires: "Тогтмол",
        status: "Хүчинтэй",
        desc: "Дотуур байрны амьдрах дүрэм. Орц, гарах цаг, цэвэрлэгээ, аюулгүй байдал, зохион байгуулалтын дүрэм зэрэг зүйлс тусгагдсан.",
        requirements: ["Дотуур байрны суудагч", "Гэрээний нэг хэсэг", "Хамтын амьдралын дүрэм"]
      },
      {
        id: 6,
        name: "Оюутны эрх, үүргийн дүрэм",
        type: "Дүрэм",
        date: "2024-09-01",
        expires: "Тогтмол",
        status: "Хүчинтэй",
        desc: "Оюутны эрх, үүргийг тодорхойлсон дүрэм. Боловсрол эзэмших эрх, мэдээлэл авах эрх, санал хүсэлт илэрхийлэх эрх зэрэг зүйлс тусгагдсан.",
        requirements: ["Бүх сурагчид мэдэх ёстой", "Хууль ёсны хүчинтэй", "Гэрээний нэг хэсэг"]
      },
    ] as ContractItem[],
  },
  {
    key: "pendingContracts",
    title: "Хүлээгдэж буй гэрээ",
    tw: "border-amber-400/25 bg-amber-500/10",
    text: "text-amber-300",
    dot: "bg-amber-400",
    items: [
      {
        id: 7,
        name: "Дадлагын гэрээний загвар",
        type: "Дадлагын гэрээ",
        date: "2025-01-15",
        expires: "2025-06-30",
        status: "Хүлээгдэж буй",
        desc: "Дадлага хийх үеийн гэрээний загвар. Дадлагын байгууллага, сурагч, коллежийн хоорондын гэрээ. Дадлагын хугацаа, ажлын байр, удирдагч, үнэлгээний систем зэрэг зүйлс тусгагдсан.",
        requirements: ["Дадлагын сонголт", "Байгууллагын зөвшөөрөл", "Коллежийн багшийн зөвшөөрөл", "Эцэг эхийн зөвшөөрөл"]
      },
      {
        id: 8,
        name: "Тэтгэлэг авах гэрээ",
        type: "Тэтгэлэгийн гэрээ",
        date: "2025-03-01",
        expires: "2025-08-31",
        status: "Хүлээгдэж буй",
        desc: "Тэтгэлэг авах үеийн гэрээ. Тэтгэлэг олгох нөхцөл, төлбөр төлөх хугацаа, сурлагын шаардлага, гэрээ дуусах нөхцөл зэрэг зүйлс тусгагдсан.",
        requirements: ["Тэтгэлэгтэй тэнцсэн", "Эцэг эхийн зөвшөөрөл", "Иргэний үнэмлэх", "Орлогын мэдүүлэг"]
      },
    ] as ContractItem[],
  },
];

export default function ContractPage() {
  const [activeMenu, setActiveMenu] = useState("Гэрээ, хэлэлцэл");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ myContracts: true });
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const totalActive = sections.reduce((a, s) => a + s.items.filter((i) => i.status === "Хүчинтэй").length, 0);
  const totalPending = sections.reduce((a, s) => a + s.items.filter((i) => i.status === "Хүлээгдэж буй").length, 0);
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
                <h1 className="mt-1 text-2xl font-semibold text-white">Гэрээ, хэлэлцэл</h1>
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-blue-400/25 bg-blue-400/10 px-3 py-1.5 text-[11px] font-medium text-blue-300">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                {totalActive} идэвхтэй гэрээ
              </span>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Нийт гэрээ", value: totalAll, color: "text-violet-300" },
                { label: "Идэвхтэй", value: totalActive, color: "text-blue-300" },
                { label: "Хүлээгдэж буй", value: totalPending, color: "text-amber-300" },
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
                const activeCount = sec.items.filter((i) => i.status === "Хүчинтэй").length;
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
                      {activeCount > 0 && (
                        <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-2.5 py-0.5 text-[10px] font-medium text-blue-300">
                          {activeCount} идэвхтэй
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
                                    <span className={`text-sm font-bold ${sec.text}`}>{item.type}</span>
                                    <span className="text-white/20">·</span>
                                    <span className="text-[11px] text-white/35">Эхлэх: {item.date}</span>
                                    <span className="text-white/20">·</span>
                                    <span className="text-[11px] text-white/35">Дуусах: {item.expires}</span>
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
                                  {item.status === "Хүчинтэй" && (
                                    <button className={`rounded-2xl border px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80 ${sec.tw} ${sec.text}`}>
                                      Гэрээ татах →
                                    </button>
                                  )}
                                  {item.status === "Хүлээгдэж буй" && (
                                    <button className={`rounded-2xl border px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80 ${sec.tw} ${sec.text}`}>
                                      Гэрээ бэлтгэх →
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
