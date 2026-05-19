"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

type Item = {
  id: number;
  title: string;
  date: string;
  category: string;
  read: boolean;
  tw: string;
  body: string;
};

const items: Item[] = [
  { id: 1,  title: "Python хичээлийн шалгалт маргааш болно",          date: "2025-04-22", category: "Мэдэгдэл",    read: false, tw: "border-pink-400/25 bg-pink-500/10 text-pink-300",       body: "Python undes хичээлийн улирлын шалгалт 2025 оны 5 дугаар сарын 12-нд A-201 өрөөнд болно. Цаг: 09:00-11:00." },
  { id: 2,  title: "Сургалтын төлбөр хугацаа дуусч байна",            date: "2025-04-21", category: "Мэдэгдэл",    read: false, tw: "border-amber-400/25 bg-amber-500/10 text-amber-300",     body: "2025 оны 5 дугаар сарын 1 хүртэл сургалтын төлбөрөө төлнө үү. Хугацаа хэтэрвэл торгууль тооцогдоно." },
  { id: 3,  title: "Шинэ даалгавар нэмэгдлээ: JavaScript Сорил 3",   date: "2025-04-20", category: "Мэдэгдэл",    read: false, tw: "border-blue-400/25 bg-blue-500/10 text-blue-300",        body: "JavaScript хичээлийн Сорил 3 нэмэгдлээ. Дуусгах хугацаа: 2025-04-27." },
  { id: 4,  title: "2025-2026 оны хичээлийн жилийн бүртгэл эхэллээ", date: "2025-04-20", category: "Мэдээ",       read: true,  tw: "border-violet-400/25 bg-violet-500/10 text-violet-300",   body: "Шинэ хичээлийн жилийн бүртгэл 2025 оны 4 дүгээр сарын 20-наас эхэлж, 5 дугаар сарын 15-нд дуусна." },
  { id: 5,  title: "Indra Cyber хакатон 2025 зарлагдлаа",             date: "2025-04-15", category: "Мэдээ",       read: true,  tw: "border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-300",body: "Жил бүр зохиогддог Indra Cyber Hackathon 2025 оны 5 дугаар сарын 25-26-нд болно. Бүртгэл нээлттэй байна." },
  { id: 6,  title: "Сургалтын төлбөрийн хөнгөлөлт авах боломж",      date: "2025-04-10", category: "Мэдээ",       read: true,  tw: "border-emerald-400/25 bg-emerald-500/10 text-emerald-300",body: "Дундаж дүн 85%-аас дээш сурагчид сургалтын төлбөрийн 20% хөнгөлөлт авах боломжтой." },
  { id: 7,  title: "Шинэ React development хичээл нэмэгдлээ",         date: "2025-04-05", category: "Мэдээ",       read: true,  tw: "border-cyan-400/25 bg-cyan-500/10 text-cyan-300",         body: "React development хичээл шинэчлэгдэж Next.js 14, TypeScript агуулга нэмэгдлээ." },
  { id: 8,  title: "Дотуур байрны захиалга эхэллээ",                  date: "2025-03-28", category: "Мэдээ",       read: true,  tw: "border-orange-400/25 bg-orange-500/10 text-orange-300",   body: "2025-2026 оны хичээлийн жилийн дотуур байрны захиалга эхэллээ. Захиалгыг 5 дугаар сарын 1 хүртэл хийнэ үү." },
];

const tabs = ["Бүгд", "Мэдэгдэл", "Мэдээ"] as const;

export default function NotificationsPage() {
  const [activeMenu, setActiveMenu] = useState("Мэдэгдэл");
  const [tab, setTab] = useState<(typeof tabs)[number]>("Бүгд");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [readIds, setReadIds] = useState<Set<number>>(
    new Set(items.filter((i) => i.read).map((i) => i.id))
  );

  const filtered = items.filter((i) => tab === "Бүгд" || i.category === tab);
  const unreadCount = items.filter((i) => !readIds.has(i.id)).length;

  function markRead(id: number) {
    setReadIds((prev) => new Set(Array.from(prev).concat(id)));
  }

  function markAllRead() {
    setReadIds(new Set(items.map((i) => i.id)));
  }

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
                <h1 className="mt-1 text-2xl font-semibold text-white">Мэдэгдэл & Мэдээ</h1>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/50 transition-colors hover:text-white"
                >
                  Бүгдийг уншсан болгох
                </button>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-1 w-fit">
              {tabs.map((t) => {
                const count = t === "Бүгд"
                  ? items.filter((i) => !readIds.has(i.id)).length
                  : items.filter((i) => i.category === t && !readIds.has(i.id)).length;
                return (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                      tab === t
                        ? "bg-gradient-to-b from-violet-500 to-violet-700 text-white shadow-[0_4px_12px_rgba(124,58,237,0.35)]"
                        : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    {t}
                    {count > 0 && (
                      <span className="rounded-full bg-pink-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* List */}
            <div className="space-y-2">
              {filtered.map((n) => {
                const isRead = readIds.has(n.id);
                const isOpen = expanded === n.id;
                return (
                  <div
                    key={n.id}
                    className={`overflow-hidden rounded-[22px] border transition-all ${
                      isOpen ? n.tw : isRead ? "border-white/[0.06] bg-white/[0.015]" : "border-white/[0.1] bg-white/[0.04]"
                    }`}
                  >
                    <button
                      onClick={() => {
                        setExpanded(isOpen ? null : n.id);
                        markRead(n.id);
                      }}
                      className="flex w-full items-start gap-3 px-5 py-4 text-left"
                    >
                      {/* Unread dot */}
                      <div className="mt-1.5 shrink-0">
                        {!isRead ? (
                          <div className="h-2 w-2 rounded-full bg-pink-500" />
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-white/10" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${n.tw}`}>
                            {n.category}
                          </span>
                          <span className="text-[11px] text-white/30">{n.date}</span>
                        </div>
                        <p className={`text-sm font-medium ${isRead ? "text-white/60" : "text-white/90"}`}>
                          {n.title}
                        </p>
                      </div>

                      <svg
                        width="13" height="13" viewBox="0 0 13 13" fill="none"
                        className={`mt-1 shrink-0 text-white/25 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      >
                        <path d="M2.5 4.5l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="border-t border-white/[0.07] bg-white/[0.02] px-5 py-4">
                        <p className="text-sm leading-7 text-white/60">{n.body}</p>
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
