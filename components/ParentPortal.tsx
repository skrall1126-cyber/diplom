"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

type ParentView = "overview" | "profile" | "grades" | "attendance" | "payment" | "schedule" | "exams" | "messages";

interface ParentPortalProps {
  view: ParentView;
}

const viewTitles: Record<ParentView, string> = {
  overview: "Нүүр хуудас",
  profile: "Хувийн мэдээлэл",
  grades: "Дүнгийн мэдээлэл",
  attendance: "Ирцийн мэдээлэл",
  payment: "Төлбөрийн мэдээлэл",
  schedule: "Хичээлийн хуваарь",
  exams: "Шалгалтын хуваарь",
  messages: "Мэдэгдэл",
};

const students = [
  {
    id: "B211930019",
    name: "Төртэмүүлэн",
    lastName: "Батбаяр",
    fullName: "Төртэмүүлэн Батбаяр",
    avatar: "Т",
    email: "tortemuulen.batbayar@indra.edu.mn",
    phone: "9900-1122",
    birthDate: "2003-05-15",
    gender: "Эрэгтэй",
    address: "Улаанбаатар хот, Баянзүрх дүүрэг, 11-р хороо",
    major: "Програм хангамжийн инженерчлэл",
    className: "SE-2021",
    enrollmentYear: "2021",
    semester: "8-р семестр",
    advisor: "Б. Ганбат багш",
    scholarship: "Тэтгэлэгтэй",
    dormitory: "A байр, 305 тоот",
    parentName: "Эцэг/эх",
    parentPhone: "9900-1122",
  },
  {
    id: "B211930020",
    name: "Мөнхбат",
    lastName: "Эрдэнэ",
    fullName: "Мөнхбат Эрдэнэ",
    avatar: "М",
    email: "munkhbat.erdene@indra.edu.mn",
    phone: "9922-3344",
    birthDate: "2004-08-22",
    gender: "Эрэгтэй",
    address: "Улаанбаатар хот, Сүхбаатар дүүрэг",
    major: "Кибер аюулгүй байдал",
    className: "CS-2021",
    enrollmentYear: "2021",
    semester: "8-р семестр",
    advisor: "Н. Батбаяр багш",
    scholarship: "Энгийн",
    dormitory: "Дотуур байргүй",
    parentName: "Эцэг/эх",
    parentPhone: "9911-4455",
  },
];

const courses = [
  { subject: "Python үндэс", code: "CS101", score: 92, attendance: 95, total: 24, done: 22, quiz1: 18, quiz2: 19, assignment: 85, progress: 88, exam: 90, credits: 3, teacher: "Б. Ганбат", room: "A-201", time: "Даваа, Пүрэв 10:00-11:30", dot: "bg-blue-400", text: "text-blue-300", card: "border-blue-400/30 bg-blue-500/15" },
  { subject: "JavaScript", code: "CS202", score: 76, attendance: 85, total: 20, done: 17, quiz1: 15, quiz2: 14, assignment: 72, progress: 74, exam: 76, credits: 4, teacher: "Ц. Энхбаяр", room: "B-105", time: "Мягмар, Баасан 14:00-15:30", dot: "bg-amber-400", text: "text-amber-300", card: "border-amber-400/30 bg-amber-500/15" },
  { subject: "Networking", code: "CS303", score: 81, attendance: 88, total: 16, done: 14, quiz1: 17, quiz2: 16, assignment: 78, progress: 80, exam: 82, credits: 3, teacher: "Д. Наранцэцэг", room: "C-302", time: "Лхагва 08:00-10:30", dot: "bg-emerald-400", text: "text-emerald-300", card: "border-emerald-400/30 bg-emerald-500/15" },
  { subject: "Database", code: "CS404", score: 70, attendance: 80, total: 22, done: 18, quiz1: 14, quiz2: 13, assignment: 65, progress: 68, exam: 70, credits: 4, teacher: "Ж. Болдбаатар", room: "A-104", time: "Пүрэв, Баасан 16:00-17:30", dot: "bg-orange-400", text: "text-orange-300", card: "border-orange-400/30 bg-orange-500/15" },
  { subject: "UI/UX Design", code: "CS505", score: 94, attendance: 92, total: 14, done: 13, quiz1: 20, quiz2: 19, assignment: 92, progress: 93, exam: 95, credits: 3, teacher: "Г. Уянга", room: "D-201", time: "Мягмар 11:00-12:30", dot: "bg-pink-400", text: "text-pink-300", card: "border-pink-400/30 bg-pink-500/15" },
  { subject: "Cyber Security", code: "CS606", score: 88, attendance: 75, total: 20, done: 15, quiz1: 16, quiz2: 17, assignment: 84, progress: 86, exam: 88, credits: 4, teacher: "Н. Батбаяр", room: "B-302", time: "Лхагва 13:00-15:00", dot: "bg-red-400", text: "text-red-300", card: "border-red-400/30 bg-red-500/15" },
];

const payments = [
  { term: "2024 хавар", amount: 850_000, paid: 850_000, date: "2024-02-15", status: "Төлсөн" },
  { term: "2024 намар", amount: 850_000, paid: 850_000, date: "2024-09-10", status: "Төлсөн" },
  { term: "2025 хавар", amount: 900_000, paid: 900_000, date: "2025-02-20", status: "Төлсөн" },
  { term: "2025 намар", amount: 900_000, paid: 0, date: "-", status: "Хүлээгдэж байна" },
];

const exams = [
  { subject: "Python үндэс", date: "2026-05-12", time: "09:00-11:00", room: "A-201", type: "Улирлын шалгалт" },
  { subject: "JavaScript", date: "2026-05-14", time: "13:00-15:00", room: "B-105", type: "Улирлын шалгалт" },
  { subject: "Networking", date: "2026-05-16", time: "09:00-11:00", room: "C-302", type: "Улирлын шалгалт" },
  { subject: "Database", date: "2026-05-19", time: "10:00-12:00", room: "A-104", type: "Улирлын шалгалт" },
];

const messages = [
  "Python хичээлийн улирлын шалгалтанд сайн бэлтгэх шаардлагатай.",
  "React development project-ийн явц хэвийн байна.",
  "Ирцийн хувь сайн байгаа тул үргэлжлүүлэн тогтмол суухыг зөвлөж байна.",
];

function gradeLabel(score: number) {
  if (score >= 90) return { label: "A", tw: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300" };
  if (score >= 80) return { label: "B", tw: "border-blue-400/25 bg-blue-400/10 text-blue-300" };
  if (score >= 70) return { label: "C", tw: "border-amber-400/25 bg-amber-400/10 text-amber-300" };
  if (score >= 60) return { label: "D", tw: "border-orange-400/25 bg-orange-400/10 text-orange-300" };
  return { label: "F", tw: "border-red-400/25 bg-red-400/10 text-red-300" };
}

function attendanceColor(pct: number) {
  if (pct >= 90) return "text-emerald-300";
  if (pct >= 75) return "text-amber-300";
  return "text-red-300";
}

function attendanceBar(pct: number) {
  if (pct >= 90) return "from-emerald-400 to-teal-400";
  if (pct >= 75) return "from-amber-400 to-orange-400";
  return "from-red-400 to-rose-400";
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[24px] border border-white/10 bg-[#081120]/70 backdrop-blur-md ${className}`}>{children}</div>;
}

export default function ParentPortal({ view }: ParentPortalProps) {
  const [activeMenu, setActiveMenu] = useState(viewTitles[view]);
  const [studentId, setStudentId] = useState("B211930019");
  const [display, setDisplay] = useState<"table" | "card">("table");

  useEffect(() => {
    setActiveMenu(viewTitles[view]);
  }, [view]);

  useEffect(() => {
    const savedStudentId = localStorage.getItem("parentStudentId");
    if (savedStudentId) setStudentId(savedStudentId);
  }, []);

  const student = students.find((item) => item.id === studentId);
  const avgScore = useMemo(() => Math.round(courses.reduce((sum, item) => sum + item.score, 0) / courses.length), []);
  const avgAttendance = useMemo(() => Math.round(courses.reduce((sum, item) => sum + item.attendance, 0) / courses.length), []);
  const totalCredits = useMemo(() => courses.reduce((sum, item) => sum + item.credits, 0), []);
  const dueAmount = payments.reduce((sum, item) => sum + Math.max(item.amount - item.paid, 0), 0);
  const overallGrade = gradeLabel(avgScore);

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <div className="flex">
        <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
        <main
          className="flex-1 overflow-y-auto bg-no-repeat px-4 py-5 md:px-6 md:py-6"
          style={{
            backgroundImage: "linear-gradient(rgba(8,14,30,0.9),rgba(8,12,24,0.95)),url('/indra-bg.jpg')",
            backgroundPosition: "center center",
            backgroundSize: "72%",
          }}
        >
          <div className={`mx-auto space-y-5 ${view === "overview" ? "max-w-7xl" : "max-w-5xl"}`}>
            {view !== "overview" && (
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Оюутан</p>
                <h1 className="mt-1 text-2xl font-semibold text-white">{viewTitles[view]}</h1>
                <p className="mt-1 text-sm text-white/50">Эцэг эхийн эрхээр {studentId} ID-тай оюутны мэдээллийг харж байна</p>
              </div>
              {(view === "grades" || view === "attendance") && (
                <div className="flex gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-1">
                  {(["table", "card"] as const).map((item) => (
                    <button
                      key={item}
                      onClick={() => setDisplay(item)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                        display === item
                          ? "bg-gradient-to-b from-violet-500 to-violet-700 text-white shadow-[0_4px_12px_rgba(124,58,237,0.35)]"
                          : "text-white/40 hover:text-white/70"
                      }`}
                    >
                      {item === "table" ? "Хүснэгт" : "Карт"}
                    </button>
                  ))}
                </div>
              )}
            </div>
            )}

            {!student ? (
              <Card className="border-red-400/20 bg-red-500/10 p-6">
                <h2 className="text-lg font-semibold text-red-200">Оюутан олдсонгүй</h2>
                <p className="mt-2 text-sm leading-6 text-white/55">{studentId} ID-тай оюутны мэдээлэл бүртгэлд алга байна.</p>
                <Link href="/login" className="mt-4 inline-flex rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-2 text-sm font-medium text-red-200">
                  Дахин нэвтрэх
                </Link>
              </Card>
            ) : (
              <>
                {view === "profile" && (
                  <StudentProfile student={student} avgScore={avgScore} avgAttendance={avgAttendance} totalCredits={totalCredits} />
                )}

                {view === "overview" && (
                  <ParentHome
                    student={student}
                    avgScore={avgScore}
                    avgAttendance={avgAttendance}
                    totalCredits={totalCredits}
                  />
                )}

                {(view === "grades" || view === "attendance") && (
                  <>
                    <StudentStrip student={student} overallGrade={overallGrade} avgScore={avgScore} />
                    {display === "table" ? <GradesTable mode={view} /> : <GradeCards mode={view} />}
                  </>
                )}

                {view === "payment" && <PaymentView dueAmount={dueAmount} />}
                {view === "schedule" && <ScheduleView />}
                {view === "exams" && <ExamView />}
                {view === "messages" && <SimpleList title="Багшийн мэдэгдэл" items={messages} />}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function ParentHome({
  student,
  avgScore,
  avgAttendance,
  totalCredits,
}: {
  student: (typeof students)[number];
  avgScore: number;
  avgAttendance: number;
  totalCredits: number;
}) {
  return (
    <>
      <ParentHero student={student} avgScore={avgScore} totalCredits={totalCredits} />
      <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
        <ParentInfoPanel student={student} avgAttendance={avgAttendance} />
        <div className="space-y-5">
          <ParentCourseGrid />
        </div>
      </div>
    </>
  );
}

function ParentHero({
  student,
  avgScore,
  totalCredits,
}: {
  student: (typeof students)[number];
  avgScore: number;
  totalCredits: number;
}) {
  return (
    <section>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_520px]">
        <Card className="p-5">
          <div className="grid gap-6 md:grid-cols-[216px_minmax(0,1fr)] md:items-center">
            <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full border border-white/15 bg-white/5 p-3 md:h-52 md:w-52">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-indigo-800 to-violet-800 text-5xl font-semibold text-white">
                {student.avatar}
              </div>
            </div>

            <div className="grid gap-4">
              <InfoField label="Овог нэр" value={student.fullName} />
              <InfoField label="ID" value={student.id} />
              <InfoField label="Мэргэжил" value={student.major} />
            </div>
          </div>
        </Card>

        <div className="grid gap-6 sm:grid-cols-[190px_minmax(0,1fr)]">
        <Card className="grid gap-4 p-5">
          <div className="mx-auto flex h-36 w-36 flex-col items-center justify-center rounded-full border border-white/15 bg-white/5 text-center">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">Голч</p>
            <p className="mt-2 text-3xl font-semibold text-white">{(avgScore / 25).toFixed(1)}</p>
          </div>

          <div className="mx-auto w-full max-w-[140px] rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-center">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">Кредит</p>
            <p className="mt-0.5 text-base font-medium text-white">{totalCredits}</p>
          </div>
        </Card>
        <ParentCalendarCard />
        </div>
      </div>
    </section>
  );
}

function ParentStatsPanel({ student, avgAttendance }: { student: (typeof students)[number]; avgAttendance: number }) {
  return (
    <section className="grid gap-5">
      <Card className="p-5">
        <p className="text-sm font-medium text-white/80">Оюутны мэдээлэл</p>
        <div className="mt-5 space-y-4">
          {[
            ["Эцэг/эхийн нэр", student.parentName],
            ["Өөрийн нэр", student.name],
            ["ID", student.id],
            ["Хөтөлбөр", student.className],
            ["E-mail", student.email],
            ["Утас", student.phone],
            ["Дундаж ирц", `${avgAttendance}%`],
          ].map(([label, value]) => (
            <div key={label} className="border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">{label}</p>
              <p className="mt-1 text-sm text-white/85">{value}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-white/80">Хуанли</p>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-white/55">
            May
          </span>
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="grid grid-cols-7 gap-2 text-center text-[10px] uppercase tracking-[0.2em] text-white/35">
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
            <span>Su</span>
          </div>
          <div className="mt-3 grid grid-cols-7 gap-2 text-center text-xs text-white/75">
            {["11", "12", "13", "14", "15", "16", "17"].map((day) => (
              <span key={day} className={`rounded-lg py-2 ${day === "12" ? "bg-cyan-300/15 font-medium text-cyan-100" : ""}`}>
                {day}
              </span>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-dashed border-cyan-200/20 bg-cyan-300/5 px-3 py-3 text-sm text-white/60">
            12-нд Python шалгалт, 14-нд JavaScript шалгалт.
          </div>
        </div>
      </Card>
    </section>
  );
}

function ParentInfoPanel({ student, avgAttendance }: { student: (typeof students)[number]; avgAttendance: number }) {
  return (
    <section className="grid gap-5">
      <Card className="p-5">
        <p className="text-sm font-medium text-white/80">Оюутны мэдээлэл</p>
        <div className="mt-5 space-y-4">
          {[
            ["Эцэг/эхийн нэр", student.parentName],
            ["Өөрийн нэр", student.name],
            ["ID", student.id],
            ["Хөтөлбөр", student.className],
            ["E-mail", student.email],
            ["Утас", student.phone],
            ["Дундаж ирц", `${avgAttendance}%`],
          ].map(([label, value]) => (
            <div key={label} className="border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">{label}</p>
              <p className="mt-1 text-sm text-white/85">{value}</p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

function ParentCalendarCard() {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-white/80">Хуанли</p>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-white/55">
          May
        </span>
      </div>
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div className="grid grid-cols-7 gap-2 text-center text-[10px] uppercase tracking-[0.2em] text-white/35">
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
          <span>Su</span>
        </div>
        <div className="mt-3 grid grid-cols-7 gap-2 text-center text-xs text-white/75">
          {["11", "12", "13", "14", "15", "16", "17"].map((day) => (
            <span key={day} className={`rounded-lg py-2 ${day === "12" ? "bg-cyan-300/15 font-medium text-cyan-100" : ""}`}>
              {day}
            </span>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-dashed border-cyan-200/20 bg-cyan-300/5 px-3 py-3 text-sm text-white/60">
          12-нд Python шалгалт, 14-нд JavaScript шалгалт.
        </div>
      </div>
    </Card>
  );
}

function ParentPdfSection({ student }: { student: (typeof students)[number] }) {
  const pdfItems = [
    {
      title: "Todorkhoilolt-01.pdf",
      meta: "245 KB",
      description: `${student.id} оюутны сургуулийн тодорхойлолт.`,
    },
    {
      title: "Dungiin-lavlagaa.pdf",
      meta: "318 KB",
      description: "Суралцаж буй төлөв байдал, дүнгийн лавлагаа.",
    },
  ];

  return (
    <Card className="p-5">
      <div className="mb-4">
        <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">Тодорхойлолт</h2>
        <p className="mt-1 text-xs text-white/45">Сургуулийн тодорхойлолт баримт бичгүүд</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {pdfItems.map((item) => (
          <div key={item.title} className="group rounded-[20px] border border-white/10 bg-white/[0.03] p-4 transition-all hover:scale-[1.02] hover:border-white/20 active:scale-[0.99]">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/10 text-sm font-semibold text-red-200">
                PDF
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{item.title}</p>
                <p className="mt-1 text-xs text-white/35">{item.meta}</p>
                <p className="mt-3 text-xs leading-relaxed text-white/50">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ParentCourseGrid() {
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">Хичээлүүд</h2>
          <p className="mt-1 text-xs text-white/45">Оюутны үзэж буй сургалтын хөтөлбөрүүд</p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/55">{courses.length}</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <div key={course.code} className={`rounded-[20px] border p-4 ${course.card}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className={`text-sm font-semibold ${course.text}`}>{course.subject}</p>
                <p className="mt-1 text-xs text-white/50">{course.code} · {course.teacher}</p>
              </div>
              <span className={`rounded-lg border px-2 py-0.5 text-[11px] font-bold ${gradeLabel(course.score).tw}`}>
                {gradeLabel(course.score).label}
              </span>
            </div>
            <div className="mt-4 space-y-3">
              <ProgressLine label="Явц" value={course.progress} color="from-violet-400 to-fuchsia-400" />
              <ProgressLine label="Ирц" value={course.attendance} color={attendanceBar(course.attendance)} />
            </div>
            <div className="mt-4 flex justify-between border-t border-white/10 pt-3 text-[11px]">
              <span className="text-white/35">{course.room}</span>
              <span className={`font-medium ${course.text}`}>{course.credits} кредит</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-[11px] uppercase tracking-[0.28em] text-white/45">{label}</p>
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90">{value}</div>
    </div>
  );
}

function ProgressLine({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-[11px]">
        <span className="text-white/40">{label}</span>
        <span className="font-semibold text-white/70">{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function StudentProfile({
  student,
  avgScore,
  avgAttendance,
  totalCredits,
}: {
  student: (typeof students)[number];
  avgScore: number;
  avgAttendance: number;
  totalCredits: number;
}) {
  return (
    <>
      <Card className="p-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-800 to-violet-800 text-3xl font-bold text-white">
            {student.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">{student.fullName}</h2>
                <p className="mt-1 text-sm text-white/60">{student.major} · {student.className}</p>
                <div className="mt-2 flex flex-wrap gap-3">
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">{student.scholarship}</span>
                  <span className="rounded-full border border-blue-400/30 bg-blue-500/15 px-3 py-1 text-xs font-medium text-blue-300">{student.semester}</span>
                  <span className="rounded-full border border-amber-400/30 bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-300">{student.dormitory}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm text-white/40">{student.id}</p>
                <p className="mt-1 text-xs text-white/30">Оюутны ID</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Үзэж буй хичээл", value: courses.length, color: "text-violet-300" },
                { label: "Нийт кредит", value: totalCredits, color: "text-emerald-300" },
                { label: "Дундаж дүн", value: `${avgScore}%`, color: "text-amber-300" },
                { label: "Дундаж ирц", value: `${avgAttendance}%`, color: "text-cyan-300" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-white/10 bg-[#0a1428] p-3 text-center">
                  <p className="text-[10px] text-white/30">{item.label}</p>
                  <p className={`mt-1 text-lg font-bold ${item.color}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-4">
            <p className="text-sm font-semibold text-white/80">Хувийн мэдээлэл</p>
            <p className="mt-1 text-xs text-white/40">Оюутны хувийн мэдээлэл</p>
          </div>
          <div className="space-y-3">
            {[
              ["Төрсөн огноо", student.birthDate],
              ["Хүйс", student.gender],
              ["И-мэйл", student.email],
              ["Утас", student.phone],
              ["Гэрийн хаяг", student.address],
              ["Мэргэжил", student.major],
              ["Зөвлөх багш", student.advisor],
              ["Эцэг/эхийн утас", student.parentPhone],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <p className="text-xs text-white/40">{label}</p>
                <p className="mt-1 text-sm font-medium text-white/85">{value}</p>
              </div>
            ))}
          </div>
        </Card>
        <CourseList />
      </div>
    </>
  );
}

function StudentStrip({ student, overallGrade, avgScore }: { student: (typeof students)[number]; overallGrade: ReturnType<typeof gradeLabel>; avgScore: number }) {
  return (
    <Card className="flex flex-wrap items-center gap-4 p-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-700 text-base font-bold text-white">
        {student.avatar}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white">{student.name}</p>
        <p className="mt-0.5 text-[11px] text-white/40">{student.id} · {student.className}</p>
      </div>
      <div className={`flex flex-col items-center rounded-2xl border px-5 py-2 ${overallGrade.tw}`}>
        <p className="text-2xl font-bold">{overallGrade.label}</p>
        <p className="text-[10px] opacity-70">{avgScore}% дундаж</p>
      </div>
    </Card>
  );
}

function CourseList({ compact = false }: { compact?: boolean }) {
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-white/80">Одоо үзэж буй хичээлүүд</p>
          <p className="mt-1 text-xs text-white/40">Энэ улирлын үзэж буй хичээлүүд</p>
        </div>
        <span className="text-xs text-white/30">{courses.length} хичээл</span>
      </div>
      <div className={compact ? "space-y-3" : "grid gap-3 sm:grid-cols-2"}>
        {courses.slice(0, compact ? 4 : courses.length).map((course) => (
          <div key={course.code} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white/90">{course.subject}</p>
                <p className="mt-1 text-xs text-white/50">{course.code} · {course.teacher}</p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                  <Info label="Цаг" value={course.time} />
                  <Info label="Өрөө" value={course.room} />
                  <Info label="Явц" value={`${course.progress}%`} className={course.text} />
                  <Info label="Ирц" value={`${course.attendance}%`} className={attendanceColor(course.attendance)} />
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className={`text-lg font-bold ${course.text}`}>{gradeLabel(course.score).label}</p>
                <p className="text-[10px] text-white/30">{course.credits} кредит</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function GradesTable({ mode }: { mode: "grades" | "attendance" }) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[780px] border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              {(mode === "grades"
                ? ["#", "Хичээл", "Сорил 1", "Сорил 2", "Ирц", "Бие даалт", "Явц", "Шалгалт", "Үнэлгээ"]
                : ["#", "Хичээл", "Нийт", "Ирсэн", "Тасалсан", "Ирц %", "Явц"]
              ).map((head) => (
                <th key={head} className="px-4 py-3 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-white/35 first:text-left">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => {
              const absent = course.total - course.done;
              const grade = gradeLabel(course.score);
              return (
                <tr key={course.code} className={`border-b border-white/[0.05] transition-colors last:border-b-0 hover:bg-white/[0.02] ${index % 2 === 1 ? "bg-white/[0.01]" : ""}`}>
                  <td className="px-4 py-3 text-[11px] text-white/25">{index + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 shrink-0 rounded-full ${course.dot}`} />
                      <span className="text-sm font-medium text-white/85">{course.subject}</span>
                    </div>
                  </td>
                  {mode === "grades" ? (
                    <>
                      <td className="px-4 py-3 text-center text-sm text-white/60">{course.quiz1}</td>
                      <td className="px-4 py-3 text-center text-sm text-white/60">{course.quiz2}</td>
                      <td className={`px-4 py-3 text-center text-sm font-semibold ${attendanceColor(course.attendance)}`}>{course.attendance}%</td>
                      <td className="px-4 py-3 text-center text-sm text-white/60">{course.assignment}</td>
                      <td className="px-4 py-3 text-center text-sm text-white/60">{course.progress}</td>
                      <td className={`px-4 py-3 text-center text-sm font-semibold ${course.text}`}>{course.exam}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`rounded-lg border px-2.5 py-0.5 text-[11px] font-bold ${grade.tw}`}>{grade.label}</span>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3 text-center text-sm text-white/50">{course.total}</td>
                      <td className="px-4 py-3 text-center text-sm text-emerald-300">{course.done}</td>
                      <td className="px-4 py-3 text-center text-sm text-red-300">{absent}</td>
                      <td className={`px-4 py-3 text-center text-base font-bold ${attendanceColor(course.attendance)}`}>{course.attendance}%</td>
                      <td className="px-4 py-3">
                        <div className="mx-auto h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
                          <div className={`h-full rounded-full bg-gradient-to-r ${attendanceBar(course.attendance)}`} style={{ width: `${course.attendance}%` }} />
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function GradeCards({ mode }: { mode: "grades" | "attendance" }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => {
        const absent = course.total - course.done;
        const grade = gradeLabel(course.score);
        return (
          <div key={course.code} className={`rounded-[22px] border p-5 ${course.card}`}>
            <div className="mb-4 flex items-start justify-between gap-2">
              <p className={`text-sm font-semibold ${course.text}`}>{course.subject}</p>
              {mode === "grades" && <span className={`shrink-0 rounded-lg border px-2 py-0.5 text-[11px] font-bold ${grade.tw}`}>{grade.label}</span>}
            </div>
            <div className="mb-4">
              <div className="mb-1.5 flex justify-between text-[11px]">
                <span className="text-white/40">{mode === "grades" ? "Дүн" : "Ирц"}</span>
                <span className={`font-bold ${mode === "grades" ? course.text : attendanceColor(course.attendance)}`}>{mode === "grades" ? course.score : course.attendance}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${mode === "grades" ? "from-violet-400 to-fuchsia-400" : attendanceBar(course.attendance)}`}
                  style={{ width: `${mode === "grades" ? course.score : course.attendance}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(mode === "grades"
                ? [
                    ["Сорил 1", course.quiz1],
                    ["Сорил 2", course.quiz2],
                    ["Ирц", `${course.attendance}%`],
                    ["Бие даалт", course.assignment],
                    ["Явц", course.progress],
                    ["Шалгалт", course.exam],
                  ]
                : [
                    ["Нийт", course.total],
                    ["Ирсэн", course.done],
                    ["Тасалсан", absent],
                  ]
              ).map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] py-2 text-center">
                  <p className="text-[10px] text-white/30">{label}</p>
                  <p className={`text-sm font-semibold ${course.text}`}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PaymentView({ dueAmount }: { dueAmount: number }) {
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Үлдэгдэл төлбөр</p>
            <p className="mt-2 text-3xl font-semibold text-amber-300">{dueAmount.toLocaleString()}₮</p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="2" y="6" width="18" height="13" rx="2" stroke="#fbbf24" strokeWidth="1.5" />
              <path d="M2 10h18" stroke="#fbbf24" strokeWidth="1.5" />
              <circle cx="6" cy="14" r="1" fill="#fbbf24" />
            </svg>
          </div>
        </div>
      </Card>
      <Card className="overflow-hidden">
        <div className="border-b border-white/10 px-5 py-4">
          <p className="text-sm font-medium text-white/80">Төлбөрийн түүх</p>
        </div>
        {payments.map((payment, index) => (
          <div key={payment.term} className={`flex items-center justify-between px-5 py-4 text-sm transition-colors hover:bg-white/[0.02] ${index !== payments.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
            <div>
              <p className="font-medium text-white/85">{payment.term}</p>
              <p className="mt-0.5 text-xs text-white/35">{payment.date}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-white/80">{payment.amount.toLocaleString()}₮</p>
              <span className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium ${payment.status === "Төлсөн" ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300" : "border-amber-400/20 bg-amber-400/10 text-amber-300"}`}>
                {payment.status}
              </span>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function ScheduleView() {
  return <TableView title="Хичээлийн хуваарь" heads={["Гараг/цаг", "Хичээл", "Багш", "Өрөө"]} rows={courses.map((item) => [item.time, item.subject, item.teacher, item.room])} />;
}

function ExamView() {
  return <TableView title="Шалгалтын хуваарь" heads={["Хичээл", "Огноо", "Цаг", "Өрөө", "Төрөл"]} rows={exams.map((item) => [item.subject, item.date, item.time, item.room, item.type])} />;
}

function TableView({ title, heads, rows }: { title: string; heads: string[]; rows: string[][] }) {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-white/10 px-5 py-4">
        <p className="text-sm font-semibold text-white/85">{title}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              {heads.map((head) => (
                <th key={head} className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.join("-")} className="border-b border-white/[0.05] last:border-b-0 hover:bg-white/[0.02]">
                {row.map((cell) => (
                  <td key={cell} className="px-4 py-3 text-sm text-white/70">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function SimpleList({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="p-5">
      <p className="mb-4 text-sm font-semibold text-white/80">{title}</p>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={item} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${index === 0 ? "bg-violet-400" : "bg-emerald-400"}`} />
              <p className="text-xs text-white/35">Мэдэгдэл</p>
            </div>
            <p className="text-sm leading-6 text-white/65">{item}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Info({ label, value, className = "text-white/70" }: { label: string; value: string | number; className?: string }) {
  return (
    <div className="min-w-0">
      <span className="text-white/40">{label}: </span>
      <span className={`break-words font-medium ${className}`}>{value}</span>
    </div>
  );
}
