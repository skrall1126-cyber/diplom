"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1 or 2
  const [formData, setFormData] = useState({
    // Step 1 - Хувийн мэдээлэл
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    password: "",
    confirmPassword: "",
    // Step 2 - Урьдчилгаа төлбөр
    paymentMethod: "qpay", // qpay, bank, card
    amount: "500000", // Default registration fee
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateStep1 = () => {
    if (!formData.lastName || !formData.firstName || !formData.email || !formData.phone || !formData.birthDate || !formData.gender || !formData.password || !formData.confirmPassword) {
      setError("Бүх талбарыг бөглөнө үү.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Имэйл хаяг буруу форматтай байна.");
      return false;
    }

    if (!/^\d{8}$/.test(formData.phone)) {
      setError("Утасны дугаар 8 оронтой тоо байх ёстой.");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Нууц үг хамгийн багадаа 6 тэмдэгттэй байх ёстой.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Нууц үг таарахгүй байна.");
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    setError("");
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (step === 1) {
      handleNextStep();
      return;
    }

    // Step 2 validation
    if (!formData.paymentMethod) {
      setError("Төлбөрийн хэлбэр сонгоно уу.");
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));

    setLoading(false);
    setSuccess(true);

    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  if (success) {
    return (
      <div className="relative isolate min-h-screen overflow-x-hidden bg-[#06030f] text-white font-sans">
        {/* Background */}
        <div className="fixed inset-0 z-0">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(rgba(8, 14, 30, 0.85), rgba(8, 12, 24, 0.9)), url('/indra-building.jpg')",
              backgroundPosition: "center center",
              backgroundSize: "cover",
            }}
          />
        </div>

        <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="rounded-3xl border border-white/10 bg-[#081120]/70 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-md">
              <div className="mb-6">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500/20 to-emerald-600/10 border border-green-500/30 mb-4">
                  <span className="text-4xl">✓</span>
                </div>
              </div>
              <h2 className="font-['Syne'] text-2xl font-extrabold mb-3">
                Амжилттай бүртгэгдлээ!
              </h2>
              <p className="text-sm text-white/50 mb-6">
                Таны хүсэлт хүлээн авлаа. Админ баталгаажуулсны дараа нэвтрэх боломжтой болно.
              </p>
              <div className="flex items-center justify-center gap-2 text-violet-400">
                <div className="h-4 w-4 border-2 border-violet-400/30 border-t-violet-400 rounded-full animate-spin" />
                <span className="text-sm">Нэвтрэх хуудас руу шилжиж байна...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[#06030f] text-white font-sans">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(8, 14, 30, 0.85), rgba(8, 12, 24, 0.9)), url('/indra-building.jpg')",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        />
      </div>

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between border-b border-white/[0.07] bg-[#0a0118]/90 px-4 backdrop-blur-md sm:px-8">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-800 flex items-center justify-center font-['Syne'] text-sm font-extrabold tracking-tighter">
            IC
          </div>
          <span className="font-['Syne'] text-lg font-extrabold tracking-tight">
            Indra Cyber
          </span>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/[0.06] text-white/70 text-sm font-semibold hover:text-white hover:bg-white/[0.1] transition-all duration-200"
        >
          Нүүр хуудас
          <span className="text-lg">←</span>
        </Link>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-24 sm:px-8">
        <div className="max-w-md w-full">
          {/* Register Form Card */}
          <div className="rounded-3xl border border-white/10 bg-[#081120]/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-md sm:p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 mb-4">
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-violet-600 to-indigo-800 flex items-center justify-center text-xs">
                  {step}/2
                </div>
                <span className="text-xs text-violet-400 font-semibold">
                  {step === 1 ? "Хувийн мэдээлэл" : "Урьдчилгаа төлбөр"}
                </span>
              </div>

              <h1 className="font-['Syne'] text-3xl font-extrabold leading-tight mb-2">
                Бүртгүүлэх
              </h1>
              <p className="text-sm text-white/50">
                {step === 1 ? "Хувийн мэдээллээ оруулна уу" : "Урьдчилгаа төлбөр төлөх"}
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className={`h-2 w-16 rounded-full transition-all ${step >= 1 ? "bg-violet-500" : "bg-white/10"}`} />
              <div className={`h-2 w-16 rounded-full transition-all ${step >= 2 ? "bg-violet-500" : "bg-white/10"}`} />
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* STEP 1: Хувийн мэдээлэл */}
              {step === 1 && (
                <>
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-white/40 font-medium mb-2">
                        Овог
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Овог"
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm outline-none transition-all duration-200 focus:border-violet-500/50 focus:bg-white/[0.06]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 font-medium mb-2">
                        Нэр
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Нэр"
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm outline-none transition-all duration-200 focus:border-violet-500/50 focus:bg-white/[0.06]"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs text-white/40 font-medium mb-2">
                      Имэйл хаяг
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm outline-none transition-all duration-200 focus:border-violet-500/50 focus:bg-white/[0.06]"
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs text-white/40 font-medium mb-2">
                      Утасны дугаар
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="99119911"
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm outline-none transition-all duration-200 focus:border-violet-500/50 focus:bg-white/[0.06]"
                    />
                  </div>

                  {/* Birth Date and Gender */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-white/40 font-medium mb-2">
                        Төрсөн огноо
                      </label>
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm outline-none transition-all duration-200 focus:border-violet-500/50 focus:bg-white/[0.06]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 font-medium mb-2">
                        Хүйс
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm outline-none transition-all duration-200 focus:border-violet-500/50 focus:bg-white/[0.06]"
                      >
                        <option value="">Сонгох</option>
                        <option value="male">Эрэгтэй</option>
                        <option value="female">Эмэгтэй</option>
                      </select>
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-xs text-white/40 font-medium mb-2">
                      Нууц үг
                    </label>
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Хамгийн багадаа 6 тэмдэгт"
                        className="w-full px-4 py-3 pr-12 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm outline-none transition-all duration-200 focus:border-violet-500/50 focus:bg-white/[0.06]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors duration-200"
                      >
                        {showPass ? "👁️" : "👁️‍🗨️"}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Input */}
                  <div>
                    <label className="block text-xs text-white/40 font-medium mb-2">
                      Нууц үг давтах
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPass ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Нууц үгээ дахин оруулна уу"
                        className="w-full px-4 py-3 pr-12 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm outline-none transition-all duration-200 focus:border-violet-500/50 focus:bg-white/[0.06]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors duration-200"
                      >
                        {showConfirmPass ? "👁️" : "👁️‍🗨️"}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* STEP 2: Урьдчилгаа төлбөр */}
              {step === 2 && (
                <>
                  {/* Payment Amount */}
                  <div className="rounded-xl border border-violet-400/30 bg-violet-500/10 p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white/90">Бүртгэлийн хураамж</p>
                        <p className="text-xs text-white/50 mt-1">Урьдчилгаа төлбөр</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-violet-300">500,000₮</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-xs text-white/40 font-medium mb-3">
                      Төлбөрийн хэлбэр
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: "qpay", label: "QPay", icon: "📱", desc: "Аппликэйшнээр төлөх" },
                        { value: "bank", label: "Банкны шилжүүлэг", icon: "🏦", desc: "Дансаар шилжүүлэх" },
                        { value: "card", label: "Карт", icon: "💳", desc: "Картаар төлөх" },
                      ].map((method) => (
                        <label
                          key={method.value}
                          className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                            formData.paymentMethod === method.value
                              ? "border-violet-400/50 bg-violet-500/15"
                              : "border-white/10 bg-white/[0.04] hover:bg-white/[0.06]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.value}
                            checked={formData.paymentMethod === method.value}
                            onChange={handleChange}
                            className="hidden"
                          />
                          <span className="text-2xl">{method.icon}</span>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-white/90">{method.label}</p>
                            <p className="text-xs text-white/50">{method.desc}</p>
                          </div>
                          {formData.paymentMethod === method.value && (
                            <span className="text-violet-400">✓</span>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs text-white/60 leading-relaxed">
                      💡 Төлбөр баталгаажсаны дараа таны бүртгэл идэвхжинэ. Админ 24 цагийн дотор шалгаж баталгаажуулна.
                    </p>
                  </div>
                </>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 flex items-center gap-3">
                  <span className="text-lg">❌</span>
                  <span className="text-sm text-red-400">{error}</span>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex-1 py-4 rounded-xl border border-white/10 bg-white/[0.04] text-white/60 text-sm font-bold hover:bg-white/[0.08] transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <span className="text-lg">←</span>
                    Буцах
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-4 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-800 text-white text-sm font-bold hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_8px_32px_rgba(124,58,237,0.35)] hover:shadow-[0_12px_40px_rgba(124,58,237,0.5)] flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {step === 1 ? "Үргэлжлүүлж байна..." : "Бүртгэж байна..."}
                    </>
                  ) : (
                    <>
                      {step === 1 ? "Үргэлжлүүлэх" : "Төлбөр төлөх"}
                      <span className="text-lg">→</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-white/50">
                Аль хэдийн бүртгэлтэй юу?{" "}
                <Link href="/login" className="text-violet-400 hover:text-violet-300 font-semibold transition-colors duration-200">
                  Нэвтрэх
                </Link>
              </p>
            </div>

            {/* Back to Landing */}
            <button
              onClick={() => router.push("/")}
              className="w-full mt-6 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white/60 text-sm font-semibold hover:text-white hover:bg-white/[0.08] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span className="text-lg">←</span>
              Нүүр хуудас руу буцах
            </button>

            {/* Info */}
            <div className="mt-8 pt-6 border-t border-white/[0.07]">
              <p className="text-xs text-white/40 text-center">
                Бүртгэл админаар баталгаажсаны дараа идэвхжинэ
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-white/[0.06] bg-[#0a0118]/80 px-4 py-8 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-800 flex items-center justify-center font-['Syne'] text-xs font-extrabold">
              IC
            </div>
            <span className="text-xs text-white/35">
              © 2007–2026 Indra Cyber Institute · Улаанбаатар
            </span>
          </div>
          <div className="flex gap-6">
            {[
              ["indracyberinstitute.com", "https://www.indracyberinstitute.com"],
              ["amjilt.com", "https://amjilt.com"]
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/30 hover:text-white/50 transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
