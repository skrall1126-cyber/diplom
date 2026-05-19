"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const officeAgent = {
  name: "Сургалтын алба",
  role: "Хариуцсан ажилтан",
  phone: "+976 7777-0001",
  email: "training@indra.mn",
  status: "Онлайн",
};

const quickRequests = ["Ирцийн асуудал", "Дүнгийн асуудал", "Хичээлийн хуваарь"];

const initialMessages = [
  {
    id: 1,
    sender: "office",
    text: "Сайн байна уу. Сургалтын албанд тавтай морилно уу. Танд юугаар туслах вэ?",
    time: "09:12",
  },
];

export default function OfficePage() {
  const [activeMenu, setActiveMenu] = useState("Сургалтын алба");
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");

  const sendMessage = () => {
    const value = draft.trim();
    if (!value) return;

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "student",
        text: value,
        time: "Одоо",
      },
    ]);
    setDraft("");
  };

  const sendQuickRequest = (requestType: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "student",
        text: `${requestType} авах хүсэлт илгээе.`,
        time: "Одоо",
      },
      {
        id: prev.length + 2,
        sender: "office",
        text: `${requestType} хүсэлтийг хүлээн авлаа. Бэлэн болох үед энэ чатаар мэдэгдэнэ.`,
        time: "Одоо",
      },
    ]);
  };

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
          <div className="mx-auto max-w-5xl">
            <section className="overflow-hidden rounded-[30px] border border-white/10 bg-[#081120]/75 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <div className="border-b border-white/10 bg-white/[0.03] px-5 py-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-indigo-500 to-violet-700 text-sm font-semibold text-white">
                      СА
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">{officeAgent.name}</p>
                      <p className="text-xs text-emerald-300">
                        {officeAgent.status} · {officeAgent.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-white/45">
                    <span>{officeAgent.phone}</span>
                    <span>{officeAgent.email}</span>
                  </div>
                </div>
              </div>

              <div className="grid min-h-[680px] lg:grid-cols-[280px_minmax(0,1fr)]">
                <aside className="border-b border-white/10 bg-white/[0.02] p-4 lg:border-b-0 lg:border-r">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/30">
                    Түргэн хүсэлт
                  </p>

                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl border border-violet-400/20 bg-violet-500/10 p-3">
                      <p className="text-sm font-medium text-violet-100">Түргэн асуулт</p>
                      <p className="mt-1 text-xs leading-5 text-white/50">
                        Ирц, дүн, хичээлийн хуваарийн талаар асуулт асуух.
                      </p>
                      <div className="mt-3 grid gap-2">
                        {quickRequests.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => sendQuickRequest(item)}
                            className="rounded-xl border border-violet-400/20 bg-violet-500/10 px-3 py-2 text-left text-xs font-medium text-violet-100 transition-colors hover:bg-violet-500/20"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                      <p className="text-sm font-medium text-white/85">Сургалтын асуудал</p>
                      <p className="mt-1 text-xs leading-5 text-white/50">
                        Хичээл, шалгалт, төлөвлөгөөний талаар асуух.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                      <p className="text-sm font-medium text-white/85">Бусад асуудал</p>
                      <p className="mt-1 text-xs leading-5 text-white/50">
                        Бусад сургалттай холбоотой асуудал.
                      </p>
                    </div>
                  </div>
                </aside>

                <div className="flex min-h-[680px] flex-col">
                  <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                    {messages.map((message) => {
                      const isStudent = message.sender === "student";

                      return (
                        <div
                          key={message.id}
                          className={`flex items-end gap-3 ${isStudent ? "justify-end" : "justify-start"}`}
                        >
                          {!isStudent ? (
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-semibold text-white">
                              СА
                            </div>
                          ) : null}

                          <div
                            className={`max-w-[75%] rounded-[24px] px-4 py-3 text-sm leading-6 shadow-[0_8px_30px_rgba(0,0,0,0.18)] ${
                              isStudent
                                ? "rounded-br-md bg-gradient-to-br from-indigo-500 to-violet-700 text-white"
                                : "rounded-bl-md border border-white/10 bg-white/[0.04] text-white/80"
                            }`}
                          >
                            <p>{message.text}</p>
                            <p className={`mt-2 text-[11px] ${isStudent ? "text-white/65" : "text-white/35"}`}>
                              {message.time}
                            </p>
                          </div>

                          {isStudent ? (
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-semibold text-white">
                              ОЮ
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-white/10 bg-white/[0.02] px-4 py-4">
                    <div className="flex items-end gap-3 rounded-[26px] border border-white/10 bg-white/[0.03] px-4 py-3">
                      <textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                        rows={1}
                        placeholder="Энд мессежээ бичнэ үү..."
                        className="max-h-32 min-h-[28px] flex-1 resize-none bg-transparent text-sm text-white outline-none placeholder:text-white/25"
                      />

                      <button
                        type="button"
                        onClick={sendMessage}
                        className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-700 px-4 py-2 text-xs font-medium text-white transition hover:opacity-90"
                      >
                        Илгээх
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
