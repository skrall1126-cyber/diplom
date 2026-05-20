"use client";
import { useState, useEffect, useRef } from "react";

const roles = [
  { icon: "👑", title: "Захирал", sub: "Бүрэн удирдлага", color: "#f9a8d4", bg: "rgba(249,168,212,0.1)", items: ["Системийн бүх хэсэгт хандах", "Санхүү & төсөв батлах", "Дата анализ, сургалтын чанар"] },
  { icon: "📋", title: "Менежер", sub: "Сургалтын алба", color: "#93c5fd", bg: "rgba(147,197,253,0.1)", items: ["Хичээлийн хуваарь зохиох", "Багш нарын ажлыг хянах", "Ирц, дүнгийн статистик"] },
  { icon: "🧑‍🏫", title: "Багш", sub: "Сургалт & Үнэлгээ", color: "#6ee7b7", bg: "rgba(110,231,183,0.1)", items: ["Контент оруулах, хичээл заах", "Ирц, дүн, даалгавар бүртгэх", "Тест шалгалт авах"] },
  { icon: "🎓", title: "Сурагч", sub: "Суралцагч", color: "#c4b5fd", bg: "rgba(196,181,253,0.1)", items: ["Хичээл үзэх, даалгавар илгээх", "Онлайн тест өгөх", "Ирц, дүнгийн мэдээлэл харах"] },
  { icon: "👨‍👩‍👧", title: "Эцэг эх", sub: "Хяналт & Харилцаа", color: "#fde68a", bg: "rgba(253,230,138,0.1)", items: ["Хүүхдийн сурлага, ирц хянах", "Төлбөр төлөх, мэдээлэл авах", "Багш нартай харилцах"] },
  { icon: "💰", title: "Нягтлан", sub: "Санхүүгийн алба", color: "#fdba74", bg: "rgba(253,186,116,0.1)", items: ["Төлбөр тооцоо, цалин бодох", "Төсвийн гүйцэтгэл", "Санхүүгийн тайлан гаргах"] },
];

const features = [
  { icon: "🎯", title: "Практик суурьтай", desc: "Бодит төсөл, кейс дээр ажиллан практикт суурилсан хэлбэрээр хэрэгжүүлдэг" },
  { icon: "🌐", title: "Олон улсын холбоо", desc: "Google, Meta, Harvard эх сурвалж; Японы CAL байгууллагатай хамтран ажиллана" },
  { icon: "💼", title: "Ажил эрхлэлт", desc: "Жил бүр төгсөгчдийн 50%+ нь шууд ажлын байртайгаар төгсөх зорилт" },
  { icon: "📜", title: "Сертификат & Диплом", desc: "Олон улсад хүлээн зөвшөөрөгдсөн сертификат; гадаадын их сургуульд дүйцүүлэх боломж" },
  { icon: "📱", title: "Апп & Вэб", desc: "iOS болон Android аппликейшнээр хаанаас ч хандах боломжтой цогц систем" },
  { icon: "📊", title: "Дата анализ", desc: "Бодит цагийн статистик, тайлан гаргах; сургалтын чанарыг дэмжих шийдэл" },
];

const programs = [
  { icon: "💻", name: "Fullstack Developer", dur: "9 сар", price: "15M₮", students: 83, color: "#93c5fd" },
  { icon: "📢", name: "Digital Marketing", dur: "9 сар", price: "15M₮", students: 81, color: "#e879f9" },
  { icon: "🇬🇧", name: "Англи хэл / IELTS", dur: "9 сар", price: "8M₮", students: 25, color: "#86efac" },
  { icon: "🎮", name: "Тоглоом хөгжүүлэлт", dur: "1–3 сар", price: "Тусдаа", students: 35, color: "#fde68a" },
  { icon: "⚡", name: "LITE хөтөлбөр", dur: "6 сар", price: "Тусдаа", students: 40, color: "#fdba74" },
];

export default function LandingPage() {
  const [activeRole, setActiveRole] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setVisible((p) => ({ ...p, [e.target.id]: true }));
      });
    }, { threshold: 0.15 });
    Object.values(refs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  function ref(id: string) {
    return (el: HTMLElement | null) => { refs.current[id] = el; };
  }

  const navBg = scrollY > 40;

  return (
    <div style={{ background: "#06030f", color: "#fff", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", overflowX: "hidden" }}>



      {/* ── NAVBAR ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 32px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between", background: navBg ? "rgba(6,3,15,0.92)" : "transparent", backdropFilter: navBg ? "blur(20px)" : "none", borderBottom: navBg ? "0.5px solid rgba(255,255,255,0.06)" : "none", transition: "all 0.4s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img 
            src="/navbar-logo.jpg" 
            alt="Indra Cyber" 
            style={{ 
              width: "38px", 
              height: "38px", 
              borderRadius: "10px",
              objectFit: "cover"
            }} 
          />
          <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "16px", fontWeight: 800, letterSpacing: "-0.3px" }}>Indra Cyber</span>
        </div>

        <div style={{ display: "flex", gap: "2px" }}>
          <a href="/" style={{ fontSize: "13px", padding: "7px 14px", borderRadius: "8px", color: "rgba(255,255,255,0.5)", textDecoration: "none", fontWeight: 500, transition: "all 0.2s", background: "transparent" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color="#fff"; (e.currentTarget as HTMLAnchorElement).style.background="rgba(255,255,255,0.06)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color="rgba(255,255,255,0.5)"; (e.currentTarget as HTMLAnchorElement).style.background="transparent"; }}>
            Нүүр
          </a>
          {[["Тухай","#about"],["Мэдээ","#news"],["Хамтрагч","#partner"]].map(([l,h]) => (
            <a key={l} href={h} style={{ fontSize: "13px", padding: "7px 14px", borderRadius: "8px", color: "rgba(255,255,255,0.5)", textDecoration: "none", fontWeight: 500, transition: "all 0.2s", background: "transparent" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color="#fff"; (e.currentTarget as HTMLAnchorElement).style.background="rgba(255,255,255,0.06)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color="rgba(255,255,255,0.5)"; (e.currentTarget as HTMLAnchorElement).style.background="transparent"; }}>
              {l}
            </a>
          ))}
          <a href="/register" style={{ fontSize: "13px", padding: "7px 14px", borderRadius: "8px", color: "rgba(255,255,255,0.5)", textDecoration: "none", fontWeight: 500, transition: "all 0.2s", background: "transparent" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color="#fff"; (e.currentTarget as HTMLAnchorElement).style.background="rgba(255,255,255,0.06)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color="rgba(255,255,255,0.5)"; (e.currentTarget as HTMLAnchorElement).style.background="transparent"; }}>
            Бүртгүүлэх
          </a>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <a href="/register" style={{ display: "flex", alignItems: "center", gap: "6px", padding: "9px 20px", borderRadius: "10px", border: "0.5px solid rgba(217,70,239,0.4)", color: "#d946ef", fontSize: "13px", fontWeight: 700, textDecoration: "none", background: "rgba(217,70,239,0.08)", transition: "all 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background="rgba(217,70,239,0.18)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background="rgba(217,70,239,0.08)"; }}>
            Бүртгүүлэх
          </a>
          <a href="/login" style={{ display: "flex", alignItems: "center", gap: "6px", padding: "9px 20px", borderRadius: "10px", background: "linear-gradient(135deg,#d946ef,#7c3aed)", color: "#fff", fontSize: "13px", fontWeight: 700, textDecoration: "none", boxShadow: "0 0 24px rgba(217,70,239,0.3)" }}>
            Нэвтрэх <span style={{ fontSize: "15px" }}>→</span>
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", padding: "120px 32px 80px", overflow: "hidden" }}>
        {/* Background mesh */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: "900px", height: "700px", background: "radial-gradient(ellipse at center, rgba(124,58,237,0.2) 0%, rgba(217,70,239,0.08) 40%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: "500px", height: "500px", background: "radial-gradient(ellipse, rgba(59,130,246,0.1) 0%, transparent 70%)" }} />
          {/* Grid */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
          {/* Left */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "5px 14px 5px 8px", borderRadius: "30px", background: "rgba(217,70,239,0.1)", border: "0.5px solid rgba(217,70,239,0.3)", marginBottom: "28px" }}>
              <span style={{ display: "inline-flex", width: "20px", height: "20px", borderRadius: "50%", background: "linear-gradient(135deg,#d946ef,#7c3aed)", alignItems: "center", justifyContent: "center", fontSize: "10px" }}>✦</span>
              <span style={{ fontSize: "12px", color: "#d946ef", fontWeight: 600 }}>Сургуулийн удирдлагын цогц систем</span>
            </div>

            <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(36px,5vw,62px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1.5px", marginBottom: "20px" }}>
              <span style={{ color: "#fff" }}>INDRA</span><br />
              <span style={{ background: "linear-gradient(90deg,#d946ef,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200%", animation: "shimmer 4s linear infinite" }}>CYBER LMS</span>
            </h1>

            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: "36px", maxWidth: "460px" }}>
              Indra Cyber Institute-ийн сурагч, багш, менежерүүдэд зориулсан нэгдсэн сургалтын удирдлагын систем.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="/login" style={{ padding: "14px 32px", borderRadius: "12px", background: "linear-gradient(135deg,#d946ef,#7c3aed)", color: "#fff", fontSize: "14px", fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 32px rgba(217,70,239,0.35)", display: "flex", alignItems: "center", gap: "8px" }}>
                Системд нэвтрэх <span>→</span>
              </a>
              <a href="#about" style={{ padding: "14px 24px", borderRadius: "12px", border: "0.5px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", fontSize: "14px", fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                Дэлгэрэнгүй <span style={{ opacity: 0.5 }}>↓</span>
              </a>
            </div>

            {/* Mini stats */}
            <div style={{ display: "flex", gap: "60px", marginTop: "44px", paddingTop: "32px", borderTop: "0.5px solid rgba(255,255,255,0.07)" }}>
              {[["1000+","Төгсөгч"],["2007","Үүссэн"],["600","2026 зорилт"]].map(([v,l]) => (
                <div key={l}>
                  <p style={{ fontFamily: "'Syne',sans-serif", fontSize: "22px", fontWeight: 800, color: "#fff", margin: 0 }}>{v}</p>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", margin: "2px 0 0" }}>{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating logo */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ animation: "float 6s ease-in-out infinite" }}>
              {/* Indra Cyber Shield Logo */}
              <div style={{ width: "550px", height: "550px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img 
                  src="/indra-logo.jpg" 
                  alt="Indra Cyber Logo" 
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "contain",
                    filter: "drop-shadow(0 30px 80px rgba(217,70,239,0.6))"
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="about" ref={ref("about") as any} style={{ padding: "100px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div id="about-head" ref={ref("about-head") as any} className={`fade-up${visible["about-head"] ? " visible" : ""}`} style={{ textAlign: "center", marginBottom: "56px" }}>
            <p style={{ fontSize: "11px", color: "#d946ef", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px" }}>Яагаад Indra Cyber LMS?</p>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, letterSpacing: "-1px", color: "#fff", lineHeight: 1.2 }}>
              Сургалтын удирдлагыг<br /><span style={{ color: "#a78bfa" }}>дараагийн түвшинд</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "14px" }}>
            {features.map((f, i) => (
              <div key={f.title} id={`feat-${i}`} ref={ref(`feat-${i}`) as any} className={`fade-up card-hover${visible[`feat-${i}`] ? " visible" : ""}`}
                style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: "18px", padding: "26px", transitionDelay: `${i * 0.08}s` }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(124,58,237,0.15)", border: "0.5px solid rgba(124,58,237,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", marginBottom: "14px" }}>{f.icon}</div>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>{f.title}</p>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWS & UPDATES ── */}
      <section id="news" style={{ padding: "80px 32px", background: "rgba(255,255,255,0.015)", borderTop: "0.5px solid rgba(255,255,255,0.05)", borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div id="news-head" ref={ref("news-head") as any} className={`fade-up${visible["news-head"] ? " visible" : ""}`} style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontSize: "12px", color: "#d946ef", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "10px" }}>Мэдээ мэдээлэл</p>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(32px,4.5vw,48px)", fontWeight: 800, letterSpacing: "-2px", color: "#fff", lineHeight: 1.1, marginBottom: "12px" }}>
              Сүүлийн үеийн <span style={{ background: "linear-gradient(90deg,#d946ef,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>мэдээ</span>
            </h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>Indra Cyber Institute-ийн шинэ мэдээ, үйл явдал, амжилт</p>
          </div>

          {/* Magazine Style Layout */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px", marginBottom: "20px" }}>
            {/* Large Featured Card */}
            <div id="news-featured" ref={ref("news-featured") as any} className={`fade-up card-hover${visible["news-featured"] ? " visible" : ""}`}
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", overflow: "hidden", position: "relative", height: "420px" }}>
              {/* Image Background */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(217,70,239,0.3), rgba(124,58,237,0.2))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "160px" }}>
                🏫
              </div>
              {/* Gradient Overlay */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,17,32,0.95) 0%, rgba(8,17,32,0.7) 50%, transparent 100%)" }} />
              {/* Content */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "20px", background: "rgba(217,70,239,0.3)", border: "1px solid rgba(217,70,239,0.5)", marginBottom: "14px", backdropFilter: "blur(10px)" }}>
                  <span style={{ fontSize: "11px", color: "#d946ef", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>2026.01</span>
                </div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "32px", fontWeight: 800, color: "#fff", marginBottom: "10px", lineHeight: 1.2, letterSpacing: "-1px" }}>
                  Шинэ кампус албан ёсоор нээгдлээ
                </h3>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: "18px", maxWidth: "480px" }}>
                  600 сурагчийг хүлээн авах орчин үеийн тоног төхөөрөмж, лабораториудаар тоноглогдсон шинэ кампус.
                </p>
                <a href="#partner" style={{ padding: "10px 24px", borderRadius: "10px", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
                  Дэлгэрэнгүй <span>→</span>
                </a>
              </div>
            </div>

            {/* Side Card */}
            <div id="news-side" ref={ref("news-side") as any} className={`fade-up card-hover${visible["news-side"] ? " visible" : ""}`}
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", overflow: "hidden", position: "relative", height: "420px" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(37,99,235,0.15))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "110px" }}>
                🇯🇵
              </div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,17,32,0.95) 0%, rgba(8,17,32,0.6) 60%, transparent 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px" }}>
                <div style={{ display: "inline-block", padding: "6px 14px", borderRadius: "20px", background: "rgba(59,130,246,0.3)", border: "1px solid rgba(59,130,246,0.5)", marginBottom: "12px", backdropFilter: "blur(10px)" }}>
                  <span style={{ fontSize: "11px", color: "#60a5fa", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>2025.12</span>
                </div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "22px", fontWeight: 700, color: "#fff", marginBottom: "10px", lineHeight: 1.3 }}>
                  Японы CAL хамтын ажиллагаа
                </h3>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: "14px" }}>
                  Төгсөгчдөд Японд ажиллах боломж нээгдлээ.
                </p>
                <a href="#about" style={{ fontSize: "13px", color: "#60a5fa", fontWeight: 600, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", textDecoration: "none" }}>
                  Унших <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Grid - 3 Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "36px" }}>
            {/* Card 1 */}
            <div id="news-1" ref={ref("news-1") as any} className={`fade-up card-hover${visible["news-1"] ? " visible" : ""}`}
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", overflow: "hidden", position: "relative", height: "280px" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(34,197,94,0.25), rgba(22,163,74,0.15))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "75px" }}>
                🏆
              </div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,17,32,0.95) 0%, rgba(8,17,32,0.5) 70%, transparent 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px" }}>
                <div style={{ display: "inline-block", padding: "5px 12px", borderRadius: "16px", background: "rgba(34,197,94,0.25)", border: "1px solid rgba(34,197,94,0.4)", marginBottom: "10px", backdropFilter: "blur(8px)" }}>
                  <span style={{ fontSize: "10px", color: "#86efac", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>2025.11</span>
                </div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "19px", fontWeight: 700, color: "#fff", marginBottom: "8px", lineHeight: 1.3 }}>
                  Олон улсын хакатон
                </h3>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                  Шилдэг 10-т багтаж, мөнгөн шагнал хүртлээ.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div id="news-2" ref={ref("news-2") as any} className={`fade-up card-hover${visible["news-2"] ? " visible" : ""}`}
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", overflow: "hidden", position: "relative", height: "280px", transitionDelay: "0.1s" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(251,146,60,0.25), rgba(249,115,22,0.15))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "75px" }}>
                📚
              </div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,17,32,0.95) 0%, rgba(8,17,32,0.5) 70%, transparent 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px" }}>
                <div style={{ display: "inline-block", padding: "5px 12px", borderRadius: "16px", background: "rgba(251,146,60,0.25)", border: "1px solid rgba(251,146,60,0.4)", marginBottom: "10px", backdropFilter: "blur(8px)" }}>
                  <span style={{ fontSize: "10px", color: "#fdba74", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>2025.10</span>
                </div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "19px", fontWeight: 700, color: "#fff", marginBottom: "8px", lineHeight: 1.3 }}>
                  Шинэ сургалтын хөтөлбөр
                </h3>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                  AI & Machine Learning хөтөлбөрүүд нэмэгдлээ.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div id="news-3" ref={ref("news-3") as any} className={`fade-up card-hover${visible["news-3"] ? " visible" : ""}`}
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", overflow: "hidden", position: "relative", height: "280px", transitionDelay: "0.2s" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(236,72,153,0.25), rgba(219,39,119,0.15))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "75px" }}>
                💼
              </div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,17,32,0.95) 0%, rgba(8,17,32,0.5) 70%, transparent 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px" }}>
                <div style={{ display: "inline-block", padding: "5px 12px", borderRadius: "16px", background: "rgba(236,72,153,0.25)", border: "1px solid rgba(236,72,153,0.4)", marginBottom: "10px", backdropFilter: "blur(8px)" }}>
                  <span style={{ fontSize: "10px", color: "#f9a8d4", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>2025.09</span>
                </div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "19px", fontWeight: 700, color: "#fff", marginBottom: "8px", lineHeight: 1.3 }}>
                  Ажлын байрны яармарк
                </h3>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                  50 гаруй компани оролцсон яармарк.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNER / AMJILT ── */}
      <section id="partner" style={{ padding: "80px 32px", background: "rgba(255,255,255,0.015)", borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "11px", color: "#d946ef", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px" }}>Хамтрагч платформ</p>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 800, letterSpacing: "-0.8px", color: "#fff", marginBottom: "16px" }}>
            <span style={{ color: "#a78bfa" }}>Amjilt LMS</span>-тэй нэгдсэн
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: "36px" }}>
            Amjilt LMS систем нь сургуулийн удирдлагын үйл ажиллагааг нэг цогц системд нэгтгэж, Indra Cyber Institute-ийн бүх үйл ажиллагааг хялбарчлах боломжийг бүрдүүлж байна.
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://amjilt.com" target="_blank" rel="noopener noreferrer" style={{ padding: "12px 24px", borderRadius: "12px", background: "rgba(124,58,237,0.15)", border: "0.5px solid rgba(124,58,237,0.3)", color: "#c4b5fd", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
              amjilt.com →
            </a>
            <a href="/login" style={{ padding: "12px 24px", borderRadius: "12px", background: "linear-gradient(135deg,#d946ef,#7c3aed)", color: "#fff", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}>
              Системд нэвтрэх
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", padding: "80px 32px 32px", position: "relative", overflow: "hidden" }}>
        {/* Background gradient */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)", width: "600px", height: "400px", background: "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)" }} />
        </div>

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          {/* Main row: CTA + Footer content */}
          <div style={{ display: "grid", gridTemplateColumns: "7fr 3fr", gap: "80px", alignItems: "start" }}>
            {/* Left - CTA */}
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, letterSpacing: "-1.5px", color: "#fff", lineHeight: 1.15, marginBottom: "16px" }}>
                Ирээдүйгээ<br /><span style={{ background: "linear-gradient(90deg,#d946ef,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>өнөөдрөөс бүтээ</span>
              </p>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: "36px" }}>
                Шийдэл үргэлж байдаг · Шинэ эхлэл · Шинэ алхам
              </p>
              <a href="/register" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "16px 40px", borderRadius: "14px", background: "linear-gradient(135deg,#d946ef,#7c3aed)", color: "#fff", fontSize: "15px", fontWeight: 800, textDecoration: "none", boxShadow: "0 12px 40px rgba(217,70,239,0.4)", fontFamily: "'Syne',sans-serif", letterSpacing: "-0.3px" }}>
                Бүртгүүлэх <span style={{ fontSize: "18px" }}>→</span>
              </a>
            </div>

            {/* Right - Footer content */}
            <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", paddingTop: "40px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "40px" }}>
                {/* Contact */}
                <div>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#fff", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Холбоо барих</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "16px" }}>📍</span>
                      <div>
                        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", margin: 0, fontWeight: 600 }}>Хаяг</p>
                        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: "2px 0 0" }}>Улаанбаатар хот, Монгол Улс</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "16px" }}>📧</span>
                      <div>
                        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", margin: 0, fontWeight: 600 }}>Имэйл</p>
                        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: "2px 0 0" }}>info@indracyber.edu.mn</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "16px" }}>📞</span>
                      <div>
                        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", margin: 0, fontWeight: 600 }}>Утас</p>
                        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: "2px 0 0" }}>+976 7777-7777</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "16px" }}>🌐</span>
                      <div>
                        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", margin: 0, fontWeight: 600 }}>Вэбсайт</p>
                        <a href="https://www.indracyberinstitute.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13px", color: "#a78bfa", margin: "2px 0 0", display: "block", textDecoration: "none" }}>
                          indracyberinstitute.com →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar - Full width */}
          <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", paddingTop: "24px", marginTop: "40px", textAlign: "center" }}>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", margin: 0 }}>
              © 2007–2026 Indra Cyber Institute · Бүх эрх хуулиар хамгаалагдсан
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
