"use client";


import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function GradeStatisticsPage() {
  const [activeMenu, setActiveMenu] = useState("Тайлан");
  const router = useRouter();
  const [userType, setUserType] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState("Энэ улирал");
  const [selectedCourse, setSelectedCourse] = useState("Бүгд");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedType = localStorage.getItem("userType");
      setUserType(savedType);

      // Зөвхөн бүрэн эрхт админ эсвэл сургалтын албаны админ энэ хуудсыг харж болно
      if (savedType !== "admin" && savedType !== "training") {
        router.push("/admin/dashboard");
      }
    }
  }, [router]);

  const backLink = userType === "admin" ? "/admin/dashboard" : 
                   userType === "training" ? "/admin/training-dashboard" : 
                   "/admin/dashboard";

  const semesters = ["Энэ улирал", "Өнгөрсөн улирал", "Энэ жил", "Өнгөрсөн жил"];
  const courses = ["Бүгд", "Python програмчлал", "Санхүүгийн удирдлага", "Иргэний эрх зүй", "Бизнесийн стратеги", "Дижитал маркетинг", "Механик инженеринг"];

  const gradeData = [
    { course: "Python програмчлал", A: 15, B: 25, C: 30, D: 20, F: 10, average: 78.5, passRate: 90.0 },
    { course: "Санхүүгийн удирдлага", A: 20, B: 30, C: 25, D: 15, F: 10, average: 82.3, passRate: 92.5 },
    { course: "Иргэний эрх зүй", A: 18, B: 28, C: 32, D: 12, F: 10, average: 80.1, passRate: 91.0 },
    { course: "Бизнесийн стратеги", A: 22, B: 35, C: 28, D: 10, F: 5, average: 85.7, passRate: 95.0 },
    { course: "Дижитал маркетинг", A: 25, B: 30, C: 25, D: 15, F: 5, average: 83.9, passRate: 94.0 },
    { course: "Механик инженеринг", A: 12, B: 20, C: 35, D: 20, F: 13, average: 72.8, passRate: 87.0 },
  ];

  const filteredData = selectedCourse === "Бүгд" 
    ? gradeData 
    : gradeData.filter(item => item.course === selectedCourse);

  const totalStats = filteredData.reduce((acc, item) => ({
    A: acc.A + item.A,
    B: acc.B + item.B,
    C: acc.C + item.C,
    D: acc.D + item.D,
    F: acc.F + item.F,
    total: acc.total + item.A + item.B + item.C + item.D + item.F,
    averageSum: acc.averageSum + item.average,
    passRateSum: acc.passRateSum + item.passRate,
  }), { A: 0, B: 0, C: 0, D: 0, F: 0, total: 0, averageSum: 0, passRateSum: 0 });

  const overallAverage = filteredData.length > 0 ? totalStats.averageSum / filteredData.length : 0;
  const overallPassRate = filteredData.length > 0 ? totalStats.passRateSum / filteredData.length : 0;

  return (
    <div className="min-h-screen font-sans text-white">
      
      <Navbar />
      <div className="flex">
        <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
        <main
          className="flex-1 overflow-y-auto bg-no-repeat px-4 py-5 md:px-6 md:py-6"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8, 14, 30, 0.75), rgba(8, 12, 24, 0.8)), url('/indra-bg.jpg')",
            backgroundPosition: "center center",
            backgroundAttachment: "scroll",
            backgroundSize: "72%",
          }}
        >
          <div className="mx-auto max-w-7xl space-y-5">
        {/* Буцах холбоос */}
        <div className="mb-6">
          <Link
            href={backLink}
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Буцах
          </Link>
        </div>

        {/* Гарчиг */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Дүнгийн статистик</h1>
          <p className="text-white/60">
            Хичээл, тэнхимийн дүнгийн статистик мэдээлэл, тайлан
          </p>
        </div>

        {/* Шүүлтүүр */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-sm font-medium text-white/70 mb-2">
              Улирал
            </label>
            <div className="flex flex-wrap gap-2">
              {semesters.map((semester) => (
                <button
                  key={semester}
                  onClick={() => setSelectedSemester(semester)}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    selectedSemester === semester
                      ? "bg-violet-600 text-white"
                      : "bg-white/[0.08] text-white/70 hover:bg-white/[0.12] hover:text-white"
                  }`}
                >
                  {semester}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full md:w-64">
            <label className="block text-sm font-medium text-white/70 mb-2">
              Хичээл
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30"
            >
              {courses.map((course) => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Нийт статистик */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Нийт оюутан</h3>
              <div className="p-2 bg-violet-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M15 16c0-2.5-2-4-5-4s-5 1.5-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">{totalStats.total}</div>
              <div className="text-sm text-white/60">Оюутан</div>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Дундаж дүн</h3>
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1v18M1 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">{overallAverage.toFixed(1)}</div>
              <div className="text-sm text-white/60">100 онооны систем</div>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Тэнцсэн хувь</h3>
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10 6v8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">{overallPassRate.toFixed(1)}%</div>
              <div className="text-sm text-white/60">Тэнцсэн оюутан</div>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Тэнцээгүй</h3>
              <div className="p-2 bg-rose-500/20 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">{totalStats.F}</div>
              <div className="text-sm text-white/60">Оюутан</div>
            </div>
          </div>
        </div>

        {/* Дүнгийн тархалтын хүснэгт */}
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-8">
          <div className="p-5 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Хичээлийн дүнгийн тайлан</h3>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors">
                PDF тайлан татах
              </button>
              <button className="px-4 py-2 text-sm bg-white/[0.08] hover:bg-white/[0.12] text-white/80 hover:text-white rounded-lg transition-colors">
                Excel тайлан татах
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-white/70 font-medium">Хичээл</th>
                  <th className="text-left p-4 text-white/70 font-medium">A (90-100)</th>
                  <th className="text-left p-4 text-white/70 font-medium">B (80-89)</th>
                  <th className="text-left p-4 text-white/70 font-medium">C (70-79)</th>
                  <th className="text-left p-4 text-white/70 font-medium">D (60-69)</th>
                  <th className="text-left p-4 text-white/70 font-medium">F (0-59)</th>
                  <th className="text-left p-4 text-white/70 font-medium">Дундаж</th>
                  <th className="text-left p-4 text-white/70 font-medium">Тэнцсэн %</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((course, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="p-4 text-white">{course.course}</td>
                    <td className="p-4 text-emerald-300">{course.A}</td>
                    <td className="p-4 text-blue-300">{course.B}</td>
                    <td className="p-4 text-amber-300">{course.C}</td>
                    <td className="p-4 text-orange-300">{course.D}</td>
                    <td className="p-4 text-rose-300">{course.F}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              course.average >= 80 ? "bg-emerald-500" : 
                              course.average >= 70 ? "bg-amber-500" : 
                              "bg-rose-500"
                            }`}
                            style={{ width: `${course.average}%` }}
                          />
                        </div>
                        <span className="text-white">{course.average.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        course.passRate >= 90 ? "bg-emerald-500/20 text-emerald-300" :
                        course.passRate >= 80 ? "bg-amber-500/20 text-amber-300" :
                        "bg-rose-500/20 text-rose-300"
                      }`}>
                        {course.passRate.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Дүнгийн тархалтын график */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h3 className="text-xl font-semibold text-white mb-6">Дүнгийн тархалт</h3>
            <div className="space-y-4">
              {[
                { grade: "A (90-100)", count: totalStats.A, color: "bg-emerald-500", percent: totalStats.total > 0 ? (totalStats.A / totalStats.total) * 100 : 0 },
                { grade: "B (80-89)", count: totalStats.B, color: "bg-blue-500", percent: totalStats.total > 0 ? (totalStats.B / totalStats.total) * 100 : 0 },
                { grade: "C (70-79)", count: totalStats.C, color: "bg-amber-500", percent: totalStats.total > 0 ? (totalStats.C / totalStats.total) * 100 : 0 },
                { grade: "D (60-69)", count: totalStats.D, color: "bg-orange-500", percent: totalStats.total > 0 ? (totalStats.D / totalStats.total) * 100 : 0 },
                { grade: "F (0-59)", count: totalStats.F, color: "bg-rose-500", percent: totalStats.total > 0 ? (totalStats.F / totalStats.total) * 100 : 0 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">{item.grade}</span>
                    <span className="text-white">{item.count} хүн ({item.percent.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h3 className="text-xl font-semibold text-white mb-6">Хамгийн өндөр/бага дүнтэй хичээлүүд</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-medium mb-3">Өндөр дүнтэй топ 3</h4>
                <div className="space-y-3">
                  {[...filteredData]
                    .sort((a, b) => b.average - a.average)
                    .slice(0, 3)
                    .map((course, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg">
                        <div>
                          <div className="text-white font-medium">{course.course}</div>
                          <div className="text-sm text-white/50">Дундаж: {course.average.toFixed(1)}</div>
                        </div>
                        <div className="text-emerald-300 font-semibold">
                          {course.passRate.toFixed(1)}% тэнцсэн
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-3">Бага дүнтэй топ 3</h4>
                <div className="space-y-3">
                  {[...filteredData]
                    .sort((a, b) => a.average - b.average)
                    .slice(0, 3)
                    .map((course, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg">
                        <div>
                          <div className="text-white font-medium">{course.course}</div>
                          <div className="text-sm text-white/50">Дундаж: {course.average.toFixed(1)}</div>
                        </div>
                        <div className="text-rose-300 font-semibold">
                          {course.passRate.toFixed(1)}% тэнцсэн
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Тайлбар */}
        <div className="mt-8 p-5 bg-white/[0.02] border border-white/10 rounded-xl">
          <h4 className="text-lg font-semibold text-white mb-3">Дүнгийн статистикийн тайлбар</h4>
          <ul className="space-y-2 text-white/60 text-sm">
            <li>• Дүнгийн тайланг улирал бүр шинэчлэн гаргана</li>
            <li>• Дүнгийн хэмжүүр: 100 онооны систем (A: 90-100, B: 80-89, C: 70-79, D: 60-69, F: 0-59)</li>
            <li>• Тэнцэх дүн: 60 оноо (D дүнээс дээш)</li>
            <li>• Хичээлийн дундаж дүнг оюутны дүнгийн дундажаар тооцно</li>
            <li>• Тэнцсэн хувь нь D дүнээс дээш дүн авсан оюутны хувийг харуулна</li>
            <li>• Тайланг PDF, Excel форматаар татаж авах боломжтой</li>
          </ul>
                </div>
          </div>
        </main>
      </div>
    </div>
  );
}