"use client";

import Link from "next/link";
import { courses } from "@/lib/course-data";
import { useMemo } from "react";

const COURSE_THEMES = [
  {
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/20",
    accent: "text-blue-300",
  },
  {
    color: "from-yellow-500/20 to-yellow-600/10",
    border: "border-yellow-500/20",
    accent: "text-yellow-300",
  },
  {
    color: "from-green-500/20 to-green-600/10",
    border: "border-green-500/20",
    accent: "text-green-300",
  },
  {
    color: "from-orange-500/20 to-orange-600/10",
    border: "border-orange-500/20",
    accent: "text-orange-300",
  },
  {
    color: "from-pink-500/20 to-pink-600/10",
    border: "border-pink-500/20",
    accent: "text-pink-300",
  },
  {
    color: "from-red-500/20 to-red-600/10",
    border: "border-red-500/20",
    accent: "text-red-300",
  },
  {
    color: "from-indigo-500/20 to-indigo-600/10",
    border: "border-indigo-500/20",
    accent: "text-indigo-300",
  },
  {
    color: "from-cyan-500/20 to-cyan-600/10",
    border: "border-cyan-500/20",
    accent: "text-cyan-300",
  },
  {
    color: "from-lime-500/20 to-lime-600/10",
    border: "border-lime-500/20",
    accent: "text-lime-300",
  },
];

interface CourseCardProps {
  course: typeof courses[0];
  theme: typeof COURSE_THEMES[0];
}

const CourseCard = ({ course, theme }: CourseCardProps) => {
  const progress = useMemo(
    () => Math.round(((course.completedLessons || 0) / (course.totalLessons || course.lessons || 1)) * 100),
    [course.completedLessons, course.totalLessons, course.lessons]
  );

  return (
    <Link
      href={`/course/${course.id}`}
      className={`group block rounded-[22px] border ${theme.border} bg-gradient-to-br ${theme.color} p-4 transition-all hover:scale-[1.02] hover:border-opacity-60 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-white/30`}
      aria-label={`${course.title} хичээл, ${progress}% дууссан`}
    >
      <div className="mb-0.5 flex items-start gap-3">
        <h3 className="min-w-0 flex-1 text-sm font-medium leading-snug text-white">
          {course.title}
        </h3>
        <span
          className={`shrink-0 rounded-full border ${theme.border} ${theme.accent} bg-white/5 px-2 py-0.5 text-[10px]`}
        >
          {course.level}
        </span>
      </div>
      <p className="text-xs text-white/40">{course.instructor}</p>

      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[10px] text-white/30">
            {course.totalLessons} хичээл
          </span>
          <span className={`text-[10px] font-medium ${theme.accent}`}>
            {progress}%
          </span>
        </div>
        <div
          className="h-1 overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${progress}%`,
              background: "rgba(255,255,255,0.78)",
            }}
          />
        </div>
      </div>
    </Link>
  );
};

export default function CourseGrid() {
  const memoizedCourses = useMemo(() => courses, []);

  return (
    <section className="grid gap-5" aria-label="Хичээлүүдийн сүлжээ">
      <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">
              Хичээлүүд
            </h2>
            <p className="mt-1 text-xs text-white/45">
              Оюутны үзэж буй сургалтын хөтөлбөрүүд
            </p>
          </div>
          <Link
            href="/course/python-basics"
            className="rounded px-2 py-1 text-xs text-violet-300 transition-colors hover:text-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            aria-label="Цахим сургалт руу шилжих"
          >
            Цахим сургалт {"->"}
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {memoizedCourses.map((course, index) => {
            const theme = COURSE_THEMES[index % COURSE_THEMES.length];
            return <CourseCard key={course.id} course={course} theme={theme} />;
          })}
        </div>
      </div>
    </section>
  );
}
