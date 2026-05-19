"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

const news = [
  { id: 1, title: "2025-2026 оны хичээлийн жилийн бүртгэл эхэллээ", date: "2025-04-20", category: "Бүртгэл", tw: "border-violet-400/25 bg-violet-500/10 text-violet-300", body: "Шинэ хичээлийн жилийн бүртгэл 2025 оны 4 дүгээр сарын 20-наас эхэлж, 5 дугаар сарын 15-нд дуусна. Бүртгэлийг онлайнаар хийх боломжтой." },
  { id: 2, title: "Python хичээлийн шалгалтын хуваарь гарлаа", date: "2025-04-18", category: "Шалгалт", tw: "border-blue-400/25 bg-blue-500/10 text-blue-300", body: "Python undes хичээлийн улирлын шалгалт 2025 оны 5 дугаар сарын 12-нд A-201 өрөөнд болно. Цаг: 09:00-11:00." },
  { id: 3, title: "Indra Cyber хакатон 2025 зарлагдлаа", date: "2025-04-15", category: "Арга хэмжээ", tw: "border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-300", body: "Жил бүр зохиогддог Indra Cyber Hackathon 2025 оны 5 дугаар сарын 25-26-нд болно. Бүртгэл нээлттэй байна." },
  { id: 4, title: "Сургалтын төлбөрийн хөнгөлөлт авах боломж", date: "2025-04-10", category: "Санхүү", tw: "border-emerald-400/25 bg-emerald-500/10 text-emerald-300", body: "Дундаж дүн 85%-аас дээш сурагчид сургалтын төлбөрийн 20% хөнгөлөлт авах боломжтой. Өргөдлийг 4 дүгээр сарын 30 хүртэл хүлээн авна." },
  { id: 5, title: "Шинэ React development хичээл нэмэгдлээ", date: "2025-04-05", category: "Хичээл", tw: "border-cyan-400/25 bg-cyan-500/10 text-cyan-300", body: "React development хичээл шинэчлэгдэж Next.js 14, TypeScript агуулга нэмэгдлээ. Хичээл 5 дугаар сарын 1-нд эхэлнэ." },
  { id: 6, title: "Дотуур байрны захиалга эхэллээ", date: "2025-03-28", category: "Дотуур байр", tw: "border-orange-400/25 bg-orange-500/10 text-orange-300", body: "2025-2026 оны хичээлийн жилийн дотуур байрны захиалга эхэллээ. Захиалгыг 5 дугаар сарын 1 хүртэл хийнэ үү." },
];

export default function NewsPage() {
  const [activeMenu, setActiveMenu] = useState("Мэдээ мэдээлэл");
  const [expanded, setExpanded] = useState<number | null>(null);

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
              <h1 className="mt-1 text-2xl font-semibold text-white">Мэдээ мэдээлэл</h1>
            </div>

            <div className="space-y-3">
              {news.map((n) => {
                const isOpen = expanded === n.id;
                return (
                  <div key={n.id} className={`overflow-hidden rounded-[22px] border transition-all ${isOpen ? n.tw : "border-white/[0.07] bg-white/[0.02]"}`}>
                    <button
                      onClick={() => setExpanded(isOpen ? null : n.id)}
                      className="flex w-full items-start gap-4 px-5 py-4 text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${n.tw}`}>{n.category}</span>
                          <span className="text-[11px] text-white/30">{n.date}</span>
                        </div>
                        <p className="text-sm font-medium text-white/85">{n.title}</p>
                      </div>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                        className={`mt-1 shrink-0 text-white/25 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
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
