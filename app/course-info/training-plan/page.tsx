"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState, useMemo, useCallback } from "react";
import Link from "next/link";

// Сургалтын төлөвлөгөөний өгөгдөл
const trainingPlans = [
  {
    id: "python-basics",
    title: "Python үндэс",
    description: "Python хэлний үндсэн ойлголт, хувьсагч, нөхцөл, давталт, функц болон жижиг төслийн дадлага.",
    instructor: "Dr. Batjargal",
    duration: "16 долоо хоног",
    level: "Эхлэгч",
    category: "Програмчлал",
    progress: 85,
    completedWeeks: 14,
    totalWeeks: 16,
    startDate: "2024-09-01",
    endDate: "2024-12-15",
    color: "border-blue-400/30 bg-blue-500/15",
    dot: "bg-blue-400",
    weeks: [
      { week: 1, title: "Python суулгах, орчин бэлтгэх", topics: ["Python суулгах", "IDE сонгох", "Эхний програм"], status: "Дууссан" },
      { week: 2, title: "Өгөгдлийн төрлүүд, хувьсагч", topics: ["Тоо, текст, boolean", "Хувьсагч зарлах", "Өгөгдлийн төрлийн хувирал"], status: "Дууссан" },
      { week: 3, title: "Нөхцөл, операторууд", topics: ["if, elif, else", "Логик операторууд", "Тэнцүү, их, бага"], status: "Дууссан" },
      { week: 4, title: "Давталт", topics: ["for давталт", "while давталт", "break, continue"], status: "Дууссан" },
      { week: 5, title: "Функц бичих", topics: ["Функц тодорхойлох", "Параметр, буцаах утга", "Scope, global, local"], status: "Дууссан" },
      { week: 6, title: "List, tuple, dictionary", topics: ["List үүсгэх, засах", "Tuple ашиглах", "Dictionary ашиглах"], status: "Дууссан" },
      { week: 7, title: "Файл уншиж бичих", topics: ["Файл нээх, хаах", "Текст файл унших", "Текст файл бичих"], status: "Дууссан" },
      { week: 8, title: "Дундын шалгалт", topics: ["Дундын шалгалт", "Дундын төсөл"], status: "Дууссан" },
      { week: 9, title: "Exception handling", topics: ["try, except", "Exception төрлүүд", "Custom exception"], status: "Дууссан" },
      { week: 10, title: "Module, package", topics: ["Module ашиглах", "Package үүсгэх", "Standard library"], status: "Дууссан" },
      { week: 11, title: "OOP үндэс", topics: ["Class, object", "Constructor", "Method, property"], status: "Дууссан" },
      { week: 12, title: "Inheritance, polymorphism", topics: ["Наследилэлт", "Полиморфизм", "Encapsulation"], status: "Дууссан" },
      { week: 13, title: "Database холболт", topics: ["SQLite холболт", "CRUD үйлдэл", "SQL query"], status: "Дууссан" },
      { week: 14, title: "Web scraping", topics: ["Requests library", "BeautifulSoup", "Data extraction"], status: "Явж буй" },
      { week: 15, title: "Төслийн дадлага", topics: ["Төслийн сонголт", "Код бичих", "Тест хийх"], status: "Дараагийн" },
      { week: 16, title: "Эцсийн шалгалт", topics: ["Эцсийн шалгалт", "Төслийн танилцуулга", "Үнэлгээ"], status: "Дараагийн" },
    ]
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "JavaScript синтакс, DOM, event, asynchronous programming болон web interaction-ийн дадлага.",
    instructor: "Ts. Enkhtuya",
    duration: "16 долоо хоног",
    level: "Эхлэгч",
    category: "Програмчлал",
    progress: 75,
    completedWeeks: 12,
    totalWeeks: 16,
    startDate: "2024-09-01",
    endDate: "2024-12-15",
    color: "border-amber-400/30 bg-amber-500/15",
    dot: "bg-amber-400",
    weeks: [
      { week: 1, title: "JavaScript үндэс", topics: ["Синтакс", "Өгөгдлийн төрлүүд", "Хувьсагч"], status: "Дууссан" },
      { week: 2, title: "DOM манипуляци", topics: ["DOM элемент сонгох", "Контент өөрчлөх", "Стиль өөрчлөх"], status: "Дууссан" },
      { week: 3, title: "Event handling", topics: ["Event listener", "Event object", "Event delegation"], status: "Дууссан" },
      { week: 4, title: "Функц ба scope", topics: ["Function declaration", "Arrow function", "Scope, closure"], status: "Дууссан" },
      { week: 5, title: "Array methods", topics: ["map, filter, reduce", "forEach, find", "Array manipulation"], status: "Дууссан" },
      { week: 6, title: "Object, JSON", topics: ["Object creation", "JSON parse, stringify", "Object methods"], status: "Дууссан" },
      { week: 7, title: "Asynchronous JavaScript", topics: ["Callback", "Promise", "async/await"], status: "Дууссан" },
      { week: 8, title: "Дундын шалгалт", topics: ["Дундын шалгалт", "Дундын төсөл"], status: "Дууссан" },
      { week: 9, title: "Fetch API", topics: ["HTTP request", "REST API", "Error handling"], status: "Дууссан" },
      { week: 10, title: "Local storage", topics: ["localStorage", "sessionStorage", "Cookies"], status: "Дууссан" },
      { week: 11, title: "ES6+ features", topics: ["Destructuring", "Spread operator", "Template literals"], status: "Дууссан" },
      { week: 12, title: "Modules", topics: ["Import, export", "Module patterns", "Bundling"], status: "Явж буй" },
      { week: 13, title: "Testing", topics: ["Unit testing", "Jest", "Test driven development"], status: "Дараагийн" },
      { week: 14, title: "Build tools", topics: ["Webpack", "Babel", "npm scripts"], status: "Дараагийн" },
      { week: 15, title: "Төслийн дадлага", topics: ["Төслийн сонголт", "Код бичих", "Тест хийх"], status: "Дараагийн" },
      { week: 16, title: "Эцсийн шалгалт", topics: ["Эцсийн шалгалт", "Төслийн танилцуулга", "Үнэлгээ"], status: "Дараагийн" },
    ]
  },
  {
    id: "networking",
    title: "Networking",
    description: "Сүлжээний үндэс, OSI/TCP-IP загвар, IP хаяглалт, routing болон basic network security.",
    instructor: "Prof. Bold",
    duration: "16 долоо хоног",
    level: "Дунд",
    category: "Сүлжээ",
    progress: 90,
    completedWeeks: 15,
    totalWeeks: 16,
    startDate: "2024-09-01",
    endDate: "2024-12-15",
    color: "border-emerald-400/30 bg-emerald-500/15",
    dot: "bg-emerald-400",
    weeks: [
      { week: 1, title: "Сүлжээний үндэс", topics: ["Сүлжээний төрлүүд", "Топологи", "Протокол"], status: "Дууссан" },
      { week: 2, title: "OSI загвар", topics: ["7 давхарга", "Давхарга бүрийн үүрэг", "Data encapsulation"], status: "Дууссан" },
      { week: 3, title: "TCP/IP загвар", topics: ["4 давхарга", "TCP vs UDP", "Port number"], status: "Дууссан" },
      { week: 4, title: "IP хаяглалт", topics: ["IPv4, IPv6", "Subnetting", "CIDR notation"], status: "Дууссан" },
      { week: 5, title: "Routing", topics: ["Routing protocol", "Static vs dynamic", "Routing table"], status: "Дууссан" },
      { week: 6, title: "Switching", topics: ["MAC address", "VLAN", "Spanning Tree"], status: "Дууссан" },
      { week: 7, title: "DNS, DHCP", topics: ["Domain Name System", "Dynamic Host Configuration", "DNS records"], status: "Дууссан" },
      { week: 8, title: "Дундын шалгалт", topics: ["Дундын шалгалт", "Дундын төсөл"], status: "Дууссан" },
      { week: 9, title: "Network security", topics: ["Firewall", "VPN", "Encryption"], status: "Дууссан" },
      { week: 10, title: "Wireless networking", topics: ["Wi-Fi standards", "Security protocols", "Configuration"], status: "Дууссан" },
      { week: 11, title: "Network monitoring", topics: ["SNMP", "Network analyzers", "Log analysis"], status: "Дууссан" },
      { week: 12, title: "Cloud networking", topics: ["VPC", "Load balancing", "CDN"], status: "Дууссан" },
      { week: 13, title: "Troubleshooting", topics: ["Network tools", "Diagnostic commands", "Problem solving"], status: "Дууссан" },
      { week: 14, title: "Practical lab", topics: ["Network setup", "Configuration", "Testing"], status: "Дууссан" },
      { week: 15, title: "Төслийн дадлага", topics: ["Төслийн сонголт", "Network design", "Implementation"], status: "Явж буй" },
      { week: 16, title: "Эцсийн шалгалт", topics: ["Эцсийн шалгалт", "Төслийн танилцуулга", "Үнэлгээ"], status: "Дараагийн" },
    ]
  }
];

// Статусын өнгө
const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  "Дууссан": { bg: "bg-emerald-500/10", text: "text-emerald-300", border: "border-emerald-400/20" },
  "Явж буй": { bg: "bg-blue-500/10", text: "text-blue-300", border: "border-blue-400/20" },
  "Дараагийн": { bg: "bg-gray-500/10", text: "text-gray-300", border: "border-gray-400/20" },
};

export default function TrainingPlanPage() {
  const [activeMenu, setActiveMenu] = useState("Хичээл");
  const [selectedCourse, setSelectedCourse] = useState(trainingPlans[0]);
  const [activeWeek, setActiveWeek] = useState(0);
  const [viewMode, setViewMode] = useState<"timeline" | "list" | "calendar">("timeline");

  const handleMenuChange = useCallback((menu: string) => {
    setActiveMenu(menu);
  }, []);

  const backgroundStyle = useMemo(() => ({
    backgroundImage: "linear-gradient(rgba(8,14,30,0.9),rgba(8,12,24,0.95)),url('/indra-bg.jpg')",
    backgroundPosition: "center center",
    backgroundAttachment: "scroll",
            backgroundSize: "72%",
  }), []);

  const handleCourseSelect = (courseId: string) => {
    const course = trainingPlans.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      setActiveWeek(0);
    }
  };

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <div className="flex">
        <Sidebar activeMenu={activeMenu} onMenuChange={handleMenuChange} />
        <main
          className="flex-1 overflow-y-auto bg-no-repeat px-4 py-6 md:px-6"
          style={backgroundStyle}
          role="main"
          aria-label="Сургалтын төлөвлөгөө"
        >
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Header */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-6 backdrop-blur-md">
              <div>
                <h1 className="text-2xl font-bold text-white">Сургалтын төлөвлөгөө</h1>
                <p className="mt-2 text-sm text-white/60">
                  Хичээл бүрийн нарийвчилсан төлөвлөгөө, долоо хоног бүрийн сэдэв, даалгаврууд
                </p>
              </div>

              {/* Course selector */}
              <div className="mt-6">
                <div className="flex flex-wrap gap-2">
                  {trainingPlans.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => handleCourseSelect(course.id)}
                      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all ${
                        selectedCourse.id === course.id
                          ? "border-violet-400/30 bg-violet-500/15 text-violet-200"
                          : "border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <div className={`h-2 w-2 rounded-full ${course.dot}`} />
                      {course.title}
                      <span className="ml-1 rounded-full bg-white/5 px-2 py-0.5 text-xs">
                        {course.progress}%
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Course overview */}
            <div className="grid gap-6 lg:grid-cols-1">
              {/* Course info */}
              <div>
                <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-6 backdrop-blur-md">
                  <div className="mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-white">{selectedCourse.title}</h2>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-6">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm text-white/50">Сургалтын явц</span>
                        <span className="text-sm font-medium text-violet-300">{selectedCourse.progress}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300"
                          style={{ width: `${selectedCourse.progress}%` }}
                        />
                      </div>
                      <div className="mt-2 flex justify-between text-xs text-white/30">
                        <span>Эхлэх: {selectedCourse.startDate}</span>
                        <span>Дуусах: {selectedCourse.endDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Course details */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-[16px] border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-white/50">Багш</p>
                      <p className="mt-1 font-medium text-white">{selectedCourse.instructor}</p>
                    </div>
                    <div className="rounded-[16px] border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-white/50">Хугацаа</p>
                      <p className="mt-1 font-medium text-white">{selectedCourse.duration}</p>
                    </div>
                    <div className="rounded-[16px] border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-white/50">Дууссан долоо хоног</p>
                      <p className="mt-1 font-medium text-white">
                        {selectedCourse.completedWeeks} / {selectedCourse.totalWeeks}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* All weeks table */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-6 backdrop-blur-md">
              <h2 className="mb-6 text-xl font-bold text-white">Бүх долоо хоногийн төлөвлөгөө</h2>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Долоо хоног</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Гарчиг</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Сэдвүүд</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Төлөв</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Үйлдэл</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCourse.weeks.map((week) => {
                      const statusColor = statusColors[week.status];
                      return (
                        <tr key={week.week} className="border-b border-white/10 hover:bg-white/5">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className={`h-2 w-2 rounded-full ${selectedCourse.dot}`} />
                              <span className="font-medium text-white">Долоо хоног {week.week}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-white/80">{week.title}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {week.topics.slice(0, 2).map((topic, index) => (
                                <span key={index} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/50">
                                  {topic}
                                </span>
                              ))}
                              {week.topics.length > 2 && (
                                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/50">
                                  +{week.topics.length - 2}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs ${statusColor.border} ${statusColor.bg} ${statusColor.text}`}>
                              <div className={`h-1.5 w-1.5 rounded-full ${statusColor.text.replace('text-', 'bg-')}`} />
                              {week.status}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Link
                                href={`/course/${selectedCourse.id}`}
                                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/10"
                              >
                                Хичээл үзэх
                              </Link>
                              <button className="rounded-lg border border-violet-400/30 bg-violet-500/15 px-3 py-1.5 text-xs font-medium text-violet-200 transition-colors hover:bg-violet-500/25">
                                Даалгавар
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}