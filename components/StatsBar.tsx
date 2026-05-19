"use client";

const studentInfo = [
  { label: "Эцэг/эх-ийн нэр", value: "Уугантөр" },
  { label: "Өөрийн нэр", value: "Төртэмүүлэн" },
  { label: "Нас", value: "23" },
  { label: "ID", value: "B211930019" },
  { label: "Хөтөлбөр", value: "Software engineering" },
  { label: "E-mail", value: "skrall1126@gmail.com" },
  { label: "Утас", value: "+976 86072211" },
];

export default function StatsBar() {
  return (
    <section className="grid gap-5">
      <div className="h-fit rounded-[24px] border border-white/10 bg-[#081120]/70 p-5 backdrop-blur-md">
        <p className="text-sm font-medium text-white/80">Оюутны мэдээлэл</p>
        <div className="mt-5 space-y-4">
          {studentInfo.map((item) => (
            <div key={item.label} className="border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">{item.label}</p>
              <p className="mt-1 text-sm text-white/85">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
