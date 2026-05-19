"use client";

import { useState } from "react";
import type { Lesson } from "@/lib/course-data";

interface VideoPlayerProps {
  lesson: Lesson;
  course: {
    title: string;
    accent: string;
  };
}

export default function VideoPlayer({ lesson, course }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-4 backdrop-blur-md">
      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-black"
        style={{ aspectRatio: "16 / 9", maxHeight: "430px" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.22),transparent_34%),radial-gradient(circle_at_right,rgba(34,211,238,0.14),transparent_30%),linear-gradient(135deg,#071124_15%,#081120_100%)]" />

        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="z-10 text-center">
            <button
              onClick={() => setPlaying((value) => !value)}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-all hover:scale-105 hover:bg-white/20 active:scale-95"
            >
              {playing ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                  <rect x="4" y="3" width="4" height="14" rx="1" />
                  <rect x="12" y="3" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                  <path d="M6 4L16 10L6 16V4Z" />
                </svg>
              )}
            </button>

            <p className="text-xs uppercase tracking-[0.28em] text-white/35">{course.title}</p>
            <h2 className="mt-2 text-xl font-semibold text-white">{lesson.title}</h2>
            <p className="mt-2 text-sm text-white/55">{lesson.duration}</p>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPlaying((value) => !value)}
              className="text-white transition-colors hover:text-violet-200"
            >
              {playing ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                  <rect x="3" y="2" width="4" height="14" rx="1" />
                  <rect x="11" y="2" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                  <path d="M5 3L15 9L5 15V3Z" />
                </svg>
              )}
            </button>

            <div
              className="relative h-1 flex-1 cursor-pointer rounded-full bg-white/20"
              onClick={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const pct = ((event.clientX - rect.left) / rect.width) * 100;
                setProgress(Math.max(0, Math.min(100, pct)));
              }}
            >
              <div
                className={`h-full rounded-full bg-gradient-to-r ${course.accent}`}
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="text-xs tabular-nums text-white/50">{lesson.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
