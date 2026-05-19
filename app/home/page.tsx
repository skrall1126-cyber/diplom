"use client";

import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Sidebar from "@/components/Sidebar";

const CourseGrid = dynamic(() => import("@/components/CourseGrid"), {
  ssr: false,
  loading: () => (
    <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
      <div className="h-64 animate-pulse rounded-2xl bg-white/5" />
    </div>
  ),
});

export default function HomePage() {
  const [activeMenu, setActiveMenu] = useState("Нүүр хуудас");

  const handleMenuChange = useCallback((menu: string) => {
    setActiveMenu(menu);
  }, []);

  return (
    <div className="min-h-screen font-sans text-white">
      <Navbar />
      <div className="flex">
        <Sidebar activeMenu={activeMenu} onMenuChange={handleMenuChange} />
        <main
          className="flex-1 overflow-y-auto bg-no-repeat px-4 py-5 md:px-6 md:py-6"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8, 14, 30, 0.75), rgba(8, 12, 24, 0.8)), url('/indra-bg.jpg')",
            backgroundPosition: "center center",
            backgroundSize: "72%",
          }}
          role="main"
          aria-label="Үндсэн контент"
        >
          <div className="mx-auto max-w-7xl space-y-5">
            <Hero />
            <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
              <div className="self-start">
                <StatsBar />
              </div>
              <CourseGrid />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
