"use client";

function CalendarCard() {
  return (
    <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-white/80">Хуанли</p>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-white/55">
          April
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
          <span className="rounded-lg py-2 text-white/30">14</span>
          <span className="rounded-lg py-2 text-white/30">15</span>
          <span className="rounded-lg py-2 text-white/30">16</span>
          <span className="rounded-lg py-2 text-white/30">17</span>
          <span className="rounded-lg bg-cyan-300/15 py-2 font-medium text-cyan-100">18</span>
          <span className="rounded-lg py-2">19</span>
          <span className="rounded-lg py-2">20</span>
        </div>
        <div className="mt-4 rounded-xl border border-dashed border-cyan-200/20 bg-cyan-300/5 px-3 py-3 text-sm text-white/60">
          18-нд project review, 22-нд lab submission.
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_520px]">
        <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
          <div className="grid gap-6 md:grid-cols-[216px_minmax(0,1fr)] md:items-center">
            <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full border border-white/15 bg-white/5 p-3 md:h-52 md:w-52">
              <img
                src="/profile-photo.jpg"
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
                onError={(e) => {
                  const t = e.currentTarget as HTMLImageElement;
                  t.style.display = "none";
                  t.parentElement!.style.background =
                    "linear-gradient(135deg, rgba(217, 70, 239, 0.28), rgba(124, 58, 237, 0.16))";
                  t.parentElement!.innerHTML =
                    '<span style="font-size:28px;font-weight:600;letter-spacing:0.08em;color:white">IC</span>';
                }}
              />
            </div>

            <div className="grid gap-4">
              <div>
                <p className="mb-1 text-[11px] uppercase tracking-[0.28em] text-white/45">
                  Овог нэр
                </p>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90">
                  Төртэмүүлэн
                </div>
              </div>

              <div>
                <p className="mb-1 text-[11px] uppercase tracking-[0.28em] text-white/45">ID</p>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90">
                  B211930019
                </div>
              </div>

              <div>
                <p className="mb-1 text-[11px] uppercase tracking-[0.28em] text-white/45">
                  Мэргэжил
                </p>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                  Software engineering
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-[190px_minmax(0,1fr)]">
          <div className="grid gap-4 rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
            <div className="mx-auto flex h-36 w-36 flex-col items-center justify-center rounded-full border border-white/15 bg-white/5 text-center">
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">Голч</p>
              <p className="mt-2 text-3xl font-semibold text-white">3.8</p>
            </div>

            <div className="mx-auto w-full max-w-[140px] rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-center">
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">Кредит</p>
              <p className="mt-0.5 text-base font-medium text-white">85</p>
            </div>
          </div>

          <CalendarCard />
        </div>
      </div>
    </section>
  );
}
