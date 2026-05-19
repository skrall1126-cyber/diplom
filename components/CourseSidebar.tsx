"use client";

import type { Lesson } from "@/lib/course-data";

interface CourseSidebarProps {
  lessons: Lesson[];
  activeLesson: Lesson;
  progress: number;
  completedCount: number;
  onSelectLesson: (lesson: Lesson) => void;
}

export default function CourseSidebar({
  lessons,
  activeLesson,
  progress,
  completedCount,
  onSelectLesson,
}: CourseSidebarProps) {
  return (
    <aside className="rounded-[24px] border border-white/10 bg-[#081120]/70 backdrop-blur-md">
      <div className="border-b border-white/10 p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.28em] text-white/35">
            Хичээлийн явц
          </span>
          <span className="text-xs font-medium text-violet-300">{progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-xs leading-6 text-white/40">
          {completedCount} / {lessons.length} хичээл дууссан
        </p>
      </div>

      <div className="max-h-[620px] overflow-y-auto p-3">
        {lessons.map((lesson, index) => {
          const isActive = lesson.id === activeLesson.id;

          return (
            <button
              key={lesson.id}
              onClick={() => onSelectLesson(lesson)}
            className={`mb-2 flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-all ${
                isActive
                  ? "border-violet-400/25 bg-violet-500/10"
                  : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {lesson.completed ? (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-700">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5L4 7L8 3"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : (
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      isActive ? "border-violet-400" : "border-white/20"
                    }`}
                  >
                    <span className="text-[9px] text-white/40">{index + 1}</span>
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center justify-between gap-3">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-white/25">
                    Хичээл {index + 1}
                  </span>
                  {lesson.completed ? (
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] text-emerald-200">
                      Дууссан
                    </span>
                  ) : null}
                </div>
                <p className={`truncate text-sm ${isActive ? "font-medium text-white" : "text-white/65"}`}>
                  {lesson.title}
                </p>
                <p className="mt-0.5 text-xs text-white/30">{lesson.duration}</p>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
