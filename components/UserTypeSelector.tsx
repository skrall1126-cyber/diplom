"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type UserType = "student" | "teacher" | "admin";

const userTypes = [
  {
    id: "student" as UserType,
    title: "Оюутан",
    description: "Хичээл үзэх, дүн харах, төлбөр төлөх",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 20v-2a5 5 0 015-5h4a5 5 0 015 5v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    id: "teacher" as UserType,
    title: "Багш",
    description: "Хичээл заах, дүн бүртгэх, ирц бүртгэх",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: "from-emerald-600 to-green-500",
  },
  {
    id: "admin" as UserType,
    title: "Админ",
    description: "Бүрэн эрхтэй хандах, системийн тохиргоо",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    gradient: "from-violet-600 to-purple-500",
  },
];

export default function UserTypeSelector() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<UserType | null>(null);
  const [showAdminSubtypes, setShowAdminSubtypes] = useState(false);
  const [selectedAdminSubtype, setSelectedAdminSubtype] = useState<string | null>(null);

  // Админы дэд төрлүүд
  const adminSubtypes = [
    {
      id: "full-admin",
      title: "Бүрэн эрхт админ",
      description: "Бүх системд бүрэн эрхтэй хандах",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      gradient: "from-violet-600 to-purple-500",
    },
    {
      id: "training-admin",
      title: "Сургалтын алба",
      description: "Хичээлийн төлөвлөгөө, оюутны ирц, дүнгийн мэдээлэл хянах",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 22V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      gradient: "from-amber-600 to-yellow-500",
    },
    {
      id: "finance-admin",
      title: "Санхүүгийн алба",
      description: "Төлбөрийн мэдээлэл, санхүүгийн тайлан, хяналтын мэдээлэл боловсруулах",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 8V6a2 2 0 012-2h6a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="14" r="2" fill="currentColor" />
        </svg>
      ),
      gradient: "from-rose-600 to-pink-500",
    },
  ];

  const handleSelect = (type: UserType) => {
    setSelectedType(type);
    
    if (type === "admin") {
      // Админ сонгох үед дэд төрөл сонгох modal нээх
      setShowAdminSubtypes(true);
      return;
    }
    
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem("userType", type);
    }
    
    // Navigate based on user type
    setTimeout(() => {
      switch (type) {
        case "student":
          router.push("/home");
          break;
        case "teacher":
          router.push("/teacher/home");
          break;
        default:
          router.push("/home");
      }
    }, 300);
  };

  const handleAdminSubtypeSelect = (subtypeId: string) => {
    setSelectedAdminSubtype(subtypeId);
    
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem("userType", "admin");
      localStorage.setItem("adminSubtype", subtypeId);
    }
    
    // Navigate based on admin subtype
    setTimeout(() => {
      switch (subtypeId) {
        case "full-admin":
          router.push("/admin/dashboard");
          break;
        case "training-admin":
          router.push("/admin/training-plan");
          break;
        case "finance-admin":
          router.push("/admin/financial-report");
          break;
        default:
          router.push("/admin/dashboard");
      }
      setShowAdminSubtypes(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0118] to-[#1a0b2e] p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-block rounded-2xl bg-white/5 p-4">
            <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-white">IC</span>
            </div>
          </div>
          <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl">Indra Cyber Home</h1>
          <p className="text-lg text-white/70">Таны хэрэглэгчийн төрлийг сонгоно уу</p>
        </div>

        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {userTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleSelect(type.id)}
              className={`group relative overflow-hidden rounded-2xl border-2 p-6 text-left transition-all duration-300 ${
                selectedType === type.id
                  ? "border-white/30 bg-white/10"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              <div className="mb-4 inline-flex rounded-xl p-3 bg-white/5 text-white/50 group-hover:text-white">
                {type.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{type.title}</h3>
              <p className="text-sm text-white/50">{type.description}</p>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10 ${
                  selectedType === type.id ? "opacity-20" : ""
                }`}
              />
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            disabled={!selectedType}
            className={`relative overflow-hidden rounded-2xl px-8 py-4 text-lg font-medium transition-all ${
              selectedType
                ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white hover:from-violet-700 hover:to-purple-800"
                : "bg-white/5 text-white/30"
            }`}
            onClick={() => selectedType && handleSelect(selectedType)}
          >
            Үргэлжлүүлэх
          </button>
          <p className="mt-4 text-sm text-white/50">
            {selectedType
              ? `${userTypes.find(t => t.id === selectedType)?.title} хэрэглэгчээр нэвтрэх болно`
              : "Үргэлжлүүлэхийн тулд хэрэглэгчийн төрлөө сонгоно уу"}
          </p>
        </div>

        {/* Админы дэд төрөл сонгох modal */}
        {showAdminSubtypes && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="relative w-full max-w-2xl rounded-2xl border border-white/20 bg-gradient-to-br from-[#0a0118] to-[#1a0b2e] p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Админы дэд төрөл сонгох</h2>
                  <p className="mt-1 text-white/70">Админы аль хэсэгт нэвтрэхээ сонгоно уу</p>
                </div>
                <button
                  onClick={() => setShowAdminSubtypes(false)}
                  className="rounded-full border border-white/20 bg-white/5 p-2 text-white/70 hover:text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="mb-8 grid gap-4 sm:grid-cols-3">
                {adminSubtypes.map((subtype) => (
                  <button
                    key={subtype.id}
                    onClick={() => handleAdminSubtypeSelect(subtype.id)}
                    className={`group relative overflow-hidden rounded-2xl border-2 p-6 text-left transition-all duration-300 ${
                      selectedAdminSubtype === subtype.id
                        ? "border-white/30 bg-white/10"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <div className="mb-4 inline-flex rounded-xl p-3 bg-white/5 text-white/50 group-hover:text-white">
                      {subtype.icon}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white">{subtype.title}</h3>
                    <p className="text-sm text-white/50">{subtype.description}</p>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${subtype.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10 ${
                        selectedAdminSubtype === subtype.id ? "opacity-20" : ""
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowAdminSubtypes(false)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-white/70 hover:text-white"
                >
                  Буцах
                </button>
                <button
                  disabled={!selectedAdminSubtype}
                  onClick={() => selectedAdminSubtype && handleAdminSubtypeSelect(selectedAdminSubtype)}
                  className={`rounded-2xl px-6 py-3 font-medium ${
                    selectedAdminSubtype
                      ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white hover:from-violet-700 hover:to-purple-800"
                      : "bg-white/5 text-white/30"
                  }`}
                >
                  Үргэлжлүүлэх
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">Хэрэглэгчийн төрлүүдийн тухай</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h4 className="mb-2 font-medium text-white">Оюутан</h4>
              <p className="text-sm text-white/70">
                Хичээл үзэх, даалгавар илгээх, дүн харах, төлбөр төлөх боломжтой
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-medium text-white">Багш</h4>
              <p className="text-sm text-white/70">
                Хичээл заах, дүн бүртгэх, ирц бүртгэх, даалгавар өгөх боломжтой
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-medium text-white">Админ</h4>
              <p className="text-sm text-white/70">
                Бүрэн эрхтэй хандах, системийн тохиргоо, гурван дэд төрөлтэй: бүрэн эрхт админ, сургалтын алба, санхүүгийн алба
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}