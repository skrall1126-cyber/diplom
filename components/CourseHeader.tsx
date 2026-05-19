"use client";

import Link from "next/link";

interface CourseHeaderProps {
  course: {
    id: string;
    title: string;
    totalLessons: number;
    totalStudents: number;
    short: string;
  };
  progress: number;
}

export default function CourseHeader({ course, progress }: CourseHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#0a0118]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-4 md:px-6">
        <Link
          href="/home"
          className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 3L5 8L10 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to home
        </Link>

        <div className="h-5 w-px bg-white/10" />

        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(168,85,247,0.28)]">
            {course.short}
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-white">{course.title}</p>
            <p className="text-xs uppercase tracking-[0.22em] text-white/35">
              {course.totalLessons} lessons • {course.totalStudents} learners
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 sm:flex">
          <div className="h-1.5 w-28 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-medium text-white/65">{progress}%</span>
        </div>
      </div>
    </header>
  );
}
