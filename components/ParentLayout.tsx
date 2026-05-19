"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const sidebarItems = [
  {
    label: "Нүүр хуудас",
    href: "/parent",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M1.5 6L7.5 1.5L13.5 6V13H9.5V9.5H5.5V13H1.5V6Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Дүнгийн мэдээлэл",
    href: "/parent",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1.5" y="2" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M4 6h7M4 9h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Ирцийн мэдээлэл",
    href: "/parent",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M7.5 4.5V7.5L9.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Төлбөрийн мэдээлэл",
    href: "/parent",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1.5" y="4" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M1.5 7h12" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="4.5" cy="9.5" r="0.8" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "Мэдэгдэл & Мэдээ",
    href: "/parent",
    badge: 3,
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M7.5 1.5C5 1.5 3 3.5 3 6c0 3.5-2 4-2 4h13s-2-.5-2-4c0-2.5-2-4.5-4.5-4.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M6.2 12.5a1.3 1.3 0 002.6 0" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
];

const child = { name: "Төртэмүүлэн", id: "B211930019", role: "Эцэг/эх" };

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="min-h-screen text-white">

      {/* Navbar — same as student */}
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b border-white/[0.07] bg-[#0a0118]/90 px-5 backdrop-blur-md">
        <Link href="/parent" className="flex shrink-0 items-center gap-3">
          <div className="h-11 w-11 overflow-hidden rounded-full border-2 border-violet-400/35">
            <img src="/navbar-logo.jpg" alt="Indra Cyber" className="h-full w-full object-cover"
              onError={(e) => {
                const t = e.currentTarget as HTMLImageElement;
                t.style.display = "none";
                t.parentElement!.style.background = "linear-gradient(135deg,#d946ef,#f50303)";
                t.parentElement!.innerHTML = '<span style="font-size:11px;font-weight:600;color:white;display:flex;align-items:center;justify-content:center;height:100%">IC</span>';
              }}
            />
          </div>
          <div>
            <p className="text-[15px] font-semibold leading-none text-white">Indra Cyber</p>
            <p className="mt-1 text-xs leading-none text-white/40">Эцэг/эхийн портал</p>
          </div>
        </Link>

        <div className="mx-1 h-5 w-px bg-white/10" />

        <nav className="scrollbar-none flex flex-1 items-center gap-1 overflow-x-auto" />

        <div className="flex shrink-0 items-center gap-2">
          {/* Bell */}
          <button
            onClick={() => router.push("/parent")}
            className="relative flex h-8 w-8 items-center justify-center rounded-lg text-white/50 transition-all hover:bg-white/[0.06] hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5-2 4.5-2 4.5h13s-2-1-2-4.5c0-2.5-2-4.5-4.5-4.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
              <path d="M9.3 13a1.3 1.3 0 01-2.6 0" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full border border-[#0a0118] bg-pink-500" />
          </button>

          {/* Avatar dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className={`h-8 w-8 overflow-hidden rounded-lg border transition-all ${open ? "border-violet-400/50" : "border-white/10 hover:border-violet-400/35"}`}
            >
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-fuchsia-800 to-violet-800 text-xs font-semibold text-white">
                Э
              </div>
            </button>

            <div className={`absolute right-0 top-[calc(100%+8px)] w-52 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d1628]/95 shadow-[0_16px_48px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-200 ${open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`}>
              <div className="border-b border-white/[0.07] px-4 py-3">
                <p className="text-sm font-medium text-white">{child.name}</p>
                <p className="mt-0.5 text-[11px] text-white/35">{child.id} · {child.role}</p>
              </div>
              <div className="p-1.5">
                <div className="my-1 h-px bg-white/[0.06]" />
                <button
                  onClick={() => { setOpen(false); router.replace("/login"); }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-400/80 transition-all hover:bg-red-500/10 hover:text-red-300"
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="shrink-0">
                    <path d="M5.5 7.5H13M10.5 5l2.5 2.5-2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 3H3a1 1 0 00-1 1v7a1 1 0 001 1h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex">

        {/* Sidebar — same style as student */}
        <aside className="sticky top-16 flex h-[calc(100vh-64px)] w-52 shrink-0 flex-col border-r border-white/[0.07] bg-[#0a0118] px-2 py-3">
          <p className="mb-2 px-3 text-[10px] uppercase tracking-widest text-white/30">Цэс</p>
          <nav className="flex flex-col gap-0.5 overflow-y-auto scrollbar-none">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-2.5 rounded-lg border px-3 py-2 text-sm transition-all ${
                    isActive
                      ? "border-violet-400/20 bg-violet-600/15 text-violet-200"
                      : "border-transparent text-white/50 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <span className={isActive ? "text-violet-200" : "text-white/40 group-hover:text-white/70"}>
                    {item.icon}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  {item.badge ? (
                    <span className="rounded-full bg-pink-500/80 px-1.5 py-0.5 text-[10px] text-white">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto px-2">
            <div className="rounded-xl border border-fuchsia-400/20 bg-fuchsia-600/10 p-1">
              <p className="mt-0.5 text-center text-[12px] leading-relaxed text-white/40">
                2025-2026
              </p>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main
          className="flex-1 overflow-y-auto bg-no-repeat px-4 py-6 md:px-6"
          style={{
            backgroundImage: "linear-gradient(rgba(8,14,30,0.9),rgba(8,12,24,0.95)),url('/indra-bg.jpg')",
            backgroundPosition: "center center",
            backgroundSize: "72%",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
