"use client";

import { useMemo, useState } from "react";
import CourseSidebar from "@/components/CourseSidebar";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import VideoPlayer from "@/components/VideoPlayer";
import { courses, type Course, type Lesson } from "@/lib/course-data";

interface CourseExperienceProps {
  course: Course;
}

type CourseTab = "home" | "assignment" | "extra";

const tabs: { key: CourseTab; label: string }[] = [
  { key: "home", label: "Нүүр" },
  { key: "assignment", label: "Бие даалт" },
  { key: "extra", label: "Нэмэлт даалгавар" },
];

const lessonTypes: Lesson["type"][] = ["video", "text", "quiz", "assignment"];

const teacherDetails: Record<string, { room: string; email: string; phone: string; photo: string; consultation: string }> = {
  "python-basics": {
    room: "304 тоот",
    email: "batjargal@indra.edu.mn",
    phone: "+976 9911 2304",
    photo: "/profile-photo.jpg",
    consultation: "Мягмар, Пүрэв 14:00-16:00",
  },
  javascript: {
    room: "212 тоот",
    email: "enkhtuya@indra.edu.mn",
    phone: "+976 8812 0212",
    photo: "/profile-photo.jpg",
    consultation: "Даваа, Лхагва 13:00-15:00",
  },
  networking: {
    room: "308 тоот",
    email: "bold@indra.edu.mn",
    phone: "+976 9908 0308",
    photo: "/profile-photo.jpg",
    consultation: "Баасан 10:00-12:00",
  },
  database: {
    room: "305 тоот",
    email: "munkhbat@indra.edu.mn",
    phone: "+976 8830 0305",
    photo: "/profile-photo.jpg",
    consultation: "Лхагва 15:00-17:00",
  },
};

const weekDays = [
  { label: "Дав", match: "Даваа" },
  { label: "Мяг", match: "Мягмар" },
  { label: "Лха", match: "Лхагва" },
  { label: "Пүр", match: "Пүрэв" },
  { label: "Баа", match: "Баасан" },
];

function buildLessons(course: Course): Lesson[] {
  if (course.lessonList?.length) {
    return course.lessonList;
  }

  return Array.from({ length: course.lessons || course.totalLessons || 6 }, (_, index) => ({
    id: `lesson-${index + 1}`,
    title: `${course.title} - Видео хичээл ${index + 1}`,
    duration: index % 4 === 2 ? "20 мин" : "45 мин",
    type: lessonTypes[index % lessonTypes.length],
    completed: index < (course.completedLessons ?? 2),
  }));
}

export default function CourseExperience({ course }: CourseExperienceProps) {
  const [activeMenu, setActiveMenu] = useState("Цахим сургалт");
  const [activeTab, setActiveTab] = useState<CourseTab>("home");
  const [selectedCourseId, setSelectedCourseId] = useState(course.id);

  const selectedCourse = courses.find((item) => item.id === selectedCourseId) ?? course;
  const lessons = useMemo(() => buildLessons(selectedCourse), [selectedCourse]);
  const [activeLesson, setActiveLesson] = useState<Lesson>(() => buildLessons(course)[0]);

  const currentLesson = lessons.find((lesson) => lesson.id === activeLesson.id) ?? lessons[0];
  const completedCount = lessons.filter((lesson) => lesson.completed).length;
  const progress = selectedCourse.progress ?? Math.round((completedCount / lessons.length) * 100);
  const teacher = teacherDetails[selectedCourse.id] ?? {
    room: "Сургалтын алба",
    email: "online@indra.edu.mn",
    phone: "+976 7000 0000",
    photo: "/profile-photo.jpg",
    consultation: "Цаг тохирч уулзана",
  };

  const handleCourseChange = (courseId: string) => {
    const nextCourse = courses.find((item) => item.id === courseId) ?? selectedCourse;
    const nextLessons = buildLessons(nextCourse);
    setSelectedCourseId(courseId);
    setActiveLesson(nextLessons[0]);
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
            backgroundSize: "72%",
          }}
        >
          <div className="mx-auto max-w-6xl space-y-5">
            <section className="overflow-hidden rounded-[24px] border border-white/10 bg-[#081120]/75 backdrop-blur-md">
              <div className="border-b border-white/10 px-5 pt-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Оюутан</p>
                    <h1 className="mt-1 text-2xl font-semibold text-white">Цахим сургалт</h1>
                  </div>

                  <div className="w-full md:w-64">
                    <label className="sr-only" htmlFor="course-select">
                      Хичээл сонгох
                    </label>
                    <select
                      id="course-select"
                      value={selectedCourse.id}
                      onChange={(event) => handleCourseChange(event.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#081120] px-3 py-2 text-xs text-white outline-none transition-colors hover:border-white/20 focus:border-violet-300/50"
                    >
                      {courses.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`border-b-2 px-5 py-3 text-sm font-medium transition-colors ${
                        activeTab === tab.key
                          ? "border-violet-300 text-white"
                          : "border-transparent text-white/45 hover:text-white/75"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5">
                {activeTab === "home" && (
                  <div className="grid gap-5 lg:grid-cols-1 xl:grid-cols-2">
                    <div className="space-y-5">
                      <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
                        <p className="text-[11px] uppercase tracking-[0.26em] text-white/35">Багшийн мэдээлэл</p>
                        <div className="mt-4 flex items-center gap-4">
                          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                            <img
                              src={teacher.photo}
                              alt={`${selectedCourse.instructor} зураг`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-white/40">Овог нэр</p>
                            <h2 className="mt-1 truncate text-xl font-semibold text-white">{selectedCourse.instructor}</h2>
                          </div>
                        </div>

                        <div className="mt-5 space-y-4">
                          {[
                            { label: "Орж буй хичээл", value: selectedCourse.title },
                            { label: "Имэйл", value: teacher.email },
                            { label: "Утасны дугаар", value: teacher.phone },
                          ].map((item) => (
                            <div key={item.label} className="border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                              <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">{item.label}</p>
                              <p className="mt-1 text-sm text-white/80">{item.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
                        <div className="mb-3 flex items-center justify-between">
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.24em] text-white/35">Зөвлөгөө өгөх цаг</p>
                            <h3 className="mt-1 text-sm font-semibold text-white">{selectedCourse.instructor}</h3>
                          </div>
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/45">
                            {teacher.room}
                          </span>
                        </div>

                        <div className="grid grid-cols-5 overflow-hidden rounded-xl border border-white/10">
                          {weekDays.map((day) => {
                            const isConsultDay = teacher.consultation.includes(day.match);
                            const time = teacher.consultation.match(/\d{1,2}:\d{2}-\d{1,2}:\d{2}/)?.[0];

                            return (
                              <div
                                key={day.label}
                                className={`min-h-20 border-r border-white/10 px-2 py-3 text-center last:border-r-0 ${
                                  isConsultDay ? "bg-violet-400/10 text-violet-100" : "bg-white/[0.02] text-white/35"
                                }`}
                              >
                                <p className="text-xs font-medium">{day.label}</p>
                                <p className="mt-2 text-[10px] leading-4">
                                  {isConsultDay ? time : "-"}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-white/35">Үзэж буй хичээл</p>
                      <h2 className="mt-2 text-xl font-semibold text-white">{selectedCourse.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-white/50">{selectedCourse.description}</p>
                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="mt-2 text-sm text-white/45">
                        {completedCount}/{lessons.length} видео үзсэн · {progress}%
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "assignment" && (
                  <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
                    <section className="min-w-0 space-y-5">
                      <VideoPlayer
                        lesson={currentLesson}
                        course={{
                          title: selectedCourse.title,
                          accent: "from-violet-400 to-cyan-300",
                        }}
                      />

                      <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
                        <p className="text-[11px] uppercase tracking-[0.26em] text-white/35">Видео хичээл</p>
                        <h2 className="mt-2 text-2xl font-semibold text-white">{currentLesson.title}</h2>
                        <p className="mt-3 text-sm leading-6 text-white/55">
                          Энэ хэсэгт сонгосон хичээлийн бие даалтын видео хичээлүүд байрлана.
                        </p>
                      </div>
                    </section>

                    <CourseSidebar
                      lessons={lessons}
                      activeLesson={currentLesson}
                      progress={progress}
                      completedCount={completedCount}
                      onSelectLesson={setActiveLesson}
                    />
                  </div>
                )}

                {activeTab === "extra" && (
                  <ExtraAssignments course={selectedCourse} lessons={lessons} />
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function ExtraAssignments({ course, lessons }: { course: Course; lessons: Lesson[] }) {
  const rows = [
    {
      type: "Гэрийн даалгавар",
      title: `${course.title} - Дасгал ажил 1`,
      due: "7 хоног",
      status: "Илгээх",
    },
    {
      type: "Нэмэлт даалгавар",
      title: `${course.title} - Судалгааны ажил`,
      due: "10 хоног",
      status: "Нээх",
    },
    {
      type: "Бататгал",
      title: lessons[0]?.title ?? `${course.title} - Бататгал`,
      due: "3 хоног",
      status: "Word",
    },
    {
      type: "Нэмэлт материал",
      title: `${course.title} - Холбоос, эх сурвалж`,
      due: "Нээлттэй",
      status: "GitHub",
    },
  ];

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.26em] text-white/35">Нэмэлт даалгавар</p>
          <h2 className="mt-2 text-xl font-semibold text-white">{course.title}</h2>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">
          {rows.length} ажил
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full min-w-[720px] border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.04]">
              {["Төрөл", "Даалгавар", "Хугацаа", "Үйлдэл"].map((head) => (
                <th key={head} className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.title} className="border-b border-white/[0.06] last:border-b-0">
                <td className="px-4 py-3 text-sm text-white/55">{row.type}</td>
                <td className="px-4 py-3 text-sm text-white/80">{row.title}</td>
                <td className="px-4 py-3 text-sm text-white/50">{row.due}</td>
                <td className="px-4 py-3">
                  <button className="rounded-lg border border-violet-300/25 bg-violet-400/10 px-3 py-1.5 text-xs font-medium text-violet-100">
                    {row.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
