"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const adminTypes = [
  { 
    key: "full-admin", 
    label: "Бүрэн эрхт админ", 
    description: "Системийн бүх хэсгийг удирдах эрхтэй",
    icon: "👑", 
    color: "from-purple-500/20 to-purple-600/10", 
    border: "border-purple-500/20", 
    text: "text-purple-300",
    redirect: "/admin/dashboard"
  },
  { 
    key: "training-admin", 
    label: "Сургалтын албаны админ", 
    description: "Сургалтын хэсгийг удирдах эрхтэй",
    icon: "📚", 
    color: "from-blue-500/20 to-blue-600/10", 
    border: "border-blue-500/20", 
    text: "text-blue-300",
    redirect: "/admin/training-dashboard"
  },
  { 
    key: "finance-admin", 
    label: "Санхүүгийн албаны админ", 
    description: "Санхүүгийн хэсгийг удирдах эрхтэй",
    icon: "💰", 
    color: "from-emerald-500/20 to-emerald-600/10", 
    border: "border-emerald-500/20", 
    text: "text-emerald-300",
    redirect: "/admin/finance-dashboard"
  },
];

export default function AdminLoginPage() {
  const router = useRouter();
  const [adminType, setAdminType] = useState("full-admin");
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id || !pass) {
      setError("ID болон нууц үгээ оруулна уу.");
      return;
    }
    
    setError("");
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: id, password: pass }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        setError(result.error || 'Нэвтрэх явцад алдаа гарлаа');
        setLoading(false);
        return;
      }

      if (result.user && result.token) {
        // LocalStorage-д хадгалах (client-side-д хэрэгтэй)
        // Cookie автоматаар хадгалагдсан (server-side-аас)
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        
        let userTypeToSave = "admin";
        if (adminType === "training-admin") {
          userTypeToSave = "training";
        } else if (adminType === "finance-admin") {
          userTypeToSave = "finance";
        }
        localStorage.setItem("userType", userTypeToSave);
        localStorage.setItem("adminType", adminType);
        
        // Redirect
        const selectedAdmin = adminTypes.find(a => a.key === adminType);
        if (selectedAdmin) {
          // Use router.push instead of window.location for better UX
          window.location.href = selectedAdmin.redirect;
        }
      } else {
        setError('Нэвтрэх мэдээлэл буруу байна');
        setLoading(false);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || "Нэвтрэх явцад алдаа гарлаа");
      setLoading(false);
    }
  };

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

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-20 sm:px-8">
        <div className="max-w-2xl w-full">
          <div className="rounded-3xl border border-white/10 bg-[#081120]/70 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-md sm:p-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4">
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center text-xs">
                  ⚡
                </div>
                <span className="text-xs text-purple-400 font-semibold">
                  Админы системд нэвтрэх
                </span>
              </div>

              <h1 className="font-['Syne'] text-3xl font-extrabold leading-tight mb-2">
                Админы нэвтрэх
              </h1>
              <p className="text-sm text-white/50">
                Админы эрхийн төрлөө сонгоод системд нэвтрэнэ үү
              </p>
            </div>

            {/* Admin type selector */}
            <div className="mb-8">
              <div className="grid gap-3 grid-cols-3">
                {adminTypes.map((admin) => (
                  <button
                    key={admin.key}
                    type="button"
                    onClick={() => setAdminType(admin.key)}
                    disabled={loading}
                    className={`flex flex-col items-center justify-center gap-2 rounded-xl border p-4 transition-all duration-200 text-center min-h-[100px] ${
                      adminType === admin.key 
                        ? `${admin.border} ${admin.color} opacity-100 scale-[1.02]` 
                        : "border-white/10 bg-white/[0.02] opacity-70 hover:opacity-100 hover:scale-[1.01]"
                    } ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    <span className="text-2xl">{admin.icon}</span>
                    <div>
                      <span className={`text-xs font-bold block ${
                        adminType === admin.key ? admin.text : "text-white/80"
                      }`}>
                        {admin.label}
                      </span>
                      <p className="text-[10px] text-white/50 mt-0.5">
                        {admin.description}
                      </p>
                    </div>
                    
                    <div className="w-full mt-1">
                      <div className={`h-[2px] w-full rounded-full ${
                        adminType === admin.key ? "bg-white/30" : "bg-white/10"
                      }`}>
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${
                            adminType === admin.key ? "bg-gradient-to-r from-white to-white/70" : ""
                          }`}
                          style={{ width: adminType === admin.key ? "100%" : "0%" }}
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5 max-w-sm mx-auto">
              {/* ID Input */}
              <div>
                <label className="block text-xs text-white/40 font-medium mb-2">
                  Админы ID
                </label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  disabled={loading}
                  placeholder="Админы ID оруулах"
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm outline-none transition-all duration-200 focus:border-purple-500/50 focus:bg-white/[0.06] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs text-white/40 font-medium mb-2">
                  Нууц үг
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    disabled={loading}
                    placeholder="Админы нууц үг оруулах"
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm outline-none transition-all duration-200 focus:border-purple-500/50 focus:bg-white/[0.06] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    disabled={loading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors duration-200 disabled:opacity-50"
                  >
                    {showPass ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/10 flex items-center gap-2">
                  <span className="text-sm">❌</span>
                  <span className="text-xs text-red-400">{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-800 text-white text-sm font-bold hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_8px_32px_rgba(147,51,234,0.35)] hover:shadow-[0_12px_40px_rgba(147,51,234,0.5)] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Нэвтэрч байна...
                  </>
                ) : (
                  <>
                    Нэвтрэх
                    <span className="text-lg">⚡</span>
                  </>
                )}
              </button>

              {/* Back to Main Login */}
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white/60 text-sm font-semibold hover:text-white hover:bg-white/[0.08] transition-all duration-200"
              >
                <span className="text-lg">←</span>
                Буцах
              </Link>
            </form>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] bg-[#0a0118]/80 px-4 py-8 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center font-['Syne'] text-xs font-extrabold">
              IC
            </div>
            <span className="text-xs text-white/35">
              © 2007–2026 Indra Cyber Institute · Админы систем
            </span>
          </div>
          <div className="flex gap-6">
            {[
              ["indracyberinstitute.com", "https://www.indracyberinstitute.com"],
              ["amjilt.com", "https://amjilt.com"],
              ["Админы гарын авлага", "#"]
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target={href !== "#" ? "_blank" : undefined}
                rel={href !== "#" ? "noopener noreferrer" : undefined}
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
